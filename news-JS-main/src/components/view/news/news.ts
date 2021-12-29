import './news.css';
import { NewsObject } from '../../constants';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { INews } from '../../classes';

class News implements INews {
    constructor() {
        AOS.init({
            delay: 300,
            duration: 1000,
        });
    }
    draw(data: Array<NewsObject>): void {
        const news: Array<NewsObject> = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: Element | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector('.news__item')!.classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title')!.textContent = item.title;
            newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector('.news__description-content')!.textContent = item.description;
            newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);

            newsClone.querySelector('.news__item')!.setAttribute('data-aos', 'fade-up');
            newsClone.querySelector('.news__item')!.setAttribute('data-aos-anchor-placement', 'top-bottom');

            fragment.append(newsClone);
        });

        document.querySelector('.news')!.innerHTML = '';
        document.querySelector('.news')!.appendChild(fragment);
    }
}

export default News;
