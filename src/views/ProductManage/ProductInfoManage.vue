<template>
  <div>
    <p-image v-if="$store.state.app.sidebar.isImageIf"></p-image>
    <p-txt v-else></p-txt>
  </div>
</template>

<script>

  import pImage from './ProductInfoManage-Image.vue'
  import pTxt from './ProductInfoManage-txt.vue'

  export default {
    name: 'ProductInfoManage.vue',
    components: {
      pImage,
      pTxt
    }
  }
</script>

<style scoped>

</style>
