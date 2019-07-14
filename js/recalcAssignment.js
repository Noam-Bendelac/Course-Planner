



// nsGlobal.semesters = Array.from(Array(9).keys()); // 0-8, where 0 means transfer



// user assignment, display, credits
// chronology

var nsGlobal = nsGlobal || {};

// var nsRecalcAssignment = nsRecalcAssignment || {};

(function() {

	nsGlobal.semesterAttr = ['transfer', '1', '2', '3', '4', '5', '6', '7', '8', 'double-count'];
	nsGlobal.semesterCredits = Array(nsGlobal.semesterAttr.length).fill(0);
	let doubleCountAttr = nsGlobal.semesterAttr.length - 1;

	nsGlobal.creditsRange = {min: 15, max: 17};

	nsGlobal.recalcAssignment = function() {

		resetAssignment();

		for (let course of nsGlobal.courses) {
		// nsGlobal.courses.forEach((course, index) => {
			assignCourse(course, []);
		// });
		}
	}

	// onLoad(recalcAssignment);

	let resetAssignment = function() {
		nsGlobal.semesterCredits.fill(0);
		for (let course of nsGlobal.courses) {
			if (course.constrained) {
				course.assigned = true;
				nsGlobal.semesterCredits[course.semester] += course.credits;
			} else {
				course.assigned = false;
			}
		}
	}

	let assignCourse = function(course, recursionHistory) {
		if (recursionHistory.includes(course)) {
			return; // TODO what to do?
		}
		if (!course.assigned) {
			// This course's credits should already be included in the semester count if already assigned
			for (let semester = 1; semester < 9; semester++) { // From 1 to 8, so not including transfer or double-count
				// if (neighborsSemester(course)-1 <= semester) {
					if (nsGlobal.semesterCredits[semester] + course.credits <= nsGlobal.creditsRange.max) { // if there is room for credits in this semester
						// if (recalcAssignment.prereqsMet(course, semester)) { // if all pre- and co- req are met
						if (minSemesterForPrereqs(course, recursionHistory) <= semester) { // if all pre- and co- req are met
							course.semester = semester;
							course.assigned = true;
							nsGlobal.semesterCredits[semester] += course.credits;
							break;
						}
					}
				// }
			}
		}
		if (course.assigned) {
			course.el.attr('data-sem', nsGlobal.semesterAttr[course.semester]);
		} else {
			// TODO: error, could not fit course into schedule
		}
	}

	let minSemesterForPrereqs = function(course, recursionHistory) {

		let ret = -Infinity;
		for (let prereq of course.prereqs) {
			let preCourse = nsGlobal.courses.find(_course => _course.id == prereq);
			assignCourse(preCourse, [...recursionHistory, course]);
			// if (preCourse.semester <= ret) {}
			ret = Math.max(ret, preCourse.semester + 1);
		}
		for (let coreq of course.coreqs) {
			let coCourse = nsGlobal.courses.find(_course => _course.id == coreq);
			assignCourse(coCourse, [...recursionHistory, course]);
			ret = Math.max(ret, coCourse.semester);
		}
		return ret;
	}

	// let neighborsSemester = function(course) {

	// 	for (const iterator of object) {
			
	// 	}
	// }

})();

