import helmet from 'helmet';

export default class Security {

    /**
     * Use Helmet to make ExpressJS app more secure
     * @param app
     * @param hpkpKeys
     */
    makeSecure(app, hpkpKeys = []) {

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