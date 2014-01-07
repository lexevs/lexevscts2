/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer, bauer.scott@mayo.edu
 * Date: 1/6/14
 * Time: 8:57 AM
 */
$(document).ready(function(){
    var nextURL;
    var previousURL;

    var url = "http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.07e/entities?maxtoreturn=5&format=json&callback=?";
    $.getJSON(url, function(cts2JSON) {
       nextURL = cts2JSON.entityDirectory.next;
       buildHtml(cts2JSON);
    });

    $("div.btn-group button.cts2next").on("click", function(){
        if(nextURL !=null){
        $.when($("div.show_hide").html("<ul class=\"list-group\"></ul>")).then(
            getNextPrev(nextURL))}
    });

    $("div.btn-group button.cts2prev").on("click", function(){
        if(previousURL != null){
        $.when($("div.show_hide").html("<ul class=\"list-group\"></ul>")).then(
        getNextPrev(previousURL)) }
    });

    function buildHtml(data){
        for(i in data.entityDirectory.entryList){
            var entity = data.entityDirectory.entryList[i];
            var code = entity.name.name;
            var name = entity.knownEntityDescriptionList[0].designation;
            if(name == null) {
                name = "MISSING"
            }
            $("ul.list-group").append("<li class=\"list-group-item\"><a href=\"#\">code: " + code + "   name: " + name + "</a></li>");
        }
    }

    function getNextPrev(givenURL){
        $.getJSON(givenURL + "&callback=?", function(cts2Next) {
            nextURL = cts2Next.entityDirectory.next;
            previousURL = cts2Next.entityDirectory.prev ;
            buildHtml(cts2Next);
        })
    }
});