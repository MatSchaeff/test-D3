($(function () {

    var Nextprot = window.Nextprot;
    var nx = new Nextprot.Client();
    var entry = nx.getEntryName();
    var isoName = entry + "-1";
    var cpt=0;
    var startTime;
    var endTime;
    var ft;

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
                    var description = o.peptideUniqueName;

                    newData.push({
                        x: start,
                        y: end,
                        description:description
                    });
                }
            });
            return newData;
        }
    };

    // $(function () {
    //     var startTime = new Date().getTime();
    //     [nx.getProteinSequence(entry), nx.getProPeptide(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getDisulfideBond(entry),
    //      nx.getAntibody(entry), nx.getInitMeth(entry), nx.getModifResidue(entry), nx.getCrossLink(entry), nx.getGlycoSite(entry), nx.getPeptide(entry),
    //       nx.getSrmPeptide(entry)].reduce(function (array, dataPromise) {
    //         return array.then(function () {
    //             return dataPromise;
    //         }).then(function (oneData) {
    //             cpt += 1;
    //             switch (cpt) {
    //                 case 1:
    //                     oneData.forEach(function (o) {
    //                         if (o.uniqueName === isoName) {
    //                             ft = new FeatureViewer(o.sequence);
    //                         }
    //                     });
    //                     ft.create(".chart", {
    //                         showAxis: true,
    //                         showSequence: true,
    //                         brushActive: true,
    //                         verticalLine:true
    //                     });
    //                     break;

    //                 case 2:
    //                     var proPep = CreateData.classic(oneData);
    //                     if (proPep.length != 0) {
    //                         ft.addFeature({
    //                             data: proPep,
    //                             name: "Propeptide",
    //                             className: "pro",
    //                             color: "#B3B3B3",
    //                             type: "rect"
    //                         });
    //                     }
    //                     break;

    //                 case 3:
    //                     var matures = CreateData.classic(oneData);
    //                     if (matures.length != 0) {
    //                         ft.addFeature({
    //                             data: matures,
    //                             name: "Mature protein",
    //                             className: "mat",
    //                             color: "#B3B3C2",
    //                             type: "rect"
    //                         });
    //                     }
    //                     break;
    //                 case 4 :
    //                     var signalPep = CreateData.classic(oneData);
    //                     if (signalPep.length != 0) {
    //                         ft.addFeature({
    //                             data: signalPep,
    //                             name: "Signal peptide",
    //                             className: "sign",
    //                             color: "#B3B3E1",
    //                             type: "rect"
    //                         });
    //                     }

    //                     break;

    //                 case 5 :
    //                     var disBonds = CreateData.classic(oneData);
    //                     if (disBonds.length != 0) {
    //                         ft.addFeature({
    //                             data: disBonds,
    //                             name: "Disulfide bond",
    //                             className: "dsB",
    //                             color: "#B3B3E1",
    //                             type: "path"
    //                         });
    //                     }
    //                     break;

    //                 case 6 :
    //                     var antibody = CreateData.antibody(oneData);
    //                     if (antibody.length != 0) {
    //                         ft.addFeature({
    //                             data: antibody,
    //                             name: "Antibody",
    //                             className: "anti",
    //                             color: "#B3C2F0",
    //                             type: "rect"
    //                         });
    //                     }
    //                     break;

    //                 case 7 :
    //                     var initMeth = CreateData.classic(oneData);
    //                     if (initMeth.length != 0) {
    //                         ft.addFeature({
    //                             data: initMeth,
    //                             name: "Initiator meth",
    //                             className: "initMeth",
    //                             color: "#B3B3D1",
    //                             type: "unique"
    //                         });
    //                     }
    //                     break;
    //                 case 8 :
    //                     var modifRes = CreateData.classic(oneData);
    //                     if (modifRes.length != 0) {
    //                         ft.addFeature({
    //                             data: modifRes,
    //                             name: "Modified residue",
    //                             className: "modifRes",
    //                             color: "#B3C2B3",
    //                             type: "unique"
    //                         });
    //                     }
    //                     break;
    //                 case 9 :
    //                     var crossLink = CreateData.classic(oneData);
    //                     if (crossLink.length != 0) {
    //                         ft.addFeature({
    //                             data: crossLink,
    //                             name: "Cross-link",
    //                             className: "crossLink",
    //                             color: "#B3C2C2",
    //                             type: "unique"
    //                         });
    //                     }
    //                     break;
    //                 case 10 :
    //                     var glycoSite = CreateData.classic(oneData);
    //                     if (glycoSite.length != 0) {
    //                         ft.addFeature({
    //                             data: glycoSite,
    //                             name: "Glycosylation",
    //                             className: "glycoSite",
    //                             color: "#B3C2D1",
    //                             type: "unique"
    //                         });
    //                     }
    //                     break;

    //                 case 11 :
    //                     var peptides = CreateData.peptide(oneData);
    //                     if (peptides.length != 0) {
    //                         ft.addFeature({
    //                             data: peptides,
    //                             name: "Peptide",
    //                             className: "pep",
    //                             color: "#B3E1D1",
    //                             type: "multipleRect"
    //                         });
    //                     }
    //                     break;

    //                 case 12 :
    //                     var srmPeptides = CreateData.peptide(oneData);
    //                     if (srmPeptides.length != 0) {
    //                         ft.addFeature({
    //                             data: srmPeptides,
    //                             name: "Srm Peptide",
    //                             className: "srmPep",
    //                             color: "#B3E1F0",
    //                             type: "multipleRect"
    //                         });
    //                     }
    //                     var endTime = new Date().getTime();
    //                     var time = endTime - startTime;
    //                     console.log('Execution time: ' + time);
    //                     break;
    //             }
    //         });
    //     }, Promise.resolve())
    //         .then(function () {
    //             console.log("All done");
    //         })
    //         .catch(function (err) {
    //             // catch any error that happened along the way
    //             console.log("Argh, broken: " + err.message);
    //             console.log("Error at line : " + err.stack);
    //         })
    // });
    $(function () {
        var startTime = new Date().getTime();
        Promise.all([nx.getProteinSequence(entry), nx.getProPeptide(entry), nx.getMatureProtein(entry), nx.getSignalPeptide(entry), nx.getDisulfideBond(entry),
         nx.getAntibody(entry), nx.getInitMeth(entry), nx.getModifResidue(entry), nx.getCrossLink(entry), nx.getGlycoSite(entry), nx.getPeptide(entry),
          nx.getSrmPeptide(entry)]).then(function (oneData) {
                        var endTime2 = new Date().getTime();
                        var time2 = endTime2 - startTime;
                        console.log('Execution time: ' + time2);

                        oneData[0].forEach(function (o) {
                            if (o.uniqueName === isoName) {
                                console.log(o.sequence);
                                ft = new FeatureViewer(o.sequence,".chart");
                            }
                        });
                        ft.create(".chart", {
                            showAxis: true,
                            showSequence: true,
                            brushActive: true,
                            verticalLine:false
                        });

                        var proPep = CreateData.classic(oneData[1]);
                        if (proPep.length != 0) {
                            ft.addFeature({
                                data: proPep,
                                name: "Propeptide",
                                className: "pro",
                                color: "#B3B3B3",
                                type: "rect"
                            });
                        }
                        var matures = CreateData.classic(oneData[2]);
                        if (matures.length != 0) {
                            ft.addFeature({
                                data: matures,
                                name: "Mature protein",
                                className: "mat",
                                color: "#B3B3C2",
                                type: "rect"
                            });
                        }
                        var signalPep = CreateData.classic(oneData[3]);
                        if (signalPep.length != 0) {
                            ft.addFeature({
                                data: signalPep,
                                name: "Signal peptide",
                                className: "sign",
                                color: "#B3B3E1",
                                type: "rect"
                            });
                        }
                        var disBonds = CreateData.classic(oneData[4]);
                        if (disBonds.length != 0) {
                            ft.addFeature({
                                data: disBonds,
                                name: "Disulfide bond",
                                className: "dsB",
                                color: "#B3B3E1",
                                type: "path"
                            });
                        }
                        var antibody = CreateData.antibody(oneData[5]);
                        if (antibody.length != 0) {
                            ft.addFeature({
                                data: antibody,
                                name: "Antibody",
                                className: "anti",
                                color: "#B3C2F0",
                                type: "rect"
                            });
                        }
                        var initMeth = CreateData.classic(oneData[6]);
                        if (initMeth.length != 0) {
                            ft.addFeature({
                                data: initMeth,
                                name: "Initiator meth",
                                className: "initMeth",
                                color: "#B3B3D1",
                                type: "unique"
                            });
                        }
                        var modifRes = CreateData.classic(oneData[7]);
                        if (modifRes.length != 0) {
                            ft.addFeature({
                                data: modifRes,
                                name: "Modified residue",
                                className: "modifRes",
                                color: "#B3C2B3",
                                type: "unique"
                            });
                        }
                        var crossLink = CreateData.classic(oneData[8]);
                        if (crossLink.length != 0) {
                            ft.addFeature({
                                data: crossLink,
                                name: "Cross-link",
                                className: "crossLink",
                                color: "#B3C2C2",
                                type: "unique"
                            });
                        }
                        var glycoSite = CreateData.classic(oneData[9]);
                        if (glycoSite.length != 0) {
                            ft.addFeature({
                                data: glycoSite,
                                name: "Glycosylation",
                                className: "glycoSite",
                                color: "#B3C2D1",
                                type: "unique"
                            });
                        }
                        var peptides = CreateData.peptide(oneData[10]);
                        if (peptides.length != 0) {
                            ft.addFeature({
                                data: peptides,
                                name: "Peptide",
                                className: "pep",
                                color: "#B3E1D1",
                                type: "multipleRect"
                            });
                        }
                        var srmPeptides = CreateData.peptide(oneData[11]);
                        if (srmPeptides.length != 0) {
                            ft.addFeature({
                                data: srmPeptides,
                                name: "Srm Peptide",
                                className: "srmPep",
                                color: "#B3E1F0",
                                type: "multipleRect"
                            });
                        }
                        var endTime = new Date().getTime();
                        var time = endTime - startTime;
                        console.log('Execution time: ' + time);
            }).catch(function(err) {
              // catch any error that happened so far
              console.log("Argh, broken: " + err.message);
            });
    });

    // var ft = new FeatureViewer("FDSJKLFJDSFKLJDFHADJKLFHDSJKLFHDAFJKLDHFJKLDASFHDJKLFHDSAJKLFHDAKLFJDHSAFKLDLSNCDJKLFENFIUPERWDJKPCNVDFPIEHFDCFJDKOWFPDJWFKLXSJFDW9FIPUAENDCXAMSFNDUAFIDJFDLKSAFJDSAKFLJDSADJFDW9FIPUAENDCXAMSFNDAAAAAAAAAAAFJDSAKFL");
    // ft.create(".chart", {
    // 	showAxis: true,
    // 	showSequence: true,
    // 	brushActive: true,
    // 	verticalLine:true
    // });
    // ft.addFeature({
    //     data: [{x:20,y:32},{x:46,y:100},{x:123,y:167}],
    //     name: "test feature 0",
    //     className: "test0",
    //     color: "#0F8292",
    //     type: "rect"
    // })
    // ft.addFeature({
    //     data: [{x:32,y:47},{x:58,y:72}],
    //     name: "test feature 1",
    //     className: "test1",
    //     color: "#066B78",
    //     type: "rect"
    // })
    // ft.addFeature({
    //     data: [{x:52,y:52},{x:92,y:92}],
    //     name: "test feature 2",
    //     className: "test2",
    //     color: "#007800",
    //     type: "unique"
    // })
    // ft.addFeature({
    //     data: [{x:130,y:184},{x:40,y:142},{x:80,y:110}],
    //     name: "test feature 3",
    //     className: "test3",
    //     color: "#780C43",
    //     type: "path"
    // })
    // ft.addFeature({
    //     data: [{x:120,y:154},{x:22,y:163},{x:90,y:108},{x:10,y:25},{x:193,y:210},{x:78,y:85},{x:96,y:143},{x:14,y:65},{x:56,y:167}],
    //     name: "test feature 4",
    //     className: "test4",
    //     color: "#C50063",
    //     type: "multipleRect"
    // })
    // ft.addFeature({
    //     data: [{x:5,y:12},{x:41,y:87},{x:133,y:172}],
    //     name: "test feature 5",
    //     className: "test5",
    //     color: "#CFB915",
    //     type: "rect"
    // })

}));