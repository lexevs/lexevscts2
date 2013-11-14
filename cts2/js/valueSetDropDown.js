/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/13/13
 * Time: 3:21 PM
 * To change this template use File | Settings | File Templates.
 */
var ValueSetListConfig = {
    serviceUrl: "http://bmidev4:5555/cts2/resolvedvaluesets?format=json"
};

$(document).ready(
    function() {
        var vsurl = ValueSetListConfig.serviceUrl;
        $.getJSON(vsurl + "&callback=?", function (vsdata) {
//            console.log(vsurl);
            for (var i in vsdata.resolvedValueSetDirectory.entryList) {
                var entry = vsdata.resolvedValueSetDirectory.entryList[i];
                var name = entry.resolvedHeader.resolutionOf.valueSet.content;
                $("ul.dropdown-menu#valuesets").append("<li><a href=\"#\">" + name + "</a></li>");
            }
        });
    });
