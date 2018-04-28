import Joi from 'joi';

export default (req, res, next) => {

    // Regex for valid mongo ObjectID
    const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

    Joi
        .object(
            {
                name: Joi.string().required(),
                duration: Joi.number().required(),
                albumName: Joi.string().required(),
                _artistId: Joi.string().required()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}