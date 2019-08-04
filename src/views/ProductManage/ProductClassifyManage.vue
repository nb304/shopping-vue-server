<!--======商品类目管理模块=======-->
<template>
  <div id="productClassify" v-loading="ProductLeiMuLoadings.productLeiMuCommonLoading">

    <!-- ======================= 商品类目按钮集合 =========================  -->
    <el-form :inline="true" :model="searchBrandForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="搜索类目">
            <el-input v-model="searchLeiMuForm.LeiMuName" placeholder="类目的名称"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item>

            <el-button type="primary" style="width: 215px; margin-left: 70px;" @click="addProductLeiMuDiv">
              <svg-icon icon-class="tianjia" style="width:14px !important; height:14px !important; margin-right:10px;" />
              添加类目
            </el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 215px; margin-left: 70px;">搜索</el-button>
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
          v-loading="ProductLeiMuLoadings.productLeiMuTableDataLoading"
          lazy
          :load="load"
          :data="leiMuDatas"
          style="width: 100%;margin-bottom: 20px;"
          row-key="leimuId"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column sortable prop="leimuName" label="类目名称" show-overflow-tooltip="true" min-width="150" />
          <el-table-column prop="leimuType" label="类型" width="100" show-overflow-tooltip="true" />
          <el-table-column prop="createTime" label="创建时间" sortable width="180" />
          <el-table-column fixed="right" label="操作" width="170">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editProductLeiMuDiv">编辑</el-button>
              <el-button type="text" size="small">停用</el-button>
              <el-button v-if="!scope.row.isParent" type="text" size="small" @click="addLeiMuSkuInfo">管理SKU</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
    <!-- ======================= 商品类目管理Talbe(结束) =========================  -->

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 5, offset: 19}" :xs="{span: 24}">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="total"
          page-size="3"
          small="false"
          style="margin-top: 15px;margin-right: 10px;"
          @current-change="handleSizeChange"
        />
      </el-col>
    </el-row>

    <!-- ======================= 分页层 (结束) =========================  -->

    <!-- ======================= 添加类目的SKU基础模板 =========================  -->
    <el-dialog
      :append-to-body="true"
      width="600px"
      :top="productTopHtml"
      :close-on-click-modal="false"
      title="添加SKU参数"
      :visible.sync="productLeiMuDiaLogFlags.addProductLeiMuSkuTemplate"
      class="addProduct title-menu-min"
    >
      <div>
        <el-divider content-position="left">系统定制的SKU</el-divider>
        <el-row :gutter="24">
          <el-col v-for="tag in adminDeinSkuValues" :sm="{span: 6}" :xs="{span: 12}">
            <el-tag
              :key="tag.skuId"
              show-overflow-tooltip="true"
              style="width:100%;margin-bottom: 10px;"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              <span class="autocut">
                {{ tag.skuName }}
              </span>
            </el-tag>
          </el-col>

        </el-row>

        <el-divider content-position="left">店铺定制的SKU</el-divider>

        <el-row :gutter="24">
          <el-col v-for="tag in userDeinSkuValues" :sm="{span: 6}" :xs="{span: 12}">
            <el-tag
              :key="tag.skuId"
              show-overflow-tooltip="true"
              style="width:100%;margin-bottom: 10px;"
              closable
              :disable-transitions="false"
              @close="handleClose2(tag)"
            >
              <span class="autocut">
                {{ tag.skuName }}
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
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8}" :xs="{span: 23}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;">确认添加</el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="width:100%;margin-bottom: 15px !important;" @click="productLeiMuDiaLogFlags.addProductLeiMuSkuTemplate = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- ======================= 添加类目的SKU基础模板(结束) =========================  -->

    <!-- ======================= 添加类目 =========================  -->
    <el-dialog
      v-loading="ProductLeiMuLoadings.productLeiMuCommonLoading"
      :append-to-body="true"
      width="400px"
      :close-on-click-modal="false"
      title="添加类目"
      :visible.sync="productLeiMuDiaLogFlags.addProductLeiMu"
      custom-class="productLeiMuClass"
      class="title-menu-min"
    >
      <div>
        <el-form ref="addProductLeiMuForm" label-position="left" :inline="true" :model="addProductLeiMuForm" label-width="80px">
          <el-row :gutter="24">
            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="类目名称" style="width:100%;">
                <el-input v-model="addProductLeiMuForm.leimuName" style="width:100%;" placeholder="请输入类目名称" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="适应季节" style="width:100%;">
                <el-input v-model="addProductLeiMuForm.leimuAdaptSeason" style="width:100%;" placeholder="请输入适应季节" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="一级类目" style="width:100%;">
                <el-select v-model="addProductLeiMuForm.leimuParentId" style="width:100% !important;" placeholder="请选择类目,若不选择则为一级类目">
                  <el-option label="不选择(一级类目)" value="shangha1i" />
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button type="primary" style="width:100%;margin-bottom: 15px;">确认添加</el-button>
            </el-col>

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button style="width:100%;margin-bottom: 15px !important;" @click="productLeiMuDiaLogFlags.addProductLeiMu = false">关闭窗口</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- ======================= 添加类目(结束) =========================  -->

    <!-- ======================= 修改类目 =========================  -->
    <el-dialog
      :append-to-body="true"
      width="400px"
      :close-on-click-modal="false"
      title="修改类目"
      :visible.sync="productLeiMuDiaLogFlags.editProductLeiMu"
      custom-class="productLeiMuClass"
      class="title-menu-min"
    >
      <div>
        <el-form ref="addProductLeiMuForm" label-position="left" :inline="true" :model="addProductLeiMuForm" label-width="80px">
          <el-row :gutter="24">
            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="类目名称" style="width:100%;">
                <el-input v-model="addProductLeiMuForm.leimuName" placeholder="请输入类目名称" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="适应季节" style="width:100%;">
                <el-input v-model="addProductLeiMuForm.leimuAdaptSeason" placeholder="请输入适应季节" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 24}" :xs="{span: 24}">
              <el-form-item label="一级类目" style="width:100%;">
                <el-select v-model="addProductLeiMuForm.leimuParentId" :disabled="true" placeholder="请选择类目,若不选择则为一级类目">
                  <el-option label="不选择(一级类目)" value="shangha1i" />
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button type="primary" style="width:100%;margin-bottom: 15px;">确认添加</el-button>
            </el-col>

            <el-col :sm="{span: 8}" :xs="{span: 23}">

              <el-button style="width:100%;margin-bottom: 15px !important;" @click="productLeiMuDiaLogFlags.editProductLeiMu = false">关闭窗口</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- ======================= 修改类目(结束) =========================  -->

  </div>
</template>

<script>
export default {
  data() {
    return {
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
      // 类目Table的数据
      leiMuDatas: [{
        leimuId: '1',
        leimuName: '女装',
        leimuType: '一级类目',
        createTime: '2019-07-04 14:13',
        hasChildren: true,
        isParent: true
      },
      {
        leimuId: '3',
        leimuName: '女装',
        leimuType: '一级类目',
        createTime: '2019-07-04 14:14',
        isParent: true
      },
      {
        leimuId: '4',
        leimuName: '女装',
        leimuType: '一级类目',
        createTime: '2019-07-04 14:15',
        isParent: true
      },
      {
        leimuId: '5',
        leimuName: '女装',
        leimuType: '一级类目',
        createTime: '2019-07-04 14:16',
        isParent: true
      }
      ],
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
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
    if (this.screenWidth <= 500) {
      this.productTopHtml = '1vh'
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
        } else {
          this.productTopHtml = '10vh'
        }
      })()
    }
  },
  methods: {
    // 打开SKU模板
    addLeiMuSkuInfo() {
      this.productLeiMuDiaLogFlags.addProductLeiMuSkuTemplate = true
    },
    // 删除用户定义的SKU
    handleClose2(tag) {
      this.$message({
        showClose: true,
        message: '删除成功,id为:' + tag.skuId,
        type: 'success'
      })
      this.userDeinSkuValues.splice(this.userDeinSkuValues.indexOf(tag), 1)
    },
    // 删除系统定义的SKU
    handleClose(tag) {
      this.$message({
        message: '删除成功,id为:' + tag.skuId,
        type: 'success',
        showClose: true
      })
      this.adminDeinSkuValues.splice(this.adminDeinSkuValues.indexOf(tag), 1)
    },
    // 显示添加的SKUInput
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 动态添加SKU
    handleInputConfirm() {
      const inputValue = this.newSkuName
      if (inputValue.length > 6) {
        this.$message({
          showClose: true,
          message: '最高长度为6位',
          type: 'error'
        })
        return
      }
      const pushs = {
        'skuId': new Date().getTime(),
        'skuName': inputValue
      }
      if (inputValue) {
        this.userDeinSkuValues.push(pushs)
      }
      this.inputVisible = false
      this.newSkuName = ''
    },
    // 编辑类目
    editProductLeiMuDiv() {
      this.productLeiMuDiaLogFlags.editProductLeiMu = true
    },
    // 显示添加类目Div
    addProductLeiMuDiv() {
      this.productLeiMuDiaLogFlags.addProductLeiMu = true
    },
    // 动态加载二级类目
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([{
          leimuId: '355',
          leimuName: '女装',
          leimuType: '二级类目',
          createTime: '2019-07-04 14:14',
          isParent: false
        }, {
          leimuId: '356',
          leimuName: '女装',
          leimuType: '二级类目',
          createTime: '2019-07-04 14:14',
          isParent: false
        }])
      }, 1000)
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
