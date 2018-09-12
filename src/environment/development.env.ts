import { AppEnvironment } from 'core';

export const env: AppEnvironment = {


    /**
     * APPLICATION CONFIGS
     * All configurations for express App instance
     */
    app: {
        name    : 'My REST API',
        version : '1.0.0',
        locale  : 'pt_BR',
        verbose : true
    },


    /**
     * EXPRESS SERVER CONFIGS
     * All configurations for expressJS HTTP Server should gop here
     */
    server: {
        host    : '127.0.0.1',
        port    : 3000,
        headers : {
            cors: {
                'Access-Control-Allow-Origin'   : '*',
                'Access-Control-Allow-Methods'  : 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers'  : 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            others: {
                'X-Powered-By': 'My REST API v1.0.0'
            }
        },
        ssl: {
            // SSL Enabled
            enable: false,

            // SSL Private Key path
            privateKey  : `${__dirname}/../../statics/ssl/ssl.key`,

            // SSL Certificate path
            certificate : `${__dirname}/../../statics/ssl/ssl.crt`,

            // Key HPKP
            hpkpKeys    : []
        },
        compression: {
            threshold   : 100
        },
        logs: {
            access: `${__dirname}/../../statics/logs/access.log`,
            errors: `${__dirname}/../../statics/logs/errors.log`,
            compress: true
        }
    },


    /**
     * DATABASES CONFIG
     * All configurations to connect in databases should go here
     */
    databases: {

        // Support: Standalone server, MongoDB Atlas, mLab

        // Example for mongo databases
        // Support for cluster
        DB_Artist: {
            host        : 'host',
            port        : 27017,
            user        : 'user',
            pass        : 'pass',
            name        : 'name',
            authSource  : 'source',
            dialect     : 'mongodb',
            charset     : 'utf8',
            srv         : false,
            ssl         : true,
            logging     : false,
            enabled     : false,
            configWith  : 'mongoose'
        },

        // Example for SQL databases
        DB_Music: {
            host        : 'host',
            port        : 3306,
            user        : 'user',
            pass        : 'pass',
            name        : 'name',
            dialect     : 'mysql',
            charset     : 'utf8',
            logging     : false,
            force       : false,
            alter       : false,
            enabled     : false,
            configWith  : 'sequelize'
        },

        DB_Music2: {
            host        : 'host',
            port        : 5432,
            user        : 'user',
            pass        : 'pass',
            name        : 'name',
            dialect     : 'postgres',
            charset     : 'utf8',
            logging     : true,
            force       : false,
            alter       : false,
            enabled     : false,
            configWith  : 'sequelize'
        }

        // ... and more
    }
};
