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
    var featuresByIsoform = [];
	var featuresForViewer= [];
    var selectedRect;
    var filterOptions = {
        processing: true,
        region: true,
        site: true,
        residue: true,
        variant:true
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
            $(".chart").html("");
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
            $(".chart").html("");
            createSVG(isoforms,isoID);
            addFeatures(isoID);
            featureSelection();
            inverseSelection();
        }
    };

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
                seqView = new Sequence(currentSeq);
                seqView.render('#seqViewer', {
                    'showLineNumbers': true,
                    'wrapAminoAcids': true,
                    'charsPerLine': 50
                });

            }
        });
    }

    function addFeatures(isoName) {
        for (var i=0;i<featuresForViewer.length;i++) {
        	switch(i) {
        		case 0:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Propeptide",
			                className: "pro",
			                color: "#B3B3B3",
			                type: "rect"
			            });
			        }
			        break;
        		case 1:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.processing) {
			        	console.log(featuresForViewer[i][isoName]);
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Mature protein",
			                className: "mat",
			                color: "#B3B3C2",
			                type: "rect"
			            });
			        }
			        break;
        		case 2:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Signal peptide",
			                className: "sign",
			                color: "#B3B3E1",
			                type: "rect"
			            });
			        }
			        break;
        		case 3:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Disulfide bond",
			                className: "dsB",
			                color: "#B3B3E1",
			                type: "path"
			            });
			        }
			        break;
                case 4:
                    if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.processing) {
                        ft.addFeature({
                            data: featuresForViewer[i][isoName],
                            name: "Initiator meth",
                            className: "initMeth",
                            color: "#B3B3D1",
                            type: "unique"
                        });
                    }
                    break;
                case 5:
                    if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.region) {
                        ft.addFeature({
                            data: featuresForViewer[i][isoName],
                            name: "Interacting region",
                            className: "intReg",
                            color: "#B3D1F0",
                            type: "rect"
                        });
                    }
                    break;
        		case 6:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.residue) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Modified residue",
			                className: "modifRes",
			                color: "#B3C2B3",
			                type: "unique"
			            });
			        }
			        break;
        		case 7:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.residue) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Cross-link",
			                className: "crossLink",
			                color: "#B3C2C2",
			                type: "unique"
			            });
			        }
			        break;
        		case 8:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.residue) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Glycosylation",
			                className: "glycoSite",
			                color: "#B3C2D1",
			                type: "unique"
			            });
			        }
			        break;
        		case 9:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.site) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Site",
			                className: "site",
			                color: "#B3F0E1",
			                type: "unique"
			            });
			        }
			        break;
                case 10:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.site) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Active site",
			                className: "actSite",
			                color: "#B3F0F0",
			                type: "unique"
			            });
			        }
                    break;
                case 11:
                    if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.site) {
                        ft.addFeature({
                            data: featuresForViewer[i][isoName],
                            name: "Metal binding",
                            className: "metal",
                            color: "#B3FFC2",
                            type: "unique"
                        });
                    }
                    break;
                case 12:
                    if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions.variant) {
                        ft.addFeature({
                            data: featuresForViewer[i][isoName],
                            name: "Variant",
                            className: "variant",
                            color: "rgba(0,255,154,0.3)",
                            type: "unique"
                        });
                    }
                    break;
    			}
    		}
    }

    function fillTable(isoName) {
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
            var ElementTop = $("#"+featSelected).position().top-60;
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
            }
            applyFiltering();
            getInfoForIsoform.reloadSVG(isoName);

        });
    }
    function applyFiltering() {

        if ($("#filterProcessing").prop("checked")) {
            $(".Matureprotein").show();
            $(".Initiatormeth").show();
            filterOptions.processing = true;
        }
        else {
            $(".Matureprotein").hide();
            $(".Initiatormeth").hide();
            filterOptions.processing = false;
        }
        if ($("#filterSite").prop("checked")) {
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
        if ($("#filterResidue").prop("checked")) {
            $(".Modifiedresidue").show();
            $(".Cross-link").show();
            $(".Glycosylation").show();
            filterOptions.residue = true;
        }
        else {
            $(".Modifiedresidue").hide();
            $(".Cross-link").hide();
            $(".Glycosylation").hide();
            filterOptions.residue = false;
        }
        if ($("#filterVariant").prop("checked")) {
            $(".Variant").show();
            filterOptions.variant = true;
        }
        else {
            $(".Variant").hide();
            filterOptions.variant = false;
        }
        if ($("#filterRegion").prop("checked")) {
            $(".Interactingregion").show();
            filterOptions.region = true;
        }
        else {
            $(".Interactingregion").hide();
            filterOptions.region = false;
        }
    }

    $(function () {
        var startTime = new Date().getTime();
        Promise.all([nx.getProteinSequence(entry), nx.getProPeptide(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getDisulfideBond(entry), nx.getInitMeth(entry), nx.getInteractingRegion(entry),
            nx.getModifResidue(entry), nx.getCrossLink(entry), nx.getGlycoSite(entry), nx.getMiscellaneousSite(entry), nx.getActiveSite(entry), nx.getMetalBindingSite(entry), nx.getVariant(entry)]).then(function (oneData) {
            var endTime2 = new Date().getTime();
            var time2 = endTime2 - startTime;
            console.log('Execution time: ' + time2);
            isoforms=oneData[0];
            nxIsoformChoice(oneData[0]);
            


		    var featuresName = ["Sequence","Propeptide", "Mature protein", "Signal peptide", "Disulfide bonds", "Initiator meth", "Interacting region",
		    "Modified residue","Cross-link", "Glycosylation", "Site", "Active site", "Metal binding","Variant"];

            for (var i=1; i<oneData.length;i++) {
                var feat = NXUtils.convertMappingsToIsoformMap(oneData[i],featuresName[i]);
                featuresByIsoform.push(feat);
                var featForViewer = NXViewerUtils.convertNXAnnotations(feat);
                featuresForViewer.push(featForViewer);
            }

            createSVG(isoforms,isoName);
            addFeatures(isoName);
            fillTable(isoName);
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