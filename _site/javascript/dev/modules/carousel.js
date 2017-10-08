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
    console.log(this);
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
