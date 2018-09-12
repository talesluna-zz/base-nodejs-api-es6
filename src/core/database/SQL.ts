import fs           from 'fs';
import path         from 'path';
import Sequelize    from 'sequelize';
import { dbs }      from '../../config/models.conf';
import Paginate     from './Paginate';


/**
 * @description General methods for SQL databases
 */
export default class SQL extends Paginate {

    private DEFAULTS: any;

    constructor() {
        super();


        /**
         * Default options
         */
        this.DEFAULTS = {
            CHARSET: 'utf8',
            DIALECT: 'mysql',
            LOGGING: null
        };

    }


    /**
     * @description Connect in many sql dialects, accept callback for success
     *
     * @param {*}      databaseConfig
     * @param {Function}    success
     */
    public connect(database: any, success: VoidFunction, error: Function = process.exit) {
        if (database.enabled) {
            this.connectInSQLDialect(database)
                .then(() => {
                    return success();
                })
                .catch((err: Error) => {
                    console.error(`[DATABASE] \n\n\t'${err.message}'\n\tEXIT\n`);

                    // Exit
                    error(1);
                });
        }
    }


    /**
     * @description Connect and sync SQL schemas with sequelize
     *
     * @param {*} databaseConfig
     * @returns {Promise}
     */
    private connectInSQLDialect(database: any) {

        // Get config database dialect or use default
        const dialect = database.dialect ? database.dialect : this.DEFAULTS.DIALECT;

        // Get config logging or no use logs
        const logging = database.logging ? console.log : this.DEFAULTS.LOGGING;

        // Get config database charset or use default
        // const charset = database.charset ? database.charset : this.DEFAULTS.CHARSET;

        // Create dialect object
        dbs[database.dbname] = {
            sequelize: null,
            models   : []
        };

        // Inject paginate in sequelize Model
        Sequelize.Model.paginate = this.sequelizePaginate;

        // Create sequelize instance
        dbs[database.dbname].sequelize = new Sequelize(
            this.createSequelizeUri(dialect, database),
            {
                logging,
                operatorsAliases: this.getOpAliases(),
                // charset: charset,
            }
        );


        // Synchronize models in dir to sequelize
        fs.readdirSync(path.join(__dirname, `../../api/models/'${database.dbname}`))
            .forEach((filename: string) => {

                // Define path for model script
                const modelPath = path.join(
                    __dirname, '../../api/models/',
                    database.dbname,
                    filename
                    .toString()
                    .split('.js')[0]
                    .toLowerCase()
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
                logging,
                force: database.force,
                alter: database.alter,
            }
        );
    }


    /**
     * @description Create a connection URI for sequelize with simple usage
     *
     * @param {string} driver
     * @param {*} config
     * @returns {string}
     */
    private createSequelizeUri(driver: string, config: any) {
        return config.user.length
            ? `${driver}://${config.user}:${config.pass}@${config.host}:${config.port}/${config.name}`
            : `${driver}://${config.host}:${config.port}/${config.name}`;
    }


    /**
     * @description Return operator aliases list in object
     *
     * @returns {*}
     */
    private getOpAliases(): {[prop: string]: symbol} {
        return {
            $ne             : Sequelize.Op.ne,
            $eq             : Sequelize.Op.eq,
            $gt             : Sequelize.Op.gt,
            $lt             : Sequelize.Op.lt,
            $in             : Sequelize.Op.in,
            $or             : Sequelize.Op.or,
            $is             : Sequelize.Op.is,
            $gte            : Sequelize.Op.gte,
            $lte            : Sequelize.Op.lte,
            $not            : Sequelize.Op.not,
            $and            : Sequelize.Op.and,
            $any            : Sequelize.Op.any,
            $all            : Sequelize.Op.all,
            $col            : Sequelize.Op.col,
            $like           : Sequelize.Op.like,
            $notIn          : Sequelize.Op.notIn,
            $iLike          : Sequelize.Op.iLike,
            $values         : Sequelize.Op.values,
            $regexp         : Sequelize.Op.regexp,
            $notLike        : Sequelize.Op.notLike,
            $iRegexp        : Sequelize.Op.iRegexp,
            $between        : Sequelize.Op.between,
            $overlap        : Sequelize.Op.overlap,
            $notILike       : Sequelize.Op.notILike,
            $contains       : Sequelize.Op.contains,
            $adjacent       : Sequelize.Op.adjacent,
            $contained      : Sequelize.Op.contained,
            $notRegexp      : Sequelize.Op.notRegexp,
            $notIRegexp     : Sequelize.Op.notIRegexp,
            $notBetween     : Sequelize.Op.notBetween,
            $strictLeft     : Sequelize.Op.strictLeft,
            $strictRight    : Sequelize.Op.strictRight,
            $noExtendLeft   : Sequelize.Op.noExtendLeft,
            $noExtendRight  : Sequelize.Op.noExtendRight,
        };
    }
}
