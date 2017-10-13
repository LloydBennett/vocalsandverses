//dom elements

/*var $pageTitle = document.querySelector('head title'),
	$testimonals = document.querySelectorAll('.testimonals'),
	$testimonyQuotes = document.querySelectorAll('.entry'),
	$testimonyImages = document.querySelectorAll('.carousel-image .thumbnail'),
	$prevController = document.querySelector('.prev'),
	$nextController = document.querySelector('.next'),
	$modalOverlay = document.querySelector('.modal-overlay'),
	$modalWindow = document.querySelectorAll('.modal-content'),
	$largePlayBtn = document.querySelector('.play-btn-lrg')*/
//var $testimonals = document.querySelectorAll('[data-carousel="testimonal"]');

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

		// var pageTransition = new PageTransition(document.querySelectorAll('[data-page-transition]'));
		// var navMenu = new NavigationMenu({
		// 	menu: document.querySelector('[data-role="nav-menu"]'),
		// 	menuTrigger: document.querySelector('[data-role="open-menu"]'),
		// 	body: document.querySelector('body'),
		// 	navLinks: document.querySelectorAll('.nav-modal [data-role="nav-menu-links"]')
		// });
	}

	window.onload = function() {
		init();
	};

}());
