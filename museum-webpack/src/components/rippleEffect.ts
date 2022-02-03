function rippleEffect() {
  const btn = document.querySelector('.ripple');
  function rippleFunction(e: MouseEvent) {
    e.preventDefault();
    const posX = this.offsetLeft;
    const posY = this.offsetTop;
    let buttonWidth = this.offsetWidth;
    let buttonHeight = this.offsetHeight;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple__span');

    this.appendChild(ripple);

    if (buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight;
    }

    const x = e.pageX - posX - buttonWidth / 2;
    const y = e.pageY - posY - buttonHeight / 2;

    ripple.style.width = `${buttonWidth}px`;
    ripple.style.height = `${buttonHeight}px`;
    ripple.style.top = `${y}px`;
    ripple.style.left = `${x}px`;

    ripple.classList.add('rippleAnimation');

    setTimeout(() => {
      this.removeChild(ripple);
    }, 1000);
  }

  btn.addEventListener('click', rippleFunction);
}
export default rippleEffect;
