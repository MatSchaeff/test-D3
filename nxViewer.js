function FeatureViewer(sequence) {
    var sequence = sequence;
    var features = [];
    var pathLevel=0;
    var svgContainer;

    //Init box & scaling
    var margin = {top: 20, right: 20, bottom: 60, left: 100},
        width = $(window).width() - margin.left - margin.right - 17,
        height = 800 - margin.top - margin.bottom;

    var scaling = d3.scale.linear()
        .domain([0, sequence.length])
        .range([0, width]);

    //COMPUTING
    var X = function (d) {
        return scaling(d.x);
    };
    var displaySequence = function (seq) {
        return width / seq > 5;
    };
    var pepWidth = function (d) {
        return (scaling(d.y) - scaling(d.x));
    };
    var uniqueWidth = function (d) {
        return (scaling(1));
    };
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
            .attr("class", "x axis")
            .attr("transform", "translate(0," + position + ")")
            .call(xAxis);
    }

    function initSVG(div) {
        // Create SVG
        console.log(sequence.length);
        var svg = d3.select(div).append("svg")
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
        addXAxis(200);
    }




    return {
        create:initSVG
    }
}
