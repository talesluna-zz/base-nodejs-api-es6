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
     * @description Return a example message
     * @returns {string}
     *
     */
    public getExample(): string {
        return 'This is a example :)';
    }

}

export default new ExampleService();