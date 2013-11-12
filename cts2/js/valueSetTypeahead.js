/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/8/13
 * Time: 9:56 AM
 * To change this template use File | Settings | File Templates.
 */

//$(document).ready(function() {
    $('.example-valuesets .typeahead').typeahead({
        name: 'valuesets',
        valueKey: 'valueSetName',
        remote: {
            url : 'http://informatics.mayo.edu/cts2/rest/valuesets?matchvalue=%QUERY&filtercomponent=resourceName&format=json&callback=?',
            filter: function (data) {
                console.log(data);
                console.log(data.valueSetCatalogEntryDirectory.entryList);
                var valueSets =  data.valueSetCatalogEntryDirectory.entryList;
                return valueSets;
            }
        },
        limit: 3
    });
//});