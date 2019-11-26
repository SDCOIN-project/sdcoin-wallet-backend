# SDCoin Wallet Backend

## Overview

This app is a NodeJS server based on [NestJS](https://nestjs.com/).

This server uses database MongoDB.

[Config module](https://www.npmjs.com/package/config) is used for configuration. 
Configurations are stored in configuration files on the `config` folder, and can be overridden and extended by environment variables, command line parameters, or external sources.

### Config File Load Order

Files in the config directory are loaded in the following order:

```
1. config/default.json
2. config/default-{instance}.json
3. config/{deployment}.json
4. config/{deployment}-{instance}.json
5. config/local.json
6. config/(Finally, custom environment variables can override all files)
```

The `config/custom-environment-variables.json` file is used for matching variable names and config variables

### Config File Description

| Variable                       | Description                                                                       |
| -------------------------------|---------------------------------------------------------------------------------- |
| **MONGODB_URI**                | Url to mongodb. Example `mongodb://127.0.0.1:27017/`                              |
| **MONGODB_DATABASE**           | Database name. Example `project_db_name`                                          |
| **CORS**                       | Flag for cors politics. Default `false`                                           |
| **NODE_APP_INSTANCE**          | Name of app instance. Example `development`                                       |
| **CRYPTO_API_URL**             | Url to crypto api service. Example `https://697-crypto-api.pixelplexlabs.com`     |
| **CONTRACTS.SDC**              | Address of SDC contract. Example `0x0000000000000000000000000000000000000000`     |
| **CONTRACTS.LUV**              | Address of LUV contract. Example `0x0000000000000000000000000000000000000000`     |

## Development

### Running with Docker Compose

You can run this app with docker.
For the install docker you can read this [guide](https://docs.docker.com/install/linux/docker-ce/ubuntu/).
After that you need install docker-compose. This [information](https://docs.docker.com/compose/install/) helps you.

#### Run With docker-compose

Go to the project directory
At the level where "docker-compose-develop.yml" is located

```bash
docker-compose -f docker-compose-develop.yml up --build
```

You can check the server on the 3000 port (as example just open [http://127.0.0.1:3000](http://127.0.0.1:3000))

### Running without Docker

You can start your application without docker. For this you need install [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) and [nodejs](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/).

#### Preparation

Clone the project and go to path with cloned project 

```bash
# Install dependencies
npm i
```

If you can change the config, you should create new file `./config/local.json` and overwrite variables.

#### Running the app

```bash
# development
npm run start

# watch mode for development
npm run start:dev

# production mode
npm run start:prod
```

### Swagger

After start this app you can use swagger on the url [http://127.0.0.1/api/doc/](http://127.0.0.1/api/doc/). After that you can see all api method, which can use.

### Migrations

After install MongoDB you can use migrations for your project.

```bash
# start migrations
npm run migrate

# create migration
npm run create-migration {MIGRATION_NAME}
```

### Running Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Deployment

The easiest way to start this app - start it with docker-compose.

```
docker-compose up
```

but before you should prepare env variables.

## License

The [MIT License (MIT)](LICENSE).

Copyright (c) 2017-2019 Kamil Myśliwiec <http://kamilmysliwiec.com>

Copyright (c) 2019-present PixelPlex Inc. <https://pixelplex.io>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
