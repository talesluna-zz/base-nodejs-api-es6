import log4js from 'log4js';

export let logger = console;

const logConfigure = {
    appenders: {
        stdout: {type: 'stdout'}
    },
    categories: {
        default: {
            level: 'all',
            appenders: ['stdout']
        }
    }
}

const logFormats = {
    dev     : '[:status] - :method :url in :response-time ms',
    default : '[:status] - :method :url in :response-time ms --- [:user-agent] --- [:remote-addr]'
};


export default class Logs {

    constructor() {}

    /**
     * @name logging
     * @description Create and use log4js in express
     * @public
     *
     * @param {Express} app
     * @param {Object} config
     * @param {boolean} isDev
     *
     */
    logging(app, isDev = false) {


        // Load logs config by env
        const config = process.env.server.logs;


        // Create logger (no use files in dev mode)
        logger = this._createLogger(config, true);


        // Apply logger to express
        app.use(log4js.connectLogger(logger, {
            level: 'auto',
            format: isDev ? logFormats.dev : logFormats.default
        }))


    }


    /**
     * @name _createLogger
     * @description Configure and create log4js loggger
     * @private
     *
     * @param {Object} config
     *
     * @returns {log4js.Logger}
     *
     */
    _createLogger(config, useFile = false) {


        // Add access to logConfigure
        if (useFile && config.access) {
            logConfigure.appenders.access       = this._createFileAppender(config.access, config.compress);
            logConfigure.appenders.filterAccess = this._createLevelFilter('info', 'access');
            logConfigure.categories.default.appenders.push('filterAccess');
        }


        // Add errors to logConfigure
        if (useFile && config.errors) {
            logConfigure.appenders.errors       = this._createFileAppender(config.errors, config.compress);
            logConfigure.appenders.filterErrors = this._createLevelFilter('error', 'errors');
            logConfigure.categories.default.appenders.push('filterErrors');
        }


        log4js.configure(logConfigure);


        return log4js.getLogger(' ');

    }


    /**
     * @name _createFileAppender
     * @description Create log4js appender
     * @private
     *
     * @param {string} level
     * @param {string} appender
     *
     * @returns {Object}
     *
     */
    _createFileAppender(filepath, compress = false) {
        return {
            type    : 'dateFile',
            pattern : '.yyyy-MM-dd',
            filename: filepath,
            compress: compress
        }
    }


     /**
     * @name _createLevelFilter
     * @description Create log4js appender at level filter
     * @private
     *
     * @param {string} level
     * @param {string} appender
     *
     * @returns {Object}
     *
     */
    _createLevelFilter(level, appender) {
        return {
            type    : 'logLevelFilter',
            level   : level,
            appender: appender
        }
    }
}