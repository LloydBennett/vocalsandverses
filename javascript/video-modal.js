(function(){
  const triggerModal = document.querySelectorAll('[data-trigger-modal="video"]');
  const body = document.querySelector('body');
  const modal = document.querySelector('[data-modal="video"]');
  const featuredVideo = document.querySelector('[data-modal="video"] video');
  let openModal = false;

  function toggleModal() {
    if(!openModal) {
      console.log('heyy!!');
      body.classList.add('no-scrolling');
      modal.classList.add('visible');
      featuredVideo.play();
      openModal = true;
    }
    else {
      body.classList.remove('no-scrolling');
      modal.classList.remove('visible');
      featuredVideo.pause();
      featuredVideo.currentTime = 0;
      openModal = false;
    }
  }

  triggerModal.forEach(function(element){
    element.onclick = toggleModal;
  });
}());
