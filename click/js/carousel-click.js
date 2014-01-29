/* Carousel */
(function() {

	var $onlineExtras = $('.carousel');
	if( !$onlineExtras.length ) {
		return;
	}

	var $onlineExtraItems = $onlineExtras.find('li'),
		onlineExtraItemsLength = $onlineExtraItems.length;
		startPoint = 0;
		endPoint = 3;
		slices = Math.ceil( (onlineExtraItemsLength/4) );
		currentSlice = 1;

	console.log( 'slices: ' + slices );
	console.log( 'startingSlice: ' + currentSlice );

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
		console.log( 'endpoint: ' + endPoint );
	
		startPoint = endPoint - 3;
		console.log( 'startpoint: ' + startPoint );
	
		for( var i=0; i < onlineExtraItemsLength; i++ ) {
			if( i >= startPoint && i <= endPoint ) {
				$onlineExtraItems.eq(i).css("display", "block");
			}
			else {
				$onlineExtraItems.eq(i).css("display", "none");
			}
		}
	}

	function init() {
	
		$('html').addClass('js').removeClass('no-js');
	
		if( slices > 1 ) {
			var $buttons = addControls();
			$onlineExtras.append( $buttons );
			for( var i=4; i < onlineExtraItemsLength; i++ ) {
				$onlineExtraItems.eq(i).css("display", "none");
			}
		}
	
	}

	init();
})();
