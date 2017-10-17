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

function setupGalleryModal() {
  var modal = document.querySelectorAll('[data-modal="gallery-modal"]');
  //var modalTrigger = document.querySelectorAll('[data-trigger-modal="gallery-modal"]');
  var carouselEl = document.querySelectorAll('[data-carousel="gallery-modal"]');
  var carousel;
  var carouselArray = [];

  carouselEl.forEach(function(element){
    carousel = new Carousel(element);
    carouselArray.push(carousel);
  });

  modal.forEach(function(element, index) {
    new Modal(element, '[data-trigger-modal="gallery-modal"]', function(isOpen, target) {
      if(isOpen) {
        // carouselInModal.onChange(function() {
        //   m.setSize(carouselInModal.getSizeOfCurrentImage())
        // });
        carouselArray[index].showImage(target.getAttribute('data-index'));
      }
    });
  });
}

function setupDefaultCarousels() {
  document.querySelectorAll('[data-carousel="default"]').forEach(function(el) {
    new Carousel(el);
  });
}

(function() {

	//initialises all functions that need to be called
	function init(){
    setupGalleryModal();
    setupDefaultCarousels();
	}

	window.onload = function() {
		init();
	};

}());
