const Router = require('koa-router');
const { getAno } = require('./controllers/anos');

const router = new Router();

router.get('/getAno/:ano', getAno);

module.exports = router;
