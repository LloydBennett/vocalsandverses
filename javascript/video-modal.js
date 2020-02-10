(function(){
  const triggerModal = document.querySelectorAll('[data-trigger-modal="video"]');
  const body = document.querySelector('body');
  const modal = document.querySelector('[data-modal="video"]');
  const featuredVideo = document.querySelector('[data-modal="video"] video');
  let openModal = false;

  function toggleModal() {
    if(!openModal) {
      body.classList.add('no-scrolling');
      modal.classList.add('visible');
      openModal = true;
    }
    else {
      body.classList.remove('no-scrolling');
      modal.classList.remove('visible');
      openModal = false;
    }
  }

  triggerModal.forEach(function(element){
    element.onclick = toggleModal;
  });
}());
