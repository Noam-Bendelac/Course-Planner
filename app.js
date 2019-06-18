
// "use strict";


// window.addEventListener('load', loadSpecs, false);
// $(loadSpecs);
onLoad(loadSpecs);
// loadCourses();
let globals = {};

$.getJSON('specCS.json', function(data) { globals.specCS = data; })

function loadSpecs() {
	// console.log(this);
	$('#page-fit-container').css('display', 'none');
	// $('#page')

	// for (let i = 0; i < 5000000000; i++) {}
	
	// let ee = {};
	let spec = $('<div/>', {
		'class': 'spec',
		id: 'spec-1',
	}).appendTo('#page-section-main');
	// }).css('top', top + 'px')
	// 	.css('left', left + 'px');
	globals.courses = loadCourses(globals.specCS);
	let arrows = loadArrows(globals.specCS);
	let dots = loadDots(globals.specCS);

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

	// let height, width;
	// [height, width] = transform(nRows + 1, nCols + 1);

	// $('.section')
	spec.css({
		'grid-template-columns': 'repeat(' + (maxCol+1) + ', 150px',
		'grid-template-rows': 'repeat(' + (maxRow+1) + ', 120px',
		'grid-area': '1 / 1 / span ' + (maxRow+1) + ' / span ' + (maxCol+1),
		// 'grid-row': (1) + ' / ' + (maxRow+2),
		// 'grid-column': (1) + ' / ' + (maxCol+2),
		// height: (height) + 'px',
		// width: (width) + 'px',
	});

	$('#page-section-main').css({
		'grid-template-columns': 'repeat(' + (maxCol+1) + ', 150px',
		'grid-template-rows': 'repeat(' + (maxRow+1) + ', 120px',
	});

	$('#page-fit-container').css('display', 'inline-block');
	centerAndScale();

	//recalcAssignment();

	// $('#page')

	// $('.section.side')
	// 	.css('height', $('#page').css('height'))
	// 	.css('width', $('#page').css('width'));
	// $('#page-load').css('visibility', 'hidden');
	
}



function loadCourses(spec) {
	//let page = document.getElementById('page');

	// console.log('load');
	
	let courses = [];

	for (let element of spec.courses) {
		courses.push(new Course(element));
	}
	return courses;
}

function loadArrows(spec) {
	let arrows = [];

	for (let element of spec.arrows) {
		// console.log(element[2]);
		
		arrows.push(new Arrow(element));
	}
	return arrows;
}

function loadDots(spec) {
	let dots = [];

	for (let element of spec.dots) {
		dots.push(new Dot(element));
	}
	return dots;
}

/*
function parseSpec(spec) {
	let courses = [];

	for (let line of spec) {
		courses.push(new Course(line));
		// if (courses[courses.length-1].row > maxRow) {
		// 	maxRow = 
		// }
		// course.addToHTML();
	}
	return [courses, maxRow, maxCol];
}
*/


// function transform(row, col) {
// 	return [
// 		120*row,
// 		150*col,
// 	];
// }


