// Your test environment configs goes here!
module.exports = {
    app: {
        name: 'API Name - TEST MODE',
        version: '1.0.2'
    },
    server: {
        secure: true,
        host: '127.0.0.1',
        port: 3000,
        cors: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
    },
    databases: {
        mongodb: {
            host: 'localhost',
            port: 27017,
            user: 'username',
            pass: 'password',
            name: 'example?authSource=admin',
            dialect: 'mongodb',
            charset: 'utf8',
            logging: false
        },
        mysql: {
            host: 'localhost',
            port: 3306,
            user: 'admin',
            pass: 'admin',
            name: 'example',
            dialect: 'mysql',
            charset: 'utf8',
            logging: false
        },
        postgres: {
            host: 'localhost',
            port: 5432,
            user: 'admin',
            pass: 'admin',
            name: 'example',
            dialect: 'postgres',
            charset: 'utf8',
            logging: false
        }
    }
};