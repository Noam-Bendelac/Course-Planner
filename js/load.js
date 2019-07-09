

var nsGlobal = nsGlobal || {};

var nsLoad = nsLoad || {};

nsGlobal.loadSpecs = function() {
	let spec = $('<div/>', {
		'class': 'spec',
		id: 'spec-1',
	}).appendTo('#page-section-main');

	nsGlobal.courses = nsLoad.loadCourses(nsGlobal.specCS);
	let arrows = nsLoad.loadArrows(nsGlobal.specCS);
	let dots = nsLoad.loadDots(nsGlobal.specCS);

	let maxRow = 0,
			maxCol = 0;
	for (let course of nsGlobal.courses) {
		maxRow = Math.max(maxRow, course.row);
		maxCol = Math.max(maxCol, course.col);
		course.addToHTML(spec);
	}

	for (let arrow of arrows) {
		arrow.addToHTML(spec, nsGlobal.courses);
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



nsLoad.loadCourses = function(spec) {
	let courses = [];

	for (let element of spec.courses) {
		courses.push(new nsGlobal.Course(element));
	}
	return courses;
}

nsLoad.loadArrows = function(spec) {
	let arrows = [];

	for (let element of spec.arrows) {
		arrows.push(new nsGlobal.Arrow(element));
	}
	return arrows;
}

nsLoad.loadDots = function(spec) {
	let dots = [];

	for (let element of spec.dots) {
		dots.push(new nsGlobal.Dot(element));
	}
	return dots;
}




