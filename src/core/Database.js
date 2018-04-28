/* eslint-disable multiline-ternary,no-console,no-process-exit,capitalized-comments */
import mongoose         from 'mongoose';
import Sequelize        from 'sequelize';
import SequelizeConf    from '../config/sequelize.conf';
import fs               from 'fs'
import path             from 'path';
import paginate         from './Paginate';

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
     * General database connection
     * Public method to connect all databases automatically
     * @param databases
     * @param logging
     */
    connectDatabases(databases, logging = false) {
        return new Promise((resolve) => {
            Object.keys(databases).forEach(database => {

                switch (databases[database].configWith) {

                    // Configure this DB with sequelize
                    case 'sequelize':

                        this.connectSQL(databases[database], () => {
                            console.log(logging ? `Connection Success [${database.toUpperCase()}]` : '');
                        });
                        break;

                    // Configure this database with mongoose
                    case 'mongoose':

                        this.connectMongo(databases[database], () => {
                            console.log(logging ? `Connection Success [${database.toUpperCase()}]` : '');
                        });
                        break;

                    default:
                        throw Error('unknown database configuration agent.');
                }
            });
            setTimeout(resolve, 2000)
        });
    }

    /**
     *
     * @param databaseConfig
     * @returns {Connection}
     * @private
     */
    _connectInMongoDB(databaseConfig) {

        // Use promises
        mongoose.Promise = global.Promise;

        // Inject paginate function in mongoose
        mongoose.Model.paginate = paginate.mongoose;

        // Return mongo connection
        return mongoose.connection.openUri(this._createMongooseUri('mongodb', databaseConfig));
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

        // Inject paginate in sequelize Model
        Sequelize.Model.paginate = paginate.sequelize;

        // Create sequelize instance
        SequelizeConf[dialect].sequelize = new Sequelize(
            this._createSequelizeUri(dialect, databaseConfig),
            {
                operatorsAliases: Sequelize.Op.Aliases,
                charset: charset,
                logging: logging
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
                // process.env.NODE_ENV !== 'production'
                force: false,
                logging: false
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
        return  config.user.length
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
        const authSource = config.authSource ? '&authSource=' + config.authSource : '';
        const replicaSet = config.replicaSet ? '&replicaSet=' + config.replicaSet : '';
        const options = `ssl=${config.ssl}${authSource}${replicaSet}`;

        let servers = '';

        // Concat all servers in array
        config.servers.forEach((server, key) => {

            // Set a delimiter when the servers is not last
            const delimiter = key === config.servers.length - 1 ? '' : ',';

            servers += `${server.host}:${server.port}${delimiter}`;
        });

        // Finish, concat the servers string to final URI string
        return config.user.length
            ? `${driver}://${config.user}:${config.pass}@${servers}/${config.name}?${options}`
            : `${driver}://${config.servers}/${config.name}?${options}`;
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
        if (databaseConfig.enabled)
            this._connectInSQLDialect(databaseConfig)
                .then(() => {
                    return success();
                })
                .catch(err => {
                    console.log('[SQL Error] \n\n\t' + err.message + '\n\tEXIT\n');
                    process.exit(0);
                });
    }
}