// Joi Validate
import indexValidate from './_validates/index.validate';

// Example Middleware
import exampleSql from './sql';
import exampleMongo from './mongo';

export default (route) => {

    /**
     *  You should put the module routes with middlewares here
     */

    // Do this
    route.get('/sql', indexValidate, exampleSql);
    route.get('/mongo', indexValidate, exampleMongo);

    // Do not this
    route.get(
        [
            '/',
            '/:name'
        ],
        (req, res) => {
            res.api.send('Hello ' + (req.params.name ? req.params.name : 'anonymous'), res.api.codes.OK)
        }
    );
};