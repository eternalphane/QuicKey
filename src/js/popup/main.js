require([
	"jsx!popup/app",
	"react",
	"react-dom",
	"get-tabs",
	"cp",
	"lodash"
], function(
	App,
	React,
	ReactDOM,
	getTabs,
	cp,
	_
) {
	console.log("startup time", performance.now() - gInitTime, performance.now());

	if (gClose) {
			// the user hit esc before we started loading, so just close
			// the popup
		window.close();

		return;
	}

	Promise.all([
		getTabs(),
		cp.tabs.query({
			active: true,
			currentWindow: true
		})
	])
		.then(function(result) {
			var tabs = result[0],
				activeTab = result[1][0],
				query = gKeyCache.join("");

				// clean up the globals
			document.removeEventListener("keydown", gOnKeyDown, false);
			gOnKeyDown = null;
			gKeyCache = null;

				// remove the active tab from the array so it doesn't show up in
				// the results, making it clearer if you have duplicate tabs open
			_.remove(tabs, { id: activeTab.id });

			ReactDOM.render(
				React.createElement(App, {
					tabs: tabs,
					initialQuery: query
				}),
				document.getElementById("root")
			);
		});
});