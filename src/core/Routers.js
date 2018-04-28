/**
 * Use this class for all methods that synchronize and set routes for express app
 */
import path     from 'path';
import fs       from 'fs'

export default class Routers {

    /**
     * Synchronize routes for express app
     * @param app
     */
    syncRouters(app) {

        // Regex for detect hidden paths and files in unix and unix-like systems
        const unixHidden = new RegExp(/^\..*/);

        fs.readdirSync(path.join(__dirname, '../api'))
            .forEach((module) => {

                // Module index file, should exists to import
                const moduleIndex = path.join(__dirname, `../api/${module}/_index.js`);

                // Load module if path is not hidden and index file exists
                if (!unixHidden.test(module.toString()) && fs.existsSync(moduleIndex))
                    require(moduleIndex).default(app);

            });

        /**
         * Route Not Found Error
         */
        app.get('*', function(req, res){
            res.api.send(null, res.api.codes.NOT_FOUND, null, 'route_not_found');
        });

        /**
         * Handle any others Errors
         */
        app.use((err, req, res, next) => {
            if (err) {
                res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
            }
            next();
        });

        /**
         * Emit app started completely
         */
        app.emit('app_started');
    }
}