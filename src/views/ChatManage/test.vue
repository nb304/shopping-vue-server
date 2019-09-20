<template>
  <context-menu
    class="right-menu"
    :target="contextMenuTarget"
    :show="contextMenuVisible"
    @update:show="(show) => contextMenuVisible = show"
  >
    <a href="javascript:;" @click="copyMsg">复制</a>
    <a href="javascript:;" @click="quoteMsg">引用</a>
    <a href="javascript:;" @click="deleteMsg">删除</a>
  </context-menu>
</template>

<script>

import { component as VueContextMenu } from '@xunlei/vue-context-menu'

export default {
  // ...
  components: {
    VueContextMenu
  }

}
</script>

<style lang="scss">
</style>
