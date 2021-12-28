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

    document.querySelector('.drag-area')?.addEventListener('click', (e: Event) => {
      e.preventDefault();
    });

    this.drawControl(4, this.treeType!, 'tree-type__item', 'tree');
    this.drawControl(8, this.treeBg!, 'tree-background__item', 'bg');

    this.drawGarland();

    this.updateControl();

    this.treeType!.addEventListener('click', (e: Event) => {
      if (!this.selectEl('tree-type__item', e)) return;
      (document.querySelector('.christmas-tree') as HTMLImageElement)!.src = (
        e.target as HTMLElement
      ).style.backgroundImage.match(/\(["|'](.*)["|']\)/)![1];
      LocalState.decoration.tree = +(e.target as HTMLElement).dataset.control!;
    });

    this.treeBg!.addEventListener('click', (e: Event) => {
      if (!this.selectEl('tree-background__item', e)) return;
      (document.querySelector('.tree-wrapper') as HTMLElement)!.style.backgroundImage = (
        e.target as HTMLElement
      ).style.backgroundImage;
      LocalState.decoration.background = +(e.target as HTMLElement).dataset.control!;
    });

    document.querySelector('.lights')!.addEventListener('click', this.controlLights.bind(this));
  }

  drawControl(n: number, parentEl: Element, className: string, folder?: string): void {
    parentEl.innerHTML = '';
    for (let i = 1; i <= n; i++) {
      const element = document.createElement('div');
      element.classList.add(className);
      element.dataset.control = String(i);
      if (folder) element.style.backgroundImage = `url(./assets/${folder}/${i}.webp)`;
      parentEl?.append(element);
    }
  }

  controlLights(e: Event): void {
    if (!(e.target as HTMLElement).classList.contains('lights__item')) return;
    LocalState.decoration.lights = +(e.target as HTMLElement).dataset.control!;
    this.drawGarland();
  }

  drawGarland(): void {
    const num = [6, 11, 13, 13, 19];
    const garlands = document.querySelector('.garlands');
    garlands!.innerHTML = '';

    num.forEach((num) => {
      const garland = document.createElement('li');
      garland.classList.add('garland');

      for (let i = 0; i < num; i++) {
        const garlandItem = document.createElement('li');
        garlandItem.classList.add('garland__item');
        garland.append(garlandItem);
      }

      garlands?.append(garland);
    });

    switch (LocalState.decoration.lights) {
      case 1:
        this.setCSSVGarlandVars(['#fdd700', '#fd0000', '#2199eb', '#08aa05']);
        break;
      case 2:
        this.setCSSVGarlandVars(['#fdd700', '#fdd700', '#fdd700', '#fdd700']);
        break;
      case 3:
        this.setCSSVGarlandVars(['#fd0000', '#fd0000', '#fd0000', '#fd0000']);
        break;
      case 4:
        this.setCSSVGarlandVars(['#2199eb', '#2199eb', '#2199eb', '#2199eb']);
        break;
      case 5:
        this.setCSSVGarlandVars(['#08aa05', '#08aa05', '#08aa05', '#08aa05']);
        break;
      default:
        break;
    }
  }

  setCSSVGarlandVars(arr: Array<string>): void {
    arr.forEach((value, index) => {
      document.documentElement.style.setProperty(`--garland-color${index + 1}`, value);
    });
  }

  updateControl(): void {
    this.tree!.src = `./assets/tree/${LocalState.decoration.tree}.webp`;
    this.treeWrapper!.style.backgroundImage = `url(./assets/bg/${LocalState.decoration.background}.webp)`;

    this.treeType?.children[LocalState.decoration.tree - 1].classList.add('active');
    this.treeBg?.children[LocalState.decoration.background - 1].classList.add('active');
  }

  selectEl(className: string, e: Event): boolean {
    if (!(e.target as HTMLElement).classList.contains(className)) return false;

    const treeTypeEls = document.querySelectorAll(`.${className}`);
    treeTypeEls.forEach((el) => el.classList.remove('active'));

    (e.target as HTMLElement).classList.add('active');
    return true;
  }

  clearControl(): void {
    Array.from(this.treeBg!.children).forEach((bg) => (bg as HTMLElement).classList.remove('active'));
    Array.from(this.treeType!.children).forEach((type) => (type as HTMLElement).classList.remove('active'));
  }
}
