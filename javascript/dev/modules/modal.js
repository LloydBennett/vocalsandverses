function Modal() {
  this.openModal = false;
  this.domElements;
  this.cacheDomElements = function() {
    this.domElements = {
      trigger: document.querySelectorAll('[data-trigger-modal]'),
      modalOverlay: document.querySelector('[data-modal-overlay]'),
      closeModal: document.querySelectorAll('[data-close-modal]')
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
      if(!this.openModal) {
        var modalName = (event.target.getAttribute('data-trigger-modal')) ?
                event.target.getAttribute('data-trigger-modal') : event.target.parentNode.getAttribute('data-trigger-modal');

        var $modal = document.querySelector('[data-modal-name="' +  modalName + '"]');

        _this.domElements.modalOverlay.classList.add('visible');
        $modal.classList.add('open');
        this.openModal = true;
      } else {
        _this.domElements.modalOverlay.classList.remove('visible');
        $modal.classList.remove('open');
        this.openModal = false;
      }
    });
  }
}
