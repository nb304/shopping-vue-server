import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.use(axios)
Vue.use(qs)

// //自动切换环境
// // if (process.env.NODE_ENV === "development") {
// //   axios.default.baseURL = "XXXX"
// // } else if (process.env.NODE_ENV === "production") {
// //   axios.default.baseURL = "XXXX"
// // }

// //设置超时时间
axios.defaults.timeout = 100000
// // post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求公共url
const deturl = 'http://192.168.124.5:7778' // 俞  蛋壳公寓
// let deturl = 'http://192.168.0.143:7778' // 俞 公司
// let deturl = 'http://192.168.124.11:7778'    // 刘

//  get方法，对应get请求
//  @param {String} url [请求的url地址]
//  @param {Object} params [请求时携带的参数]

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(`${deturl}${url}`, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

//  post方法，对应post请求
//  @param {String} url [请求的url地址]
//  @param {Object} params [请求时携带的参数]
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(`${deturl}${url}`, qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

// //请求拦截器(请求发出前处理请求)
// axios.interceptors.request.use(
//   config => {
//     // 每次发送请求之前判断是否存在token
//     // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
//     token && (config.headers.Authorization = token)
//     return config
//   },
//   error => {
//     return Promise.error(error)
//   }),

// // 响应拦截器
// axios.interceptors.response.use(response => {
//   // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//   // 否则的话抛出错误
//   if (response.status === 200) {
//     if (response.data.code === 511) {
//       // 未授权调取授权接口
//     } else if (response.data.code === 510) {
//       // 未登录跳转登录页
//     } else {
//       return Promise.resolve(response)
//     }
//   } else {
//     return Promise.reject(response)
//   }
// }, error => {
//   // 我们可以在这里对异常状态作统一处理
//   if (error.response.status) {
//     // 处理请求失败的情况
//     // 对不同返回码对相应处理
//     // 请求失败，这个地方可以根据error.response.status统一处理一些界面逻辑，比如status为401未登录,可以进行重定向
//     // router.replace({
//     //     path: '/login',
//     //     query: { redirect: router.currentRoute.fullPath }
//     //    });
//     return Promise.reject(error.response)
//   }
// })
