import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '8265ea701d024cb795c3f3f5072c63b5', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
