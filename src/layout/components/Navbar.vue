<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">

      <el-dropdown>
        <div class="avatar-wrapper">

          <!-- ======================= 导航栏消息图标 =========================  -->
          <span class="el-dropdown-link">
            <!-- ======================= 导航栏消息图标 =========================  -->
            <el-badge v-if="isShowMessage" id="messageRed" is-dot class="item" title="提示">
              <svg-icon icon-class="message" class-name="message-class" />
            </el-badge>
            <el-badge v-else="isShowMessage" title="提示">
              <svg-icon icon-class="message" class-name="message-class" />
            </el-badge>
            <!-- ======================= 导航栏消息图标(结束) =========================  -->
          </span>
          <!-- ======================= 导航栏消息数据实体 =========================  -->
          <el-dropdown-menu slot="dropdown">
            <el-tabs type="border-card" style="width:350px;">
              <el-tab-pane label="全部消息" class="title-menu-min">
                <el-card v-for="value,key in messageInfos" shadow="hover" class="info">
                  <span :key="value.mid" style="width:100%; display:block;" @click="messageInfo(value.mid)">
                    {{ value.message }}
                  </span>
                </el-card>

              </el-tab-pane>
              <el-tab-pane label="未读消息" class="title-menu-min">未读消息</el-tab-pane>
              <el-tab-pane label="已读消息" class="title-menu-min">已读消息</el-tab-pane>
            </el-tabs>

          </el-dropdown-menu>
          <!-- ======================= 导航栏消息图标(结束) =========================  -->

        </div>

      </el-dropdown>

      <!-- ======================= 头像 =========================  -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
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
          <router-link to="/chatManage">
            <el-dropdown-item>
              <el-badge style="margin-bottom: 0px !important;" :value="3" class="item">
                <!-- @click="openMyInfos" -->
                <span>消息中心</span>
              </el-badge>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- ======================= 头像(结束) =========================  -->

    </div>

    <!-- ======================= 我的消息(电脑版) =========================  -->
    <el-dialog width="77%" custom-class="myInfos title-menu-min" :top="infoTopHtml" :close-on-click-modal="false" title="我的消息"
      :visible.sync="myInfosFLag" append-to-body v-if="!isInfoPhoneFlag">
      <el-row :gutter="24">
        <!-- ======================= 我的消息---左边消息列表 =========================  -->
        <el-col :sm="{span: 8}" :lg="{span:8}" :xs="{span: 0}">
          <div style="max-height: 500px; min-height: 31.25rem;" class="title-menu-min">
            <div style="width: 96%;">
              <el-divider content-position="right">
                <span>我的消息列表</span>
              </el-divider>
            </div>
            <el-row :gutter="24" style="width: 96%;">
              <!-- ======================= 单独一条消息 =========================  -->
              <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" v-for="o in 10" style="margin: 5px 0px !important; cursor: pointer;">


                <el-badge id="phoneBContent" style="margin-bottom: 0px !important;" :value="3" class="item">
                  <div>
                    <el-col :sm="{span: 5}" :lg="{span:5}" :xs="{span: 5}">
                      <div class="block">
                        <el-avatar :size="50" :src="avatarUrl"></el-avatar>
                      </div>
                    </el-col>
                    <el-col :sm="{span: 19}" :lg="{span:19}" :xs="{span: 19}">
                      <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                        <el-link :underline="false">鹿七七</el-link>
                      </el-col>
                      <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                        你好！公号{{o}}为你服务....
                      </el-col>
                    </el-col>
                    <el-col style="border-bottom: 1px solid #cccccc;" :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}">
                    </el-col>
                  </div>
                </el-badge>
              </el-col>

            </el-row>
          </div>
        </el-col>
        <!-- ======================= 我的消息---左边消息列表(结束) =========================  -->

        <!-- ======================= 具体消息 =========================  -->
        <el-col :sm="{span: 16}" :lg="{span:16}" :xs="{span: 24}">
          <div>
            <el-divider content-position="right">
              <span>鹿七七</span>
            </el-divider>
            <!-- ======================= 聊天记录 =========================  -->
            <el-card class="box-card title-menu-min" style="width: 100%; max-height: 300px; min-height: 300px; background-color: #E4E5E5;">
              <el-row v-for="o in liaojlS" style="margin-bottom: 10px;">
                <div v-if="o.flag == 'left'">
                  <el-col :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                    <div class="block">
                      <el-avatar shape="square" :size="50" :src="avatarUrl"></el-avatar>
                    </div>
                  </el-col>
                  <el-col :sm="{span: 18}" :lg="{span:18}" :xs="{span: 18}">
                    <el-card shadow="always" style="margin-left: 10px;" class="leftInfos">
                      <div :key="o" class="text item send" v-html="o.content" style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;">
                      </div>
                      <div :class="o.userClass"></div>
                    </el-card>
                  </el-col>
                </div>

                <div v-if="o.flag == 'right'">
                  <el-col :lg="{span:18,offset: 4}" :xs="{span: 18,offset: 2}">
                    <el-card shadow="always" style="margin-right: 15px;" class="rightInfos">
                      <div :key="o" class="text item send" v-html="o.content" style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;">
                      </div>
                      <div :class="o.userClass"></div>
                    </el-card>
                  </el-col>
                  <el-col :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                    <div class="block">
                      <el-avatar shape="square" :size="50" :src="avatarUrl"></el-avatar>
                    </div>
                  </el-col>
                </div>


              </el-row>

            </el-card>
            <!-- ======================= 聊天记录(结束) =========================  -->

            <!-- ======================= 富文本编辑器 =========================  -->
            <el-row>
              <quill-editor style="height: 100px;" ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
            </el-row>

            <!-- ======================= 富文本编辑器(结束) =========================  -->

            <el-row style="width: 6.25rem !important;">
              <el-button type="primary" @click="submit">发送消息</el-button>
            </el-row>
          </div>
        </el-col>
        <!-- ======================= 具体消息(结束) =========================  -->
      </el-row>

    </el-dialog>
    <!-- ======================= 我的消息(电脑版) (结束) =========================  -->

    <!-- ======================= 我的消息(手机版) =========================  -->
    <el-dialog width="77%" custom-class="myInfos title-menu-min" :top="infoTopHtml" :close-on-click-modal="false"
      :title="phoneTitle" :visible.sync="myInfosFLag" append-to-body v-if="isInfoPhoneFlag">


      <transition name="el-zoom-in-center">
        <div class="title-menu-min" style="max-height: 34.375rem !important; min-height: 34.375rem !important;" v-if="showInfoListsFlag">
          <el-row :gutter="24" v-for="o in 20">
            <el-badge id="phoneBContent" style="margin-bottom: 0px !important;" :value="3" class="item">
              <!-- ======================= 单独一条消息 =========================  -->
              <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 5px 0px !important; cursor: pointer;">
                <div @click="showChatWindowsFlagMethod">
                  <el-col :sm="{span: 3}" :lg="{span:3}" :xs="{span: 5}">
                    <div class="block">
                      <el-avatar :size="50" :src="avatarUrl"></el-avatar>
                    </div>
                  </el-col>
                  <el-col :sm="{span: 19}" :lg="{span:19}" :xs="{span: 19}">
                    <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                      <el-link :underline="false">鹿七七</el-link>
                    </el-col>
                    <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                      你好！公号{{o}}为你服务2333....
                    </el-col>
                  </el-col>
                  <el-col style="border-bottom: 1px solid #cccccc;" :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}">
                  </el-col>
                </div>
              </el-col>
              <!-- ======================= 单独一条消息(结束) =========================  -->
            </el-badge>
          </el-row>
        </div>
      </transition>
      <!-- ======================= 我的消息(结束) =========================  -->


      <!-- ======================= 手机端聊天窗口 =========================  -->
      <transition name="el-zoom-in-center">
        <div class="title-menu-min" style="max-height: 34.375rem !important; min-height: 34.375rem !important;" v-if="showChatWindowsFlag">
          <el-page-header @back="goPhoneInfoLists" content="消息列表">
          </el-page-header>

          <!-- ======================= 聊天记录 =========================  -->
          <el-card class="box-card title-menu-min" style="width: 100%; max-height: 350px; min-height: 350px; background-color: #E4E5E5;">
            <el-row v-for="o in liaojlS" style="margin-bottom: 10px;">
              <!-- ======================= 左边消息 =========================  -->
              <div v-if="o.flag == 'left'">
                <el-col :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                  <div class="block">
                    <el-avatar shape="square" :size="50" :src="avatarUrl"></el-avatar>
                  </div>
                </el-col>
                <el-col :sm="{span: 18}" :lg="{span:18}" :xs="{span: 18}">
                  <el-card shadow="always" style="margin-left: 10px;" class="leftInfos">
                    <div :key="o" class="text item send" v-html="o.content" style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;">
                    </div>
                    <div :class="o.userClass"></div>
                  </el-card>
                </el-col>
              </div>
              <!-- ======================= 左边消息(结束) =========================  -->

              <!-- ======================= 右边消息 =========================  -->
              <div v-if="o.flag == 'right'">
                <el-col :lg="{span:18,offset: 4}" :xs="{span: 18,offset: 2}">
                  <el-card shadow="always" style="margin-right: 15px;" class="rightInfos">
                    <div :key="o" class="text item send" v-html="o.content" style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;">
                    </div>
                    <div :class="o.userClass"></div>
                  </el-card>
                </el-col>
                <el-col class="phoneRightImage" :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                  <div class="block">
                    <el-avatar shape="square" :size="50" :src="avatarUrl"></el-avatar>
                  </div>
                </el-col>
              </div>
              <!-- ======================= 右边消息(结束) =========================  -->
            </el-row>

          </el-card>
          <!-- ======================= 聊天记录(结束) =========================  -->

          <!-- ======================= 富文本编辑器 =========================  -->
          <el-row>
            <quill-editor style="height: 100px;" ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
          </el-row>

          <el-row style="width: 6.25rem !important;">
            <el-button type="primary" @click="submit">发送消息</el-button>
          </el-row>

          <!-- ======================= 富文本编辑器(结束) =========================  -->
        </div>
      </transition>
      <!-- ======================= 手机端聊天窗口(结束) =========================  -->
    </el-dialog>
    <!-- ======================= 我的消息(手机版结束) =========================  -->
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
  // 工具栏配置
  const toolbarOptions = [
    ['image', 'video']
  ]
  export default {

    components: {
      Breadcrumb,
      Hamburger,
      quillEditor
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    created() {
      setInterval(() => {
        this.Home2()
      }, 1000)
    },
    methods: {
      openMyInfos() {
        this.COMMON.startLoading();
        this.myInfosFLag = true;
        this.COMMON.stopLoading();
      },
      submit() {
        var newPojo = {
          content: "LEFTINFO:" + this.$refs.text.value,
          userClass: "leftArrow",
          flag: "left"
        };
        var newPojo2 = {
          content: "RIGHTINFO:" + this.$refs.text.value,
          userClass: "rightArrow",
          flag: "right"
        };
        this.liaojlS.push(newPojo)
        this.liaojlS.push(newPojo2)
        this.content = "";
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
        this.phoneTitle = "消息列表";
        this.showInfoListsFlag = true;
        this.showChatWindowsFlag = false;
      },
      // 手机端显示发送消息窗口
      showChatWindowsFlagMethod() {
        this.phoneTitle = "鹿七七";
        this.showInfoListsFlag = false;
        this.showChatWindowsFlag = true;
      },
      messageInfo(id) {
        alert('消息实体' + id)
      }
    },
    data() {
      return {
        // 手机端聊天Title
        phoneTitle: "消息列表",
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
        isShowMessage: true,
        messageInfos: [{
            'mid': 1,
            'message': '信息1'
          },
          {
            'mid': 2,
            'message': '信息2'
          }
        ]
      }
    },
    mounted() {
      this.screenWidth = document.body.clientWidth
      this.screenHeight = document.body.clientHeight
      if (this.screenWidth <= 1000) {
        this.isInfoPhoneFlag = true
        this.infoTopHtml = '1vh'
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
