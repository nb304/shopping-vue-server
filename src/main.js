/**
 * ===============引入所需要用到的组件===============
 */
import App from './App'
import store from './store'
import router from './router'
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
// import {request} from './api/request'
import {
  get,
  post
} from './api/request'
import {
  mockXHR
} from '../mock'
import iView from 'iview'

import common from './utils/common.js' // 引入页面公共的组件方法
import filters from './filter/filter'

/**
 * ================引入的自己获取其他组件自带的样式文件===============
 */
import '@/icons' // icon
import '@/permission' // permission control
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import 'iview/dist/styles/iview.css' // 使用 CSS
import Checkbox from 'iview/src/components/checkbox' // 在 webpack 中按需使用组件，减少文件体积

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

/**
 * ================将自己定义好的变量和方法全局挂载到vue上===============
 * 如何调用呢》  在某个vue模板下 this.COMMON.方法名即可
 */
Vue.prototype.COMMON = common

/**
 * ================引入使用所需要用的组件===============
 */
Vue.use(ElementUI, {
  locale
})
Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$get = get
Vue.prototype.$post = post

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
