import url from 'url'
import response from './response'
import { ServerResponse, IncomingMessage } from 'http'
let request = {
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
  ctx: {}
  // response

}

export default request