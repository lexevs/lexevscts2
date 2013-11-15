/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/14/13
 * Time: 10:24 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    var entityURL = "http://bmidev4:5555/cts2/map/NCIt_to_ICD9CM_Mapping/version/NCIt_to_ICD9CM_Mapping-1.0/entry/NCI_Thesaurus:${code}";

            $('#entity-btn').button();

            $('#entity-btn').click(function(event) {
                var value =  $("input#entity").val();
                $.getJSON(entityURL.replace("${code}", value) + "?format=json&callback=?", function(mapJson){
                    var metadata = getHTML(mapJson);
                    $("#showMap").html(metadata);
                }).fail(validateCode());
            });

    function getHTML(mapJson){
        var map = mapJson.mapEntryMsg.entry.assertedBy.map.content;
        var fromName = mapJson.mapEntryMsg.entry.mapFrom.name;
        var fromNamespace = mapJson.mapEntryMsg.entry.mapFrom.namespace;
        var mapsetList =  mapJson.mapEntryMsg.entry.mapSetList;
        var maptargetList =  mapsetList[0].mapTargetList
        var toName = maptargetList[0].mapTo.name;;
        var toNamespace = maptargetList[0].mapTo.namespace;
        var html =
                "<div class=\"alert\">" +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>" +
                "<table class=\"table table-striped table-bordered table-condensed\">" +
                "<th colspan='2' > Map Entity Metadata </th>" +
                "<tr><td >map: </td><td>" + map + "</td></tr>" +
                "<tr><td >From vocabulary: </td><td>" + fromNamespace + "</td></tr>" +
                "<tr><td >From code: </td><td>" + fromName + "</td></tr>" +
                "<tr><td >To vocabulary: </td><td>" + toNamespace + "</td></tr>" +
                "<tr><td >to code: </td><td>" + toName + "</td></tr>" +
                "</table>"
                 +   "</div>";
        return html;
    }

    function validateCode(){
        console.log("fail!");
           $("#showMap").html("<div class=\"alert alert-warning\">" +
               "<strong>This is not a valid NCIt code!!!</strong>" +
               "</div>");
    }



});