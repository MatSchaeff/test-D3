this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["featureTable.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <tr id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n            <td>"
    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td style=\"text-align:center\"><a class=\"featPosition\" href=\"javascript:;\">"
    + ((stack1 = (helpers.position || (depth0 && depth0.position) || alias1).call(depth0,(depth0 != null ? depth0.length : depth0),{"name":"position","hash":{},"data":data})) != null ? stack1 : "")
    + "</a></td>\r\n            <td>"
    + alias3(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"length","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td>"
    + ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || alias1).call(depth0,(depth0 != null ? depth0.category : depth0),{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\r\n            <td><span style=\"background:#7CBA0F;padding:3px 7px;color:white;vertical-align: top\">"
    + alias3(((helper = (helper = helpers.evidenceLength || (depth0 != null ? depth0.evidenceLength : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"evidenceLength","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n            <td>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.evidence : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </td>\r\n        </tr>";
},"3":function(depth0,helpers,partials,data) {
    return "                <div>"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"peptideTableTitle\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;\">\r\n    <div style=\"display:inline-block;\">\r\n            <span class=\"badge\"\r\n                  style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;\">"
    + this.escapeExpression(((helper = (helper = helpers.featuresLength || (depth0 != null ? depth0.featuresLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"featuresLength","hash":{},"data":data}) : helper)))
    + "</span>\r\n    </div>\r\n    <h4 id=\"test\" style=\"display:inline-block;vertical-align:middle;\">Features</h4></div>\r\n<div id=\"featTableScroller\" style=\"height:500px;overflow: auto\">\r\n    <table id= \"featTable\" class=\"table table-striped table-fixed\" style=\"font-size:11px;\">\r\n        <thead>\r\n        <tr>\r\n            <th class=\"featName\" class=\"col-md-2\">Name</th>\r\n            <th data-sort=\"int\" style=\"text-align:center\" class=\"col-md-2\">Position</th>\r\n            <th data-sort=\"int\" class=\"col-md-1\">Length</th>\r\n            <th data-sort=\"string\" class=\"col-md-5\">Description</th>\r\n            <th data-sort=\"string\" colspan=\"2\" class=\"col-md-2\">Evidence</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\r\n    </table>\r\n</div>";
},"useData":true});

this["HBtemplates"]["featureTable2.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <tr id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n            <td>"
    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td style=\"text-align:center\"><a class=\"featPosition\" href=\"javascript:;\">"
    + ((stack1 = (helpers.position || (depth0 && depth0.position) || alias1).call(depth0,(depth0 != null ? depth0.length : depth0),{"name":"position","hash":{},"data":data})) != null ? stack1 : "")
    + "</a></td>\r\n            <td>"
    + alias3(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"length","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td>"
    + ((stack1 = ((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\r\n            <td><span style=\"background:#7CBA0F;padding:3px 7px;color:white;vertical-align: top\">"
    + alias3(((helper = (helper = helpers.evidenceLength || (depth0 != null ? depth0.evidenceLength : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"evidenceLength","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n            <td>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.evidence : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </td>\r\n        </tr>";
},"3":function(depth0,helpers,partials,data) {
    return "                <div>"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"peptideTableTitle\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;\">\r\n    <div style=\"display:inline-block;\">\r\n            <span class=\"badge\"\r\n                  style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;\">"
    + this.escapeExpression(((helper = (helper = helpers.featuresLength || (depth0 != null ? depth0.featuresLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"featuresLength","hash":{},"data":data}) : helper)))
    + "</span>\r\n    </div>\r\n    <h4 id=\"test\" style=\"display:inline-block;vertical-align:middle;\">Features</h4></div>\r\n<div id=\"featTableScroller\" style=\"height:500px;overflow: auto\">\r\n    <table id= \"featTable\" class=\"table table-striped table-fixed\" style=\"font-size:11px;\">\r\n        <thead>\r\n        <tr>\r\n            <th class=\"featName\" class=\"col-md-2\">Name</th>\r\n            <th data-sort=\"int\" style=\"text-align:center\" class=\"col-md-2\">Position</th>\r\n            <th data-sort=\"int\" class=\"col-md-1\">Length</th>\r\n            <th data-sort=\"string\" class=\"col-md-5\">Description</th>\r\n            <th data-sort=\"string\" colspan=\"2\" class=\"col-md-2\">Evidence</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\r\n    </table>\r\n</div>";
},"useData":true});

this["HBtemplates"]["isoformChoice.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <li role=\"presentation\"><a class=\"isoformNames\" href=\"#\" role=\"tab\" data-toggle=\"tab\">"
    + this.escapeExpression(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <li role=\"presentation\" class=\"dropdown\">\r\n            <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-expanded=\"false\"><span\r\n                    id=\"extendIsoformChoice\">More</span><span style=\"margin-left:5px;\" class=\"caret\"></span></a>\r\n            <ul id=\"moreIsoforms\" class=\"dropdown-menu\" role=\"menu\">\r\n                <li role=\"presentation\"><p href=\"#\" role=\"tab\" data-toggle=\"tab\"\r\n                                           style=\"pointer-events:none;cursor:default;padding: 3px 20px;\">Others\r\n                    Isoforms</p></li>\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1), depth0),{"name":"isoforms.more","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "                <li role=\"presentation\"><a class=\"isoformNames\" href=\"#\" role=\"tab\" data-toggle=\"tab\">"
    + this.escapeExpression(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a>\r\n                </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div role=\"tabpanel\">\r\n    <div class=\"navbar-brand \" style=\"padding:10px 15px;color:#C50063;height:auto;font-size:20px;\">Isoforms</div>\r\n    <ul class=\"nav nav-tabs\" role=\"tablist\" style=\"border:none\">\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.visible : stack1), depth0),{"name":"isoforms.visible","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>";
},"useData":true});

this["HBtemplates"]["overviewProtein.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "    <div id=\"cleavage-less\" class=\"row\">\r\n        <div class=\"col-md-2 col-xs-3\" style=\"color: grey;text-align:right\">Cleaved into :</div>\r\n        <div class=\"col-md-6 col-xs-6\">";
  stack1 = ((helper = (helper = helpers.cleavage || (depth0 != null ? depth0.cleavage : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"cleavage","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.cleavage) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n    </div>\r\n";
},"2":function(depth0,helpers,partials,data) {
    var helper;

  return "<span>"
    + this.escapeExpression(((helper = (helper = helpers.synonymName || (depth0 != null ? depth0.synonymName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"synonymName","hash":{},"data":data}) : helper)))
    + ", </span>";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "    <div id=\"family-less\" class=\"row\">\r\n        <div class=\"col-md-2 col-xs-3\" style=\"color: grey;text-align:right\">Family Name :</div>\r\n        <div class=\"col-md-6 col-xs-6\">";
  stack1 = ((helper = (helper = helpers.family || (depth0 != null ? depth0.family : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"family","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.family) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n    </div>\r\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span>"
    + ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || helpers.helperMissing).call(depth0,"family",{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>";
},"7":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                <dt>Cleaved into the following "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.cleavage : depth0)) != null ? stack1.length : stack1), depth0))
    + " chains</dt>\r\n";
  stack1 = ((helper = (helper = helpers.cleavage || (depth0 != null ? depth0.cleavage : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"cleavage","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.cleavage) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "                <dd>"
    + this.escapeExpression(((helper = (helper = helpers.synonymName || (depth0 != null ? depth0.synonymName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"synonymName","hash":{},"data":data}) : helper)))
    + "</dd>\r\n                ";
},"10":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                <dt>Alternative Name</dt>\r\n";
  stack1 = ((helper = (helper = helpers.alternativeName || (depth0 != null ? depth0.alternativeName : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"alternativeName","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.alternativeName) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "                <dd> "
    + this.escapeExpression(((helper = (helper = helpers.synonymName || (depth0 != null ? depth0.synonymName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"synonymName","hash":{},"data":data}) : helper)))
    + "\r\n                    "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.synonyms : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n                </dd>\r\n                ";
},"12":function(depth0,helpers,partials,data) {
    var stack1;

  return "<em style=\"font-size:12px;\">(short : "
    + this.escapeExpression(this.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.synonyms : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.synonymName : stack1), depth0))
    + ") </em>";
},"14":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "    <div id=\"family-full\" class=\"row\">\r\n        <div class=\"col-md-2 col-xs-3 text-uppercase\" style=\"color: grey;\">Family</div>\r\n        <div class=\"col-md-6 col-xs-6\">\r\n            <dl>\r\n                <dt>Family</dt>\r\n";
  stack1 = ((helper = (helper = helpers.family || (depth0 != null ? depth0.family : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"family","hash":{},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.family) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </dl>\r\n        </div>\r\n    </div>\r\n";
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <dd>"
    + ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || helpers.helperMissing).call(depth0,"family",{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "")
    + "</dd>\r\n";
},"17":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || helpers.helperMissing).call(depth0,"history",{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, buffer = 
  "<div id=\"proteinTitle\">\r\n    <button id=\"extender\" class=\"btn btn-default\" style=\"float:right\">Extend overview</button>\r\n    <h2>"
    + alias3(((helper = (helper = helpers.entryName || (depth0 != null ? depth0.entryName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"entryName","hash":{},"data":data}) : helper)))
    + "</h2>\r\n</div>\r\n<div id=\"INFOS-LESS\" style=\"display:block\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cleavage : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div id=\"gene-less\" class=\"row\">\r\n        <div class=\"col-md-2 col-xs-3\" style=\"color: grey;text-align:right\">Gene Name :</div>\r\n        <div class=\"col-md-6 col-xs-6\">"
    + alias3(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"geneName","hash":{},"data":data}) : helper)))
    + "</div>\r\n    </div>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.family : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n<div id=\"INFOS-FULL\" style=\"display:none\">\r\n    <div id=\"gene-full\" class=\"row\">\r\n        <div class=\"col-md-2 col-xs-3 text-uppercase\" style=\"color: grey;\">Protein</div>\r\n        <div class=\"col-md-6 col-xs-6\">\r\n            <dl>\r\n                <dt>Recommended Name</dt>\r\n                <dd> "
    + alias3(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"geneName","hash":{},"data":data}) : helper)))
    + "</dd>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cleavage : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.alternativeName : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n            </dl>\r\n        </div>\r\n    </div>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.family : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div id=\"History-full\" class=\"row\">\r\n        <div class=\"col-md-2 col-xs-3 text-uppercase\" style=\"color: grey;\">History</div>\r\n        <div class=\"col-md-6 col-xs-6\">\r\n            <dl>\r\n                <dt>neXtProt</dt>\r\n                <dd>Integrated "
    + alias3(((helper = (helper = helpers.integDate || (depth0 != null ? depth0.integDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"integDate","hash":{},"data":data}) : helper)))
    + "</dd>\r\n                <dd>Last Updated "
    + alias3(((helper = (helper = helpers.lastUpdate || (depth0 != null ? depth0.lastUpdate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastUpdate","hash":{},"data":data}) : helper)))
    + "</dd>\r\n                <dt>UniProtKB</dt>\r\n                <dd>Entry version "
    + alias3(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"version","hash":{},"data":data}) : helper)))
    + "</dd>\r\n                <dd>Integration Date "
    + alias3(((helper = (helper = helpers.UniprotIntegDate || (depth0 != null ? depth0.UniprotIntegDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"UniprotIntegDate","hash":{},"data":data}) : helper)))
    + "</dd>\r\n                <dd>Last Update "
    + alias3(((helper = (helper = helpers.UniProtLastUpdate || (depth0 != null ? depth0.UniProtLastUpdate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"UniProtLastUpdate","hash":{},"data":data}) : helper)))
    + "</dd>\r\n                <dd>Sequence version "
    + alias3(((helper = (helper = helpers.seqVersion || (depth0 != null ? depth0.seqVersion : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"seqVersion","hash":{},"data":data}) : helper)))
    + "</dd>\r\n                <dd>";
  stack1 = ((helper = (helper = helpers.accessionNumber || (depth0 != null ? depth0.accessionNumber : depth0)) != null ? helper : alias1),(options={"name":"accessionNumber","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.accessionNumber) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dd>\r\n            </dl>\r\n        </div>\r\n    </div>\r\n</div>\r\n<p style=\"margin:10px 10px;\">Entry whose protein(s) existence is based on "
    + alias3(((helper = (helper = helpers.proteineEvidence || (depth0 != null ? depth0.proteineEvidence : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"proteineEvidence","hash":{},"data":data}) : helper)))
    + "</p>";
},"useData":true});