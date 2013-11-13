/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/13/13
 * Time: 10:37 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    var url = "http://bmidev4:5555/cts2/mapversions?matchvalue=${mapName}&filtercomponent=resourceName&format=json&callback=?";
    var mID =  $("#tooltip").attr("data-cts");
    console.log(mID);
    $.getJSON(url.replace("${mapName}", mID), function(cts2JSON) {
        console.log(url);
        var html = getMapTableInfo(cts2JSON);
        $('#tooltip').tooltip({title: html, html: true });
    });

    function getMapTableInfo(mapJson) {
        // get the descripiton, current version, and code system name
        var entryList = mapJson.mapVersionDirectory.entryList;
        console.log(entryList);
        for(i in entryList){
            var entry =     mapJson.mapVersionDirectory.entryList[i];
            console.log(entry);
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
