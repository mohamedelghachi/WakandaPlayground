
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var searchInput = {};	// @textField
	var clearDataButton = {};	// @button
	var generateDataButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	searchInput.keyup = function searchInput_keyup (event)// @startlock
	{// @endlock
		sources.companySearch.query('name = :1', $$('searchInput').getValue() + '*');
	};// @lock

	clearDataButton.click = function clearDataButton_click (event)// @startlock
	{// @endlock
		ds.Person.removeData({
			onSuccess: function(event){
				sources.company.all();
			}
		});
	};// @lock

	generateDataButton.click = function generateDataButton_click (event)// @startlock
	{// @endlock
		ds.Person.createSampleData($$('numberOfPeopleInput').getValue(), {
			onSuccess: function(event){
				sources.companyList.all();
			}
		});
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		sources.companyList.all();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("searchInput", "keyup", searchInput.keyup, "WAF");
	WAF.addListener("clearDataButton", "click", clearDataButton.click, "WAF");
	WAF.addListener("generateDataButton", "click", generateDataButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
