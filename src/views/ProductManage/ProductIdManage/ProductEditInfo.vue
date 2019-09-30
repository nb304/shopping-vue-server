<template>
  <div style="max-height: 550px;">
    <el-form ref="editProduct" v-loading="isLoading" :element-loading-text="text" :model="editProduct"
             label-width="80px">

      <el-row :gutter="24">

        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
          <el-form-item class="addProductItem" label="商品名称" style="width:100%;">
            <el-input
              v-model="editProductForm.productName"
              maxlength="200"
              show-word-limit
              class="addProductFormInput"
              placeholder="请输入商品名称"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

          <el-form-item label="商品品牌" class="addProductItem" style="width:100%;">
            <el-select
              v-model="editProductForm.productBrandId"
              style="width:100%;"
              class="addProductFormInput"
              placeholder="请选择商品品牌"
            >
              <el-option
                v-for="(item, index) in brands"
                :key="index"
                :label="item.brandName"
                :value="item.brandId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
          <el-form-item class="addProductItem" label="市场价格" style="width:100%;">
            <el-input
              v-model="editProductForm.productBazaarPrice"
              maxlength="7"
              show-word-limit
              class="addProductFormInput"
              placeholder="请输入市场价格"
              oninput="value=value.replace(/[^\d]/g,'')"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

          <el-form-item label="商城价格" class="addProductItem">
            <el-input
              v-model="editProductForm.productSystemPrice"
              maxlength="7"
              show-word-limit
              class="addProductFormInput"
              oninput="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入商城价格"
            />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
          <el-form-item class="addProductItem" label="商品卖点" style="width:100%;">
            <el-input
              v-model="editProductForm.productPoints"
              maxlength="100"
              show-word-limit
              class="addProductFormInput"
              placeholder="请输入商品卖点"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

          <el-form-item label="排序" class="addProductItem">
            <el-input
              v-model="editProductForm.productOrderRule"
              maxlength="7"
              show-word-limit
              class="addProductFormInput"
              placeholder="请输入排序"
              oninput="value=value.replace(/[^\d]/g,'')"
            />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
          <el-form-item class="addProductItem" label="商品单位" style="width:100%;">
            <el-input
              v-model="editProductForm.productUnit"
              maxlength="10"
              show-word-limit
              class="addProductFormInput"
              placeholder="请输入商品单位"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

          <el-form-item label="商品简述" class="addProductItem">
            <el-input
              v-model="editProductForm.productSketchContent"
              type="textarea"
              maxlength="1000"
              show-word-limit
              class="addProductFormInput"
              placeholder="请输入商品简述"
            />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
          <el-form-item label="是否支持" style="width:100%;" class="addProductItem">
            <el-radio v-model="editProductForm.productIfSupport" :label="1">支持无理由退货</el-radio>
            <el-radio v-model="editProductForm.productIfSupport" :label="2">不支持无理由退货</el-radio>
            <el-input
              v-if="editProductForm.productIfSupport == 1"
              v-model="editProductForm.productSupportDay"
              oninput="value=value.replace(/[^\d]/g,'')"
              maxlength="3"
              show-word-limit
              placeholder="设置无理由退款天数(默认7天)"
              class="addProductFormInput"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
          <el-form-item class="addProductItem" label="商品图片" style="width:100%;">
            <el-button type="primary" style="width:270px;" :disabled="!isEditFlag" @click="editProductImageFun">
              修改商品图片
            </el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

          <el-form-item label="商品详情" class="addProductItem">
            <el-button type="primary" style="width:270px;" :disabled="!isEditFlag" @click="addProductInfos">修改商品详情
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="spusRowClass" :gutter="24">

        <el-col :sm="{span: 6,offset: 1}" :xs="{span: 24}">
          <el-button
            type="primary"
            style="margin-top: 12px;  width: 100% !important; "
            :disabled="!isEditFlag"
            v-loading="isLoading"
            @click="editProductFun()"
          >保存编辑
          </el-button>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-button
            style="margin-top: 12px;  width: 100% !important; margin-bottom: 10px !important;"
            @click="closeWindows()"
          >关闭窗口
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

  import {
    productAjaxPost,
    productAjaxGet
  } from '@/api/table.js'

  export default {
    name: 'ProductEditInfo',
    props: ['productId'],
    data() {
      return {
        // 修改商品的表单
        editProductForm: {},
        isEditFlag: false,
        isLoading: false,
        brands: [],
        text: '正在查询数据中'
      }
    },
    created() {
      this.findProductInfo(this.productId)
    },
    methods: {
      // 修改商品信息
      editProductFun() {
        this.$confirm('您确定要修改商品的信息吗?', '确认框', {
          confirmButtonText: '确定修改',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          this.isEditFlag = true
          this.text = '正在修改商品信息'
          var url = '/product/basics/edit/info'
          productAjaxPost(url, this.editProductForm).then(data => {
            this.isLoading = false
            if (data.status == 200) {
              this.$message({
                type: 'success',
                message: data.msg,
                duration: 0,
                customClass: 'zzIndex',
                showClose: true
              })
              this.isLoading = false
              this.closeWindows()
            } else {
              this.$message({
                showClose: true,
                message: data.msg + '--请重新刷新页面',
                type: 'error',
                duration: 3000,
                customClass: 'zzIndex'
              })

            }
          })
        })
      },
      closeWindows() {
        this.$emit('closeEditWindows', true)
      },
      findProductInfo(id) {

        this.isLoading = true
// 发送AJax查询数据
        var url = '/product/basics/edit/get/' + id
        productAjaxGet(url).then(data => {
          this.isLoading = false
          if (data.status == 200) {
            this.isEditFlag = data.data.editFlag
            this.editProductForm = data.data.productInfo
            this.brands = data.data.brands
            if (data.data.editFlag) {
              this.$message({
                type: 'success',
                message: '查询成功!',
                duration: 1000,
                customClass: 'zzIndex'
              })
            } else {
              this.$message({
                showClose: true,
                message: '该商品信息于:' + data.data.productInfo.lastTimeStr + '-被:' + data.data.productInfo.lastUpdateUserNaem +
                  '修改:预计:时间-' + data.data.productInfo.nextTimeStr + '可重新修改',
                duration: 0,
                customClass: 'zzIndex'
              })
            }
            this.isLoading = false
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })
            this.isLoading = false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
