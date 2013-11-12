/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/5/13
 * Time: 1:57 PM
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
                    var uri = entry.href;
                    $("ul").append("<li><a id=\"pill-pane\" href=\"#nothome\" data-toggle='tab'>" + key + "</a></li>");
                }
            });
        });
}

$(document).ready(
//    $("a").click(function () {
//            $.getJSON(codeversion + "&callback=?", function (data) {
//                var entry = data.CodeSystemVersionCatalogEntryMsg.codeSystemVersionCatalogEntry;
//                var name = entry.codeSystemVersionName;
//                $("#replaceme").text(name);
//            });
//        }
//    )
//    $('#myTab a').click(function (e) {
//        e.preventDefault()
//        $(this).tab('show')
//    })
);




