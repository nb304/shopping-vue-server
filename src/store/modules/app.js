import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    // 主页显示的flag操作
    showIndexChatInfoFlag: true,
    showChatInfoFlagDialog: false,
    showChatInfoFlagDialog2: false,
    showNewChatInfoFlag: false,
    // 用户的cookie
    userCookieKey: 'King2UserCookie',
    userNameCookieKey: 'king2LoginUserName',
    // 登录的用户信息
    loginUserInfo: null,
    // 聊天记录的消息
    userChatInfos: {
      newCharInfo:[],
      oldCharInfo:[]
    },
    // 头像
    image: '',
    // 定时查询聊天记录的定时器
    getCurrentInter: null
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
