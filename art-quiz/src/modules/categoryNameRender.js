function categoryName(categoryName) {
  document.querySelector('.category__title').innerHTML = `
  <img class="settings__arrow icon" src="./assets/svg/eva_arrow-ios-back-fill.svg" alt="icon: return back">
  <span>${categoryName[0].toUpperCase() + categoryName.slice(1)} categories</span>
  `;
  document.querySelector('.settings__arrow').addEventListener('click', () => {
    history.back();
  });
}
export default categoryName;
