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

  control() {
    this.snowBtn = document.querySelector('.snow-btn');
    this.audioBtn = document.querySelector('.audio-btn');
    this.audioEl = document.querySelector('.audio');

    if (LocalState.decoration.menu.audio) this.audioBtn?.classList.add('active');
    this.controlAudio();

    if (LocalState.decoration.menu.snow) this.snowBtn?.classList.add('active');
    this.controlSnow();

    this.snowBtn?.addEventListener('click', (e: Event) => {
      this.snowBtn?.classList.toggle('active');
      this.controlSnow();
    });
    this.audioBtn?.addEventListener('click', (e: Event) => {
      this.audioBtn?.classList.toggle('active');
      this.controlAudio();
    });
  }

  controlSnow() {
    if (this.snowBtn!.classList.contains('active')) this.startSnow();
    else this.stopSnow();
  }
  stopSnow() {
    LocalState.decoration.menu.snow = false;
    clearInterval(this.snowID!);
    this.snowBtn?.classList.remove('active');
  }
  startSnow() {
    console.log('H');
    this.snowID = +setInterval(() => {
      this.createSnowFlake();
    }, 50);
    LocalState.decoration.menu.snow = true;
  }

  createSnowFlake() {
    const snow_flake = document.createElement('i');
    snow_flake.classList.add('snowflake');
    snow_flake.style.backgroundImage = 'url("./assets/svg/snowflake.svg")';
    snow_flake.style.left = Math.random() * (window.innerWidth / 2)+(window.innerWidth / 4) + 'px';
    snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snow_flake.style.opacity = String(Math.random());

    document.body.appendChild(snow_flake);

    setTimeout(() => {
      snow_flake.remove();
    }, 5000);
  }

  controlAudio() {
    if (this.audioBtn!.classList.contains('active')) this.playAudio();
    else this.stopAudio();
  }

  stopAudio() {
    this.audioEl?.pause();
    LocalState.decoration.menu.audio = false;
  }
  playAudio() {
    this.audioEl!.src = './assets/audio/audio.mp3';
    this.audioEl!.play().catch(() => {
      AppView.popup.showModal('Кликните, для воспроизведения аудио');
      document.querySelector('.modal')?.addEventListener('click', () => {
        this.audioEl!.play();
      });
    });
    LocalState.decoration.menu.audio = true;
  }
}
