function Modal() {
  this.openModal = false;
  this.domElements;
  this.cacheDomElements = function() {
    this.domElements = {
      trigger: document.querySelectorAll('[data-trigger-modal]'),
      modalOverlay: document.querySelector('[data-modal-overlay]'),
      modals: document.querySelectorAll('[data-modal]')
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
    bindEventToAll(this.domElements.trigger, function() {
      _this.toggleModal.call(_this, event);
    });
  },
  toggleModal: function(event, callback){
    event.stopPropagation();

    if(!this.openModal) {
      var target = event.target;
      var targetParent = target.parentNode;
      var modalName = (target.getAttribute('data-trigger-modal')) ?
      target.getAttribute('data-trigger-modal') : targetParent.getAttribute('data-trigger-modal');
      var $modal = document.querySelector('[data-modal="' +  modalName + '"]');

      this.domElements.modalOverlay.classList.add('visible');
      $modal.classList.add('open');
      this.openModal = true;
      console.log(this.openModal);
    } else {
      this.domElements.modalOverlay.classList.remove('visible');
      removeClassFromNodeList(this.domElements.modals, 'open');
      this.openModal = false;
    }

    if(callback && typeof callback === "function") callback(this.openModal);
  }
}
