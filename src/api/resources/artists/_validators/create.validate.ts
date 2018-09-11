import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    Joi
        .object(
            {
                name        : Joi.string().max(50).required(),
                genres      : Joi.array().items(Joi.string()).min(1).required(),
                originLocale: Joi.string(),
                originYear  : Joi.number().min(1500).max(new Date().getFullYear())
            }
        )
        .validate(req.body, err => {

            if (err) {
                return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);
            }

            next();
        });
}