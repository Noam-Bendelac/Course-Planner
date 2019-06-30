







class Dot {
	constructor(arr) {
		[this.refID, this.x, this.y] = arr;
	}

	addToHTML(spec, arrows) {
		this.svgEl = arrows.find(arrow => arrow.end == this.refID).svgEl;

		const scale = 30;

		let nsCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // Jquery does not support the SVG namespace, so we do this
		this.circleEl = $(nsCircle).attr({
			'class': 'dot',
			id: `dot-${this.refID}-${this.x}-${this.y}`,

			'cx': (2 + this.x)*scale,
			'cy': this.y*scale,
			'r': 2.5, // SVG 2 is not supported, so r cannot be a css property
		}).appendTo(this.svgEl);
	}
}






