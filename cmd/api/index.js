import Vue from 'vue'
import $ from '../libs/fetch'

class Api {
  constructor (api) {
    this.api = api
    // @ts-ignore： $Api<T>  是一个有属性的对象
    this.$api = {}
    this.init()
  }
  init () {
    this.api.forEach(api => {
      // @ts-ignore： api.name 是$api的属性
      this.$api[api.name] = async function (options) {
        let res = {
          data: {}
        }
        //是否有loading
        let flag = options.loading && this instanceof Vue
        try {
          // @ts-ignore：
          flag && (this[options.loading] = true)
          //对get和post分别处理
          const { url, methods, headers } = api
          if (api.methods === 'get' || api.methods === 'delete') {
            res = await $.fetch({
              url,
              method: methods,
              headers,
              params: options.params
            })
          } else {
            res = await $.fetch({
              url,
              method: methods,
              headers,
              data: options.params
            })
          }
          // @ts-ignore：
          flag && (this[options.loading] = false)
        } catch ({ response: { data } }) {
          // @ts-ignore：
          flag && (this[options.loading] = false)
          processMsg(options, data)
          return
        }
        if (successCode(res, options)) {
          //请求成功
          //成功数据
          let result =
            res.data[options.responseProp] ||
            res.data.data ||
            res.data.list ||
            res.data
          if (!result) {
            throw new Error('请检查网络请求返回参数')
          } else {
            let msg = ''
            if (result.length === 0 && options.nullMsg !== '') {
              //处理空提示
              msg = options.nullMsg || res.data.msg || '返回结果为空'
              Vue.prototype.$message(msg)
            } else {
              //处理成功提示
              if (options.successMsg !== '') {
                msg = options.successMsg || res.data.msg
                Vue.prototype.$message(msg)
              }

              options.success && options.success.call(this, res.data)
            }
          }
        } else {
          //错误状态码
          flag && (this[options.loading] = false)
          processMsg(options, res.data)
        }
      }
    })
  }
}

function successCode (res, options) {
  return (
    res.data.code === options.code ||
    res.data.code == 200 ||
    res.data.code === 0
  )
}

function processMsg (options, data) {
  let msg = ''
  if (options.errorMsg !== '') {
    msg = options.errorMsg || data.msg || '服务端错误'
    Vue.prototype.$message.error(msg)
  }
  options.error && options.error.call(this, data)
}
export default Api
