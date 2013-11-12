/**
 * Created with IntelliJ IDEA.
 * User: m029206
 * Date: 11/11/13
 * Time: 3:07 PM
 * To change this template use File | Settings | File Templates.
 */

$('.example-codesystems .typeahead').typeahead({
    name: 'codesystems',
    valueKey: 'codeSystemVersionName',
    remote: {
        url : 'http://bmidev4:5555/cts2/codesystemversions?matchvalue=%QUERY&filtercomponent=resourceName&format=json&callback=?',
        filter: function (data) {
            console.log(data);
            console.log(data.codeSystemVersionCatalogEntryDirectory.entryList);
            var codeSystems =  data.codeSystemVersionCatalogEntryDirectory.entryList;
            return codeSystems;
        }
    },
    limit: 3
});