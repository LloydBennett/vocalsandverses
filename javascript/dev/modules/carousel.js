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
        console.log(this.isAnimating);
        if(this.options.nextController) {
            this.options.nextController.onclick = function(){
                if(!this.isAnimating) this.move(1);
            }.bind(this);
        }

        if(this.options.prevController) {
            this.options.prevController.onclick = function() {
                if(!this.isAnimating) this.move(1);
            }.bind(this);
        }
    },
    move: function(direction) {
        var slides = this.options.slides,
            slidesMaxLength = slides.length - 1;

        if (direction) {
          this.counter += direction;
          this.previousSlideCounter += direction;
        }

        if (this.counter > slidesMaxLength || this.counter < 0) {
            this.counter = (direction == 1) ? 0 : slidesMaxLength;
        }

        if (this.previousSlideCounter > slidesMaxLength || this.previousSlideCounter < 0) {
            this.previousSlideCounter = (direction == 1) ? 0 : slidesMaxLength;
        }

        this.animateSlides(slides);
        this.updateProgressTab();
    },
    animateSlides: function(slides){
      this.isAnimating = true;
      console.log('is animating first: ' + this.isAnimating);
      slides.forEach(function(elem){
        elem.classList.remove('active-slide', 'previous-slide');
      });

      slides[this.previousSlideCounter].classList.add('previous-slide');
      slides[this.counter].classList.add('active-slide');
      slides[this.counter].addEventListener('webkitTransitionEnd', function(){
        this.isAnimating = false;
        console.log('is animating: ' + this.isAnimating);
      }.bind(this));
    },
    updateProgressTab: function(){
      this.options.progressTabs.forEach(function(elem){
        elem.classList.remove('active');
      });

      this.options.progressTabs[this.counter].classList.add('active');
    }
};
