import url from 'url'

import { ServerResponse, IncomingMessage } from 'http'
import request from './request'
let response = {
  get url() {
    return this.req.url
  },
  get path() {
    return url.parse(this.req.url).pathname
  },
  get query() {
    return url.parse(this.req.url).query
  },
  req: {} as IncomingMessage,
  res: {} as ServerResponse,
  request,
  ctx: {}

}

export default response