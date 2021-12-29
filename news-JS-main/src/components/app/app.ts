import { NewsResponse, SourcesResponse } from '../constants';
import { IApp } from './../classes';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import '../view/sources/sources';

class App implements IApp {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data))
            );
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
