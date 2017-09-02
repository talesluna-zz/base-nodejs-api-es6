/**
 * Use this class for all methods that synchronize and set routes for express app
 */
import Response from '../core/Response';
import path     from 'path';
import fs       from 'fs'

export default class Routers {

    syncRouters(app) {
        fs.readdirSync(path.join(__dirname, '../api'))
            .forEach((module) => {
                require(path.join(__dirname, `../api/${module}/_index`)).default(app);
            });

        /**
         * Route Not Found Error
         */
        app.get('*', function(req, res){
            Response.send(res, null, Response.NOT_FOUND, 'route_not_found');
        });

        /**
         * Handle any others Errors
         */
        app.use((err, req, res, next) => {
            if (err) {
                Response.send(res, err.message, Response.INTERNAL_SERVER_ERROR);
            }
            next();
        });
    }
}