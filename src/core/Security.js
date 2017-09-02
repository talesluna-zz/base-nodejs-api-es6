import helmet from 'helmet';
import crypto from 'crypto';

export default class Security {

    makeSecure(app) {

        // 1 Day in seconds
        const oneDay = 86400;

        // HTKP Keys
        const hpkpKeys = [
            this.createSha256Time(),
            this.createSha256Time()
        ];

        // Require HTTPS
        app.use(helmet.hsts({
            maxAge: oneDay
        }));

        // Prevent MITM (Man in the middle attack)
        app.use(helmet.hpkp({
            maxAge: oneDay,
            sha256s: hpkpKeys
        }));

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

    /**
     * Create random + time sha256|base64 digest
     * @returns {Buffer | string}
     */
    createSha256Time() {
        return crypto.createHash('sha256')
            .update((new Date().getTime() * Math.random()).toString())
            .digest('base64')
    }
}