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
        valueKey: 'content',
        remote: {
            url : 'http://bmidev4:5555/cts2/resolvedvaluesets?matchvalue=%QUERY&filtercomponent=resourceName&format=json&callback=?',
            filter: function (data) {
                var values = []
//                console.log(data);
//                console.log(data.resolvedValueSetDirectory.entryList);
                var valueSets =  data.resolvedValueSetDirectory.entryList;
                for(i in valueSets){
                             var entry = data.resolvedValueSetDirectory.entryList[i].resolvedHeader.resolutionOf.valueSet.content;
                             values.push(entry)
                }
                return values;
            }
        },
        limit: 3
    });
//});