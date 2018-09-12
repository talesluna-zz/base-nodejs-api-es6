declare const process: {env: {[prop: string]: any}};

import helmet           from 'helmet';
import { Application }  from 'express';


/**
 * @description Manage helmet uses
 */
export default class Security {


    /**
     * @description Use Helmet to make ExpressJS app more secure
     *
     * @param {Application} app
     *
     */
    public makeSecure(app: Application) {

        const hpkpKeys: string[] = process.env.server.ssl.hpkpKeys || [];

        // 1 Day in seconds
        const oneDay = 86400;


        // Require HTTPS
        app.use(helmet.hsts({
            maxAge: oneDay
        }));


        // Prevent MITM (Man in the middle attack)
        if (hpkpKeys.length > 2) {
            app.use(helmet.hpkp({
                maxAge  : oneDay,
                sha256s : []
            }));
        }


        // No referrer
        app.use(helmet.referrerPolicy({
            policy: 'same-origin'
        }));


        // Block IE download
        app.use(helmet.ieNoOpen());


        // Block iframe usage (clickjacking)
        app.use(helmet.frameguard({
            action: 'same-origin'
        }));
    }
}
