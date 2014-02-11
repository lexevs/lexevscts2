/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/11/13
 * Time: 4:07 PM
 * To change this template use File | Settings | File Templates.
 */
$('.example-maps .typeahead').typeahead({
    name: 'maps',
    valueKey: 'formalName',
    remote: {
        url : 'http://bmidev4:5555/cts2/mapversions?matchvalue=%QUERY&filtercomponent=resourceName&format=json&callback=?',
        filter: function (data) {
            var maps =  data.MapVersionDirectory.entry;
            return maps
        }
    },
    limit: 3
});
