import fs from 'fs';

/**
 * @class Ssl
 * @description Configure SSL for HTTP server
 *
 */
export default class Ssl {

    /**
     * @name getSSL
     * @description Create and return SSL config object
     * @returns {Object}
     *
     * @param {Object} config
     *
     */
    getSSL(config) {

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
     * @name _readSSLFiles
     * @description Read private key and certificate files
     * @private
     * @returns {Buffer | string | (string | Buffer)}
     *
     * @param {string} filePath
     *
     */
    _readSSLFiles(filePath) {

        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf-8');
        }

        // Throw error if file to ssl key or crt not exists
        throw Error(`[SSL Error] File Not Found - ${filePath}`)
    }
}