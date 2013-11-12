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
        url : 'http://bmidev4:5555/cts2/mapversions?matchvalue=%QUERY&filtercomponent=resourceSynopsis&format=json&callback=?',
        filter: function (data) {
            console.log(data);
            console.log(data.mapVersionDirectory.entryList);
            var maps =  data.mapVersionDirectory.entryList;
            return maps;
        }
    },
    limit: 3
});
