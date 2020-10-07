const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');

const { formatarErro } = require('./src/utils/resposta');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const server = new Koa();

server.use(bodyparser());

// server.use((ctx, next) => {
// 	if (ctx.url.includes('/getAno/') && ctx.method === 'GET') {
// 		next();
// 	} else {
// 		formatarErro(ctx, 'Requisição Inválida', 400);
// 	}
// });

server.use(router.routes());

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
