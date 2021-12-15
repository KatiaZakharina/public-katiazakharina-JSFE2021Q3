import News from './news/news';
import Sources from './sources/sources';
import ThemeController from './theme/theme';
import { NewsResponse, SourcesResponse } from '../constants';

export class AppView {
    private news: News;
    private sources: Sources;
    private themeController: ThemeController;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.themeController = new ThemeController();
    }

    drawNews(data: NewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
        if (this.themeController.animationID) {
            this.themeController.clearSnow();
            this.themeController.snow();
        }
    }

    drawSources(data: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
