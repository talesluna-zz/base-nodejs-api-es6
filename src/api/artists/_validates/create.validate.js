import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                name: Joi.string().max(50).required(),
                genres: Joi.array().items(
                    Joi.string()
                ).min(1).required(),
                originLocale: Joi.string(),
                originYear: Joi.number().min(1500).max(new Date().getFullYear())
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}