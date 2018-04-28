module.exports = {


    /**
     * APPLICATION CONFIGS
     * All configurations for express App instance
     */
    app: {
        name    : 'Base - PRODUCTION MODE',
        version : '2.0.0'
    },


    /**
     * EXPRESS SERVER CONFIGS
     * All configurations for expressJS HTTP Server should gop here
     */
    server: {
        secure  : false,
        host    : '127.0.0.1',
        port    : 3000,
        cors    : {
            'Access-Control-Allow-Origin'   : '*',
            'Access-Control-Allow-Methods'  : 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'  : 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        ssl: {
            // SSL Private Key path
            privateKey  : 'PATH/TO/YOU/CERT_KEY',

            // SSL Certificate path
            certificate : 'PATH/TO/YOU/CERT',

            // Key HPKP
            hpkpKeys    : []
        }
    },


    /**
     * DATABASES CONFIG
     * All configurations to connect in databases should go here
     */
    databases: {

        // Example for mongo databases
        // Support for cluster
        exampleMongo: {
            servers: [
                {
                    host: 'localhost',
                    port: 27017
                },
                // ...
            ],
            replicaSet  : '',
            authSource  : 'admin',
            ssl         : false,
            user        : 'admin',
            pass        : 'admin',
            name        : 'example',
            dialect     : 'mongodb',
            charset     : 'utf8',
            logging     : true,
            enabled     : true,
            configWith  : 'mongoose'
        },

        // Example for SQL databases
        exampleMysql: {
            host        : 'localhost',
            port        : 3306,
            user        : 'admin',
            pass        : 'admin',
            name        : 'example',
            dialect     : 'mysql',
            charset     : 'utf8',
            logging     : true,
            enabled     : false,
            configWith  : 'sequelize'
        },
        examplePostgre  : {
            host        : 'localhost',
            port        : 5432,
            user        : 'admin',
            pass        : 'admin',
            name        : 'example',
            dialect     : 'postgres',
            charset     : 'utf8',
            logging     : true,
            enabled     : false,
            configWith  : 'sequelize'
        }
    }
};