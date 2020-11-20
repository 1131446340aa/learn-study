import { _obj } from './../types/interface.ts'
import { Ctx } from './../../oak/types.ts'
export default async function (ctx: Ctx) {
    return (await ctx.state.session?.get('blog'))?.data[0].userName as string
}
