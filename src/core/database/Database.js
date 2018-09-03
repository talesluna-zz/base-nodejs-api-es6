import Mongo    from './Mongo';
import SQL      from './SQL';
import { logger } from '../common/Logs';


/**
 * @class Database
 * @description Manage Mogno and SQL databases connections.
 */
export default class Database {


    /**
     * Run baby
     */
    constructor() {


        /**
         * Database classes
         */
        this.mongo  = new Mongo();
        this.sql    = new SQL();


        /**
         * Define here the connect method for anyone databae classes
         */
        this.CONNECT_METHODS = {
            MONGOOSE    : this.mongo,
            SEQUELIZE   : this.sql
        }

    }


    /**
     * @name connectDatabases
     * @description connect all databases automatically
     * @public
     *
     * @param logging
     *
     * @returns {Promise}
     *
     */
    connectDatabases(logging = false) {

        const {databases} = process.env;

        return new Promise((resolve, reject) => {

            Object
                .keys(databases)
                .forEach(database => {


                    // Define connect method by db type
                    const connectMethod = this.CONNECT_METHODS[databases[database].configWith.toUpperCase()];

                    // Define database name
                    databases[database].dbname = database;

                    // Configured db type is not implemented, is unknown
                    if (!connectMethod) {
                        reject(Error('Unknown database configuration agent.'));
                    }


                    // Run connect method
                    connectMethod.connect(
                        databases[database],
                        () => logger.debug(logging ? `[DATABASE] Connection success in ${databases[database].dialect} (${database})` : '')
                    )

                }
            );

            setTimeout(resolve, 2000)

        });
    }


    /**
     * @name defineLocales
     * @description Define locales for database drivers
     * @public
     *
     * @param {*} locale
     *
     */
    defineLocales(locale = {mongo: null}) {
        if (locale) {
            this.mongo.setLocale(locale.mongo);
        }
    }
}