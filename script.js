($(function () {
// Create an instance of nextprot API
    var Nextprot = window.Nextprot;
    var nx = new Nextprot.Client();

    var entry = nx.getEntryName();
    var isoName = entry + "-1";
    var sequence;
    var cpt = 0;
    var features = [];
    var Yposition = 0;
    var pathLevel = 0;

//ADD LEVEL TO DATA (peptides overlapping)

    function addLevel(array) {
        var leveling = [];
        array.forEach(function (d) {
            if (leveling === []) {
                leveling.push(d.y);
                d.level = 0;
            }
            else {
                var placed = false;
                for (var k = 0; k < leveling.length; k++) {
                    if (d.x > leveling[k]) {
                        placed = true;
                        d.level = k;
                        leveling[k] = d.y;
                        break;
                    }
                }
                if (placed === false) {
                    leveling.push(d.y);
                    d.level = leveling.length - 1;
                }
            }
        });
        return leveling.length;
    }

    function addLevelToBond(array) {
        var leveling = [];
        array.forEach(function (d) {
            if (leveling === []) {
                leveling.push(d[2].x);
                d[1].y = 1;
            }
            else {
                var placed = false;
                for (var k = 0; k < leveling.length; k++) {
                    if (d[0].x > leveling[k]) {
                        placed = true;
                        d[1].y = k + 1;
                        leveling[k] = d[2].x;
                        break;
                    }
                }
                if (placed === false) {
                    leveling.push(d[2].x);
                    d[1].y = leveling.length;
                }
            }
        });
        return leveling.length;
    }

    var margin = {top: 20, right: 20, bottom: 60, left: 100},
        width = $(window).width() - margin.left - margin.right - 17,
        height = 800 - margin.top - margin.bottom;

// SCALE FUNCTIONS
    var scaling = d3.scale.linear()
        .domain([0, 0])
        .range([0, width]);

    var X = function (d) {
        return scaling(d.x);
    };
    var pepWidth = function (d) {
        return (scaling(d.y) - scaling(d.x));
    };
    var uniqueWidth = function (d) {
        return (scaling(1));
    };
    var displaySequence = function (seq) {
        return width / seq > 5;
    };

    var lineBond = d3.svg.line()
        .interpolate("step-before")
        .x(function (d) {
            return scaling(d.x);
        })
        .y(function (d) {
            return -d.y * 10 + pathLevel;
        });

    var line = d3.svg.line()
        .interpolate("linear")
        .x(function (d) {
            return scaling(d.x);
        })
        .y(function (d) {
            return d.y + 6;
        });

// Create SVG
    var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    var svgContainer = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//Create Clip-Path
    svgContainer.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    var xAxis = d3.svg.axis()
        .scale(scaling)
        .tickFormat(d3.format("d"))
        .orient("bottom");

    function addXAxis(position) {
        svgContainer.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + position + ")")
            .call(xAxis);
    }

    var yData = [];
    function addYAxis(yData) {
        var yAxisScale = d3.scale.ordinal()
            .domain([0, yData.length])
            .rangeRoundBands([0, 500], .1);

        var yAxis = d3.svg.axis()
            .scale(yAxisScale)
            .tickValues(yData) //specify an array here for values
            .tickFormat(function (d) {
                return d
            })
            .orient("left");

        svg.append("g")
            .attr("class", "pro axis")
            .attr("transform", "translate(0," + margin.top + ")")
            .selectAll(".yaxis")
            .data(yData)
            .enter()
            .append("text")
            .attr("class", "yaxis")
            .attr("text-anchor", "end")
            .attr("x", function () {
                return margin.left - 10
            })
            .attr("y", function (d) {
                return d.y + 8
            })
            .text(function (d) {
                return d.title
            });
    }

    var CreateData = {
        classic: function (data) {
            var newData = [];
            data.forEach(function (o) {
                    if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
                        var start = o.targetingIsoformsMap[isoName].firstPosition,
                            end = o.targetingIsoformsMap[isoName].lastPosition;
                        newData.push({
                            x: start,
                            y: end,
                            matureLength: end - start,
                            description: o.description
                        });
                    }
                }
            );
            return newData;
        },
        antibody: function (data) {
            var newData = [];
            data.forEach(function (o) {
                    if (o.isoformSpecificity.hasOwnProperty(isoName)) {
                        var start = o.isoformSpecificity[isoName].positions[0].first;
                        var end = o.isoformSpecificity[isoName].positions[0].second;

                        newData.push({
                            x: start,
                            y: end,
                            pepLength: end - start,
                            description: o.antibodyUniqueName
                        });
                    }
                }
            );
            return newData;
        },
        dsB: function (data) {
            var newData = [];
            data.forEach(function (o) {
                    if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
                        var start = o.targetingIsoformsMap[isoName].firstPosition,
                            end = o.targetingIsoformsMap[isoName].lastPosition;
                        newData.push([
                            {
                                x: start,
                                y: 0
                            }, {
                                x: end,
                                y: 0
                            }, {
                                x: end,
                                y: 0
                            }
                        ]);
                    }
                }
            );
            return newData;
        },
        peptide: function (data) {
            var newData = [];
            data.forEach(function (o) {
                if (o.isoformSpecificity.hasOwnProperty(isoName)) {
                    var start = o.isoformSpecificity[isoName].positions[0].first;
                    var end = o.isoformSpecificity[isoName].positions[0].second;

                    newData.push({
                        x: start,
                        y: end,
                        pepLength: end - start,
                        level: 0
                    });
                }
            });
            return newData;
        }
    };
    var fillSVG = {
        sequence: function (data, position, start) {
            //Create group of sequence
            if (!start) var start = 0;
            svgContainer.append("g")
                .attr("class", "seqGroup")
                .selectAll(".AA")
                .data(data)
                .enter()
                .append("text")
                .attr("clip-path", "url(#clip)")
                .attr("class", "AA")
                .attr("x", function (d, i) {
                    return scaling(i + start)
                })
                .attr("y", position)
                .attr("font-size", "10px")
                .attr("font-family", "monospace")
                .text(function (d, i) {
                    return d
                });
        },
        rectangle: function (data, sequence, position, className) {
            var rectsPro = svgContainer.append("g")
                .attr("class", "testing")
                .attr("transform", "translate(0," + position + ")");

            rectsPro.selectAll("." + className)
                .data(data)
                .enter()
                .append("rect")
                .attr("clip-path", "url(#clip)")
                .attr("class", className)
                .attr("x", X)
                .attr("width", pepWidth)
                .attr("height", 12);

            rectsPro.append("path")
                .attr("d", line([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
                .attr("class", function () {
                    return "line" + className
                });
        },
        unique: function (data, sequence, position, className) {
            var rectsPro = svgContainer.append("g")
                .attr("class", "testing")
                .attr("transform", "translate(0," + position + ")");

            rectsPro.selectAll("." + className)
                .data(data)
                .enter()
                .append("rect")
                .attr("clip-path", "url(#clip)")
                .attr("class", className)
                .attr("x", X)
                .attr("width", uniqueWidth())
                .attr("height", 12);

            rectsPro.append("path")
                .attr("d", line([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
                .attr("class", function () {
                    return "line" + className
                });
        },
        path: function (data, sequence, position, className) {
            var pathsDB = svgContainer.append("g")
                .attr("class", "pathing")
                .attr("transform", "translate(0," + position + ")");

            pathsDB.selectAll("." + className)
                .data(data)
                .enter()
                .append("path")
                .attr("clip-path", "url(#clip)")
                .attr("class", className)
                .attr("d", lineBond)
                .style("fill", "none")
                .style("stroke", "#8585FF")
                .style("stroke-width", "2px");

            pathsDB.append("path")
                .attr("d", lineBond([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
                .style("stroke", "#8585FF")
                .style("stroke-width", "1px");
        },
        multipleRect: function (data, sequence, position, className, level) {
            var rectsSrmPep = svgContainer.append("g")
                .attr("class", "peptideMapping")
                .attr("transform", "translate(0," + position + ")");

            rectsSrmPep.selectAll("." + className)
                .data(data)
                .enter()
                .append("rect")
                .attr("clip-path", "url(#clip)")
                .attr("class", className)
                .attr("x", X)
                .attr("y", function (d) {
                    return d.level * 10
                })
                .attr("width", pepWidth)
                .attr("height", 8);

            rectsSrmPep.append("path")
                .attr("d", line([{x: 0, y: -2}, {x: sequence.length, y: -2}]))
                .attr("class", function () {
                    return "line" + className
                });
            for (var i = 0; i < level; i++) {
                rectsSrmPep.append("path")
                    .attr("d", line([{x: 0, y: (i * 10 - 2)}, {x: sequence.length, y: (i * 10 - 2)}]))
                    .attr("class", function () {
                        return "line" + className
                    });
            }
        }
    };
    var transition = {
        rectangle: function (data, className) {
            svgContainer.selectAll("." + className)
                .data(data)
                //.transition()
                //.duration(500)
                .attr("x", function (d) {
                    return scaling(d.x)
                })
                .attr("width", function (d) {
                    return scaling(d.y) - scaling(d.x)
                });
        },
        unique: function (data, className) {
            svgContainer.selectAll("." + className)
                .data(data)
                //.transition()
                //.duration(500)
                .attr("x", function (d) {
                    return scaling(d.x)
                });
        },
        path: function (data, className) {
            svgContainer.selectAll("." + className)
                .data(data)
                //.transition()
                //.duration(500)
                .attr("d", lineBond);
        },
        text: function (data, className, start) {
            svgContainer.selectAll("." + className)
                .data(data)
                //.transition()
                //.duration(500)
                .attr("x", function (d, i) {
                    return scaling(i + start)
                });
        }
    };
    var brush = d3.svg.brush()
        .x(scaling)
        //.on("brush", brushmove)
        .on("brushend", brushend);

    function addBrush() {
        svgContainer.append("g")
            .attr("class", "brush")
            .call(brush)
            .selectAll("rect")
            .attr('height', 500);
    }

// Show peptide selected in brush
//function brushmove() {
//    var extent = brush.extent();
//    rectsPep2.classed("selected", function (d) {
//        is_brushed = extent[0] <= d.x && d.x <= extent[1] && extent[0] <= d.y && d.y <= extent[1];
//        return is_brushed;
//    });
//}

    function brushend() {

        // Check if brush is big enough before zooming
        var extent = brush.extent();
        var extentLength = Math.abs(extent[0] - extent[1]);

        if (extent[0] < extent[1]) var start = parseInt(extent[0] - 1), end = parseInt(extent[1] + 1);
        else var start = parseInt(extent[1] + 1), end = parseInt(extent[0] - 1);

        var seq = displaySequence(extentLength);
        if (!brush.empty() && extentLength > 5) {

            if (seq && svgContainer.selectAll(".AA").empty()) fillSVG.sequence(sequence.substring(start, end), Yposition - 80, start);

            //modify scale
            scaling.domain(extent);

            transition_data(seq, start, features);
            reset_axis();

            //rectsPep2.classed("selected", false);
            d3.select(".brush").call(brush.clear());
        }
        else {
            d3.select(".brush").call(brush.clear());
            resetAll();
        }
    }

// If brush is too small, reset view as origin
    function resetAll() {

        //reset scale
        scaling.domain([0, sequence.length]);
        var seq = displaySequence(sequence.length);

        if (seq === false && !svgContainer.selectAll(".AA").empty()) svgContainer.selectAll(".AA").remove();

        transition_data(seq, 0, features);
        reset_axis();
    }

    function transition_data(seq, start, features) {
        for (i in features) {
            if (features[i].type === "rect" || features[i].type === "rects") {
                transition.rectangle(features[i].data, features[i].className);
            }
            else if (features[i].type === "unique") {
                transition.unique(features[i].data, features[i].className);
            }
            else if (features[i].type === "path") {
                transition.path(features[i].data, features[i].className);
            }
            else if (features[i].type === "text") {
                transition.text(features[i].data, features[i].className, start);
            }
        }
    }

    function reset_axis() {
        svgContainer
            .transition().duration(500)
            .select(".x.axis")
            .call(xAxis);
    }

// Add vertical line
// (futur purpose : small rectangle at the bottom of the line, showing a part of the sequence fisheye-like)
    function addVerticalLine(Vheight, absBottom) {
        var vertical = d3.select(".chart")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", Vheight + "px")
            .style("top", "20px")
            .style("left", "0px")
            .style("background", "#000");

        d3.select(".chart")
            .on("mousemove", function () {
                mousex = d3.mouse(this);
                mousex = mousex[0] + 7;
                vertical.style("left", mousex + "px")
            });
//.on("mouseover", function(){
//    mousex = d3.mouse(this);
//    mousex = mousex[0] + 5;
//    vertical.style("left", mousex + "px")});
    }

// Get peptide & sequence from async call of nextprot API
    $(function () {
        [nx.getProteinSequence(entry), nx.getProPeptide(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getDisulfideBond(entry), nx.getAntibody(entry), nx.getInitMeth(entry), nx.getModifResidue(entry), nx.getCrossLink(entry), nx.getGlycoSite(entry), nx.getPeptide(entry), nx.getSrmPeptide(entry)].reduce(function (array, dataPromise) {
            return array.then(function () {
                return dataPromise;
            }).then(function (oneData) {
                cpt += 1;
                switch (cpt) {
                    case 1:

                        oneData.forEach(function (o) {
                            if (o.uniqueName === isoName) {
                                console.log("aaaablblbl");
                                sequence = o.sequence;
                            }
                        });
                        scaling = d3.scale.linear()
                            .domain([0, sequence.length])
                            .range([0, width]);
                        features.push({data: sequence, className: "AA", type: "text"});
                        break;

                    case 2:
                        var proPep = CreateData.classic(oneData);
                        if (proPep.length != 0) {
                            Yposition += 20;
                            features.push({data: proPep, className: "pro", type: "rect"});
                            fillSVG.rectangle(proPep, sequence, Yposition, "pro");
                            yData.push({title: "Propeptide", y: Yposition});
                        }
                        break;

                    case 3:
                        var matures = CreateData.classic(oneData);
                        if (matures.length != 0) {
                            Yposition += 20;
                            features.push({data: matures, className: "mature", type: "rect"});
                            fillSVG.rectangle(matures, sequence, Yposition, "mature");
                            yData.push({title: "Mature protein", y: Yposition});
                        }

                        break;
                    case 4 :
                        var signalPep = CreateData.classic(oneData);
                        if (signalPep.length != 0) {
                            Yposition += 20;
                            features.push({data: signalPep, className: "signal", type: "rect"});
                            fillSVG.rectangle(signalPep, sequence, Yposition, "signal");
                            yData.push({title: "Signal peptide", y: Yposition});
                        }

                        break;

                    case 5 :
                        var disBonds = CreateData.dsB(oneData);
                        disBonds.sort(function (a, b) {
                            return a[0].x - b[0].x;
                        });
                        var pathHeight = addLevelToBond(disBonds);
                        pathLevel = pathHeight * 10;
                        if (disBonds.length != 0) {
                            Yposition += 20;
                            features.push({data: disBonds, className: "dsB", type: "path"});
                            fillSVG.path(disBonds, sequence, Yposition, "dsB");
                            Yposition += pathLevel - 5;
                            yData.push({title: "Disulfide bonds", y: Yposition});
                        }

                        break;

                    case 6 :
                        var antibody = CreateData.antibody(oneData);
                        if (antibody.length != 0) {
                            Yposition += 20;
                            features.push({data: antibody, className: "antiB", type: "rect"});
                            fillSVG.rectangle(antibody, sequence, Yposition, "antiB");
                            yData.push({title: "Antibody", y: Yposition});
                        }
                        break;

                    case 7 :
                        var initMeth = CreateData.classic(oneData);
                        if (initMeth.length != 0) {
                            Yposition += 20;
                            features.push({data: initMeth, className: "initMeth", type: "unique"});
                            fillSVG.unique(initMeth, sequence, Yposition, "initMeth");
                            yData.push({title: "Initiator Meth", y: Yposition});
                        }
                        break;
                    case 8 :
                        var modifRes = CreateData.classic(oneData);
                        if (modifRes.length != 0) {
                            Yposition += 20;
                            features.push({data: modifRes, className: "modifRes", type: "unique"});
                            fillSVG.unique(modifRes, sequence, Yposition, "modifRes");
                            yData.push({title: "Modified residue", y: Yposition});
                        }
                        break;
                    case 9 :
                        var crossLink = CreateData.classic(oneData);
                        if (crossLink.length != 0) {
                            Yposition += 20;
                            features.push({data: crossLink, className: "crossLink", type: "unique"});
                            fillSVG.unique(crossLink, sequence, Yposition, "crossLink");
                            yData.push({title: "Cross-link", y: Yposition});
                        }
                        break;
                    case 10 :
                        var glycoSite = CreateData.classic(oneData);
                        if (glycoSite.length != 0) {
                            Yposition += 20;
                            features.push({data: glycoSite, className: "glycoSite", type: "unique"});
                            fillSVG.unique(glycoSite, sequence, Yposition, "glycoSite");
                            yData.push({title: "Glycosylation", y: Yposition});
                        }
                        break;

                    case 11 :
                        var peptides = CreateData.peptide(oneData);

                        peptides.sort(function (a, b) {
                            return a.pepLength - b.pepLength;
                        });
                        peptides.sort(function (a, b) {
                            return a.x - b.x;
                        });
                        var level = addLevel(peptides);
                        if (peptides.length != 0) {
                            Yposition += 20;
                            features.push({data: peptides, className: "pep", type: "rects"});
                            fillSVG.multipleRect(peptides, sequence, Yposition, "pep", level);
                            yData.push({title: "Peptide", y: Yposition});
                            Yposition += level * 10;
                        }
                        break;

                    case 12 :
                        var srmPeptides = CreateData.peptide(oneData);

                        srmPeptides.sort(function (a, b) {
                            return a.pepLength - b.pepLength;
                        });
                        srmPeptides.sort(function (a, b) {
                            return a.x - b.x;
                        });

                        //yData.push({title:"Srm peptide",y:(180+level.length*10)});
                        var level = addLevel(srmPeptides);
                        if (srmPeptides.length != 0) {
                            Yposition += 20;
                            features.push({data: srmPeptides, className: "srmPep", type: "rects"});
                            fillSVG.multipleRect(srmPeptides, sequence, Yposition, "srmPep", level);
                            yData.push({title: "Srm peptide", y: Yposition});
                            Yposition += level * 10;
                        }
                        Yposition += 40;
                        if (displaySequence(sequence.length)) {
                            fillSVG.sequence(sequence, Yposition);
                        }
                        yData.push({title: "Sequence", y: Yposition - 10});
                        Yposition += 50;
                        xAxis.scale(scaling);
                        addXAxis(Yposition);
                        addYAxis(yData);
                        Yposition += 30;
                        addVerticalLine(Yposition);
                        brush.x(scaling);
                        addBrush();
                        break;
                }
            });
        }, Promise.resolve())
            .then(function () {
                console.log("All done");
            })
            .catch(function (err) {
                // catch any error that happened along the way
                console.log("Argh, broken: " + err.message);
                console.log("Error at line : " + err.stack);
            })
    });

//
//Promise.all([nx.getPeptide(entry), nx.getSrmPeptide(entry), nx.getProteinSequence(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getProPeptide(entry), nx.getAntibody(entry), nx.getDisulfideBond(entry)]).then(function (pepData) {
//    var isoName = entry + "-1";
//
//    // Create & fill new array of peptides with infos of interest
//    var sequence = "";
//    pepData[2].forEach(function (o) {
//        if (o.uniqueName === isoName) return sequence = o.sequence;
//    });
//
//    // Create & fill new array of peptides with infos of interest
//    var peptides = [];
//    pepData[0].forEach(function (o) {
//        if (o.isoformSpecificity.hasOwnProperty(isoName)) {
//            var start = o.isoformSpecificity[isoName].positions[0].first;
//            var end = o.isoformSpecificity[isoName].positions[0].second;
//
//            peptides.push({
//                x: start,
//                y: end,
//                pepLength: end - start,
//                level: 0
//            });
//        }
//    });
//
//    var srmPeptides = [];
//    pepData[1].forEach(function (o) {
//        if (o.isoformSpecificity.hasOwnProperty(isoName)) {
//            var start = o.isoformSpecificity[isoName].positions[0].first;
//            var end = o.isoformSpecificity[isoName].positions[0].second;
//
//            srmPeptides.push({
//                x: start,
//                y: end,
//                pepLength: end - start,
//                level: 0
//            });
//        }
//    });
//
//    var matures = [];
//    pepData[3].forEach(function (o) {
//            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
//                var start = o.targetingIsoformsMap[isoName].firstPosition,
//                    end = o.targetingIsoformsMap[isoName].lastPosition;
//                matures.push({
//                    x: start,
//                    y: end,
//                    matureLength: end - start,
//                    description: o.description
//                });
//            }
//        }
//    );
//
//    var signalPep = [];
//    pepData[4].forEach(function (o) {
//            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
//                var start = o.targetingIsoformsMap[isoName].firstPosition,
//                    end = o.targetingIsoformsMap[isoName].lastPosition;
//                signalPep.push({
//                    x: start,
//                    y: end,
//                    signalLength: end - start,
//                    description: o.uniqueName
//                });
//            }
//        }
//    );
//
//    var proPep = [];
//    pepData[5].forEach(function (o) {
//            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
//                var start = o.targetingIsoformsMap[isoName].firstPosition,
//                    end = o.targetingIsoformsMap[isoName].lastPosition;
//                proPep.push({
//                    x: start,
//                    y: end,
//                    matureLength: end - start,
//                    description: o.description
//                });
//            }
//        }
//    );
//
//    var antibody = [];
//    pepData[6].forEach(function (o) {
//            if (o.isoformSpecificity.hasOwnProperty(isoName)) {
//                var start = o.isoformSpecificity[isoName].positions[0].first;
//                var end = o.isoformSpecificity[isoName].positions[0].second;
//
//                antibody.push({
//                    x: start,
//                    y: end,
//                    pepLength: end - start,
//                    description: o.antibodyUniqueName
//                });
//            }
//        }
//    );
//    var disBonds = [];
//    pepData[7].forEach(function (o) {
//            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
//                var start = o.targetingIsoformsMap[isoName].firstPosition,
//                    end = o.targetingIsoformsMap[isoName].lastPosition;
//                disBonds.push([
//                    {
//                        x: start,
//                        y: 0
//                    }, {
//                        x: end,
//                        y: 0
//                    }, {
//                        x: end,
//                        y: 0
//                    }
//                ]);
//            }
//        }
//    );
//
//
//    // SORTING DATA
//    srmPeptides.sort(function (a, b) {
//        return a.pepLength - b.pepLength;
//    });
//    peptides.sort(function (a, b) {
//        return a.pepLength - b.pepLength;
//    });
//    srmPeptides.sort(function (a, b) {
//        return a.x - b.x;
//    });
//
//    peptides.sort(function (a, b) {
//        return a.x - b.x;
//    });
//    disBonds.sort(function (a, b) {
//        return a[0].x - b[0].x;
//    });
//
//    //ADD LEVEL TO DATA (peptides overlapping)
//
//    function addLevel(array) {
//        leveling = [];
//        array.forEach(function (d) {
//            if (leveling === []) {
//                leveling.push(d.y);
//                d.level = 0;
//            }
//            else {
//                var placed = false;
//                for (var k = 0; k < leveling.length; k++) {
//                    if (d.x > leveling[k]) {
//                        placed = true;
//                        d.level = k;
//                        leveling[k] = d.y;
//                        break;
//                    }
//                }
//                if (placed === false) {
//                    leveling.push(d.y);
//                    d.level = leveling.length - 1;
//                }
//            }
//        });
//        return leveling;
//    }
//
//    function addLevelToBond(array) {
//        leveling = [];
//        array.forEach(function (d) {
//            if (leveling === []) {
//                leveling.push(d[2].x);
//                d[1].y = 1;
//            }
//            else {
//                var placed = false;
//                for (var k = 0; k < leveling.length; k++) {
//                    if (d[0].x > leveling[k]) {
//                        placed = true;
//                        d[1].y = k + 1;
//                        leveling[k] = d[2].x;
//                        break;
//                    }
//                }
//                if (placed === false) {
//                    leveling.push(d[2].x);
//                    d[1].y = leveling.length;
//                }
//            }
//        });
//        return leveling;
//    }
//
//    var level = addLevel(peptides);
//    addLevel(srmPeptides);
//    addLevelToBond(disBonds);
//    console.log(disBonds);
//
//    var margin = {top: 20, right: 20, bottom: 60, left: 100},
//        width = $(window).width() - margin.left - margin.right - 17,
//        height = 800 - margin.top - margin.bottom;
//
//
//    // SCALE FUNCTIONS
//    var scaling = d3.scale.linear()
//        .domain([0, sequence.length])
//        .range([0, width]);
//
//    var X = function (d) {
//        return scaling(d.x);
//    };
//    var pepWidth = function (d) {
//        return (scaling(d.y) - scaling(d.x));
//    };
//    var displaySequence = function (seq) {
//        return width / seq > 5;
//    };
//
//    var lineBond = d3.svg.line()
//        .interpolate("step-before")
//        .x(function (d) {
//            return scaling(d.x);
//        })
//        .y(function (d) {
//            return -d.y * 10 + 40;
//        });
//
//    var line = d3.svg.line()
//        .interpolate("linear")
//        .x(function (d) {
//            return scaling(d.x);
//        })
//        .y(function (d) {
//            return d.y + 6;
//        });


//// Create SVG
//var svg = d3.select(".chart").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom);
//var svgContainer = svg
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//
////Create Clip-Path
//svgContainer.append("defs").append("clipPath")
//    .attr("id", "clip")
//    .append("rect")
//    .attr("width", width)
//    .attr("height", height);


//    //Create group of sequence
//    var seqText = function (sequence, start) {
//        if (!start) var start = 0;
//        svgContainer.append("g")
//            .attr("class", "seqGroup")
//            .selectAll(".AA")
//            .data(sequence)
//            .enter()
//            .append("text")
//            .attr("clip-path", "url(#clip)")
//            .attr("class", "AA")
//            .attr("x", function (d, i) {
//                return scaling(i + start)
//            })
//            .attr("y", 350)
//            .attr("font-size", "10px")
//            .attr("font-family", "monospace")
//            .text(function (d, i) {
//                return d
//            });
//    };
//    if (displaySequence(sequence.length)) {
//        seqText(sequence);
//    }
//    //Create rect for each peptide
//
//    var rectsPro = svgContainer.append("g")
//        .attr("class", "testing")
//        .attr("transform", "translate(0," + 20 + ")");
//
//    rectsPro.selectAll(".pro")
//        .data(proPep)
//        .enter()
//        .append("rect")
//        .attr("clip-path", "url(#clip)")
//        .attr("class", "pro")
//        .attr("x", X)
//        .attr("width", pepWidth)
//        .attr("height", 12)
//        .append("text")
//        .style("z-index",10)
//        .style("color", "black")
//        .text(function (d) {return d.description});
//
//    rectsPro.append("path")
//        .attr("d", line([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
//        .style("stroke", "#B3B3B3")
//        .style("stroke-width", "1px");
//
//    var rectsMature = svgContainer.append("g")
//        .attr("class", "testing")
//        .attr("transform", "translate(0," + 40 + ")");
//
//    rectsMature.selectAll(".mature")
//        .data(matures)
//        .enter()
//        .append("rect")
//        .attr("clip-path", "url(#clip)")
//        .attr("class", "mature")
//        .attr("x", X)
//        .attr("width", pepWidth)
//        .attr("height", 12);
//
//    rectsMature.append("path")
//        .attr("d", line([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
//        .style("stroke", "#B3B3C2")
//        .style("stroke-width", "1px");
//
//    var rectsSignal = svgContainer.append("g")
//        .attr("class", "testing")
//        .attr("transform", "translate(0," + 60 + ")");
//
//    rectsSignal.selectAll(".signal")
//        .data(signalPep)
//        .enter()
//        .append("rect")
//        .attr("clip-path", "url(#clip)")
//        .attr("class", "signal")
//        .attr("x", X)
//        .attr("width", pepWidth)
//        .attr("height", 12);
//
//    rectsSignal.append("path")
//        .attr("d", line([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
//        .style("stroke", "#B3B3E1")
//        .style("stroke-width", "1px");
//
//    var pathsDB = svgContainer.append("g")
//        .attr("class", "pathing")
//        .attr("transform", "translate(0," + 80 + ")");
//
//    pathsDB.selectAll(".dsB")
//        .data(disBonds)
//        .enter()
//        .append("path")
//        .attr("clip-path", "url(#clip)")
//        .attr("class", "dsB")
//        .attr("d", lineBond)
//        .style("fill", "none")
//        .style("stroke", "#8585FF")
//        .style("stroke-width", "2px");
//
//    pathsDB.append("path")
//        .attr("d", lineBond([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
//        .style("stroke", "#8585FF")
//        .style("stroke-width", "1px");
//
//
//    var rectsAnti = svgContainer.append("g")
//        .attr("class", "testing")
//        .attr("transform", "translate(0," + 140 + ")");
//
//    rectsAnti.selectAll(".antiB")
//        .data(antibody)
//        .enter()
//        .append("rect")
//        .attr("clip-path", "url(#clip)")
//        .attr("class", "antiB")
//        .attr("x", X)
//        .attr("width", pepWidth)
//        .attr("height", 12);
//
//    rectsAnti.append("path")
//        .attr("d", line([{x: 0, y: 0}, {x: sequence.length, y: 0}]))
//        .style("stroke", "#B3C2F0")
//        .style("stroke-width", "1px");
//
//    var rectsPep = svgContainer.append("g")
//        .attr("class", "peptideMapping")
//        .attr("transform", "translate(0," + 160 + ")");
//
//    var rectsPep2 = rectsPep.selectAll(".pep")
//        .data(peptides)
//        .enter()
//        .append("rect")
//        .attr("clip-path", "url(#clip)")
//        .attr("class", "pep")
//        .attr("x", X)
//        .attr("y", function (d) {
//            return d.level * 10
//        })
//        .attr("width", pepWidth)
//        .attr("height", 8);
//
//    console.log(level.length);
//    for (var i = 0; i < level.length; i++) {
//        rectsPep.append("path")
//            .attr("d", line([{x: 0, y: (i * 10 -2)}, {x: sequence.length, y: (i * 10 -2)}]))
//            .style("stroke", "#B3E1D1")
//            .style("z-index", 0)
//            .style("stroke-width", "1px");
//    }
//
//    var rectsSrmPep = svgContainer.append("g")
//        .attr("class", "peptideMapping")
//        .attr("transform", "translate(0," + (180 + level.length * 10) + ")");
//
//    rectsSrmPep.selectAll(".srmPep")
//        .data(srmPeptides)
//        .enter()
//        .append("rect")
//        .attr("clip-path", "url(#clip)")
//        .attr("class", "srmPep")
//        .attr("x", X)
//        .attr("y", function (d) {
//            return d.level * 10
//        })
//        .attr("width", pepWidth)
//        .attr("height", 8);
//
//    rectsSrmPep.append("path")
//        .attr("d", line([{x: 0, y: -2}, {x: sequence.length, y: -2}]))
//        .style("stroke", "#B3E1F0")
//        .style("stroke-width", "1px");
//
//    // Create X-axis
//    var xAxis = d3.svg.axis()
//        .scale(scaling)
//        .tickFormat(d3.format("d"))
//        .orient("bottom");
//
//    svgContainer.append("g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0," + 400 + ")")
//        .call(xAxis);
//
//    var yData = [{title:"Propeptide", y:20},{title:"Mature protein",y:40},{title:"Signal peptide",y:60},{title:"Disulfide bonds",y:112},{title:"Antibody",y:140},{title:"Peptide",y:160},{title:"Srm peptide",y:(180+level.length*10)},{title:"Sequence",y:340}];
//    var yy = d3.scale.ordinal()
//        .domain([0,yData.length]) //number of columns is a spreadsheet-like system
//        .rangeRoundBands([0,500], .1);
//
//    var axiss = d3.svg.axis()
//        .scale(yy)
//        .tickValues(yData) //specify an array here for values
//        .tickFormat( function(d) { return d } )
//        .orient("left");
//
//    svg.append("g")
//        .attr("class", "pro axis")
//        .attr("transform", "translate(0," + margin.top + ")")
//        .selectAll(".yaxis")
//        .data(yData)
//        .enter()
//        .append("text")
//        .attr("class","yaxis")
//        .attr("text-anchor", "end")
//        .attr("x", function () { return margin.left-10})
//        .attr("y", function(d) { return d.y+8 })
//        .text(function(d) { return d.title});
//
//    // BRUSH
//    var brush = d3.svg.brush()
//        .x(scaling)
//        .on("brush", brushmove)
//        .on("brushend", brushend);
//
//    svgContainer.append("g")
//        .attr("class", "brush")
//        .call(brush)
//        .selectAll("rect")
//        .attr('height', 500);
//
//    // Show peptide selected in brush
//    function brushmove() {
//        var extent = brush.extent();
//        rectsPep2.classed("selected", function (d) {
//            is_brushed = extent[0] <= d.x && d.x <= extent[1] && extent[0] <= d.y && d.y <= extent[1];
//            return is_brushed;
//        });
//    }
//
//    function brushend() {
//
//        // Check if brush is big enough before zooming
//        var extent = brush.extent();
//        var extentLength = Math.abs(extent[0] - extent[1]);
//
//        if (extent[0] < extent[1]) var start = parseInt(extent[0] - 1), end = parseInt(extent[1] + 1);
//        else var start = parseInt(extent[1] + 1), end = parseInt(extent[0] - 1);
//
//        var seq = displaySequence(extentLength);
//        if (!brush.empty() && extentLength > 5) {
//
//            if (seq && svgContainer.selectAll(".AA").empty()) seqText(sequence.substring(start, end), start);
//
//            //modify scale
//            scaling.domain(extent);
//
//            transition_data(seq, start);
//            reset_axis();
//
//            rectsPep2.classed("selected", false);
//            d3.select(".brush").call(brush.clear());
//        }
//        else {
//            d3.select(".brush").call(brush.clear());
//            resetAll();
//        }
//    }
//
//    // If brush is too small, reset view as origin
//    function resetAll() {
//
//        //reset scale
//        scaling.domain([0, sequence.length]);
//        var seq = displaySequence(sequence.length);
//
//        if (seq === false && !svgContainer.selectAll(".AA").empty()) svgContainer.selectAll(".AA").remove();
//
//        transition_data(seq, 0);
//        reset_axis();
//    }
//
//    function transition_data(seq, start) {
//        svgContainer.selectAll(".pro")
//            .data(proPep)
//            //.transition()
//            //.duration(500)
//            .attr("x", function (d) {
//                return scaling(d.x)
//            })
//            .attr("width", function (d) {
//                return scaling(d.y) - scaling(d.x)
//            });
//        svgContainer.selectAll(".mature")
//            .data(matures)
//            //.transition()
//            //.duration(500)
//            .attr("x", function (d) {
//                return scaling(d.x)
//            })
//            .attr("width", function (d) {
//                return scaling(d.y) - scaling(d.x)
//            });
//        svgContainer.selectAll(".signal")
//            .data(signalPep)
//            //.transition()
//            //.duration(500)
//            .attr("x", function (d) {
//                return scaling(d.x)
//            })
//            .attr("width", function (d) {
//                return scaling(d.y) - scaling(d.x)
//            });
//        svgContainer.selectAll(".dsB")
//            .data(disBonds)
//            //.transition()
//            //.duration(500)
//            .attr("d", lineBond);
//        svgContainer.selectAll(".antiB")
//            .data(antibody)
//            //.transition()
//            //.duration(500)
//            .attr("x", function (d) {
//                return scaling(d.x)
//            })
//            .attr("width", function (d) {
//                return scaling(d.y) - scaling(d.x)
//            });
//        svgContainer.selectAll(".pep")
//            .data(peptides)
//            //.transition()
//            //.duration(500)
//            .attr("x", function (d) {
//                return scaling(d.x)
//            })
//            .attr("width", function (d) {
//                return scaling(d.y) - scaling(d.x)
//            });
//
//        svgContainer.selectAll(".srmPep")
//            .data(srmPeptides)
//            //.transition()
//            //.duration(500)
//            .attr("x", function (d) {
//                return scaling(d.x)
//            })
//            .attr("width", function (d) {
//                return scaling(d.y) - scaling(d.x)
//            });
//        svgContainer.selectAll(".AA")
//            .data(sequence)
//            //.transition()
//            //.duration(500)
//            .attr("x", function (d, i) {
//                return scaling(i + start)
//            });
//    }
//
//    function reset_axis() {
//        svgContainer
//            .transition().duration(500)
//            .select(".x.axis")
//            .call(xAxis);
//    }
//
//    // Add vertical line
//    // (futur purpose : small rectangle at the bottom of the line, showing a part of the sequence fisheye-like)
//    var vertical = d3.select(".chart")
//            .append("div")
//            .attr("class", "remove")
//            .style("position", "absolute")
//            .style("z-index", "19")
//            .style("width", "1px")
//            .style("height", "500px")
//            .style("top", "20px")
//            .style("bottom", "30px")
//            .style("left", "0px")
//            .style("background", "#000");
//
//    d3.select(".chart")
//        .on("mousemove", function () {
//            mousex = d3.mouse(this);
//            mousex = mousex[0] + 7;
//            vertical.style("left", mousex + "px")
//        });
//    //.on("mouseover", function(){
//    //    mousex = d3.mouse(this);
//    //    mousex = mousex[0] + 5;
//    //    vertical.style("left", mousex + "px")});
//
//});
}));