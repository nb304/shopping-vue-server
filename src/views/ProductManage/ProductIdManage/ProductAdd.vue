<!-- 添加新的商品信息 -->
<template>
  <div>
    <div id="addProductLoading" v-if="showAddProduct" v-loading="isLoadingAddFlag">
      <!-- ======================= 步骤一=========================  -->
      <div v-if="isShowOneFlag" id="stepone" class="stepList">

        <el-form
          label-position="left"
          :inline="true"
          label-width="80px"
        >
          <el-row :gutter="24">
            <el-col :sm="{span: 12,offset: 6}" :xs="{span: 24}" style="margin-bottom: 20px;">
              <el-alert
                title="请仔细为您即将添加的商品选择类目,您选择的类目会引响到后期“买家”搜索的结果，请仔细选择,确认添加后类目不可修改。"
                type="info"
              >
              </el-alert>
            </el-col>
            <el-col :sm="{span: 12,offset: 6}" :xs="{span: 24}">

              <el-form-item label="商品类目">
                <el-cascader
                  v-model="addProductFrom.productCategory"
                  filterable
                  :options="options"
                  style="width: 100% !important;"
                  @change="handleChange"
                />
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
      <!-- ======================= 步骤一(结束)=========================  -->


      <!-- ======================= 步骤二=========================  -->
      <div v-if="isShowTwoFlag">

        <el-form
          :inline="true"
          label-position="left"
          label-width="80px"
        >

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 24}">
              <el-form-item label="商品名称" style="width:100%;">
                <el-input maxlength="70"
                          show-word-limit v-model="addProductFrom.productName" placeholder="请输入商品名称"/>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11}" :xs="{span: 24}">

              <el-form-item label="商品品牌" style="width:100%;">
                <el-select v-model="addProductFrom.productBrandId" style="width:100% !important;" placeholder="请选择商品品牌">
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
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 24}">
              <el-form-item label="市场价格" style="width:100%;">
                <el-input
                  v-model="addProductFrom.productBazaarPrice"
                  :rules="priceRuleShC"
                  maxlength="9"
                  show-word-limit
                  placeholder="请输入市场价格"
                />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11}" :xs="{span: 24}">
              <el-form-item label="商城价格" style="width:100%;">
                <el-input
                  v-model="addProductFrom.productSystemPrice"
                  :rules="priceRuleShC"
                  maxlength="9"
                  show-word-limit
                  placeholder="请输入商城价格"
                />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <!-- ======================= 步骤二(结束)=========================  -->

      <!-- ======================= 步骤三=========================  -->
      <div v-if="isShowThreeFlag">
        <el-form
          :inline="true"
          label-position="left"
          :model="addProductFrom"
          label-width="80px"
        >
          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品卖点" style="width:100%;">
                <el-input
                  v-model="addProductFrom.productPoints"
                  maxlength="150"
                  show-word-limit
                  class="addProductFromInput"
                  placeholder="请输入商品卖点"
                />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="排序" style="width:100%;">
                <el-input
                  v-model="addProductFrom.productOrderRule"
                  class="addProductFromInput"
                  placeholder="请输入商品排序"
                  maxlength="7"
                  show-word-limit
                />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品单位" style="width:100%;">
                <el-input
                  v-model="addProductFrom.productUnit"
                  maxlength="7"
                  show-word-limit
                  class="addProductFromInput"
                  placeholder="请输入商品单位"
                />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品简述" style="width:100%;">
                <el-input
                  v-model="addProductFrom.productSketchContent"
                  maxlength="300"
                  show-word-limit
                  type="textarea"
                  class="addProductFromInput"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="是否支持" style="width:100%;">
                <el-radio v-model="addProductFrom.productIfSupport" :label="1">支持无理由退货</el-radio>
                <el-radio v-model="addProductFrom.productIfSupport" :label="2">不支持无理由退货</el-radio>
                <el-input
                  v-if="addProductFrom.productIfSupport == 1"
                  v-model="addProductFrom.productSupportDay"
                  maxlength="3"
                  show-word-limit
                  placeholder="设置无理由退款天数(默认7天)"
                  class="addProductFromInput"
                />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <!-- ======================= 步骤三(结束)=========================  -->

      <!-- ======================= 步骤四========================  -->
      <div v-if="isShowFourFlag">
        <el-form
          :inline="true"
          label-position="left"
          label-width="80px"
        >
          <el-row :gutter="24">

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品配置" style="width:100%;" class="addProductItem">
                <el-button type="primary" style="width:90%;" @click="addProductSKU">添加商品配置</el-button>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品参数" style="width:100%;" class="addProductItem">
                <el-button type="primary" style="width:90%;" @click="addProductSPU">添加商品参数</el-button>
              </el-form-item>
            </el-col>

          </el-row>

          <!--<el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品图片" style="width:100%;" class="addProductItem">
                <el-button type="primary" style="width:270px;" @click="addProductImages">添加商品图片</el-button>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品详情" style="width:100%;" class="addProductItem">
                <el-button type="primary" style="width:270px;" @click="addProductInfos">添加商品详情</el-button>
              </el-form-item>
            </el-col>
          </el-row>-->

        </el-form>

      </div>
      <!-- ======================= 步骤四(结束)=========================  -->

      <!-- ======================= 添加商品进度=========================  -->
      <el-steps :active="active" finish-status="success" align-center style="margin-top:30px;">
        <el-step title="步骤1" description="选择商品类目" show-overflow-tooltip="true"/>
        <el-step title="步骤2" description="添加宝贝基本信息" show-overflow-tooltip="true"/>
        <el-step title="步骤3" description="添加宝贝详细信息"/>
        <el-step title="步骤4" :description="stepFourContent"/>
      </el-steps>

      <el-row :gutter="24">

        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button
            v-if="isAddOrNextFlag"
            type="primary"
            :disabled="isStepBtn"
            style="margin-top: 12px; width: 100% !important;  padding-left: 0px !important; padding-right: 0px !important;"
            @click="next"
          >我已阅读无误,下一步
          </el-button>
          <el-button
            v-if="!isAddOrNextFlag"
            type="primary"
            :disabled="isStepBtn"
            style="margin-top: 12px;  width: 100% !important;   padding-left: 0px !important; padding-right: 0px !important;"
            @click="yesAddProduct"
          >我已阅读无误,确认添加
          </el-button>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button
            type="primary"
            style="margin-top: 12px;  width: 100% !important;  padding-left: 0px !important; padding-right: 0px !important;"
            :disabled="isStepBtn"
            @click="last"
          >上一步
          </el-button>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button
            style="margin-top: 12px;  width: 100% !important; padding-left: 0px !important; padding-right: 0px !important;"
            :disabled="isStepBtn"
            @click="closeAddProduct"
          >关闭窗口
          </el-button>
        </el-col>
      </el-row>

      <!-- ======================= 添加商品弹出层End =========================  -->
    </div>
    <div id="addProductSpu" v-if="addProductSpuFlag">
      <!-- ======================= 添加SPU ========================  -->
      <div
      >
        <el-form
          ref="addProductTwoFrom"
          label-position="left"
          :inline="true"
          label-width="80px"
        >
          <div style="max-height: 400px;" class="title-menu-min">
            <el-row v-for="(o,index) in addProductFrom.productSpuInfo" :key="o.key" :gutter="24">

              <el-card shadow="always" style="margin-bottom: 5px;width:95%; margin-left: 10px;">
                <el-col :sm="{span: 8}" :xs="{span: 12}">
                  <el-form-item>
                    <el-input v-model="o.productSpuName" class="SpuInput" maxlength="10" placeholder="请输入商品参数"/>
                  </el-form-item>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span: 12}">
                  <el-tag
                    v-for="(tag,sindex) in o.dynamicTags"
                    :key="tag"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseSpu(tag , index , sindex)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="o.inputVisible"
                    ref="saveTagInput"
                    v-model="o.inputValue"
                    class="input-new-tag"
                    size="small"
                    @keyup.enter.native="handleInputConfirmSpu(index)"
                    @blur="handleInputConfirmSpu(index)"
                  />
                  <el-button v-else class="button-new-tag" size="small" @click="showInputSpu(index)">+ 添加新的参数
                  </el-button>
                </el-col>

                <el-col :sm="{span: 4}" :xs="{span: 12}">
                  <el-form-item>
                    <el-input :value="index" class="SpuInput2" disabled placeholder="排序"/>
                  </el-form-item>
                </el-col>

                <el-col :sm="{span: 4}" :xs="{span: 12}">
                  <el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSpuLink(o)"/>
                </el-col>
              </el-card>
            </el-row>
          </div>
        </el-form>
      </div>
      <!-- ======================= SPU窗口按钮组 ========================  -->
      <div v-if="addProductSpuFlag" style="margin-left: 30px;">
        <el-row :gutter="24">

          <el-card shadow="always" style="margin-bottom: 5px;width:95%;">

            <el-collapse accordion>
              <el-collapse-item title="操作菜单" name="1">
                <el-col :sm="{span: 4}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" @click="addProductSpuLine">新增一行</el-button>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" class="addAndClose" @click="closeSpuWindows">
                    保存商品参数
                  </el-button>
                </el-col>

                <el-col :sm="{span: 5}" :xs="{span: 23}">
                  <el-button style="width: 100%;" @click="closeSpuWindows">关闭窗口</el-button>
                </el-col>

              </el-collapse-item>

            </el-collapse>
          </el-card>
        </el-row>
      </div>
      <!-- ======================= SPU窗口按钮组(结束) ========================  -->
      <!-- ======================= 添加SPU(结束) ========================  -->
    </div>
    <!-- 添加商品的SKU -->
    <div id="addProductSku" v-if="addProductSkuFlag">
      <!-- ======================= 添加SKU ========================  -->
      <div
      >
        <el-form
          label-position="left"
          :inline="true"
          label-width="80px"
        >
          <div style="max-height: 400px;" class="title-menu-min">
            <el-row v-for="(o,index) in addProductFrom.productSkuInfo" :key="o.key" :gutter="24">

              <el-card shadow="always" style="margin-bottom: 5px;width:95%; margin-left: 10px;">
                <el-col :sm="{span: 8}" :xs="{span: 12}">
                  <el-form-item>
                    <el-input v-model="o.productSkuName" class="SpuInput" maxlength="10" placeholder="请输入商品配置名称"/>
                  </el-form-item>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span: 12}">
                  <el-tag
                    v-for="(tag,sindex) in o.dynamicTags"
                    :key="tag"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseSku(tag , index , sindex)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="o.inputVisible"
                    ref="saveTagInput"
                    v-model="o.inputValue"
                    class="input-new-tag"
                    size="small"
                    @keyup.enter.native="handleInputConfirmSku(index)"
                    @blur="handleInputConfirmSku(index)"
                  />
                  <el-button v-else class="button-new-tag" size="small" @click="showInputSku(index)">+ 添加新的配置
                  </el-button>
                </el-col>

                <el-col :sm="{span: 4}" :xs="{span: 12}">
                  <el-form-item>
                    <el-input :value="index" class="SpuInput2" disabled placeholder="排序"/>
                  </el-form-item>
                </el-col>

                <el-col :sm="{span: 4}" :xs="{span: 12}">
                  <el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSkuLink(index)"/>
                </el-col>
              </el-card>
            </el-row>
          </div>
        </el-form>
      </div>
      <!-- ======================= 添加SKU窗口按钮组 ========================  -->
      <div v-if="addProductSkuFlag" style="margin-left: 30px;">
        <el-row :gutter="24">

          <el-card shadow="always" style="margin-bottom: 5px;width:95%;">

            <el-collapse accordion>
              <el-collapse-item title="操作菜单" name="1">
                <el-col :sm="{span: 4}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" @click="addProductSkuLine">新增一行</el-button>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" class="addAndClose" @click="closeSkuWindows">
                    保存商品参数
                  </el-button>
                </el-col>

                <el-col :sm="{span: 5}" :xs="{span: 23}">
                  <el-button style="width: 100%;" @click="closeSkuWindows">关闭窗口</el-button>
                </el-col>

              </el-collapse-item>

            </el-collapse>
          </el-card>
        </el-row>
      </div>
      <!-- ======================= 添加SKU窗口按钮组(结束) ========================  -->
    </div>
  </div>
</template>
<script>
  import {
    productAjaxPost,
    productAjaxGet
  } from '@/api/table.js'

  export default {
    name: "ProductAdd",
    data() {
      return {
        // 添加商品的表单信息
        addProductFrom: {
          productCategory: [],
          productName: '',
          productSpu: [],
          productSku: [],
          productBrandId: '',
          productBazaarPrice: '',
          productSystemPrice: '',
          productPoints: '',
          productOrderRule: '',
          productUnit: '',
          productSketchContent: '',
          productIfSupport: 2,
          productSupportDay: 7,

          // 商品的SKU信息
          productSkuInfo: [
            {
              productSkuName: '',
              productSkuValue: '',
              productSpuOrder: 1,
              key: Date.now(),
              dynamicTags: [],
              inputVisible: false,
              inputValue: ''
            }
          ],
          // 商品的SPU信息
          productSpuInfo: [
            {
              productSpuName: '',
              productSpuValue: '',
              productSpuOrder: 1,
              key: Date.now(),
              productSpuState: 1,
              dynamicTags: [],
              inputVisible: false,
              inputValue: ''
            }
          ]
        },
        showAddProduct: true,
        addProductSkuFlag: false,
        // 是否正在测试
        ifTest: false,
        // 是否显示步骤一
        isShowOneFlag: true,
        // 是否显示步骤二
        isShowTwoFlag: false,
        // 是否显示步骤三
        isShowThreeFlag: false,
        // 是否显示步骤四
        isShowFourFlag: false,
        // 是否显示添加商品的SPU信息
        addProductSpuFlag: false,
        // 是否加载Flag
        isLoadingAddFlag: false,
        // 类目的集合信息
        options: [],
        active: 0,
        stepFourContent: '填写宝贝重要信息',
        // 当前是否可以下一步
        isAddOrNextFlag: true,
        brands: [],
        // 是否修改了类目信息
        isEditCategoryFlag: false
      }
    },
    created() {
      this.getProductCategoryAndBrandInfo();
    },
    methods: {
      // 添加商品
      yesAddProduct() {
        this.isLoadingAddFlag = true
        var url = '/product/basics/add'
        this.addProductFrom.productCategory = this.addProductFrom.productCategory[0] + "," + this.addProductFrom.productCategory[1]
        this.addProductFrom.productSku = JSON.stringify(this.addProductFrom.productSku)
        this.addProductFrom.productSpu = JSON.stringify(this.addProductFrom.productSpu)
        productAjaxPost(url, this.addProductFrom).then(data => {
          if (data.status == 200) {
            // 调用成功 返回了商品类目和商品品牌信息
            // 设置商品类目
            this.options = data.data.productCategorys
            // 设置商品品牌
            this.brands = data.data.productBrands
            this.isLoadingAddFlag = false
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            })
            this.isLoadingAddFlag = false
          }
        });
      },
      closeAddProduct() {
        this.$emit('closeAddProduct', true)
      },
      removeProducSkuLink(index) {
        this.addProductFrom.productSkuInfo.splice(index, 1)
      },
      // 删除一行SPU
      removeProducSpuLink(item) {
        var index = this.addProductFrom.productSpuInfo.indexOf(item)
        if (index !== -1) {
          this.addProductFrom.productSpuInfo.splice(index, 1)
        }
      },
      closeSkuWindows() {
        this.showAddProduct = true
        this.addProductSkuFlag = false
      },
      // 关闭商品的SPU窗口
      closeSpuWindows() {
        this.showAddProduct = true
        this.addProductSpuFlag = false
      },
      addProductSKU() {
        this.showAddProduct = false
        this.addProductSkuFlag = true
      },
      // 添加商品参数
      addProductSPU() {
        this.showAddProduct = false
        this.addProductSpuFlag = true
      },
      // 新增一行SPU
      addProductSpuLine() {
        this.addProductFrom.productSpuInfo.push({
          productSpuName: '',
          productSpuValue: '',
          key: Date.now(),
          productSpuOrder: this.addProductFrom.productSpuInfo.length + 1,
          dynamicTags: [],
          inputValue: '',
          inputVisible: ''
        })
        this.$message({
          showClose: true,
          message: '新增成功,请拖动屏幕到底部'
        })
      },
      addProductSkuLine() {
        this.addProductFrom.productSkuInfo.push({
          productSkuName: '',
          productSkuValue: '',
          key: Date.now(),
          productSpuOrder: this.addProductFrom.productSkuInfo.length + 1,
          dynamicTags: [],
          inputValue: '',
          inputVisible: '',
          isSystemCreate: 2
        })
        this.$message({
          showClose: true,
          message: '新增成功,请拖动屏幕到底部'
        })
      },
      // 添加商品SPU的方法参数
      handleCloseSpu(tag, index, sindex) {
        this.addProductFrom.productSpuInfo[index].dynamicTags.splice(sindex, 1)
      },
      showInputSpu(index) {
        this.addProductFrom.productSpuInfo[index].inputVisible = true
      },

      handleInputConfirmSpu(index) {
        const inputValue = this.addProductFrom.productSpuInfo[index].inputValue
        if (inputValue) {
          this.addProductFrom.productSpuInfo[index].dynamicTags.push(inputValue)
        }
        this.addProductFrom.productSpuInfo[index].inputVisible = false
        this.addProductFrom.productSpuInfo[index].inputValue = ''
      },
      // 添加商品SKU的方法参数
      handleCloseSku(tag, index, sindex) {
        this.addProductFrom.productSkuInfo[index].dynamicTags.splice(sindex, 1)
      },
      showInputSku(index) {
        this.addProductFrom.productSkuInfo[index].inputVisible = true
      },

      handleInputConfirmSku(index) {
        const inputValue = this.addProductFrom.productSkuInfo[index].inputValue
        if (inputValue) {
          this.addProductFrom.productSkuInfo[index].dynamicTags.push(inputValue)
        }
        this.addProductFrom.productSkuInfo[index].inputVisible = false
        this.addProductFrom.productSkuInfo[index].inputValue = ''
      },
      // 切换类目的信息
      handleChange() {
        this.isEditCategoryFlag = true
      },
      // 获取上坡类目的和品牌的信息
      getProductCategoryAndBrandInfo() {
        this.isLoadingAddFlag = true
        var url = '/product/basics/add/page/info'
        productAjaxGet(url).then(data => {
          if (data.status == 200) {
            // 调用成功 返回了商品类目和商品品牌信息
            // 设置商品类目
            this.options = data.data.productCategorys
            // 设置商品品牌
            this.brands = data.data.productBrands
            this.isLoadingAddFlag = false
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            })
            this.isLoadingAddFlag = false
          }
        });
      },
      // 上一步
      last() {
        if (this.active == 0) {
          this.$message({
            showClose: true,
            message: '不能再向前了哦~~',
            type: 'warning'
          });
          return;
        } else if (this.active == 1) {
          this.active = 0
          // 给出提示
          this.$message({
            message: '如果对`商品类目`进行修改后,SPU和SKU就会变成初始化的值哦',
            type: 'warning'
          });
          this.isShowTwoFlag = false
          this.isShowOneFlag = true
        } else if (this.active == 2) {
          this.active = 1;
          this.isShowThreeFlag = false
          this.isShowTwoFlag = true
        } else if (this.active == 3 || this.active == 4) {
          this.active = 2
          this.isShowFourFlag = false
          this.isShowThreeFlag = true
          this.isAddOrNextFlag = true
        }
      },
      message(type, message) {
        this.$message({
          message: message,
          type: type,
          showClose: true
        })
      },
      // 下一步
      next() {
        // 判断是否是第一步
        if (this.active == 0) {
          // 第一步 进行逻辑判断 然后开始第二步
          if (this.addProductFrom.productCategory == '' || this.addProductFrom.productCategory == null) {

            this.message('error', '请仔细选择该商品的类目')
            return
          } else if (this.isEditCategoryFlag) {
            this.isLoadingAddFlag = true
            var url = '/product/basics/get/sku/info?categoryId=' + this.addProductFrom.productCategory[1]
            productAjaxGet(url).then(data => {
              if (data.status == 200) {
                this.addProductFrom.productSkuInfo = []
                if (data.data.length > 0) {
                  data.data.forEach(data2 => {
                    this.addProductFrom.productSkuInfo.push({
                      productSkuName: data2.productSkuKeyName,
                      productSkuValue: '',
                      key: Date.now(),
                      productSpuOrder: this.addProductFrom.productSkuInfo.length + 1,
                      dynamicTags: [],
                      inputValue: '',
                      inputVisible: '',
                      isSystemCreate: 1
                    })
                  });
                }
                this.isLoadingAddFlag = false
                this.isEditCategoryFlag = false
              } else {
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error'
                })
                this.isLoadingAddFlag = false
              }
            });
          }

          this.active = 1
          this.isShowOneFlag = false
          this.isShowTwoFlag = true
        } else if (this.active == 1) {
          // 判断是否是第二步
          if (!this.ifTest) {
            if (this.addProductFrom.productName == '') {
              this.message('error', '请填写商品的名称')
              return;
            } else if (this.addProductFrom.productBrandId == '') {
              this.message('error', '请选择商品的品牌信息')
              return;
            } else if (this.addProductFrom.productSystemPrice == '') {
              this.message('error', '请填写商品的商城价格')
              return;
            } else if (this.addProductFrom.productBazaarPrice == '') {
              this.message('error', '请填写商品的市场价格')
              return;
            }
          }


          this.active = 2
          this.isShowTwoFlag = false
          this.isShowThreeFlag = true
        } else if (this.active == 2) {
          // 判断是否是第三步
          if (!this.ifTest) {
            if (this.addProductFrom.productUnit == '') {
              this.message('error', '商品单位不能为空')
              return;
            } else if (this.addProductFrom.productSketchContent == '') {
              this.message('waring', '商品简述为空的话可能会引响到后期用户搜索到该商品的几率哦')
            }
          }
          this.active = 3
          this.isShowThreeFlag = false
          this.isShowFourFlag = true
        } else if (this.active == 3) {


          // 判断SKU和SPU是否为为空
          if (this.addProductFrom.productSkuInfo == null || this.addProductFrom.productSkuInfo.length <= 0) {
            this.message('error', '请填写商品的配置信息')
            return
          } else if (this.addProductFrom.productSpuInfo == null || this.addProductFrom.productSpuInfo.length <= 0) {
            this.message('error', '请填写商品的参数信息')
            return
          }
          this.addProductFrom.productSku = []
          this.addProductFrom.productSpu = []
          var spuFlag = false
          this.addProductFrom.productSkuInfo.productSkuValue = ''
          console.log(this.addProductFrom.productSkuInfo)
          this.addProductFrom.productSkuInfo.forEach((data, index) => {
            var skuValueVar = ''
            if (data.productSkuName == '') {
              this.message('error', '请将配置名称填写完成')
              spuFlag = true
              throw Error();
            } else if (data.dynamicTags.length <= 0) {
              this.message('error', '请添加配置的值')
              spuFlag = true
              throw Error();
            }
            data.dynamicTags.forEach(skuValue => {
              if (skuValueVar == '') {
                skuValueVar = skuValue
              } else {
                skuValueVar += ',' + skuValue
              }
            })
            this.addProductFrom.productSku.push({
              "productSkuName": data.productSkuName,
              "productSkuValue": skuValueVar
            })
            this.addProductFrom.productSkuInfo[index].productSkuValue = skuValueVar
          })

          if (spuFlag) {
            return
          }

          this.addProductFrom.productSpuInfo.productSpuValue = ''
          this.addProductFrom.productSpuInfo.forEach((data, index) => {
            var spuValueVar = ''
            if (data.productSpuName == '') {
              this.message('error', '请将参数名称填写完成')
              spuFlag = true
              return
            } else if (data.dynamicTags.length <= 0) {
              this.message('error', '请添加参数的值')
              spuFlag = true
              return
            }
            data.dynamicTags.forEach(spuValue => {
              if (spuValueVar == '') {
                spuValueVar = spuValue
              } else {
                spuValueVar += ',' + spuValue
              }
            })
            this.addProductFrom.productSpu.push({
              "productSpuName": data.productSpuName,
              "productSpuValue": spuValueVar
            })
            this.addProductFrom.productSpuInfo[index].productSpuValue = spuValueVar
          })

          if (spuFlag) {
            return
          }

          this.active = 4
          this.isAddOrNextFlag = false
        }
      }
    }
  }
</script>

<style>
  #addProductLoading .el-form-item__content {
    width: 70% !important;
  }

  #addProductLoading .el-form-item {
    width: 100% !important;
  }

  #addProductSpu .el-row {
    margin: 0px !important;
  }

  #addProductSku .el-row {
    margin: 0px !important;
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
