import './sources.css';
import { SourcesObject } from '../../constants';
import { ISources } from '../../classes';

class Sources implements ISources {
    draw(data: Array<SourcesObject>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: Element | null = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp === null) return;

        data.forEach((item) => {
            const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLTemplateElement;

            sourceClone.querySelector('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
