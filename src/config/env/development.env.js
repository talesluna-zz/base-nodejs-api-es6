module.exports = {
    app: {
        name: 'API Name',
        version: '1.0.0'
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        cors: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    },
    databases: {
        mongodb: {
            host: '192.168.1.31',
            port: 27017,
            user: '',
            pass: '',
            name: 'example'
        },
        mysql: {
            host: '192.168.1.31',
            port: 3306,
            user: 'root',
            pass: 'root',
            name: 'example'
        }
    },
    jwt: {
        jwtSession: {session: false},
        jwtSecret: '128BitsSecretKeyToChoose' + new Date().toISOString()
    }
};