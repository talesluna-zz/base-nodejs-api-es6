import fs       from 'fs';
import https    from 'https';

export default class SSL {

    /**
     * Create and return HTTPS server with SSL configurations
     * @param app
     * @param config
     * @returns {"http".Server | "http2".Http2Server}
     */
    getHTTPSServer(app, config) {

        // Verify integrity of SSL configuration
        if (!config || !config.privateKey || !config.certificate) {
            throw Error('Invalid SSL configuration!');
        }

        return https.createServer(
            {
                key                 : this._readCertAndKey(config.privateKey),
                cert                : this._readCertAndKey(config.certificate),
                requestCert         : true,
                rejectUnauthorized  : false
            },
            app
        )
    }

    /**
     * Read private key and certificate files
     * @param file
     * @returns {Buffer | string | (string | Buffer)}
     * @private
     */
    _readCertAndKey(file) {
        if (fs.existsSync(file))
            return fs.readFileSync(file, 'utf-8');

        // Throw error if file to ssl key or crt not exists
        throw Error('[SSL Error] File Not Found - ' + file)
    }
}