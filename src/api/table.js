// import request from '@/utils/request'

export function getList(params) {
  console.log(request({
    url: '/table/list',
    method: 'get',
    params
  }))
}
import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
Vue.use(axios)
Vue.use(qs)

export function productAjaxPost(url, params) {
  return axios.post(url, qs.stringify(params))
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
      console.log('错误')
    })
}

export function productAjaxGet(url, params) {
  return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
      console.log('错误')
    })
}
