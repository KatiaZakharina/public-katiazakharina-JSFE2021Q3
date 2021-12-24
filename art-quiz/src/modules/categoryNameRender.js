function categoryName(name) {
  document.querySelector('.category__title').innerHTML = `<span>${
    name[0].toUpperCase() + name.slice(1)
  } categories</span>`;
  document.querySelector('.settings__arrow').addEventListener('click', () => {
    window.history.back();
  });
}
export default categoryName;
