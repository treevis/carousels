// Carousel, Click Version
(function($, undefined) {
	
	var $carousel = $('.carousel');
	if( !$carousel.length ) {
		return;
	}
	
	var $carouselItems = $carousel.find('li'),
		carouselItemsLength = $carouselItems.length,
		slices = carouselItemsLength,
		currentSlice = 1,
		tallestContentItem = 0;
	
	// Add Controls
	function addControls() {
		var $buttons = $('<div class="controls"><button type="button" class="next">&raquo;</button><button type="button" class="prev" disabled="disabled">&laquo;</button></div>');
		
		$buttons.find('button.next').click(function() {
			advanceItems($(this),'forward');
		});
	
		$buttons.find('button.prev').click(function() {
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
			$carouselItems.animate({"left": "-=16em"}, "slow");
		}
		else if( dir == 'backward' ) {
			currentSlice--;
			if( currentSlice < 1 ) {
				currentSlice = 1;
			}
			$carouselItems.animate({"left": "+=16em"}, "slow");
		}
	
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
	
	
	// Initialize carousel
	function init() {
		$('html').addClass('js');
		
		if( slices > 1 ) {
			var $buttons = addControls();
			$carousel.append( $buttons );

			// Prepare each carousel item, calculating the height of the tallest one
			$carouselItems.each(function(index) {
				var ind = index,
					leftPos = 16 * ind,
					height = $(this).height();
				
				if( height > tallestContentItem ) {
					tallestContentItem = height;
				}
				$(this).css({ left: leftPos+"em" }).addClass("s"+ind);
			});
	
			$carousel.find("ul").css("height", tallestContentItem);
		}
	}

	init();
})(jQuery);
