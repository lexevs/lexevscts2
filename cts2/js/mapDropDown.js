/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 3:34 PM
 */
$(function() {
        var url = "http://lexevscts2-stage.nci.nih.gov/lexevscts2/mapversions?format=json";
        $.getJSON(url + "&callback=?", function (data) {
            for (var i in data.mapVersionDirectory.entryList) {
                var entry = data.mapVersionDirectory.entryList[i];
                var name = entry.formalName;
                $("ul.dropdown-menu").append("<li><a href=\"#\">" + name + "</a></li>");
            }
        });
    });
