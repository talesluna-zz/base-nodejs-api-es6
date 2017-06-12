import express      from 'express';
import bodyParser   from 'body-parser';
import morgan       from 'morgan';

// Config
import ApiConfig    from './config/api.conf';

// Core
import Cors         from './core/Cors'
import Routers      from './core/Routers'
import Response     from './core/Response';

// Classes
const config    = new ApiConfig();
const cors      = new Cors();
const routers   = new Routers();
const app       = express();

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
    routers.syncRouters(app);
    // Case route not exists send a default 404 response
    app.get('*', function(req, res){
        Response.send(res, 404, null, false, 'route_not_found');
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
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = () => {
    _setupCors();
    _setupRouters();
    console.log(`${config.env.app.name} on at ${config.env.server.host}:${config.env.server.port}`);
};


if (config.envname !== 'test') {
    app.use(morgan(config.envname === 'development'? 'dev' : 'combined'));
}

app.use(bodyParser.json());
app.listen(config.env.server.port, config.env.server.host, _listenSuccess);

export default app;