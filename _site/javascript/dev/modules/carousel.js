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
