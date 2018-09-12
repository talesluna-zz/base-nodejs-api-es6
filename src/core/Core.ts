// Express
import express, { Application }  from 'express';

// Core
import Security         from './common/Security';
import Locales          from './common/Locales';
import Validator        from './common/Validator';
import Routes           from './common/Routes';
import Response         from './common/Response';
import Headers          from './common/Headers';
import Logs, { logger } from './common/Logs';
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
};


/**
 * @description Application core
 */
export default class Core {

    // Express
    private app         : Application;

    // Core
    private environment : Environment;
    private middlewares : Middlewares;
    private response    : Response;
    private database    : Database;
    private headers     : Headers;
    private validator   : Validator;
    private routes      : Routes;
    private security    : Security;
    private locales     : Locales;
    private logs        : Logs;
    private server      : Http;


    constructor() {

        // Express
        this.app         = express();

        // Core
        this.environment = new Environment();
        this.middlewares = new Middlewares();
        this.response    = new Response();
        this.database    = new Database();
        this.headers     = new Headers();
        this.validator   = new Validator();
        this.routes      = new Routes();
        this.security    = new Security();
        this.locales     = new Locales();
        this.logs        = new Logs();
        this.server      = new Http();
    }


    /**
     * @description Run all setup methods
     *
     * @param {Array} middlewares
     *
     * @return {Promise}
     */
    public bootstrap(middlewares = []) {
        return this.setupServer()
        .then(() => {
            this.setupMiddlewares(middlewares);
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
        .catch((err: Error) => logger.debug(err));
    }


    /**
     * @description inject response methods in express app ro resuse
     */
    private setupResponse() {
        this.response = new Response();
        this.response.setApp(this.app);
    }


    /**
     * @description configure helmet in exress app
     */
    private setupSecurity() {
        this.security.makeSecure(this.app);
    }


    /**
     * @description call server start method
     *
     * @returns {Promise}
     *
     */
    private setupServer() {
        return this.server.startServer(this.app);
    }


    /**
     * @description configure Joi validators
     */
    private setupValidators() {
        this.app.on(END_SETUP_EVENTS.LOCALES, () => {
            this.validator.setLocale(this.locales.locale, this.locales.getLocaleObject('joi'));
            this.validator.syncSettings();
        });
    }


    /**
     * @description sync all api routes to express app (wait database)
     */
    private setupRoutes() {
        this.app.on(END_SETUP_EVENTS.MIDDLEWARES, () => {

            return this.routes.syncRoutes(this.app, this.environment.isVerbose());
        });
    }


    /**
     * @description sync all defined header to express ap
     */
    private setupHeaders() {
        this.headers.setHeaders(this.app);
    }


    /**
     * @description Configure and apply log4js.
     */
    private setupLogs() {
        if (!this.environment.isTest()) {
            this.logs.logging(this.app, this.environment.isDev());
        }
    }


    /**
     * @description sync express middlewares
     *
     * @param {Array} middlewares
     */
    private setupMiddlewares(middlewares = []) {
        this.app.on(END_SETUP_EVENTS.DATABASE, () => {

            // Use others default middleares
            this.middlewares.useMiddlewares(this.app, middlewares);


            // Emit event to sinalize the end of this setup
            this.app.emit(END_SETUP_EVENTS.MIDDLEWARES);

        });
    }


    /**
     * @description configure Locales
     */
    private setupLocales() {
        this.app.emit(END_SETUP_EVENTS.LOCALES);
    }


    /**
     * @description connect all configured databases
     *
     * @param {*} beforeConnect callback to call after all databases connect, in promise resolve.
     */
    private setupDatabases() {
        this.app.on(END_SETUP_EVENTS.LOCALES, () => {

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
                .catch((err: Error) => logger.debug(err));

        });

    }

}
