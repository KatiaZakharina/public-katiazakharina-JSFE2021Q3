import { LocalState } from '../../controller/localState';
import { AppView } from '../appView';

export class Menu {
  private snowBtn: HTMLElement | null;
  private audioBtn: HTMLElement | null;
  private audioEl: HTMLAudioElement | null;
  private snowID: number | null;

  constructor() {
    this.snowBtn = null;
    this.audioBtn = null;
    this.audioEl = null;
    this.snowID = null;
  }

  control(): void {
    this.snowBtn = document.querySelector('.snow-btn');
    this.audioBtn = document.querySelector('.audio-btn');
    this.audioEl = document.querySelector('.audio');

    if (LocalState.decoration.menu.audio) this.audioBtn?.classList.add('active');
    else this.audioBtn?.classList.remove('active');

    this.controlAudio();

    if (LocalState.decoration.menu.snow) this.snowBtn?.classList.add('active');
    else this.snowBtn?.classList.remove('active');
    this.controlSnow();

    this.snowBtn?.addEventListener('click', () => {
      this.snowBtn?.classList.toggle('active');
      this.controlSnow();
    });
    this.audioBtn?.addEventListener('click', () => {
      this.audioBtn?.classList.toggle('active');
      this.controlAudio();
    });
  }

  controlSnow(): void {
    if (this.snowBtn!.classList.contains('active')) this.startSnow();
    else this.stopSnow();
  }
  stopSnow(): void {
    LocalState.decoration.menu.snow = false;
    clearInterval(this.snowID!);
    this.snowBtn?.classList.remove('active');
  }
  startSnow(): void {
    const ADD_INTERVAL = 50;
    this.snowID = +setInterval(() => {
      this.createSnowFlake();
    }, ADD_INTERVAL);
    LocalState.decoration.menu.snow = true;
  }

  createSnowFlake(): void {
    const REMOVE_TIME = 5000;
    const snow_flake = document.createElement('i');
    snow_flake.classList.add('snowflake');
    snow_flake.style.backgroundImage = 'url("./assets/svg/snowflake.svg")';
    snow_flake.style.left = Math.random() * (window.innerWidth / 2) + window.innerWidth / 4 + 'px';
    snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snow_flake.style.opacity = String(Math.random());

    document.body.appendChild(snow_flake);

    setTimeout(() => {
      snow_flake.remove();
    }, REMOVE_TIME);
  }

  controlAudio(): void {
    if (this.audioBtn!.classList.contains('active')) this.playAudio();
    else this.stopAudio();
  }

  stopAudio(): void {
    this.audioEl?.pause();
    LocalState.decoration.menu.audio = false;
  }
  playAudio(): void {
    this.audioEl!.src = './assets/audio/audio.mp3';

    this.audioEl!.play().catch((err) => {
      if (err) AppView.popup.showModal('Кликните, для воспроизведения аудио');
      document.querySelector('.modal')?.addEventListener('click', () => {
        this.audioEl!.play();
      });
    });
    LocalState.decoration.menu.audio = true;
  }
}
