<!--======商品类目管理模块=======-->
<template>
  <div id="productClassify" v-loading="ProductLeiMuLoadings.productLeiMuCommonLoading">

    <!-- ======================= 商品类目按钮集合 =========================  -->
    <el-form :inline="true" :model="searchBrandForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="搜索类目">
            <el-input v-model="categoryPage.categoryName" placeholder="输入一级类目的名称"><i
              slot="prefix"
              class="el-icon-edit"
            />
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item>

            <el-button
              :disabled="!categoryPage.functionFlag"
              type="primary"
              style="width: 215px; margin-left: 70px;"
              @click="addProductLeiMuDiv"
            >
              <svg-icon icon-class="tianjia" style="width:14px !important; height:14px !important; margin-right:10px;" />
              添加类目
            </el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              style="width: 215px; margin-left: 70px;"
              @click="searchCategory"
            >搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- ======================= 商品类目按钮集合(结束) =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>数量:900个</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 商品类目管理Talbe =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-table
          :lazy="true"
          :load="loadSubDatas"
          :data="categoryDatas"
          style="width: 100%;margin-bottom: 20px;"
          row-key="categoryId"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column sortable prop="categoryName" label="类目名称" show-overflow-tooltip="true" min-width="150" />
          <el-table-column prop="categoryIsName" label="类型" width="100" show-overflow-tooltip="true" />
          <el-table-column prop="createTimeStr" label="创建时间" sortable width="230" />
          <el-table-column fixed="right" label="操作" width="170">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                :disabled="!categoryPage.functionFlag"
                @click="editProductLeiMuDiv(scope.$index , scope.row)"
              >
                编辑
              </el-button>
              <el-button
                v-if="scope.row.categoryState == 1"
                type="text"
                size="small"
                :disabled="!categoryPage.functionFlag"
                @click="editCategoryState(scope.$index , scope.row.categoryId , 2)"
              >停用
              </el-button>
              <el-button
                v-else
                type="text"
                size="small"
                :disabled="!categoryPage.functionFlag"
                @click="editCategoryState(scope.$index , scope.row.categoryId , 1)"
              >恢复
              </el-button>
              <el-button
                v-if="scope.row.categoryIsParent == 2"
                type="text"
                size="small"
                @click="addLeiMuSkuInfo(scope.$index , scope.row.categoryId)"
              >
                管理SKU
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
    <!-- ======================= 商品类目管理Talbe(结束) =========================  -->

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-pagination
          :small="pageFlag"
          :pager-count="5"
          :current-page="categoryPage.currentPage"
          :page-sizes="[1,2,3,5,10]"
          hide-on-single-page="true"
          :page-size="categoryPage.currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="categoryPage.totalSize"
          @size-change="categoryCurrentSize"
          @current-change="categoryCurrentPage"
        />

      </el-col>
    </el-row>
    <!-- ======================= 分页层 (结束) =========================  -->

    <!-- ======================= 添加类目的SKU基础模板 =========================  -->
    <el-dialog
      v-el-drag-dialog
      :append-to-body="true"
      width="600px"
      :top="productTopHtml"

      title="添加SKU参数"
      :visible.sync="productLeiMuDiaLogFlags.addProductLeiMuSkuTemplate"
      class="addProduct title-menu-min"
    >
      <div>
        <el-divider content-position="left">系统定制的SKU</el-divider>
        <el-row :gutter="24">
          <el-col v-for="(sku,index) in categorySkuInfo.systemSkuInfo" :sm="{span: 6}" :xs="{span: 12}">
            <el-tag
              :key="sku.productSkuKeyId"
              show-overflow-tooltip="true"
              style="width:100%;margin-bottom: 10px;"
              :closable="!categorySkuInfo.showUserInfoFlag"
              :disable-transitions="false"
              @close="handleClose(sku , 1 , index)"
            >
              <span class="autocut">
                {{ sku.productSkuKeyName }}
              </span>
            </el-tag>
          </el-col>

          <el-col v-if="categorySkuInfo.editSystemFlag" :sm="{span: 6}">
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="newSkuName"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm(1)"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-col>

        </el-row>

        <el-divider v-if="categorySkuInfo.showUserInfoFlag" content-position="left">店铺定制的SKU</el-divider>

        <el-row v-if="categorySkuInfo.showUserInfoFlag" :gutter="24">
          <el-col v-for="(sku,index) in categorySkuInfo.userSkuInfo" :sm="{span: 6}" :xs="{span: 12}">
            <el-tag
              :key="sku.productSkuKeyId"
              show-overflow-tooltip="true"
              style="width:100%;margin-bottom: 10px;"
              closable
              :disable-transitions="false"
              @close="handleClose(sku , 2,index)"
            >
              <span class="autocut">
                {{ sku.productSkuKeyName }}
              </span>
            </el-tag>
          </el-col>
          <el-col :sm="{span: 6}">
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="newSkuName"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm(2)"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8}" :xs="{span: 23}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;" @click="yesAddCategorySku">确认添加
            </el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button
              style="width:100%;margin-bottom: 15px !important;"
              @click="productLeiMuDiaLogFlags.addProductLeiMuSkuTemplate = false"
            >关闭窗口
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- ======================= 添加类目的SKU基础模板(结束) =========================  -->

    <!-- ======================= 添加类目 =========================  -->
    <el-dialog
      v-el-drag-dialog
      :append-to-body="true"
      width="400px"

      title="添加类目"
      :visible.sync="productLeiMuDiaLogFlags.addProductLeiMu"
      custom-class="productLeiMuClass"
      class="title-menu-min"
    >
      <div>
        <el-form
          ref="addProductLeiMuForm"
          label-position="left"
          :inline="true"
          :model="categortForm"
          label-width="80px"
        >
          <el-row :gutter="24">
            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="类目名称" style="width:100%;">
                <el-input v-model="categortForm.categoryName" style="width:100%;" placeholder="请输入类目名称" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="适应季节" style="width:100%;">
                <el-cascader
                  v-model="categortForm.siJi"
                  :props="props"
                  :options="siJieDatas"
                  collapse-tags
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="一级类目" style="width:100%;">
                <el-select
                  v-model="categortForm.oneCateId"
                  style="width:100% !important;"
                  placeholder="请选择类目,若不选择则为一级类目"
                >
                  <el-option label="不选择(一级类目)" :value="0" />
                  <el-option
                    v-for="(obj , index) in oneCategoryDatas"
                    :label="obj.categoryName"
                    :value="obj.categoryId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button type="primary" style="width:100%;margin-bottom: 15px;" @click="addCategory">确认添加</el-button>
            </el-col>

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button
                style="width:100%;margin-bottom: 15px !important;"
                @click="productLeiMuDiaLogFlags.addProductLeiMu = false"
              >关闭窗口
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- ======================= 添加类目(结束) =========================  -->

    <!-- ======================= 修改类目 =========================  -->
    <el-dialog
      v-el-drag-dialog
      :append-to-body="true"
      width="400px"

      title="修改类目"
      :visible.sync="productLeiMuDiaLogFlags.editProductLeiMu"
      custom-class="productLeiMuClass"
      class="title-menu-min"
    >
      <div>
        <el-form
          ref="addProductLeiMuForm"
          label-position="left"
          :inline="true"
          :model="categortFormEdit"
          label-width="80px"
        >
          <el-row :gutter="24">
            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="类目名称" style="width:100%;">
                <el-input v-model="categortFormEdit.categoryName" placeholder="请输入类目名称" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="适应季节" style="width:100%;">
                <el-cascader
                  v-model="categortFormEdit.siJis"
                  :props="props"
                  :options="siJieDatas"
                  collapse-tags
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="一级类目" style="width:100%;">
                <el-select v-model="categortFormEdit.oneCateId" :disabled="true" placeholder="请选择类目,若不选择则为一级类目">
                  <el-option label="不选择(一级类目)" :value="0" />
                  <el-option
                    v-for="(obj , index) in oneCategoryDatas"
                    :label="obj.categoryName"
                    :value="obj.categoryId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button type="primary" style="width:100%;margin-bottom: 15px;" @click="editCategory()">确认修改</el-button>
            </el-col>

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button
                style="width:100%;margin-bottom: 15px !important;"
                @click="productLeiMuDiaLogFlags.editProductLeiMu = false"
              >关闭窗口
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- ======================= 修改类目(结束) =========================  -->

  </div>
</template>

<script>
import elDragDialog from '@/el-drag-dialog'
import {
  productAjaxPost,
  productAjaxGet
} from '@/api/table.js'

var systemUrl = ''

export default {
  directives: {
    elDragDialog
  },
  data() {
    return {
      // 类目的SKU信息
      categorySkuInfo: {},
      // 当前编辑的类目索引
      currentFunctionIndex: 0,
      props: { multiple: true },
      // 适合的季节信息
      siJieDatas: [],
      // 一级类目的信息
      oneCategoryDatas: [],
      // 类目数据
      categoryDatas: [],
      // 分页小型的flag
      pageFlag: false,
      categoryPage: {
        categoryName: '', // 查询的商品名称
        totalSize: 0, // 总条数
        currentSize: 10, // 显示的条数
        currentPage: 1, // 当前显示的页数
        functionFlag: true // 是否可以操作类目
      },
      // 修改的表但信息
      categortFormEdit: {
        categoryName: '',
        siJis: [],
        siJie: '',
        oneCateId: '',
        categoryId: 0
      },
      // 类目的表单
      categortForm: {
        categoryName: '',
        siJis: '',
        siJie: '',
        oneCateId: ''
      },
      addNewSkuInfo: [],
      currentFunctionId: 0,
      /* 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、*/
      // 网页的宽高
      screenWidth: '',
      screenHeight: '',
      // 窗口距离网页的高度
      productTopHtml: '',
      inputVisible: false,
      // 新添的SKU值
      newSkuName: '',
      inputValue: '',
      // SKU参数列表
      // 管理员定义
      adminDeinSkuValues: [{
        skuId: '1',
        skuName: '颜色颜色色色'
      }, {
        skuId: '1',
        skuName: '颜色'
      }, {
        skuId: '1',
        skuName: '颜色'
      },
      {
        skuId: '1',
        skuName: '内存'
      },
      {
        skuId: '1',
        skuName: '厂商地'
      }
      ],
      // 用户自己定义
      userDeinSkuValues: [{
        skuId: '99',
        skuName: '颜色'
      },
      {
        skuId: '98',
        skuName: '内存'
      },
      {
        skuId: '97',
        skuName: '厂商地'
      }
      ],
      // 添加类目的Form
      addProductLeiMuForm: {
        leimuName: '',
        leimuParentId: '',
        leimuAdaptSeason: ''
      },
      // 类目页面的弹出flag
      productLeiMuDiaLogFlags: {
        // 添加类目
        addProductLeiMu: false,
        // 修改类目
        editProductLeiMu: false,
        // 添加类目的SKU模板
        addProductLeiMuSkuTemplate: false
      },
      // 分页数据
      total: 100,
      currentPage: 2,
      // 网页长宽
      screenWidth: 0,
      screenHeight: 0,
      // 类目搜索表单
      searchLeiMuForm: {
        LeiMuName: ''
      },
      // 类目加载层集合
      ProductLeiMuLoadings: {
        // 类目的Table加载层
        productLeiMuTableDataLoading: false,
        // 类目公用的加载成
        productLeiMuCommonLoading: false
      }
    }
  },
  created() {
    // 初始化方法 vue组件初始化完成,网页未完成
    this.getCategoryInfo()
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
    if (this.screenWidth <= 500) {
      this.productTopHtml = '1vh'
      this.pageFlag = true
    } else {
      this.productTopHtml = '10vh'
    }
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        // 判断宽度是否小于500 小于500 全部全屏显示
        if (this.screenWidth <= 500) {
          this.productTopHtml = '1vh'
          this.pageFlag = true
        } else {
          this.productTopHtml = '10vh'
        }
      })()
    }
  },
  methods: {
    searchCategory() {
      this.categoryPage.currentPage = 1
      this.getCategoryInfo()
    },
    // 确认添加商品类目的SKU
    yesAddCategorySku() {
      if (this.addNewSkuInfo.length < 1) {
        this.$message({
          showClose: true,
          message: '您还没有添加新的数据。',
          type: 'warning'
        })
        return
      }

      this.$confirm('您确定要添加吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        var skuNames = ''
        this.addNewSkuInfo.forEach(data => {
          if (skuNames == '') {
            skuNames = data.productSkuKeyName
          } else {
            skuNames += ',' + data.productSkuKeyName
          }
        })

        var url = '/product/category/add/category/sku'
        var para = { 'categoryId': this.currentFunctionId, 'skuInfoJson': skuNames }
        productAjaxPost(url, para).then(data => {
          if (data.status == 200) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.COMMON.stopLoading()
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg,
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
      })
    },
    // 修改类目的状态
    editCategoryState(index, obj, state) {
      var msg = ''
      if (state == 2) {
        msg = '停用'
      } else {
        msg = '恢复'
      }

      this.$confirm('您确定要将商品类目' + msg + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        var url = '/product/category/edit/state'
        var para = { 'categoryId': obj, 'state': state }
        productAjaxPost(url, para).then(data => {
          if (data.status == 200) {
            this.categoryDatas[index].categoryState = state
            this.COMMON.stopLoading()
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg,
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
      })
    },
    // 修改类目
    editCategory() {
      this.$confirm('您确定要修改该商品类目的信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        var siJie = ''
        this.categortFormEdit.siJis.forEach(data => {
          if (siJie == '') {
            siJie += data
          } else {
            siJie = siJie + ',' + data
          }
        })
        this.categortFormEdit.siJie = siJie
        var url = '/product/category/edit'
        productAjaxPost(url, this.categortFormEdit).then(data => {
          if (data.status == 200) {
            this.productLeiMuDiaLogFlags.editProductLeiMu = false
            this.COMMON.stopLoading()
            this.categoryDatas[this.currentFunctionIndex].categoryName = this.categortFormEdit.categoryName
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg,
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
      })
    },
    // 打开编辑类目窗口
    editProductLeiMuDiv(index, obj) {
      this.currentFunctionIndex = index
      this.categortFormEdit.categoryName = obj.categoryName
      const split = obj.categorySeasonId.split(',')
      split.forEach(data => {
        this.categortFormEdit.siJis.push(data)
      })
      this.categortFormEdit.categoryId = obj.categoryId
      this.categortFormEdit.oneCateId = obj.categoryParentId
      this.productLeiMuDiaLogFlags.editProductLeiMu = true
    },
    // 切换商品的条数
    categoryCurrentSize(val) {
      this.categoryPage.currentSize = val
      this.getCategoryInfo()
    },
    // 切换商品页数
    categoryCurrentPage(val) {
      // 替换当前页数
      this.categoryPage.currentPage = val
      this.getCategoryInfo()
    },
    // 添加类目信息
    addCategory() {
      this.COMMON.startLoading()
      var url = '/product/category/add'
      var siJie = ''
      this.categortForm.siJi.forEach(data => {
        console.log(data)
        if (siJie == '') {
          siJie += data
        } else {
          siJie = siJie + ',' + data
        }
      })
      this.categortForm.siJie = siJie
      productAjaxPost(url, this.categortForm).then(data => {
        if (data.status == 200) {
          if (this.categortForm.oneCateId == 0) {
            this.categoryDatas.push(data.data)
          }
          this.productLeiMuDiaLogFlags.addProductLeiMu = false
          this.categortForm.categoryName = ''
          this.categortForm.oneCateId = 0
          this.categortForm.siJi = ''
          this.COMMON.stopLoading()
        } else if (data.status == 500) {
          this.$message({
            showClose: true,
            message: data.msg,
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
    },
    // 获取类目数据
    getCategoryInfo() {
      this.COMMON.startLoading()
      var url = '/product/category/index'
      productAjaxPost(url, this.categoryPage).then(data => {
        if (data.status == 200) {
          this.categoryPage.currentPage = data.data.currentPage
          this.categoryPage.currentSize = data.data.currentSize
          this.categoryPage.totalSize = data.data.totalSize
          this.categoryPage.totlaPage = data.data.totlaPage
          // functionFlag
          this.categoryDatas = data.data.categoryDatas
          this.oneCategoryDatas = data.data.oneCategorDatas
          this.siJieDatas = data.data.siJieDatas
          this.categoryPage.functionFlag = data.data.addOrEdit

          this.COMMON.stopLoading()
        } else if (data.status == 500) {
          this.$message({
            showClose: true,
            message: data.msg,
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
    },
    // 打开SKU模板
    addLeiMuSkuInfo(index, categoryId) {
      this.currentFunctionId = categoryId
      this.COMMON.startLoading()
      var url = '/product/category/get/category/sku'
      var para = { 'categoryId': categoryId }
      productAjaxPost(url, para).then(data => {
        if (data.status == 200) {
          this.categorySkuInfo = data.data
          this.productLeiMuDiaLogFlags.addProductLeiMuSkuTemplate = true
          this.COMMON.stopLoading()
        } else if (data.status == 500) {
          this.$message({
            showClose: true,
            message: data.msg,
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
    },
    /* .......................................................*/
    // 删除用户定义的SKU
    handleClose(tag, state, index) {
      this.$confirm('您确定要删除你选中的SKU信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        var url = '/product/category/del/category/sku'
        var para = { 'skuId': tag.productSkuKeyId }
        productAjaxPost(url, para).then(data => {
          if (data.status == 200) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            if (state == 1) {
              this.categorySkuInfo.systemSkuInfo.splice(index, 1)
            } else {
              this.categorySkuInfo.userSkuInfo.splice(index, 1)
            }
            this.COMMON.stopLoading()
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg,
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
      })
    },
    // 显示添加的SKUInput
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 动态添加SKU
    handleInputConfirm(state) {
      const inputValue = this.newSkuName
      if (inputValue.length > 50) {
        this.$message({
          showClose: true,
          message: '最高长度为6位',
          type: 'error'
        })
        return
      }
      const pushs = {
        'productSkuKeyId': new Date().getTime(),
        'productSkuKeyName': inputValue
      }
      if (inputValue) {
        if (state == 1) {
          this.categorySkuInfo.systemSkuInfo.push(pushs)
        } else {
          this.categorySkuInfo.userSkuInfo.push(pushs)
        }

        this.addNewSkuInfo.push(pushs)
      }
      this.inputVisible = false
      this.newSkuName = ''
    },
    // 显示添加类目Div
    addProductLeiMuDiv() {
      this.productLeiMuDiaLogFlags.addProductLeiMu = true
    },
    // 动态加载二级类目
    loadSubDatas(tree, treeNode, resolve) {
      this.COMMON.startLoading()
      var url = '/product/category/load/data'
      var para = { 'parentId': tree.categoryId }
      productAjaxPost(url, para).then(data => {
        if (data.status == 200) {
          // functionFlag
          resolve(data.data)
          this.COMMON.stopLoading()
        } else if (data.status == 500) {
          this.$message({
            showClose: true,
            message: data.msg,
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
}
</script>

<style>
  .productLeiMuClass .el-form-item__content .el-select {
    width: 100% !important;
  }

  .productLeiMuClass .el-form-item__content {
    width: 70% !important;
  }

  #productClassify .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  #productClassify .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  #productClassify .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  #productClassify .autocut {
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
  #productClassify .title-menu-min2 {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  #productClassify .title-menu-min2::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  #productClassify .title-menu-min2::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  #productClassify .title-menu-min2::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  /*新加入隐藏滚动条效果*/
  #productClassify .title-menu-min {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  #productClassify .title-menu-min::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  #productClassify .title-menu-min::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  #productClassify .title-menu-min::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  /*==================自定义自适应css 宽度 1301 -- 2000px========================*/
  @media only screen and (min-width: 1301px) and (max-width: 2000px) {
    #productClassify .productLeiMuInfoClass {
      margin-left: 0px !important;
    }

    #productClassify .spusRowClass {
      margin-right: 0px !important;
      margin-left: 17px !important;
    }

    #productClassify .SpusClass {
      width: 95% !important;
    }

    #productClassify .el-form .el-form-item .el-input__inner {
      width: 216px !important;
    }

    #productClassify .el-form .el-form-item .SpuInput .el-input__inner {
      width: 216px !important;
    }

    #productClassify .el-form .el-form-item .SpuInput2 .el-input__inner {
      width: 80px !important;
    }
  }

  @media only screen and (min-width: 300px) and (max-width: 409px) {
    #productClassify .productBrandInputClass {
      width: 170px !important;
    }

    #productClassify .spuDialogClass {
      max-height: 300px;
    }

    #productClassify .addAndClose {
      margin-top: 10px !important;
    }

    #productClassify .fixedClass {
      position: absolute;
      top: 100px;
    }

    #productClassify .spusRowClass {
      margin-right: 0px !important;
      margin-left: 7px !important;
    }

    #productClassify .SpusClass {
      width: 270px !important;
    }

    /*  添加商品的css  */
    #productClassify .addProduct .el-dialog {
      width: 330px !important;
    }

    #productClassify .addProduct .el-dialog #steptwo {
      max-height: 31.25rem;
    }
  }

  @media only screen and (min-width: 410px) and (max-width: 500px) {

    #productClassify .productSkuInfoDialog {
      width: 100% !important;
    }

    #productClassify .productCommentInfoClass {
      width: 100% !important;
    }

    #productClassify .SpusClass button {
      margin-top: 0.625rem !important;
    }

    #productClassify .spuDialogClass {
      max-height: 300px;
    }

    #productClassify .addAndClose {
      margin-top: 10px !important;
    }

    #productClassify .fixedClass {
      position: absolute;
      top: 100px;
    }

    #productClassify .spusRowClass {
      margin-right: 0px !important;
      margin-left: 7px !important;
    }

    #productClassify .SpusClass {
      width: 330px !important;
    }

    /*  添加商品的css  */
    #productClassify .addProduct .el-dialog {
      width: 400px !important;
    }

    #productClassify .addProduct .el-dialog #steptwo {
      max-height: 31.25rem;
    }
  }

  @media only screen and (min-width: 410px) and (max-width: 1300px) {

    #productClassify .el-form .el-form-item .SpuInput .el-input__inner {
      width: 100px !important;
    }

    #productClassify .el-form .el-form-item .SpuInput2 .el-input__inner {
      width: 100px !important;
    }

    /*  添加商品的css结束  */
    #productClassify .el-form .el-form-item .el-input__inner {
      width: 250px;
    }

    #productClassify .el-form .el-row {
      margin: 0 auto;
      text-align: center;
    }

    #productClassify .el-col-xs-23 {
      width: 100%;
    }

    #productClassify .el-form-item .el-button {
      width: 250px !important;
    }

    #productClassify .el-divider span {
      font-size: 11px;
    }

    /* .myItem{
            width: 100% !important;
        }
        .myItem .el-form-item__label{
            width: 66px;
            padding: 0px;
            text-align: left;
        } */
  }

  #productClassify .el-divider span {
    color: #606266;
    font-weight: bold;
  }

  #productClassify .el-table__row th .cell {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0px 0px;
  }

  #productClassify .el-table__row th {
    padding: 3px 0px;
    padding-left: 10px;
    color: #606266;

  }

  #productClassify .el-table__row td {
    padding: 4px 0 !important;
  }

  #productClassify {
    margin: 30px;
  }
</style>
