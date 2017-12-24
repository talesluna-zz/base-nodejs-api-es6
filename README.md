# Basic structure for REST API with ExpressJS/NodeJS and Docker integration.

This is a simple and basic structure for deploy API using ExpressJs and NodeJs with docker deploy, easily and quickly.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![node](https://img.shields.io/badge/NodeJS-8-green.svg?style=flat-square)]()
[![es6](https://img.shields.io/badge/ES6-Babel-blue.svg?style=flat-square)](.babelrc)
[![docker](https://img.shields.io/badge/Containers-Docker-blue.svg?style=flat-square)](Dockerfile)
[![pm2](https://img.shields.io/badge/Local-PM2-lightgray.svg?style=flat-square)](pm2-deploy.yml)
[![sql](https://img.shields.io/badge/SQL-Sequelize-red.svg?style=flat-square)](src/core/Database.js#L78)
[![mongo](https://img.shields.io/badge/MongoDB-Cluster-green.svg?style=flat-square)](src/core/Database.js#L66)
[![ssl](https://img.shields.io/badge/SSL-HTTPS-green.svg?style=flat-square)](src/core/SSL.js)
[![helmet](https://img.shields.io/badge/Security-Helmet-pink.svg?style=flat-square)](src/core/Security.js)

### What's new in 2.0?

- Support to MongoDB Cluster
- Automatically connect to all databases
- Enabled or disabled databases
- Improved the Docker or PM2 deploy
- New simple examples
- Fix some bugs


## Structure
```
├── .babelrc
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── .eslintrc.js
├── .eslintignore
├── .gitignore
├── LICENSE
├── package.json
├── pm2-deploy.yml
├── README.md
└── src
    ├── api
    │   └── example
    │       ├── _index.js
    │       ├── mongo.js
    │       ├── sql.js
    │       └── _validates
    │           └── example.validate.js
    ├── app.js
    ├── config
    │   ├── api.conf.js
    │   ├── sequelize.conf.js
    │   └── env
    │       ├── development.env.js
    │       ├── production.env.js
    │       └── test.env.js
    ├── core
    │   ├── Cors.js
    │   ├── Database.js
    │   ├── RequestQuery.js
    │   ├── Response.js
    │   ├── Routers.js
    │   ├── Security.js
    │   └── SSL.js
    ├── schemas
    │   ├── mongodb
    │   │   ├── artists.js
    │   │   └── musics.js
    │   ├── mysql
    │   │   ├── artists.js
    │   │   └── musics.js
    │   ├── postgres
    │   │   ├── artists.js
    │   │   └── musics.js
    │   └── ...
    ├── services
    │   └── example.js
    ├── storage
    │   ├── certificates
    │   │   ├── example.crt
    │   │   └── example.key
    │   ├── logs
    │   └── static
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
