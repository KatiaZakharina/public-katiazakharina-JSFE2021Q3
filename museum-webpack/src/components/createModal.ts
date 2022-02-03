function createModal(elementName: string, scroolBehavior = false, changeTrigger = false) {
  const modalTrigger = document.querySelectorAll(`[data-${elementName}][data-modal]`);
  const modal = document.querySelector(`[data-${elementName}][data-modal-window]`);
  const modalContainer = document.querySelector(`[data-${elementName}].modal__container`);
  const modalCloseBtn = document.querySelector(`[data-${elementName}][data-close]`);

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', () => (changeTrigger && btn.classList.contains('data-close') ? hideModal() : showModal()));
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      hideModal();
    }
  });

  //adaptive nav
  function changeModalTrigger() {
    const trigger = document.querySelector(`[data-${elementName}][data-trigger]`);
    const img = document.querySelector(`[data-${elementName}][data-trigger-image]`) as HTMLImageElement;
    if (trigger.classList.contains('data-open')) {
      img.src = 'assets/svg/nav-close.svg';
      trigger.classList.toggle('data-open');
      trigger.classList.toggle('data-close');
    } else {
      img.src = 'assets/svg/nav-open.svg';
      trigger.classList.toggle('data-open');
      trigger.classList.toggle('data-close');
    }
  }

  if (elementName === 'a-nav') {
    const navLinks = document.querySelectorAll('.a-nav__item');
    navLinks.forEach((i) => i.addEventListener('click', hideModal));
  }

  function showModal() {
    modal.classList.add('show');
    modalContainer.classList.add('fadeIn');
    modal.classList.remove('hide');
    modalContainer.classList.remove('fadeOut');
    if (scroolBehavior) document.body.style.overflow = 'hidden';
    if (changeTrigger) changeModalTrigger();
    document.querySelector('.welcome__info').classList.add('welcome__info_md_hide');
  }

  function hideModal() {
    modalContainer.classList.remove('fadeIn');
    modalContainer.classList.add('fadeOut');
    setTimeout(() => {
      modal.classList.add('hide');
      modal.classList.remove('show');
    }, 1000);
    if (scroolBehavior) document.body.style.overflow = '';
    if (changeTrigger) changeModalTrigger();
    document.querySelector('.welcome__info').classList.remove('welcome__info_md_hide');
  }
}

export default createModal;
