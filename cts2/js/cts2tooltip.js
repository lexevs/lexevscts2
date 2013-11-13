$(document).ready(function() {

	var restUrlBase = "http://informatics.mayo.edu/cts2/rest/";
	var restUrlValueSet = restUrlBase + "valueset/${valueSetName}?format=json&callback=?";
	var restUrlCodeSystem = restUrlBase + "codesystem/${codeSystemName}?format=json&callback=?";
		
	var $tooltip = $("<div id='tooltip'></div>").appendTo("body");

	// Tooltip for Value Sets
	$(".hint_vs").on({
		mousemove : moveTooltip,
		mouseenter : showTooltipValueSets,
		mouseleave : hideTooltip
	});
	
	// Tooltip for Code Systems
	$(".hint_cs").on({
		mousemove : moveTooltip,
		mouseenter : showTooltipCodeSystems,
		mouseleave : hideTooltip
	});

	function hideTooltip() {
		$tooltip.stop(true, true).fadeOut("slow");
	}

	function showTooltipValueSets() {
		var vsId =  $(this).data("id");
		
		// Make RESTful call to CTS2 ValueSet service 
		// and format the JSON that is returned.
		$.getJSON(restUrlValueSet.replace("${valueSetName}", vsId), function(cts2JSON) {
			
			var html = getValueSetTableInfo(cts2JSON)
			$tooltip.html(html).stop(true, true).fadeIn("slow");
		});

	}
	
	function showTooltipCodeSystems() {
		var csId =  $(this).data("id");

		// Make RESTful call to CTS2 ValueSet service 
		// and format the JSON that is returned.
		$.getJSON(restUrlCodeSystem.replace("${codeSystemName}", csId), function(cts2JSON) {
			
			var html = getCodeSystemTableInfo(cts2JSON)
			$tooltip.html(html).stop(true, true).fadeIn("slow");
		});

	}

	/**
	 * Create an HTML table from the JSON for a VALUE SET and return it.
	 * @param {Object} valueSetJson
	 */
	function getValueSetTableInfo(valueSetJson) {
		// get the descripiton, formal name, and value set name
		var description = valueSetJson.valueSetCatalogEntryMsg.valueSetCatalogEntry.resourceSynopsis.value;
		var formalName = valueSetJson.valueSetCatalogEntryMsg.valueSetCatalogEntry.formalName;
		var valueSetName = valueSetJson.valueSetCatalogEntryMsg.valueSetCatalogEntry.valueSetName;

		var html = 
			"<table>" + 
			"<th colspan=2> Value Set </th>" +
			"<tr><td class=\"noWrap\">Name:</td><td>" + valueSetName + "</td></tr>" + 
			"<tr><td class=\"noWrap\">Formal Name:</td><td>" + formalName + "</td></tr>" + 
			"<tr><td class=\"noWrap\">Description:</td><td>" + description + "</td></tr>" + 
			"</table>";
		
		return html;
	}


	/**
	 * Create an HTML table from the JSON for a CODE SYSTEM and return it.
	 * @param {Object} valueSetJson
	 */
	function getCodeSystemTableInfo(codeSystemJson) {
		// get the descripiton, current version, and code system name
		var codeSystemName = codeSystemJson.codeSystemCatalogEntryMsg.codeSystemCatalogEntry.codeSystemName;
		var currentVersion = codeSystemJson.codeSystemCatalogEntryMsg.codeSystemCatalogEntry.currentVersion.version.content;
		var description = codeSystemJson.codeSystemCatalogEntryMsg.codeSystemCatalogEntry.resourceSynopsis.value;

		var html = 
			"<table>" + 
			"<th colspan=2> Code System </th>" +
			"<tr><td class=\"noWrap\">Name:</td><td>" + codeSystemName + "</td></tr>" + 
			"<tr><td class=\"noWrap\">Current Version:</td><td>" + currentVersion + "</td></tr>" + 
			"<tr><td class=\"noWrap\">Description:</td><td>" + description + "</td></tr>" + 
			"</table>";
		
		return html;

	}

	function moveTooltip(e) {
		var x = e.pageX + 16, y = e.pageY + 16;
		$tooltip.css({
			left : x,
			top : y
		});
	}

}); 