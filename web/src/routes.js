const router = require('koa-router')();
const Promise = require('bluebird');
const co = Promise.coroutine;

/**
 * GET all years.
 */

router.get('/', (ctx, next) => {
  ctx.body = {
    body: 'All the events!'
  }
});

/**
 * GET year by :year.
 */

router.get('/:year', co(function *(ctx, next) {
  const year_query = `dh_${ctx.params.year}`;
  if (!databaseList.hasOwnProperty(year_query)) return ctx.throw(404);

  // ctx.body = yield eventModel.listAll(year_query)

  // this would go in some sort of controller;
  web.use(function* () {
    this.render('index', yield eventModel.listAll(year_query));
  });
}));


module.exports = router;
