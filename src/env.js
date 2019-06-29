import path from "path";
import {version, name} from './../package.json'
const debug = require('debug')('api:film')

const ENV = {
    NAME:name,
    VERSION: version,

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "doudou",
    DB_PWD: process.env.DB_PWD || "masta",
    DB_COLLECTION: process.env.DB_COLLECTION || "filmCollection",

    PORT: process.env.PORT || 80,

    REST_PATH: process.env.REST_PATH || path.join(__dirname, "rest")
};

debug({ENV});

export default ENV;