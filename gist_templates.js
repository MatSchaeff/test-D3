this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["isoformChoice.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <li role=\"presentation\"><a class=\"isoformNames\" href=\"#\" role=\"tab\" data-toggle=\"tab\">"
    + this.escapeExpression(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a></li>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <li role=\"presentation\" class=\"dropdown\">\n            <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-expanded=\"false\"><span\n                    id=\"extendIsoformChoice\">More</span><span style=\"margin-left:5px;\" class=\"caret\"></span></a>\n            <ul id=\"moreIsoforms\" class=\"dropdown-menu\" role=\"menu\">\n                <li role=\"presentation\"><p href=\"#\" role=\"tab\" data-toggle=\"tab\"\n                                           style=\"pointer-events:none;cursor:default;padding: 3px 20px;\">Others\n                    Isoforms</p></li>\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1), depth0),{"name":"isoforms.more","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "                <li role=\"presentation\"><a class=\"isoformNames\" href=\"#\" role=\"tab\" data-toggle=\"tab\">"
    + this.escapeExpression(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a>\n                </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div role=\"tabpanel\">\n    <div class=\"navbar-brand \" style=\"padding:10px 15px;color:#C50063;height:auto;font-size:20px;\">Isoforms</div>\n    <ul class=\"nav nav-tabs\" role=\"tablist\" style=\"border:none\">\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.visible : stack1), depth0),{"name":"isoforms.visible","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>";
},"useData":true});

this["HBtemplates"]["overviewProtein.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "    <div id=\"cleavage-less\" class=\"row\">\n        <div class=\"col-md-2 col-xs-3\" style=\"color: grey;text-align:right\">Cleaved into :</div>\n        <div class=\"col-md-6 col-xs-6\">";
  stack1 = ((helper = (helper = helpers.cleavage || (depth0 != null ? depth0.cleavage : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"cleavage","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.cleavage) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n    </div>\n";
},"2":function(depth0,helpers,partials,data) {
    var helper;

  return "<span>"
    + this.escapeExpression(((helper = (helper = helpers.synonymName || (depth0 != null ? depth0.synonymName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"synonymName","hash":{},"data":data}) : helper)))
    + ", </span>";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "    <div id=\"family-less\" class=\"row\">\n        <div class=\"col-md-2 col-xs-3\" style=\"color: grey;text-align:right\">Family Name :</div>\n        <div class=\"col-md-6 col-xs-6\">";
  stack1 = ((helper = (helper = helpers.family || (depth0 != null ? depth0.family : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"family","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.family) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n    </div>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span>"
    + ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || helpers.helperMissing).call(depth0,"family",{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>";
},"7":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                <dt>Cleaved into the following "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.cleavage : depth0)) != null ? stack1.length : stack1), depth0))
    + " chains</dt>\n";
  stack1 = ((helper = (helper = helpers.cleavage || (depth0 != null ? depth0.cleavage : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"cleavage","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.cleavage) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "                <dd>"
    + this.escapeExpression(((helper = (helper = helpers.synonymName || (depth0 != null ? depth0.synonymName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"synonymName","hash":{},"data":data}) : helper)))
    + "</dd>\n                ";
},"10":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                <dt>Alternative Name</dt>\n";
  stack1 = ((helper = (helper = helpers.alternativeName || (depth0 != null ? depth0.alternativeName : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"alternativeName","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.alternativeName) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "                <dd> "
    + this.escapeExpression(((helper = (helper = helpers.synonymName || (depth0 != null ? depth0.synonymName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"synonymName","hash":{},"data":data}) : helper)))
    + "\n                    "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.synonyms : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                </dd>\n                ";
},"12":function(depth0,helpers,partials,data) {
    var stack1;

  return "<em style=\"font-size:12px;\">(short : "
    + this.escapeExpression(this.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.synonyms : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.synonymName : stack1), depth0))
    + ") </em>";
},"14":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "    <div id=\"family-full\" class=\"row\">\n        <div class=\"col-md-2 col-xs-3 text-uppercase\" style=\"color: grey;\">Family</div>\n        <div class=\"col-md-6 col-xs-6\">\n            <dl>\n                <dt>Family</dt>\n";
  stack1 = ((helper = (helper = helpers.family || (depth0 != null ? depth0.family : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"family","hash":{},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.family) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </dl>\n        </div>\n    </div>\n";
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <dd>"
    + ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || helpers.helperMissing).call(depth0,"family",{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "")
    + "</dd>\n";
},"17":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || helpers.helperMissing).call(depth0,"history",{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, buffer = 
  "<div id=\"proteinTitle\">\n    <button id=\"extender\" class=\"btn btn-default\" style=\"float:right\">Extend overview</button>\n    <h2>"
    + alias3(((helper = (helper = helpers.entryName || (depth0 != null ? depth0.entryName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"entryName","hash":{},"data":data}) : helper)))
    + "</h2>\n</div>\n<div id=\"INFOS-LESS\" style=\"display:block\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cleavage : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div id=\"gene-less\" class=\"row\">\n        <div class=\"col-md-2 col-xs-3\" style=\"color: grey;text-align:right\">Gene Name :</div>\n        <div class=\"col-md-6 col-xs-6\">"
    + alias3(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"geneName","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.family : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div id=\"INFOS-FULL\" style=\"display:none\">\n    <div id=\"gene-full\" class=\"row\">\n        <div class=\"col-md-2 col-xs-3 text-uppercase\" style=\"color: grey;\">Protein</div>\n        <div class=\"col-md-6 col-xs-6\">\n            <dl>\n                <dt>Recommended Name</dt>\n                <dd> "
    + alias3(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"geneName","hash":{},"data":data}) : helper)))
    + "</dd>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cleavage : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.alternativeName : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n            </dl>\n        </div>\n    </div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.family : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div id=\"History-full\" class=\"row\">\n        <div class=\"col-md-2 col-xs-3 text-uppercase\" style=\"color: grey;\">History</div>\n        <div class=\"col-md-6 col-xs-6\">\n            <dl>\n                <dt>neXtProt</dt>\n                <dd>Integrated "
    + alias3(((helper = (helper = helpers.integDate || (depth0 != null ? depth0.integDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"integDate","hash":{},"data":data}) : helper)))
    + "</dd>\n                <dd>Last Updated "
    + alias3(((helper = (helper = helpers.lastUpdate || (depth0 != null ? depth0.lastUpdate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastUpdate","hash":{},"data":data}) : helper)))
    + "</dd>\n                <dt>UniProtKB</dt>\n                <dd>Entry version "
    + alias3(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"version","hash":{},"data":data}) : helper)))
    + "</dd>\n                <dd>Integration Date "
    + alias3(((helper = (helper = helpers.UniprotIntegDate || (depth0 != null ? depth0.UniprotIntegDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"UniprotIntegDate","hash":{},"data":data}) : helper)))
    + "</dd>\n                <dd>Last Update "
    + alias3(((helper = (helper = helpers.UniProtLastUpdate || (depth0 != null ? depth0.UniProtLastUpdate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"UniProtLastUpdate","hash":{},"data":data}) : helper)))
    + "</dd>\n                <dd>Sequence version "
    + alias3(((helper = (helper = helpers.seqVersion || (depth0 != null ? depth0.seqVersion : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"seqVersion","hash":{},"data":data}) : helper)))
    + "</dd>\n                <dd>";
  stack1 = ((helper = (helper = helpers.accessionNumber || (depth0 != null ? depth0.accessionNumber : depth0)) != null ? helper : alias1),(options={"name":"accessionNumber","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.accessionNumber) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dd>\n            </dl>\n        </div>\n    </div>\n</div>\n<p style=\"margin:10px 10px;\">Entry whose protein(s) existence is based on "
    + alias3(((helper = (helper = helpers.proteineEvidence || (depth0 != null ? depth0.proteineEvidence : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"proteineEvidence","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});

this["HBtemplates"]["peptideTable.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda, buffer = 
  "        <tr>\n            <td><input class=\"PepSelected\" type=\"checkbox\"></td>\n            <td>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n            <td style=\"text-align:center;\"><a class=\"pepPos\" style=\"cursor:pointer;\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.position : depth0)) != null ? stack1.first : stack1), depth0))
    + " - "
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.position : depth0)) != null ? stack1.second : stack1), depth0))
    + "</a></td>\n            <td style=\"text-align:center;\">"
    + alias3(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"length","hash":{},"data":data}) : helper)))
    + "</td>\n";
  stack1 = ((helper = (helper = helpers.properties || (depth0 != null ? depth0.properties : depth0)) != null ? helper : alias1),(options={"name":"properties","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.properties) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        </tr>";
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.natural : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.proteotypic : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.synthetic : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "<td>natural+synthetic</td>\n            ";
},"6":function(depth0,helpers,partials,data) {
    return "<td>natural</td>";
},"8":function(depth0,helpers,partials,data) {
    return "<td>synthetic</td>";
},"10":function(depth0,helpers,partials,data) {
    return "<td>proteotypic</td>\n            ";
},"12":function(depth0,helpers,partials,data) {
    return "<td>non-proteotypic</td>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "<div id=\"peptideTableTitle\" style=\"border-bottom: 1px solid #E7EAEC;padding-bottom:5px;;margin-bottom: 15px;\">\n    <div style=\"display:inline-block;\">\n            <span class=\"badge\"\n                  style=\"background:#C50063;color:white;padding:8px;border-radius:70%;margin-right:10px;vertical-align:middle;\">"
    + this.escapeExpression(((helper = (helper = helpers.PeptideLength || (depth0 != null ? depth0.PeptideLength : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"PeptideLength","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"test\" style=\"display:inline-block;vertical-align:middle;\">Peptides</h4></div>\n<div style=\"height:200px;overflow: auto\">\n    <table id= \"pepTableSorted\" class=\"table table-striped table-fixed\" style=\"font-size:12px;\">\n        <thead>\n        <tr>\n            <th class=\"col-md-1\">Select</th>\n            <th data-sort=\"string\" class=\"col-md-1\">Peptide Name <span class=\"caret\"></span></th>\n            <th data-sort=\"positions\" data-sort-default=\"asc\" class=\"col-md-1\" style=\"text-align:center;white-space: nowrap;\">Position <span class=\"caret\"></span></th>\n            <th data-sort=\"int\" class=\"col-md-1\" style=\"text-align:center;white-space: nowrap;\">Length <span class=\"caret\"></span></th>\n            <th data-sort=\"string\" class=\"col-md-1\">Category <span class=\"caret\"></span></th>\n            <th data-sort=\"string\" class=\"col-md-1\" style=\"white-space: nowrap;\">Proteotypicity <span class=\"caret\"></span></th>\n        </tr>\n        </thead>\n        <tbody>\n";
  stack1 = ((helper = (helper = helpers.Peptides || (depth0 != null ? depth0.Peptides : depth0)) != null ? helper : alias1),(options={"name":"Peptides","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.Peptides) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</tbody>\n    </table>\n</div>";
},"useData":true});