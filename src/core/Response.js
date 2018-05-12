/* eslint-disable id-length */
/**
 * This class make a express centralized response method
 * this method is: res.api.send, injected in express response
 * and can be used in any middlewares
 */

import * as HttpStatus from 'http-status-codes';
import _ from 'lodash';

class Response {

    constructor() {
    }

    /**
     * Inject the send method in Express
     * Inject response codes in
     */
    setApp(app) {
        app.use((req, res, next) => {
            res.api = {
                res: res,
                req: req,
                send : Response.send,
                codes: HttpStatus
            };
            next()
        })
    }

    /**
     * Use express an send HTTP response in JSON
     * @param data
     * @param responseCode
     * @param metadata
     * @param customMessage
     */
    static send(data, responseCode, metadata = {}, customMessage = null) {
        // Send response to request
        return this.res.status(responseCode).json(
            {
                code    : responseCode,
                data    : data,
                message : customMessage ? customMessage : Response._getStatusMessage(responseCode),
                metadata: Response._generateResponseMetadata(metadata)
            }
        );
    }

    /**
     * Return default message of status codes
     * @param statusCode
     * @returns {string}
     * @private
     */
    static _getStatusMessage(statusCode) {
        return Object
            .keys(HttpStatus)[Object.values(HttpStatus).indexOf(statusCode)]
            .toLowerCase();
    }

    /**
     * Generate metadata for all responses
     * @private
     */
    static _generateResponseMetadata(customMetadata = {}) {

        // Default response metadata
        // Increment default fields here
        const defaultMetadata = {
            responseAt: new Date().toISOString()
        };

        // Return merge of custom and default metadata
        return _.merge(defaultMetadata, customMetadata);
    }
}

export default Response;