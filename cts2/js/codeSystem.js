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
                    $("ul").append("<li><a href=\"" + uri +"\">" + key + "</a></li>");
                }
            });
        });
}
