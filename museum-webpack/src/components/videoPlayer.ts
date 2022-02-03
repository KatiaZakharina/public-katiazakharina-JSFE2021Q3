function videoPlayer() {
  const video = document.querySelector('.player__video') as HTMLVideoElement;
  const rangeTime = document.querySelectorAll(
    '.player__range-time'
  ) as NodeListOf<HTMLInputElement>;
  const rangeVolume = document.querySelector(
    '.player__range-volume'
  ) as HTMLInputElement;
  const playButton = document.querySelector(
    '.player__play-button'
  ) as HTMLImageElement;
  const expandButton = document.querySelector('.player__expand-button');
  const volumeButton = document.querySelector(
    '.player__volume-button'
  ) as HTMLImageElement;
  const playButtonWrapper = document.querySelector(
    '.player__wrapper'
  ) as HTMLElement;

  video.volume = 0.5;
  volumeButton.addEventListener('click', toggleVolume);

  function toggleVolume() {
    if (video.muted) {
      video.muted = false;
      volumeButton.src = 'assets/svg/volume.svg';
      rangeVolume.value = String(video.volume || 0.5);
      video.volume = +rangeVolume.value;
    } else {
      video.muted = true;
      volumeButton.src = 'assets/svg/novolume.svg';
      rangeVolume.value = String(0);
    }
  }

  playButtonWrapper.addEventListener('click', toggleBigButton);
  video.addEventListener('click', toggleBigButton);
  playButton.addEventListener('click', toggleBigButton);

  function toggleBigButton() {
    if (video.paused) {
      video.play();
      playButtonWrapper.classList.remove('player__wrapper-before');
      playButton.src = 'assets/svg/stop.svg';
    } else {
      video.pause();
      playButtonWrapper.classList.add('player__wrapper-before');
      playButton.src = 'assets/svg/play.svg';
    }
  }

  expandButton.addEventListener('click', toggleFullScreen);
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.querySelector('.video__player').requestFullscreen();
      (document.querySelector('.player__video') as HTMLElement).style.height =
        '83vh';
    } else {
      document.exitFullscreen();
      (document.querySelector('.player__video') as HTMLElement).style.height =
        '650px';
    }
  }

  rangeTime.forEach((i) => i.setAttribute('min', String(0)));
  video.addEventListener('loadedmetadata', () => {
    rangeTime.forEach((i) => {
      i.setAttribute('max', String(video.duration));
      i.setAttribute('value', String(video.duration * 0.54));
      runnableTrack();
    });
  });

  rangeTime.forEach((i) => {
    i.addEventListener('input', () => {
      video.currentTime = +i.value;
    });
  });

  rangeTime.forEach((i) =>
    i.addEventListener(
      'input',
      () => {
        video.currentTime = +i.value;
      },
      false
    )
  );

  function runnableTrack() {
    const inputs = document.querySelectorAll(
      'input[type="range"]'
    ) as NodeListOf<HTMLInputElement>;

    function getBackgroundSize(input: HTMLInputElement) {
      const min = +input.min || 0;
      const max = +input.max || 100;
      const value = +input.value;

      const size = ((value - min) / (max - min)) * 100;

      return size;
    }

    function setBackgroundSize(input: HTMLInputElement) {
      input.style.setProperty(
        '--background-size',
        `${getBackgroundSize(input)}%`
      );
    }
    inputs.forEach((input) => {
      setBackgroundSize(input);
      input.addEventListener('input', () => setBackgroundSize(input));
    });
  }
  runnableTrack();

  video.addEventListener('playing', () => {
    setInterval(() => {
      rangeTime.forEach((i) => {
        i.value = String(video.currentTime);
      });
      runnableTrack();
    }, 10);
  });

  video.addEventListener(
    'ended',
    () => {
      video.currentTime = 0;
      rangeTime.forEach((i) => {
        i.value = String(0);
      });
      video.load();
      playButton.src = 'assets/svg/play.svg';
    },
    false
  );

  rangeVolume.addEventListener(
    'input',
    () => {
      video.muted = false;
      video.volume = +rangeVolume.value;
      if (video.volume === 0) {
        volumeButton.src = 'assets/svg/novolume.svg';
        video.muted = true;
      } else {
        volumeButton.src = 'assets/svg/volume.svg';
        video.muted = false;
      }
    },
    false
  );
  function keyboardControl() {
    document.addEventListener('keydown', (event) => {
      if (
        +video.getBoundingClientRect().y > 1000 ||
        +video.getBoundingClientRect().y < -1000
      )
        return;

      if (
        (document.activeElement as HTMLElement).dataset.playerBtn !== null
      )
        return;

      if (event.code === 'Space') {
        console.dir(video);
        event.preventDefault();
        toggleBigButton();
      }
      if (event.code === 'KeyM') {
        event.preventDefault();
        toggleVolume();
      }
      if (event.code === 'KeyF') {
        toggleFullScreen();
      }
      if (event.code === 'Comma' && event.shiftKey && !video.paused) {
        video.playbackRate += 0.25;
        showVideoSpeed();
      }
      if (
        event.code === 'Period' &&
        event.shiftKey &&
        video.playbackRate >= 0.5 &&
        !video.paused
      ) {
        video.playbackRate -= 0.25;
        showVideoSpeed();
      }

      function showVideoSpeed() {
        playButtonWrapper.innerHTML = '';
        playButtonWrapper.classList.add('player__wrapper-before');
        playButtonWrapper.style.backgroundImage = 'none';
        const speed = document.createElement('span');
        speed.classList.add('video__speed');
        speed.classList.add('hiddenAnimation');
        speed.innerText = String(video.playbackRate);
        playButtonWrapper.append(speed);
        setTimeout(() => {
          playButtonWrapper.innerHTML = '';
          playButtonWrapper.style.backgroundImage =
            'url(../assets/svg/play-big.svg)';
          playButtonWrapper.classList.remove('player__wrapper-before');
        }, 1500);
      }
    });
  }
  keyboardControl();
}

export default videoPlayer;
