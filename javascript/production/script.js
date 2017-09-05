//dom elements

/*var $pageTitle = document.querySelector('head title'),
	$testimonals = document.querySelectorAll('.testimonals'),
	$testimonyQuotes = document.querySelectorAll('.entry'),
	$testimonyImages = document.querySelectorAll('.carousel-image .thumbnail'),
	$prevController = document.querySelector('.prev'),
	$nextController = document.querySelector('.next'),
	$modalOverlay = document.querySelector('.modal-overlay'),
	$modalWindow = document.querySelectorAll('.modal-content'),
	$largePlayBtn = document.querySelector('.play-btn-lrg')*/
var $testimonals = document.querySelectorAll('[data-carousel="testimonal"]');

function removeClassFromNodeList(nodeList, className){
  if(typeof className === "object") {
    nodeList.forEach(function(element){
      for(var index = 0; index < className.length; index++) {
        element.classList.remove(className[index]);
      }
    });
  } else {
    nodeList.forEach(function(element){
      element.classList.remove(className);
    });
  }
}

(function() {

	//initialises all functions that need to be called
	function init(){

		// var pageTransition = new PageTransition(document.querySelectorAll('[data-page-transition]'));
		var testimonialWidget = new Carousel({
			nextController: document.querySelector('.next'),
			prevController: document.querySelector('.prev'),
			slides: document.querySelectorAll('.testimonals-entry'),
      progressTabs: document.querySelectorAll('.testimonals-progress-tabs .tab')
		});
		// var navMenu = new NavigationMenu({
		// 	menu: document.querySelector('[data-role="nav-menu"]'),
		// 	menuTrigger: document.querySelector('[data-role="open-menu"]'),
		// 	body: document.querySelector('body'),
		// 	navLinks: document.querySelectorAll('.nav-modal [data-role="nav-menu-links"]')
		// });
	}

	window.onload = function() {
		init();
	};

}());

function Carousel(options) {
  var defaults = {
    autoplay: true,
    delay: 6000
  };
  this.options = Object.assign(options, defaults);
  this.counter = 0;
  this.previousSlideCounter = this.options.slides.length - 1;
  this.isAnimating = false;
  this.init();
}

Carousel.prototype = {
  init: function(){
      this.addEvents();
      this.move();

      // if(this.options.autoplay) {
      //   setInterval(function(){
      //     this.move(1);
      //   }.bind(this), this.options.delay)
      // }
  },
  addEvents: function(){
    if(this.options.nextController) {
        this.options.nextController.onclick = function(){
            if(!this.isAnimating) this.move(1);
        }.bind(this);
    }

    if(this.options.prevController) {
        this.options.prevController.onclick = function() {
            if(!this.isAnimating) this.move(-1);
        }.bind(this);
    }

    if(this.options.progressTabs) {
      var _this = this;
      this.options.progressTabs.forEach(function(element, index) {
        element.onclick = function(){
          _this.moveViaLink(index);
        }
      });
    }
  },
  moveViaLink: function(index) {
    var slides = this.options.slides;
    this.counter = index;
    this.animateSlides(slides[index], slides[this.previousSlideCounter]);
      ///var targetSlide = this.options.slides[index];
      // this.animateSlideOut(this.currentSlide);
      // this.animateSlideIn(targetSlide);
  },
  move: function(direction) {
    var slides = this.options.slides,
        slidesMaxLength = slides.length - 1;

    if (!direction) direction = 0;

    this.counter += direction;
    this.previousSlideCounter += direction;

    if (this.counter > slidesMaxLength || this.counter < 0) {
      this.counter = (direction == 1) ? 0 : slidesMaxLength;
    }

    if (this.previousSlideCounter > slidesMaxLength || this.previousSlideCounter < 0) {
      this.previousSlideCounter = (direction == 1) ? 0 : slidesMaxLength;
    }

    this.animateSlides(slides[this.counter], slides[this.previousSlideCounter]);
  },
  animateSlides: function(slideIn, slideOut) {
    this.isAnimating = true;
    removeClassFromNodeList(this.options.slides, ['previous-slide', 'active-slide']);
    slideOut.classList.add('previous-slide');
    slideIn.classList.add('active-slide');
    this.updateProgressTab();

    slideIn.addEventListener('webkitTransitionEnd', function(){
      this.isAnimating = false;
    }.bind(this));
  },
  updateProgressTab: function(){
    removeClassFromNodeList(this.options.progressTabs, 'active');
    this.options.progressTabs[this.counter].classList.add('active');
  }
};

/*
var modalOpen = false, player;
function triggerModal(event) {
    if(!modalOpen) {
        var modalName = (event.target.getAttribute('data-trigger-modal')) ?
                event.target.getAttribute('data-trigger-modal') : event.target.parentNode.getAttribute('data-trigger-modal'),
            $modal = document.querySelectorAll('[data-modal-name="' +  modalName + '"]');

        $modalOverlay.classList.add('visible');
        $modal[0].classList.add('open');
        modalOpen = true;
    } else {
        $modalOverlay.classList.remove('visible');
        $modalWindow.forEach(function($elem) {
            $elem.classList.remove('open');
        });
        modalOpen = false;
    }
}*/

function NavigationMenu(options){
    this.options = options;
    this.init();
}

NavigationMenu.prototype = {
  init: function(){
      this.addEvents();
  },
  addEvents: function(){
      this.options.menuTrigger.onclick = this.toggleMenu.bind(this);
  },
  toggleMenu: function(){
      this.options.menu.classList.toggle('menu-open');
      this.options.menuTrigger.classList.toggle('menu-open');
      this.options.body.classList.toggle('menu-open');
      this.animateNavLinks();
  },
  animateNavLinks: function(){
   var delay;
   this.options.navLinks.forEach(function(link, index){
       delay = 80 * index;
       setTimeout(function(){
           link.classList.toggle('appear');
       }, delay);
   });
  }
};
//module for page transitions
function PageTransition($pageLinks, callback) {
    this.pageLinks = $pageLinks;
    this.init(this.pageLinks);
    //this.callback = callback || function(){};
}

PageTransition.prototype = {
    init: function() {
        if(typeof this.pageLinks == 'object') {
            this.addEvent(this.pageLinks);
        } else {
            throw new Error('The argument you have parsed needs to be of type object');
        }
    },
    addEvent: function($link) {
        var _self = this;
        for(var index = 0; index < $link.length; index++) {
            $link[index].addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                var url = event.target.getAttribute('href');
                _self.pageRequest(url);
            });
        }
    },
    pageRequest: function(url) {
        this.animatePage();
        var xhr = new XMLHttpRequest(),
            newElement,
            requestedContent,
            requestedPageTitle,
            $pageWrapper = document.getElementById('page-wrapper'),
            $pageTitle = document.querySelector('head title');
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                newElement = document.createElement('div');
                newElement.innerHTML = this.response;
                console.log(this.response);
                /*requestedPageTitle = newElement.querySelector('head title');
                requestedContent = newElement.querySelector('#page-wrapper');
                $pageTitle = requestedPageTitle;
                $pageWrapper.innerHTML = requestedContent.innerHTML;*/
            }
        };
        xhr.open('GET', url + '#page-wrapper');
        xhr.send();

        /*
         if the current page is not the same as the requested page
         then change the url to the request page and
         add it to the window history.
         */
        if(url != window.location) {
            window.history.pushState({path: url},'',url);
            //this.callback();
        }
    },
    animatePage: function(){
        console.log('Page is animating');
        //toggleMenu();
    }
};
//# sourceMappingURL=script.js.map
