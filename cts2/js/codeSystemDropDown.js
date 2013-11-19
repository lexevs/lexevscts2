var CodeSystemListConfig = {
    serviceUrl: "http://bmidev4:5555/cts2/codesystemversions?format=json"
};

    $(document).ready(
        function() {
            var url = CodeSystemListConfig.serviceUrl;
            $.getJSON(url + "&callback=?", function (data) {
                for (var i in data.codeSystemVersionCatalogEntryDirectory.entryList) {
                    var entry = data.codeSystemVersionCatalogEntryDirectory.entryList[i];
                    var name = entry.formalName;
                    var designation = entry.documentURI;
                    var uri = entry.href;
                    $("ul.dropdown-menu").append("<li><a href=\"#\">" + name + "</a></li>");
                }
            });
        });

