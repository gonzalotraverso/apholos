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
		this.$secLvl = this.$sections.find(".scroll-second-lvl");
		this.$navItems = $("#desktop-menu nav li");
		this.resizer = resizer;
		this.init();
	}

	ParallaxScrolling.prototype = {
		init: function(){
			if (this.resizer.$win.width() > 1024) {
				
				this.setUp();
				this.bindEvents();
			};
		},
		bindEvents: function(){
			var self = this;
			this.$win.on('mousewheel', function(event){
				self.moveLayers(event);
			});
		},
		setUp: function(){
			var self = this;
			this.winH = this.$win.height();
			this.$sections.css({top : this.winH});
			this.changeActive(this.$sections.first());
			this.$active.css({top : 0});

			this.$secLvl.addClass('sec-lvl-style').each(function(){
				var $sec = $(this).parents("section");
				var top = $sec.offset().top;
				if($sec.prev("section").length)
					$(this).css({top : (self.winH * 0.18) });
				else
					$(this).css({top : 0 });
			});


			this.acc = 5;
		},
		moveLayers: function(event){
			event.preventDefault();

			var top = this.$active.offset().top;
			var bottom = this.$active.height() + top;
			this.actHeight = this.$active.height();

			var $secLvlPrev = this.$active.prev("section").find(".scroll-second-lvl");
			if($secLvlPrev.length)
				var secTopPrev = parseInt($secLvlPrev.css("top"));


			var $sec = this.$active.find(".scroll-second-lvl");
			if($sec.length)
				var sec = parseInt($sec.css("top"));
			
			var speed = this.acc * event.deltaFactor;

			if(event.deltaY < 0){
				if(bottom <= this.winH && this.$active.next("section").length){
					this.changeActive(this.$active.next("section"));
				}else if(bottom > this.winH){
					var topn = (bottom - speed < this.winH) ? this.winH - this.actHeight : top - speed;
					this.$active.css({top : topn});
					$sec.css({top : sec - event.deltaFactor});
					$secLvlPrev.css({top : secTopPrev - event.deltaFactor});
				}
			}else{
				if(top >= this.winH && this.$active.prev("section").length){
					this.changeActive(this.$active.prev("section"));
				}else if(top < this.winH && this.$active.prev("section").length){
					var topn = (top + speed > this.winH) ? this.winH : top + speed;
					this.$active.css({top : topn});
					$sec.css({top : sec + event.deltaFactor});

					$secLvlPrev.css({top : secTopPrev + event.deltaFactor});
				}
			}
		},
		changeActive: function(section){
			this.$sections.removeClass('active-section');
			this.$active = section.addClass('active-section');
			this.$activeNav = this.$navItems.has("[data-target="+this.$active.attr("id")+"]");
			this.$navItems.removeClass('nav-selected');
			this.$activeNav.addClass('nav-selected');
		}
	}

	var Menu = function(pscroll){
		this.$container = $("header");
		this.$deskNav = this.$container.find("#desktop-menu");
		this.$menu = this.$deskNav.find("nav");
		this.$items = this.$menu.find("a");
		this.$pscroll = pscroll;
		this.$sections = pscroll.$sections;
		this.init(pscroll);
	};

	Menu.prototype = {
		init: function(p){
			this.speed = 800;

			this.setUp()
			this.bindEvents(p);
		},
		setUp: function(){
			this.$sections.each(function(i, v){
				$(this).attr("data-index", i);
			})
		},
		bindEvents: function(p){
			var self = this;
			this.$items.on('click', function(e){
				self.handleClick(e, p);
			});
		},
		handleClick: function(e, p){
			e.preventDefault();
			this.menuH = this.$container.height();
			var $target = this.$sections.siblings("#"+$(e.currentTarget).data("target"));
			var tIndex = $target.data("index");
			var activeIndex = p.$active.data("index");

			if($target.is(p.$active.prev())){
				p.$active.animate({top : p.winH}, this.speed, function(){
					$target.animate({top: this.menuH}, this.speed);
				});
				p.$active.find(".scroll-second-lvl").animate({top : (p.winH * 0.18) + this.menuH}, this.speed);
			}else{
				if(tIndex < activeIndex){

					$target.css({top : p.winH});
					p.$active.removeClass("active-section").addClass('prev-active');
					$target.addClass('active-section').animate({top : this.menuH}, this.speed, function(){
						p.$active.removeClass('prev-active');
						$target.nextAll("section").each(function(){
							$(this).css({top: p.winH});
						});
					});
					$target.nextAll("section").find(".scroll-second-lvl").animate({top: (p.winH * 0.18)}, this.speed);
					$target.prevAll("section").css({top: this.menuH}).find(".scroll-second-lvl").css({top: - (p.winH * 0.18) + this.menuH});
					
				}else{
					$target.animate({top: this.menuH}, this.speed, function(){
						$target.prevAll("section").each(function(){
							$(this).css({top: p.winH - $(this).height()});
						});
					});
					$target.prevAll("section").find('.scroll-second-lvl').animate({top: -(p.winH * 0.18)}, this.speed);
					$target.nextAll("section").css({top: p.winH}).find('.scroll-second-lvl').css({top: p.winH * 0.18});
					p.$active.removeClass('active-section').find('.scroll-second-lvl').animate({top: -(p.winH * 0.18) + this.menuH}, this.speed);
					$target.addClass('active-section');
				}
			}

			p.$active = $target;
			this.$items.parents("li").removeClass('nav-selected');
			$(e.currentTarget).parents("li").addClass('nav-selected');
			
		}
	};

	$(document).ready(function(){
		var resizer = new Resizer();
		var pscroll = new ParallaxScrolling(resizer);
		var menu = new Menu(pscroll);
	});

})(jQuery);
