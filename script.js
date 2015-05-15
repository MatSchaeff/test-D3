// Create an instance of nextprot API
var Nextprot = window.Nextprot;
var nx = new Nextprot.Client();

var entry = nx.getEntryName();

// Get peptide & sequence from async call of nextprot API
Promise.all([nx.getPeptide(entry),nx.getProteinSequence(entry)]).then(function (pepData) {
    console.log(pepData);
    var sequence = pepData[1][1].sequence;
    console.log(sequence);

    // Create & fill new array of peptides with infos of interest
    var peptides = [];
    pepData[0].forEach(function (o) {
        if (o.isoformSpecificity.hasOwnProperty(entry + "-2")) {
            peptides.push({
                x: o.isoformSpecificity[entry + "-2"].positions[0].first,
                y: o.isoformSpecificity[entry + "-2"].positions[0].second,
                pepLength: o.isoformSpecificity[entry + "-2"].positions[0].second - o.isoformSpecificity[entry + "-2"].positions[0].first,
                level: 0
            });
        }
    });

    // SORTING DATA
    peptides.sort(function (a, b) {
        return a.pepLength - b.pepLength;
    });
    peptides.sort(function (a, b) {
        return a.x - b.x;
    });

    //ADD LEVEL TO DATA (peptides overlapping)
    var leveling = [];
    function addLevel (d) {
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
    }
    peptides.forEach(function (o) {
        addLevel(o);
    });


    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = 2400 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    // SCALE
    var scaling = d3.scale.linear()
        .domain([0, sequence.length])
        .range([0, width]);

    var X = function (d) {
        return scaling(d.x);
    };
    var Y = function (d) {
        return d.level * 10 + 10;
    };
    var pepWidth = function (d) {
        return (scaling(d.y) - scaling(d.x));
    };

    // Create SVG
    var svgContainer = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create X-axis
    var xAxis = d3.svg.axis()
        .scale(scaling)
        .tickFormat(d3.format("d"))
        .orient("bottom");

    svgContainer.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 400 + ")")
        .call(xAxis);

    //Create Clip-Path
    svgContainer.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    //Create group of sequence
    svgContainer.append("g")
        .attr("class", "seqGroup")
        .selectAll(".AA")
        .data(sequence)
        .enter()
        .append("text")
        .attr("clip-path", "url(#clip)")
        .attr("class","AA")
        .attr("x", function(d,i) { return scaling(i)})
        .attr("y", 200)
        .attr("font-family", "monospace")
        .text(function (d,i) { return d});

    //Create rect for each peptide
    var rects = svgContainer.append("g")
        .attr("class", "testing")
        .selectAll(".recto")
        .data(peptides)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("class","recto")
        .attr("x", X)
        .attr("y", Y)
        .attr("width", pepWidth)
        .attr("height", 8);

    // BRUSH
    var brush = d3.svg.brush()
        .x(scaling)
        .on("brush", brushmove)
        .on("brushend", brushend);

    svgContainer.append("g")
        .attr("class", "brush")
        .call(brush)
        .selectAll("rect")
        .attr('height', 500);

    // Show peptide selected in brush
    function brushmove() {
        var extent = brush.extent();
        rects.classed("selected", function (d) {
            is_brushed = extent[0] <= d.x && d.x <= extent[1] && extent[0] <= d.y && d.y <= extent[1];
            return is_brushed;
        });
    }

    function brushend() {

        // Check if brush is big enough before zooming
        if (!brush.empty() && Math.abs(brush.extent()[0] - brush.extent()[1]) > 2) {
            //modify scale
            scaling.domain(brush.extent());

            transition_data();
            reset_axis();

            rects.classed("selected", false);
            d3.select(".brush").call(brush.clear());
        }
        else {
            resetAll();
        }
    }
    // If brush is too small, reset view as origin
    function resetAll() {
        //reset scale
        scaling.domain([0, sequence.length]);

        transition_data();
        reset_axis();
    }

    function transition_data() {
        svgContainer.selectAll(".recto")
            .data(peptides)
            .transition()
            .duration(500)
            .attr("x", function (d) {
                return scaling(d.x)
            })
            .attr("width", function (d) {
                return scaling(d.y) - scaling(d.x)
            });
        svgContainer.selectAll(".AA")
            .data(sequence)
            .transition()
            .duration(500)
            .attr("x", function (d,i) {
                return scaling(i)
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
        .style("height", "450px")
        .style("top", "20px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#000");

    d3.select(".chart")
        .on("mousemove", function(){
            mousex = d3.mouse(this);
            mousex = mousex[0] + 5;
            vertical.style("left", mousex + "px" )})
        .on("mouseover", function(){
            mousex = d3.mouse(this);
            mousex = mousex[0] + 5;
            vertical.style("left", mousex + "px")});

});