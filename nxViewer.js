function FeatureViewer(sequence, div) {
    // if (!div) var div = window;
    var div = div;
    var sequence = sequence;
    var features = [];
    var SVGOptions = {
        showSequence:false,
        brushActive:false,
        verticalLine:false
    };

    var pathLevel=0;
    var svg;
    var svgContainer;
    var yData = [];
    var yAxisSVG;
    var Yposition = 20;
    var level=0;
    var seqShift=0;

    d3.helper = {};

    d3.helper.tooltip = function(object){
        var tooltipDiv;
        var bodyNode = d3.select('body').node();

        function tooltip(selection){

            selection.on('mouseover.tooltip', function(pD, pI){
                // Clean up lost tooltips
                d3.select('body').selectAll('div.tooltip').remove();
                // Append tooltip
                tooltipDiv = d3.select('body')
                               .append('div')
                               .attr('class', 'tooltip2');
                var absoluteMousePos = d3.mouse(bodyNode);
                tooltipDiv.style({
                    left: (absoluteMousePos[0]-30)+'px',
                    top: (absoluteMousePos[1]-52)+'px',
                    'background-color': 'rgba(0, 0, 0, 0.8)',
                    width: 'auto',
                    'max-width': '170px',
                    height: 'auto',
                    'max-height': '43px',
                    padding: '5px',
                    "font": '10px sans-serif',
                    'text-align':'center',
                    position: 'absolute',
                    'z-index': 1001,
                    'box-shadow': '0 1px 2px 0 #656565'
                });
                if (object.type === "path") {
                    var first_line = '<p style="margin:2px;color:white">start : <span style="color:orangered">' + pD[0].x + '</span></p>';
                    var second_line = '<p style="margin:2px;color:white">end : <span style="color:orangered">' + pD[1].x + '</span></p>';
                }
                else{
                    var first_line = '<p style="margin:2px;color:orangered">' + pD.x + ' - ' + pD.y + '</p>';
                    if (pD.description) var second_line = '<p style="margin:2px;color:white;font-size:9px">' + pD.description + '</p>';
                    else var second_line = '';
                }

                tooltipDiv.html(first_line + second_line)
            })
            .on('mousemove.tooltip', function(pD, pI){
                // Move tooltip
                var absoluteMousePos = d3.mouse(bodyNode);
                tooltipDiv.style({
                    left: (absoluteMousePos[0]-30)+'px',
                    top: (absoluteMousePos[1] - 52)+'px'
                });
            })
            .on('mouseout.tooltip', function(pD, pI){
                // Remove tooltip
                tooltipDiv.remove();
            });

        }

        tooltip.attr = function(_x){
            if (!arguments.length) return attrs;
            attrs = _x;
            return this;
        };

        tooltip.style = function(_x){
            if (!arguments.length) return styles;
            styles = _x;
            return this;
        };

        return tooltip;
    };


    //Init box & scaling
    var margin = {top: 20, right: 20, bottom: 60, left: 100},
        width = $(div).width() - margin.left - margin.right - 17,
        height = 500 - margin.top - margin.bottom;
    var scaling = d3.scale.linear()
        .domain([0, sequence.length-1])
        .range([0, width]);

    //COMPUTING FUNCTION
    var X = function (d) {
        return scaling(d.x);};
    var displaySequence = function (seq) {
        return width / seq > 5;};
    var pepWidth = function (d) {
        return (scaling(d.y) - scaling(d.x));};
    var uniqueWidth = function (d) {
        return (scaling(1));};

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
                    d.level = leveling.length-1;
                }
            }
        });
        return leveling.length;}
    function addLevelToBond(array) {
        var leveling = [];
        var newArray=[];
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
        return leveling.length;}
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

    //Create Axis
    var xAxis = d3.svg.axis()
        .scale(scaling)
        .tickFormat(d3.format("d"))
        .orient("bottom");
    function addXAxis(position) {
        svgContainer.append("g")
            .attr("class", "x axis Xaxis")
            .attr("transform", "translate(0," + (position+20) + ")")
            .call(xAxis);}
    function updateXaxis(position) {
        svgContainer.selectAll(".Xaxis")
            .attr("transform", "translate(0," + (position+20) + ")")
    }
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
    function addYAxis() {
        yAxisSVG = svg.append("g")
            .attr("class", "pro axis")
            .attr("transform", "translate(0," + margin.top + ")");
        yAxisSVG
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
    function updateYaxis() {
        yAxisSVG.selectAll(".yaxis")
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
    function forcePropagation(item) {
        item.on('mousedown', function(){
              brush_elm = svg.select(".brush").node();
              new_click_event = new Event('mousedown');
              new_click_event.pageX = d3.event.pageX;
              new_click_event.clientX = d3.event.clientX;
              new_click_event.pageY = d3.event.pageY;
              new_click_event.clientY = d3.event.clientY;
              brush_elm.dispatchEvent(new_click_event);
            });
    }
    var preComputing = {
        path : function(object) {
            object.data.sort(function (a, b) {
                return a.x - b.x;
            });
            var level = addLevel(object.data);
            object.data = object.data.map(function (d) {
                return [{x:d.x,y:0},{x:d.y,y:d.level+1},{x:d.y,y:0}]
            })
            pathLevel=level*10+5;
            object.height=level*10+5;
        },
        multipleRect : function(object) {
            object.data.sort(function (a, b) {
                return a.x - b.x;
            });
            level = addLevel(object.data);
            pathLevel=level*10+5;
        }
    }

    var fillSVG = {
        typeIdentifier: function(object) {
            if (object.type === "rect") {
                fillSVG.rectangle(object, sequence, Yposition);
                yData.push({title: object.name, y: Yposition});
            }
            else if (object.type === "text") {
                fillSVG.sequence(object.data, Yposition);
                yData.push({title: object.name, y: Yposition});
            }
            else if (object.type === "unique") {
                fillSVG.unique(object, sequence, Yposition);
                yData.push({title: object.name, y: Yposition});
            }
            else if (object.type === "multipleRect") {
                preComputing.multipleRect(object);
                fillSVG.multipleRect(object, sequence, Yposition,level);
                yData.push({title: object.name, y: Yposition});
                Yposition+=pathLevel;
            }
            else if (object.type === "path") {
                preComputing.path(object);
                fillSVG.path(object, sequence, Yposition);
                Yposition+=pathLevel;
                yData.push({title: object.name, y: Yposition-10});
            }
        },
        sequence: function (seq, position, start) {
            //Create group of sequence
            if (!start) var start = 0;
            svgContainer.append("g")
                .attr("class", "seqGroup")
                .selectAll(".AA")
                .data(seq)
                .enter()
                .append("text")
                .attr("clip-path", "url(#clip)")
                .attr("class", "AA")
                .attr("text-anchor","left")
                .attr("x", function (d, i) {
                    return scaling.range([0, width-5])(i+start)
                })
                .attr("y", position)
                .attr("font-size", "10px")
                .attr("font-family", "monospace")
                .text(function (d, i) {
                    return d
                });
        },
        rectangle: function (object, sequence, position) {
            var rectsPro = svgContainer.append("g")
                .attr("class", "testing")
                .attr("transform", "translate(0," + position + ")");

            rectsPro.append("path")
                .attr("d", line([{x: 0, y: 0}, {x: sequence.length-1, y: 0}]))
                .attr("class", function () {
                    return "line" + object.className
                })
                .style("z-index", "0")
                .style("stroke", object.color)
                .style("stroke-width", "1px");

            rectsPro.selectAll("." + object.className)
                .data(object.data)
                .enter()
                .append("rect")
                .attr("clip-path", "url(#clip)")
                .attr("class", object.className)
                .attr("x", X)
                .attr("width", pepWidth)
                .attr("height", 12)
                .style("fill", object.color)
                .style("z-index", "3")
                .call(d3.helper.tooltip(object));

            forcePropagation(rectsPro);
        },
        unique: function (object, sequence, position) {
            var rectsPro = svgContainer.append("g")
                .attr("class", "testing")
                .attr("transform", "translate(0," + position + ")");

            rectsPro.append("path")
                .attr("d", line([{x: 0, y: 0}, {x: sequence.length-1, y: 0}]))
                .attr("class", function () {
                    return "line" + object.className
                })
                .style("stroke", object.color)
                .style("stroke-width", "1px");

            rectsPro.selectAll("." + object.className)
                .data(object.data)
                .enter()
                .append("rect")
                .attr("clip-path", "url(#clip)")
                .attr("class", object.className)
                .attr("x", X)
                .attr("width", uniqueWidth)
                .attr("height", 12)
                .style("fill", object.color)
                .style("stroke", "black")
                .style("stroke-width", "1px")
                .call(d3.helper.tooltip(object));

            forcePropagation(rectsPro);
        },
        path: function (object, sequence, position) {
            var pathsDB = svgContainer.append("g")
                .attr("class", "pathing")
                .attr("transform", "translate(0," + position + ")");

            pathsDB.append("path")
                .attr("d", lineBond([{x: 0, y: 0}, {x: sequence.length-1, y: 0}]))
                .style("stroke", object.color)
                .style("stroke-width", "1px");

            pathsDB.selectAll("." + object.className)
                .data(object.data)
                .enter()
                .append("path")
                .attr("clip-path", "url(#clip)")
                .attr("class", object.className)
                .attr("d", lineBond)
                .style("fill", "none")
                .style("stroke", object.color)
                .style("stroke-width", "2px")
                .call(d3.helper.tooltip(object));

            forcePropagation(pathsDB);
        },
        multipleRect: function (object, sequence, position, level) {
            var rectsPep = svgContainer.append("g")
                .attr("class", "peptideMapping")
                .attr("transform", "translate(0," + position + ")");

            for (var i = 0; i < level; i++) {
                rectsPep.append("path")
                    .attr("d", line([{x: 0, y: (i * 10 - 2)}, {x: sequence.length-1, y: (i * 10 - 2)}]))
                    .attr("class", function () {
                        return "line" + object.className
                    })
                    .style("stroke", object.color)
                    .style("stroke-width", "1px");
            }

            rectsPep.selectAll("." + object.className)
                .data(object.data)
                .enter()
                .append("rect")
                .attr("clip-path", "url(#clip)")
                .attr("class", object.className)
                .attr("x", X)
                .attr("y", function (d) {
                    return d.level * 10
                })
                .attr("width", pepWidth)
                .attr("height", 8)
                .style("fill", object.color)
                .call(d3.helper.tooltip(object));

            forcePropagation(rectsPep);
        }
    };

    var transition = {
        rectangle: function (object) {
            svgContainer.selectAll("." + object.className)
                .data(object.data)
                //.transition()
                //.duration(500)
                .attr("x", function (d) {
                    return scaling(d.x)
                })
                .attr("width", function (d) {
                    return scaling(d.y) - scaling(d.x)
                });
        },
        unique: function (object) {
            svgContainer.selectAll("." + object.className)
                .data(object.data)
                //.transition()
                //.duration(500)
                .attr("x", function (d) {
                    return scaling(d.x-0.5)
                })
                .attr("width", function (d) {
                    return scaling(d.x+0.5) - scaling(d.x-0.5)
                });
        },
        path: function (object) {
            svgContainer.selectAll("." + object.className)
                .data(object.data)
                //.transition()
                //.duration(500)
                .attr("d", lineBond.y(function (d) {
            return -d.y * 10 + object.height;
        }));
        },
        text: function (object,start) {
            svgContainer.selectAll("." + object.className)
                .data(object.data)
                //.transition()
                //.duration(500)
                .attr("x", function (d, i) {
                    return scaling(i+start)
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
            .attr('height', Yposition+50);
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

            if (SVGOptions.showSequence && seq && svgContainer.selectAll(".AA").empty()) {
                seqShift = start;
                fillSVG.sequence(sequence.substring(start,end), 20, seqShift);
            }

            //modify scale
            scaling.domain(extent);


            transition_data(features,seqShift);
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
        scaling.domain([0, sequence.length-1]);
        var seq = displaySequence(sequence.length);

        if (seq === false && !svgContainer.selectAll(".AA").empty()) svgContainer.selectAll(".seqGroup").remove();

        transition_data(features,0);
        reset_axis();
    }

    function transition_data(features,start) {
        features.forEach(function (o) {
            if (o.type === "rect" || o.type === "multipleRect") {
                transition.rectangle(o);
            }
            else if (o.type === "unique") {
                transition.unique(o);
            }
            else if (o.type === "path") {
                transition.path(o);
            }
            else if (o.type === "text") {
                transition.text(o,start);
            }
        });
    }

    function reset_axis() {
        svgContainer
            .transition().duration(500)
            .select(".x.axis")
            .call(xAxis);
    }

    function addVerticalLine() {
        var vertical = d3.select(".chart")
            .append("div")
            .attr("class", "Vline")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", (Yposition+50) + "px")
            .style("top", "30px")
            // .style("left", "0px")
            .style("background", "#000");

        d3.select(".chart")
            .on("mousemove.Vline", function () {
                mousex = d3.mouse(this)[0]-2;
                vertical.style("left", mousex+ "px")
            });
//.on("mouseover", function(){
//    mousex = d3.mouse(this);
//    mousex = mousex[0] + 5;
//    vertical.style("left", mousex + "px")});
    }

    function initSVG(div, options) {
        if (typeof options === 'undefined') {
            var options = {
                'showAxis': false,
                'showSequence': false,
                'brushActive':false,
                'verticalLine':false
            }
        }
        // Create SVG
        svg = d3.select(div).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        svgContainer = svg
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Create Clip-Path
        svgContainer.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        if (options.showSequence) {
            SVGOptions.showSequence=true;
            if (displaySequence(sequence.length)) {
                fillSVG.sequence(sequence, Yposition);
            }
            features.push({data: sequence, name: "Sequence",className: "AA", color: "black", type: "text"})
            yData.push({title: "sequence", y: Yposition-8});
        }
        if (options.showAxis) addXAxis(Yposition);
        addYAxis();
        if (options.brushActive) {
            SVGOptions.brushActive = true;
            addBrush();
        }
        if (options.verticalLine) {
            SVGOptions.verticalLine = true;
            addVerticalLine();
        }
    }
    function addFeature(object) {
        Yposition+=20;
        features.push(object);
        fillSVG.typeIdentifier(object);
        updateYaxis();
        updateXaxis(Yposition);
        if(SVGOptions.brushActive) {
            svgContainer.selectAll(".brush rect")
                .attr('height', Yposition+50);
        }
        if (SVGOptions.verticalLine) d3.selectAll(".Vline").style("height",(Yposition+50)+"px");

    }





    return {
        create:initSVG,
        addFeature:addFeature
    }
}