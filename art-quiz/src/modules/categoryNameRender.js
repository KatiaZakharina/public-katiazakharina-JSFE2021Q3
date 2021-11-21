function categoryName(categoryName) {
  document.querySelector('.category__title').innerHTML = `
  <span>${categoryName[0].toUpperCase() + categoryName.slice(1)} categories</span>
  `;
  document.querySelector('.settings__arrow').addEventListener('click', () => {
    history.back();
  });
}
export default categoryName;
