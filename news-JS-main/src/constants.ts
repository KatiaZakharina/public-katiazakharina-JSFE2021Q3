export interface APIOptions {
    [options: string]: {
        sources: string;
    };
}
export enum HTTPMethod {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE',
}

export interface Endpoints {
    endpoint: string;
    options?:
        | {}
        | {
              sources: string;
          };
}
export interface SourcesObject {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}
export interface SourcesResponse {
    sources: Array<SourcesObject>;
    status: string;
}

export interface NewsObject {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
export interface NewsResponse {
    articles: Array<NewsObject>;
    status: string;
    totalResult: number;
}
