// Create an instance of nextprot API
var Nextprot = window.Nextprot;
var nx = new Nextprot.Client();

var entry = nx.getEntryName();

// Get peptide & sequence from async call of nextprot API
Promise.all([nx.getPeptide(entry), nx.getSrmPeptide(entry), nx.getProteinSequence(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getProPeptide(entry), nx.getAntibody(entry), nx.getDisulfideBond(entry)]).then(function (pepData) {
    console.log(pepData[2]);
    var isoName = entry + "-1";
    console.log(isoName);

    // Create & fill new array of peptides with infos of interest
    var sequence = "";
    pepData[2].forEach(function (o) {
        if (o.uniqueName === isoName) return sequence = o.sequence;
    });

    // Create & fill new array of peptides with infos of interest
    var peptides = [];
    pepData[0].forEach(function (o) {
        if (o.isoformSpecificity.hasOwnProperty(isoName)) {
            var start = o.isoformSpecificity[isoName].positions[0].first;
            var end = o.isoformSpecificity[isoName].positions[0].second;

            peptides.push({
                x: start,
                y: end,
                pepLength: end - start,
                level: 0
            });
        }
    });

    var srmPeptides = [];
    pepData[1].forEach(function (o) {
        if (o.isoformSpecificity.hasOwnProperty(isoName)) {
            var start = o.isoformSpecificity[isoName].positions[0].first;
            var end = o.isoformSpecificity[isoName].positions[0].second;

            srmPeptides.push({
                x: start,
                y: end,
                pepLength: end - start,
                level: 0
            });
        }
    });

    var matures = [];
    pepData[3].forEach(function (o) {
            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
                var start = o.targetingIsoformsMap[isoName].firstPosition,
                    end = o.targetingIsoformsMap[isoName].lastPosition;
                matures.push({
                    x: start,
                    y: end,
                    matureLength: end - start,
                    description: o.description
                });
            }
        }
    );

    var signalPep = [];
    pepData[4].forEach(function (o) {
            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
                var start = o.targetingIsoformsMap[isoName].firstPosition,
                    end = o.targetingIsoformsMap[isoName].lastPosition;
                signalPep.push({
                    x: start,
                    y: end,
                    signalLength: end - start,
                    description: o.uniqueName
                });
            }
        }
    );

    var proPep = [];
    pepData[5].forEach(function (o) {
            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
                var start = o.targetingIsoformsMap[isoName].firstPosition,
                    end = o.targetingIsoformsMap[isoName].lastPosition;
                proPep.push({
                    x: start,
                    y: end,
                    matureLength: end - start,
                    description: o.description
                });
            }
        }
    );

    var antibody = [];
    pepData[6].forEach(function (o) {
            if (o.isoformSpecificity.hasOwnProperty(isoName)) {
                var start = o.isoformSpecificity[isoName].positions[0].first;
                var end = o.isoformSpecificity[isoName].positions[0].second;

                antibody.push({
                    x: start,
                    y: end,
                    pepLength: end - start,
                    description: o.antibodyUniqueName
                });
            }
        }
    );
    var disBonds = [];
    pepData[7].forEach(function (o) {
            if (o.targetingIsoformsMap.hasOwnProperty(isoName)) {
                var start = o.targetingIsoformsMap[isoName].firstPosition,
                    end = o.targetingIsoformsMap[isoName].lastPosition;
                disBonds.push([
                    {
                        x:start,
                        y:0
                    },{
                        x:end,
                        y:0
                    },{
                        x:end,
                        y:0
                    }
                ]);
            }
        }
    );

    var line = d3.svg.line()
        .interpolate("step-before")
        .x(function (d) {return d.x*20;})
        .y(function (d) {return 40-d.y*10;});


    // SORTING DATA
    srmPeptides.sort(function (a, b) {
        return a.pepLength - b.pepLength;
    });
    peptides.sort(function (a, b) {
        return a.pepLength - b.pepLength;
    });
    srmPeptides.sort(function (a, b) {
        return a.x - b.x;
    });

    peptides.sort(function (a, b) {
        return a.x - b.x;
    });

    //ADD LEVEL TO DATA (peptides overlapping)

    function addLevel(array) {
        leveling = [];
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
        return leveling;
    }

    function addLevelToBond(array) {
        leveling = [];
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
                        d[1].y = k+1;
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
        return leveling;
    }

    var level = addLevel(peptides);
    addLevel(srmPeptides);
    addLevelToBond(disBonds);
    console.log(disBonds);

    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = $(window).width() - margin.left - margin.right - 17,
        height = 800 - margin.top - margin.bottom;


    // SCALE FUNCTIONS
    var scaling = d3.scale.linear()
        .domain([0, sequence.length])
        .range([0, width]);

    var X = function (d) {
        return scaling(d.x);
    };
    var pepWidth = function (d) {
        return (scaling(d.y) - scaling(d.x));
    };
    var displaySequence = function (seq) {
        return width / seq > 5;
    };


    // Create SVG
    var svgContainer = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //Create Clip-Path
    svgContainer.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);


    //Create group of sequence
    var seqText = function (sequence, start) {
        if (!start) var start = 0;
        svgContainer.append("g")
            .attr("class", "seqGroup")
            .selectAll(".AA")
            .data(sequence)
            .enter()
            .append("text")
            .attr("clip-path", "url(#clip)")
            .attr("class", "AA")
            .attr("x", function (d, i) {
                return scaling(i + start)
            })
            .attr("y", 450)
            .attr("font-size", "10px")
            .attr("font-family", "monospace")
            .text(function (d, i) {
                return d
            });
    };
    if (displaySequence(sequence.length)) {
        seqText(sequence);
    }
    //Create rect for each peptide

    var rectsPro = svgContainer.append("g")
        .attr("class", "testing")
        .attr("transform", "translate(0," + 20 + ")")
        .selectAll(".pro")
        .data(proPep)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("class", "pro")
        .attr("x", X)
        .attr("width", pepWidth)
        .attr("height", 12);

    var rectsMature = svgContainer.append("g")
        .attr("class", "testing")
        .attr("transform", "translate(0," + 40 + ")")
        .selectAll(".mature")
        .data(matures)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("class", "mature")
        .attr("x", X)
        .attr("width", pepWidth)
        .attr("height", 12);

    var rectsSignal = svgContainer.append("g")
        .attr("class", "testing")
        .attr("transform", "translate(0," + 60 + ")")
        .selectAll(".signal")
        .data(signalPep)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("class", "signal")
        .attr("x", X)
        .attr("width", pepWidth)
        .attr("height", 12);

    var pathsDB = svgContainer.append("g")
        .attr("class", "testing")
        .attr("transform", "translate(0," + 80 + ")")
        .selectAll(".dsB")
        .data(disBonds)
        .enter()
        .append("path")
        .attr("clip-path", "url(#clip)")
        .attr("class", "dsB")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#8585FF")
        .style("stroke-width", "2px");

    var rectsAnti = svgContainer.append("g")
        .attr("class", "testing")
        .attr("transform", "translate(0," + 140 + ")")
        .selectAll(".antiB")
        .data(antibody)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("class", "antiB")
        .attr("x", X)
        .attr("width", pepWidth)
        .attr("height", 12);

    var rectsPep = svgContainer.append("g")
        .attr("class", "peptideMapping")
        .attr("transform", "translate(0," + 160 + ")")
        .selectAll(".pep")
        .data(peptides)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("class", "pep")
        .attr("x", X)
        .attr("y", function (d) {
            return d.level * 10
        })
        .attr("width", pepWidth)
        .attr("height", 8);

    var rectsSrmPep = svgContainer.append("g")
        .attr("class", "peptideMapping")
        .attr("transform", "translate(0," + (180 + level.length * 10) + ")")
        .selectAll(".srmPep")
        .data(srmPeptides)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("class", "srmPep")
        .attr("x", X)
        .attr("y", function (d) {
            return d.level * 10
        })
        .attr("width", pepWidth)
        .attr("height", 8);

    // Create X-axis
    var xAxis = d3.svg.axis()
        .scale(scaling)
        .tickFormat(d3.format("d"))
        .orient("bottom");

    svgContainer.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 500 + ")")
        .call(xAxis);

    // BRUSH
    var brush = d3.svg.brush()
        .x(scaling)
        //.on("brush", brushmove)
        .on("brushend", brushend);

    svgContainer.append("g")
        .attr("class", "brush")
        .call(brush)
        .selectAll("rect")
        .attr('height', 500);

    // Show peptide selected in brush
    //function brushmove() {
    //    var extent = brush.extent();
    //    //rectsPep.classed("selected", function (d) {
    //    //    is_brushed = extent[0] <= d.x && d.x <= extent[1] && extent[0] <= d.y && d.y <= extent[1];
    //    //    return is_brushed;
    //    //});
    //}

    function brushend() {

        // Check if brush is big enough before zooming
        var extent = brush.extent();
        var extentLength = Math.abs(extent[0] - extent[1]);

        if (extent[0] < extent[1]) var start = parseInt(extent[0] - 1), end = parseInt(extent[1] + 1);
        else var start = parseInt(extent[1] + 1), end = parseInt(extent[0] - 1);

        var seq = displaySequence(extentLength);
        if (!brush.empty() && extentLength > 2) {

            if (seq && svgContainer.selectAll(".AA").empty()) seqText(sequence.substring(start, end), start);

            //modify scale
            scaling.domain(extent);

            transition_data(seq, start);
            reset_axis();

            //rectsPep.classed("selected", false);
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

        transition_data(seq, 0);
        reset_axis();
    }

    function transition_data(seq, start) {
        svgContainer.selectAll(".pro")
            .data(proPep)
            //.transition()
            //.duration(500)
            .attr("x", function (d) {
                return scaling(d.x)
            })
            .attr("width", function (d) {
                return scaling(d.y) - scaling(d.x)
            });
        svgContainer.selectAll(".mature")
            .data(matures)
            //.transition()
            //.duration(500)
            .attr("x", function (d) {
                return scaling(d.x)
            })
            .attr("width", function (d) {
                return scaling(d.y) - scaling(d.x)
            });
        svgContainer.selectAll(".signal")
            .data(signalPep)
            //.transition()
            //.duration(500)
            .attr("x", function (d) {
                return scaling(d.x)
            })
            .attr("width", function (d) {
                return scaling(d.y) - scaling(d.x)
            });
        svgContainer.selectAll(".antiB")
            .data(antibody)
            //.transition()
            //.duration(500)
            .attr("x", function (d) {
                return scaling(d.x)
            })
            .attr("width", function (d) {
                return scaling(d.y) - scaling(d.x)
            });
        svgContainer.selectAll(".pep")
            .data(peptides)
            //.transition()
            //.duration(500)
            .attr("x", function (d) {
                return scaling(d.x)
            })
            .attr("width", function (d) {
                return scaling(d.y) - scaling(d.x)
            });

        svgContainer.selectAll(".srmPep")
            .data(srmPeptides)
            //.transition()
            //.duration(500)
            .attr("x", function (d) {
                return scaling(d.x)
            })
            .attr("width", function (d) {
                return scaling(d.y) - scaling(d.x)
            });
        svgContainer.selectAll(".AA")
            .data(sequence)
            //.transition()
            //.duration(500)
            .attr("x", function (d, i) {
                return scaling(i + start)
            });
    }

    function reset_axis() {
        svgContainer
            .transition().duration(500)
            .select(".x.axis")
            .call(xAxis);
    }

    // Add vertical line
    // (futur purpose : small rectangle at the bottom of the line, showing a part of the sequence fisheye-like)
    var vertical = d3.select(".chart")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", "300px")
            .style("top", "20px")
            .style("bottom", "30px")
            .style("left", "0px")
            .style("background", "#000")
    //.append("div")
    //.attr("class", "remove")
    //.style("position", "absolute")
    //.style("z-index", "19")
    //.style("width", "60px")
    //.style("height", "30px")
    //.style("top", "190px")
    //.style("bottom", "30px")
    //.style("left", "0px")
    //.style("background", "#000")
        ;

    //var fisheye = d3.fisheye.circular()
    //    .radius(200)
    //    .distortion(2);
    //
    //svgContainer.on("mousemove", function() {
    //    fisheye.focus(d3.mouse(this));
    //
    //    svgContainer.selectAll(".AA").data(sequence)
    //        .attr("x", function(d,i) {
    //            console.log(fisheye(200));
    //            return fisheye(scaling(i)); });
    //.attr("font-size", function(d,i) { return d.fisheye(1); });

    //link.attr("x1", function(d) { return d.source.fisheye.x; })
    //    .attr("y1", function(d) { return d.source.fisheye.y; })
    //    .attr("x2", function(d) { return d.target.fisheye.x; })
    //    .attr("y2", function(d) { return d.target.fisheye.y; });
    //});

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

});