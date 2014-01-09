(function($){
	"use strict";
	

	var Resizer = function(){
		this.$win = $(window);
		this.$adjustees = $(".adjust-height");
		this.init();
	};

	Resizer.prototype = {
		init: function(){
			this.wigleyRoom = 20;
			this.winW = this.$win.width();

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
				},
				resize: function(){
					self.winW = self.$win.width();
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
			var $content = elem.children();
			var contentH = 0;
			$content.each(function(){
				contentH += $(this).height();
			});
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


	var ParallaxScrolling = function(resizer){
		this.$win = resizer.$win;
		this.$sections = $('section');
		this.resizer = resizer;
		this.init();
	}

	ParallaxScrolling.prototype = {
		init: function(){
			this.winH = this.$win.height();
			this.$sections.css({top : this.winH});
			this.$active = this.$sections.siblings('.section-1');
			this.$active.css({top : 0});

			this.acc = 5;

			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			this.$win.on('mousewheel', function(event){
				self.moveLayers(event);
			});
		},
		moveLayers: function(event){
			if (this.resizer.$win.width() > 768) {
				event.preventDefault();

				var top = this.$active.offset().top;
				var bottom = this.$active.height() + top;
				this.actHeight = this.$active.height();

				var speed = this.acc * event.deltaFactor;

				if(event.deltaY < 0){
					if(bottom <= this.winH && this.$active.next("section").length){
						this.$active = this.$active.next("section");
					}else if(bottom > this.winH){
						var topn = (bottom - speed < this.winH) ? this.winH - this.actHeight : top - speed;
						this.$active.css({top : topn});
					}
				}else{
					if(top >= this.winH && this.$active.prev("section").length){
						this.$active = this.$active.prev("section");
					}else if(top < this.winH && this.$active.prev("section").length){
						var topn = (top + speed > this.winH) ? this.winH : top + speed;
						this.$active.css({top : topn});
					}
				}
			};
		}
	}

	$(document).ready(function(){
		var resizer = new Resizer();
		var pscroll = new ParallaxScrolling(resizer);
	});

})(jQuery);
