/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/7/13
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {

    var restUrlBase = "http://informatics.mayo.edu/cts2/rest/";
    var restUrlValueSet = restUrlBase + "valuesets?matchvalue=${searchTerm}&filtercomponent=${filterType}&maxtoreturn=25&format=json&callback=?";

    monkeyPatchAutocomplete();

    $(function() {
        function log(message) {
            $("<div>").text(message).prependTo("#log");
            $("#log").scrollTop(0);
        }


        $("#valueSets").autocomplete({

            source : function(req, add) {

                var url = restUrlValueSet;

                // determine the type of filter to
                // use: search the description field or the name field.
                if ($("input[type='radio']:checked").attr('id') == "vsSearchDescription") {
                    url = url.replace("${filterType}", "resourceSynopsis");
                } else {
                    url = url.replace("${filterType}", "resourceName");
                }
                //alert (url.replace("${searchTerm}", req.term));

                //pass request to server
                $.getJSON(url.replace("${searchTerm}", req.term), function(cts2JSON) {

                    //process response
                    var suggestions = getValueSets(cts2JSON);

                    //pass array to callback
                    add(suggestions);
                });
            },

            minLength : 2,
            autoFocus : true,
            select : function(event, ui) {
                addTableRow(ui);
            }
        });
    });

    /**
     * Create a name value pair from the JSON for a VALUE SET and return it.
     * @param {Object} valueSetJson
     */
    function getValueSets(valueSetJson) {

        // get the list to iterate through it
        var valueSetList = valueSetJson.valueSetCatalogEntryDirectory.entryList;
        var valueSets = [];

        for (var i in valueSetList) {

            var resourceName = valueSetList[i].resourceName;
            var formalName = valueSetList[i].formalName;
            var description = valueSetList[i].resourceSynopsis.value;
            var valueSetName = valueSetList[i].valueSetName;

            var nameValuePair = {
                "label" : formalName,
                "value" : resourceName,
                "valueSetName" : valueSetName,
                "description" : description
            };

            // add to the array
            valueSets.push(nameValuePair);
        }

        return valueSets;
    }

    function addTableRow(ui) {

        $('#vsTable').append(
            '<tr>' +
                '<td>' + ui.item.value + '</td>' +
                '<td>' + ui.item.label + '</td>' +
                '<td>' + ui.item.valueSetName + '</td>' +
                '<td>' + ui.item.description + '</td>' +
                '</tr>');

        $("#vsTable").scrollTop(0);

    }

    $("#buttonClear").click(function() {
        $("#vsTable > tbody").html("");
    });


    /**
     * A monkey patch is a way to extend or modify the run-time code
     * of dynamic languages without altering the original source code.
     *
     * This is modifying the results to highlight the matching text in the dropdown list.
     */
    function monkeyPatchAutocomplete() {

        $.ui.autocomplete.prototype._renderItem = function(ul, item) {
            item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<span style='font-weight:bold;color:#ff005a;'>$1</span>");
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
        };

    }

});