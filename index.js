const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const server = new Koa();

server.use(bodyparser());
server.use(router.routes());

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));