
(function($) {
	$.fn.swipe = function(options) {
		
		// Default thresholds & swipe functions
		var defaults = {
			threshold: {xLeft:10, xRight:40, y:100},
			swipeLeft: function() { alert('left');}, 
			swipeRight: function() { alert('right');}
		};
		
		var options = $.extend(defaults, options);
		
		if (!this) return false;
		
		return this.each(function() {
			
			//var me = $(this)
			// Private variables for each element
			var moved=false;
			var originalCoord = { x: 0, y: 0 }
			var finalCoord = { x: 0, y: 0 }
			var vScrollSelector='.vScrollDetails';
			var summaryScrollDiv;
			var startScrollTop=0;
				
			// Swipe was started
			function touchStart(event) {
				moved=false;
				scrollMoved=false;
				ALLOW_ACTION_ON_SWIPE_END=true;
				originalCoord.x = event.targetTouches[0].pageX
				originalCoord.y = event.targetTouches[0].pageY

				finalCoord.x = originalCoord.x
				finalCoord.y = originalCoord.y
				summaryScrollDiv=$("#xdetail"+nowView['xdetail']).find(vScrollSelector);
				startScrollTop=summaryScrollDiv.scrollTop();
			}
			// Store coordinates as finger is swiping
			function touchMove(event) {
			    event.preventDefault();  // I removed when I wanted to enable native scrolling.
				finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
				finalCoord.y = event.targetTouches[0].pageY
				//$('#nowX').html('MOVE: '+finalCoord.x);
				
				// I will use Y motion to move the position of a subordinate div.
				if (summaryScrollDiv) {
					var dy=finalCoord.y-originalCoord.y
					if (Math.abs(dy)>10) {scrollMoved=true; ALLOW_ACTION_ON_SWIPE_END=false;}
					summaryScrollDiv.scrollTop(startScrollTop-dy);
				}
				
				if (!moved) {
					var changeY = originalCoord.y - finalCoord.y
					if(changeY < options.threshold.y && changeY > (options.threshold.y*-1)) {
						changeX = originalCoord.x - finalCoord.x
						
						if(changeX > options.threshold.xLeft) {
							moved=true; ALLOW_ACTION_ON_SWIPE_END=false;
							options.swipeLeft()
						}
						if(changeX < (options.threshold.xRight*-1)) {
							moved=true; ALLOW_ACTION_ON_SWIPE_END=false;
							options.swipeRight()
						}
					}
				}
			}
			
			// Done Swiping
			// Swipe should only be on X axis, ignore if swipe on Y axis
			// Calculate if the swipe was left or right
			function touchEnd(event) {ALLOW_ACTION_ON_SWIPE_END=true;} // last touch end event sets to allow clicks.
			
			// Swipe was canceled
			function touchCancel(event) { }
			
			// Add gestures to all swipable areas
			this.addEventListener("touchstart", touchStart, false);
			this.addEventListener("touchmove", touchMove, false);
			this.addEventListener("touchend", touchEnd, false);
			this.addEventListener("touchcancel", touchCancel, false);
				
		});
	};
})(jQuery);
