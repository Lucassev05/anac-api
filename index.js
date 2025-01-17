const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./src/routes');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const server = new Koa();

server.use(cors());

server.use(bodyparser());

server.use(router.routes());

server.listen(PORT, () => {});
