import Response from '../../core/Response';

export default (route) => {
    // You should put the module routes with middlewares here
    route.get('/', (req, res) => {
        return Response.send(res, 200, 'welcome', true, 'index');
    })
};