/**
 * Use this class for all methods that synchronize and set routes for express app
 */
import path     from 'path';
import fs       from 'fs'
import {logger} from './Logs';


export default class Routes {


    constructor() {
        this.apiPath = path.join(__dirname, '../../api/resources/');
    }


    /**
     * @name syncRoutes
     * @description Synchronize routes for express app
     *
     * @param {Express} app
     *
     */
    syncRoutes(app, verbose = true) {

        // Regex for detect hidden paths and files in unix and unix-like systems
        const unixHidden = new RegExp(/^\..*/);

        fs.readdirSync(this.apiPath)
            .forEach((module) => {

                try {

                    // Module index file, should exists to import
                    const moduleIndex = path.join(this.apiPath, `/${module}/_index.js`);

                    // Load module if path is not hidden and index file exists
                    if (!unixHidden.test(module.toString()) && fs.existsSync(moduleIndex)) {
                        require(moduleIndex).default(app);

                        if (verbose) {
                            logger.debug(`[ROUTES] Loaded '${module}' resource`)
                        }

                    }

                } catch (err) {
                    throw err;
                }

            }
        );


        /**
         * Resource not exists
         */
        app.use('*', (req, res) => {
            return res.api.send(null, res.api.codes.OK, null, 'unknown_resource');
        });


        /**
         * Handle any others Errors
         */
        app.use((err, req, res, next) => {
            if (err) {
                return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
            }
            next();
        });


        /**
         * Emit app started completely
         */
        app.emit('app_started');

    }

}