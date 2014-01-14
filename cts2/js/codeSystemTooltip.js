/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/12/13
 * Time: 9:23 AM
 */
$(document).ready(function(){
    var url = "http://lexevscts2-stage.nci.nih.gov/lexevscts2//codesystemversions?matchvalue=${codeSystemName}&filtercomponent=resourceName&format=json&callback=?";
    var csID =  $("#tooltip").attr("data-cts");
    $.getJSON(url.replace("${codeSystemName}", csID), function(cts2JSON) {
        var html = getCodeSystemTableInfo(cts2JSON)
        $('#tooltip').tooltip({title: html, html: true });
    });


    function getCodeSystemTableInfo(codeSystemJson) {
        // get the description, current version, and code system name from the jsonp object
        // variable path elements represent the path into the json element structure
        var entryList = codeSystemJson.codeSystemVersionCatalogEntryDirectory.entryList;
        for(i in entryList){
           var entry =     codeSystemJson.codeSystemVersionCatalogEntryDirectory.entryList[i];
           var codeSystemName =  entry.codeSystemVersionName;
           var currentVersion = entry.officialResourceVersionId;
           var description = entry.resourceSynopsis.value;
        }
        var html =
            "<table class=\"table table-striped table-bordered table-condensed\">" +
                "<th colspan='2' > Code System </th>" +
                "<tr><td >Name:</td><td>" + codeSystemName + "</td></tr>" +
                "<tr><td >Current Version:</td><td>" + currentVersion + "</td></tr>" +
                "<tr><td >Description:</td><td>" + description + "</td></tr>" +
                "</table>";
        return html;
    }
});