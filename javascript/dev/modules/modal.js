function Modal(selector, triggerSelector, openHandler) {
  this.openModal = false;
  this.domElements;
  this.base = typeof selector === "string" ? document.querySelector(selector) : selector;
  this.openHandler = openHandler;
  this.cacheDomElements = function() {
    this.domElements = {
      trigger: document.querySelectorAll(triggerSelector),
      modalOverlay: document.querySelector('[data-modal-overlay]')
    };
  }
  this.init();
}

Modal.prototype = {
  init: function() {
    this.cacheDomElements();
    this.addEvents();
  },
  addEvents: function() {
    var _this = this;
    console.log(this.domElements);
    bindEventToAll(this.domElements.trigger, function() {
      _this.toggleModal.call(_this, event);
    });
  },
  openModal: function(){
    this.domElements.modalOverlay.classList.add('visible');
    this.base.classList.add('open');
    this.openModal = true;
  },
  toggleModal: function(event){
    event.stopPropagation();

    if(!this.openModal) {
      var target = (event.target.getAttribute('data-trigger-modal')) ?
      event.target : event.target.parentNode;
      var modalName = target.getAttribute('data-trigger-modal');

      this.domElements.modalOverlay.classList.add('visible');
      this.base.classList.add('open');
      this.openModal = true;

    } else {
      this.domElements.modalOverlay.classList.remove('visible');
      this.base.classList.remove('open');
      this.openModal = false;
    }
    
    if(this.openHandler && typeof this.openHandler === "function") this.openHandler(this.openModal, target);
  }
}
