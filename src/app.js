/* eslint-disable no-console,no-undef*/
import express      from 'express';
import bodyParser   from 'body-parser';
import compression  from 'compression';
import morgan       from 'morgan';

// Config
import ApiConfig    from './config/api.conf';

// Define environment object
const config        = new ApiConfig();
const environment   = config.getEnv();

// Core
import Cors         from './core/Cors';
import Routers      from './core/Routers';
import Database     from './core/Database';
import RequestQuery from './core/RequestQuery';
import SSL          from './core/SSL';
import Security     from './core/Security';
import Response     from './core/Response';

// Classes & app
const app           = express();
const cors          = new Cors();
const routers       = new Routers();
const database      = new Database();
const requestQuery  = new RequestQuery();
const ssl           = new SSL();
const security      = new Security();
const response      = new Response();

// Set express app in Response class
response.setApp(app);

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
    routers.syncRouters(app);
};

/**
 * Console log output
 * @param text
 * @private
 */
const _appLog = (text) => {
    if (config.getEnvName() !== 'test') {
        console.log(text)
    }
};

/**
 * Set the HTTP headers for cors and others
 * @private
 */
const _setupCors = () => {
    environment.server.cors['x-powered-by'] = environment.app.name;
    cors.setCors(app, environment.server.cors)
};

/**
 * Set databases properties and connect
 * @private
 */
const _setupDatabase = () => {

    // Define cors headers
    _setupCors();

    // Connect to databases
    if (Object.keys(environment.databases).length) {

        database
            .connectDatabases(
                environment.databases,
                config.getEnvName() !== 'test'
            )
            .then(() => {
                return _setupRouters();
            })
            .catch(err => {
                throw err
            });

    } else {
        _appLog('[!]\t No database to connect.');
        _setupRouters();
    }
};

/**
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = () => {
    _setupDatabase();
    _appLog(`\n${environment.app.name} on at ${environment.server.host}:${environment.server.port}\n`);
    if (ssl.cert && environment.server.secure) {
        _appLog('[SSL_ON]\tSecure')
    } else {
        _appLog('[SSL_OFF]\tNOT SECURE (!)')
    }
};

// No use logs in test environment!
if (config.getEnvName() !== 'test') {
    app.use(morgan(config.getEnvName() === 'development'? 'dev' : 'combined'));
}

// Express global usages and middleware
app.use(bodyParser.json());
app.use(requestQuery.parseQuery);
app.use(compression({threshold : 100}));

// Security middleware with helmet
security.makeSecure(app, environment.server.ssl.hpkpKeys);

// Create secure server or insecure server (see your *.env.js)
const server = environment.server.secure ? ssl.getHTTPSServer(app, environment.server.ssl) : app;

// Listen server
server.listen(environment.server.port, environment.server.host, _listenSuccess);

export default app;