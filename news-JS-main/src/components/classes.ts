import { Endpoints, SourcesResponse, NewsResponse, NewsObject, SourcesObject } from './constants';

export interface IApp {
    start(): void;
}
export interface ILoader {
    getResp({ endpoint, options }: Endpoints, callback: () => void): void;
}
export interface IAppLoader extends ILoader {}

export interface IAppController extends ILoader {
    getSources(callback: (data?: SourcesResponse) => void): void;
    getNews(e: Event, callback: (data?: NewsResponse) => void): void;
}

export interface IAppView {
    drawNews(data: NewsResponse): void;
    drawSources(data: SourcesResponse): void;
}

export interface INews {
    draw(data: Array<NewsObject>): void;
}
export interface ISources {
    draw(data: Array<SourcesObject>): void;
}
export interface IThemeController {
    animationID: number | null;
    handleThemeChange(e: Event): void;
    handleThemeChange(e: Event): void;
    night(needClear: boolean): void;
    light(needClear: boolean): void;
    snow(): void;
}
