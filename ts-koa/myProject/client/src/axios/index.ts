import { ResRules } from './../../../common/types/api/rules/rulesResModel';
import { ResponseMsg } from './../../../common/types/api/api-response';

import axios, { AxiosRequestConfig } from 'axios'
import { Rules } from '../../../common/types/api/rules/rulesReqModel';

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true;
let baseUrl = 'http://localhost:8083'

function fetch(baseUrl: string, url: string, obj: AxiosRequestConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    axios(baseUrl + url, obj).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(error => {
      reject(error)
    })
  })
}

function fetchPost<T extends object>(url: string, data?: T) {
  return fetch(baseUrl, url, {
    data,
    method: 'post',
    headers: { 'content-Type': 'application/json' }
  })
}
function fetchGet<T extends object>(url: string, params?: T) {
  return fetch(baseUrl, url, {
    params,
    method: 'get',
    // headers: { 'content-Type': 'application/json' }
  })
}

export const PostInsertRules = async function (fn: (res: ResponseMsg<ResRules>) => void, params?: Rules) {
  const res = await fetchPost('/rules/insert', params);
  return fn(res);
}

