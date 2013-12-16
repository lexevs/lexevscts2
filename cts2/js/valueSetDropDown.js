/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 3:21 PM
 */

$(function() {
        var vsurl =  "http://bmidev4:5555/cts2/resolvedvaluesets?format=json";
        $.getJSON(vsurl + "&callback=?", function (vsdata) {
            for (var i in vsdata.resolvedValueSetDirectory.entryList) {
                var entry = vsdata.resolvedValueSetDirectory.entryList[i];
                var name = entry.resolvedHeader.resolutionOf.valueSet.content;
                $("ul.dropdown-menu#valuesets").append("<li><a href=\"#\">" + name + "</a></li>");
            }
        });
    });
