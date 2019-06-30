



// globals.semesters = Array.from(Array(9).keys()); // 0-8, where 0 means transfer



// user assignment, display, credits
// chronology

const semesterAttr = ['transfer', '1', '2', '3', '4', '5', '6', '7', '8', 'double-count'];
globals.semesterCredits = Array(semesterAttr.length).fill(0);
const doubleCountAttrVal = semesterAttr.length - 1;

globals.range = {min: 15, max: 17};

onLoad( function() { for (let course of globals.courses) { course.constrained = false; }});

function recalcAssignment() {

	// let semesters = Array.from(Array(9).keys()); // 0-8, where 0 means transfer

	recalcAssignment.resetAssignment();

	for (let course of globals.courses) {


		// if (course.assigned || course.constrained) {
		// 	// This course's credits should already be included in the semester count
		// 	continue;
		// }
		recalcAssignment.assignCourse(course, []);
	}
}

onLoad(recalcAssignment);

recalcAssignment.resetAssignment = function() {
	for (let course of globals.courses) {
		if (course.constrained) {
			course.assigned = true;
		} else {
			course.assigned = false;
		}
	}
}

recalcAssignment.assignCourse = function(course, recursionHistory) {
	if (recursionHistory.includes(course)) {
		return;
	}
	if (course.assigned || course.constrained) {
		// This course's credits should already be included in the semester count
		return;
	}
	for (let semester = 1; semester < 9; semester++) { // From 1 to 8, so not including transfer or double-count
	// globals.semesters.forEach((semester, semCredits) => {
		if (globals.semesterCredits[semester] + course.credits <= globals.range.max) { // if there is room for credits in this semester
			// if (recalcAssignment.prereqsMet(course, semester)) { // if all pre- and co- req are met
			if (recalcAssignment.minSemesterForPrereqs(course, recursionHistory) <= semester) { // if all pre- and co- req are met
				course.semester = semester;
				course.assigned = true;
				globals.semesterCredits[semester] += course.credits;
				break;
			}
		}
	}
	if (course.assigned) {
		course.el.attr('data-sem', semesterAttr[course.semester]);
	} else {
		// TODO: error, could not fit course into schedule
	}
}

recalcAssignment.minSemesterForPrereqs = function(course, recursionHistory) {

	let ret = -Infinity;
	for (let prereq of course.prereqs) {
		let preCourse = globals.courses.find(_course => _course.id == prereq);
		recalcAssignment.assignCourse(preCourse, [...recursionHistory, course]);
		// if (preCourse.semester <= ret) {}
		ret = Math.max(ret, preCourse.semester + 1);
	}
	for (let coreq of course.coreqs) {
		let coCourse = globals.courses.find(_course => _course.id == coreq);
		recalcAssignment.assignCourse(coCourse, [...recursionHistory, course]);
		ret = Math.max(ret, coCourse.semester);
	}
	return ret;
}



