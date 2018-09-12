declare const process: {env: {[prop: string]: any}};

import { Application, Request, Response, NextFunction } from 'express';

/**
 * @description methods that manage cors and headers
 */
export default class Headers {

    /**
     * @description sync defined header to express app
     *
     * @param {Application} app
     * @param {*} headers
     *
     */
    public setHeaders(app: Application) {

        const headers = Object.assign(
            process.env.server.headers.cors,
            process.env.server.headers.others
        );

        Object
        .keys(headers)
        .forEach((header) => {
            app.use((req: Request, res: Response, next: NextFunction) => {
                res.header(header, headers[header]);
                next();
            });
        });
    }
}
