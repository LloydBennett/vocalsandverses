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
    document.querySelectorAll('[data-carousel]').forEach(function (element) {
      new Carousel(element);
    });

    var modal = new Modal();

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

function Carousel(parentWrapper, options) {
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
      nextController: parentWrapper.querySelectorAll('[data-carousel-controller-next]'),
      prevController: parentWrapper.querySelectorAll('[data-carousel-controller-prev]'),
      progressTabs: parentWrapper.querySelectorAll('[data-carousel-progress-tab]'),
      slides: parentWrapper.querySelectorAll('[data-carousel-slides]'),
      wrapper: parentWrapper.querySelector('[data-carousel-wrapper]')
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

function ImageGallery(){

}

ImageGallery.prototype = Object.create(Carousel.prototype);


/*

//Modal Part
1) When the user clicks on an image in the gallery a modal window should appear
2) The modal window adjust to the size of the image clicked.
3) The image clicked on should appear in the modal.

//Carousel Part
1) When the user clicks on an arrow on the modal window the next image should appear

*/

function Modal() {
  this.openModal = false;
  this.domElements;
  this.cacheDomElements = function() {
    this.domElements = {
      trigger: document.querySelectorAll('[data-trigger-modal]'),
      modalOverlay: document.querySelector('[data-modal-overlay]'),
      modals: document.querySelectorAll('[data-modal]')
    };
  }
  this.init();
}

Modal.prototype = {
  init: function() {
    this.cacheDomElements();
    this.addEvents();
  },
  addEvents: function() {
    var _this = this;
    bindEventToAll(this.domElements.trigger, function() {
      _this.toggleModal.call(_this, event);
    });
  },
  toggleModal: function(event, callback){
    event.stopPropagation();

    if(!this.openModal) {
      var target = event.target;
      var targetParent = target.parentNode;
      var modalName = (target.getAttribute('data-trigger-modal')) ?
      target.getAttribute('data-trigger-modal') : targetParent.getAttribute('data-trigger-modal');
      var $modal = document.querySelector('[data-modal="' +  modalName + '"]');

      this.domElements.modalOverlay.classList.add('visible');
      $modal.classList.add('open');
      this.openModal = true;
      console.log(this.openModal);
    } else {
      this.domElements.modalOverlay.classList.remove('visible');
      removeClassFromNodeList(this.domElements.modals, 'open');
      this.openModal = false;
    }

    if(callback && typeof callback === "function") callback(this.openModal);
  }
}

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
