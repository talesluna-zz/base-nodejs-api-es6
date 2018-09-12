declare const process: {env: {[prop: string]: any}};

import log4js, { Logger, Configuration }    from 'log4js';
import { Application }                      from 'express';

export let logger: Console|Logger = console;

const logConfigure: Configuration = {
    pm2: true,
    appenders: {
        stdout: { type: 'stdout' }
    },
    categories: {
        default: {
            level: 'all',
            appenders: ['stdout']
        }
    }
};


const logFormats = {
    dev     : '[:status] - :method :url in :response-time ms',
    default : '[:status] - :method :url in :response-time ms --- [:user-agent] --- [:remote-addr]'
};


/**
 * @description Configure and use Log4js
 */
export default class Logs {


    /**
     * @description Create and use log4js in express
     *
     * @param {Application} app
     * @param {*} config
     * @param {boolean} isDev
     *
     */
    public logging(app: Application, isDev = false) {


        // Load logs config by env
        const config = process.env.server.logs;


        // Create logger (no use files in dev mode)
        logger = this.createLogger(config, !isDev);


        // Apply logger to express
        app.use(log4js.connectLogger(logger, {
            level: 'auto',
            format: isDev ? logFormats.dev : logFormats.default
        }));

    }


    /**
     * @description Configure and create log4js loggger
     *
     * @param {*} config
     * @returns {log4js.Logger}
     *
     */
    private createLogger(config: any, useFile = false) {


        // Add access to logConfigure
        if (useFile && config.access) {
            logConfigure.appenders.access       = this.createFileAppender(config.access, config.compress);
            logConfigure.appenders.filterAccess = this.createLevelFilter('info', 'access');
            logConfigure.categories.default.appenders.push('filterAccess');
        }


        // Add errors to logConfigure
        if (useFile && config.errors) {
            logConfigure.appenders.errors       = this.createFileAppender(config.errors, config.compress);
            logConfigure.appenders.filterErrors = this.createLevelFilter('error', 'errors');
            logConfigure.categories.default.appenders.push('filterErrors');
        }

        log4js.configure(logConfigure);


        return log4js.getLogger(' ');
    }


    /**
     * @description Create log4js appender
     *
     * @param {string} level
     * @param {string} appender
     * @returns {*}
     *
     */
    private createFileAppender(filepath: string, compress = false) {
        return {
            type    : 'dateFile',
            pattern : '.yyyy-MM-dd',
            filename: filepath,
            compress: compress
        };
    }


     /**
     * @description Create log4js appender at level filter
     *
     * @param {string} level
     * @param {string} appender
     *
     * @returns {*}
     *
     */
    private createLevelFilter(level: string, appender: string) {
        return {
            type    : 'logLevelFilter',
            level   : level,
            appender: appender
        };
    }
}
