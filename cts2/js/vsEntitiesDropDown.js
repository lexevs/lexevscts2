/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 4:03 PM
 */
$(function() {
        var url = "http://bmidev4:5555/cts2/valueset/Unified Code for Units of Measure Terminology/definition/3f9797c0/resolution?format=json";
        var encodedUrl = encodeURI(url);
        $.getJSON(encodedUrl + "&callback=?", function (data) {
            for (var i in data.iteratableResolvedValueSet.entryList) {
                var entry = data.iteratableResolvedValueSet.entryList[i];
                var name = entry.designation;
                $("ul.dropdown-menu#resolved").append("<li><a href=\"#\">" + name + "</a></li>");
            }
        });
    });