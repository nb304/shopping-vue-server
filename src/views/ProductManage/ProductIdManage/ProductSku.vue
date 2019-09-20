<template>
  <div style="max-height: 550px;" class="title-menu-min">
    <el-table v-loading="loadingProductSku" :data="SKUInfoForm" border style="width: 100%">
      <el-table-column fixed show-overflow-tooltip="true" prop="productSkuValueIds" label="商品SKU值" min-width="200" />
      <el-table-column label="库存数量" width="120">
        <el-input
          v-model="scope.row.productSkuKc"
          slot-scope="scope"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
          show-word-limit
          :value="scope.row.productSkuKc"
        />
      </el-table-column>
      <el-table-column prop="province" label="价格" width="120">
        <el-input
          v-model="scope.row.productSkuPrice"
          slot-scope="scope"
          maxlength="9"
          show-word-limit
          :value="scope.row.productSkuPrice"
        />
      </el-table-column>
    </el-table>
    <el-col :sm="{span: 5 }" style="margin-top:20px;" :xs="{span: 23}">
      <el-button type="primary" style="width: 100%;" @click="editProductSkuKc">保存配置</el-button>
    </el-col>
    <el-col :sm="{span: 5 , offset: 1}" :xs="{span: 23}" style="margin-top:20px;">
      <el-button style="width: 100%; " @click="closeWindows">关闭窗口</el-button>
    </el-col>
  </div>
</template>

<script>
import {
  productAjaxPost,
  productAjaxGet
} from '@/api/table.js'

export default {
  name: 'ProductSku',
  props: ['productId'],
  data() {
    return {
      SKUInfoForm: [],
      loadingProductSku: true
    }
  },
  created() {
    this.findProductSkuInfo(this.productId)
  },
  methods: {
    // 修改商品的SKU库存信息
    editProductSkuKc() {
      this.$confirm('您确定要修改商品配置库存价格的信息吗?', '确认框', {
        confirmButtonText: '确定修改',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        // 发送Ajax删除商品的SPU
        var url = '/product/sku/edit'
        var para = {
          'productSkuKcJson': JSON.stringify(this.SKUInfoForm)
        }
        productAjaxPost(url, para).then(data => {
          if (data.status == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!请等待系统确认。',
              duration: 1000,
              customClass: 'zzIndex'
            })

            this.COMMON.stopLoading()
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg + '--修改失败,请重新刷新页面',
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
      }).catch(() => {

      })
    },
    closeWindows() {
      this.$emit('closeSkuWindows', true)
    },
    findProductSkuInfo(id) {
      this.loadingProductSku = true
      // 发送Ajax查询信息
      var url = '/product/sku/get/' + id
      productAjaxGet(url).then(data => {
        this.loadingProductSku = false
        if (data.status == 200) {
          this.$message({
            type: 'success',
            message: '查询成功!',
            duration: 1000,
            customClass: 'zzIndex'
          })
          this.SKUInfoForm = data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
