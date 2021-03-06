this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["templates/featureTable.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <tr id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n            <td>"
    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
    + "</td>\n            <td style=\"text-align:center\"><a class=\"featPosition\" href=\"javascript:;\">"
    + ((stack1 = (helpers.position || (depth0 && depth0.position) || alias1).call(depth0,(depth0 != null ? depth0.length : depth0),{"name":"position","hash":{},"data":data})) != null ? stack1 : "")
    + "</a></td>\n            <td>"
    + alias3(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"length","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + ((stack1 = (helpers.link_to || (depth0 && depth0.link_to) || alias1).call(depth0,(depth0 != null ? depth0.category : depth0),{"name":"link_to","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n            <td><span style=\"background:#7CBA0F;padding:3px 7px;color:white;vertical-align: top\">"
    + alias3(((helper = (helper = helpers.evidenceLength || (depth0 != null ? depth0.evidenceLength : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"evidenceLength","hash":{},"data":data}) : helper)))
    + "</span></td>\n            <td>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.evidence : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </td>\n        </tr>";
},"3":function(depth0,helpers,partials,data) {
    return "                <div>"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"peptideTableTitle\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;\">\n    <div style=\"display:inline-block;\">\n            <span class=\"badge\"\n                  style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;\">"
    + this.escapeExpression(((helper = (helper = helpers.featuresLength || (depth0 != null ? depth0.featuresLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"featuresLength","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"test\" style=\"display:inline-block;vertical-align:middle;\">Features</h4></div>\n<div id=\"featTableScroller\" style=\"height:500px;overflow: auto\">\n    <table id= \"featTable\" class=\"table table-striped table-fixed\" style=\"font-size:11px;\">\n        <thead>\n        <tr>\n            <th class=\"featName\" class=\"col-md-2\">Name</th>\n            <th data-sort=\"int\" style=\"text-align:center\" class=\"col-md-2\">Position</th>\n            <th data-sort=\"int\" class=\"col-md-1\">Length</th>\n            <th data-sort=\"string\" class=\"col-md-5\">Description</th>\n            <th data-sort=\"string\" colspan=\"2\" class=\"col-md-2\">Evidence</th>\n        </tr>\n        </thead>\n        <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\n    </table>\n</div>";
},"useData":true});

this["HBtemplates"]["templates/featureTable2.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <tr id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + " class=\""
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depth0 != null ? depth0.category : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " general-info\" >\n            <td>"
    + alias3(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
    + "</td>\n            <td style=\"text-align:right\">"
    + alias3(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"length","hash":{},"data":data}) : helper)))
    + "</td>\n            <td style=\"text-align:center\"><a class=\"featPosition\" href=\"javascript:;\">"
    + ((stack1 = (helpers.position || (depth0 && depth0.position) || alias1).call(depth0,(depth0 != null ? depth0.length : depth0),{"name":"position","hash":{},"data":data})) != null ? stack1 : "")
    + "</a></td>\n            <td>"
    + ((stack1 = ((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.source : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "        </tr>\n        <tr class=\""
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depth0 != null ? depth0.category : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " detailed-info\">\n            <td colspan=\"6\" style=\"word-break: break-all\">"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.source : depth0),{"name":"each","hash":{},"fn":this.program(7, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n\n            <!--<td>-->\n             <!--"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.evidence : depth0),{"name":"each","hash":{},"fn":this.program(21, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "-->\n            <!--</td>-->\n        </tr>";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "            <td style=\"text-align:right\"><span class=\"evidenceNumber\">"
    + this.escapeExpression(((helper = (helper = helpers.evidenceLength || (depth0 != null ? depth0.evidenceLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"evidenceLength","hash":{},"data":data}) : helper)))
    + "</span></td>\n            <td><span style=\"color:black;\">Evidences</span></td>\n";
},"5":function(depth0,helpers,partials,data) {
    return "            <td></td>\n            <td></td>\n";
},"7":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<div class=\"evidenceLine\"><div class=\"evidenceArrow\">&#10549;</div>  Evidence "
    + alias2((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(data && data.index),1,{"name":"math","hash":{},"data":data}))
    + "<span class=\"evidenceCodeName\">"
    + alias2(((helper = (helper = helpers.evidenceCodeName || (depth0 != null ? depth0.evidenceCodeName : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"evidenceCodeName","hash":{},"data":data}) : helper)))
    + "</span>\n            <span class=\"evidenceSource\">"
    + alias2(((helper = (helper = helpers.assignedBy || (depth0 != null ? depth0.assignedBy : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"assignedBy","hash":{},"data":data}) : helper)))
    + "</span>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.publicationMD5 : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n                <div style=\"padding-left:10px;border-left:1px solid darkgray;margin-right:10px;\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.publicationMD5 : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.program(17, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n                </div>";
},"8":function(depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<button class=\"btn btn-primary btn-xs\" type=\"button\" style=\"margin-left:5px\" data-toggle=\"collapse\" data-target=\"#collapse"
    + alias3(((helper = (helper = helpers.pubId || (depth0 != null ? depth0.pubId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pubId","hash":{},"data":data}) : helper)))
    + alias3(alias4((depths[2] != null ? depths[2].id : depths[2]), depth0))
    + "\"  aria-expanded=\"false\" aria-controls=\"collapse"
    + alias3(((helper = (helper = helpers.pubId || (depth0 != null ? depth0.pubId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pubId","hash":{},"data":data}) : helper)))
    + alias3(alias4((depths[2] != null ? depths[2].id : depths[2]), depth0))
    + "\">\n                    abstract\n                </button>";
},"10":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                    "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(11, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                    <p style=\"color:#6a90d9;\">"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.authors : depth0),{"name":"each","hash":{},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n                    <p>"
    + alias3(((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"journal","hash":{},"data":data}) : helper)))
    + " <strong>"
    + alias3(((helper = (helper = helpers.volume || (depth0 != null ? depth0.volume : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"volume","hash":{},"data":data}) : helper)))
    + "</strong>, "
    + alias3(((helper = (helper = helpers.firstPage || (depth0 != null ? depth0.firstPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstPage","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.lastPage || (depth0 != null ? depth0.lastPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastPage","hash":{},"data":data}) : helper)))
    + " ("
    + alias3(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"year","hash":{},"data":data}) : helper)))
    + ") "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.dbXrefs : depth0),{"name":"each","hash":{},"fn":this.program(15, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n                    <div class=\"collapse\" id=\"collapse"
    + alias3(((helper = (helper = helpers.pubId || (depth0 != null ? depth0.pubId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pubId","hash":{},"data":data}) : helper)))
    + alias3(this.lambda((depths[2] != null ? depths[2].id : depths[2]), depth0))
    + "\" style=\"margin-top:5px;\">\n                        <div class=\"panel panel-info\"><div class=\"panel-heading\">\n                            <h3 class=\"panel-title\">Abstract</h3>\n                        </div><div class=\"panel-body\">"
    + alias3(((helper = (helper = helpers['abstract'] || (depth0 != null ? depth0['abstract'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"abstract","hash":{},"data":data}) : helper)))
    + "</div></div>\n                    </div>\n";
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"13":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return alias3(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastName","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"initials","hash":{},"data":data}) : helper)))
    + ". , ";
},"15":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "["
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " : "
    + ((stack1 = (helpers.linkTo || (depth0 && depth0.linkTo) || alias1).call(depth0,(depth0 != null ? depth0.accession : depth0),(depth0 != null ? depth0.url : depth0),{"name":"linkTo","hash":{},"data":data})) != null ? stack1 : "")
    + "] ";
},"17":function(depth0,helpers,partials,data) {
    var stack1;

  return "                    "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.crossRef : depth0),{"name":"if","hash":{},"fn":this.program(18, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"18":function(depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.crossRef || (depth0 != null ? depth0.crossRef : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"crossRef","hash":{},"fn":this.program(19, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.crossRef) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"19":function(depth0,helpers,partials,data) {
    var stack1;

  return "<p>"
    + ((stack1 = (helpers.linkTo || (depth0 && depth0.linkTo) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),(depth0 != null ? depth0.url : depth0),{"name":"linkTo","hash":{},"data":data})) != null ? stack1 : "")
    + "</p>";
},"21":function(depth0,helpers,partials,data) {
    return "-->\n                <!--<div>"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</div>-->\n                <!--";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "<div id=\"peptideTableTitle\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;padding-bottom: 5px;\">\n    <div style=\"display:inline-block;\">\n            <span class=\"badge\"\n                  style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;\">"
    + this.escapeExpression(((helper = (helper = helpers.featuresLength || (depth0 != null ? depth0.featuresLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"featuresLength","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"test\" style=\"display:inline-block;vertical-align:middle;\">Features</h4></div>\n<div id=\"featTableScroller\" style=\"height:500px;overflow: auto\">\n    <table id= \"featTable\" class=\"table table-striped table-fixed\" style=\"font-size:11px;\">\n        <thead>\n        <tr>\n            <th class=\"featName\" class=\"col-md-2\">Name</th>\n            <th class=\"col-md-1\"  style=\"text-align:right\">Length</th>\n            <th style=\"text-align:center\" class=\"col-md-2\">Position</th>\n            <th class=\"col-md-5\">Description</th>\n            <th style=\"text-align:center\" colspan=\"2\" class=\"col-md-2\">Evidence</th>\n        </tr>\n        </thead>\n        <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\n    </table>\n</div>";
},"useData":true,"useDepths":true});

this["HBtemplates"]["templates/filter.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "                <label class=\"checkbox-inline\">\n                    <input type=\"checkbox\" id="
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " value=\"option1\" checked>"
    + alias1(this.lambda(depth0, depth0))
    + "\n                </label>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n    <div class=\"panel panel-default\" style=\"margin:20px 20px 0px;display:inline-block\">\n        <div class=\"panel-heading\"\n             style=\"display:inline-block;background:#F8F8F8;padding:0px 15px;width:80px;height:100%;border-color:#F8F8F8;border-right:1px #ddd solid;\">\n            <h5 style=\"color:#777;padding:0px;height:10px\">FILTER </h5></div>\n        <div class=\"panel-body\" style=\"padding:0px;display:inline-block;\">\n            <div id=\"filtering\" style=\"margin-left: 15px;margin-right: 15px\">\n                <label class=\"checkbox-inline\">\n                    <input type=\"checkbox\" id=\"allFilters\" value=\"option0\" checked> All/None\n                </label>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n";
},"useData":true});

this["HBtemplates"]["templates/isoformChoice.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <li role=\"presentation\"><a class=\"isoformNames\" href=\"#"
    + alias3(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "\" role=\"tab\" data-toggle=\"tab\">"
    + alias3(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a></li>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <li role=\"presentation\" class=\"dropdown\" style=\"z-index:20\">\n            <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-expanded=\"false\"><span\n                    id=\"extendIsoformChoice\">More</span><span style=\"margin-left:5px;\" class=\"caret\"></span></a>\n            <ul id=\"moreIsoforms\" class=\"dropdown-menu\" role=\"menu\">\n                <li role=\"presentation\"><p href=\"#\" role=\"tab\" data-toggle=\"tab\"\n                                           style=\"pointer-events:none;cursor:default;padding: 3px 20px;\">Others\n                    Isoforms</p></li>\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1), depth0),{"name":"isoforms.more","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <li role=\"presentation\"><a class=\"isoformNames\" href=\"#"
    + alias3(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "\" role=\"tab\" data-toggle=\"tab\">"
    + alias3(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a>\n                </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div role=\"tabpanel\">\n    <div class=\"navbar-brand \" style=\"padding:10px 15px;color:#C50063;height:auto;font-size:20px;\">Isoforms</div>\n    <ul class=\"nav nav-tabs\" role=\"tablist\" style=\"border:none\">\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,this.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.visible : stack1), depth0),{"name":"isoforms.visible","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        <li><a id=\"isoformMap\" href=\"#\" style=\"color:#007800;font-size:16px;padding-top: 8px;\">See isoforms</a></li>\n    </ul>\n</div>";
},"useData":true});

this["HBtemplates"]["templates/overviewProtein.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
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