

var globals = globals || {};


$.getJSON('res/checksheets/CSmajor.json', data => {
	globals.specCS = data; //xconsole.log(data);
	globals.loadSpecs();
	centerAndScale();
	
	for (let course of globals.courses) { course.constrained = false; }
	recalcAssignment();
});



// drag();



