/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/5/13
 * Time: 9:18 AM
 * To change this template use File | Settings | File Templates.
 */
var CodeSystemListConfig = {
    serviceUrl: "http://bmidev4:5555/cts2/codesystemversions?format=json"
};

function init() {

    $(document).ready(
        function() {
            var url = CodeSystemListConfig.serviceUrl;
            $.getJSON(url + "&callback=?", function (data) {

                for (var i in data.codeSystemVersionCatalogEntryDirectory.entryList) {
                    var entry = data.codeSystemVersionCatalogEntryDirectory.entryList[i];
                    var key = entry.formalName;
                    var designation = entry.documentURI;
//                    $(".list").text(key);
                    $("ol").append("<li>" + key + "</li>");
                }
            });
        });
}