import helmet from 'helmet';


/**
 * @class Security
 * @description Manage helmet uses
 *
 */
export default class Security {


    /**
     * @name makeSecure
     * @description Use Helmet to make ExpressJS app more secure
     * @public
     *
     * @param {Express} app
     * @param {Array} hpkpKeys
     *
     */
    makeSecure(app) {

        const hpkpKeys = process.env.server.ssl.hpkpKeys || [];

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
                sha256s : null
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
        }))
    }
}