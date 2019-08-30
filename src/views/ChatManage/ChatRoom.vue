<!--======消息中心模板=======-->
<template>

  <div style="margin: 30px 0px; 30px 0">

    <!-- ======================= 我的消息(电脑版) =========================  -->
    <div v-if="!isInfoPhoneFlag">
      <!-- ======================= 我的消息---左边消息列表 =========================  -->
      <el-col :sm="{span: 8}" :lg="{span:8}" :xs="{span: 0}">
        <div style="max-height: 550px; min-height: 550px;" class="title-menu-min">
          <div style="width: 96%;">
            <el-divider content-position="right">
              <span>我的消息列表</span>
            </el-divider>
          </div>
          <div v-if="newChatInfos == null || newChatInfos.length < 1">

            <el-alert
              title="没有任何消息"
              type="info"
              :closable="false"
              effect="dark">
            </el-alert>
          </div>
          <el-row v-if="newChatInfos != null && newChatInfos.length > 1" :gutter="24" v-for="o in newChatInfos"
                  style="width: 96%;">
            <!-- ======================= 单独一条消息 =========================  -->
            <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}"
                    style="margin: 5px 0px !important; cursor: pointer;">

              <el-badge id="phoneBContent" style="margin-bottom: 0px !important;" :value="3" class="item">
                <div>
                  <el-col :sm="{span: 5}" :lg="{span:5}" :xs="{span: 5}">
                    <div class="block">
                      <el-avatar :size="50" :src="avatarUrl"/>
                    </div>
                  </el-col>
                  <el-col :sm="{span: 19}" :lg="{span:19}" :xs="{span: 19}">
                    <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                      <el-link :underline="false">鹿七七</el-link>
                    </el-col>
                    <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                      你好！公号{{ o }}为你服务....
                    </el-col>
                  </el-col>
                  <el-col style="border-bottom: 1px solid #cccccc;" :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}"/>
                </div>
              </el-badge>
            </el-col>

          </el-row>
        </div>
      </el-col>
      <!-- ======================= 我的消息---左边消息列表(结束) =========================  -->

      <!-- ======================= 具体消息 =========================  -->
      <el-col :sm="{span: 16}" :lg="{span:16}" :xs="{span: 24}">
        <div v-if="newChatInfos == null || newChatInfos.length < 1">

          <el-alert
            title="没有任何消息"
            type="info"
            :closable="false"
            effect="dark">
          </el-alert>
        </div>
        <div v-if="newChatInfos != null && newChatInfos.length > 1">
          <el-divider content-position="right">
            <span>鹿七七</span>
          </el-divider>
          <!-- ======================= 聊天记录 =========================  -->
          <el-card class="box-card title-menu-min"
                   style="width: 100%; max-height: 370px; min-height: 370px; background-color: #E4E5E5;">
            <el-row v-for="o in liaojlS" style="margin-bottom: 10px;">
              <div v-if="o.flag == 'left'">
                <el-col :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                  <div class="block">
                    <el-avatar shape="square" :size="50" :src="avatarUrl"/>
                  </div>
                </el-col>
                <el-col :sm="{span: 18}" :lg="{span:18}" :xs="{span: 18}">
                  <el-card shadow="always" style="" class="leftInfos">
                    <div :key="o" class="text item send"
                         style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;"
                         v-html="o.content"/>
                    <!-- <div :class="o.userClass"></div> -->
                  </el-card>
                </el-col>
              </div>

              <div v-if="o.flag == 'right'">
                <el-col :lg="{span:18,offset: 4}" :xs="{span: 18,offset: 2}">
                  <el-card shadow="always" style="margin-right: 15px;" class="rightInfos">
                    <div :key="o" class="text item send"
                         style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;"
                         v-html="o.content"/>
                    <!-- <div :class="o.userClass"></div> -->
                  </el-card>
                </el-col>
                <el-col :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                  <div class="block">
                    <el-avatar shape="square" :size="50" :src="avatarUrl"/>
                  </div>
                </el-col>
              </div>

            </el-row>

          </el-card>
          <!-- ======================= 聊天记录(结束) =========================  -->

          <!-- ======================= 富文本编辑器 =========================  -->
          <el-row>
            <quill-editor ref="text" v-model="content" style="height: 100px;" class="myQuillEditor"
                          :options="editorOption"/>
          </el-row>

          <!-- ======================= 富文本编辑器(结束) =========================  -->

          <el-row style="width: 6.25rem !important;">
            <el-button type="primary" @click="submit">发送消息</el-button>
          </el-row>
        </div>
      </el-col>
      <!-- ======================= 具体消息(结束) =========================  -->
      </el-row>
    </div>
    <!-- ======================= 我的消息(电脑版结束) =========================  -->

    <!-- ======================= 我的消息(手机版) =========================  -->
    <div v-if="isInfoPhoneFlag">
      <!-- ======================= 我的消息 =========================  -->
      <transition name="el-zoom-in-center">
        <div v-if="showInfoListsFlag">
          <el-row v-for="o in 20" :gutter="24">
            <el-badge id="phoneBContent" style="margin-bottom: 0px !important;" :value="3" class="item">
              <!-- ======================= 单独一条消息 =========================  -->
              <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}"
                      style="margin: 5px 0px !important; cursor: pointer;">
                <div @click="showChatWindowsFlagMethod">
                  <el-col :sm="{span: 3}" :lg="{span:3}" :xs="{span: 5}">
                    <div class="block">
                      <el-avatar :size="50" :src="avatarUrl"/>
                    </div>
                  </el-col>
                  <el-col :sm="{span: 19}" :lg="{span:19}" :xs="{span: 19}">
                    <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                      <el-link :underline="false">鹿七七</el-link>
                    </el-col>
                    <el-col :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}" style="margin: 2px 0px;">
                      你好！公号{{ o }}为你服务2333....
                    </el-col>
                  </el-col>
                  <el-col style="border-bottom: 1px solid #cccccc;" :sm="{span: 24}" :lg="{span:24}" :xs="{span: 24}"/>
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
        <div v-if="showChatWindowsFlag" class="title-menu-min"
             style="max-height: 34.375rem !important; min-height: 34.375rem !important;">
          <el-page-header content="消息列表" @back="goPhoneInfoLists"/>

          <!-- ======================= 聊天记录 =========================  -->
          <el-card class="box-card title-menu-min"
                   style="width: 100%; max-height: 350px; min-height: 350px; background-color: #E4E5E5;">
            <el-row v-for="o in liaojlS" style="margin-bottom: 10px;">
              <!-- ======================= 左边消息 =========================  -->
              <div v-if="o.flag == 'left'">
                <el-col :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                  <div class="block">
                    <el-avatar shape="square" :size="50" :src="avatarUrl"/>
                  </div>
                </el-col>
                <el-col :sm="{span: 18}" :lg="{span:18}" :xs="{span: 18}">
                  <el-card shadow="always" style="margin-left: 10px;" class="leftInfos">
                    <div :key="o" class="text item send"
                         style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;"
                         v-html="o.content"/>
                    <!-- <div :class="o.userClass"></div> -->
                  </el-card>
                </el-col>
              </div>
              <!-- ======================= 左边消息(结束) =========================  -->

              <!-- ======================= 右边消息 =========================  -->
              <div v-if="o.flag == 'right'">
                <el-col :lg="{span:18,offset: 4}" :xs="{span: 18,offset: 2}">
                  <el-card shadow="always" style="margin-right: 15px;" class="rightInfos">
                    <div :key="o" class="text item send"
                         style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;"
                         v-html="o.content"/>
                    <!-- <div :class="o.userClass"></div> -->
                  </el-card>
                </el-col>
                <el-col class="phoneRightImage" :sm="{span: 2}" :lg="{span:2}" :xs="{span: 4}">
                  <div class="block">
                    <el-avatar shape="square" :size="50" :src="avatarUrl"/>
                  </div>
                </el-col>
              </div>
              <!-- ======================= 右边消息(结束) =========================  -->
            </el-row>

          </el-card>
          <!-- ======================= 聊天记录(结束) =========================  -->

          <!-- ======================= 富文本编辑器 =========================  -->
          <el-row>
            <quill-editor ref="text" v-model="content" style="height: 100px;" class="myQuillEditor"
                          :options="editorOption"/>
          </el-row>

          <el-row style="width: 6.25rem !important;">
            <el-button type="primary" @click="submit">发送消息</el-button>
          </el-row>

          <!-- ======================= 富文本编辑器(结束) =========================  -->
        </div>
      </transition>
      <!-- ======================= 手机端聊天窗口(结束) =========================  -->
    </div>
    <!-- ======================= 我的消息(手机版结束) =========================  -->
  </div>
</template>

<script>
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
  import {
    productAjaxPost,
    productAjaxGet
  } from '@/api/table.js'

  export default {

    components: {
      quillEditor
    },
    data() {
      return {

        // 新消息
        newChatInfos: [],
        // 旧消息
        oleChatInfos: [],
        //////////////////////////////////////////
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
    },
    methods: {
      // 打开我的消息
      openMyInfos() {
        this.COMMON.startLoading()
        this.myInfosFLag = true
        this.COMMON.stopLoading()
      },
      // 发送消息
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
      }
    },
    created() {
      this.COMMON.startLoading()
      var url = '/char/info/index'
      productAjaxPost(url).then(data => {
        console.log(data)
        if (data.status == 200) {
          // 修改成功  判断状态 修改状态
          this.newChatInfos = data.data.newCharInfo
          this.oleChatInfos = data.data.oldCharInfo
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
</script>
<style>

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
    left: 67px;
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
    right: 71px;
    /* 圆角的位置需要细心调试哦 */
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 8px;
    border-color: #E4E5E5 #E4E5E5 #E4E5E5 #FFFFFF;
  }
</style>
