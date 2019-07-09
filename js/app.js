

var nsGlobal = nsGlobal || {};


(async function app() {
	data = await $.getJSON('res/checksheets/CSmajor.json');
	nsGlobal.specCS = data;
	// console.log(data);
	
	nsGlobal.loadSpecs();
	nsGlobal.centerAndScale();
	
	for (let course of nsGlobal.courses) { course.constrained = false; }
	nsGlobal.recalcAssignment();
})();


$(window).resize(nsGlobal.centerAndScale);

// nsGlobal.drag();



