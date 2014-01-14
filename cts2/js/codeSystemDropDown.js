/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 4:03 PM
 */
    $(function() {

            var url = "http://lexevscts2-stage.nci.nih.gov/codesystemversions?format=json";
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

