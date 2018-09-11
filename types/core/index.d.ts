// Applications types

declare module 'core' {

    type EnvironmentMongoDatabase = {
        host        : string,
        port        : 27017,
        user        : string,
        pass        : string,
        name        : string,
        authSource  : string,
        dialect     : 'mongodb',
        charset     : 'utf8',
        srv         : boolean,
        ssl         : boolean,
        logging     : boolean,
        enabled     : boolean,
        configWith  : 'mongoose',
    }

    type EnvironmentSQLDatabase = {
        host        : string,
        port        : number,
        user        : string,
        pass        : string,
        name        : string,
        dialect     : string,
        charset     : 'utf8',
        logging     : boolean,
        force       : boolean,
        alter       : boolean,
        enabled     : boolean,
        configWith  : 'sequelize',
    }

    export interface AppEnvironment {
        app: {
            name    : string,
            version : string,
            locale  : string,
            verbose : boolean
        },
        server: {
            host    : string,
            port    : number,
            headers : {
                cors: {
                    [prop: string]: string
                },
                others: {
                    [prop: string]: string
                }
            },
            ssl: {
                enable      : boolean,    
                privateKey  : string,
                certificate : string,
                hpkpKeys    : string[]
            },
            compression: {threshold: number, [prop: string]: any},
            logs: {
                access  : string,
                errors  : string,
                compress: boolean
            }
        },
        databases: {
            [prop: string]: EnvironmentMongoDatabase|EnvironmentSQLDatabase
        }
    }

    export interface JoiDefaultSettings {
        applyTo : string[],
        settings: {
            [prop: string]: string | number | boolean | {[prop: string] : any}
        }
    }
}


//export = appcore;