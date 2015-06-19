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
            $(".isoformNames").click(getInfoForIsoform.reload);
            $("#moreIsoforms a").click(function () {
                var parentThis = $(this).text();
                console.log(parentThis);
                $("#extendIsoformChoice").text(parentThis);
            });
        },
        reload: function (event) {
            var isoID = $(this).text();
            console.log(isoID);
            $(".chart").html("");
            createSVG(isoforms,isoID);
            addFeatures(isoID);
            fillTable(isoID);
            adjustHeight(".left-side",".right-side");
            adjustHeight("#seqViewer","#featuresTable");
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
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
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
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Antibody",
			                className: "anti",
			                color: "#B3C2F0",
			                type: "rect"
			            });
			        }
			        break;
        		case 5:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Initiator meth",
			                className: "initMeth",
			                color: "#B3B3D1",
			                type: "unique"
			            });
			        }
			        break;
        		case 6:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
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
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
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
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
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
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Peptide",
			                className: "pep",
			                color: "#B3E1D1",
			                type: "multipleRect"
			            });
			        }
			        break;
        		case 10:
			        if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
			            ft.addFeature({
			                data: featuresForViewer[i][isoName],
			                name: "Srm Peptide",
			                className: "srmPep",
			                color: "#B3E1F0",
			                type: "multipleRect"
			            });
			        }
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

    $(function () {
        var startTime = new Date().getTime();
        Promise.all([nx.getProteinSequence(entry), nx.getProPeptide(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getDisulfideBond(entry),
            nx.getAntibody(entry), nx.getInitMeth(entry), nx.getModifResidue(entry), nx.getCrossLink(entry), nx.getGlycoSite(entry), nx.getPeptide(entry),
            nx.getSrmPeptide(entry)]).then(function (oneData) {
            var endTime2 = new Date().getTime();
            var time2 = endTime2 - startTime;
            console.log('Execution time: ' + time2);
            isoforms=oneData[0];
            nxIsoformChoice(oneData[0]);
            


		    var featuresName = ["Sequence","Propeptide", "Mature protein", "Signal peptide", "Disulfide bonds", "Antibody", "Initiator meth", 
		    "Modified residue","Cross-link", "Glycosylation", "Peptide", "Srm peptide"];

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