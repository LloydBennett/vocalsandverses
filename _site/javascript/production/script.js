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
//var $testimonals = document.querySelectorAll('[data-carousel="testimonal"]');

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

function bindEventToAll(nodeList, eventHandler){
  nodeList.forEach(function(element, index){
    element.onclick = eventHandler;
  });
}

(function() {

	//initialises all functions that need to be called
	function init(){
    var testimonialWidget = new Carousel();
		// var pageTransition = new PageTransition(document.querySelectorAll('[data-page-transition]'));
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
    autoplay: false,
    delay: 10000
  };
  this.domElements;

  options = options ? options : {};
  this.options = Object.assign(options, defaults);
  this.counter = 0;
  this.isAnimating = false;
  this.timer;
  this.slidesWidth;

  this.cacheDomElements = function() {
    this.domElements = {
      nextController: document.querySelectorAll('[data-carousel-controller-next]'),
      prevController: document.querySelectorAll('[data-carousel-controller-prev]'),
      progressTabs: document.querySelectorAll('[data-carousel-progress-tab]'),
      slides: document.querySelectorAll('[data-carousel-slides]'),
      wrapper: document.querySelector('[data-carousel-wrapper]')
    }
    /* we need to set the width of the carousel so that
      the carousel wrapper moves in relation the width of
      the slides. Slides are 100% of the carousel width
    */
    this.setCarouselWidth();
  }

  this.init();
}

Carousel.prototype = {
  init: function(){
    this.cacheDomElements();
    this.addEvents();
    this.move();
    this.setSlideTimeLimit();
  },
  addEvents: function(){
    var _this = this;

    if(this.domElements.nextController) {
      this.carouselController(this.domElements.nextController, 1);
    }

    if(this.domElements.prevController) {
      this.carouselController(this.domElements.prevController, -1);
    }

    if(this.domElements.progressTabs) {
      this.domElements.progressTabs.forEach(function(element, index) {
        element.onclick = function(){
          _this.moveViaLink(index);
          if(_this.options.autoplay) {
            clearInterval(_this.timer);
            _this.setSlideTimeLimit();
          }
        }
      });
    }
    /* This helps us to have a responsive carousel */
    window.addEventListener('resize', function() {
      this.setCarouselWidth();
    }.bind(_this));
  },
  carouselController: function(nodeList, direction){
    bindEventToAll(nodeList, function() {
      if(!this.isAnimating) {
        this.move(direction);
        if(this.options.autoplay) {
          clearInterval(this.timer);
          this.setSlideTimeLimit();
        }
      }
    }.bind(this));
  },
  setSlideTimeLimit: function(){
    if(this.options.autoplay) {
      this.timer = setInterval(function(){
        if(!this.isAnimating) this.move(1);
      }.bind(this), this.options.delay);
    }
  },
  checkCounterLimit: function(n) {
    /* We check to see whether the counter (n) is
    within the scope of how many slides there are */
    var slidesMaxLength = this.domElements.slides.length - 1;

    if (this.counter > slidesMaxLength || this.counter < 0) {
      this.counter = (n == 1) ? 0 : slidesMaxLength;
    }
  },
  setCarouselWidth: function() {
    this.slidesWidth = document.querySelector('[data-carousel-wrapper]').getBoundingClientRect().width;
  },
  moveViaLink: function(index) {
    /* This is a separate move method especially for
      carousel tabs */
    this.counter = index;
    this.checkCounterLimit(index);
    this.animateSlides();
  },
  move: function(direction) {
    if (!direction) direction = 0;

    this.counter += direction;
    this.checkCounterLimit(direction);
    this.animateSlides();
  },
  animateSlides: function() {
    var translateAmount = -this.slidesWidth * this.counter;
    this.isAnimating = true;
    this.updateProgressTab();
    this.domElements.wrapper.style.transform = "translateX(" + translateAmount + "px)"
    this.domElements.wrapper.addEventListener('webkitTransitionEnd', function(){
      this.isAnimating = false;
    }.bind(this));
  },
  updateProgressTab: function() {
    removeClassFromNodeList(this.domElements.progressTabs, 'active');
    this.domElements.progressTabs[this.counter].classList.add('active');
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
