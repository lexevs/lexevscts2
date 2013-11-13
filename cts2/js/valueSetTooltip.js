/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/13/13
 * Time: 10:06 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    var url = "http://bmidev4:5555/cts2/resolvedvaluesets?matchvalue=${valueSetName}&filtercomponent=resourceName&format=json&callback=?";
    var vsID =  $("#tooltip").attr("data-cts");
    console.log(vsID);
    $.getJSON(url.replace("${valueSetName}", vsID), function(cts2JSON) {
        console.log(url);
        var html = getCodeSystemTableInfo(cts2JSON);
        $('#tooltip').tooltip({title: html, html: true });
    });

    function getCodeSystemTableInfo(valueSetJson) {
        // get the descripiton, current version, and code system name
        var entryList = valueSetJson.resolvedValueSetDirectory.entryList;
        console.log(entryList);
        for(i in entryList){
            var entry =     valueSetJson.resolvedValueSetDirectory.entryList[i];
            console.log(entry);
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
