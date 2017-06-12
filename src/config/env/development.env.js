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
            host: '127.0.0.1',
            port: 27017,
            user: '',
            pass: '',
            name: ''
        }
    }
};