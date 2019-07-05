



// globals.semesters = Array.from(Array(9).keys()); // 0-8, where 0 means transfer



// user assignment, display, credits
// chronology

var globals = globals || {};

let recalcAssignmentNS = {};

recalcAssignmentNS.semesterAttr = ['transfer', '1', '2', '3', '4', '5', '6', '7', '8', 'double-count'];
globals.semesterCredits = Array(recalcAssignmentNS.semesterAttr.length).fill(0);
recalcAssignmentNS.doubleCountAttr = recalcAssignmentNS.semesterAttr.length - 1;

globals.creditsRange = {min: 15, max: 17};

function recalcAssignment() {

	// let semesters = Array.from(Array(9).keys()); // 0-8, where 0 means transfer

	recalcAssignmentNS.resetAssignment();

	for (let course of globals.courses) {


		// if (course.assigned || course.constrained) {
		// 	// This course's credits should already be included in the semester count
		// 	continue;
		// }
		recalcAssignmentNS.assignCourse(course, []);
	}
}

// onLoad(recalcAssignment);

recalcAssignmentNS.resetAssignment = function() {
	for (let course of globals.courses) {
		if (course.constrained) {
			course.assigned = true;
		} else {
			course.assigned = false;
		}
	}
}

recalcAssignmentNS.assignCourse = function(course, recursionHistory) {
	if (recursionHistory.includes(course)) {
		return;
	}
	if (course.assigned || course.constrained) {
		// This course's credits should already be included in the semester count
		return;
	}
	for (let semester = 1; semester < 9; semester++) { // From 1 to 8, so not including transfer or double-count
	// globals.semesters.forEach((semester, semCredits) => {
		if (globals.semesterCredits[semester] + course.credits <= globals.creditsRange.max) { // if there is room for credits in this semester
			// if (recalcAssignment.prereqsMet(course, semester)) { // if all pre- and co- req are met
			if (recalcAssignmentNS.minSemesterForPrereqs(course, recursionHistory) <= semester) { // if all pre- and co- req are met
				course.semester = semester;
				course.assigned = true;
				globals.semesterCredits[semester] += course.credits;
				break;
			}
		}
	}
	if (course.assigned) {
		course.el.attr('data-sem', recalcAssignmentNS.semesterAttr[course.semester]);
	} else {
		// TODO: error, could not fit course into schedule
	}
}

recalcAssignmentNS.minSemesterForPrereqs = function(course, recursionHistory) {

	let ret = -Infinity;
	for (let prereq of course.prereqs) {
		let preCourse = globals.courses.find(_course => _course.id == prereq);
		recalcAssignmentNS.assignCourse(preCourse, [...recursionHistory, course]);
		// if (preCourse.semester <= ret) {}
		ret = Math.max(ret, preCourse.semester + 1);
	}
	for (let coreq of course.coreqs) {
		let coCourse = globals.courses.find(_course => _course.id == coreq);
		recalcAssignmentNS.assignCourse(coCourse, [...recursionHistory, course]);
		ret = Math.max(ret, coCourse.semester);
	}
	return ret;
}



