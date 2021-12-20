import { App } from '../../app/app';
import './popup.scss';

export class Popup {
  showModal(message: string) {
    App.rootEl.innerHTML += `
    <div class="modal">
    <div class="modal__container">
      <div class="modal__content">
        <div class="modal__close">
          &times;
        </div>
        <p class="modal__question">${message}</p>
      </div>
    </div>
  </div>
    `;

    document.querySelector('.modal__close')?.addEventListener('click', () => {
      this.closeModal();
    });
  }

  closeModal() {
    document.querySelector('.modal')?.remove();
  }
}
