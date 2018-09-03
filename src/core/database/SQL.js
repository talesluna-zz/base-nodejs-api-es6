/* eslint-disable no-console,multiline-ternary */
import fs               from 'fs';
import path             from 'path';
import Sequelize        from 'sequelize';
import {dbs}            from '../../config/models.conf';
import Paginate         from './Paginate';

/**
 * @class SQL
 * @description General methods for SQL databases
 *
 */
export default class SQL extends Paginate {


    constructor() {
        super();


        /**
         * Default options
         */
        this.DEFAULTS = {
            CHARSET: 'utf8',
            DIALECT: 'mysql',
            LOGGING: null
        }

    }


    /**
     * @name connect
     * @description Connect in many sql dialects, accept callback for success
     * @public
     *
     * @param {Object}      databaseConfig
     * @param {Function}    success
     *
     */
    connect(database, success, error = process.exit) {
        if (database.enabled) {
            this._connectInSQLDialect(database)
                .then(() => {
                    return success();
                })
                .catch(err => {
                    console.error('[DATABASE] \n\n\t' + err.message + '\n\tEXIT\n');

                    // Exit
                    error(1)
                });
        }
    }


    /**
     * @name _connectInSQLDialect
     * @description Connect and sync SQL schemas with sequelize
     * @private
     *
     * @param {Object} databaseConfig
     *
     * @returns {Promise}
     *
     */
    _connectInSQLDialect(database) {

        // Get config database dialect or use default
        const dialect = database.dialect ? database.dialect : this.DEFAULTS.DIALECT;

        // Get config logging or no use logs
        const logging = database.logging ? console.log : this.DEFAULTS.LOGGING;

        // Get config database charset or use default
        const charset = database.charset ? database.charset : this.DEFAULTS.CHARSET;

        // Create dialect object
        dbs[database.dbname] = {
            sequelize: null,
            models   : []
        };

        // Inject paginate in sequelize Model
        Sequelize.Model.paginate = this.sequelizePaginate;

        // Create sequelize instance
        dbs[database.dbname].sequelize = new Sequelize(
            this._createSequelizeUri(dialect, database),
            {
                operatorsAliases: Sequelize.Op.Aliases,
                charset         : charset,
                logging         : logging
            }
        );

        // Synchronize models in dir to sequelize
        fs.readdirSync(path.join(__dirname, '../../api/models/' + database.dbname))
            .forEach(filename => {

                // Define path for model script
                const modelPath = path.join(
                    __dirname, '../../api/models/', database.dbname, filename.toString().split('.js')[0].toLowerCase()
                );

                // Create model with import
                const model = dbs[database.dbname].sequelize.import(modelPath);

                // Add model to list
                dbs[database.dbname].models[model.name] = model;
            });

        // Associate models
        Object
            .keys(dbs[database.dbname].models)
            .forEach((model) => {
                if ('associate' in dbs[database.dbname].models[model]) {
                    dbs[database.dbname].DB[model].associate(dbs[database.dbname].models);
                }
            });

        // Sync models to database
        return dbs[database.dbname].sequelize.sync(
            {
                force   : database.force,
                alter   : database.alter,
                logging : logging
            }
        );
    }


    /**
     * @name _createSequelizeUri
     * @description Create a connection URI for sequelize with simple usage
     * @private
     *
     * @param {string} driver
     * @param {Object} config
     *
     * @returns {string}
     *
     */
    _createSequelizeUri(driver, config) {
        return config.user.length
            ? `${driver}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.name}`
            : `${driver}://${config.host}:${config.port}/${config.name}`;
    }

}