/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer, bauer.scott@mayo.edu
 * Date: 11/25/13
 * Time: 7:08 AM
 */


// define the url of the root node
var treeUrl = "http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.10a/entity/C3399";

//initialise the root by making a call to the rest service
function buildTreeInit(genURL){
    $.getJSON(genURL + "?format=json&callback=?", function(data){
        var rootName = data.entityDescriptionMsg.entityDescription.namedEntity.designationList[0].value;
        var childUrl = data.entityDescriptionMsg.entityDescription.namedEntity.children;
        populateRoot(rootName);
        $.when(addChildData(childUrl,"a#label-root")).then(buildLevelOne());
    });
}

//When the root is clicked, get the children of the root and display them.
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

//Get the children of this root, format them in html and attach them to a list item with id of "root"
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

//if a level one child is clicked, build the next level of children
function buildLevelTwo(){
    var y = false;

    $(document).on("click","a#level1", function(){
        var href = $(this).data("cts2ref");
        var id = $(this).attr("id");
        var index = $(this).data("index");
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
//Get the children of the root's child
function buildTree(dataRef, id, index){
    $.getJSON(dataRef + "?format=json&callback=?", function(data){
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
            var select = "a[id=" + id + "][data-index=" + index + "]";
            $(select).append(html + "</ul>");

        });
    });
}



buildTreeInit(treeUrl);
buildLevelTwo();

// create some html containing the root name
function populateRoot(rootName){
    var iconizedRoot = "<span><i class=\"glyphicon glyphicon-plus-sign\"></i></span>" + rootName;
    $("a#label-root").html(iconizedRoot);
}

// adding the URL of the children of the root as data to the javascript model of the html
function addChildData(childUrl, id){
    $(id).data("cts2ref", childUrl);
}
