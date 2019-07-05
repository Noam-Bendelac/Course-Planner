
// "use strict";


// window.addEventListener('load', loadSpecs, false);
// $(loadSpecs);
// onLoad(loadSpecs);
// loadCourses();
// let globals = {};



// console.log('hh');
// globals.specCS = specCS;

var globals = globals || {};

var loadNS = loadNS || {};

globals.loadSpecs = function() {
	let spec = $('<div/>', {
		'class': 'spec',
		id: 'spec-1',
	}).appendTo('#page-section-main');

	globals.courses = loadNS.loadCourses(globals.specCS);
	let arrows = loadNS.loadArrows(globals.specCS);
	let dots = loadNS.loadDots(globals.specCS);

	let maxRow = 0,
			maxCol = 0;
	for (let course of globals.courses) {
		maxRow = Math.max(maxRow, course.row);
		maxCol = Math.max(maxCol, course.col);
		course.addToHTML(spec);
	}

	for (let arrow of arrows) {
		arrow.addToHTML(spec, globals.courses);
	}

	for (let dot of dots) {
		dot.addToHTML(spec, arrows);
	}

	spec.css({
		'grid-template-columns': `repeat(${maxCol+1}, 150px)`,
		'grid-template-rows': `repeat(${maxRow+1}, 120px)`,
		'grid-area': `1 / 1 / span ${maxRow+1} / span ${maxCol+1}`,
	});

	$('#page-section-main').css({
		'grid-template-columns': `repeat(${maxCol+1}, 150px)`,
		'grid-template-rows': `repeat(${maxRow+1}, 120px)`,
	});
	
}



loadNS.loadCourses = function(spec) {
	let courses = [];

	for (let element of spec.courses) {
		courses.push(new Course(element));
	}
	return courses;
}

loadNS.loadArrows = function(spec) {
	let arrows = [];

	for (let element of spec.arrows) {
		arrows.push(new Arrow(element));
	}
	return arrows;
}

loadNS.loadDots = function(spec) {
	let dots = [];

	for (let element of spec.dots) {
		dots.push(new Dot(element));
	}
	return dots;
}




