<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统基础设置</h3>

      <div class="drawer-item">
        <span>系统主题</span>
        <theme-picker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
        />
      </div>
      <!--
      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch class="drawer-switch" />
      </div> -->
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
export default {
  components: { ThemePicker },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
