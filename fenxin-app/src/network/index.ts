
import axios, { AxiosRequestConfig } from 'axios'
import { AxiosDate } from "../interface/index"
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true;
let baseUrl = 'http://localhost:8083'
interface Obj{
  [key:string]:any
}

type _func=(res: AxiosDate) => any
function fetch(baseUrl: string, url: string, obj: AxiosRequestConfig): Promise<any> {
  return new Promise((reslove, reject) => {
    axios(baseUrl + url, obj).then(response => {
      reslove(response.data)
    }, err => {
        reject(err)
    }).catch(error => {
      reject(error)
    })
  })
}

function fetchPost(url: string, data?: Obj) {
  return fetch(baseUrl, url, {
    data,
    method: 'post',
    headers:{'content-Type':'application/json'}
  })
}
function fetchGet(url: string, params?: Obj) {
  return fetch(baseUrl, url, {
    params,
    method: 'get',
    // headers: { 'content-Type': 'application/json' }
  })
}
export const PostRegister = async function (fn:(res:any)=>any,params?:Obj) {
  const res = await fetchPost('/register', params);
  return fn(res);
}

export const PostLogin = async function (fn: _func, params?: Obj) {
  const res = await fetchPost('/login', params);
  return fn(res);
}
export const GetUserInfo = async function (fn: _func, params?: Obj) {
  const res = await fetchGet('/getUserinfo', params);
  return fn(res);
}
export const PostPublish = async function (params: Obj,fn?: _func, ) {
  const res = await fetchPost('/publish', params)
  return fn && fn(res)
}
export const getAllArticle = async function (fn: _func, params: Obj) {
  const res = await fetchGet('/findAllArticle', params)
  return fn(res)
}
export const getArticleById = async function (fn: _func, params: Obj) {
  const res = await fetchGet('/findArticleInfo', params)
  return fn(res)
}
export const addArticleSawCount = async function (fn: _func, params: Obj) {
  const res = await fetchGet('/addSawCount', params)
  return fn(res)
}
export const updateApproveInfo = async function (fn: _func, params: Obj) {
  const res = await fetchPost('/updateApprove', params)
  return fn(res)
}
export const updatecollectionInfo = async function (fn: _func, params: Obj) {
  const res = await fetchPost('/updateCollection', params)
  return fn(res)
}
export const getAllCommet = async function (fn: _func, params: Obj) {
  const res = await fetchGet('/getCommetByArticleId', params)
  return fn(res)
}
export const addCommit = async function (fn: _func, params: Obj) {
  const res = await fetchPost('/addComment', params)
  return fn(res)
}
export const postUpdateLove = async function (fn: _func, params: Obj) {
  const res = await fetchPost('/updateLove', params)
  return fn(res)
}
export const exit =async function (fn: _func) {
  const res = await fetchPost("/exit")
  return fn(res)
}
export const allLoves =async function (fn: _func,params: Obj) {
  const res = await fetchGet("/allLoves",params)
  return fn(res)
}
export const updtateInfo =async function (fn: _func,params: Obj) {
  const res = await fetchPost("/updateInfo",params)
  return fn(res)
}
export const getOtherUserInfo =async function (fn: _func,params: Obj) {
  const res = await fetchGet("/getOtherUserInfo",params)
  return fn(res)
}
export default axios