import { LocalState } from '../../controller/localState';

export class Decoration {
  private treeType: HTMLElement | null;
  private treeBg: HTMLElement | null;
  private tree: HTMLImageElement | null;
  private treeWrapper: HTMLElement | null;

  constructor() {
    this.treeType = null;
    this.treeBg = null;
    this.tree = null;
    this.treeWrapper = null;
  }
  draw(): void {
    this.treeType = document.querySelector('.tree-type');
    this.treeBg = document.querySelector('.tree-background');
    this.tree = document.querySelector('.christmas-tree');
    this.treeWrapper = document.querySelector('.tree-wrapper');

    this.drawControl(4, this.treeType!, 'tree-type__item', 'tree');
    this.drawControl(8, this.treeBg!, 'tree-background__item', 'bg');
    this.drawSavedTrees();

    this.updateControl();

    this.treeType!.addEventListener('click', (e) => {
      if (!this.selectEl('tree-type__item', e)) return;
      (document.querySelector('.christmas-tree') as HTMLImageElement)!.src = (
        e.target as HTMLElement
      ).style.backgroundImage.match(/\(["|'](.*)["|']\)/)![1];
      LocalState.decoration.tree = +(e.target as HTMLElement).dataset.control!;
    });

    this.treeBg!.addEventListener('click', (e) => {
      if (!this.selectEl('tree-background__item', e)) return;
      (document.querySelector('.tree-wrapper') as HTMLElement)!.style.backgroundImage = (
        e.target as HTMLElement
      ).style.backgroundImage;
      LocalState.decoration.background = +(e.target as HTMLElement).dataset.control!;
    });
  }

  drawControl(n: number, parentEl: Element, className: string, folder?: string): void {
    for (let i = 1; i <= n; i++) {
      const element = document.createElement('div');
      element.classList.add(className);
      element.dataset.control = String(i);
      if (folder) element.style.backgroundImage = `url(./assets/${folder}/${i}.webp)`;
      parentEl?.append(element);
    }
  }

  updateControl() {
    this.tree!.src = `./assets/tree/${LocalState.decoration.tree}.webp`;
    this.treeWrapper!.style.backgroundImage = `url(./assets/bg/${LocalState.decoration.background}.webp)`;

    this.treeType?.children[LocalState.decoration.tree - 1].classList.add('active');
    this.treeBg?.children[LocalState.decoration.background - 1].classList.add('active');
  }

  selectEl(className: string, e: Event): boolean {
    console.log((e.target as HTMLElement).classList.contains(className));
    if (!(e.target as HTMLElement).classList.contains(className)) return false;

    const treeTypeEls = document.querySelectorAll(`.${className}`);
    treeTypeEls.forEach((el) => el.classList.remove('active'));

    (e.target as HTMLElement).classList.add('active');
    return true;
  }

  clearControl() {
    Array.from(this.treeBg!.children).forEach((bg) => (bg as HTMLElement).classList.remove('active'));
    Array.from(this.treeType!.children).forEach((type) => (type as HTMLElement).classList.remove('active'));
  }

  drawSavedTrees() {
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

    document.querySelector('.saved-trees')?.addEventListener('click', (e: Event) => {
      if (!(e.target as HTMLElement).classList.contains('saved-trees__item')) return;
      this.restoreTreeState(+(e.target as HTMLElement).dataset.control!);
    });
  }

  restoreTreeState(num: number) {
    console.log(LocalState.savedTrees[num - 1]);
  }
}
