// Joi Validate

import exampleValidate from './_validates/example.validate';

// Welcome Middleware
import example from './example';

export default (route) => {
    // You should put the module routes with middlewares here
    route.get('/', exampleValidate, example)
};