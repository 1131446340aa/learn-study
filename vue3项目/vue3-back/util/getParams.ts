import { _obj } from './../types/interface.ts';
import { Ctx } from './../../oak/types.ts';
export default function (ctx: Ctx) {
  let obj: _obj = {}
   for (let [key,value] of ctx.request.url.searchParams) {
     obj[key] =value
   }
  return obj
}