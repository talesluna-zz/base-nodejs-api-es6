import Response from '../../core/Response';

import indexValidate from './_validates/index.validate';

export default (route) => {
    // You should put the module routes with middlewares here
    route.get('/', indexValidate, (req, res) => {
        return Response.send(res, 200, 'welcome', true, 'index');
    })
};