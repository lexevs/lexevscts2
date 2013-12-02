/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer, bauer.scott@mayo.edu
 * Date: 11/22/13
 * Time: 7:31 AM
 */
$(function () {


    var treeUrl = "http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.10a/entity/C3399";
    var html;
    function buildFirstNode(genURL) {

        $.getJSON(genURL + "?format=json&callback=?", function (data) {
            var rootName = data.entityDescriptionMsg.entityDescription.namedEntity.designationList[0].value;
//            var childUrl = data.entityDescriptionMsg.entityDescription.namedEntity.children;
             getFirstNode(rootName);
        }).done(function(data){
//                console.log(html);
//                console.log(data.entityDescriptionMsg.entityDescription.namedEntity.children);
                recurseBuildTree( data.entityDescriptionMsg.entityDescription.namedEntity.children, 0, 2, "") ;

        });
    }

    function buildAllOtherNodes(genURL){

    }



    function toggleTree() {
        $('.tree-toggle').click(function () {
            $(this).parent().children('ul.tree').toggle(200);
        });
    }

buildFirstNode(treeUrl);

// Insures a value is returned after callback ends.
    function getFirstNode(rootName){
       html =  "<ul class=\"nav\" >" +
            "<li>" +
            "<label label-default=\"\" class=\"tree-toggle nav-header\">"
            + rootName +
        "</label>";
    }

    function recurseBuildTree(childUrl, count, max, nextHtml){
        if(count == max){
            return nextHtml;
        }
        count++;
        $.getJSON(childUrl + "?format=json&callback=?", function(childData){
            console.log(childData);
            var childList = childData.entityDirectory.entryList;
            nextHtml = html + "<ul id=\"cts2-lev2\" class=\"nav tree\">";
            for (var i in childList) {
                var name = childList[i].knownEntityDescriptionList[0].designation;
                var ref = childList[i].knownEntityDescriptionList[0].href;
                nextHtml = nextHtml + "<li><label label-default=\"\" class=\"tree-toggle nav-header\" >"+ name
                ;
                if(ref){
                recurseBuildTree(ref, count, max, nextHtml);
                    nextHtml = nextHtml +  "</li>";
                }
            }
            nextHtml = nextHtml + "</ul></li></ul>";
            retrieveHtml(nextHtml);
            toggleTree();
    });
    }


    function retrieveHtml(html){
        $("div#recur-tree").html(html);
    }



});