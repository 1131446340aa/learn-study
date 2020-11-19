import { insertRules } from '../core/controll/rules';
import { Rules } from '@common/types/api/rules/rulesReqModel';
import Router from 'koa-router';

const router = new Router()

router.prefix('/rules/');

router.post('/insert', async (ctx) => {
  const RulesInsertBody = ctx.request.body as Rules
  ctx.body = await insertRules(RulesInsertBody)
})

export default router 
