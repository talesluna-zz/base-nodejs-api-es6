/* eslint-disable no-console,no-undef*/
import express      from 'express';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser'
import compression  from 'compression';
import morgan       from 'morgan';

// Config
import ApiConfig    from './config/api.conf';

// Define environment object
const config        = new ApiConfig();
const environment   = config.getEnv();

// Core
import Headers      from './core/Headers';
import Routers      from './core/Routers';
import Database     from './core/Database';
import RequestQuery from './core/RequestQuery';
import SSL          from './core/SSL';
import Security     from './core/Security';
import Response     from './core/Response';
import Locales      from './core/Locales';
import Validator    from './core/Validator';


// Classes & app
const app           = express();
const headers       = new Headers();
const routers       = new Routers();
const database      = new Database();
const requestQuery  = new RequestQuery();
const ssl           = new SSL();
const security      = new Security();
const response      = new Response();
const locales       = new Locales(environment.app.locale);
const validator     = new Validator();

// Set express app in Response class
response.setApp(app);


/**
 * Setup validator with Joi
 * @private
 */
const _setupValidator = () => {
    // Set locale in validator
    validator.setLocale(locales.locale, locales.getLocaleObject('joi'));
    validator.syncSettings();
};

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
    routers.syncRouters(app);
};

/**
 * App console output
 * @param text
 * @private
 */
const _setupAppLog = () => {

    // Detect if testing is running
    const isTest = config.getEnvName() === 'test';

    // Define app log function
    app.log = isTest ? (text) => text : console.info;
};

/**
 * Set the HTTP headers for cors and others
 * @private
 */
const _setupHeaders = () => {
    headers.setHeaders(
        app,
        Object.assign(
            environment.server.headers.cors,
            environment.server.headers.others
        )
    )
};

/**
 * Set databases properties and connect
 * @private
 */
const _setupDatabase = () => {

    // Connect to databases
    if (Object.keys(environment.databases).length) {

        // Define languages
        database.setMongooseLocale(locales.getLocaleObject('mongoose'));

        database
            .connectDatabases(
                environment.databases,
                config.getEnvName() !== 'test'
            )
            .then(() => {
                return _setupRouters();
            })
            .catch(err => {
                console.error(err);
                process.exit(1);
            });

    } else {
        _setupRouters(environment.app.verbose);
    }
};

/**
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = () => {

    // Setup console logging function
    _setupAppLog()

    // Init databases
    _setupDatabase();

    // Define cors headers
    _setupHeaders();

    // Define validator configs
    _setupValidator();

    // Print in console app status
    app.log(`
    
 ${environment.app.name} (${environment.app.version})
------------------------------------
 HOST => ${environment.server.host}
 PORT => ${environment.server.port}
 SSL  => ${environment.server.ssl.enable ? 'YES (secure)' : 'NO'}

.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
._._._._._._._._._._._._._._._._._._.

`);

};

// No use logs in test environment!
if (config.getEnvName() !== 'test') {
    app.use(morgan(config.getEnvName() === 'development'? 'dev' : 'combined'));
}

// Express global usages and middlewares
app.use(bodyParser.json());
app.use(requestQuery.parseQuery);
app.use(compression(environment.server.compression));
app.use(cookieParser());

// Security middlewares with helmet
security.makeSecure(app, environment.server.ssl.hpkpKeys);

// Create secure server or insecure server (see your *.env.js)
const server = environment.server.ssl.enable ? ssl.getHTTPSServer(app, environment.server.ssl) : app;

// Listen server
server.listen(environment.server.port, environment.server.host, _listenSuccess);

export default app;