<!--===========添加采购管理模块========-->
<template>


  <div id="addPurchasing">

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="left">
            <span>采购单添加</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-form ref="form" :model="addPurchasingForm" label-width="70px">
      <el-row :gutter="24">

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购单号">
            <el-input v-model="addPurchasingForm.purchasingNumber" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购名称">
            <el-input v-model="addPurchasingForm.purchasingNamer" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购日期">
            <el-date-picker
              v-model="addPurchasingForm.purchasingTime"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购描述">
            <el-input v-model="addPurchasingForm.purchasingDesc" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购金额">
            <el-input v-model="addPurchasingForm.purchasingPrice" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购地址">
            <el-input v-model="addPurchasingForm.purchasingAddress" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="厂家名称">
            <el-input v-model="addPurchasingForm.purchasingLinkman" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="联系电话">
            <el-input v-model="addPurchasingForm.purchasingPhone" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span:5}" :xs="{span: 24}">
          <el-form-item label="上传图片">
            <el-upload
              ref="upload"
              class="upload-demo"
              :auto-upload="false"
              :on-remove="onRemove"
              :on-change="onChange"
              :file-list="addPurchasingForm.uploadFile"
              limit="1"
            >
              <el-button slot="trigger" size="small" icon="el-icon-picture" style="width: 100%;" type="primary">选择图片</el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" style="width: 100%;" @click="addPurchasing">确定</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="left">
            <span>采购商品添加</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-form ref="form" :model="addProductForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="商品名称">
            <el-input v-model="addProductForm.productName" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="商品描述">
            <el-input v-model="addProductForm.productDesc" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购数量">
            <el-input v-model="addProductForm.productNumber" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购金额">
            <el-input v-model="addProductForm.productPrice" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" style="width: 100%;" @click="addProduct">添加</el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <el-row :gutter="24">
      <el-table
        v-loading="listLoading"
        :data="addProductList"
        element-loading-text="Loading"
      >
        <el-table-column label="序号" show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="商品名称" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商品描述" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.productDesc }}</span>
          </template>
        </el-table-column>

        <el-table-column label="采购数量" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.productNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column label="采购金额" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.productPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="操作" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button type="text" size="20px" @click.native.prevent="removeProduct(scope.$index, list)"> 删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddPurchasing',
  data() {
    return {
      addPurchasingForm: { // 添加采购单信息要用到的from表单
        purchasingNumber: '', // 采购单号
        purchasingNamer: '', // 采购名称
        purchasingTime: '', // 采购日期
        purchasingDesc: '', // 采购描述
        purchasingPrice: '', // 采购金额
        purchasingAddress: '', // 采购地址
        purchasingLinkman: '', // 厂家名称
        purchasingPhone: '', // 联系电话
        uploadFile: ''// 上传图片

      },
      addProductForm: { // 添加采购商品信息要用到的from表达那
        productName: '', // 商品名称
        productDesc: '', // 商品描述
        productNumber: '', // 采购数量
        productPrice: ''// 采购金额
      },
      addProductList: [
        // { productName: '1231231231', productDesc: '1231231231', productNumber: '1231231231', productPrice: '1231231231' }
      ]
    }
  },
  methods: {
    addProduct: function() { // 添加商品到列表数据方法
      // 封装当前要添加的数据
      const currData = { productName: this.addProductForm.productName, productDesc: this.addProductForm.productDesc, productNumber: this.addProductForm.productNumber, productPrice: this.addProductForm.productPrice }
      this.addProductList.push(currData)

      // 添加完成后清空一个添加商品form表单
      this.addProductForm.productName = '' // 商品名称
      this.addProductForm.productDesc = '' // 商品描述
      this.addProductForm.productNumber = '' // 采购数量
      this.addProductForm.productPrice = ''// 采购金额
    },
    removeProduct: function(currIndex) { // 删除商品到列表数据方法
      this.addProductList.splice(currIndex, 1)
    },

    addPurchasing: function() { // 添加采购单信息
      this.$confirm('采购单信息一旦确定不能修改,但采购商品还是可以二次修改请谨慎添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {

      }).then(data => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
      })
    }

  }
}
</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #addPurchasing{
    margin: 30px;
  }

  #addPurchasing .el-col-lg-5 {
    width: 19.83333%;
  }

  #addPurchasing .el-divider span{
    color: #606266;font-weight:bold;
  }

  #addPurchasing .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #addPurchasing .el-table th{
    padding:5px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #addPurchasing .el-table td{
    padding: 0px;
  }

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/
    #addPurchasing .el-col-xs-24 {
      width: 100% !important;
    }

  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/
    #addPurchasing .el-col-xs-24 {
      width: 100% !important;
    }

  }
</style>
