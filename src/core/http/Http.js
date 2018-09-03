import https    from 'https';
import Ssl      from './SSL';
import {logger} from '../common/Logs';


/**
 * @class Http
 * @description Manage app HTTP server
 *
 */
export default class Http extends Ssl {

    constructor() {
        super();

        // Server configuration by environment
        this.config = process.env.server;

        // Server instance
        this.instance = null;

    }


    /**
     * @name startServer
     * @description Start HTTP/HTTPS server, serving web server at defined port.
     * @public
     *
     * @param {*} app - express app
     *
     * @returns {Promise}
     */
    startServer(app) {
        return new Promise((resolve, reject) => {
            try {

                // Common server instance, express app
                this.instance = app;


                // If SSL has defined, use HTTPS
                if (this.config.ssl && this.config.ssl.enable) {
                    this.instance =  https.createServer(this.getSSL(this.config.ssl), app)
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
     * @name _printBanner
     * @description Just print console banner :)
     * @private
     *
     * @param {*} config - server configuration {host: string, port: number, ssl: {...}}
     */
    _printBanner() {
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