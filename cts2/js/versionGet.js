/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer, bauer.scott@mayo.edu
 * Date: 1/20/14
 * Time: 4:51 PM
 */
$(function(){

var baseCodingSchemesUri =  "http://bmidev4:5555/cts2/codesystemversions";
var baseMapsUri = "http://bmidev4:5555/cts2/mapversions";
var formatAndCallback = "&format=json&callback=?"
var codeSystemQueryURI = baseCodingSchemesUri + "?matchvalue=NCI_Thesaurus&filtercomponent=resourceName";
var baseCodeSystemVersionURI;
var mapSystemQueryURI;
    $.getJSON(codeSystemQueryURI + formatAndCallback, function(data ){

        baseCodeSystemVersionURI = data.CodeSystemVersionCatalogEntryDirectory.entry[0].href;
        console.log(baseCodeSystemVersionURI);
});

});