// 用户请求的状态类
import Vue from 'vue' // 定义vue组件信息
import { getToken, setToken, removeToken } from '@/api/cookieUtil'
function checkReqeustState(data) {
  if (data.status == 401) {
    return false
  } else {
    return true
  }

}

export default {
  checkReqeustState
}
