/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/13/13
 * Time: 3:34 PM
 */
var CodeSystemListConfig = {
    serviceUrl: "http://bmidev4:5555/cts2/mapversions?format=json"
};

$(document).ready(
    function() {
        var url = CodeSystemListConfig.serviceUrl;
        $.getJSON(url + "&callback=?", function (data) {
            for (var i in data.mapVersionDirectory.entryList) {
                var entry = data.mapVersionDirectory.entryList[i];
                var name = entry.formalName;
                $("ul.dropdown-menu").append("<li><a href=\"#\">" + name + "</a></li>");
            }
        });
    });
