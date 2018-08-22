module.exports = {


    /**
     * APPLICATION CONFIGS
     * All configurations for express App instance
     */
    app: {
        name    : 'Base - TEST MODE',
        version : '2.2.0',
        locale  : 'pt_BR',
        verbose : false
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
                'X-Powered-By': 'Base for Express/NodeJS API,s'
            }
        },
        ssl: {
            // SSL Enabled
            enable: false,

            // SSL Private Key path
            privateKey  : 'PATH/TO/YOU/CERT_KEY',

            // SSL Certificate path
            certificate : 'PATH/TO/YOU/CERT',

            // Key HPKP
            hpkpKeys    : []
        },
        compression: {
            threshold   : 100
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
        mongodb: {
            host        : 'host',
            port        : 27017,
            user        : 'user',
            pass        : 'pass',
            name        : 'name',
            authSource  : 'source',
            dialect     : 'mongodb',
            charset     : 'utf8',
            srv         : false,
            ssl         : false,
            logging     : true,
            enabled     : false,
            configWith  : 'mongoose'
        },

        // Example for SQL databases
        mysql: {
            host        : 'host',
            port        : 3307,
            user        : 'user',
            pass        : 'pass',
            name        : 'name',
            dialect     : 'mysql',
            charset     : 'utf8',
            logging     : true,
            force       : false,
            alter       : false,
            enabled     : false,
            configWith  : 'sequelize'
        },
        postgre: {
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
    }
};