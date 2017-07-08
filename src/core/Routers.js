/**
 * Use this class for all methods that synchronize and set routes for express app
 */
import path from 'path';
import fs   from 'fs'

export default class Routers {

    syncRouters(app) {
        fs.readdirSync(path.join(__dirname, '../api'))
            .forEach((module) => {
                require(path.join(__dirname, `../api/${module}/_index`)).default(app);
            });

    }
}