/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/12/13
 * Time: 9:23 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var url = "http://bmidev4:5555/cts2/codesystemversions?matchvalue=${codeSystemName}&filtercomponent=resourceName&format=json&callback=?";
    console.log(url);
    var csID =  $("#tooltip").attr("data-cts");
    console.log(csID);
    $.getJSON(url.replace("${codeSystemName}", csID), function(cts2JSON) {
         console.log(url);
        var html = getCodeSystemTableInfo(cts2JSON)
        $('#tooltip').tooltip({title: html, html: true });
    });
//    $('#tooltip').tooltip({title: "\<div> guess this is html</div>", html: true
//    });
    /**
     * Create an HTML table from the JSON for a CODE SYSTEM and return it.
     * @param {Object} valueSetJson
     */
    function getCodeSystemTableInfo(codeSystemJson) {
        // get the descripiton, current version, and code system name
        var entryList = codeSystemJson.codeSystemVersionCatalogEntryDirectory.entryList;
        console.log(entryList);
        for(i in entryList){
           var entry =     codeSystemJson.codeSystemVersionCatalogEntryDirectory.entryList[i];
           console.log(entry);
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