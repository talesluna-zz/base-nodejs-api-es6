# REST API with ExpressJS/NodeJS and Docker integration.

This is a base API using ExpressJs and NodeJs with docker deploy or PM2, easily and quickly.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![node](https://img.shields.io/badge/NodeJS-9.x-green.svg?style=flat-square)]()
[![es6](https://img.shields.io/badge/ES6-Babel-blue.svg?style=flat-square)](.babelrc)
[![docker](https://img.shields.io/badge/Containers-Docker-blue.svg?style=flat-square)](Dockerfile)
[![pm2](https://img.shields.io/badge/Local-PM2-lightgray.svg?style=flat-square)](pm2-deploy.yml)
[![sql](https://img.shields.io/badge/SQL-Sequelize-red.svg?style=flat-square)](src/core/Database.js#L78)
[![mongo](https://img.shields.io/badge/MongoDB-Cluster-green.svg?style=flat-square)](src/core/Database.js#L66)
[![ssl](https://img.shields.io/badge/SSL-HTTPS-green.svg?style=flat-square)](src/core/SSL.js)
[![helmet](https://img.shields.io/badge/Security-Helmet-pink.svg?style=flat-square)](src/core/Security.js)

### What's new in 2.2.0?

- Locales (configure your locale messages for Joi and Mongoose)
- New configs schema
- Update dependencies
- New model sync engine for mongoose
- Some improvements
- Fix bugs


## Structure
```
.
├── Dockerfile
├── LICENSE
├── README.md
├── docker-compose.yml
├── package.json
├── pm2-deploy.yml
└── src
    ├── api
    │   ├── artists
    │   │   ├── _index.js
    │   │   ├── _validates
    │   │   │   ├── create.validate.js
    │   │   │   └── update.validate.js
    │   │   ├── create.js
    │   │   ├── read.js
    │   │   ├── readOne.js
    │   │   └── update.js
    │   └── musics
    │       ├── _index.js
    │       ├── _validates
    │       │   ├── create.validate.js
    │       │   └── update.validate.js
    │       ├── create.js
    │       ├── read.js
    │       ├── readOne.js
    │       └── update.js
    ├── app.js
    ├── config
    │   ├── api.conf.js
    │   ├── env
    │   │   ├── development.env.js
    │   │   ├── production.env.js
    │   │   └── test.env.js
    │   ├── joi
    │   │   └── joi.conf.js
    │   ├── mongoose
    │   │   └── mongoose.conf.js
    │   └── sequelize
    │       └── sequelize.conf.js
    ├── core
    │   ├── Database.js
    │   ├── Headers.js
    │   ├── Locales.js
    │   ├── Paginate.js
    │   ├── RequestQuery.js
    │   ├── Response.js
    │   ├── Routers.js
    │   ├── SSL.js
    │   ├── Security.js
    │   └── Validator.js
    ├── models
    │   ├── mongodb
    │   │   └── artists.js
    │   ├── mysql
    │   │   └── musics.js
    │   └── postgres
    │       ├── artists.js
    │       └── musics.js
    ├── services
    │   ├── Example.service.js
    │   └── Service.js
    ├── storage
    │   ├── certificates
    │   │   ├── ssl.crt
    │   │   └── ssl.key
    │   └── locales
    │       ├── joi
    │       │   └── pt_BR.js
    │       └── mongoose
    │           └── pt_BR.js
    └── tests
        └── api
            └── example.test.js
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
  npm run dev   # (Development mode)
  npm run test  # (Run tests)
  npm start     # (Production mode with pm2, build before)
  npm stop      # (Stop Production)
  npm restart   # (Restart the api)

  # Deploy (Docker)
  npm run start-docker  # (Pull image and deploy docker container)
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


