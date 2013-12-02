/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/18/13
 * Time: 12:57 PM
 * To change this template use File | Settings | File Templates.
 */
$(function() {


    var treeUrl = "http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.10a/entity/C3399";
     var html = "";

    function buildTreeRecursively(genURL, count, max){

        $.getJSON(genURL + "?format=json&callback=?", function(data){
            var rootName = data.entityDescriptionMsg.entityDescription.namedEntity.designationList[0].value;
            var childUrl = data.entityDescriptionMsg.entityDescription.namedEntity.children;
            if(!childUrl){
                return html;
            }
            if(count == 0) {
                html = html + "<ul class=\"nav\" >" +
                    "<li>" +
                    "<label label-default=\"\" class=\"tree-toggle nav-header\">"
                    + rootName +
                    "</label>";
//               +  "<ul id=\"cts2-lev2\" class=\"nav tree\">";
            }
            count++;
            $.getJSON(childUrl + "?format=json&callback=?", function(childData){
                var childList = childData.entityDirectory.entryList;
//                console.log(childList);
                html = html + "<ul id=\"cts2-lev2\" class=\"nav tree\">";
                for (var i in childList) {
                    var name = childList[i].knownEntityDescriptionList[0].designation;
                    var ref = childList[i].knownEntityDescriptionList[0].href;
                    html = html + "<li><label label-default=\"\" class=\"tree-toggle nav-header\" >"+ name
//                        + "</li>"
                    ;
                    buildTreeRecursively(ref, count, max);
                    html = html +  "</li>";
                }
                html = html + "</ul></li></ul>";


            });


        });


    }

    function retrieveHtml(){
        $("div#recur-tree").html(html);
        toggleTree();
    }

    $.when(
    buildTreeRecursively(treeUrl,0,1, "")
    ).then(function(){retrieveHtml()});




    //   This function from http://bootply.com/94961#
    function toggleTree(){$('.tree-toggle').click(function () {
        $(this).parent().children('ul.tree').toggle(200);
    });
    }

});
