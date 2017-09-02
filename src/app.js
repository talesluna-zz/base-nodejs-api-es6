/* eslint-disable no-console,no-undef*/
import express      from 'express';
import bodyParser   from 'body-parser';
import compression  from 'compression';
import morgan       from 'morgan';
import https        from 'https';

// Config
import ApiConfig    from './config/api.conf';

// Core
import Cors         from './core/Cors';
import Routers      from './core/Routers';
import Database     from './core/Database';
import RequestQuery from './core/RequestQuery';
import SSL          from './core/SSL';
import Security     from './core/Security';

// Classes & app
const config        = new ApiConfig();
const cors          = new Cors();
const routers       = new Routers();
const database      = new Database();
const requestQuery  = new RequestQuery();
const ssl           = new SSL().getCredentials();
const security      = new Security();
const app           = express();

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
    routers.syncRouters(app);
    // Case route not exists send a default 404 response
};

/**
 * Console log output
 * @param text
 * @private
 */
const _appLog = (text) => {
    if (config.envname !== 'test') {
        console.log(text)
    }
};

/**
 * Set the HTTP headers for cors and others
 * @private
 */
const _setupCors = () => {
    config.env.server.cors['x-powered-by'] = config.env.app.name;
    cors.setCors(app, config.env.server.cors)
};

/**
 * Set databases properties and connect
 * @private
 */
const _setupDatabase = () => {

    // NoSQL with MongoDB
    database.connectMongo(config.env.databases.mongodb, () => {
        _appLog('[MongoDB]\tConnection Success');
    });

    // MySQL with sequelize
    database.connectSQL(config.env.databases.mysql, () => {
        _appLog('[' + config.env.databases.mysql.dialect + ']\t\tConnection Success');
    });

    // PostgreSQL with sequelize
    database.connectSQL(config.env.databases.postgres, () => {
        _appLog('[' + config.env.databases.postgres.dialect + ']\tConnection Success');
        _setupCors();
        _setupRouters();
    })

    // ... define others SQL dialects
};

/**
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = () => {
    _setupDatabase();
    _appLog(`\n${config.env.app.name} on at ${config.env.server.host}:${config.env.server.port}\n`);
    if (ssl.cert && config.env.server.secure) {
        _appLog('[SSL_ON]\tSecure')
    } else {
        _appLog('[SSL_OFF]\tNOT SECURE (!)')
    }
};

// No use logs in test environment!
if (config.envname !== 'test') {
    app.use(morgan(config.envname === 'development'? 'dev' : 'combined'));
}

// Express global usages and middlewares
app.use(bodyParser.json());
app.use(requestQuery.parseQuery);
app.use(compression());

// Security middlewares with helmet
security.makeSecure(app);

// Create secure server or insecure server (see your *.env.js)
const server = config.env.server.secure && ssl.cert ? https.createServer(ssl, app) : app;

// Listen server
server.listen(config.env.server.port, config.env.server.host, _listenSuccess);

export default app;