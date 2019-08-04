import Vue from 'vue' // 定义vue组件信息

// =======定义全局加载数据框方法 开始======================
const loading = null
function startLoading(mess) {
  this.loading = Vue.prototype.$loading({
    lock: true,
    text: mess == null ? '努力加载中...' : mess,
    background: 'rgba(0,0,0,0.5)',
    spinner: 'el-icon-loading'
    // target: document.querySelector('.loading-area') // 设置加载动画区域
  })
}
function stopLoading() {
  this.loading.close()
}
// =======定义全局加载数据框方法 结束======================

export default { // 将方法和变量抛出
  startLoading,
  stopLoading
}
