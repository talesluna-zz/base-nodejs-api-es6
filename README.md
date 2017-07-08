# Basic structure for REST API with ExpressJS

This is a simple and basic structure for deploy API using ExpressJs and NodeJs easily and quickly.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![node](https://img.shields.io/badge/NodeJS-8-green.svg?style=flat-square)]()
[![es6](https://img.shields.io/badge/ES6-Babel-blue.svg?style=flat-square)]()

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
├── README.md
└── src
    ├── api
    │   └── index
    │       ├── _index.js
    │       ├── example.js
    │       └── _validates
    │           └── index.validate.js
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
    │   ├── Response.js
    │   └── Routers.js
    ├── schemas
    │   ├── mongodb
    │   │   └── example.js
    │   ├── mysql
    │   │   └── example.js
    │   └── ...
    ├── schemas
    ├── services
    │   └── example.js
    ├── storage
    │   ├── logs
    │   └── static
    └── tests
        └── api
            └── index.test.js
  ```
  
  ## Install
  ```sh
  # Clone the repo
  git clone https://github.com/talesluna/basic_express_api_structure
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
  npm run test  # (Mocha tests)
  npm start     # (Production mode with pm2, build before)
  npm stop      # (Stop Production)

  # Deploy (Docker)
  npm run deploy    # (Pull defined image and deploy docker container)
  npm run undeploy  # (Stop and remove deployed container)
  docker-compose    # (Others deployment options)

  # To install docker-compose
  sudo apt install python python-pip
  sudo pip install docker-compose
  ```
