import { IncomingMessage, ServerResponse, createServer, RequestListener } from 'http'

import { EventEmitter } from 'events'
import content from './content'

import request from './request'

import response from './response'

type Noop = () => void
type Content = IncomingMessage & ServerResponse & {
  request: typeof request,
  response: typeof response,
  req: IncomingMessage,
  res: ServerResponse,
  body: any
}
type CtxFn = (ctx?: Content) => void
class Koa extends EventEmitter {
  fn: CtxFn
  request: typeof request
  content: typeof content
  response: typeof response
  constructor() {
    super()
  }
  use(fn: CtxFn) {
    this.fn = fn
    this.content = content
    this.request = request
    this.response = response
  }
  private createContext(req: IncomingMessage, res: ServerResponse) {
    const ctx: Content = Object.create(this.content)

    const request1 = ctx.request = Object.create(this.request) as typeof request
    const response1 = ctx.response = Object.create(this.response) as typeof response
    ctx.req = request1.req = response1.req = req
    ctx.res = request1.res = response1.res = res
    request1.ctx = response1.ctx
    request1.response = response1
    response1.request = request1
    return ctx
  }
  handleRequest(req: IncomingMessage, res: ServerResponse) {
    let ctx = this.createContext(req, res)
    this.fn(ctx)
    res.end(ctx.body)
  }
  listen(clientNumber: number, callBack: Noop) {
    createServer()
    createServer(this.handleRequest.bind(this)).listen(clientNumber, callBack)
  }
}

const app = new Koa()

app.use(ctx => {
  ctx.request
})
app.listen(3000, () => {
  console.log(123);

})