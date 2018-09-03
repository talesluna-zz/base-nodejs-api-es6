/* eslint-disable multiline-ternary */
import {
    defaultMongooseOptions,
    defaultSchemaOptions
}                           from '../../config/mongoose/mongoose.conf';
import Paginate             from './Paginate';
import fs                   from 'fs';
import path                 from 'path';
import mongoose, {Mongoose} from 'mongoose';
import beautifyUnique       from 'mongoose-beautiful-unique-validation';
import {logger}             from '../common/Logs';
import {dbs}                from '../../config/models.conf';

/**
 * @class Mongo
 * @description General methods for MongoDB databse
 */
export default class Mongo extends Paginate {


    /**
     * @name connect
     * @description Connect mongodb database, accept callback for success
     * @public
     *
     * @param {Object} database
     * @param {Function} success
     *
     */
    connect(database, success, error = process.exit) {
        if (database.enabled) {
            return this._connectInMongoDB(database)
                .then(() => {
                    return success();
                })
                .catch(err => {

                    logger.fatal('[MongoDB Error] \n\n\t' + err.message + '\n\tEXIT\n');

                    // Exit
                    return error(1)

                });
        }
    }


    /**
     * @name setLocale
     * @description Define mongoose message by locale
     * @public
     *
     * @param {Object} localeObject
     *
     */
    setLocale(localeObject) {
        if (localeObject) {
            mongoose.Error.messages = localeObject;
        }
    }


    /**
     * @name _connectInMongoDB
     * @description Connect and sync mongodb schemas with mongoose
     * @private
     *
     * @param {Object} database
     *
     * @returns {Connection}
     *
     */
    _connectInMongoDB(database) {

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
            .forEach(key => {
                mongooseIntance.set(key, defaultMongooseOptions[key]);
            });

        // Synchronize models in dir to mongoose
        fs.readdirSync(path.join(__dirname, '../../api/models', database.dbname))
            .forEach(filename => {

                // Define path for model script
                const schema = require(path.join(__dirname, '../../api/models/', database.dbname, filename)).default;

                // Merge default options with custom options
                const options = Object.assign(defaultSchemaOptions, schema.options);

                // Set schema configs
                Object.keys(options).forEach(key => {
                    schema.set(key, options[key]);
                });

                // Import modal to mongoose istance
                mongooseIntance.model(schema.options.collection, schema);

            });


        // Save mongoose instance
        dbs[database.dbname] = mongooseIntance;

        // Return db connection
        return dbs[database.dbname].connect(this._createMongooseUri('mongodb', database));
    }


    /**
     * @name _createMongooseUri
     * @description Create a connection URI for mongoose, using cluster or not
     * @private
     *
     * @param {string} driver
     * @param {Object} config
     *
     * @returns {string}
     *
     */
    _createMongooseUri(driver, config) {

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