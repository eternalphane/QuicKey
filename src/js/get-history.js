define([
	"cp"
], function(
	cp
) {
	const ProtocolPattern = /^[^:]+:\/\//;


	var history = [];


	function getHistory()
	{
		history = [];

		return cp.history.search({ text: "", startTime: 0 })
			.then(function(historyItems) {
				historyItems.forEach(function(item) {
					item.displayURL = item.url.replace(ProtocolPattern, "");
					history.push(item);
				});

				return history;
			});
	}


	return getHistory;
});
