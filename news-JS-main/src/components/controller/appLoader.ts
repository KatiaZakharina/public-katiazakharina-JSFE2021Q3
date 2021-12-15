import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '17956ac265ed4035a346c5235b2a676e', //'8265ea701d024cb795c3f3f5072c63b5',
        });
    }
}

export default AppLoader;
