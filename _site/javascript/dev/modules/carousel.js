function Carousel(options) {
  var defaults = {
    autoplay: false,
    delay: 10000
  };
  this.options = Object.assign(options, defaults);
  this.counter = 0;
  this.previousSlideCounter = this.options.slides.length - 1;
  this.isAnimating = false;
  this.timer;
  this.slidesWidth = 1440; // width of the inner carousel wrapper container
  //this.slidesWidth = this.options.wrapper.getBoundingClientRect().width;
  console.log(this.options.wrapper);
  this.init();
}

Carousel.prototype = {
  init: function(){
      this.addEvents();
      this.move();
      this.setSlideTimeLimit();
  },
  addEvents: function(){
    // find a way to make nextController and prevController one event handler
    if(this.options.nextController) {
        this.options.nextController.onclick = function(){
            if(!this.isAnimating) {
              this.move(1);
              clearInterval(this.timer);
              this.setSlideTimeLimit();
            }
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
          clearInterval(this.timer);
          this.setSlideTimeLimit();
        }
      });
    }
  },
  setSlideTimeLimit: function(){
    if(this.options.autoplay) {
      this.timer = setInterval(function(){
        if(!this.isAnimating) this.move(1);
      }.bind(this), this.options.delay);
    }
  },
  checkCounterLimit: function(n){
    var slidesMaxLength = this.options.slides.length - 1;

    if (this.counter > slidesMaxLength || this.counter < 0) {
      this.counter = (n == 1) ? 0 : slidesMaxLength;
    }
    if (this.previousSlideCounter > slidesMaxLength || this.previousSlideCounter < 0) {
      this.previousSlideCounter = (n == 1) ? 0 : slidesMaxLength;
    }
  },
  moveViaLink: function(index) {
    var slides = this.options.slides;

    this.counter = index;
    this.previousSlideCounter = index - 1;
    this.checkCounterLimit(index);
    this.animateSlides();
  },
  move: function(direction) {
    var slides = this.options.slides;

    if (!direction) direction = 0;

    this.counter += direction;
    this.previousSlideCounter += direction;
    this.checkCounterLimit(direction);
    this.animateSlides();
  },
  animateSlides: function() {
    var translateAmount = -this.slidesWidth * this.counter;
    this.isAnimating = true;
    this.updateProgressTab();
    this.options.wrapper.style.transform = "translateX(" + translateAmount + "px)"
    this.options.wrapper.addEventListener('webkitTransitionEnd', function(){
      this.isAnimating = false;
    }.bind(this));
  },
  updateProgressTab: function(){
    removeClassFromNodeList(this.options.progressTabs, 'active');
    this.options.progressTabs[this.counter].classList.add('active');
  }
};
