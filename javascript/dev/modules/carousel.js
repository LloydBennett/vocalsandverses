function Carousel(options) {
    this.options = options;
    this.counter = 0;
    this.init();
}

Carousel.prototype = {
    init: function(){
        this.addEvents();
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

        $slides[this.counter].classList.remove('active');

        this.counter += direction;

        //reset the counter whenever its less than 0 or more than slides length
        if (this.counter > slidesMaxLength ||
            this.counter < 0
        ) {
            this.counter = (direction == 1) ? 0 : slidesMaxLength;
        }

        $slides[this.counter].classList.add('active');
        this.updateProgressTab();
    },
    updateProgressTab: function(){
      this.options.progressTabs.forEach(function(elem){
        elem.classList.remove('active');
      });

      this.options.progressTabs[this.counter].classList.add('active');
    }
};
