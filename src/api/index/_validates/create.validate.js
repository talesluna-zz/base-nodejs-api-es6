import Joi from 'joi';

export default (req, res, next) => {
    const schema = Joi.object({

    });

    schema.validate(req.body, {abortEarly: false}, err => {
        if (err)
            return res
                .status(400)
                .json({
                    ok     : false,
                    message: 'data_validate_error',
                    data   : err
                });

        next();
    });
}