/*
var modalOpen = false, player;
function triggerModal(event) {
    if(!modalOpen) {
        var modalName = (event.target.getAttribute('data-trigger-modal')) ?
                event.target.getAttribute('data-trigger-modal') : event.target.parentNode.getAttribute('data-trigger-modal'),
            $modal = document.querySelectorAll('[data-modal-name="' +  modalName + '"]');

        $modalOverlay.classList.add('visible');
        $modal[0].classList.add('open');
        modalOpen = true;
    } else {
        $modalOverlay.classList.remove('visible');
        $modalWindow.forEach(function($elem) {
            $elem.classList.remove('open');
        });
        modalOpen = false;
    }
}*/
