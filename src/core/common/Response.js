/* eslint-disable id-length */

/**
 * This class make a express centralized response method
 * this method is: res.api.send, injected in express response
 * and can be used in any middlewares
 */

import * as HttpStatus from 'http-status-codes';
import _ from 'lodash';

export default class Response {


    /**
     * @name setApp
     * @description Inject the send method in Express, Inject response codes.
     * @public
     *
     * @param {Express} app
     *
     */
    setApp(app) {
        app.use((req, res, next) => {
            res.api = {
                res     : res,
                req     : req,
                send    : Response.send,
                codes   : HttpStatus
            };
            next()
        })
    }


    /**
     * @name send
     * @description Use express to send HTTP response in JSON
     * @static
     *
     * @param {Object} data
     * @param {number} responseCode
     * @param {Object} metadata
     * @param {string} customMessage
     *
     * @returns {*}
     *
     */
    static send(data, responseCode, metadata = {}, customMessage = null) {

        // Send response to request
        return this.res
            .status(responseCode)
            .json(
                {
                    code    : responseCode,
                    data    : data,
                    message : customMessage ? customMessage : Response._getStatusMessage(responseCode),
                    metadata: Response._generateResponseMetadata(this.req, metadata)
                }
            );

    }


    /**
     * @name _getStatusMessage
     * @description Return default message of status codes
     * @private
     *
     * @param {number} statusCode
     *
     * @returns {string}
     *
     */
    static _getStatusMessage(statusCode) {
        return Object
            .keys(HttpStatus)[Object.values(HttpStatus).indexOf(statusCode)]
            .toLowerCase();
    }


    /**
     * @name _generateResponseMetadata
     * @description Generate metadata for all responses
     * @private
     *
     * @param {Object} expressReq
     * @param {Object} customMetadata
     *
     * @returns {Object}
     *
     */
    static _generateResponseMetadata(expressReq, customMetadata = {}) {

        // Default response metadata
        // Increment default fields here
        const defaultMetadata = {
            responseAt  : new Date().toISOString(),
            method      : expressReq.method,
            route       : expressReq.originalUrl
        };

        // Return merge of custom and default metadata
        return _.merge(defaultMetadata, customMetadata);
    }
}