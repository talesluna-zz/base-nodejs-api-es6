import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser'
import compression  from 'compression';
import RequestQuery from './RequestQuery';


/**
 * @class Middlewares
 * @description Manage express middlewares
 *
 */
export default class Middlewares extends RequestQuery {

    constructor() {
        super();


        // Load compression config by env
        const compressionConfig = process.env.server.compression || {};


        // Define default middlwares
        this.defaultMiddlewares = [
            compression(compressionConfig),
            cookieParser(),
            bodyParser.json(),
            this.parseQuery
        ]

    }


    /**
     * @name useMiddlewares
     * @description Use default and all passed middlewares in express app
     * @public
     *
     * @param {*} app - Express app
     * @param {*} customMiddlewares - Array with your custom middlewares to set in express
     *
     */
    useMiddlewares(app, customMiddlewares = []) {

        // Use middleares
        this.defaultMiddlewares
            .concat(customMiddlewares)
            .forEach(middleware => app.use(middleware));

    }

}