<template>

  <div id="productInfoPigDiv">

    <!-- ======================= 商品信息按钮集合 =========================  -->
    <el-row>

      <el-form ref="form" :model="pageInfo" label-width="80px">
        <el-col :lg="{span: 6}" :xs="{span: 24}" :sm="{span: 24}">
          <el-form-item label="商品状态">
            <el-select v-model="pageInfo.state" placeholder="选择商品状态" style="width: 100% !important;">
              <el-option v-for="state in productState" :key="state.value" :label="state.key" :value="state.value"/>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}" :sm="{span: 24}">
          <el-form-item label="搜索商品">
            <el-input v-model="pageInfo.productName" placeholder="请输入商品名称" style="width: 100% !important;"/>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}" :sm="{span: 24}">

          <el-form-item label="">
            <el-button
              class="searchButton"
              type="primary"
              icon="el-icon-search"
              style="width:  100%;"
              @click="serachBtnFunction()"
            >搜索
            </el-button>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}" :sm="{span: 24}">

          <el-form-item label="">
            <el-button type="primary" class="searchButton" style="width: 100%; " @click.stop="showAddProduct">
              <svg-icon
                icon-class="tianjia"
                class-name=""
                style="width:14px !important; height:14px !important; margin-right:10px;"
              />
              添加商品
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>

    </el-row>
    <!-- ======================= 商品信息按钮集合(结束) =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>数量:{{ pageInfo.totalSize }}件</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 商品内容信息 =========================  -->
    <el-row v-loading="loadingProductInfo" element-loading-text="查询商品信息中">
      <el-col
        v-for="(o,index) in productData"
        :lg="{span: 12}"
        :xs="{span: 24}"
        :sm="{span: 24}"
        style="margin: 0 0px 10px 0"
      >
        <el-card class="box-card" style="width: 97% !important; height: 250px;">
          <div slot="header" class="clearfix">
            <span>{{ o.productName }}</span>
            <span style="padding-left: 20px;" id="productStateSpan">

              <span style="font-weight: bold;">商品当前状态：</span>
              <el-link v-if="o.productState == 1" type="primary" :underline="false">上架
            </el-link>
            <el-link v-else-if="o.productState == 2" type="danger" :underline="false">下架
            </el-link>
            <el-link v-else-if="o.productState == 3" type="danger" :underline="false">删除
            </el-link>
            <el-link
              v-else-if="o.productState == 4"
              slot-scope="scope"
              type="warning"
              :underline="false"
              @click="editZhongGoToShangJia(index , o.productId)"
            >编辑中
            </el-link>
            <el-link v-else-if="o.productState == 5" type="warning" :underline="false">审核中
            </el-link>
            <el-link v-else-if="o.productState == 6" type="primary" :underline="false">库存充足
            </el-link>
            <el-link v-else-if="o.productState == 7" type="warning" :underline="false">库存不足
            </el-link>
            <el-link v-else-if="o.productState == 8" type="danger" :underline="false">审核不通过
            </el-link>
            <el-link v-else type="danger" :underline="false">未知状态</el-link>
            </span>
            <el-dropdown style="float: right; cursor: pointer;" trigger="click">
              <span
                class=" el-dropdown-link
            "
                style="color: #409EFF;"
              >
                其他信息<i class="el-icon-arrow-down el-icon--right"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-document">
                  <span style="height: 100%;" @click="productIndetailInfoFlag = true">商品详细信息</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-view">
                  <span @click="findProductCategory(o.categoryName)">商品所属类目</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-potato-strips">
                  <span @click="findProductSpu(o.productId)">商品参数信息</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-cpu">
                  <span @click="findProductSku(o.productId)">商品配置信息</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit">
                  <span @click="editProduct(index , o.productId)">修改商品信息</span>
                </el-dropdown-item>
                <el-dropdown-item v-if="o.productState != 2" icon="el-icon-download">
                  <span style="color: red;" @click="delProduct(index , o , 2)">下架商品</span>
                </el-dropdown-item>

                <el-dropdown-item v-if="o.productState == 2" icon="el-icon-upload2">
                  <span style="color: #00B627;" @click="delProduct(index , o , 1)">上架商品</span>
                </el-dropdown-item>

                <el-dropdown-item v-if="o.productState != 3" icon="el-icon-delete">
                  <span style="color: red;" @click="delProduct(index , o , 3)">删除商品</span>
                </el-dropdown-item>
                <el-dropdown-item v-else icon="el-icon-check">
                  <span style="color: #00B627;" @click="delProduct(index , o  , 1)">恢复商品</span>
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="float: left; width: 40% !important;">
            <el-image
              style="width: 100%; height: 100%"
              :src="o.productImage"
              fit="fill"
            />
          </div>

          <div
            style="float: left; width: 55% !important; margin-left: 10px; max-height: 180px !important;"
            class="title-menu-min"
          >
            <div class="text item">
              <span class="ccc_color">商品名称:</span>
              <span class="p_value">{{ o.productName }}</span>
            </div>
            <div class="text item">
              <span class="ccc_color">总库存:</span>
              <span class="p_value">{{ o.totalKc }}</span>
            </div>

            <div class="text item">
              <span class="ccc_color">添加日期:</span>
              <span span class="p_value">{{ o.productCreateTimeStr }}</span>
            </div>
            <div class="text item">
              <span class="ccc_color">商品分类:</span> <span span class="p_value">{{ o.categoryName }}</span>
            </div>

            <div class="text item">
              <span class="ccc_color">商品卖点:</span> <span span class="p_value">{{ o.productPoints }}</span>
            </div>

          </div>
        </el-card>
      </el-col>

    </el-row v-f>
    <!-- ======================= 商品内容信息(结束) =========================  -->

    <!-- ======================= 分页 =========================  -->
    <el-row :gutter="24" style="margin-top: 20px; position: fixed; bottom: 5px; background-color: #FFFFFF">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-pagination
          :small="pageFlag"
          :pager-count="5"
          :current-page="pageInfo.currentPage"
          :page-sizes="[1,2,3,5,10]"
          hide-on-single-page="true"
          :page-size="pageInfo.currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.totalSize"
          @size-change="productCurrentSize"
          @current-change="productCurrentPage"
        />

      </el-col>
    </el-row>
    <!-- ======================= 分页(结束) =========================  -->

    <!-- ======================= 商品详细信息 =========================  -->
    <el-dialog
      v-el-drag-dialog
      width="77%"
      :close-on-click-modal="true"
      :modal="true"
      title="商品详细信息"
      :visible.sync="productIndetailInfoFlag"
      custom-class="productIndetailInfoClass"
      top="7vh"
    >
      <product-i-d-info/>
    </el-dialog>
    <!-- ======================= 商品详细信息(结束) =========================  -->

    <!-- ======================= 商品SPU信息 =========================  -->
    <el-dialog
      v-el-drag-dialog
      width="70%"
      :close-on-click-modal="true"
      :modal="true"
      title="商品参数信息"
      :visible.sync="productSpuInfoFlag"
      custom-class="productSpuInfoClass"
      top="7vh"
    >
      <spu ref="spu" :product-id="currentFunctionProductId" @closeSpuWindows="closeSpuWindows"/>
    </el-dialog>
    <!-- ======================= 商品SPU信息(结束) =========================  -->

    <!-- ======================= 查看商品类目 =========================  -->
    <el-dialog
      v-el-drag-dialog
      title="商品类目信息"
      width="400px"
      :visible.sync="productLeiMuInfoFlag"
    >
      <div>
        <el-form
          ref="productLeiMuInfoFlag"
          label-position="left"
          :inline="true"
          label-width="80px"
        >
          <el-row :gutter="24">

            <el-col :lg="{span:24}" :sm="{span: 24}" :xs="{span: 24}">

              <el-form-item label="商品类目">
                <el-input v-model="productLeiMuValue" :disabled="true"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-button style="margin-top: 12px;" @click="productLeiMuInfoFlag = false">关闭窗口</el-button>
    </el-dialog>
    <!-- ======================= 查看商品类目(结束) =========================  -->

    <!-- ======================= 商品SKU信息 =========================  -->
    <el-dialog
      v-el-drag-dialog
      width="77%"
      :close-on-click-modal="true"
      :modal="true"
      title="商品配置信息"
      :visible.sync="productSkuInfoFlag"
      custom-class="productSkuInfoClass"
      top="7vh"
    >
      <sku ref="sku" :product-id="currentFunctionProductId" @closeSkuWindows="closeSkuWindows"/>
    </el-dialog>
    <!-- ======================= 商品SKU信息(结束) =========================  -->

    <!-- ======================= 编辑商品信息 =========================  -->
    <el-dialog
      v-el-drag-dialog
      width="77%"
      :close-on-click-modal="true"
      :modal="true"
      title="编辑商品信息"
      :visible.sync="editProductInfoFlag"
      custom-class="productSkuInfoClass"
      top="7vh"
    >
      <edit-product ref="editProduct" :product-id="currentFunctionProductId"
                    @closeEditWindows="editProductInfoFlag=false"/>
    </el-dialog>
    <!-- ======================= 编辑商品信息(结束) =========================  -->

    <!-- ======================= 添加商品 =========================  -->
    <el-dialog
      v-el-drag-dialog
      width="77%"
      :close-on-click-modal="true"
      :modal="true"
      title="添加商品信息"
      :visible.sync="addProductFlag"
      custom-class="productSkuInfoClass"
      top="7vh"
    >
      <add ref="add" :product-id="currentFunctionProductId"
           @closeAddProduct="addProductFlag=false"/>
    </el-dialog>
    <!-- ======================= 添加商品(结束) =========================  -->
  </div>
</template>

<script>

  import elDragDialog from '@/el-drag-dialog'
  import {
    productAjaxPost,
    productAjaxGet
  } from '@/api/table.js'

  // 引入模块
  import ProductIDInfo from '@/views/ProductManage/ProductIdManage/ProductIndetailInfo.vue'
  import spu from './ProductIdManage/ProductSpu.vue'
  import sku from './ProductIdManage/ProductSku.vue'
  import editProduct from './ProductIdManage/ProductEditInfo.vue'
  import add from './ProductIdManage/ProductAdd.vue'

  export default {
    directives: {
      elDragDialog
    },
    components: {
      ProductIDInfo,
      spu,
      sku,
      editProduct,
      add
    },
    data() {
      return {
        // 是否显示商品添加窗口
        addProductFlag: false,
        // 是否显示商品编辑
        editProductInfoFlag: false,
        // 商品信息
        productData: [],
        // 加载商品信息Flag
        loadingProductInfo: false,
        // Sku窗口
        productSkuInfoFlag: false,
        // 当前操作的商品id
        currentFunctionProductId: 10,
        currentFUnctionIndex: 0,
        // 商品SPU参数
        productSpuInfoFlag: false,
        // 商品类目的值
        productLeiMuValue: '暂无',
        // 商品类目Flag
        productLeiMuInfoFlag: false,
        // 商品详细信息flag
        productIndetailInfoFlag: false,
        // 分页小型的flag
        pageFlag: false,
        // 商品分页数据信息
        pageInfo: {
          productName: '', // 查询的商品名称
          state: '', // 查询全部
          totalSize: 0, // 总条数
          currentSize: 10, // 显示的页数
          currentPage: 1 // 当前显示的页数
        }
      }
    },
    created() {
      this.getProductInfo()
    },
    mounted() {
      this.screenWidth = document.body.clientWidth
      this.screenHeight = document.body.clientHeight
      if (this.screenWidth <= 500) {
        this.pageFlag = true
      }
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
          this.screenHeight = document.body.clientHeight
          // 判断宽度是否小于500 小于500 全部全屏显示
          if (this.screenWidth <= 500) {
            this.pageFlag = true
          } else {
            this.pageFlag = false
          }
        })()
      }
    },
    methods: {
      // 显示添加商品
      showAddProduct() {
        this.addProductFlag = true
      },
      // 显示修改商品
      editProduct(index, o) {
        this.currentFunctionIndex = index
        this.currentFunctionProductId = o
        this.editProductInfoFlag = true
        this.$refs.editProduct.findProductInfo(o)
      },
      // 删除商品
      delProduct(index, obj, state) {
        // 判断该商品是否已经删除
        if (obj.productState == 3 && state == 3) {
          this.$message({
            showClose: true,
            message: '该商品状态为删除',
            type: 'warning',
            customClass: 'zzIndex'
          })
          return
        } else if (obj.productState == 1 && state == 1) {
          this.$message({
            showClose: true,
            message: '该商品状态为上架',
            type: 'warning',
            customClass: 'zzIndex'
          })
        } else if (obj.productState == 2 && state == 2) {
          this.$message({
            showClose: true,
            message: '该商品状态为下架',
            type: 'warning',
            customClass: 'zzIndex'
          })
        }
        var msg = ''
        if (state == 3) {
          msg = '您确定删除该商品的信息吗?'
        } else if (state == 1) {
          msg = '您确定要恢复商品的信息吗?'
        } else {
          msg = '您确定要下架该商品吗？'
        }
        this.$confirm(msg, '确认框', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.COMMON.startLoading()
          // 发送AJAX修改数据
          var url = '/product/basics/del'
          var param = { 'productId': obj.productId, 'state': state }
          productAjaxPost(url, param).then(data => {
            if (data.status == 200) {
              this.$message({
                type: 'success',
                message: data.data,
                duration: 0,
                customClass: 'zzIndex',
                showClose: true
              })
              this.productData[index].productState = state
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
        })
      },
      // 商品商品的SKU信息
      findProductSku(id) {
        this.currentFunctionProductId = id
        this.productSkuInfoFlag = true
        this.$refs.sku.findProductSkuInfo(id)
      },
      // 查询商品的SPU信息
      findProductSpu(id) {
        this.currentFunctionProductId = id
        this.productSpuInfoFlag = true
        this.$refs.spu.findProductSpuInfo(id)
      },
      // 商品所属类目
      findProductCategory(value) {
        this.productLeiMuValue = value
        this.productLeiMuInfoFlag = true
      },
      // 切换商品的条数
      productCurrentSize(val) {
        this.pageInfo.currentSize = val
        this.getProductInfo()
      },
      // 切换商品页数
      productCurrentPage(val) {
        // 替换当前页数
        this.pageInfo.currentPage = val
        this.getProductInfo()
      },
      // 关闭SKU窗口
      closeSkuWindows() {
        this.productSkuInfoFlag = false
      },
      // 关闭SPU窗口
      closeSpuWindows() {
        this.productSpuInfoFlag = false
      },
      serachBtnFunction() {
        this.pageInfo.currentPage = 1
        this.getProductInfo()
      },
      // 请求商品的数据信息
      getProductInfo() {
        // 发送Ajax请求数据
        this.loadingProductInfo = true
        var url = '/product/index'
        productAjaxPost(url, this.pageInfo).then(data => {
          this.loadingProductInfo = false
          if (data.status == 200) {
            this.$message({
              showClose: true,
              message: '查询成功',
              type: 'success',
              duration: 1000,
              customClass: 'zzIndex'
            })
            // 将数据对应到集合中去
            this.pageInfo.totalSize = data.data.totalSize
            this.pageInfo.currentPage = data.data.currentPage
            // 填写商品数据
            this.productData = data.data.productDatas
            // 商品状态
            this.productState = data.data.states
          } else {
            this.$message({
              showClose: true,
              message: data.msg + '--请重新刷新页面',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.listLoading = false
            this.COMMON.stopLoading()
          }
        })
      }
    }
  }
</script>

<style>

  @media only screen and (min-width: 300px) and (max-width: 1000px) {
    #productInfoPigDiv .productIndetailInfoClass {
      width: 99% !important;
    }

    #productInfoPigDiv .productSpuInfoClass {
      width: 99% !important;
    }

    #productInfoPigDiv .productSkuInfoClass {
      width: 99% !important;
    }
  }

  #productInfoPigDiv {
    margin: 30px !important;
  }

  #productInfoPigDiv .el-card__header {
    padding-bottom: 0px !important;
  }

  .ccc_color {
    color: #cccccc;
    font-size: 14px;
  }

  .p_value {
    color: #000000;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    height: 24px;
    display: block;
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

  #productStateSpan .el-link--inner {
    font-size: 12px !important;
  }
</style>
