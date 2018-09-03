// Express
import express      from 'express';

// Core
import Security         from './common/Security';
import Locales          from './common/Locale';
import Validator        from './common/Validator';
import Routes           from './common/Routes';
import Response         from './common/Response';
import Headers          from './common/Headers';
import Logs, {logger}   from './common/Logs';
import Database         from './database/Database';
import Middlewares      from './middlewares/Middlewares';
import Http             from './http/Http';
import Environment      from './common/Environment';

// Events for detect end of setup methods
const END_SETUP_EVENTS = {
    HEADERS     : 'END_HEADERS',
    ROUTES      : 'END_ROUTES',
    RESPONSE    : 'END_RESPONSE',
    DATABASE    : 'END_DATABASE',
    SECURITY    : 'END_SECURITY',
    LOCALES     : 'END_LOCALES',
    VALIDATOR   : 'END_VALIDATOR',
    MIDDLEWARES : 'END_MIDDLEWARES',
    HTTP        : 'END_HTTP'
}


/**
 * @class Core
 * @description Application core
 *
 */
export default class Core {

    constructor() {

        // Environment
        this.environment = new Environment();

        // Load express
        this._loadExpress()
    }


    /**
     * @name bootstrap
     * @description Run all setup methods
     *
     * @param {Array} midllewares
     *
     * @return {Promise}
     */
    bootstrap(midllewares = []) {
        return this.setupServer()
        .then(() => {
            this.setupMiddlewares(midllewares);
            this.setupResponse();
            this.setupDatabases();
            this.setupHeaders();
            this.setupValidators();
            this.setupRoutes();
            this.setupSecurity();
            this.setupLocales();
            this.setupLogs();

            return true;
        })
        .catch(err => logger.debug(err));
    }


    /**
     * @name setupResponse
     * @description inject response methods in express app ro resuse
     * @public
     *
     */
    setupResponse() {
        this.response = new Response();
        this.response.setApp(this.app);
    }


    /**
     * @name setupSecurity
     * @description configure helmet in exress app
     * @public
     *
     */
    setupSecurity() {
        this.security = new Security();
        this.security.makeSecure(this.app);
    }


    /**
     * @name setupServer
     * @description call server start method
     * @public
     * @returns {Promise}
     *
     */
    setupServer() {

        this.server = new Http();

        return this.server.startServer(this.app)
    }


    /**
     * @name setupValidators
     * @description configure Joi validators
     * @public
     *
     */
    setupValidators() {
        this.app.on(END_SETUP_EVENTS.LOCALES, () => {
            this.validator = new Validator();
            this.validator.setLocale(this.locales.locale, this.locales.getLocaleObject('joi'));
            this.validator.syncSettings();
        })
    }


    /**
     * @name setupRoutes
     * @description sync all api routes to express app (wait database)
     * @public
     *
     */
    setupRoutes() {
        this.app.on(END_SETUP_EVENTS.MIDDLEWARES, () => {

            this.routes = new Routes();

            return this.routes.syncRoutes(this.app, this.environment.isVerbose());
        })
    }


    /**
     * @name setupHeaders
     * @description sync all defined header to express ap
     * @public
     *
     */
    setupHeaders() {
        this.headers = new Headers();
        this.headers.setHeaders(this.app);
    }


    /**
     * @name setupLogs
     * @description Configure and apply log4js.
     *
     */
    setupLogs() {

        this.logs = new Logs();

        if (!this.environment.isTest()) {
            this.logs.logging(this.app, this.environment.isDev());
        }
    }


    /**
     * @name setupMiddlewares
     * @description sync express middlewares
     * @public
     *
     * @param {Array} middlewares
     *
     */
    setupMiddlewares(middlewares = []) {
        this.app.on(END_SETUP_EVENTS.DATABASE, () => {

            this.midllewares = new Middlewares();

            // Use others default middleares
            this.midllewares.useMiddlewares(this.app, middlewares);


            // Emit event to sinalize the end of this setup
            this.app.emit(END_SETUP_EVENTS.MIDDLEWARES);

        });
    }


    /**
     * @name setupLocales
     * @description configure Locales
     * @public
     *
     */
    setupLocales() {
        this.locales = new Locales();
        this.app.emit(END_SETUP_EVENTS.LOCALES);
    }


    /**
     * @name setupDatabase
     * @description connect all configured databases
     * @public
     *
     * @param {*} beforeConnect callback to call after all databases connect, in promise resolve.
     *
     */
    setupDatabases() {
        this.app.on(END_SETUP_EVENTS.LOCALES, () => {


            this.database = new Database();


            // Define languages
            this.database.defineLocales(
                {
                    mongo: this.locales.getLocaleObject('mongoose')
                }
            );


            // Conect databases
            this.database
                .connectDatabases(this.environment.isVerbose())
                .then(() => {
                    return this.app.emit(END_SETUP_EVENTS.DATABASE);
                })
                .catch(err => {
                    logger.debug(err);
                });

        })

    }


    /**
     * @name _loadExpress
     * @description create express.js application
     * @private
     *
     */
    _loadExpress() {
        this.app = express();
    }

}