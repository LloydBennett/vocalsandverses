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
var $testimonals = document.querySelectorAll('[data-carousel="testimonal"]');


(function() {

	//initialises all functions that need to be called
	function init(){

		// var pageTransition = new PageTransition(document.querySelectorAll('[data-page-transition]'));
		var testimonialWidget = new Carousel({
			nextController: document.querySelector('.next'),
			prevController: document.querySelector('.prev'),
			slides: document.querySelectorAll('.testimonals-entry'),
      progressTabs: document.querySelectorAll('.testimonals-progress-tabs .tab')
		});
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
