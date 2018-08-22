/* eslint-disable no-console,multiline-ternary */
import {
    defaultMongooseOptions,
    defaultSchemaOptions
}                       from '../config/mongoose/mongoose.conf';
import mongoose         from 'mongoose';
import Sequelize        from 'sequelize';
import SequelizeConf    from '../config/sequelize/sequelize.conf';
import fs               from 'fs'
import path             from 'path';
import paginate         from './Paginate';
import beautifyUnique   from 'mongoose-beautiful-unique-validation';

/**
 * Use this class for all methods that manage databases connections, MySQL, PGSql, MongoDB etc..
 */
export default class Database {

    /**
     * Run baby
     */
    constructor() {
        this.DEFAULTS = {
            CHARSET: 'utf8',
            DIALECT: 'mysql',
            LOGGING: null
        }

        this.CONNECT_METHODS = {
            MONGOOSE: 'connectMongo',
            SEQUELIZE: 'connectSQL'
        }
    }

    /**
     * General database connection
     * Public method to connect all databases automatically
     * @param databases
     * @param logging
     */
    connectDatabases(databases, logging = false) {
        return new Promise((resolve, reject) => {
            Object.keys(databases).forEach(database => {

                // Define connect method by db type
                const connectMethod = this.CONNECT_METHODS[databases[database].configWith.toUpperCase()];

                // Configured db type is not implemented, is unknown
                if (!connectMethod) {
                    reject(Error('unknown database configuration agent.'));
                }

                // Run connect method
                this[connectMethod](databases[database], () => {
                    console.info(logging ? `Connection Success [${database.toUpperCase()}]` : '');
                })

            });
            setTimeout(resolve, 2000)
        });
    }

    /**
     * Connect and sync mongodb schemas with mongoose
     *
     * @param databaseConfig
     * @returns {Connection}
     * @private
     */
    _connectInMongoDB(databaseConfig) {

        // Define if mongoose should show  or hide logs
        mongoose.set('debug', databaseConfig.logging);

        // Use promises
        mongoose.Promise = global.Promise;

        // Inject paginate function in mongoose
        mongoose.Model.paginate = paginate.mongoose;

        // Get config database dialect or use default
        const dialect = databaseConfig.dialect ? databaseConfig.dialect : 'mongodb';

        // Use plugin Beautify Unique in mongoose (for parse mongodb unique errors)
        mongoose.plugin(beautifyUnique);

        // Set mongoose default options
        Object.keys(defaultMongooseOptions)
            .forEach(key => {
                mongoose.set(key, defaultMongooseOptions[key]);
            });

        // Synchronize models in dir to mongoose
        fs.readdirSync(path.join(__dirname, '../models', dialect))
            .forEach(filename => {

                // Define path for model script
                const schema = require(path.join(__dirname, '../models/', dialect, filename)).default;

                // Merge default options with custom options
                const options = Object.assign(defaultSchemaOptions, schema.options);

                // Set schema configs
                Object.keys(options).forEach(key => {
                    schema.set(key, options[key]);
                });

                // Import modal to mongoose
                mongoose.model(schema.options.collection, schema);

            });

        // Return mongo connection
        return mongoose.connect(this._createMongooseUri('mongodb', databaseConfig));
    }

    /**
     * Connect and sync SQL schemas with sequelize
     *
     * @param databaseConfig
     * @returns {Promise}
     * @private
     */
    _connectInSQLDialect(databaseConfig) {

        // Get config database dialect or use default
        const dialect = databaseConfig.dialect ? databaseConfig.dialect : this.DEFAULTS.DIALECT;

        // Get config logging or no use logs
        const logging = databaseConfig.logging ? console.log : this.DEFAULTS.LOGGING;

        // Get config database charset or use default
        const charset = databaseConfig.charset ? databaseConfig.charset : this.DEFAULTS.CHARSET;

        // Create dialect object
        SequelizeConf[dialect] = {
            sequelize: null,
            DB       : []
        };

        // Inject paginate in sequelize Model
        Sequelize.Model.paginate = paginate.sequelize;

        // Create sequelize instance
        SequelizeConf[dialect].sequelize = new Sequelize(
            this._createSequelizeUri(dialect, databaseConfig),
            {
                operatorsAliases: Sequelize.Op.Aliases,
                charset         : charset,
                logging         : logging
            }
        );

        // Synchronize models in dir to sequelize
        fs.readdirSync(path.join(__dirname, '../models/' + dialect))
            .forEach(filename => {

                // Define path for model script
                const modelPath = path.join(
                    __dirname, '../models/', dialect, filename.toString().split('.js')[0].toLowerCase()
                );

                // Create model with import
                const model = SequelizeConf[dialect].sequelize.import(modelPath);

                // Add model to list
                SequelizeConf[dialect].DB[model.name] = model;
            });

        // Associate models
        Object
            .keys(SequelizeConf[dialect].DB)
            .forEach((model) => {
                if ('associate' in SequelizeConf[dialect].DB[model]) {
                    SequelizeConf[dialect].DB[model].associate(SequelizeConf[dialect].DB);
                }
            });

        // Sync models to database
        return SequelizeConf[dialect].sequelize.sync(
            {
                force   : databaseConfig.force,
                alter   : databaseConfig.alter,
                logging : logging
            }
        );
    }

    /**
     * Create a connection URI for sequelize with simple usage
     * @param driver
     * @param config
     * @returns {string}
     * @private
     */
    _createSequelizeUri(driver, config) {
        return config.user.length
            ? `${driver}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.name}`
            : `${driver}://${config.host}:${config.port}/${config.name}`;
    }

    /**
     * Create a connection URI for mongoose, using cluster or not
     * @param driver
     * @param config
     * @private
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

    /**
     * Public method to connect mongodb, accept callback for success
     * @param databaseConfig
     * @param success
     */
    connectMongo(databaseConfig, success) {
        if (databaseConfig.enabled)
            this._connectInMongoDB(databaseConfig)
                .then(() => {
                    return success();
                })
                .catch(err => {
                    console.error('[MongoDB Error] \n\n\t' + err.message + '\n\tEXIT\n');
                });
    }

    /**
     * Public method to connect in many sql dialects, accept callback for success
     * @param databaseConfig
     * @param success
     */
    connectSQL(databaseConfig, success) {
        if (databaseConfig.enabled)
            this._connectInSQLDialect(databaseConfig)
                .then(() => {
                    return success();
                })
                .catch(err => {
                    console.error('[SQL Error] \n\n\t' + err.message + '\n\tEXIT\n');
                });
    }

    /**
     * Define mongoose message by locale
     * @param localeObject
     */
    setMongooseLocale(localeObject) {
        mongoose.Error.messages = localeObject
    }
}