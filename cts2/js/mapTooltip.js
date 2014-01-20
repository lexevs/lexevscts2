/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 10:37 AM
 */

$(document).ready(function(){
    var url = "http://lexevscts2.nci.nih.gov/lexevscts2/mapversions?matchvalue=${mapName}&filtercomponent=resourceName&format=json&callback=?";
    var mID =  $("#tooltip").attr("data-cts");
    $.getJSON(url.replace("${mapName}", mID), function(cts2JSON) {
        var html = getMapTableInfo(cts2JSON);
        $('#tooltip').tooltip({title: html, html: true });
    });

    function getMapTableInfo(mapJson) {
        // get the name, current version, and URI
        var entryList = mapJson.mapVersionDirectory.entryList;
        for(i in entryList){
            var entry =     mapJson.mapVersionDirectory.entryList[i];
            var mapName =  entry.formalName;
            var version = entry.mapVersionName;
            var URI = entry.documentURI;
        }
        var html =
            "<table class=\"table table-striped table-bordered table-condensed\">" +
                "<th colspan='2' > Map </th>" +
                "<tr><td >Name:</td><td>" + mapName+ "</td></tr>" +
                "<tr><td >Version:</td><td>" + version + "</td></tr>" +
                "<tr><td >URI:</td><td>" + URI + "</td></tr>" +
                "</table>";
        return html;
    }
});
