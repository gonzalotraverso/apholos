(function($){
	"use strict";

	var Resizer = function(){
		this.$win = $(window);
		this.$adjustees = $(".adjust-height");
		console.log(this.$adjustees);
		this.init();
	};

	Resizer.prototype = {
		init: function(){
			this.wigleyRoom = 20;

			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			this.$win.on({
				orientationchange: function(){
					self.orientationHandler();
				},
				load: function(){
					self.orientationHandler();
				}
			});
		},
		resizeIt: function(){
			var self = this;
			var winHeight = this.$win.height();

			this.$adjustees.each(function(){
				var $elem = $(this);
				var maxH = self.getMaxHeight($elem);
				if(maxH > winHeight)
					$elem.height(maxH);
				else
					$elem.height(winHeight);
			});
		},
		getMaxHeight: function(elem){
			var content = elem.children(":first");
			var contentH = ( content.height() > elem.attr("max-height") ) ? (content.height() + this.wigleyRoom * 2) : elem.attr("max-height");
			return contentH;
		},
		orientationHandler: function(){
			switch(this.$win.orientation) 
		    {  
		      case -90:
		      case 90:
		        this.$adjustees.removeClass("adjust-height").addClass('landscape-height');
		        break; 
		      default:
		        this.$adjustees.removeClass("landscape-height").addClass('adjust-height');
		        this.resizeIt();
		        break; 
		    }
		}
	};


	$(document).ready(function(){
		var resizer = new Resizer();
	});

})(jQuery);
