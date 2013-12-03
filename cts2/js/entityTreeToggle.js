/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer, bauer.scott@mayo.edu
 * Date: 11/25/13
 * Time: 7:08 AM
 */
var treeUrl = "http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.10a/entity/C3399";
//var baseUrl = "http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.10a/entity/"
//var html = "";


function buildTreeInit(genURL){
    $.getJSON(genURL + "?format=json&callback=?", function(data){
        var rootName = data.entityDescriptionMsg.entityDescription.namedEntity.designationList[0].value;
        var childUrl = data.entityDescriptionMsg.entityDescription.namedEntity.children;
        populateRoot(rootName);
        $.when(addChildData(childUrl,"a#label-root")).then(buildLevelOne());
    });
}

function getChildren(dataRef){
    $.getJSON(dataRef + "?format=json&callback=?", function(childData){
        var childList = childData.entityDirectory.entryList;
        var html = "<ul id=\"level1\"  >";
        for (var i in childList) {
            var name = childList[i].knownEntityDescriptionList[0].designation;
            var ref = childList[i].knownEntityDescriptionList[0].href;
            var icon = "<span>" +
                "<i class=\"glyphicon glyphicon-plus-sign\"></i></span>";
            if(childList.length == 0){
                icon = "";}
            html = html +"<li>" +
                "<a id=\"level1\" data-index='" + i + "' data-cts2ref='" + ref +
                "' label-default=\"\" class=\"tree-toggle nav-header\" ><span>" +
                "<i class=\"glyphicon glyphicon-plus-sign\"></i></span>"
                + name + "</a></li>";
        }
        $("li#root").append(html + "</ul>");

    });
}

function buildTree(dataRef, id, index){
    $.getJSON(dataRef + "?format=json&callback=?", function(data){
        console.log(data);
        var childUrl = data.entityDescriptionMsg.entityDescription.namedEntity.children;

        $.getJSON(childUrl + "?format=json&callback=?", function(childData){
            var childList = childData.entityDirectory.entryList;
            var html=  "<ul id=\"level2\" data-li_index='" + index + "' class=\"tree\" >";
            for (var i in childList) {
                var name = childList[i].knownEntityDescriptionList[0].designation;
                var ref = childList[i].knownEntityDescriptionList[0].href;
                html= html +  "<li><a id=\"level2\" data-cts2ref='" + ref +
                    "' label-default=\"\"  >"
                    + name + "</a></li>";
            }
            console.log(id);
            var select = "a[id=" + id + "][data-index=" + index + "]";
            console.log("select: " + select);
            $(select).append(html + "</ul>");

        });
    });
}



function buildLevelOne() {
    var x = false;
    $("a#label-root").click(function () {
        if(x)
        { $("ul#level1").toggle("fast");}
        else{
        var href = $(this).data("cts2ref");
        var id = $(this).attr("id");
        getChildren(href, id);
        x = true;
        }
    });
}

function buildLevelTwo(){
var y = false;

$(document).on("click","a#level1", function(){
    var href = $(this).data("cts2ref");
    var id = $(this).attr("id");
    var index = $(this).data("index");
    console.log("href: " + href);
    console.log("id: " + id);
    console.log("index: " + index);
    if(y)
    {
        var select = "ul[id=\"level2\"][data-li_index=" + index + "]";
        $(select).children().toggle("fast");}
    else{

        buildTree(href, id, index);
        y = true;
    }
});
}

buildTreeInit(treeUrl);
buildLevelTwo();

function populateRoot(rootName){
    console.log(rootName);
    var iconizedRoot = "<span><i class=\"glyphicon glyphicon-plus-sign\"></i></span>" + rootName;
    $("a#label-root").html(iconizedRoot);
}

function addChildData(childUrl, id){
    $(id).data("cts2ref", childUrl);
    console.log($(id).data("cts2ref"));
}
