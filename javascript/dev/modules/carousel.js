function Carousel(options) {
  var defaults = {
    autoplay: true,
    delay: 10000
  };
  this.options = Object.assign(options, defaults);
  this.counter = 0;
  this.previousSlideCounter = this.options.slides.length - 1;
  this.isAnimating = false;
  this.timer;
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
    this.animateSlides(slides[index], slides[this.previousSlideCounter]);
  },
  move: function(direction) {
    var slides = this.options.slides;

    if (!direction) direction = 0;

    this.counter += direction;
    this.previousSlideCounter += direction;
    this.checkCounterLimit(direction);
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
