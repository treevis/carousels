// Carousel, Click Version
(function($, undefined) {

	var $carousel = $('.carousel');
	if( !$carousel.length ) {
		return;
	}
	
	var $carouselItem = $carousel.find('li'),
		carouselItemLength = $carouselItem.length,
		startPoint = 0,
		endPoint = 3,
		slices = Math.ceil( (carouselItemLength/4) ),
		currentSlice = 1;

	// console.log( 'slices: ' + slices );
	// console.log( 'startingSlice: ' + currentSlice );

	function addControls() {
		var $buttons = $('<div class="controls"><button type="button" class="next">Next</button><button type="button" class="prev" disabled="disabled">Previous</button></div>');
		$buttons.find('button.next').click(function() {
			// go forward
			advanceItems($(this),'forward');
		});
	
		$buttons.find('button.prev').click(function() {
			// go backward
			advanceItems($(this),'backward');
		});
		return $buttons;
	}

	function advanceItems(btn, dir) {
		if( dir == 'forward' ) {
			currentSlice++;
			if( currentSlice > slices ) {
				currentSlice = slices;
			}
		}
		else if( dir == 'backward' ) {
			currentSlice--;
			if( currentSlice < 1 ) {
				currentSlice = 1;
			}
		}
		updateItems();
	
		if( currentSlice == slices ) { // disable/hide next
			$('button.next').attr('disabled','disabled');
			$('button.prev').removeAttr('disabled','disabled');
		}
		else if( currentSlice == 1 ) { // disable/hide previous
			$('button.prev').attr('disabled','disabled');
			$('button.next').removeAttr('disabled','disabled');
		}
		else { // show both
			$('button.next').removeAttr('disabled','disabled');
			$('button.prev').removeAttr('disabled','disabled');
		}
	}

	function updateItems() {
		endPoint = (currentSlice * 4) - 1;
		// console.log( 'endpoint: ' + endPoint );
	
		startPoint = endPoint - 3;
		// console.log( 'startpoint: ' + startPoint );
	
		for( var i=0; i < carouselItemLength; i++ ) {
			if( i >= startPoint && i <= endPoint ) {
				$carouselItem.eq(i).removeClass('invisible').addClass('visible');
			}
			else {
				$carouselItem.eq(i).removeClass('visible').addClass('invisible');
			}
		}
	}

	function init() {
		$('html').addClass('js');
		
		if( slices > 1 ) {
			var $buttons = addControls();
			$carousel.append( $buttons );
			for( var i=4; i < carouselItemLength; i++ ) {
				$carouselItem.eq(i).removeClass('visible').addClass('invisible');
			}
		}
	}

	init();
})(jQuery);
