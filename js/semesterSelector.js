




var nsGlobal = nsGlobal || {};

// var nsSemesterSelector = nsSemesterSelector || {};

(function() {

	let selectedElement = null;
	nsGlobal.selectedSemester = null;

	nsGlobal.createSemesterSelector = function () {

		// for (const attr of nsGlobal.semesterAttr) {
		nsGlobal.semesterAttr.forEach((attr, semester) => {
			// console.log(attr, semester);
			
			$('<div/>', {
				'class': 'semester-selector',
				'data-sem': attr,
				
				
			}).click(function() {
				// console.log(this, $(this));
				// for (key in this) {console.log(key, this[key])}
				
				$(this).prop('selected', true);
				try {
					selectedElement.prop('selected', false);
				} catch {
					
				}
				nsGlobal.selectedSemester = semester; // TODO confirm semester is accessible and correct through the closure with the forEach function
				console.log(semester);
				selectedElement = $(this);
			}).appendTo('#semester-selector');
		});
		
	}



})();





