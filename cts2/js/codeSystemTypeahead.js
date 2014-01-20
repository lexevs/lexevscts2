/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/11/13
 * Time: 3:07 PM
 */

$('.example-codesystems .typeahead').typeahead({
    name: 'codesystems',
    valueKey: 'codeSystemVersionName',
    remote: {
        url : 'http://lexevscts2.nci.nih.gov/lexevscts2/codesystemversions?matchvalue=%QUERY&filtercomponent=resourceName&format=json&callback=?',
        filter: function (data) {
            var codeSystems =  data.codeSystemVersionCatalogEntryDirectory.entryList;
            return codeSystems;
        }
    },
    limit: 3
});