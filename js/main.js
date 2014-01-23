(function($){
	"use strict";
	

	var Resizer = function(){
		this.$win = $(window);
		this.$adjustees = $(".adjust-height");
		this.$mobileLogo = $("#mobile-logo");
		this.$sections = $("section");
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
			this.$sections.each(function() {
				$(this).css({"min-height": winHeight});
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
			var bottom = this.$active.innerHeight() + top;
			this.actHeight = this.$active.innerHeight();

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
					//if(this.$active.offset().top > 0 && this.$active.offset().top < this.winH){
						$sec.css({top : sec + event.deltaFactor});
						$secLvlPrev.css({top : secTopPrev + event.deltaFactor});
					//}
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
			var self = this;
			this.menuH = this.$container.height();
			var $target = this.$sections.siblings("#"+$(e.currentTarget).data("target"));
			var tIndex = $target.data("index");
			var activeIndex = p.$active.data("index");

			if($target.is(p.$active.prev()) && p.$active.offset().top > this.menuH){
				p.$active.animate({top : p.winH}, this.speed, function(){
					$target.animate({top: self.menuH}, self.speed);
				});
				p.$active.find(".scroll-second-lvl").animate({top : (p.winH * 0.18) - this.menuH}, this.speed);
			}else{
				if(tIndex < activeIndex){

					$target.css({top : p.winH});
					p.$active.removeClass("active-section").addClass('prev-active').find('.scroll-second-lvl').animate({top: -(p.winH * 0.18) + this.menuH}, this.speed);
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
					p.$active.removeClass('active-section').find('.scroll-second-lvl');
					$target.addClass('active-section');
				}
			}

			p.$active = $target;
			this.$items.parents("li").removeClass('nav-selected');
			$(e.currentTarget).parents("li").addClass('nav-selected');
			
		}
	};


	var MobileMenu = function(p){
		this.$bod = $("body");
		this.$header = $("header");
		this.$container = this.$header.find("#mobile-menu");
		this.$menu = this.$container.find("#bt-menu");
		this.$trigger = this.$menu.find(".bt-menu-trigger");
		this.$overlay = this.$menu.find(".bt-overlay");
		this.$items = this.$menu.find(".mobile-main-menu li a");
		this.$sections = p.$sections;
		this.init();
	}

	MobileMenu.prototype = {
		init: function(){
			this.eventType = this.mobilecheck() ? 'touchstart' : 'click';
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			this.$trigger.on(this.eventType , function(e){
				self.toggleMenu(e);
			});
			this.$overlay.on(this.eventType, function(e){
				self.toggleMenu(e);
			});
			this.$items.on(this.eventType, function(e){
				self.scrollMenu(e);
			});
		},
		mobilecheck: function(){
			var check = false;
	        (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	        return check;
		},
		toggleMenu: function(e){
			e.stopPropagation();
            e.preventDefault();
            var self = this;
            if(this.$menu.hasClass('bt-menu-open')){
            	this.$menu.removeClass('bt-menu-open').addClass('bt-menu-close');
            	this.$menu.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            		self.$header.height(50);
            	});
            }else{
        		this.$header.height("100%");
            	this.$menu.removeClass('bt-menu-close').addClass('bt-menu-open');
            }
		},
		scrollMenu: function(e){
			e.preventDefault();
			var $target = this.$sections.siblings("#" + $(e.currentTarget).data("target"));
			var top = $target.offset().top;
			this.$bod.scrollTo(top - 50, 800);
			this.toggleMenu(e);
		}
	};



	var Portfolio = function(resizer){
		this.$button = $(".load-more");
		this.$gallery = $("#grid");
		this.$items = this.$gallery.find('li');
		this.$img = this.$items.find("a");
		this.$last = this.$items.last();
		this.$resizer = resizer;
		this.init();
	};

	Portfolio.prototype = {
		init: function(){
			this.loadMore();
			$('#products').css('height', 'auto');
			this.$img.fancybox();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			this.$button.on('click', function(e){
				e.preventDefault();
				self.loadMore();
			});
			this.$gallery.mixitup({
				filterSelector: ".filter"
			});
		},
		loadMore: function(){
			var self = this;

			var last = this.$gallery.find('li').length - 1;
			var lim = 11;
			switch(true){
				case this.$resizer.winW >= 960:
					lim = 11;
					break;
				case this.$resizer.winW >= 720:
					lim = 8;
					break;
				case this.$resizer.winW >= 480:
					lim = 5;
					break;
				case this.$resizer.winW >= 240:
					lim = 2;
					break;
				
			}
			$.ajax({
				url: 'loadMore.php',
				type: 'POST',
				dataType: 'json',
				data: {index: last, limit: lim},
			})
			.done(function(data) {
				$.each(data, function(index, val) {
					self.createItem(val);
				});
				self.$gallery.mixitup('remix', "all");
			})
			.fail(function(xhr, textStatus, errorThrown) {
              	console.log(xhr.responseText);
          	});
			
		},
		createItem: function(item){
			var li = document.createElement("li");
            this.$last.before(li);
            var $li = this.$last.prev();
			$li.addClass('mix display-ib '+item.categories)
				.append('<a href="img/portfolio/images/'+item.image+'"><img src="img/portfolio/thumbs/'+item.thumb+'"><p class="upper">'+item.caption+'</p></a>');
            


		}
	};


	var ProdsGallery = function(){
		this.$container = $(".tech-gallery");
		this.$gallery = this.$container.find("#tech-gallery-container");
		this.$slides = this.$gallery.find("li");
		this.$btnContainer = this.$container.find(".tech-gallery-bttns");
		this.$prev = this.$btnContainer.find('#tech-gallery-prev');
		this.$next = this.$btnContainer.find('#tech-gallery-next');
		this.$pager = this.$container.find("#tech-gallery-thumbs");
		this.$caption = this.$btnContainer.find('p');
		this.init();
	};

	ProdsGallery.prototype = {
		init: function(){
			var self = this;
			this.slider = this.$gallery.bxSlider({
				controls: false,
				pagerCustom: self.$pager,
				onSlideAfter: function($slideElement, oldIndex, newIndex){
					self.changeSlide($slideElement);
				},
				onSlideBefore: function(){
					self.$caption.css({opacity: 0});
				}
			})
			this.bindEvents()
		},
		bindEvents: function(){
			var self = this;
			this.$prev.on('click', function(){
				self.slider.goToPrevSlide();
			});
			this.$next.on('click', function(){
				self.slider.goToNextSlide();
			});
			
		},
		changeSlide: function(e){
			this.$caption.html(e.data("caption")).css({opacity: 1});

		}
	};





	var WorldMap = function(){
		this.$bod = $('body');
		this.$map = this.$bod.find("#world-map");
		this.$markers = this.$map.find("li");
		this.$clickHandlers = this.$markers.find('.wm-click-handler');
		this.$popup = this.$map.find("#wm-popup");
		this.$location = this.$popup.find('#wm-loc');
		this.$mail = this.$popup.find('#wm-mail');
		this.$active = this.$markers.siblings('.wm-active');
		this.init();
	};

	WorldMap.prototype = {
		init: function(){
			this.mapHeight = this.$map.height();

			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			this.$clickHandlers.on('click', function(e){
				self.togglePopup(e);
			});
			this.$bod.on('click', function(){
				self.closePopup();
			});
		},
		togglePopup: function(e){
			var self = this;
			var elem = $(e.currentTarget).parent();
			if(!elem.hasClass('wm-active')){
	 			if (this.$active.length >0){
		 			this.$popup.fadeOut(400, function() {
		 				this.changePopup(elem, elem.data("location"), elem.data("mail"));
		 			});
	 			}else{
	 				this.changePopup(elem, elem.data("location"), elem.data("mail"));
	 			}
	 			this.$active.removeClass('wm-active');
	 			this.$active = elem.addClass('wm-active');
			}

		},
		changePopup: function(e, loc, mail){
 			var coordY = this.mapHeight - parseInt(e.css("top"));
			this.$location.html(loc);
			this.$mail.html(mail);
 			var coordX = parseInt(e.css("left")) - (this.$popup.width()/2);
			var popupW = this.$popup.width();
			this.$popup.css({
				bottom: coordY,
				left: coordX,
				opacity: 1
			});
		},
		closePopup: function(){
			this.$popup.fadeOut(400, function() {
				
			});
		}
	}


	$(document).ready(function(){
		var resizer = new Resizer();
		var pscroll = new ParallaxScrolling(resizer);
		var menu = new Menu(pscroll);
		var mobMenu = new MobileMenu(pscroll);
		var portfolio = new Portfolio(resizer);
		var products = new ProdsGallery();
		var wm = new WorldMap();
	});

})(jQuery);
