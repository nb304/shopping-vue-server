<template>
  <transition name="el-zoom-in-center">
    <div @click="openMyInfos" v-if="$store.state.app.sidebar.showIndexChatInfoFlag" id="chatInfoClass">
      <el-image
        v-if="$store.state.app.sidebar.showNewChatInfoFlag"
        title="来新消息了"
        style="width: 48px; height: 48px;border-radius: 10px;"
        src="http://39.105.41.2:9000/king2-product-image/35d03e933fcf5f3a6c2d55ce51ce8222.gif"
        fit="contain"
      />
      <div
        v-else
        title="消息中心"
        style="border-radius: 7px; background-color: #1890FF; width: 100%; height: 100%; text-align: center;"
      >
        <i class="el-icon-message-solid" style="color: #fff; line-height: 48px; font-size: 20px;"/>
      </div>
    </div>

    <el-dialog
      v-el-drag-dialog
      width="77%"
      :close-on-click-modal="false"
      :modal="true"
      title="我的消息"
      :visible.sync="$store.state.app.sidebar.showChatInfoFlagDialog2 "
      custom-class="chatInfoClass"
      top="7vh"
      @close="closeChatInfo"
    >
      <chat-info/>
    </el-dialog>
  </transition>

</template>

<script>

  import chatInfo from '@/views/ChatManage/ChatInfo.vue'

  import elDragDialog from '@/el-drag-dialog'

  export default {
    directives: {
      elDragDialog
    },

    components: {
      chatInfo
    },
    methods: {
      // 关闭消息
      closeChatInfo() {
        this.$store.state.app.sidebar.showChatInfoFlagDialog2 = false
        this.$store.state.app.sidebar.showIndexChatInfoFlag = true
        if(this.$store.state.app.sidebar.getCurrentInter != null) {
          window.clearInterval(this.$store.state.app.sidebar.getCurrentInter)
          this.$store.state.app.sidebar.getCurrentInter = null
        }

      },
      openMyInfos() {
        this.COMMON.startLoading()
        this.$store.state.app.sidebar.showChatInfoFlagDialog2 = true
        this.$store.state.app.sidebar.showIndexChatInfoFlag = false
        this.$store.state.app.sidebar.showNewChatInfoFlag = false
        this.COMMON.stopLoading()
      }
    }
  }
</script>

<style>
  #chatInfoClass {
    width: 48px;
    height: 48px;
    position: fixed;
    top: 150px;
    right: 0px;
    z-index: 9999999999;
    cursor: pointer;
  }
</style>
