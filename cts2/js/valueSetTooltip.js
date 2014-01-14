/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 10:06 AM
 */

$(document).ready(function(){
    var url = "http://lexevscts2-stage.nci.nih.gov/lexevscts2/resolvedvaluesets?matchvalue=${valueSetName}&filtercomponent=resourceName&format=json&callback=?";
    var vsID =  $("#tooltip").attr("data-cts");
    $.getJSON(url.replace("${valueSetName}", vsID), function(cts2JSON) {
        var html = getValueSetTableInfo(cts2JSON);
        $('#tooltip').tooltip({title: html, html: true });
    });

    function getValueSetTableInfo(valueSetJson) {
        // get the description, current version, and code system name
        var entryList = valueSetJson.resolvedValueSetDirectory.entryList;
        for(i in entryList){
            var entry =     valueSetJson.resolvedValueSetDirectory.entryList[i];
            var valueSetName =  entry.resolvedHeader.resolutionOf.valueSet.content;
            var URI = entry.resolvedValueSetURI;
            var description = entry.resolvedHeader.resolutionOf.valueSetDefinition.content;
        }
        var html =
            "<table class=\"table table-striped table-bordered table-condensed\">" +
                "<th colspan='2' > Value Set </th>" +
                "<tr><td >Name:</td><td>" + valueSetName+ "</td></tr>" +
                "<tr><td >URI:</td><td>" + URI + "</td></tr>" +
                "<tr><td >Description code:</td><td>" + description + "</td></tr>" +
                "</table>";
        return html;
    }
});
