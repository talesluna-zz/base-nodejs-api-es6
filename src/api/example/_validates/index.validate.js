import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                where: Joi.any(),
                select: Joi.any(),
                project: Joi.any(),
                offset: Joi.any(),
                limit: Joi.number().max(2).required()
            }
        )
        .validate(req.query, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.OK);

            next();
        });
}