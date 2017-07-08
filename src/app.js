/* eslint-disable no-console,no-undef,no-process-exit */
import express      from 'express';
import bodyParser   from 'body-parser';
import morgan       from 'morgan';

// Config
import ApiConfig    from './config/api.conf';

// Core
import Cors         from './core/Cors';
import Routers      from './core/Routers';
import Response     from './core/Response';
import Database     from './core/Database';

// Classes
const config    = new ApiConfig();
const cors      = new Cors();
const routers   = new Routers();
const app       = express();
const database  = new Database();

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
    routers.syncRouters(app);
    // Case route not exists send a default 404 response
    app.get('*', function(req, res){
        Response.send(res, null, Response.NOT_FOUND, 'route_not_found');
    });
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
    database.connectInMongoDB(config.env.databases.mongodb)
        .then(() => {
            console.log('[MongoDB]\tConnection Success');
            _setupCors();
            _setupRouters();
        })
        .catch(err => {
            console.log('[MongoDB Error] \n\n\t' + err.message + '\n\tEXIT\n');
            process.exit(0);
        });
    // SQL with sequelize, define you SGBD
    database.connectInSQLDialect(config.env.databases.mysql)
        .then(() => {
            console.log('[SQL]\t\tConnection Success');
        })
        .catch(err => {
            console.log('[SQL Error] \n\n\t' + err.message + '\n\tEXIT\n');
            process.exit(0);
        });
};

/**
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = () => {
    _setupDatabase();
    console.log(`\n${config.env.app.name} on at ${config.env.server.host}:${config.env.server.port}\n`);
};

if (config.envname !== 'test') {
    app.use(morgan(config.envname === 'development'? 'dev' : 'combined'));
}

app.use(bodyParser.json());
app.listen(config.env.server.port, config.env.server.host, _listenSuccess);

export default app;