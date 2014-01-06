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
       for(i in cts2JSON.entityDirectory.entryList){
           var entity = cts2JSON.entityDirectory.entryList[i];
           var code = entity.name.name;
           var name = entity.knownEntityDescriptionList[0].designation;
           if(name == null) {
               name = "MISSING"
           }

           $("ul.list-group").append("<li class=\"list-group-item\"><a href=\"#\">code: " + code + "   name: " + name + "</a></li>");
       }
    });

    $("div.btn-group button.cts2next").on("click", function(){
        $.when($("div.show_hide").html("<ul class=\"list-group\"></ul>")).then(
        $.getJSON(nextURL + "&callback=?", function(cts2Next) {
            nextURL = cts2Next.entityDirectory.next;
            previousURL = cts2Next.entityDirectory.prev ;
            for(i in cts2Next.entityDirectory.entryList){
                var entity = cts2Next.entityDirectory.entryList[i];
                var code = entity.name.name;
                var name = entity.knownEntityDescriptionList[0].designation;
                if(name == null) {
                    name = "MISSING"
                }

                $("ul.list-group").append("<li class=\"list-group-item\"><a href=\"#\">code: " + code + "   name: " + name + "</a></li>");
            }
        })
        );
    })

    $("div.btn-group button.cts2prev").on("click", function(){
        $.when($("div.show_hide").html("<ul class=\"list-group\"></ul>")).then(
            $.getJSON(previousURL + "&callback=?", function(cts2Next) {
                nextURL = cts2Next.entityDirectory.next;
                previousURL = cts2Next.entityDirectory.prev ;
                for(i in cts2Next.entityDirectory.entryList){
                    var entity = cts2Next.entityDirectory.entryList[i];
                    var code = entity.name.name;
                    var name = entity.knownEntityDescriptionList[0].designation;
                    if(name == null) {
                        name = "MISSING"
                    }

                    $("ul.list-group").append("<li class=\"list-group-item\"><a href=\"#\">code: " + code + "   name: " + name + "</a></li>");
                }
            })
        );
    })
});