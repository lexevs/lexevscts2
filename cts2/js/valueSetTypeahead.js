/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/8/13
 * Time: 9:56 AM
 */

    $('.example-valuesets .typeahead').typeahead({
        name: 'valuesets',
        valueKey: 'content',
        remote: {
            url : 'http://bmidev4:5555/cts2/resolvedvaluesets?matchvalue=%QUERY&filtercomponent=resourceName&format=json&callback=?',
            filter: function (data) {
                var values = [];
                var valueSets =  data.ResolvedValueSetDirectory.entry;
                for(i in valueSets){
                             var entry = data.ResolvedValueSetDirectory.entry[i].resolvedHeader.resolutionOf.valueSet.content;
                             values.push(entry)
                }
                return values;
            }
        },
        limit: 3
    });
