// Helper functions

/* This loop through an array of Dom
elements and remove the className that is passed in
when envoked. jQuery normally takes care of this issue */

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

/* This also loops through an array of Dom
elements and attaches specified eventhandler to each
to it. */

function bindEventToAll(nodeList, eventHandler){
  nodeList.forEach(function(element, index){
    element.onclick = eventHandler;
  });
}

// End of Helper functions

/*
  This function sets the communication between the modal class
  and the carousel class. The Gallery modal has a combination of both
  carousel and modal functionality.
*/
function setupGalleryModal() {
  var modal = document.querySelectorAll('[data-modal="gallery-modal"]');
  var carouselEl = document.querySelectorAll('[data-carousel="gallery-modal"]');
  var carousel;
  var carouselArray = [];

  carouselEl.forEach(function(element){
    carousel = new Carousel(element, {
      autoResizeToFitSlide: true
    });
    carouselArray.push(carousel);
  });

  modal.forEach(function(element, index) {
    new Modal(element, function(isOpen, target) {
      if(isOpen) {
        carouselArray[index].moveViaLink(target.getAttribute('data-index'));
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
