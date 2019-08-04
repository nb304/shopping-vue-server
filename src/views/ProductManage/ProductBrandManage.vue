<!--======商品品牌管理模块=======-->
<template>
  <div id="productBrandDiv" v-loading="ProductBrandLoadings.productBrandCommonLoading">

    <!-- ======================= 商品品牌按钮集合 =========================  -->
    <el-form :inline="true" :model="searchBrandForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item label="搜索品牌">
            <el-input v-model="searchBrandForm.brandName" placeholder="品牌的名称"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-form-item>

            <el-button type="primary" style="width: 215px; margin-left: 70px;" @click="productBrandDiaLogFlags.addProductBrandFlag = true">
              <svg-icon icon-class="tianjia" class-name="" style="width:14px !important; height:14px !important; margin-right:10px;" />
              添加品牌
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

    <!-- ======================= 商品品牌按钮集合(结束) =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>数量:900个</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 商品信息管理Talbe =========================  -->
    <el-table
      v-loading="ProductBrandLoadings.productBrandTableDataLoading"
      class="title-menu-min"
      :data="productBrandTableDatas"
      border
      style="width: 100%"
    >
      <el-table-column prop="brandNumber" label="编号" width="150" show-overflow-tooltip="true" />
      <el-table-column prop="brandName" label="品牌名称" />
      <el-table-column label="品牌LOGO" width="120" prop="brandLogoUrl">
        <div slot-scope="scope" @click="showProductBrandLogoDiv(scope.row)">
          <el-image style="width: 100px; height: 30px;cursor: pointer;" :src="scope.row.brandLogoUrl" />
        </div>
      </el-table-column>
      <el-table-column prop="createName" label="创建人" width="120" />
      <el-table-column prop="updateName" label="操作人" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="150" show-overflow-tooltip="true" />
      <el-table-column prop="updateTime" label="修改时间" width="150" show-overflow-tooltip="true" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="productBrandDiaLogFlags.editProductBrand = true">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- ======================= 商品信息管理Talbe(结束) =========================  -->

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 14, offset: 10}" :xs="{span: 24}">
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
    <!-- ======================= 商品品牌弹出层 =========================  -->
    <el-dialog
      :append-to-body="true"
      width="400px"
      :close-on-click-modal="false"
      title="添加品牌"
      :visible.sync="productBrandDiaLogFlags.addProductBrandFlag"
      class="addProduct title-menu-min2"
      :v-loading="ProductBrandLoadings.productBrandCommonLoading"
    >

      <el-form ref="addProductBrandForm" label-position="left" :inline="true" :model="addProductBrandForm" label-width="80px">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="品牌名称" style="width:100%;">
              <el-input v-model="addProductBrandForm.brandName" class="productBrandInputClass" placeholder="请输入品牌名称" />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:4}" :xs="{span: 23}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;">确认添加</el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="width:100%;margin-bottom: 15px !important;" @click="productBrandDiaLogFlags.addProductBrandFlag = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>

    </el-dialog>
    <!-- ======================= 商品品牌弹出层End =========================  -->

    <!-- ======================= 查询商品品牌LOGO弹出层 =========================  -->

    <el-dialog
      v-loading="ProductBrandLoadings.productBrandCommonLoading"
      :append-to-body="true"
      top="1vh"
      :close-on-click-modal="false"
      title="编辑LOGO"
      :visible.sync="productBrandDiaLogFlags.showProductBrandLogoFlag"
      class="addProduct title-menu-min2"
    >
      <el-row :gutter="24">

        <el-col :sm="{span: 23}" :xs="{span: 23}">
          <el-divider content-position="left">当前LOGO</el-divider>
          <div class="block">
            <el-image :src="editProductBrandLogoForm.oldLogoUrl" />
          </div>
        </el-col>

        <el-col :sm="{span: 23}" :xs="{span: 23}">
          <el-divider content-position="left">替换新的LOGO</el-divider>
          <el-upload
            ref="upload"
            class="upload-demo"
            :auto-upload="false"
            :data="addProductBrandForm.brandName"
            limit="1"
            name="productBrandLogo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" class="uploadBrandBtn" type="primary" style="width:13.5rem;">选取LOGO图片</el-button>
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-divider content-position="left" />
        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button
            type="primary"
            style="margin-top: 12px; width: 100% !important;  padding-left: 0px !important; padding-right: 0px !important;"
            @click="submitUpload"
          >
            确认编辑
          </el-button>
        </el-col>

        <el-col :sm="{span: 8 , offset: 1}" :xs="{span: 24}">
          <el-button
            style="margin-top: 12px;  width: 100% !important; padding-left: 0px !important; padding-right: 0px !important;"
            @click="productBrandDiaLogFlags.showProductBrandLogoFlag = false"
          >
            关闭窗口
          </el-button>
        </el-col>
      </el-row>

    </el-dialog>
    <!-- ======================= 查询商品品牌LOGO弹出层(结束) =========================  -->

    <!-- ======================= 编辑商品品牌弹出层) =========================  -->

    <el-dialog
      v-loading="ProductBrandLoadings.productBrandCommonLoading"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="编辑品牌"
      :visible.sync="productBrandDiaLogFlags.editProductBrand"
      class="addProduct title-menu-min2"
      width="400px"
    >

      <el-form ref="addProductBrandForm" label-position="left" :inline="true" :model="addProductBrandForm" label-width="80px">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="品牌名称" style="width:100%;">
              <el-input v-model="addProductBrandForm.brandName" class="productBrandInputClass" placeholder="请输入品牌名称" />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:4}" :xs="{span: 23}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;">确认添加</el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="width:100%;margin-bottom: 15px !important;" @click="productBrandDiaLogFlags.addProductBrandFlag = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>

    </el-dialog>
    <!-- ======================= 编辑商品品牌弹出层(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 编辑LOGO的FORM
      editProductBrandLogoForm: {
        // 旧的logoUrl
        oldLogoUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        // 需要修改的LOGOId
        productBrandId: '1'
      },
      // 添加品牌的Form
      addProductBrandForm: {
        brandName: ''
      },
      // 品牌页面的弹出层flag集合
      productBrandDiaLogFlags: {
        // 添加品牌的flag
        addProductBrandFlag: false,
        // 查看品牌LogoFlag
        showProductBrandLogoFlag: false,
        // 显示编辑品牌的flag
        editProductBrand: false
      },
      // 分页数据
      total: 100,
      currentPage: 2,
      // 网页长宽
      screenWidth: 0,
      screenHeight: 0,
      // 品牌搜索表单
      searchBrandForm: {
        brandName: ''
      },
      // 品牌加载层集合
      ProductBrandLoadings: {
        // 品牌的HTML加载层
        isProductBrandHtmlLoading: false,
        // 品牌的Table加载层
        productBrandTableDataLoading: false,
        // 品牌弹出层公用的加载成
        productBrandCommonLoading: false
      },
      // 商品品牌Table集合数据
      productBrandTableDatas: [{
        brandId: 1,
        brandNumber: '001',
        brandName: '小米',
        brandLogoUrl: 'http://39.105.41.2:8080/uec//media/file//timg13.gif',
        createName: '鹿七七',
        updateName: '鹿七七',
        createTime: '2019-07-04 09:10',
        updateTime: '2019-07-04 09:10'
      },
      {
        brandId: 1,
        brandNumber: '001',
        brandName: '小米',
        brandLogoUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        createName: '鹿七七',
        updateName: '鹿七七',
        createTime: '2019-07-04 09:10',
        updateTime: '2019-07-04 09:10'
      }
      ]
    }
  },
  created() {
    // 初始化方法 vue组件初始化完成,网页未完成
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
    if (this.screenWidth <= 500) {

    } else {
      this.isLoadingFull = false
    }
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        // 判断宽度是否小于500 小于500 全部全屏显示
        if (this.screenWidth <= 500) {} else {}
      })()
    }
  },
  methods: {
    // 查询图片函数
    showProductBrandLogoDiv(item) {
      // 打开Loading
      this.ProductBrandLoadings.productBrandCommonLoading = true
      this.editProductBrandLogoForm.oldLogoUrl = item.brandLogoUrl
      this.editProductBrandLogoForm.productBrandId = item.brandId
      this.productBrandDiaLogFlags.showProductBrandLogoFlag = true
      this.ProductBrandLoadings.productBrandCommonLoading = false
    },
    // 上传商品图片的钩子函数
    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>

<style>
	#productBrandDiv .el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	#productBrandDiv .el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	#productBrandDiv .el-form-item .el-form-item__content .addProductFormInput .el-input__inner,
	.el-textarea__inner {
		width: 270px !important;
	}

	#productBrandDiv .autocut {
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
	#productBrandDiv .title-menu-min2 {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#productBrandDiv .title-menu-min2::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#productBrandDiv .title-menu-min2::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#productBrandDiv .title-menu-min2::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*新加入隐藏滚动条效果*/
	#productBrandDiv .title-menu-min {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#productBrandDiv .title-menu-min::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#productBrandDiv .title-menu-min::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#productBrandDiv .title-menu-min::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*==================自定义自适应css 宽度 1301 -- 2000px========================*/
	@media only screen and (min-width: 1301px) and (max-width: 2000px) {
		#productBrandDiv .productLeiMuInfoClass {
			margin-left: 0px !important;
		}

		#productBrandDiv .spusRowClass {
			margin-right: 0px !important;
			margin-left: 17px !important;
		}

		#productBrandDiv .SpusClass {
			width: 95% !important;
		}

		#productBrandDiv .el-form .el-form-item .el-input__inner {
			width: 216px !important;
		}

		#productBrandDiv .el-form .el-form-item .SpuInput .el-input__inner {
			width: 216px !important;
		}

		#productBrandDiv .el-form .el-form-item .SpuInput2 .el-input__inner {
			width: 80px !important;
		}
	}

	@media only screen and (min-width: 300px) and (max-width: 409px) {
		#productBrandDiv .productBrandInputClass {
			width: 170px !important;
		}

		#productBrandDiv .spuDialogClass {
			max-height: 300px;
		}

		#productBrandDiv .addAndClose {
			margin-top: 10px !important;
		}

		#productBrandDiv .fixedClass {
			position: absolute;
			top: 100px;
		}

		#productBrandDiv .spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#productBrandDiv .SpusClass {
			width: 270px !important;
		}

		/*  添加商品的css  */
		#productBrandDiv .addProduct .el-dialog {
			width: 330px !important;
		}

		#productBrandDiv .addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 500px) {

		#productBrandDiv.productSkuInfoDialog {
			width: 100% !important;
		}

		#productBrandDiv.productCommentInfoClass {
			width: 100% !important;
		}

		#productBrandDiv.SpusClass button {
			margin-top: 0.625rem !important;
		}

		#productBrandDiv.spuDialogClass {
			max-height: 300px;
		}

		#productBrandDiv.addAndClose {
			margin-top: 10px !important;
		}

		#productBrandDiv.fixedClass {
			position: absolute;
			top: 100px;
		}

		#productBrandDiv.spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#productBrandDiv.SpusClass {
			width: 330px !important;
		}

		/*  添加商品的css  */
		#productBrandDiv.addProduct .el-dialog {
			width: 400px !important;
		}

		#productBrandDiv .addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 1300px) {

		#productBrandDiv .el-form .el-form-item .SpuInput .el-input__inner {
			width: 100px !important;
		}

		#productBrandDiv .el-form .el-form-item .SpuInput2 .el-input__inner {
			width: 100px !important;
		}

		/*  添加商品的css结束  */
		#productBrandDiv .el-form .el-form-item .el-input__inner {
			width: 250px;
		}

		#productBrandDiv .el-form .el-row {
			margin: 0 auto;
			text-align: center;
		}

		#productBrandDiv .el-col-xs-23 {
			width: 100%;
		}

		#productBrandDiv .el-form-item .el-button {
			width: 250px !important;
		}

		.el-divider span {
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

	#productBrandDiv .el-divider span {
		color: #606266;
		font-weight: bold;
	}

	#productBrandDiv .el-table__row th .cell {
		word-break: keep-all;
		white-space: nowrap;
		padding: 0px 0px;
	}

	#productBrandDiv .el-table__row th {
		padding: 3px 0px;
		padding-left: 10px;
		color: #606266;

	}

	#productBrandDiv .el-table__row td {
		padding: 3px 0;
	}

	#productBrandDiv {
		margin: 30px;
	}
</style>
