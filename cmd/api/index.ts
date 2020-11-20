
interface Headers {
  'Api-Type': string;
}
interface Apis<T> {
  name: T;
  url: string;
  headers: Headers
  methods: 'get' | 'post' | 'put' | 'delete';
}

export interface ApiOptions<P, V> {
  //错误返回函数
  error?: <T extends object>(object: object) => T,
  //成功返回函数
  success?: <T extends object>(object: V) => T,
  //错误提示,默认调用msg属性>服务器错误，传“” 不生效  > === 优先
  errorMsg?: string,
  //成功提示，默认调用msg属性，不传不生效
  successMsg?: string,
  //返回数据空数组提示，默认调用msg属性>返回结果为空，传“” 不生效
  nullMsg?: string
  //是否显示loading =>v-loading 键值
  loading?: string,
  //接口参数
  params?: P,
  //接口返回的数据所在参数名。默认data或者list，data > list
  responseProp?: string,
  //成功状态码 默认200 或者 0 ,200 > 0
  code?: number
}

interface Response {
  data: {
    data?: [],
    list?: [],
    code?: number,
    msg?: string
  }
}

class Api<T extends string> {
  '$api': { [K in T]: (ApiOptions: ApiOptions<any, any>) => void }
  constructor(private api: Apis<T>[]) {
  }
  private init() { }
}

function successCode(res: Response, options: ApiOptions<any, any>) {
}

function processMsg(options: ApiOptions<any, any>, data: Response['data']) {
}
export default Api

