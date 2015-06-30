/**
 * A neXtProt js client
 */
( function (root) {
    //
    'use strict';
    if (root.Nextprot === undefined) {
        root.Nextprot = {};
    }


    (function () {

        //?default-graph-uri=&named-graph-uri=&output=json

        var tempApiUrl = "http://mac-098:8080/nextprot-api-web/entry/";
        var nextprotApiUrl = "https://api.nextprot.org/entry/";
        var sparqlEndpoint = "https://api.nextprot.org/sparql";
        var sparqlFormat = "?output=json";
        var sparqlPrefixes = "PREFIX :<http://nextprot.org/rdf#> "+
            "PREFIX annotation:<http://nextprot.org/rdf/annotation/> "+
            "PREFIX context:<http://nextprot.org/rdf/context/> "+
            "PREFIX cv:<http://nextprot.org/rdf/terminology/> "+
            "PREFIX db:<http://nextprot.org/rdf/db/> "+
            "PREFIX dc:<http://purl.org/dc/elements/1.1/> "+
            "PREFIX dcterms:<http://purl.org/dc/terms/> "+
            "PREFIX entry:<http://nextprot.org/rdf/entry/> "+
            "PREFIX evidence:<http://nextprot.org/rdf/evidence/> "+
            "PREFIX foaf:<http://xmlns.com/foaf/0.1/> "+
            "PREFIX gene:<http://nextprot.org/rdf/gene/> "+
            "PREFIX identifier:<http://nextprot.org/rdf/identifier/> "+
            "PREFIX isoform:<http://nextprot.org/rdf/isoform/> "+
            "PREFIX mo:<http://purl.org/ontology/mo/> "+
            "PREFIX ov:<http://open.vocab.org/terms/> "+
            "PREFIX owl:<http://www.w3.org/2002/07/owl#> "+
            "PREFIX publication:<http://nextprot.org/rdf/publication/> "+
            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> "+
            "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> "+
            "PREFIX sim:<http://purl.org/ontology/similarity/> "+
            "PREFIX source:<http://nextprot.org/rdf/source/> "+
            "PREFIX xref:<http://nextprot.org/rdf/xref/> "+
            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> ";


        var applicationName = null;
        var clientInfo = null;

        var NextprotClient = function (appName, clientInformation) {
            applicationName = appName;
            clientInfo = clientInformation;
            if(!appName){
                throw "Please provide some application name  ex:  new Nextprot.Client('demo applicaiton for visualizing peptides', clientInformation);";
            }
            
            if(!clientInformation){
                throw "Please provide some client information ex:  new Nextprot.Client(applicationName, 'Calipho SIB at Geneva');";
            }

        };

        //Util methods
        var _getURLParameter = function (name){
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

        //Gets the entry set in the parameter
        NextprotClient.prototype.getEntryName = function(){
            return _getURLParameter("nxentry") || 'NX_P01308'; //By default returns the insulin
        };

        var normalizeEntry = function (entry) {
            if (entry.substring(0,3) !== "NX_") {
                entry = "NX_"+ entry;
            }
            return entry;
        };

        //private method, convention use an underscore
        var _callURL = function (entryName, context){

            var me = this;

            return new Promise(function(resolve, reject) {

                var req = new XMLHttpRequest();
                var url = nextprotApiUrl + entryName + "/" + context + ".json" + "?clientInfo=" + clientInfo + "&applicationName=" + applicationName;
                req.open("GET", url);

                req.onload = function() {
                    // This is called even on errors so check the status
                    if (req.status == 200) {
                        resolve(JSON.parse(req.responseText));
                    }else {
                        //reject(Error(req.status + " - " + JSON.parse(req.response).message));
                        reject(Error(req.status));
                    }
                };

                // Handle network errors
                req.onerror = function() {
                    reject(Error("Network Error"));
                };

                // Make the request
                req.send();
            });
        };
        var _callURLTemp = function (entryName, context){

            var me = this;

            return new Promise(function(resolve, reject) {

                var req = new XMLHttpRequest();
                var url = tempApiUrl + entryName + "/" + context + ".json" + "?clientInfo=" + clientInfo + "&applicationName=" + applicationName;
                req.open("GET", url);

                req.onload = function() {
                    // This is called even on errors so check the status
                    if (req.status == 200) {
                        resolve(JSON.parse(req.responseText));
                    }else {
                        //reject(Error(req.status + " - " + JSON.parse(req.response).message));
                        reject(Error(req.status));
                    }
                };

                // Handle network errors
                req.onerror = function() {
                    reject(Error("Network Error"));
                };

                // Make the request
                req.send();
            });
        };

        //NextprotClient.prototype.getProteinOverview = function() {
        //    return _callURL(this.getEntryName(), "overview").then(function (data){
        //        return data.entry.overview;
        //    });
        //};

        NextprotClient.prototype.executeSparql = function(sparql) {
            var sparqlQuery = sparqlPrefixes+sparql;
            var url = sparqlEndpoint+sparqlFormat+"&query="+encodeURIComponent(sparqlQuery) + "&clientInfo=" + clientInfo + "&applicationName=" + applicationName;
            return Promise.resolve($.getJSON(url)).then(function (data){
                return data;
            });
        };

        NextprotClient.prototype.getProteinOverview = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "overview").then(function (data){
                return data.entry.overview;
            });
        };

        NextprotClient.prototype.getProteinSequence = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "isoform").then(function (data){
                return data.entry.isoforms;
            });
        };

        NextprotClient.prototype.getSecondaryStructure = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "secondary-structure").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getMatureProtein = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "mature-protein").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getPeptide = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "peptide").then(function (data){
                return data.entry.peptideMappings;
            });
        };

        NextprotClient.prototype.getSrmPeptide = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "srm-peptide").then(function (data){
                return data.entry.srmPeptideMappings;
            });
        };

        NextprotClient.prototype.getSignalPeptide = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "signal-peptide").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getProPeptide = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "maturation-peptide").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getDisulfideBond = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "disulfide-bond").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getAntibody = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "antibody").then(function (data){
                return data.entry.antibodyMappings;
            });
        };
        NextprotClient.prototype.getInitMeth= function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "initiator-methionine").then(function (data){
                return data.entry.annotations;
            });
        };
        NextprotClient.prototype.getModifResidue = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "modified-residue").then(function (data){
                return data.entry.annotations;
            });
        };
        NextprotClient.prototype.getCrossLink = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "cross-link").then(function (data){
                return data.entry.annotations;
            });
        };
        NextprotClient.prototype.getGlycoSite = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "glycosylation-site").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getInteractingRegion = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "interacting-region").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getMiscellaneousSite = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "miscellaneous-site").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getActiveSite = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "active-site").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getMetalBindingSite = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "metal-binding-site").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getVariant = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "variant").then(function (data){
                return data.entry.annotations;
            });
        };

        NextprotClient.prototype.getExons = function(entry) {
            return _callURL(normalizeEntry(entry || this.getEntryName()), "genomic-mapping").then(function (data){
                return data.entry.genomicMappings[0].isoformMappings;
            });
        };

        NextprotClient.prototype.getIsoformMapping = function(entry) {
            return _callURLTemp(normalizeEntry(entry || this.getEntryName()), "isoform/mapping").then(function (data){
                return data;
            });
        };


        //node.js compatibility
        if (typeof exports !== 'undefined') {
            exports.Client = NextprotClient;
        }


        root.Nextprot.Client = NextprotClient;

    }());


}(this));
var numero = 0;
//Utility methods
var NXUtils = {
    
    checkIsoformMatch:function(isoname, isonumber) {
        return isoname.endsWith("-"+isonumber)
    },

    getSequenceForIsoform:function (isoSequences, isoformName){
        var result = null;
        //TODO allow users to specify isoform name without NX_
        //TODO the API should return the results in a sorted array
        
        if(typeof isoformName === "number"){
            isoSequences.forEach(function (d) {
                
                if (d.uniqueName.endsWith("-"+isoformName)) {
                    console.log("returning" + d.sequence);
                    result = d.sequence;
                }
            });
        }else {
            isoSequences.forEach(function (d) {
            if (d.uniqueName === isoformName) 
                return d.sequence;
            })
        }
        return result;
    },
    getLinkForFeature: function(accession, description, type) {
        if (type === "peptide"){
            var url = "https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/GetPeptide?searchWithinThis=Peptide+Name&searchForThis=" + description + ";organism_name=Human";
            return "<a href='" + url + "'>" + description + "</a>";
        }
        else if (type === "antibody") {
            var url = accession;
            return "<a href='" + url + "'>" + description + "</a>";
        }
        else if (accession) {
            var url = "http://www.nextprot.org/db/term/" + accession;
            return "<a href='" + url + "'>" + description + "</a>";
        }
        else if (description) return description;
        else return "";
    },
    convertMappingsToIsoformMap:function (mappings, category){
        var result = {};
        mappings.forEach(function (mapping) {
            if (mapping.hasOwnProperty("targetingIsoformsMap")) {
                for (var name in mapping.targetingIsoformsMap) {
                    if (mapping.targetingIsoformsMap.hasOwnProperty(name)) {
                        var start = mapping.targetingIsoformsMap[name].firstPosition,
                            end = mapping.targetingIsoformsMap[name].lastPosition,
                            link = NXUtils.getLinkForFeature(mapping.cvTermAccessionCode, mapping.description),
                            description = mapping.description,
                            evidence = mapping.evidences.map(function(d) {return d.assignedBy}).filter(function(item, pos, self) {
                                return self.indexOf(item) == pos;});
                        if (mapping.hasOwnProperty("apicategory") && mapping.apicategory === "VARIANT") {
                            link = "<span style='color:green'>" + mapping.variant.original + " → " +  mapping.variant.variant + "</span>";
                            description = mapping.variant.original + " → " +  mapping.variant.variant;
                        }
                        if (!result[name]) result[name] = [];
                        result[name].push({
                            start: start,
                            end: end,
                            length: end-start+1,
                            id: category.replace(/\s/g,'')+"_"+start.toString()+"_"+end.toString(),
                            description: description,
                            category: category,
                            link: link,
                            evidence: evidence,
                            evidenceLength: evidence.length
                        });
                    }
                }
            }
            //TODO This is the old format, the API should evolve
            else if (mapping.hasOwnProperty("isoformSpecificity")) {
                        for (var name in mapping.isoformSpecificity) {
                            if (mapping.isoformSpecificity.hasOwnProperty(name)) {
                                for (var i = 0; i < mapping.isoformSpecificity[name].positions.length; i++) {
                                    var start = mapping.isoformSpecificity[name].positions[i].first,
                                        end = mapping.isoformSpecificity[name].positions[i].second,
                                        evidence = "",
                                        description = "",
                                        link = "";
                                    if (mapping.hasOwnProperty("evidences")) evidence = mapping.evidences.map(function (d) {
                                        return d.assignedBy
                                    }).filter(function (item, pos, self) {
                                        return self.indexOf(item) == pos;
                                    });
                                    else evidence = [mapping.assignedBy];
                                    if (mapping.hasOwnProperty("xrefs")) {
                                        description = mapping.xrefs[0].accession;
                                        link = NXUtils.getLinkForFeature(mapping.xrefs[0].resolvedUrl, description, "antibody")
                                    }
                                    else {
                                        description = mapping.evidences[0].accession;
                                        for (ev in mapping.evidences) if (mapping.evidences[ev].databaseName === "PeptideAtlas" || mapping.evidences[ev].databaseName === "SRMAtlas") {
                                            description = mapping.evidences[ev].accession;
                                            link = NXUtils.getLinkForFeature(description, description, "peptide");

                                            break;
                                        }
                                    }

                                    if (!result[name]) result[name] = [];
                                    result[name].push({
                                        start: start,
                                        end: end,
                                        length: end - start,
                                        id: category.replace(/\s/g, '') + "_" + start.toString() + "_" + end.toString(),
                                        description: description,
                                        category: category,
                                        link: link,
                                        evidence: evidence,
                                        evidenceLength: evidence.length
                                    });
                                }
                            }
                        }
            }
        });
        numero+=1;
        for (var iso in result) {
            result[iso].sort(function (a, b) {
                return a.start - b.start;
            })
        }
        return result;
    },
    convertExonsMappingsToIsoformMap:function (mappings) {
        return mappings.map( function (d) {
            return {
                uniqueName: d.uniqueName,
                isoMainName: d.isoMainName,
                mapping: d.positionsOfIsoformOnReferencedGene.map(function (o) {
                    return {start:o.key,end:o.value};
                })
            }
        })
    }
};

var NXViewerUtils = {
    convertNXAnnotations:function (annotations, metadata){
        if (!annotations) return "Cannot load this";
        var result={};
        for (name in annotations) {
            var meta = jQuery.extend({}, metadata);
            meta.data = annotations[name].map(function (annotation) {
                return {
                        x: annotation.start,
                        y: annotation.end,
                        id: annotation.id,
                        category: annotation.category,
                        description: annotation.description
                }
            });
            result[name] = meta;
        }
        return result;
    }
};