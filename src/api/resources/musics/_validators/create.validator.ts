import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {

    // Regex for valid mongo ObjectID
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    Joi
        .object(
            {
                name     : Joi.string(),
                duration : Joi.number(),
                albumName: Joi.string(),
                _artistId: Joi.string().regex(objectIdRegex).required()
            }
        )
        .validate(req.body, err => {

            if (err) {
                return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);
            }

            next();
        });
}