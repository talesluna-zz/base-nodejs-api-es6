import HttpStatus from 'http-status-codes';
import {merge} from 'lodash';
import { Application, Request, Response as ExpressResponse, NextFunction } from 'express';


/**
 * @description
 * This class make a express centralized response method
 * this method is: res.api.send, injected in express response
 * and can be used in any middlewares
 */
export default class Response {


    /**
     * @name setApp
     * @description Inject the send method in Express, Inject response codes.
     * 
     *
     * @param {Application} app
     *
     */
    public setApp(app: Application) {
        app.use((req: Request, res: ExpressResponse, next: NextFunction) => {
            res.api = {
                res     : res,
                req     : req,
                send    : Response.send,
                codes   : HttpStatus
            }
            next()
        })
    }


    /**
     * @name send
     * @description Use express to send HTTP response in JSON
     *
     * @param {any[]|string|{[prop: string]: any}} data
     * @param {number} responseCode
     * @param {*} metadata
     * @param {string} customMessage
     *
     * @returns {*}
     *
     */
    static send(
        data            : null | any[] | string | {[prop: string]: any},
        responseCode    : number,
        metadata        : null | {[prop: string]: any} = {},
        customMessage   : string = ''
    ) {

        const _self: any = this;

        // Send response to request
        return _self.res
            .status(responseCode)
            .json(
                {
                    code    : responseCode,
                    data    : data,
                    message : customMessage ? customMessage : Response.getStatusMessage(responseCode),
                    metadata: Response.generateResponseMetadata(_self.req, metadata)
                }
            );

    }


    /**
     * @name getStatusMessage
     * @description Return default message of status codes
     * 
     * @param {number} statusCode
     * @returns {string}
     *
     */
    static getStatusMessage(statusCode: number): string {
        const statusMessage = HttpStatus.getStatusText(statusCode).toLowerCase().replace(' ', '_');
        
        return statusMessage === 'server_error' ? `internal_${statusMessage}` : statusMessage;
    }


    /**
     * @name generateResponseMetadata
     * @description Generate metadata for all responses
     * 
     * @param {Request} expressReq
     * @param {*} customMetadata
     * @returns {*}
     *
     */
    static generateResponseMetadata(expressReq: Request, customMetadata: null | {[prop: string]: string} = {}) {

        // Default response metadata
        // Increment default fields here
        const defaultMetadata = {
            responseAt  : new Date().toISOString(),
            method      : expressReq.method,
            route       : expressReq.originalUrl
        };

        // Return merge of custom and default metadata
        return merge(defaultMetadata, customMetadata);
    }
}