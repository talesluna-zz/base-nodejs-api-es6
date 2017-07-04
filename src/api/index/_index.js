// Joi Validate

import indexValidate from './_validates/index.validate';

// Welcome Middleware
import welcome from './example';

export default (route) => {
    // You should put the module routes with middlewares here
    route.get('/', indexValidate, welcome)
};