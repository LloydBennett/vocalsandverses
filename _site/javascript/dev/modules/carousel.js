function Carousel(options) {
    var defaults = {
      autoplay: true,
      delay: 3000
    };
    this.options = Object.assign(options, defaults);
    this.counter = 0;
    this.previousSlideCounter = this.options.slides.length - 1;
    this.init();
}

Carousel.prototype = {
    init: function(){
        this.move();
        this.addEvents();

        if(this.options.autoplay) {
          setInterval(function(){
            this.move(1);
          }.bind(this), this.options.delay)
        }
    },
    addEvents: function(){
        if(this.options.nextController) {
            this.options.nextController.onclick = function(){
                this.move(1);
            }.bind(this);
        }

        if(this.options.prevController) {
            this.options.prevController.onclick = function () {
                this.move(-1);
            }.bind(this);
        }
    },
    move: function(direction) {
        var $slides = this.options.slides,
            slidesMaxLength = $slides.length - 1;

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

        console.log("previous slide: " + this.previousSlideCounter, "active slide: " + this.counter);

        $slides.forEach(function(elem){
          elem.classList.remove('active-slide', 'previous-slide');
        });

        $slides[this.previousSlideCounter].classList.add('previous-slide');
        $slides[this.counter].classList.add('active-slide');
        this.updateProgressTab();
    },
    updateProgressTab: function(){
      this.options.progressTabs.forEach(function(elem){
        elem.classList.remove('active');
      });

      this.options.progressTabs[this.counter].classList.add('active');
    }
};
