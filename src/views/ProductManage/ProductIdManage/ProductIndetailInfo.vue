<!-- 商品详细信息 -->
<template>
  <div id="productIDInfoDiv">
    <el-row :gutter="24">
      <el-col :sm="{span: 8}" :xs="{span:24}">
        <div class="block">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <el-image
                style="width: 100%; height: 100%"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fill"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :sm="{span: 15}" :xs="{span:24}">

        <el-col :sm="{span: 24}" :xs="{span:24}">
          <el-tabs v-model="productActiveName">
            <el-tab-pane
              label="商品基础信息"
              name="first"
            >
              <div class="title-menu-min" style="max-height: 400px;">
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">商品名称</el-divider>
                    DW手表
                  </el-card>
                </el-col>
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">商品价格</el-divider>
                    1200.00￥
                  </el-card>
                </el-col>
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">商品类型</el-divider>
                    手表
                  </el-card>
                </el-col>

                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">库存数量</el-divider>
                    手表
                  </el-card>
                </el-col>

                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">商品状态</el-divider>
                    手表
                  </el-card>
                </el-col>

                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">卖出数量</el-divider>
                    手表
                  </el-card>
                </el-col>

                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">库存状态</el-divider>
                    手表
                  </el-card>
                </el-col>
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">所属商家</el-divider>
                    手表
                  </el-card>
                </el-col>
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">商品品牌</el-divider>
                    手表
                  </el-card>
                </el-col>
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">收藏量</el-divider>
                    手表
                  </el-card>
                </el-col>
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">卖出量</el-divider>
                    手表
                  </el-card>
                </el-col>
                <el-col :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">月浏览量</el-divider>
                    手表
                  </el-card>
                </el-col>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品评论列表" name="second">
              <el-row :gutter="24">
                <el-col :sm="{span: 8}" :xs="{span:8}">
                  <el-button type="primary" style="width:100%;padding:12px 0px; ">好评</el-button>
                </el-col>
                <el-col :sm="{span: 8}" :xs="{span:8}">
                  <el-button type="primary" style="width:100%;padding:12px 0px; ">中评</el-button>
                </el-col>
                <el-col :sm="{span: 8}" :xs="{span:8}">
                  <el-button type="primary" style="width:100%;padding:12px 0px; ">差评</el-button>
                </el-col>
              </el-row>
              <div class="title-menu-min" style="max-height: 400px">
                <span v-for="o in 10" style="cursor: pointer;" @click="showCommentInfo(o)">
                  <el-col :span="24" :xs="{span:24}">
                    <el-card shadow="hover" style="margin-top:10px;">
                      <el-divider content-position="left">
                        <el-link type="primary">鹿七七</el-link> 2019-07-02 20:54
                      </el-divider>
                      <span>
                        手表很好用 很满意手表很好用 很满意手表很好用 很满意手表很好用 很满意手表很好用 很满意手表很好用 <br>很满意手表很好用 很满意手表很好用 很满意手表很好用
                        很满意手表很好用 很满意手表很好用
                        很满意
                      </span>

                    </el-card>
                  </el-col>
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品参数列表" name="third">
              <div class="title-menu-min" style="max-height: 400px;">
                <el-col v-for="o in 10" :span="8" :xs="{span:24}">
                  <el-card shadow="hover" style="margin-bottom:10px;">
                    <el-divider content-position="left">品牌 {{ o }}</el-divider>
                    DW手表
                  </el-card>
                </el-col>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="商品配置"
              name="fourth"
              class="title-menu-min el-tab-paneClass"
              style="max-height: 220px;"
            >
              <div class="title-menu-min" style="max-height: 400px;">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="配置名称" min-width="150" />
                  <el-table-column prop="province" label="排序" width="120" />
                  <el-table-column prop="name" label="配置参数" fixed="right" width="120" />
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-col>
    </el-row>

    <!-- 商品评论 -->
    <el-dialog
      v-el-drag-dialog
      width="50%"
      :close-on-click-modal="true"
      :modal="false"
      title="商品评论信息"
      :visible.sync="productCommentFlag"
      custom-class="product_comment_class"
      top="7vh"
    >
      <product-comment />

      <el-col :sm="{span: 8,offset: 5}" style="margin-bottom: 20px; position: absolute; bottom: 0px;" :xs="{span: 23}">
        <el-button style="width: 100%;" @click="productCommentFlag = false">关闭窗口</el-button>
      </el-col>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/el-drag-dialog'
import productComment from './ProductComment.vue'

export default {
  components: {
    productComment
  },
  directives: {
    elDragDialog
  },
  data() {
    return {
      // 商品评价消息flag
      productCommentFlag: false,
      productActiveName: 'first'
    }
  },
  methods: {
    showCommentInfo(id) {
      this.$message({
        type: 'info',
        message: '评论详细信息:id=' + id
      })
      this.productCommentFlag = true
    }
  }
}
</script>

<style>

  @media only screen and (min-width: 300px) and (max-width: 1000px) {
    .product_comment_class {
      width: 99% !important;
    }
  }

  .product_comment_class {
    position: relative;
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
</style>
