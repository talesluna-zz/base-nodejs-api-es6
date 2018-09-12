/* tslint:disable:newline-per-chained-call */

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {

    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    Joi
    .object(
        {
            name     : Joi.string(),
            duration : Joi.number(),
            albumName: Joi.string(),
            _artistId: Joi.string().regex(objectIdRegex)
        }
    )
    .validate(req.body, err => {

        if (err) {
            return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);
        }

        next();
    });

};
