<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">

      <el-dropdown trigger="click">
        <div class="avatar-wrapper">

          <!-- ======================= 导航栏消息图标 =========================  -->
          <span class="el-dropdown-link">
            <!-- ======================= 导航栏消息图标 =========================  -->
            <el-badge trigger="click" v-if="isShowMessage" id="messageRed" is-dot class="item" title="提示">
              <svg-icon icon-class="message" class-name="message-class"/>
            </el-badge>
            <el-badge trigger="click" v-else="isShowMessage" title="提示">
              <svg-icon icon-class="message" class-name="message-class"/>
            </el-badge>
            <!-- ======================= 导航栏消息图标(结束) =========================  -->
          </span>
          <!-- ======================= 导航栏消息数据实体 =========================  -->
          <el-dropdown-menu slot="dropdown" style="position: relative;">
            <div style="position: absolute; top: 20px; right: 20px; z-index: 999999999999999;">
              <el-link type="warning" style="display: inline;" @click.stop="messageState(2)"
                       :disabled="wDMessage.length < 1">全部已读
              </el-link>
              <el-link type="danger" style="display: inline;" @click.stop="messageState(3)"
                       :disabled="wDMessage.length <1 && yDMessage.length < 1">全部删除
              </el-link>
            </div>
            <el-tabs type="border-card" style="width:820px !important; max-height: 500px !important;"
                     class="title-menu-min">


              <el-tab-pane label="全部消息">

                <el-badge value="new" style="margin-bottom:  0px !important; width: 97% !important;"
                          v-for="(value,index) in wDMessage">
                  <el-card shadow="hover" class="info"
                           style="margin-bottom: 5px; cursor: pointer;">
                  <span :key="value.messageId" style="width:100%; display:block;" @click="messageInfo(index , value)">
                    {{ value.subStringContent }}...<span style="color: #cccccc;">&nbsp;&nbsp;&nbsp;单击查看详细信息</span>
                    <span style="float: right; font-size: 15px; color: #cccccc; font-weight: bold;" title="删除消息"
                          @click.stop="delInfo2(index , value)">x</span>
                  </span>

                  </el-card>
                </el-badge>


                <el-card v-for="(value,index) in yDMessage" shadow="hover" class="info"
                         style="margin-bottom: 5px; cursor: pointer;">
                  <span :key="value.messageId" style="width:97%; display:block;" @click="messageInfo(index , value)">
                     {{ value.subStringContent }}...<span style="color: #cccccc;">&nbsp;&nbsp;&nbsp;单击查看详细信息</span>
                    <span style="float: right; font-size: 15px; color: #cccccc; font-weight: bold;" title="删除消息"
                          @click.stop="delInfo2(index , value)">x</span>
                  </span>
                </el-card>

                <el-card shadow="hover" class="info" v-if="yDMessage.length < 1 && wDMessage.length < 1"
                         style="margin-bottom: 5px; cursor: pointer;">
                  <span style="width:100%; display:block;">
                    没有任何消息~~~~
                  </span>
                </el-card>

              </el-tab-pane>
              <el-tab-pane label="未读消息">
                <el-card v-for="(value,index) in wDMessage" shadow="hover" class="info"
                         style="margin-bottom: 5px; cursor: pointer;">
                  <span :key="value.messageId" style="width:100%; display:block;" @click="messageInfo(index , value)">
                     {{ value.subStringContent }}...<span style="color: #cccccc;">&nbsp;&nbsp;&nbsp;单击查看详细信息</span>
                    <span style="float: right; font-size: 15px; color: #cccccc; font-weight: bold;" title="删除消息"
                          @click.stop="delInfo2(index , value)">x</span>
                  </span>
                </el-card>
                <el-card shadow="hover" class="info" v-if="wDMessage.length < 1"
                         style="margin-bottom: 5px; cursor: pointer;">
                  <span style="width:100%; display:block;">
                    没有任何消息~~~~
                  </span>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="已读消息">
                <el-card v-for="(value,index) in yDMessage" shadow="hover" class="info"
                         style="margin-bottom: 5px; cursor: pointer;">
                  <span :key="value.messageId" style="width:100%; display:block;" @click="messageInfo(index , value)">
                     {{ value.subStringContent }}...<span style="color: #cccccc;">&nbsp;&nbsp;&nbsp;单击查看详细信息</span>
                    <span style="float: right; font-size: 15px; color: #cccccc; font-weight: bold;" title="删除消息"
                          @click.stop="delInfo2(index , value)">x</span>
                  </span>
                </el-card>

                <el-card shadow="hover" class="info" v-if="yDMessage.length < 1"
                         style="margin-bottom: 5px; cursor: pointer;">
                  <span style="width:100%; display:block;">
                    没有任何消息~~~~
                  </span>
                </el-card>
              </el-tab-pane>

            </el-tabs>

          </el-dropdown-menu>
          <!-- ======================= 导航栏消息图标(结束) =========================  -->


          <el-drawer
            title="消息内容" @click.stop
            :visible.sync="drawer"
            direction="rtl">
            <p style="text-align: center; color: #99a9bf;">{{currentMessageFrom.value.createTimeStr}}</p>
            <br>
            <span style="font-size: 14px; letter-spacing: 1px;" v-html="messageContent"></span>
            <el-link type="danger" @click="delInfo">删除消息</el-link>
            <br/>
          </el-drawer>

        </div>

      </el-dropdown>

      <!-- ======================= 头像 =========================  -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              <span @click="Home">主页</span>
            </el-dropdown-item>
          </router-link>
          <router-link to="/my">
            <el-dropdown-item>
              <span>个人中心</span>
            </el-dropdown-item>
          </router-link>
          <router-link v-if="chatInfoFlag" to="/chatManage">
            <el-dropdown-item>
              <el-badge style="margin-bottom: 0px !important;" :value="3" class="item">
                <!-- @click="openMyInfos" -->
                <span>消息中心</span>
              </el-badge>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item v-else>
            <div @click="openMyInfos">
              <el-badge style="margin-bottom: 0px !important;" :value="3" class="item">
                <!-- @click="openMyInfos" -->
                <span>消息中心</span>
              </el-badge>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- ======================= 头像(结束) =========================  -->

    </div>


    <el-dialog v-el-drag-dialog
               width="77%"
               :close-on-click-modal="false"
               :modal="true"
               title="我的消息"
               :visible.sync="myInfosFLag2"
               custom-class="chatInfoClass"
               top="7vh"
    >
      <chat-info></chat-info>
    </el-dialog>
  </div>


</template>

<script>

  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import {
    quillEditor
  } from 'vue-quill-editor'

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {
    productAjaxPost,
    productAjaxGet
  } from '@/api/table.js'

  import chatInfo from '@/views/ChatManage/ChatInfo.vue'

  var systemUrl = ''
  // 工具栏配置
  const toolbarOptions = [
    ['image', 'video']
  ]
  import elDragDialog from '@/el-drag-dialog'

  export default {
    directives: {
      elDragDialog
    },
    data() {
      return {
        chatInfoFlag: false,
        myInfosFLag2: false,
        currentMessageFrom: {
          id: '',
          value: '',
          index: 0
        },
        // 消息内容
        messageContent: '',
        // 是否打开消息窗口
        drawer: false,
        // 已读消息和未读消息
        yDMessage: [],
        wDMessage: [],
        // 手机端聊天Title
        phoneTitle: '消息列表',
        // 手机聊天消息列表
        showInfoListsFlag: true,
        // 手机聊天窗口
        showChatWindowsFlag: false,
        screenWidth: '',
        screenHeight: '',
        infoTopHtml: '',
        isInfoPhoneFlag: false,
        liaojlS: [],
        content: '',
        editorOption: {
          modules: {
            toolbar: toolbarOptions
          }
        },
        avatarUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        myInfosFLag: false,
        isShowMessage: false

      }
    },
    components: {
      Breadcrumb,
      Hamburger,
      quillEditor,
      chatInfo
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    created() {
      var url = systemUrl + '/user/message/get/state'
      setInterval(() => {
        productAjaxGet(url).then(data => {

          if (data.status == 200) {
            if (data.msg == 'yes') {

              this.wDMessage = data.data
              this.isShowMessage = true
            } else {
              this.isShowMessage = false
            }
          } else {
            this.$message({
              showClose: true,
              message: data.msg + '--请重新刷新页面',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })
          }
        })
      }, 2000)
    },
    mounted() {

      // 发送AJAX查询后台数据
      var url = systemUrl + '/shop/index'

      productAjaxGet(url).then(data => {
        if (data.status == 200) {
          if (data.data != null) {
            this.yDMessage = data.data.yDMessage
            this.wDMessage = data.data.wDMessage
          }

          this.COMMON.stopLoading()
        } else {
          this.$message({
            showClose: true,
            message: data.msg + '--请重新刷新页面',
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })

          this.COMMON.stopLoading()
        }
      })

      this.screenWidth = document.body.clientWidth
      this.screenHeight = document.body.clientHeight
      if (this.screenWidth <= 500) {
        this.isInfoPhoneFlag = true
        this.infoTopHtml = '1vh'
        this.chatInfoFlag = true
      } else {
        this.isInfoPhoneFlag = false
        this.infoTopHtml = '10vh'
      }
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
          this.screenHeight = document.body.clientHeight
          // 判断宽度是否小于500 小于500 全部全屏显示
          if (this.screenWidth <= 1000) {
            this.isInfoPhoneFlag = true
            this.infoTopHtml = '1vh'
          } else {
            this.isInfoPhoneFlag = false
            this.infoTopHtml = '10vh'
          }
        })()
      }
    },
    methods: {

      // 删除全部或者全部已读
      messageState(state) {
        if (state == 2) {

          var url = systemUrl + '/user/message/clear/or/read'
          var para = {'state': 2}
          productAjaxPost(url, para).then(data => {
            if (data.status == 200) {
              // 修改成功  判断状态 修改状态
              this.wDMessage.forEach(data => {
                data.state = 2
                this.yDMessage.push(data)
              })

              this.wDMessage = []
              this.COMMON.stopLoading()
            } else if (data.status == 500) {
              this.$message({
                showClose: true,
                message: data.msg + '--修改失败,请重新刷新页面',
                type: 'error',
                duration: 3000,
                customClass: 'zzIndex'
              })

              this.COMMON.stopLoading()
            } else {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error',
                duration: 3000,
                customClass: 'zzIndex'
              })

              this.COMMON.stopLoading()
            }
          })

        } else {
          this.$confirm('你确定要删除全部信息吗?', '确认框', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            var url = systemUrl + '/user/message/clear/or/read'
            var para = {'state': 3}
            productAjaxPost(url, para).then(data => {
              if (data.status == 200) {
                // 修改成功  判断状态 修改状态
                this.wDMessage = []
                this.yDMessage = []

                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
                this.COMMON.stopLoading()
              } else if (data.status == 500) {
                this.$message({
                  showClose: true,
                  message: data.msg + '--修改失败,请重新刷新页面',
                  type: 'error',
                  duration: 3000,
                  customClass: 'zzIndex'
                })

                this.COMMON.stopLoading()
              } else {
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error',
                  duration: 3000,
                  customClass: 'zzIndex'
                })

                this.COMMON.stopLoading()
              }
            })
          }).catch(() => {

          })
        }
      },
      // 删除信息2
      delInfo2(index, value) {
        console.log(index)
        console.log(value)

        // 发送AJAX 将消息变成已读信息
        var url = systemUrl + '/user/message/edit/state'
        var para = {'messageId': value.messageId, 'messageState': 3}
        productAjaxPost(url, para).then(data => {
          if (data.status == 200) {
            // 修改成功  判断状态 修改状态w
            // 获取原来的信息状态
            if (value.state == 1) {
              this.wDMessage.splice(index, 1)
            } else if (value.state == 2) {
              this.yDMessage.splice(index, 1)
            }
            this.COMMON.stopLoading()
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg + '--删除失败,请重新刷新页面',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.COMMON.stopLoading()
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.COMMON.stopLoading()
          }
        })
      },
      // 删除信息
      delInfo() {
        this.$confirm('你确定要删除信息吗?', '确认框', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editMessageInfoState(this.currentMessageFrom.index, this.currentMessageFrom.value, 3)
          this.drawer = false
        }).catch(() => {

        })
      },
      openMyInfos() {
        this.COMMON.startLoading()
        this.myInfosFLag2 = true
        this.COMMON.stopLoading()

      },
      submit() {
        var newPojo = {
          content: 'LEFTINFO:' + this.$refs.text.value,
          userClass: 'leftArrow',
          flag: 'left'
        }
        var newPojo2 = {
          content: 'RIGHTINFO:' + this.$refs.text.value,
          userClass: 'rightArrow',
          flag: 'right'
        }
        this.liaojlS.push(newPojo)
        this.liaojlS.push(newPojo2)
        this.content = ''
        console.log(this.$refs.text.value)
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      async Home() {
        console.log('123')
      },
      Home2() {
        this.isShowMessage = !this.isShowMessage
      },
      // 手机端返回消息列表
      goPhoneInfoLists() {
        this.phoneTitle = '消息列表'
        this.showInfoListsFlag = true
        this.showChatWindowsFlag = false
      },
      // 手机端显示发送消息窗口
      showChatWindowsFlagMethod() {
        this.phoneTitle = '鹿七七'
        this.showInfoListsFlag = false
        this.showChatWindowsFlag = true
      },
      messageInfo(index, obj) {
        this.currentMessageFrom.value = obj
        this.drawer = true
        this.messageContent = obj.messageContent
        this.currentMessageFrom.index = index
        if (obj.state == 1) {
          this.editMessageInfoState(index, obj, 2)
        }
      },
      // 修改信息的状态
      editMessageInfoState(index, obj, state) {
        // 发送AJAX 将消息变成已读信息
        var url = systemUrl + '/user/message/edit/state'
        var para = {'messageId': obj.messageId, 'messageState': state}
        productAjaxPost(url, para).then(data => {
          if (data.status == 200) {
            // 修改成功  判断状态 修改状态
            if (state == 2) {
              obj.state = 2
              this.wDMessage.splice(index, 1)
              this.yDMessage.push(obj)
            } else if (state == 3) {
              // 获取原来的信息状态
              if (obj.state == 1) {
                this.yDMessage.splice(this.yDMessage.length - 2, 1)
              } else if (obj.state == 2) {
                console.log('index' + index)
                this.yDMessage.splice(index, 1)
              }
            }
            this.COMMON.stopLoading()
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg + '--修改失败,请重新刷新页面',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.COMMON.stopLoading()
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.COMMON.stopLoading()
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  #phoneBContent .el-badge__content {
    margin-top: 0.625rem !important;
  }

  @media only screen and (min-width: 413px) and (max-width: 420px) {
    .leftArrow {
      left: 54px !important;
    }

    .rightArrow {
      right: 59px !important;
    }

    .phoneRightImage {
      padding-left: 5px !important;
    }
  }

  @media only screen and (min-width: 340px) and (max-width: 400px) {
    .leftArrow {
      display: none !important;
    }

    .rightArrow {
      display: none !important;
    }
  }

  @media only screen and (min-width: 1200px) and (max-width: 1400px) {
    .rightInfos {
      margin-right: 22px !important;
    }

    .leftInfos {
      margin-left: 17px !important;
    }
  }

  .send {
    position: relative;
    border-radius: 5px;
    /* 圆角 */
    height: 100%;
  }

  .chatInfoClass .el-dialog__body {
    padding: 0px 0px !important;
  }


  .leftArrow {
    position: absolute;
    top: 5px;
    left: 55px;
    /* 圆角的位置需要细心调试哦 */
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 8px;
    border-color: #E4E5E5 #FFFFFF #E4E5E5 #E4E5E5;
  }

  .rightArrow {
    position: absolute;
    top: 5px;
    right: 60px;
    /* 圆角的位置需要细心调试哦 */
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 8px;
    border-color: #E4E5E5 #E4E5E5 #E4E5E5 #FFFFFF;
  }

  .navbar .el-tab-pane {
    max-height: 400px;
    overflow: auto !important;
  }

  .navbar .info {
    margin: 10px 0px;
  }

  .el-card__body {
    padding: 10px 10px !important;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }

  /*新加入隐藏滚动条效果*/
  .title-menu-min {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  .title-menu-min::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  .title-menu-min::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .title-menu-min::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .el-dropdown-menu {
    position: absolute;
    top: 30px !important;
  }

  .mark {
    position: absolute;
    right: 25px;
    top: 12px;
  }

  .text {
    font-size: 14px;
  }

  .box-card {
    width: 300px;
  }

  .el-badge {
    margin-bottom: 30px;
  }

  #messageRed .el-badge__content {
    margin-top: 12px !important;
    margin-right: 6px;
  }

  .message-class {
    height: 25px !important;
    width: 25px !important;
    padding: 5px 5px 0 0;
    cursor: pointer;
  }

  @media only screen and (min-width: 300px) and (max-width: 500px) {
    .myInfos {
      width: 100% !important;
    }

    .myInfos .el-col {
      padding-right: 0rem !important;
    }
  }

  .el-drawer__body img {
    width: 300px !important;
  }

  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
