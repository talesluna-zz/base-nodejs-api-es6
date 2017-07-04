/* eslint-disable multiline-ternary */
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
     * Connect to MongoDB databases
     * @param databaseConfig
     * @returns {Connection}
     */
    connectInMongoDB(databaseConfig) {
        mongoose.Promise = global.Promise;

        return mongoose.connection.openUri(this._createUri('mongodb', databaseConfig));
    }

    /**
     * Connect to SQL databases
     * @param databaseConfig
     */
    connectInSQLDialect(databaseConfig) {
        SequelizeConf.sequelize = new Sequelize(this._createUri('mysql', databaseConfig));
        // Synchronize schemas in dir to sequelize
        fs.readdirSync(path.join(__dirname, '../schemas/mysql'))
            .forEach((schema) => {
                const schemaName = schema.split('.js')[0].toLowerCase();
                const model = SequelizeConf.sequelize.import(schemaName, require(path.join(__dirname, '../schemas/mysql/' + schemaName)));

                SequelizeConf.DB[model.name] = model;
            });
        // Associate models
        Object
            .keys(SequelizeConf.DB)
            .forEach((model) => {
                if ('associate' in SequelizeConf.DB[model]) {
                    SequelizeConf.DB[model].associate(SequelizeConf.DB);
                }
            });
        // Sync schemas to database
        SequelizeConf.sequelize.sync(
            {
                force: true,
                logging: false
            }
        );

        return SequelizeConf.sequelize.authenticate({logging: false});
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
}