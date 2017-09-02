import Joi from 'joi';

export default (req, res, next) => {

    Joi.object(
        {
            name: Joi.number()
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

    next();
}