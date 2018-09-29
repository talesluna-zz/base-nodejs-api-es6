import { Application, Request, Response, Router } from 'express';
import { logger }   from './Logs';
import path         from 'path';
import fs           from 'fs';


/**
 * @description Use this class for all methods that synchronize and set routes for express app
 */
export default class Routes {

    private resourcesPath: string;


    constructor() {
        this.resourcesPath = path.join(__dirname, '../../api/resources/');
    }


    /**
     * @description Synchronize routes for express app
     *
     * @param {Application} app
     *
     */
    public syncRoutes(app: Application, verbose = true) {

        // Regex for detect hidden paths and files in unix and unix-like systems
        const unixHidden = new RegExp(/^\..*/);

        fs.readdirSync(this.resourcesPath)
        .forEach(module => {

            try {

                // Module index file, should exists to import
                const moduleIndex = path.join(this.resourcesPath, `/${module}/_index`);

                // Load module if path is not hidden and index file exists
                if (
                    !unixHidden.test(module.toString()) &&
                    (fs.existsSync(`${moduleIndex}.ts`) || fs.existsSync(`${moduleIndex}.js`))
                ) {

                    // Instance of a router for module
                    const routerInstance = Router({});

                    // Require module with this router instance
                    const moduleRoute = require(moduleIndex).default;

                    // Sync module route with router instance
                    if (moduleRoute.prefix && moduleRoute.routes) {

                        moduleRoute.routes(routerInstance);

                        // Define resource prefix
                        const prefix = (moduleRoute.prefix || module)
                            .toString()
                            .toLowerCase();

                        // Use router instance in express aplication
                        app.use(`/${prefix}`, routerInstance);

                        if (verbose) {
                            logger.debug(`[ROUTES] Resource '${module}' has loaded in '/${prefix}' route.`);
                        }
                    }


                }

            } catch (err) {
                throw err;
            }

        });


        /**
         * Resource not exists
         */
        app.use('*', (req: Request, res: Response) => {
            return res.api.send(null, res.api.codes.BAD_REQUEST, null, 'unknown_resource');
        });


        /**
         * Handle any others Errors
         */
        app.use((err: any, req: Request, res: Response, next: VoidFunction) => {
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
