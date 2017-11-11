function GalleryCarousel(base, options) {
  this.base = base;
  Carousel.call(this, this.base, options);
}

GalleryCarousel.prototype = Object.create(Carousel.prototype);
GalleryCarousel.prototype.constructor = GalleryCarousel;

GalleryCarousel.prototype.animateSlides = function(){
  var counterImage = this.domElements.slides[this.counter].querySelector('img');
  var naturalWidth = counterImage.naturalWidth;
  var naturalHeight = counterImage.naturalHeight;

  this.domElements.frame.style.width = naturalWidth + "px";
  this.domElements.frame.style.height = naturalHeight + "px";
  // setTimeout(function(){
  // }, 6000);
  //removeClassFromNodeList(this.domElements.slides, 'show-slide');

  // setTimeout(function(){
  //   this.domElements.slides[this.counter].classList.add('show-slide');
  // }, 3000);

  //this.domElements.frame.style.width = slideWidth + "px";
  this.domElements.wrapper.addEventListener('webkitTransitionEnd', function(){
    this.isAnimating = false;
  }.bind(this));
}
