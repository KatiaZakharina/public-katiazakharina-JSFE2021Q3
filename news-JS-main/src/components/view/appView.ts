import News from './news/news';
import Sources from './sources/sources';
import ThemeController from './theme/theme';
import { NewsResponse, SourcesResponse, NewsObject, SourcesObject } from '../constants';
import { IAppView } from '../classes';

export class AppView implements IAppView {
    private news: News;
    private sources: Sources;
    private themeController: ThemeController;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.themeController = new ThemeController();
    }

    drawNews(data: NewsResponse): void {
        const values: Array<NewsObject> = data?.articles ? data?.articles : [];
        this.news.draw(values);
        if (this.themeController.animationID) {
            this.themeController.clearSnow();
            this.themeController.snow();
        }
    }

    drawSources(data: SourcesResponse): void {
        const values: Array<SourcesObject> = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
