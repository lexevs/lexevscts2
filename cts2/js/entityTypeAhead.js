/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer
 * Date: 11/15/13
 * Time: 11:58 AM
 */
$('.example-entities .typeahead').typeahead({
    name: 'entities',
    valueKey: 'designation',
    remote: {
        url : 'http://bmidev4:5555/cts2/codesystem/NCI_Thesaurus/version/10.10a/entities?matchvalue=%QUERY&format=json&callback=?',
        filter: function (data) {
            var entryList =  data.entityDirectory.entryList;
            var entities = [];
            for(i in entryList){
                entities.push(entryList[i].knownEntityDescriptionList[0].designation); //Only shows the first entity description
            }
            return entities;
        },
        rateLimitWait : 600
    },
    limit: 3
});