/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 3:34 PM
 */
$(function() {
        var url = "http://bmidev4:5555/cts2/mapversions?format=json";
        $.getJSON(url + "&callback=?", function (data) {
            for (var i in data.MapVersionDirectory.entry) {
                var entry = data.MapVersionDirectory.entry[i];
                var name = entry.formalName;
                $("ul.dropdown-menu").append("<li><a href=\"#\">" + name + "</a></li>");
            }
        });
    });
