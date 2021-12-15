import { APIOptions, HTTPMethodStrings, Endpoints, SourcesResponse, NewsResponse } from '../constants';
class Loader {
    private baseLink: string;
    private options: { [apiKey: string]: string };
    constructor(baseLink: string, options: { [apiKey: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: Endpoints,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: APIOptions | {}, endpoint: string) {
        const urlOptions = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const getKeyValue = <T, K extends keyof T>(obj: T, keyName: K): T[K] => obj[keyName];
            url += `${key}=${getKeyValue(urlOptions, key)}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: HTTPMethodStrings,
        endpoint: string,
        callback: (data?: SourcesResponse | NewsResponse) => void,
        options = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: SourcesResponse | NewsResponse) => {
                return callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
