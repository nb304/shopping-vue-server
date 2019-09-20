<!-- 商品评论管理 -->
<template>
  <div id="productCommentDiv">
    <div style="height: 550px;">
      <el-row class="spusRowClass" :gutter="24">
        <el-col :sm="{span: 4}" :xs="{span:24}">
          <div class="block">
            <el-avatar
              shape="square"
              :size="77"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            />
          </div>
        </el-col>
        <el-col :sm="{span: 19}" :xs="{span:24}">
          <el-card class="box-card" style="width:100%;">
            <div class="text item">
              <el-divider content-position="left">评价人</el-divider>
              <el-link type="primary">鹿七七七</el-link>
              <el-divider content-position="left">商品参数</el-divider>
              红色,16GB,中国大陆
              <el-divider content-position="left">评价内容</el-divider>
              <div class="title-menu-min" style="max-height:200px; ">
                <span
                  style=" width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;"
                >
                  <span v-for="o in 1000">d</span>
                </span>
              </div>

              <el-divider content-position="left">评价时间</el-divider>
              2019-07-03 11:53
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductComment'
}
</script>

<style scoped>

</style>
