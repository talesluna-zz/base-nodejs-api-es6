/* eslint-disable multiline-ternary,no-console,no-process-exit,capitalized-comments */
import mongoose         from 'mongoose';
import Sequelize        from 'sequelize';
import SequelizeConf    from '../config/sequelize.conf';
import fs               from 'fs'
import path             from 'path';

/**
 * Use this class for all methods that manage databases connections, MySQL, PGSql, MongoDB etc..
 */
export default class Database {

    /**
     * Run baby
     */
    constructor () {
        this.DEFAULTS = {
            CHARSET: 'utf8',
            DIALECT: 'mysql',
            LOGGING: null
        }
    }

    /**
     *
     * @param databaseConfig
     * @returns {Connection}
     * @private
     */
    _connectInMongoDB(databaseConfig) {
        mongoose.Promise = global.Promise;

        return mongoose.connection.openUri(this._createUri('mongodb', databaseConfig));
    }

    /**
     *
     * @param databaseConfig
     * @returns {Promise}
     * @private
     */
    _connectInSQLDialect(databaseConfig) {

        // Get config database dialect or use default
        const dialect = databaseConfig.dialect ? databaseConfig.dialect : this.DEFAULTS.DIALECT;

        // Get config logging or no use logs
        const logging = databaseConfig.logging ? console.log: this.DEFAULTS.LOGGING;

        // Get config database charset or use default
        const charset = databaseConfig.charset ? databaseConfig.charset : this.DEFAULTS.CHARSET;

        // Create dialect object
        SequelizeConf[dialect] = {
            sequelize: null,
            DB: []
        };

        // Create sequelize instance
        SequelizeConf[dialect].sequelize = new Sequelize(
            this._createUri(dialect, databaseConfig),
            {
                charset: charset,
                logging: logging
            }
        );

        // Synchronize schemas in dir to sequelize
        fs.readdirSync(path.join(__dirname, '../schemas/' + dialect))
            .forEach((schema) => {
                const schemaName = schema.split('.js')[0].toLowerCase();
                const model = SequelizeConf[dialect].sequelize.import(path.join(__dirname, '../schemas/' + dialect + '/' + schemaName));

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

        // Sync schemas to database
        return SequelizeConf[dialect].sequelize.sync(
            {
                force: process.env.NODE_ENV !== 'production',
                logging: false
            }
        );

        // return SequelizeConf[dialect].sequelize.authenticate({logging: false});
    }

    /**
     * Return many URI connections based in SGBD drivers
     * @param driver
     * @param config
     * @returns {string}
     * @private
     */
    _createUri(driver, config) {
        return  config.user.length
            ? `${driver}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.name}`
            : `${driver}://${config.host}:${config.port}/${config.name}`;
    }

    /**
     * Public method to connect mongodb, accept callback for success
     * @param databaseConfig
     * @param success
     */
    connectMongo(databaseConfig, success) {
        this._connectInMongoDB(databaseConfig)
            .then(() => {
                success();
            })
            .catch(err => {
                console.log('[MongoDB Error] \n\n\t' + err.message + '\n\tEXIT\n');
                process.exit(0);
            });
    }

    /**
     * Public method to connect in many sql dialects, accept callback for success
     * @param databaseConfig
     * @param success
     */
    connectSQL(databaseConfig, success) {
        this._connectInSQLDialect(databaseConfig)
            .then(() => {
                success();
            })
            .catch(err => {
                console.log('[SQL Error] \n\n\t' + err.message + '\n\tEXIT\n');
                process.exit(0);
            });
    }

}