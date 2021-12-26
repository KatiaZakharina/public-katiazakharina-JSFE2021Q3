import { LocalState } from '../../controller/localState';
import { AppView } from '../appView';

export class Favorites {
  public toysWrapper: HTMLElement | null;
  public treeWrapper: HTMLElement | null;

  constructor() {
    this.toysWrapper = null;
    this.treeWrapper = null;
  }
  draw() {
    this.toysWrapper = document.querySelector('.toys-wrapper');
    this.treeWrapper = document.querySelector('.drag-area');

    this.drawToyCards();

    this.treeWrapper!.ondragover = this.allowDrop.bind(this);

    this.treeWrapper!.ondragstart = this.dragStart.bind(this);
    this.toysWrapper!.ondragstart = this.dragStart.bind(this);

    this.treeWrapper!.ondrop = this.dropEvent.bind(this);

    this.decorateTree();
  }

  drawToyCards() {
    if (Object.keys(LocalState.data.selected).length) this.drawSelectedToys();
    else this.drawDefauldToys();
  }
  drawSelectedToys() {
    Object.entries(LocalState.data.selected).forEach(([num, count]) => {
      this.drawToy(+num, count);
    });
  }
  drawDefauldToys() {
    AppView.toysDB.slice(0, 20).forEach((obj) => {
      this.drawToy(+obj.num, +obj.count);
    });
  }

  drawToy(num: number, count: number) {
    const toy = document.createElement('div');
    toy.classList.add('toys-wrapper__item');

    const img = document.createElement('img');
    img.classList.add('toys-wrapper__img');
    img.setAttribute('draggable', 'true');
    img.id = `${num}-${count}`;
    img.src = `./../../../assets/toys/${num}.webp`;
    toy.append(img);

    const toyCount = document.createElement('span');
    toyCount.classList.add('toys-wrapper__indicator');
    toyCount.textContent = String(count);
    toyCount.dataset.num = String(num);

    toy.insertAdjacentElement('beforeend', toyCount);
    this.toysWrapper?.insertAdjacentElement('beforeend', toy);
  }

  allowDrop(e: DragEvent) {
    e.preventDefault();
  }

  dragStart(e: DragEvent) {
    if (!(e.target as HTMLElement).classList.contains('toys-wrapper__img')) return;
    e.dataTransfer?.setData('id', (e.target as HTMLElement).id);
  }

  dropEvent(e: DragEvent) {
    const itemId = e.dataTransfer?.getData('id');
    if (!itemId) return;

    const draggedEl = document.getElementById(itemId)!;
    const draggedClone = draggedEl.cloneNode(true);
    (draggedClone as HTMLElement).setAttribute('dragged', 'true');

    const [num, count] = draggedEl.id.split('-');
    draggedEl.id = `${num}-${+count - 1}`;

    draggedEl.nextElementSibling!.textContent = String(+draggedEl.nextElementSibling!.textContent! - 1);
    LocalState.decoration.placedOnTree.push({
      num: +num,
      location: {
        x: e.pageX,
        y: e.pageY,
      },
    });

    if (+count === 1) draggedEl.remove();
    (draggedClone as HTMLElement).style.position = 'absolute';
    (draggedClone as HTMLElement).style.zIndex = String(1000);

    document.body.append(draggedClone);
    this.moveAt(draggedClone as HTMLElement, e.pageX, e.pageY);
  }

  moveAt(element: HTMLElement, pageX: number, pageY: number) {
    element.style.left = pageX - element.offsetWidth / 2 + 'px';
    element.style.top = pageY - element.offsetHeight / 2 + 'px';
  }

  decorateTree() {
    if (LocalState.decoration.placedOnTree.length === 0) return;
    LocalState.decoration.placedOnTree.forEach((toy) => {
      const toyEl: HTMLImageElement = document.createElement('img');
      toyEl.classList.add('toys-wrapper__img');
      toyEl.setAttribute('dragged', 'true');
      toyEl.src = `./../../../assets/toys/${toy.num}.webp`;

      toyEl.style.position = 'absolute';
      toyEl.style.zIndex = String(1000);

      document.body.append(toyEl);
      this.moveAt(toyEl, toy.location.x, toy.location.y);
      this.updateToyCount(toy.num);
    });
  }
  updateToyCount(num: number) {
    const counter = document.querySelector(`[data-num="${num}"]`);
    if (counter) {
      counter.textContent = String(+counter!.textContent! - 1);
      if (+counter.textContent === 0) counter.previousElementSibling?.remove();
    }
  }
}
