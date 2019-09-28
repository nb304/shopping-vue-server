<!-- 商品类目 -->
<template>
  <div id="spuDiv">

    <!-- 商品SPU的信息 -->
    <div v-if="showSpuInfoFlag">
      <div class="title-menu-min spuDialogClass" style="max-height: 400px;">
        <el-table
          ref="multipleTable"
          v-loading="findSpuInfoLoading"
          :data="productSpuInfo"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="SPU名称" width="160" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.productSpuName }}</template>
          </el-table-column>
          <el-table-column label="SPU值" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.productSpuValue }}</template>
          </el-table-column>
          <el-table-column label="排序" width="55" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.productSpuOrder }}</template>
          </el-table-column>
          <el-table-column label="状态" width="80" show-overflow-tooltip>
            <template slot-scope="scope">

              <el-tag v-if="scope.row.productSpuState == 1">使用中</el-tag>
              <el-tag
                v-else-if="scope.row.productSpuState == 2"
                title="恢复正常使用"
                type="danger"
                style="cursor: pointer;"
                @click="normalSpu(scope.$index,scope.row)"
              >被删除
              </el-tag>
              <el-tag
                v-else
                title="恢复正常使用"
                type="warning"
                style="cursor: pointer;"
                @click="normalSpu(scope.$index,scope.row)"
              >注销中
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="100">
            <el-button
              slot-scope="scope"
              type="text"
              size="small"
              @click="editProductSpu(scope.$index,scope.row)"
            >编辑
            </el-button>
            <el-button type="text" size="small">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-button style="margin-top: 12px;width: 100%;" type="primary" @click="addNewProductSpu">新增SPU
          </el-button>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-button style="margin-top: 12px;width: 100%;" type="primary" @click="batchCancelSpu()">批量注销SPU
          </el-button>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 23}">
          <el-button style="margin-top: 12px;width: 100%;" @click="closeWindows()">关闭窗口</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 商品SPU的信息END   -->

    <!-- ======================= 添加SPU ========================  -->
    <div
      v-if="addProductSpuFlag2"
      style="max-height: 400px; margin-left: 15px;"
    >
      <el-form
        label-position="left"
        :inline="true"
        label-width="80px"
      >
        <div style="max-height: 400px; " class="title-menu-min">
          <el-row v-for="(o,index) in addProductSpuForm" :key="o.key" style="margin: 5px 0px !important;" :gutter="24">

            <el-card shadow="always">

              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input
                    v-model="o.productSpuName"
                    type="textarea"
                    maxlength="20"
                    show-word-limit
                    class="SpuInput"
                    placeholder="请输入商品参数名称"
                  />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 8}" :xs="{span: 12}">

                <el-tag
                  v-for="(tag,index) in o.dynamicTags"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag , index)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="o.inputVisible"
                  ref="saveTagInput"
                  v-model="o.inputValue"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(index)"
                  @blur="handleInputConfirm(index)"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ 添加新的参数</el-button>
                <!--<el-form-item>
                  <el-input
                    v-model="o.productSpuValue"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    class="SpuInput"
                    placeholder="请输入商品参数值,多个值用','隔开"
                  />
                </el-form-item>-->
              </el-col>

              <el-col :sm="{span: 5}" :xs="{span: 12}">
                <el-form-item>
                  <el-input
                    v-model="o.productSpuOrder"
                    maxlength="11"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    show-word-limit
                    :disabled="true"
                    class="SpuInput2"
                    placeholder="排序"
                  />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 2}" :xs="{span: 12}">
                <el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSpuLink(o)" />
              </el-col>
            </el-card>
          </el-row>
        </div>
      </el-form>
    </div>
    <!-- ======================= SPU窗口按钮组 ========================  -->
    <div v-if="addProductSpuFlag2" style="margin-left: 10px;">
      <el-row :gutter="24">

        <el-card shadow="always">

          <el-collapse accordion>
            <el-collapse-item title="操作菜单" name="1">
              <el-col :sm="{span: 8}" :xs="{span: 23}">
                <el-button style="width: 100%;" type="primary" @click="addProductSpuLine">新增一行</el-button>
              </el-col>

              <el-col :sm="{span: 8}" :xs="{span: 23}">
                <el-button style="width: 100%;" type="primary" class="addAndClose" @click="addProductSpuInfo">保存当前配置
                </el-button>
              </el-col>
              <el-col :sm="{span: 8}" :xs="{span: 23}">
                <el-button style="width: 100%;" @click="closeSpuWindows2">关闭窗口</el-button>
              </el-col>
            </el-collapse-item>

          </el-collapse>
        </el-card>
      </el-row>
    </div>
    <!-- ======================= SPU窗口按钮组(结束) ========================  -->

    <!-- ======================= 修改SPU ========================  -->
    <div
      v-if="addProductSpuFlag3"
      id="addProductSpu"
      class="title-menu-min"
      style="max-height: 400px; margin-left: 15px;"
    >
      <el-form
        ref="addProductTwoFrom"
        label-position="left"
        :inline="true"
        :model="addProductTwoFrom"
        label-width="80px"
      >
        <el-row :gutter="4">

          <el-card shadow="always" style="margin-bottom: 5px;width:95%;">
            <el-col :sm="{span: 8}" :xs="{span: 12}">
              <el-form-item>
                <el-input
                  v-model="currentEditSpuInfo.productSpuName"
                  type="textarea"
                  maxlength="20"
                  show-word-limit
                  class="SpuInput"
                  placeholder="请输入商品参数名称"
                />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 8}" :xs="{span: 12}">
              <el-tag
                v-for="(tag) in currentEditSpuInfo.dynamicTags"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose2(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="currentEditSpuInfo.inputVisible"
                ref="saveTagInput"
                v-model="currentEditSpuInfo.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm2()"
                @blur="handleInputConfirm2()"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput2()">+ 添加新的参数</el-button>
            </el-col>

            <el-col :sm="{span: 4}" :xs="{span: 12}">
              <el-form-item>
                <el-input
                  v-model="currentEditSpuInfo.productSpuOrder"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  maxlength="11"
                  show-word-limit
                  class="SpuInput2"
                  placeholder="排序"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 4}" :xs="{span: 12}">
              <el-button
                v-if="currentEditSpuInfo.productSpuState != 2"
                type="danger"
                icon="el-icon-delete"
                circle
                @click.prevent="removeProducSpu(currentEditSpuInfo)"
              />
              <el-button v-else type="danger" icon="el-icon-delete" circle disabled="disabled" />
            </el-col>
          </el-card>
        </el-row>
      </el-form>
    </div>
    <!-- ======================= 修改SPU窗口按钮组 ========================  -->
    <div v-if="addProductSpuFlag3" style="margin-left: 15px;">
      <el-row class="spusRowClass" :gutter="24">

        <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">

          <el-collapse accordion>
            <el-collapse-item title="操作菜单" name="1">
              <el-col :sm="{span: 8}" :xs="{span:24}">
                <el-button type="primary" style="width: 100%;" @click="editSpuInfo()">保存当前配置</el-button>
              </el-col>
              <el-col :sm="{span: 8}" :xs="{span: 24}">
                <el-button style="width: 100%;" @click="closeSpuWindows3">关闭窗口</el-button>
              </el-col>
            </el-collapse-item>

          </el-collapse>
        </el-card>
      </el-row>
    </div>
    <!-- ======================= 修改SPU窗口按钮组(结束) ========================  -->
  </div>
</template>

<script>

import {
  productAjaxPost,
  productAjaxGet
} from '@/api/table.js'

export default {
  props: ['productId'],
  data() {
    return {
      addProductSpuFlag3: false,
      // 当前编辑的SPU信息
      currentEditSpuIndex: 0,
      // 当前编辑的SPU信息
      currentEditSpuInfo: {
        productSpuId: 0,
        productSpuName: '',
        productSpuValue: '',
        productSpuOrder: '',
        dynamicTags: [],
        inputValue: '',
        productSpuState: '',
        inputVisible: false
      },
      cancelSpuIds: [],
      // 商品SPU信息加载
      findSpuInfoLoading: true,
      addProductSpuFlag2: false,
      // 显示商品SPU的Flag
      showSpuInfoFlag: true,
      // 商品SPU的值
      productSpuInfo: [],
      addProductSpuForm: [{
        productSpuName: '',
        productSpuValue: '',
        productSpuOrder: 1,
        key: Date.now(),
        productSpuState: 1,
        dynamicTags: [],
        inputValue: '',
        inputVisible: ''
      }],
      addProductSpuForm2: []
    }
  },
  created() {
    this.findProductSpuInfo(this.productId)
  },
  methods: {
    // 添加商品SPU的信息
    addProductSpuInfo() {
      this.$confirm('您确定要添加商品参数吗?', '确认框', {
        confirmButtonText: '确定添加',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        if (this.addProductSpuForm == null || this.addProductSpuForm.length <= 0) {
          this.$message({
            showClose: true,
            message: '至少添加一个参数信息',
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })
          return
        }

        this.addProductSpuForm.forEach((data, index) => {
          if (data.dynamicTags == null || data.dynamicTags.length <= 0) {
            this.$message({
              showClose: true,
              message: '请将参数信息填写完整',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })
            return
          }
          this.addProductSpuForm[index].productSpuValue = ''
          data.dynamicTags.forEach((n) => {
            if (this.addProductSpuForm[index].productSpuValue == '') {
              this.addProductSpuForm[index].productSpuValue = n
            } else {
              this.addProductSpuForm[index].productSpuValue += ',' + n
            }
          })
          var para = {
            'productSpuName': data.productSpuName, 'productSpuValue': data.productSpuValue,
            'productSpuOrder': data.productSpuOrder, 'key': data.key, 'productSpuState': data.productSpuState
          }
          this.addProductSpuForm2.push(para)
        })
        // 发送Ajax删除商品的SPU
        var url = '/product/spu/add'
        var para = {
          'productSpuJson': JSON.stringify(this.addProductSpuForm2),
          'productId': this.productId
        }
        productAjaxPost(url, para).then(data => {
          if (data.status == 200) {
            this.$message({
              type: 'success',
              message: '添加成功!',
              duration: 1000,
              customClass: 'zzIndex'
            })

            // 动态添加信息
            this.addProductSpuForm.forEach(data => {
              this.productSpuInfo.push(data)
            })
            this.addProductSpuForm = []
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
    // 修改商品参数的信息
    editSpuInfo() {
      // 校验参数是否正确
      this.$confirm('您确定要修改当前的参数信息吗?', '确认框', {
        confirmButtonText: '确定修改',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const dynamicTags = this.currentEditSpuInfo.dynamicTags
        if (dynamicTags == null || dynamicTags.length <= 0) {
          this.$message({
            showClose: true,
            message: '最少添加一个参数值',
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })
          return
        }

        this.currentEditSpuInfo.productSpuValue = ''
        dynamicTags.forEach((n) => {
          if (this.currentEditSpuInfo.productSpuValue == '') {
            this.currentEditSpuInfo.productSpuValue = n
          } else {
            this.currentEditSpuInfo.productSpuValue += ',' + n
          }
        })

        this.COMMON.startLoading()
        // 发送Ajax删除商品的SPU
        var url = '/product/spu/edit'
        productAjaxPost(url, this.currentEditSpuInfo).then(data => {
          console.log(data)
          if (data.status == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!',
              duration: 1000,
              customClass: 'zzIndex'
            })
            this.productSpuInfo[this.currentEditSpuIndex].productSpuValue = this.currentEditSpuInfo.productSpuValue
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
      })
    },
    // 关闭修改SPU的窗口
    closeSpuWindows3() {
      this.showSpuInfoFlag = true
      this.addProductSpuFlag3 = false
    },
    // 显示修改SPU窗口
    editProductSpu(index, obj) {
      console.log(obj)
      this.COMMON.startLoading()
      if (obj != null && obj.productSpuValue != '') {
        const strings = obj.productSpuValue.split(',')
        this.currentEditSpuInfo.dynamicTags = []
        strings.forEach((n) => {
          this.currentEditSpuInfo.dynamicTags.push(n)
        })
      }
      this.currentEditSpuIndex = index
      this.currentEditSpuInfo.productSpuId = obj.productSpuId
      this.currentEditSpuInfo.productSpuName = obj.productSpuName
      this.currentEditSpuInfo.productSpuValue = obj.productSpuValue
      this.currentEditSpuInfo.productSpuOrder = obj.productSpuOrder
      this.currentEditSpuInfo.productSpuState = obj.productSpuState
      this.addProductSpuFlag3 = true
      this.showSpuInfoFlag = false
      this.COMMON.stopLoading()
      console.log(this.currentEditSpuInfo)
    },
    // 恢复商品的SPU信息
    normalSpu(index, obj) {
      this.$confirm('是否恢复被删除或者注销的商品SPU信息!', '确认框', {
        confirmButtonText: '确定恢复',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        // 发送Ajax删除商品的SPU
        var url = '/product/spu/normal'
        var para = {
          'productSpuId': obj.productSpuId
        }
        productAjaxPost(url, para).then(data => {
          console.log(data)
          if (data.status == 200) {
            this.$message({
              type: 'success',
              message: '恢复成功!',
              duration: 1000,
              customClass: 'zzIndex'
            })
            this.productSpuInfo[index].productSpuState = 1
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
      }).catch(() => {

      })
    },
    // 勾选注销的SPU
    handleSelectionChange(val) {
      this.cancelSpuIds = val
    },
    // 批量注销商品的SPU信息
    batchCancelSpu() {
      this.$confirm('是否注销你勾选的商品参数信息!', '确认框', {
        confirmButtonText: '确定注销',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.findSpuInfoLoading = true
        // 获取勾选的spu信息
        var spuIds = ''
        this.cancelSpuIds.forEach(data => {
          if (spuIds == '' || spuIds == '') {
            spuIds = data.productSpuId
          } else {
            spuIds += ',' + data.productSpuId
          }
          // 获取索引
          this.productSpuInfo.forEach((data1, index) => {
            if (data.productSpuId == data1.productSpuId) {
              this.productSpuInfo[index].productSpuState = 3
            }
          })
        })
        if (spuIds == '') {
          this.$message({
            showClose: true,
            message: '请勾选你要注销的商品参数信息',
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })
          this.findSpuInfoLoading = false
          return
        }
        // 发送Ajax删除商品的SPU
        var url = '/product/spu/cancel'
        var para = {
          'spuIds': spuIds
        }
        productAjaxPost(url, para).then(data => {
          this.findSpuInfoLoading = false
          if (data.status == 200) {
            this.$message({
              type: 'success',
              message: '注销成功!',
              duration: 1000,
              customClass: 'zzIndex'
            })
          } else {
            this.$message({
              showClose: true,
              message: data.msg + '--注销失败,请重新刷新页面',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })
          }
        })
      }).catch(() => {

      })
    },
    // 查询商品SPU的信息
    findProductSpuInfo(id) {
      this.findSpuInfoLoading = true
      var url = '/product/spu/get/' + id
      productAjaxGet(url).then(data => {
        this.findSpuInfoLoading = false
        if (data.status == 200) {
          this.productSpuInfo = data.data
          this.productSpuFlag2 = true
        } else {
          this.$message({
            showClose: true,
            message: data.msg + '--请重新刷新页面',
            customClass: 'zzIndex',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    // 关闭添加的SPU窗口
    closeSpuWindows2() {
      this.addProductSpuFlag2 = false
      this.showSpuInfoFlag = true
    },
    removeProducSpu(obj) {
      this.$confirm('是否真的需要删除商品的SPU参数,删除后可在商品SPU信息中恢复!', '确认框', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        this.currentEditSpuInfo.productSpuState = 2
        // 发送Ajax删除商品的SPU
        var url = '/product/spu/del'
        var para = {
          'productSpuId': obj.productSpuId
        }
        productAjaxPost(url, para).then(data => {
          console.log(data)
          if (data.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1000,
              customClass: 'zzIndex'
            })
            this.productSpuInfo[this.currentEditSpuIndex].productSpuState = 2
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
    // 删除一行SPU
    removeProducSpuLink(item) {
      var index = this.addProductSpuForm.indexOf(item)
      if (index !== -1) {
        this.addProductSpuForm.splice(index, 1)
      }
    },
    // 新增一行SPU
    addProductSpuLine() {
      this.addProductSpuForm.push({
        productSpuName: '',
        productSpuValue: '',
        key: Date.now(),
        productSpuOrder: this.addProductSpuForm.length + 1,
        productSpuState: 1,
        dynamicTags: [],
        inputValue: '',
        inputVisible: ''
      })
      this.$message({
        showClose: true,
        message: '新增成功,请拖动屏幕到底部'
      })
    },
    // SPU参数的方法集合
    handleClose2(tag) {
      this.currentEditSpuInfo.dynamicTags.splice(this.currentEditSpuInfo.dynamicTags.indexOf(tag), 1)
    },
    showInput2() {
      this.currentEditSpuInfo.inputVisible = true
    },

    handleInputConfirm2() {
      const inputValue = this.currentEditSpuInfo.inputValue
      if (inputValue) {
        this.currentEditSpuInfo.dynamicTags.push(inputValue)
      }
      this.currentEditSpuInfo.inputVisible = false
      this.currentEditSpuInfo.inputValue = ''
    },
    handleClose(tag, index) {
      this.addProductSpuForm[index].dynamicTags.splice(this.addProductSpuForm[index].dynamicTags.indexOf(tag), 1)
    },
    showInput(index) {
      this.addProductSpuForm[index].inputVisible = true
    },

    handleInputConfirm(index) {
      const inputValue = this.addProductSpuForm[index].inputValue
      if (inputValue) {
        this.addProductSpuForm[index].dynamicTags.push(inputValue)
      }
      this.addProductSpuForm[index].inputVisible = false
      this.addProductSpuForm[index].inputValue = ''
    },
    // 新增SPU
    addNewProductSpu() {
      this.showSpuInfoFlag = false
      this.addProductSpuFlag2 = true
    },
    // 关闭窗口
    closeWindows() {
      this.$emit('closeSpuWindows', true)
    }
  }
}
</script>

<style>
  #spuDiv .el-form-item {
    width: 100% !important;
  }

  #spuDiv .el-form-item__content {
    width: 100% !important;
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
