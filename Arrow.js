









class Arrow {
	constructor(arr) {
		[this.end, this.start, this.style, this.path/*, ...*/] = arr;
		// console.log(this.style);
		
		// if (arr[4]) {
		// 	this.
		// }
	}




	addToHTML(spec, courses) {
		this.endEl = courses.find(course => course.id == this.end).el;

		this.style.pos = this.style.pos || 0;
		const scale = 30;
		const arrowheadLength = 14;

		// from https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element by Chris Dolphin
		// Jquery does not support the SVG namespace, so we do this:
		let nsSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.svgEl = $(nsSvg).attr({
			'class': 'arrow',
			id: `svg-arrow-${this.end}-${this.start}`,
		}).css({
			'grid-area': this.endEl.css('grid-area'),
		}).appendTo(spec);




		// Initial conditions
		switch (this.style.type) {
			case 'pre':
				var vert = true;
				var x = (2 + this.style.pos) * scale;
				var y = -arrowheadLength;
				// this.path[0] += arrowheadLength / scale;
				break;
			case 'co-left':
				var vert = false;
				var x = -arrowheadLength;
				var y = (1 + this.style.pos) * scale;
				// this.path[0] += arrowheadLength / scale;
				break;
			case 'co-right':
				var vert = false;
				var x = 4*scale + arrowheadLength;
				var y = (1 + this.style.pos) * scale;
				// this.path[0] -= arrowheadLength / scale;
				break;
		}

		this.path[0] -= Math.sign(this.path[0]) * arrowheadLength / scale; // this.path[0] is guaranteed not to be a string
		
		

		let pathString = `M ${x} ${y}\n`;


		this.path.forEach((length, index) => {
			// In the following path[index +/- 1], out of bounds indices are ok because they return undefined, which when compared to 0 yields false
			if (typeof this.path[index+1] == 'string') {
				length -= Math.sign(length) * 0.1;
			}
			if (typeof this.path[index-1] == 'string') {
				length -= Math.sign(length) * 0.1;
			}
			if (typeof length == 'string') {
				pathString += `a 3 3 0 0 0 ${length == 'up' ? '0 -6' : length == 'left' ? '-6 0' : '6 0'}\n`;
			} else {
				pathString += `l ${vert ? `0 ${length*scale}` : `${length*scale} 0`}\n`;
			}

			vert = !vert;
		});



		let nsPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'); // Jquery does not support the SVG namespace, so we do this
		this.pathEl = $(nsPath).attr({
			'class': 'arrow ' + this.style.type,
			id: `arrow-${this.end}-${this.start}`,

			'd': pathString,
		}).appendTo(this.svgEl);
	}
}










