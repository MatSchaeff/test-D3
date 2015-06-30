($(function () {

    var Nextprot = window.Nextprot;
    var nx = new Nextprot.Client("test new nextprot feature viewer", "MatSchaeff-SIB");
    var entry = nx.getEntryName();
    var isoName = entry + "-1";
    //var cpt = 0;
    var ft;
    var seqView;
    var currentSeq;
    var isoforms;
	var featuresForViewer= [];
    var featuresByIsoform = [];
    var genomicMappings = [];
    var selectedRect;
    var filterOptions = {
        processing: true,
        region: true,
        site: true,
        residue: true,
        variant:true,
        none:true
    };

    function nxIsoformChoice(isoforms) {
        if ($("#nx-isoformChoice").length > 0) {
            var datas = {
                "isoforms": (function () {
                    var listIsoforms = {
                        "visible": [],
                        "more": []
                    };
                    isoforms.sort(function (a, b) {
                        return parseInt(a.uniqueName.split("-")[1]) - parseInt(b.uniqueName.split("-")[1])
                    }).forEach(function (o, index) {
                        if (index <= 3) listIsoforms.visible.push(o);
                        else listIsoforms.more.push(o);
                    });
                    return listIsoforms;
                }())
            };
            var template = HBtemplates['isoformChoice.tmpl'];
            var results = template(datas);
            $("#nx-isoformChoice").append(results);
            /////////// EventListener to change isoform
            getInfoForIsoform.isoform();

            $("#nx-isoformChoice li:first-child").addClass("active");
        }
    }
    function adjustHeight(div1,div2) {

        $(div1).height($(div2).height());
    }

    var getInfoForIsoform = {
        isoform: function () {
            $(".isoformNames").click(function () {
                isoName = $(this).text();
                getInfoForIsoform.reload(isoName);
            });
            $("#moreIsoforms a").click(function () {
                var parentThis = $(this).text();
                console.log(parentThis);
                $("#extendIsoformChoice").text(parentThis);
            });
        },
        reload: function (isoID) {
            console.log(isoID);
            $(".chart svg").remove();
            createSVG(isoforms,isoID);
            addFeatures(isoID);
            fillTable(isoID);
            applyFiltering();
            adjustHeight(".left-side",".right-side");
            adjustHeight("#seqViewer","#featuresTable");
            featureSelection();
            inverseSelection();
        },
        reloadSVG: function(isoID) {
            $(".chart svg").remove();
            createSVG(isoforms,isoID);
            addFeatures(isoID);
            featureSelection();
            inverseSelection();
        }
    };

    function displayIsoform(array,divIsoform) {
        //ft2 = new FeatureViewer(33000, "#isoformDisplayed", {
        //    showAxis: true,
        //    showSequence: false,
        //    brushActive: false,
        //    verticalLine: false
        //});

        //function getMax(array) {
        //    var max = 0;
        //    for (name in array) {
        //        for (var pos in array[name].positions) {
        //            if (array[name].positions[pos].second > max) max = array[name].positions[pos].second;
        //        }
        //    }
        //    return max;
        //}
        //var max = getMax(array);
        ////var max = Math.max($.merge(array.map(function (o) {
        ////    return o.positions.map(function (p) {
        ////        return p.second;
        ////    })
        ////})));
        //console.log(max);
        //console.log("ISOFORM SUPPOSED TO BE DISPLAY FFS");
        //var position = 20;
        //
        //var margin = {top: 10, right: 20, bottom: 60, left: 100},
        //    width = $(divIsoform).width() - margin.left - margin.right - 17,
        //    height = 200 - margin.top - margin.bottom;
        //var coverageLength = 33000;
        //var scaling = d3.scale.linear()
        //    .domain([0, max])
        //    .range([0, width]);
        //
        //var line = d3.svg.line()
        //    .interpolate("linear")
        //    .x(function (d) {
        //        return scaling(d.x);
        //    })
        //    .y(function (d) {
        //        return d.y + 6;
        //    });
        //
        //var svgIsoform = d3.select(divIsoform).append("svg")
        //    .attr("width", width + margin.left + margin.right)
        //    .attr("height", height + margin.top + margin.bottom)
        //    .style("z-index","2");
        //
        //function fillSVGIsoform(data,j) {
        //    //rectangle: function (object, sequence, position) {
        //    console.log("YOU ARE IN THE MATRIX");
        //        var rectHeight = 12;
        //        var rectShift = 20;
        //        var rectsPro = svgIsoform.append("g")
        //            .attr("class", "rectangle")
        //            .attr("transform", "translate(0," + position + ")");
        //
        //        rectsPro.append("path")
        //            .attr("d", line([{x: 0, y: 0}, {x: max, y: 0}]))
        //            .attr("class", function () {
        //                return "line" + data.isoformName
        //            })
        //            .style("z-index", "0")
        //            .style("stroke", "green")
        //            .style("stroke-width", "1px");
        //    console.log(data.positions);
        //        var rectsProGroup = rectsPro.selectAll("." + data.isoformName + "Group")
        //            .data(data.positions)
        //            .enter()
        //            .append("g")
        //            .attr("class", data.isoformName + "Group")
        //            .attr("transform", function(d) { return "translate(" + scaling(d.first) + ",0)"});
        //
        //        rectsProGroup
        //            .append("rect")
        //            .attr("class", "element "+data.isoformName)
        //            //.attr("y", function (d) {
        //            //    return position
        //            //})
        //            .attr("width", function (d) {
        //                return (scaling(d.second) - scaling(d.first))})
        //            .attr("height", 12)
        //            .style("fill", "blue")
        //            .style("z-index", "13");
        //
        //        rectsProGroup
        //            .append("text")
        //            .attr("class", "element "+data.isoformName + "Text")
        //            //.attr("y", function (d) {
        //            //    return position +6
        //            //})
        //            .attr("dy", "0.35em")
        //            .style("font-size", "10px")
        //            .text(function(d) { return data.isoformName})
        //            .style("fill", "black")
        //            .style("z-index", "15")
        //            .style("visibility", function(d) {
        //                if (data.isoformName) {
        //                    return (scaling(d.second) - scaling(d.first)) > data.isoformName * 8 ? "visible" : "hidden";
        //                }
        //                else return "hidden";
        //            });
        //    position += 20;
        //}
        //for (var name in array) {
        //    console.log(name);
        //    fillSVGIsoform(array[name],name);
        //}
        //console.log("ISOFORM SUPPOSED TO BE DISPLAY FFS");



        //var yAxisScale = d3.scale.ordinal()
        //    .domain([0, array.length])
        //    .rangeRoundBands([0, 500], .1);
        //var yAxis = d3.svg.axis()
        //    .scale(yAxisScale)
        //    .tickValues(array.map(function (o) {return o.isoformName})) //specify an array here for values
        //    .tickFormat(function (d) {
        //        return d
        //    })
        //    .orient("left");
        //function addYAxis() {
        //    yAxisSVG = svg.append("g")
        //        .attr("class", "pro axis")
        //        .attr("transform", "translate(0," + margin.top + ")");
        //    updateYaxis();
        //}
        //function updateYaxis() {
        //
        //    yAxisSVGgroup = yAxisSVG
        //        .selectAll(".yaxis")
        //        .data(array.map(function (o) {return o.isoformName}))
        //        .enter()
        //        .append("g");
        //    yAxisSVGgroup
        //        .append("polygon")       // attach a polygon
        //        .style("stroke", "none")  // colour the line
        //        .style("fill", "rgba(95,46,38,0.2)")     // remove any fill colour
        //        .attr("points", function(d) {
        //            return (margin.left-15)+"," + (d.y -3) + ", "+ (margin.left-15)+"," + (d.y +12) + ", "+ (margin.left-7)+"," + (d.y +4.5);  // x,y points
        //        });
        //    yAxisSVGgroup
        //        .append("rect")
        //        .style("fill","rgba(95,46,38,0.2)")
        //        .attr("x", function () {
        //            return margin.left - 95
        //        })
        //        .attr("y", function (d) {
        //            return d.y - 3
        //        })
        //        .attr("width", "80")
        //        .attr("height", "15");
        //    yAxisSVGgroup
        //        .append("text")
        //        .attr("class", "yaxis")
        //        .attr("text-anchor", "end")
        //        .attr("x", function () {
        //            return margin.left - 20
        //        })
        //        .attr("y", function (d) {
        //            return d.y + 8
        //        })
        //        .text(function (d) {
        //            return d.title
        //        });
        //}
    }

    function createSVG(sequences,isoName) {
        sequences.forEach(function (o) {
            if (o.uniqueName === isoName) {
                currentSeq = o.sequence;
                ft = new FeatureViewer(currentSeq, ".chart", {
                    showAxis: true,
                    showSequence: true,
                    brushActive: true,
                    verticalLine: false
                });
                seqView = new Sequence(currentSeq,isoName);
                seqView.render('#seqViewer', {
                    'showLineNumbers': true,
                    'wrapAminoAcids': true,
                    'charsPerLine': 50,
                    'search':true,
                    'toolbar':true
                });


            }
        });
    }

    function addFeatures(isoName) {
        for (var i=0;i<featuresForViewer.length;i++) {
            if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions[featuresForViewer[i][isoName].filter] === true) {
                ft.addFeature(featuresForViewer[i][isoName]);
            }
        }
    }
    function addFiltering() {
        $(".chart").append("<div id=\"svgHeader\" class=\"row\" style=\"margin:0px 20px\"></div>");
        var filterHash = {
            processing: "Processing",
            residue: "Modified residue",
            region: "Region",
            site: "Site",
            variant: "Variant"
        };
        var activeFiltering = {
            filters: {}
        };
        for (var i=0;i<featuresForViewer.length;i++) {
            if (Object.keys(featuresForViewer[i]).length !== 0) {
                var filter = featuresForViewer[i][Object.keys(featuresForViewer[i])[0]].filter;
                if (filter !== "none" && (!activeFiltering.filters[filter])) {
                    activeFiltering.filters[filter]=filterHash[filter];
                }
            }
        }
        console.log(activeFiltering);
        var template = HBtemplates['filter.tmpl'];
        var results = template(activeFiltering);
        $("#svgHeader").html(results);


    }
    function fillTable(featuresByIsoform, isoName) {
        if ($("#featuresTable").length > 0) {
            var number = 0;
            var features = [];
            featuresByIsoform.forEach( function (d) { if (d.hasOwnProperty(isoName)) features.push(d[isoName])});
            for (feat in featuresByIsoform) if(featuresByIsoform[feat].hasOwnProperty(isoName)) number += featuresByIsoform[feat][isoName].length;
        Handlebars.registerHelper('position', function (length, options) {
                if (length === 1) return this.start;
                else return this.start + " - " + this.end;
        });
        Handlebars.registerHelper('className', function (category, options) {
            return category.replace(' ','');
        });
        var datas = {
                features: features,
                featuresLength: number
            };

            var template = HBtemplates['featureTable2.tmpl'];
            var results = template(datas);
            $("#featuresTable").html(results);
        }
    }

    function featureSelection() {
        $(".featPosition").click(function() {
            $(".tableHighlight").removeClass("tableHighlight");
            $(this).parent().parent().addClass("tableHighlight");
            var position = $(this).text().split(" - ").map(Number);
            if (position.length === 1) position.push(position[0]);
            var svgId = "#" + "f" + $(this).parent().parent().attr("id");

            console.log(svgId);
            position[0]-=1;
            seqView.selection(position[0],position[1],"#C50063");
            ft.selection(svgId);

            var ElementTop = $("#stringSelected").position().top-200;
            var scrollPosition = $("#scroller").scrollTop();
            var scrollingLength = ElementTop + scrollPosition;
            $("#scroller").animate({scrollTop: scrollingLength}, 1000);

        })
    }
    function inverseSelection() {
        $(".element").click(function (d) {
            var featSelected = this.id.slice(1);
            var featPos = featSelected.split("_").slice(1).map(Number);
            featPos[0]-=1;
            seqView.selection(featPos[0],featPos[1],"#C50063");
            $(".tableHighlight").removeClass("tableHighlight");
            $("#"+featSelected).addClass("tableHighlight");
            var ElementTop = $("#"+featSelected).position().top-70;
            var scrollPosition = $("#featTableScroller").scrollTop();
            var scrollingLength = ElementTop + scrollPosition;
            $("#featTableScroller").animate({scrollTop: scrollingLength}, 1000);
            var ElementTop2 = $("#stringSelected").position().top-200;
            var scrollPosition2 = $("#scroller").scrollTop();
            var scrollingLength2 = ElementTop2 + scrollPosition2;
            $("#scroller").animate({scrollTop: scrollingLength2}, 1000);
        })
    }
    function toggleFiltering() {
        $("#filtering input:checkbox").on("change", function() {
            if ($(this)[0] === $("#allFilters")[0]) {
                var checked = $(this).prop("checked");

                $(this).parents("#filtering")
                    .first()
                    .find("input[type=checkbox]")
                    .prop("checked", checked);
                if (checked === false) {
                    for(var key in filterOptions) {
                        filterOptions[key] = false;
                    }
                }
                else {
                    for(var key in filterOptions) {
                        filterOptions[key] = true;
                    }
                }
                filterOptions["none"] = true;
            }
            applyFiltering();
            getInfoForIsoform.reloadSVG(isoName);

        });
    }
    function applyFiltering() {

        if ($("#processing").prop("checked")) {
            $(".Propeptide").show();
            $(".Matureprotein").show();
            $(".Initiatormeth").show();
            filterOptions.processing = true;
        }
        else {
            $(".Propeptide").hide();
            $(".Matureprotein").hide();
            $(".Initiatormeth").hide();
            filterOptions.processing = false;
        }
        if ($("#site").prop("checked")) {
            $(".Activesite").show();
            $(".Site").show();
            $(".Metalbinding").show();
            filterOptions.site = true;
        }
        else {
            $(".Activesite").hide();
            $(".Site").hide();
            $(".Metalbinding").hide();
            filterOptions.site = false;
        }
        if ($("#residue").prop("checked")) {
            $(".Modifiedresidue").show();
            $(".Disulfidebond").show();
            $(".Cross-link").show();
            $(".Glycosylation").show();
            filterOptions.residue = true;
        }
        else {
            $(".Modifiedresidue").hide();
            $(".Disulfidebond").hide();
            $(".Cross-link").hide();
            $(".Glycosylation").hide();
            filterOptions.residue = false;
        }
        if ($("#variant").prop("checked")) {
            $(".Variant").show();
            filterOptions.variant = true;
        }
        else {
            $(".Variant").hide();
            filterOptions.variant = false;
        }
        if ($("#region").prop("checked")) {
            $(".Interactingregion").show();
            filterOptions.region = true;
        }
        else {
            $(".Interactingregion").hide();
            filterOptions.region = false;
        }
    }
    //function mappingIsoformByExons(mapping) {
    //    var minForEach = [];
    //    var max = 0;
    //    for (iso in mapping) {
    //        minForEach.push(0);
    //        console.log(mapping[iso].mapping.length);
    //        if (mapping[iso].mapping.length > max) max = mapping[iso].mapping.length;
    //    }
    //    console.log("max length" + max);
    //    for (var i=0;i<max;i++) {
    //        var min=-1;
    //        for (iso in mapping) {
    //            if ()
    //        }
    //    }
    //
    //    2:1,2,3
    //    4:1,2,3
    //    6:1,2,3
    //    9:1,3
    //    12:2
    //    14:1,2,3
    //
    //    1-9:1,2,3
    //    9-12:2
    //    12-14
    //
    //    2 = = = = = 4|6 = = = = 9 =12,14= = = = = =17,19= = =28 =33 = = = =34 = = = 37
    //    a = = = = = a|a = = = = a = a a = = = = = = a = a = = = a = a = = = = a = = = a
    //    =======|======  ===========     ==========
    //    =======|===================   ========
    //    =======|======  =========       ======
    //    var a = [[2,4],[6,9],[14,19],[33,37]]
    //    var b = [[2,4],[6,12],[14,19],[28,34]]
    //    var c = [[2,4],[6,9],[14,17],[33,34]]
    //    // for (iso in mapping) {
    //    //     for (var i=0;i<mapping[iso].mapping.length;i++) {
    //    //         for (iso in mapping) {
    //    //             for (var i=0;i<mapping[iso].mapping.length;i++) {
    //    //     }
    //    // }
    //
    //}

    $(function () {
        var startTime = new Date().getTime();
        Promise.all([nx.getProteinSequence(entry), nx.getProPeptide(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getDisulfideBond(entry),
            nx.getAntibody(entry), nx.getInitMeth(entry), nx.getModifResidue(entry), nx.getCrossLink(entry), nx.getGlycoSite(entry), nx.getPeptide(entry),
            nx.getSrmPeptide(entry)]).then(function (oneData) {

            var featuresName = ["Sequence",         "Propeptide",             "Mature protein",          "Signal peptide",           "Disulfide bonds",
                "Antibody",         "Initiator meth",       "Modified residue",         "Cross-link",           "Glycosylation",        "Peptide",
                "Srm peptide"];


            var metaData = [
                {name: "Propeptide",className: "pro",color: "#B3B3B3",type: "rect",filter:"processing"},            {name: "Mature protein",className: "mat",color: "#B3B3C2",type: "rect",filter:"processing"},
                {name: "Signal peptide",className: "sign",color: "#B3B3E1",type: "rect",filter:"processing"},       {name: "Disulfide bond",className: "dsB",color: "#B3B3E1",type: "path",filter:"residue"},
                {name: "Antibody",className: "anti",color: "#B3C2F0",type: "rect",filter:"none"},                   {name: "Initiator meth",className: "initMeth",color: "#B3B3D1",type: "unique",filter:"processing"},
                {name: "Modified residue",className: "modifRes",color: "#B3C2B3",type: "unique",filter:"residue"},  {name: "Cross-link",className: "crossLink",color: "#B3C2C2",type: "unique",filter:"residue"},
                {name: "Glycosylation",className: "glycoSite",color: "#B3C2D1",type: "unique",filter:"residue"},    {name: "Peptide",className: "pep",color: "#B3E1D1",type: "multipleRect",filter:"none"},
                {name: "Srm Peptide",className: "srmPep",color: "#B3E1F0",type: "multipleRect",filter:"none"}
            ];

            var endTime2 = new Date().getTime();
            var time2 = endTime2 - startTime;
            console.log('Execution time: ' + time2);
            isoforms=oneData[0];
            nxIsoformChoice(oneData[0]);
            


            //var filters = NXViewerUtils.getDistinctFilters(metaData); // {processing: false, residue: false ....}

            for (var i=1; i<oneData.length;i++) {
                var feat = NXUtils.convertMappingsToIsoformMap(oneData[i],featuresName[i]);
                featuresByIsoform.push(feat);
                var featForViewer = NXViewerUtils.convertNXAnnotations(feat,metaData[i-1]);
                featuresForViewer.push(featForViewer);
            }
            //console.log(oneData[oneData.length-1]);
            //genomicMappings = NXUtils.convertExonsMappingsToIsoformMap(oneData[12]);
            //console.log(genomicMappings);
            //mappingIsoformByExons(genomicMappings);
            //displayIsoform(oneData[oneData.length-1],"#isoformDisplayed");


            addFiltering();
            createSVG(isoforms,isoName);
            addFeatures(isoName);
            fillTable(featuresByIsoform, isoName);
            adjustHeight(".left-side",".right-side");
            adjustHeight("#seqViewer","#featuresTable");
            featureSelection();
            inverseSelection();
            toggleFiltering();

            var endTime = new Date().getTime();
            var time = endTime - startTime;
            console.log('Execution time: ' + time);
        }).catch(function (err) {
            // catch any error that happened so far
            console.log("Argh, broken: " + err.message);
            console.log("Error at line : " + err.stack);
        });
    });
}));

// var sequenceForIso1 = NXUtils.getSequenceForIsoform(isoSequences, 1);
// var proPeptidesByIsoformMap = NXUtils.convertMappingsToIsoformMap(proPeptideMappings);
// var matureByIsoformMap = NXUtils.convertMappingsToIsoformMap(matureProteinMappings);
// var signalPeptideByIsoformMap = NXUtils.convertMappingsToIsoformMap(signalPeptideMappings);
// var disulfideBondsByIsoformMap = NXUtils.convertMappingsToIsoformMap(disulfideBondsMappings);
// var antibodyByIsoformMap = NXUtils.convertMappingsToIsoformMap(antibodyMappings);
// var initMethByIsoformMap = NXUtils.convertMappingsToIsoformMap(initMethMappings);
// var modifiedResidueByIsoformMap = NXUtils.convertMappingsToIsoformMap(modifiedResidueMappings);
// var crossLinkByIsoformMap = NXUtils.convertMappingsToIsoformMap(crossLinkMappings);
// var glycoSiteByIsoformMap = NXUtils.convertMappingsToIsoformMap(glycoSiteMappings);
// var peptideByIsoformMap = NXUtils.convertMappingsToIsoformMap(peptideMappings);
// var srmPeptideByIsoformMap = NXUtils.convertMappingsToIsoformMap(srmPeptideMappings);

// var proPeptidesByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(proPeptidesByIsoformMap, "proPeptide");
// var matureForViewer = NXViewerUtils.convertNXAnnotations(matureByIsoformMap, "Mature protein");
// var signalPeptideByIsoformMapeForViewer = NXViewerUtils.convertNXAnnotations(signalPeptideByIsoformMap, "mature-protein");
// var disulfideBondsByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(disulfideBondsByIsoformMap, "mature-protein");
// var antibodyByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(antibodyByIsoformMap, "mature-protein");
// var initMethByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(initMethByIsoformMap, "mature-protein");
// var modifiedResidueByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(modifiedResidueByIsoformMap, "mature-protein");
// var crossLinkByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(crossLinkByIsoformMap, "mature-protein");
// var glycoSiteByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(glycoSiteByIsoformMap, "mature-protein");
// var peptideByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(peptideByIsoformMap, "mature-protein");
// var srmPeptideByIsoformMapForViewer = NXViewerUtils.convertNXAnnotations(srmPeptideByIsoformMap, "mature-protein");
// var matureForViewer = NXViewerUtils.convertNXAnnotations(matureByIsoformMap, "mature-protein");

// CreateData.classic(oneData[1],"proPep", "Propeptide");
// CreateData.classic(oneData[2],"matures", "Mature protein");
// CreateData.classic(oneData[3],"signalPep", "Signal peptide");
// CreateData.classic(oneData[4],"disBonds", "Disulfide bond");
// CreateData.antibody(oneData[5],"antibody","Antibody");
// CreateData.classic(oneData[6],"initMeth","Initiator meth");
// CreateData.classic(oneData[7],"modifRes", "Modified residue");
// CreateData.classic(oneData[8],"crossLink", "Cross-link");
// CreateData.classic(oneData[9],"glycoSite","Glycosylation");
// CreateData.peptide(oneData[10],"peptides","Peptide");
// CreateData.peptide(oneData[11],"srmPeptides","SRM peptide");