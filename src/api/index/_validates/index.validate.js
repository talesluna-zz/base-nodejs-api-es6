import Joi from 'joi';

export default (req, res, next) => {

    Joi.object(
        {
            age: Joi.number()
        }
    ).validate(req.body, err => {
        if (err)
            return res.status(400).json(
                {
                    status : false,
                    code   : 400,
                    data   : '' + err.message,
                    message: 'body_validate_error'
                }
            );
    });

    Joi.object(
        {
            name: Joi.string()
        }
    ).validate(req.query, err => {
        if (err)
            return res.status(400).json(
                {
                    status : false,
                    code   : 400,
                    data   : '' + err.message,
                    message: 'query_validate_error'
                }
            );
    });

    next();
}