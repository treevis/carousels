/* Carousel */
$(document).ready(function() {
	var $content = $("#content");
	$content.addClass( 'fancy' );
	
	var tallestContentItem = 0;
	
	var $contentItems = $content.children("li");
	
	$contentItems.each(function() {
		var ind = $("#content li").index(this);
		var leftPos = 24 * ind;
		
		var height = $(this).height();
		if( height > tallestContentItem ) {
			tallestContentItem = height;
		}
		$(this).css({ position: "absolute", left: leftPos+"em" }).addClass("s"+ind);
	});
	
	$contentItems.css("height", tallestContentItem);
	
	// Navigation
	$("#content").before('<ul id="nav" class="clearfix"><li class="prev"><button type="button" name="previous">&laquo;<\/button><\/li><li class="next"><button type="button" name="next">&raquo;<\/button><\/li><\/ul>');
	
	var $previous = $("#nav li.prev button");
	var $next = $("#nav li.next button");
	
	$previous.click(function(evt) {
		evt.preventDefault();
		$contentItems.animate({"left": "+=24em"}, "slow");
	});
	$next.click(function(evt) {
		evt.preventDefault();
		$contentItems.animate({"left": "-=24em"}, "slow");
	});
	
});
