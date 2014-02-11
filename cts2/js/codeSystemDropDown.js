/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 4:03 PM
 */
    $(function() {

            var url = "http://bmidev4:5555/cts2/codesystemversions?format=json";
            $.getJSON(url + "&callback=?", function (data) {
                for (var i in data.CodeSystemVersionCatalogEntryDirectory.entry) {
                    var entry = data.CodeSystemVersionCatalogEntryDirectory.entry[i];
                    var name = entry.formalName;
                    var designation = entry.documentURI;
                    var uri = entry.href;
                    $("ul.dropdown-menu").append("<li><a href=\"#\">" + name + "</a></li>");
                }
            });
        });

