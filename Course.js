



class Course {

	constructor(arr) {
		[this.id, this.name, this.row, this.col, this.credits, this.prereqs, this.coreqs] = arr;
	}

	addToHTML(spec) {
		this.el = $('<div/>', {
			// 'class': `course sem-${this.row+1}`, // HTML property
			'class': 'course',
			id: `course-${this.id}`, // HTML property
			//'data-sem': `${this.row+1}`,
			css: { // Not an HTML property, rather a jQuery instance method; be careful when doing this with HTML properties that are also $ instance methods, like size (which would call the method, not set the property)
				'grid-area': `${this.row+1} / ${this.col+1} / span 1 / span 1`,
			},
		}).appendTo(spec);

		$('<p/>', {
			'class': 'course-name',
			text: this.name
		}).appendTo(this.el);
		$('<p/>', {
			'class': 'course-credits',
			text: this.credits
		}).appendTo(this.el);
		// .css('grid-row', (this.row+1) + ' / ' + (this.row+1))
		// 	.css('grid-column', (this.col+1) + ' / ' + (this.col+1));
	}
}



