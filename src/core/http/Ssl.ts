import fs from 'fs';

/**
 * @description Configure SSL for HTTP server
 */
export default class Ssl {

    /**
     * @description Create and return SSL config object
     *
     * @returns {*}
     * @param {*} config
     */
    protected getSSL(config: any) {

        // Verify integrity of SSL configuration
        if (!config || !config.privateKey || !config.certificate) {
            throw Error('Invalid SSL configuration!');
        }

        return {
            key                 : this._readSSLFiles(config.privateKey),
            cert                : this._readSSLFiles(config.certificate),
            requestCert         : true,
            rejectUnauthorized  : false
        }
    }

    /**
     * @description Read private key and certificate files
     *
     * @returns {Buffer | string | (string | Buffer)}
     * @param {string} filePath
     */
    private _readSSLFiles(filePath: string): Buffer | string {

        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf-8');
        }

        // Throw error if file to ssl key or crt not exists
        throw Error(`[SSL Error] File Not Found - ${filePath}`)
    }
}