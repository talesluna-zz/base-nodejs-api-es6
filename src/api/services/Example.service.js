import Service from './Service';


/**
 * @class ExampleService
 * @description Example of another service extended from Service
 *
 */
class ExampleService extends Service {
    constructor() {
        super();
    }

    /**
     * @name getExample
     * @description Return a example message
     * @public
     *
     * @returns {string}
     *
     */
    getExample() {
        return 'This is a example :)';
    }
}

export default new ExampleService();