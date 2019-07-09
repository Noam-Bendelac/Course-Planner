



// nsGlobal.semesters = Array.from(Array(9).keys()); // 0-8, where 0 means transfer



// user assignment, display, credits
// chronology

var nsGlobal = nsGlobal || {};

var nsRecalcAssignment = nsRecalcAssignment || {};

nsRecalcAssignment.semesterAttr = ['transfer', '1', '2', '3', '4', '5', '6', '7', '8', 'double-count'];
nsGlobal.semesterCredits = Array(nsRecalcAssignment.semesterAttr.length).fill(0);
nsRecalcAssignment.doubleCountAttr = nsRecalcAssignment.semesterAttr.length - 1;

nsGlobal.creditsRange = {min: 15, max: 17};

nsGlobal.recalcAssignment = function() {

	// let semesters = Array.from(Array(9).keys()); // 0-8, where 0 means transfer

	nsRecalcAssignment.resetAssignment();

	for (let course of nsGlobal.courses) {


		// if (course.assigned || course.constrained) {
		// 	// This course's credits should already be included in the semester count
		// 	continue;
		// }
		nsRecalcAssignment.assignCourse(course, []);
	}
}

// onLoad(recalcAssignment);

nsRecalcAssignment.resetAssignment = function() {
	for (let course of nsGlobal.courses) {
		if (course.constrained) {
			course.assigned = true;
		} else {
			course.assigned = false;
		}
	}
}

nsRecalcAssignment.assignCourse = function(course, recursionHistory) {
	if (recursionHistory.includes(course)) {
		return;
	}
	if (course.assigned || course.constrained) {
		// This course's credits should already be included in the semester count
		return;
	}
	for (let semester = 1; semester < 9; semester++) { // From 1 to 8, so not including transfer or double-count
	// nsGlobal.semesters.forEach((semester, semCredits) => {
		if (nsGlobal.semesterCredits[semester] + course.credits <= nsGlobal.creditsRange.max) { // if there is room for credits in this semester
			// if (recalcAssignment.prereqsMet(course, semester)) { // if all pre- and co- req are met
			if (nsRecalcAssignment.minSemesterForPrereqs(course, recursionHistory) <= semester) { // if all pre- and co- req are met
				course.semester = semester;
				course.assigned = true;
				nsGlobal.semesterCredits[semester] += course.credits;
				break;
			}
		}
	}
	if (course.assigned) {
		course.el.attr('data-sem', nsRecalcAssignment.semesterAttr[course.semester]);
	} else {
		// TODO: error, could not fit course into schedule
	}
}

nsRecalcAssignment.minSemesterForPrereqs = function(course, recursionHistory) {

	let ret = -Infinity;
	for (let prereq of course.prereqs) {
		let preCourse = nsGlobal.courses.find(_course => _course.id == prereq);
		nsRecalcAssignment.assignCourse(preCourse, [...recursionHistory, course]);
		// if (preCourse.semester <= ret) {}
		ret = Math.max(ret, preCourse.semester + 1);
	}
	for (let coreq of course.coreqs) {
		let coCourse = nsGlobal.courses.find(_course => _course.id == coreq);
		nsRecalcAssignment.assignCourse(coCourse, [...recursionHistory, course]);
		ret = Math.max(ret, coCourse.semester);
	}
	return ret;
}



