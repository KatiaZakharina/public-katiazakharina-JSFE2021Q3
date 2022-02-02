import { LocalState } from '../../controller/localState';
import { AppView } from '../appView';

export class Favorites {
  public toysWrapper: HTMLElement | null;
  public treeWrapper: HTMLElement | null;

  constructor() {
    this.toysWrapper = null;
    this.treeWrapper = null;
  }
  draw(): void {
    this.toysWrapper = document.querySelector('.toys-wrapper');
    this.treeWrapper = document.querySelector('.drag-area');

    this.drawToyCards();

    this.treeWrapper!.ondragover = this.allowDrop.bind(this);
    this.toysWrapper!.ondragover = this.allowDrop.bind(this);

    this.treeWrapper!.ondragstart = this.dragStart.bind(this);
    document.body!.ondragstart = this.dragStart.bind(this);

    this.treeWrapper!.ondrop = this.dropEvent.bind(this);
    this.toysWrapper!.ondrop = this.dropEvent.bind(this);

    this.decorateTree();
    this.drawSavedTrees();
  }

  drawToyCards(): void {
    this.toysWrapper!.innerHTML = '';
    if (Object.keys(LocalState.data.selected).length) this.drawSelectedToys();
    else this.drawDefauldToys();
  }
  drawSelectedToys(): void {
    Object.entries(LocalState.data.selected).forEach(([num, count]) => {
      this.drawToy(+num, count);
    });
  }
  drawDefauldToys(): void {
    AppView.toysDB.slice(0, 20).forEach((obj) => {
      this.drawToy(+obj.num, +obj.count);
    });
  }

  drawToy(num: number, count: number): void {
    const toy = document.createElement('div');
    toy.classList.add('toys-wrapper__item');
    toy.append(this.createToyImg(num, count));

    const toyCount = document.createElement('span');
    toyCount.classList.add('toys-wrapper__indicator');
    toyCount.textContent = String(count);
    toyCount.dataset.num = String(num);
    toy.append(toyCount);

    this.toysWrapper!.append(toy);
  }

  createToyImg(num: number, count: number): HTMLImageElement {
    const img = document.createElement('img');
    img.classList.add('toys-wrapper__img');
    img.setAttribute('draggable', 'true');
    img.id = `${num}-${count}`;
    img.src = `./assets/toys/${num}.webp`;
    return img;
  }

  allowDrop(e: DragEvent): void {
    e.preventDefault();
  }

  dragStart(e: DragEvent): void {
    if (!(e.target as HTMLElement).classList.contains('toys-wrapper__img')) return;
    e.dataTransfer?.setData('id', (e.target as HTMLElement).id);
  }

  dropEvent(e: DragEvent): void | null {
    const itemId = e.dataTransfer?.getData('id');
    if (!itemId) return null;

    const draggedEl = document.getElementById(itemId)!;
    const num = draggedEl.id.split('-')[0];

    if (draggedEl.getAttribute('dragged')) {
      this.moveAt(draggedEl as HTMLElement, e.pageX, e.pageY);

      if ((e.target as HTMLElement).closest('.toys-wrapper')) {
        this.updateLocation(draggedEl as HTMLElement, e.pageX, e.pageY, true);
        this.incrementToyCount(+num);

        draggedEl.remove();
      } else {
        this.updateLocation(draggedEl as HTMLElement, e.pageX, e.pageY, false);
      }
      return;
    }

    const draggedClone = draggedEl.cloneNode(true) as HTMLElement;
    this.decrementToyCount(+num);

    draggedClone.setAttribute('dragged', 'true');
    draggedClone.setAttribute('draggable', 'true');

    draggedClone.style.position = 'absolute';
    draggedClone.style.zIndex = String(1000);

    document.body.append(draggedClone);
    this.moveAt(draggedClone, e.pageX, e.pageY);
    this.updateLocation(draggedClone, e.pageX, e.pageY, false);
  }

  moveAt(element: HTMLElement, pageX: number, pageY: number): void {
    element.style.left = pageX - element.offsetWidth / 2 + 'px';
    element.style.top = pageY - element.offsetHeight / 2 + 'px';
  }

  updateLocation(element: HTMLElement, pageX: number, pageY: number, removeFromTree: boolean) {
    const [num, count] = element.id.split('-');
    let currentToyObj;

    for (const decoratedTree of LocalState.decoration.placedOnTree) {
      if (decoratedTree.num === +num && decoratedTree.count == +count) {
        currentToyObj = decoratedTree;
        break;
      }
    }

    if (!currentToyObj) {
      LocalState.decoration.placedOnTree.push({
        num: +num,
        count: +count,
        location: {
          x: pageX,
          y: pageY,
        },
      });
    } else if (removeFromTree) {
      LocalState.decoration.placedOnTree.splice(LocalState.decoration.placedOnTree.indexOf(currentToyObj), 1);
      return;
    } else {
      LocalState.decoration.placedOnTree[LocalState.decoration.placedOnTree.indexOf(currentToyObj)] = {
        num: +num,
        count: +count,
        location: {
          x: pageX,
          y: pageY,
        },
      };
    }
  }

  decorateTree(): void | null {
    document.querySelectorAll('[dragged].toys-wrapper__img').forEach((toy) => toy.remove());

    if (LocalState.decoration.placedOnTree.length === 0) return null;
    LocalState.decoration.placedOnTree.forEach((toy) => {
      const toyEl: HTMLImageElement = document.createElement('img');
      toyEl.classList.add('toys-wrapper__img');
      toyEl.setAttribute('dragged', 'true');
      toyEl.src = `./assets/toys/${toy.num}.webp`;
      toyEl.id = `${toy.num}-${toy.count}`;

      toyEl.style.position = 'absolute';
      toyEl.style.zIndex = String(1000);

      document.body.append(toyEl);
      this.moveAt(toyEl, toy.location.x, toy.location.y);
      this.decrementToyCount(toy.num);
    });
  }

  decrementToyCount(num: number): void {
    const counter = document.querySelector(`[data-num="${num}"]`);
    if (!counter) return;
    counter.textContent = String(+counter!.textContent! - 1);
    counter.parentElement!.querySelector('.toys-wrapper__img')!.id = `${num}-${+counter.textContent}`;
    if (+counter.textContent === 0) counter.parentElement?.querySelector('.toys-wrapper__img')?.remove();
  }

  incrementToyCount(num: number): void {
    const counter = document.querySelector(`[data-num="${num}"]`);
    if (!counter) return;

    if (+counter.textContent! === 0) {
      const newToyImg = document.createElement('img');
      newToyImg.src = `./assets/toys/${num}.webp`;
      newToyImg.classList.add('toys-wrapper__img');
      newToyImg.setAttribute('draggable', 'true');
      counter.parentElement!.append(newToyImg);
    }

    counter.textContent = String(+counter!.textContent! + 1);
    counter.parentElement!.querySelector('.toys-wrapper__img')!.id = `${num}-${+counter.textContent}`;
  }

  drawSavedTrees(): void {
    document.querySelector('.saved-trees')!.innerHTML = '';

    LocalState.savedTrees.forEach((state, i) => {
      const element = document.createElement('div');
      element.classList.add('saved-trees__item');
      element.dataset.control = String(i);
      element.style.backgroundImage = `url(./assets/bg/${state.background}.webp)`;

      const tree: HTMLImageElement = document.createElement('img');
      tree.classList.add('christmas-tree_mini');
      tree.src = `./assets/tree/${state.tree}.webp`;
      element.append(tree);
      document.querySelector('.saved-trees')!.append(element);
    });
  }
}
