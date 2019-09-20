<template>
  <div id="chatInfoDiv">
    <el-row>
      <el-row style="height: 40px;">
        <el-col :span="8">
          <el-input
            v-model="searchContent"
            size="mini"
            placeholder="搜索"
            style="width: 70% !important; margin-left: 10px;"
            suffix-icon="el-icon-search"
          />

          <i
            class="el-icon-refresh"
            style="cursor:pointer;font-size: 15px; margin-left: 10px;"
            title="刷新列表"
            @click="F5ChatList"
          />
        </el-col>
        <el-col
          :span="16"
          style="padding-left: 20px; font-weight: bold; font-size: 17px;"
        >{{ currentFunctionObj.name }}
        </el-col>
        <el-divider style="margin-bottom: 33px !important;" />
      </el-row>
      <el-col v-loading="isLoadingInfoLists" :span="8" element-loading-text="同步聊天列表中,请稍等">
        <div style="max-height: 500px; min-height: 500px; background: #FAFAFA;" class="title-menu-min2">
          <!-- 单独一条信息 -->
          <el-backtop />

          <!-- 无消息 -->
          <el-col
            v-if="($store.state.app.sidebar.userChatInfos.newCharInfo == null || $store.state.app.sidebar.userChatInfos.newCharInfo.length < 1) &&
              ($store.state.app.sidebar.userChatInfos.oldCharInfo == null || $store.state.app.sidebar.userChatInfos.oldCharInfo.length < 1)"
            :span="24"
          >
            <div style="text-align: center; margin-top: 20px; font-size: 18px; color: #BDBDBD;">
              暂时无会话
            </div>

          </el-col>
          <!-- 无消息End -->

          <!-- 新消息 -->
          <el-col
            v-for="(o,index) in $store.state.app.sidebar.userChatInfos.newCharInfo"
            v-if="$store.state.app.sidebar.userChatInfos.newCharInfo != null && $store.state.app.sidebar.userChatInfos.newCharInfo.length > 0"
            :span="24"
            style="margin: 2px 0; cursor: pointer;"
          >
            <div @click="getInfo(o , index,'new')" @contextmenu.prevent="rightClick">

              <div :class="o.clazz" style="width: 100%; height: 50px; background: #FAFAFA;"><!---->
                <div class="el-card__body">
                  <!-- 头像 -->
                  <el-col :span="4" style="height: 100% !important;">
                    <el-avatar
                      shape="square"
                      :size="40"
                      :src="o.image"
                    />
                  </el-col>
                  <!-- 头像End -->

                  <!-- 信息内容 -->
                  <el-col :span="16">
                    <div style="font-weight: bold;">
                      {{ o.name }}
                    </div>
                    <div class="autocut" style="color: #cccccc; font-size: 12px;" v-html="o.content" />
                  </el-col>
                  <!-- 信息内容End -->
                  <!-- 时间以及条数 -->
                  <el-col :span="4" style="text-align: center; ">
                    <div style="color: #cccccc; font-size: 12px;">
                      {{ o.time }}
                    </div>
                    <div style="margin-top: 7px; ">
                      <el-badge :value="o.notReadSize" :max="99" class="item" />
                    </div>
                  </el-col>
                  <!-- 时间以及条数End -->
                </div>
              </div>
            </div>
          </el-col>
          <!-- 单独一条信息End -->
          <!-- 新消息 End -->

          <!-- 历史消息 -->
          <el-col
            v-for="(o,index) in $store.state.app.sidebar.userChatInfos.oldCharInfo"
            v-if="$store.state.app.sidebar.userChatInfos.oldCharInfo != null && $store.state.app.sidebar.userChatInfos.oldCharInfo.length > 0"
            :span="24"
            style="margin: 2px 0; cursor: pointer;"
          >
            <div @click="getInfo(o , index,'old')" @contextmenu.prevent="rightClick">
              <div :class="o.clazz" style="width: 100%; height: 50px; background: #FAFAFA;"><!---->
                <div class="el-card__body">
                  <!-- 头像 -->
                  <el-col :span="4" style="height: 100% !important;">
                    <el-avatar
                      shape="square"
                      :size="40"
                      :src="o.image"
                    />
                  </el-col>
                  <!-- 头像End -->

                  <!-- 信息内容 -->
                  <el-col :span="16">
                    <div style="font-weight: bold;">
                      {{ o.name }}
                    </div>
                    <div class="autocut" style="color: #cccccc; font-size: 12px;" v-html="o.content" />
                  </el-col>
                  <!-- 信息内容End -->
                  <!-- 时间以及条数 -->
                  <el-col :span="4" style="text-align: center; ">
                    <div style="color: #cccccc; font-size: 12px;">
                      {{ o.time }}
                    </div>
                    <div style="margin-top: 7px; ">
                      <el-badge :value="o.notReadSize" :max="99" class="item" />
                    </div>
                  </el-col>
                  <!-- 时间以及条数End -->
                </div>
              </div>
            </div>
          </el-col>
          <!-- 单独一条信息End -->
          <!-- 历史消息 End -->
        </div>
      </el-col>

      <!-- 无消息 -->
      <el-col
        v-if="currentFunctionObj == null || currentFunctionObj == ''"
        :span="16"
      >
        <div style="text-align: center; margin-top: 20px; font-size: 18px; color: #BDBDBD;">
          <img
            style="width: 300px;"
            src="http://39.105.41.2:9000/king2-product-image/BDDFF87E-A0D0-40A9-A659-3788C2283F8D.gif"
          >
          <br>
          为什么没有人找我聊天呢QVQ???????
        </div>
      </el-col>
      <!-- 无消息 -->
      <!-- 内容体 -->
      <el-col
        v-if="currentFunctionObj != null && currentFunctionObj != ''"
        v-loading="isLoadingGetUserChatInfo"
        element-loading-text="正在同步聊天记录"
        :span="16"
      >
        <div ref="scrolldIV" class="chatInfoContent scrolldivmain title-menu-min2">
          <!-- 一组消息 -->
          <div @scroll="100">
            <!-- 消息的时间 -->
            <span style="text-align: center; display: block; color: #bababa;">{{ currentTime }}</span>

            <!-- 对方 -->
            <!-- 消息的时间 END -->
            <el-row v-for="(o , index) in currentFunctionChatInfo" style="position: relative;margin: 5px 0px;">
              <!-- 自己发送的 -->
              <div v-if="o.flag">

                <!-- 自己 -->
                <el-col :span="18" :offset="4">
                  <div
                    style="background-color: #2683F5;border-radius: 4px;
                 padding: 3px 10px; margin-bottom:20px;min-height: 35px; line-height: 30px; color: #fff;"
                    v-html="o.chaoInfoMessage"
                  />
                </el-col>
                <el-col :span="2" style="text-align: right;">
                  <el-avatar
                    shape="square"
                    :size="45"
                    :src="o.image"
                  />
                </el-col>
                <el-col
                  :span="5"
                  :offset="18"
                  style="position: absolute;bottom: -2px;color: #bababa;"
                >
                  {{ o.createTimeStr }}
                </el-col>
                <!-- 自己END -->
              </div>
              <!-- 别人发送的 -->
              <div v-else>
                <!-- 头像 -->
                <el-col :span="2">
                  <el-avatar
                    shape="square"
                    :size="45"
                    :src="o.image"
                  />
                </el-col>
                <!-- 消息内容 -->
                <el-col :span="18">
                  <div
                    style="margin-bottom:20px;background-color: #EEEEEE;border-radius: 4px;
                 padding: 3px 10px; min-height: 35px; line-height: 30px;"
                    v-html="o.chaoInfoMessage"
                  />
                </el-col>
                <el-col :span="5" :offset="2" style="position: absolute;bottom: -2px;color: #bababa;">
                  {{ o.createTimeStr }}
                </el-col>
                <!-- 对方 END-->
              </div>
            </el-row>
          </div>

          <!-- 一组消息END -->

        </div>
        <div>
          <quill-editor
            ref="text"
            v-model="content"
            style="height: 120px; margin-right: 1px;"
            :options="editorOption"
          />
        </div>
        <div
          v-loading="sendMessageLoading"
          style="width: 6.25rem !important; position: absolute; right: 10px;"
          element-loading-text="发送中"
        >
          <el-button size="mini" @click="sendMessage">发送消息</el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {
  quillEditor
} from 'vue-quill-editor'
import {
  productAjaxPost,
  productAjaxGet
} from '@/api/table.js'
  // 工具栏配置
const toolbarOptions = [
  ['image', 'video']
]
import elDragDialog from '@/el-drag-dialog'

export default {
  directives: {
    elDragDialog
  },
  components: {
    quillEditor
  },
  data() {
    return {
      // 发送的加载按钮
      sendMessageLoading: false,
      // 当前时间
      currentTime: '',
      // 加载信息列表
      isLoadingInfoLists: false,
      // 加载详细信息
      isLoadingGetUserChatInfo: false,
      // 当前操作的消息
      currentFunctionIndex: null,
      currentFunctionObj: '',
      currentFunctionType: '',
      // 当前操作的用户以及和他的聊天记录
      currentFunctionChatInfo: [],
      // 新消息
      newChatInfos: [],
      // 旧消息
      oleChatInfos: [],
      // 聊天的内容
      content: '',
      menuVisible: false,
      // 搜索
      searchContent: '',
      // 富文本数据
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: '请输入您要发送的消息'
      }
    }
  },
  created() {
    this.F5ChatList()
  },
  methods: {
    youjiFunction(obj) {
    },
    // 发送消息
    sendMessage() {
      // 发送的消息要存入旧的信息中
      if (this.content.trim() == '') {
        return
      }
      this.sendMessageLoading = true
      // 发送AJAX添加数据
      var url = '/char/info/send/message'
      var param = { 'receiveId': this.currentFunctionObj.userId, 'message': this.content }
      productAjaxPost(url, param).then(data => {
        if (data.status == 200) {
          this.sendMessageLoading = false
          var para = {
            'chaoInfoMessage': this.content,
            'createTimeStr': this.timeToString(new Date()),
            'flag': true,
            'image': this.$store.state.app.sidebar.image
          }
          if (this.currentFunctionType == 'new') {
            this.newChatInfos[this.currentFunctionIndex].content = this.content
          } else {
            this.oleChatInfos[this.currentFunctionIndex].content = this.content
          }
          this.currentFunctionChatInfo.push(para)
          this.content = ''
          this.$nextTick(() => {
            var scrollTop = this.$el.querySelector('.scrolldivmain')
            scrollTop.scrollTop = scrollTop.scrollHeight
          })
        } else if (data.status == 500) {
          this.$message({
            showClose: true,
            message: data.msg + '--修改失败,请重新刷新页面',
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })
          this.sendMessageLoading = false
        } else {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })
          this.sendMessageLoading = false
        }
      })
    },
    timeToString(time) {
      var date = new Date(time)
      var year = date.getFullYear() + '-'
      var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date
        .getMonth() + 1) +
          '-'
      date = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
      return year + month + date
    },
    getInfo(o, index, type) {
      this.currentTime = this.timeToString(new Date())
      this.currentFunctionType = type
      // 取消上一次的clazz
      if (this.currentFunctionIndex != null) {
        if (type == 'old') {
          this.oleChatInfos[this.currentFunctionIndex].clazz = 'el-card is-hover-shadow'
        } else if (type == 'new') {
          this.newChatInfos[this.currentFunctionIndex].clazz = 'el-card is-hover-shadow'
        }
      }
      this.isLoadingGetUserChatInfo = true
      this.currentFunctionObj = o
      if (type == 'old') {
        this.oleChatInfos[index].clazz = 'el-card is-always-shadow clazzBack'
      } else {
        this.newChatInfos[index].clazz = 'el-card is-always-shadow clazzBack'
      }
      if (this.newChatInfos != null && this.newChatInfos.length > 0) {
        this.newChatInfos[index].notReadSize = null
      }
      this.currentFunctionIndex = index
      this.F5CurrentChatInfos()
      var inter = setInterval(() => {
        if (!this.isLoadingGetUserChatInfo) {
          this.$nextTick(() => {
            var scrollTop = this.$el.querySelector('.scrolldivmain')
            scrollTop.scrollTop = scrollTop.scrollHeight
          })
          window.clearInterval(inter)
        }
      }, 10)
    },
    F5CurrentChatInfos() {
      if (this.$store.state.app.sidebar.getCurrentInter != null) {
        window.clearInterval(this.$store.state.app.sidebar.getCurrentInter)
        this.$store.state.app.sidebar.getCurrentInter = null
      }
      this.$store.state.app.sidebar.getCurrentInter = setInterval(() => {
        // 发送Ajax
        var url = '/char/info/get'
        var param = { 'getId': this.currentFunctionObj.userId }
        productAjaxPost(url, param).then(data => {
          if (data.status == 200) {
            this.isLoadingGetUserChatInfo = false
            this.currentFunctionChatInfo = data.data
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg + '--修改失败,请重新刷新页面',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })
          }
        })
      }, 1000)
    },
    F5ChatList() {
      this.isLoadingInfoLists = true
      var url = '/char/info/index'
      productAjaxPost(url).then(data => {
        if (data.status == 200) {
          // 修改成功  判断状态 修改状态
          this.newChatInfos = data.data.newCharInfo
          this.oleChatInfos = data.data.oldCharInfo
          this.isLoadingInfoLists = false
          this.$message({
            showClose: true,
            message: '加载完成',
            type: 'success'
          })
        } else if (data.status == 500) {
          this.$message({
            showClose: true,
            message: data.msg + '--修改失败,请重新刷新页面',
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })

          this.isLoadingInfoLists = false
        } else {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })
          this.isLoadingInfoLists = false
        }
      })
    }
  }

}
</script>

<style>
  /*新加入隐藏滚动条效果*/
  #chatInfoDiv .title-menu-min2 {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  #chatInfoDiv .title-menu-min2::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  #chatInfoDiv .title-menu-min2::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  #chatInfoDiv .title-menu-min2::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  #chatInfoDiv .title-menu-min2 .el-card__body {
    padding: 5px 5px 0 5px !important;
    height: 100% !important;
  }

  #chatInfoDiv .autocut {
    width: 99%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }

  #chatInfoDiv .chatInfoContent {
    max-height: 330px;
    min-height: 330px;
    padding: 10px;
  }

  #chatInfoDiv .el-divider {
    margin-top: 33px !important;
    margin-bottom: 0px !important;
  }

  .clazzBack {
    background-color: #F3F3F3 !important;
  }

</style>
