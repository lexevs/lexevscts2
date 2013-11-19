/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/18/13
 * Time: 12:57 PM
 * To change this template use File | Settings | File Templates.
 */
$(function() {
        var treeUrl = "http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.10a/entity/C3399";
        var childUrl;
        var parentURL;

        $.getJSON(treeUrl + "?format=json&callback=?", function (data) {
            var rootName = data.entityDescriptionMsg.entityDescription.namedEntity.designationList[0].value;
            $("label#cts-tree-label").text(rootName);
//            text = text.replace(/ /g, '-');
//            text = text.replace(text, rootName);
            $("li#tree-root-node").text(rootName);
            childUrl = data.entityDescriptionMsg.entityDescription.namedEntity.children;
            parentURL = data.entityDescriptionMsg.entityDescription.namedEntity.parentList[0].href;
            $.getJSON(childUrl + "?format=json&callback=?", function(childData){
                var childList = childData.entityDirectory.entryList;
                console.log(childList);
                for (var i in childList) {
                    var name = childList[i].knownEntityDescriptionList[0].designation;
                    var ref = childList[i].knownEntityDescriptionList[0].href;
                    $("ul#cts-tree").append("<li><label label-default=\"\" class=\"tree-toggle nav-header\"><a href=\"#\">" + name + "</a><ul id=\"inside-tree\">inside</ul></li>");
                }
            });

        });

//   This function from http://bootply.com/94961#
    $('.tree-toggle').click(function () {
        $(this).parent().children('ul.tree').toggle(200);
    });

    });
