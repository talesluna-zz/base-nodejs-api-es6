# REST API with ExpressJS/NodeJS and Docker integration.

This is a base API using ExpressJs and NodeJs with docker deploy or PM2, easily and quickly.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![node](https://img.shields.io/badge/NodeJS-green.svg?style=flat-square)]()
[![ts](https://img.shields.io/badge/TS-Babel-blue.svg?style=flat-square)](.babelrc)
[![docker](https://img.shields.io/badge/Containers-Docker-blue.svg?style=flat-square)](Dockerfile)
[![pm2](https://img.shields.io/badge/Local-PM2-lightgray.svg?style=flat-square)](pm2.yml)
[![sql](https://img.shields.io/badge/SQL-Sequelize-red.svg?style=flat-square)](src/core/database/Database.js#L24)
[![mongo](https://img.shields.io/badge/MongoDB-Cluster-green.svg?style=flat-square)](src/core/database/Database.js#L25)
[![ssl](https://img.shields.io/badge/SSL-HTTPS-green.svg?style=flat-square)](src/core/http/SSL.js)
[![helmet](https://img.shields.io/badge/Security-Helmet-pink.svg?style=flat-square)](src/core/common/Security.js)

### What's new in 3.0?

- Typescript support
- Update some dependences
- Multidatabases for mongoose and sequelize
- New structure
- Core abstraction
- Log with log4js (saving in .log file)
- New resource index with prefix
- Improvements

## Structure
```
.
├── src
│   ├── api
│   │   ├── models
│   │   │   ├── DB_Artist
│   │   │   │   └── artists.ts
│   │   │   ├── DB_Log
│   │   │   │   └── logs.ts
│   │   │   ├── DB_Music
│   │   │   │   └── musics.ts
│   │   │   └── DB_Music2
│   │   │       ├── artists.ts
│   │   │       └── musics.ts
│   │   ├── resources
│   │   │   ├── artists
│   │   │   │   ├── _validators
│   │   │   │   │   ├── create.validator.ts
│   │   │   │   │   └── update.validator.ts
│   │   │   │   ├── _index.ts
│   │   │   │   ├── create.ts
│   │   │   │   ├── read.ts
│   │   │   │   ├── readOne.ts
│   │   │   │   └── update.ts
│   │   │   └── musics
│   │   │       ├── _validators
│   │   │       │   ├── create.validator.ts
│   │   │       │   └── update.validator.ts
│   │   │       ├── _index.ts
│   │   │       ├── create.ts
│   │   │       ├── read.ts
│   │   │       ├── readOne.ts
│   │   │       └── update.ts
│   │   └── services
│   │       ├── Example.service.ts
│   │       └── Service.ts
│   ├── config
│   │   ├── joi
│   │   │   └── joi.conf.ts
│   │   ├── mongoose
│   │   │   └── mongoose.conf.ts
│   │   └── models.conf.ts
│   ├── core
│   │   ├── common
│   │   │   ├── Environment.ts
│   │   │   ├── Headers.ts
│   │   │   ├── Locale.ts
│   │   │   ├── Logs.ts
│   │   │   ├── Response.ts
│   │   │   ├── Routes.ts
│   │   │   ├── Security.ts
│   │   │   └── Validator.ts
│   │   ├── database
│   │   │   ├── Database.ts
│   │   │   ├── Mongo.ts
│   │   │   ├── Paginate.ts
│   │   │   └── SQL.ts
│   │   ├── http
│   │   │   ├── Http.ts
│   │   │   └── Ssl.ts
│   │   ├── middlewares
│   │   │   ├── Middlewares.ts
│   │   │   └── RequestQuery.ts
│   │   └── Core.ts
│   ├── environment
│   │   ├── development.env.ts
│   │   ├── production.env.ts
│   │   └── test.env.ts
│   ├── app.ts
│   └── middlewares.ts
├── statics
│   ├── locales
│   │   ├── joi
│   │   │   └── pt_BR.json
│   │   └── mongoose
│   │       └── pt_BR.json
│   ├── logs
│   |   └── ... default path to save logs ...
│   └── ssl
│       ├── ssl.crt
│       └── ssl.key
├── tests
│   ├── api
│   │   └── example.test.ts
│   ├── mocha.opts
│   └── register.js
├── types
│   └── ... custom types in directories ...
├── Dockerfile
├── LICENSE
├── README.md
├── docker-compose.yml
├── package-lock.json
├── package.json
├── pm2.yml
├── tsconfig.json
└── tslint.json
```
  
  ## Install
  ```sh
  # Clone the repo
  git clone https://github.com/talesluna/base-nodejs-api-es6
  cd basic_express_api_structure
  
  # Remove .git
  rm -rf .git
  
  # Install packages
  npm install
  sudo npm install pm2 -g
  
  # Build
  npm run build
  
  # Run (local)
  npm run dev   # (Start api in development mode)
  npm run test  # (Run tests with mocha)
  npm start     # (Start api in production mode with pm2, build before)
  npm stop      # (Stop production)
  npm restart   # (Restart production)

  # Deploy (Docker)
  npm run start-docker  # (Pull and deploy docker container)
  npm run stop-docker   # (Stop deployed container)
  docker-compose        # (Others deployment options)

  # To install docker-compose
  sudo apt install python python-pip
  sudo pip install docker-compose
  ```

## Contributors
|[<img src="https://avatars2.githubusercontent.com/u/13393772?v=4" width="80px;"/><br><sub><b>Tales Luna</b></sub>](https://github.com/talesluna/)|[<img src="https://avatars0.githubusercontent.com/u/26255600?v=4" width="80px;"/><br><sub><b>Wanber Silva</b></sub>](https://github.com/wanber/) |
|---|---|
| 🖥| 💡|


