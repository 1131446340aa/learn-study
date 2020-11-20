import { Ctx } from './../../oak/types.ts';
export default async function (ctx:Ctx) {
  return await ctx.request.body().value
}