declare const process: {env: {[prop: string]: any}};

import bodyParser      from 'body-parser';
import cookieParser    from 'cookie-parser';
import compression     from 'compression';
import RequestQuery    from './RequestQuery';
import { Application } from 'express';


/**
 * @description Manage express middlewares
 */
export default class Middlewares extends RequestQuery {

    private defaultMiddlewares: any[];

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
        ];

    }


    /**
     * @description Use default and all passed middlewares in express app
     *
     * @param {*} app - Express app
     * @param {*} customMiddlewares - Array with your custom middlewares to set in express
     */
    public useMiddlewares(app: Application, customMiddlewares: any[] = []) {

        // Use middleares
        this.defaultMiddlewares
            .concat(customMiddlewares)
            .forEach(middleware => app.use(middleware));

    }

}
