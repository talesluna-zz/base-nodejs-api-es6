import Mongo    from './Mongo';
import SQL      from './SQL';
import { logger } from '../common/Logs';


/**
 * @description Manage Mogno and SQL databases connections.
 */
export default class Database {

    private mongo           : Mongo;
    private sql             : SQL;
    private CONNECT_METHODS : {[prop: string]: Mongo | SQL};

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
        };

    }


    /**
     * @description connect all databases automatically
     *
     * @param logging
     *
     * @returns {Promise}
     */
    public connectDatabases(logging = false): Promise<any> {

        const { databases }: any = process.env;

        return new Promise((resolve, reject) => {

            Object
            .keys(databases)
            .forEach((database: string) => {


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
                );

            });

            setTimeout(resolve, 2000);

        });
    }


    /**
     * @description Define locales for database drivers
     *
     * @param {*} locale
     */
    public defineLocales(locale = { mongo: null }) {
        if (locale) {
            this.mongo.setLocale(locale.mongo);
        }
    }
}
