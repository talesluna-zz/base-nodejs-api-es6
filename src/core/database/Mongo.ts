import {
    defaultMongooseOptions,
    defaultSchemaOptions
}                               from '../../config/mongoose/mongoose.conf';
import Paginate                 from './Paginate';
import { logger }               from '../common/Logs';
import { dbs }                  from '../../config/models.conf';
import fs                       from 'fs';
import path                     from 'path';
import mongoose, { Mongoose }   from 'mongoose';
import { beautifyUnique }       from 'mongoose-beautiful-unique-validation';

/**
 * @description General methods for MongoDB databse
 */
export default class Mongo extends Paginate {


    /**
     * @description Connect mongodb database, accept callback for success
     *
     * @param {*} database
     * @param {Function} success
     */
    public connect(database: any, success: VoidFunction, error: Function = process.exit) {
        if (database.enabled) {
            return this.connectInMongoDB(database)
                .then(() => {
                    return success();
                })
                .catch((err: Error) => {

                    logger.debug(`[MongoDB Error] \n\n\t'${err.message}'\n\tEXIT\n`);

                    // Exit
                    return error(1);

                });
        }
    }


    /**
     * @description Define mongoose message by locale
     *
     * @param {*} localeObject
     */
    public setLocale(localeObject: any) {
        if (localeObject) {
            mongoose.Error.messages = localeObject;
        }
    }


    /**
     * @description Connect and sync mongodb schemas with mongoose
     *
     * @param {*} database
     * @returns {Connection}
     */
    private connectInMongoDB(database: any) {

        const mongooseIntance = new Mongoose();

        // Define if mongoose should show  or hide logs
        mongooseIntance.set('debug', database.logging);

        // Use promises
        mongooseIntance.Promise = global.Promise;

        // Inject paginate function in mongoose
        mongooseIntance.Model.paginate = this.mongoosePaginate;

        // Use plugin Beautify Unique in mongoose (for parse mongodb unique errors)
        mongooseIntance.plugin(beautifyUnique);

        // Set mongoose default options
        Object.keys(defaultMongooseOptions)
        .forEach((key: string) => {
            mongooseIntance.set(key, defaultMongooseOptions[key]);
        });

        // Synchronize models in dir to mongoose
        fs.readdirSync(path.join(__dirname, '../../api/models', database.dbname))
            .forEach((filename: string) => {

                // Define path for model script
                const schema = require(path.join(__dirname, '../../api/models/', database.dbname, filename)).default;

                // Merge default options with custom options
                const options = Object.assign(defaultSchemaOptions, schema.options);

                // Set schema configs
                Object.keys(options).forEach((key: string) => {
                    schema.set(key, options[key]);
                });

                // Import modal to mongoose istance
                mongooseIntance.model(schema.options.collection, schema);

            });


        // Save mongoose instance
        dbs[database.dbname] = mongooseIntance;

        // Return db connection
        return dbs[database.dbname].connect(this.createMongooseUri('mongodb', database));
    }


    /**
     * @description Create a connection URI for mongoose, using cluster or not
     *
     * @param {string} driver
     * @param {*} config
     *
     * @returns {string}
     */
    private createMongooseUri(driver: string, config: any) {

        // Build URI options query
        const options   = `ssl=${config.ssl}&authSource=${config.authSource}`;
        const querySrv  = config.srv ? '+srv' : '';
        const portStr   = config.srv ? '' : `:${config.port}`;

        // Define escaped user and pass
        const user = encodeURIComponent(config.user ? config.user : '');
        const pass = encodeURIComponent(config.pass ? config.pass : '');

        // Finish, return final URI string
        return (
            user
            ? `${driver}${querySrv}://${user}:${pass}@${config.host}${portStr}/${config.name}?${options}`
            : `${driver}${querySrv}://${config.host}${portStr}/${config.name}?${options}`
        );

    }

}
