var Nextprot = window.Nextprot;
var nx = new Nextprot.Client();
var entry = nx.getEntryName();
var run;


Promise.all([nx.getPeptide(entry),nx.getProteinSequence(entry)]).then(function (data1) {
    console.log(data1);
    var sequence = data1[1][1].sequence;
    console.log(sequence);
    var block = [];

    var data2;
    //data1[0].forEach( function(o) {
    //    if (o.isoformSpecificity.hasOwnProperty(entry + "-2")) {
    //
    //        var start = parseInt(o.isoformSpecificity[entry + "-2"].positions[0].first*2400/sequence.length);
    //        var end = parseInt(o.isoformSpecificity[entry + "-2"].positions[0].second*2400/sequence.length);
    //
    //        //if(end != start){
    //
    //            block.push({
    //                x: start,
    //                y: end,
    //                pepLength: end - start,
    //                level: 0
    //            });
    //
    //        //}
    //    }
    //});

    console.log(block.length);

    data1[0].forEach(function (o) {
        if (o.isoformSpecificity.hasOwnProperty(entry + "-2")) {
            block.push({
                x: o.isoformSpecificity[entry + "-2"].positions[0].first,
                y: o.isoformSpecificity[entry + "-2"].positions[0].second,
                pepLength: o.isoformSpecificity[entry + "-2"].positions[0].second - o.isoformSpecificity[entry + "-2"].positions[0].first,
                level: 0
            });
        }
    });

    // SORTING DATA
    block.sort(function (a, b) {
        return a.pepLength - b.pepLength;
    });
    block.sort(function (a, b) {
        return a.x - b.x;
    });

    //ADD LEVEL TO DATA
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
    };
    block.forEach(function (o) {
        addLevel(o);
    });

    var X = function (d) {
        return scaling(d.x);
    };
    var Y = function (d) {
        return d.level * 10 + 10;
    };
    var pepWidth = function (d) {
        return (scaling(d.y) - scaling(d.x));
    };
    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = 2400 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    // SCALE

    var scaling = d3.scale.linear()
        .domain([0, sequence.length])
        .range([0, width]);
    var scaling2 = d3.scale.ordinal()
        .domain(sequence)
        .rangeRoundBands([0, width],1);

    var svgContainer = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("width",width);

    var xAxis = d3.svg.axis()
        .scale(scaling)
        .tickFormat(d3.format("d"))
        .orient("bottom");

    var xAxis2 = d3.svg.axis()
        .scale(scaling2)
        //.tickValues(sequence)
        //.tickFormat(d3.format("d"))
        .orient("bottom");

    svgContainer.append("defs").append("clipPath")
        .attr("id", "clipo")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    svgContainer.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 400 + ")")
        .call(xAxis);

    svgContainer.append("g")
        .attr("class", "seqGroup")
        .selectAll(".AA")
        .data(sequence)
        .enter()
        .append("text")
        .attr("clip-path", "url(#clipo)")
        .attr("class","AA")
        .attr("x", function(d,i) { return scaling(i)})
        .attr("y", 200)
        //.attr("font-size", "0.7em")
        .attr("font-family", "monospace")
        .text(function (d,i) { return d});

    var rects = svgContainer.append("g")
        .attr("class", "testing")
        .selectAll(".recto")
        .data(block)
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clipo)")
        .attr("class","recto")
        .attr("x", X)
        .attr("y", Y)
        .attr("width", pepWidth)
        .attr("height", 8);
        //.attr("x", function (d) {
        //    return d.x * 2
        //})
        //.attr("y", 10)
        //.attr("width", function (d) {
        //    return scaling(d.y) - scaling(d.x);
        //})
        //.attr("height", 8);

    //var text = svgContainer
    //    .append("text")
    //    .text(sequence)
    //    .attr("x", 0)
    //    .attr("y", 300)
    //    .attr("font-size", "8px");

    //run = function () {
    //    rects
    //        .transition()
    //        .duration(1500)
    //        .attr("x", X)
    //        .attr("x", X)
    //        .attr("y", Y)
    //        .attr("width", pepWidth)
    //        .height("height", 8);
    //};
    // BRUSH
    var brush = d3.svg.brush()
        .x(scaling)
        .on("brush", brushmove)
        .on("brushend", brushend);

    svgContainer.append("g")
        .attr("class", "brush")
        //.attr("clip-path", "url(#clip)")
        .call(brush)
        .selectAll("rect")
        .attr('height', 500);

    function brushmove() {
        var extent = brush.extent();
        rects.classed("selected", function (d) {
            is_brushed = extent[0] <= d.x && d.x <= extent[1] && extent[0] <= d.y && d.y <= extent[1];
            return is_brushed;
        });
    }

    function brushend() {
        //get_button = d3.select(".clear-button");
        //if (get_button.empty() === true) {
        //    clear_button = svgContainer.append('text')
        //        .attr("y", 460)
        //        .attr("x", 825)
        //        .attr("class", "clear-button")
        //        .text("Clear Brush");
        //}

        if (!brush.empty() && Math.abs(brush.extent()[0] - brush.extent()[1]) > 2) {
            console.log(brush.extent());
            scaling.domain(brush.extent());
            transition_data();
            reset_axis();
            rects.classed("selected", false);
            d3.select(".brush").call(brush.clear());
        }
        else {
            resetAll();
        }
        //clear_button.on('click', function () {
        //    resetAll();
        //});
    }
    function resetAll() {
        scaling.domain([0, sequence.length]);

        transition_data();
        reset_axis();
        //clear_button.remove();
    }

    function transition_data() {
        svgContainer.selectAll(".recto")
            .data(block)
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

    var vertical = d3.select(".chart")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "380px")
        .style("top", "10px")
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

// var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
// var svg = d3.select("svg");
// svg.selectAll("rect")
// .data(data)
// .enter().append("rect")
//   .attr("x", function(d,i) { return i*20+30; })
//   .attr("y", function(d,i){return 200-d;})
//   .attr("width", 10)
//   .attr("height", function(d,i) { return d; })
//   .style("fill", "steelblue");


// };