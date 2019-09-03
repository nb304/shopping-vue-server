import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const chatStore = new Vuex.Store({
  chatInfoFlags: {
    indexShowFlag: false,
    chatInfoDivFlag: false
  }
})
export default chatStore
