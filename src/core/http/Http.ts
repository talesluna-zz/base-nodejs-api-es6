declare const process: {env: {[prop: string]: any}}

import https, { Server as HttpsServer }    from 'https';
import http, {Server as HttpServer}         from 'http';
import Ssl                                  from './SSL';
import {logger}                             from '../common/Logs';
import { Application }                      from 'express';


/**
 * @description Manage app HTTP server
 */
export default class Http extends Ssl {

    private config: any;
    private instance: HttpServer | HttpsServer | null

    constructor() {
        super();

        // Server configuration by environment
        this.config = process.env.server;
        this.instance = null;
    }


    /**
     * @description Start HTTP/HTTPS server, serving web server at defined port.
     *
     * @param {*} app - express app
     *
     * @returns {Promise}
     */
    public startServer(app: Application) {
        return new Promise((resolve, reject) => {
            try {

                // Common server instance, express app


                // If SSL has defined use HTTPS, if not use HTTP
                if (this.config.ssl && this.config.ssl.enable) {
                    this.instance =  https.createServer(this.getSSL(this.config.ssl), app)
                } else {
                    this.instance = http.createServer(app)
                }


                // Listen server to defined host at defined port
                this.instance.listen(
                    this.config.port,
                    this.config.host,
                    () => {
                        this._printBanner();
                        resolve(true)
                    }
                )


            } catch (err) {
                reject(err)
            }

        })
    }


    /**
     * @description Just print console banner :)
     *
     * @param {*} config - server configuration {host: string, port: number, ssl: {...}}
     */
    private _printBanner() {
        if (process.env.app.verbose) {
            logger.info(`
                \r------------------------------------
                \r${process.env.app.name} \t(v${process.env.app.version})
                \r------------------------------------
                \rHOST => ${this.config.host}
                \rPORT => ${this.config.port}
                \rSSL  => ${this.config.ssl.enable ? 'YES (secure)' : 'NO'}
                \rENV  => ${process.env.envname}
    
                \r.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
                \r._._._._._._._._._._._._._._._._._._.
            `);
        }
    }
}