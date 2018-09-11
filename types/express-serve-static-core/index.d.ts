import * as HttpStatus from 'http-status-codes';
import * as core from 'express-serve-static-core';
import { Request, NextFunction } from 'express';
import Response from '../../src/core/common/Response';

// Override express types
declare module 'express-serve-static-core' {

    interface Response {
        api: {
            req     : Request,
            res     : core.Response,
            send    : typeof Response.send,
            codes   : typeof HttpStatus
        }
    }

}