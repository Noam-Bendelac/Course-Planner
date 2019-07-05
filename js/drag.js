

function centerAndScale() {
	// console.log(this);
	scale = Math.min(
		($('#canvas').height() - 2*25) / $('#page').height(), // I believe returns height before transform scaling
		($('#canvas').width() - 2*25) / $('#page').width()
	);

	$('#page-fit-container').css({
		'top': ($('#canvas').height() - $('#page').height()/**scale*/) / 2,
		'left': ($('#canvas').width() - $('#page').width()/**scale*/) / 2,

		'transform': `scale(${scale})`,
	});
}

$(window).resize(centerAndScale);
// onLoad(centerAndScale);



/**/




// Handles click and drag for moving the page within the canvas

function drag() {

	var curDownYPos = 0;
	var curDownXPos = 0;
	var curDown = false;

	
	$(document).mousemove(function (event) {
		// console.log('move');

		if (curDown === true) {
			let parentTransform = $('#page').parent().css('transform');
			let parentScale = parseFloat(parentTransform.replace(/[^0-9\-.,]/g, '').split(',')[0]);

			$('#page').css({
				'top': (parseInt($('#page').css('top')) + (event.pageY - curDownYPos)),
				'left': (parseInt($('#page').css('left')) + (event.pageX - curDownXPos)),
			});

			curDownYPos = event.pageY; curDownXPos = event.pageX;
		}
	});

	$('#canvas').mousedown(function (e) { curDown = true; curDownYPos = e.pageY; curDownXPos = e.pageX; e.preventDefault(); });
	$(document).mouseup(function (e) { curDown = false; });
	$(document).mouseleave(function (e) { curDown = false; });
	
}

// $(drag);
// onLoad(drag);





/*

$('#canvas').on('wheel', function(event) {
	
	let deltaZoomRatio = Math.exp(event.originalEvent.deltaY / 120);// /parseFloat($('#page-fit-container').css('transform').replace(/[^0-9\-.,]/g, '').split(',')[0]);

	var position = $('#page').position();
	var offset = $('#page').offset();

	let previousTransform = $('#page').css('transform');
	//let previousTransform = $('#page-fit-container').css('transform');
	let previousScale = parseFloat(previousTransform.replace(/[^0-9\-.,]/g, '').split(',')[0]); // 'matrix(1,0,0,1,0,0)' to 1
	let nextScale = Math.max(Math.min(previousScale*deltaZoomRatio, 12.0), 0.1);

	let effectiveDeltaZoomRatio = nextScale/previousScale;// *parseFloat($('#page-fit-container').css('transform').replace(/[^0-9\-.,]/g, '').split(',')[0]);

	let parentTransform = $('#page').parent().css('transform');
	let parentScale = parseFloat(parentTransform.replace(/[^0-9\-.,]/g, '').split(',')[0]);
	//console.log(parentScale);
	
	// console.log(position, offset, event.originalEvent);
	
	// console.log(parentScale, (event.originalEvent.x - offset.left)/parentScale);

	// console.log($('#page').css('top'),position.top);
	
	

	$('#page').css({
	//$('#page-fit-container').css({
		'transform': `scale(${nextScale})`,
		'top': ( position.top + (1-effectiveDeltaZoomRatio)*(event.originalEvent.y - offset.top) ) / parentScale,
		'left': ( position.left + (1-effectiveDeltaZoomRatio)*(event.originalEvent.x - offset.left) ) / parentScale,
	});
});

*/

