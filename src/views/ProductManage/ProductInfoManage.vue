<!--======商品信息管理模块=======-->
<template>
  <div id="productInfoDiv" v-loading="isProductSPULoading" style="margin:30px ;">

    <!-- ======================= 商品信息按钮集合 =========================  -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline productSearchForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 6}" :xs="{span: 24}" :sm="{span: 24}">
          <el-form-item label="商品状态" style="width: 100% !important;">
            <el-select v-model="formInline.productState" placeholder="选择" style="width: 100% !important;">
              <el-option label="全部" value="6" />
              <el-option label="上架中" value="5" />
              <el-option label="下架" value="1" />
              <el-option label="删除" value="2" />
              <el-option label="库存充足" value="3" />
              <el-option label="库存不足" value="4" />
              <el-option label="编辑中" value="77" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}" :sm="{span: 24}">
          <el-form-item label="搜索商品" style="width: 100%;">
            <el-input v-model="formInline.user" placeholder="商品的名称/类型"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}" :sm="{span: 24}">
          <el-button type="primary" class="searchButton" style="width: 100%; " @click.stop="showAddProduct">
            <svg-icon icon-class="tianjia" class-name="" style="width:14px !important; height:14px !important; margin-right:10px;" />
            添加商品
          </el-button>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}" :sm="{span: 24}">
          <el-button class="searchButton" type="primary" style="width:  100%; " @click="onSubmit">
            <svg-icon icon-class="tianjia" class-name="" style="width:14px !important; height:14px !important; margin-right:10px;" />
            批量导入商品SKU信息
          </el-button>
        </el-col>

      </el-row>
      <el-row :gutter="24">
        <el-col :lg="{span: 6}" :xs="{span: 24}" :sm="{span: 24}">
          <el-button class="searchButton" type="primary" icon="el-icon-search" style="width:  100%;" @click="onSubmit">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- ======================= 商品信息按钮集合(结束) =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>数量:900件</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 商品信息管理Talbe =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">

        <el-table v-loading="listLoading" class="title-menu-min" :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="编号" width="100" show-overflow-tooltip="true" />
          <el-table-column prop="name" label="商品名称" width="220" show-overflow-tooltip="true" />
          <el-table-column label="商品品牌" width="120" show-overflow-tooltip="true">
            小米
          </el-table-column>
          <el-table-column prop="city" label="商品类目" width="90">
            <el-button slot-scope="scope" type="text" size="small" @click="showProductLeimu(scope.row.date)">查看详情</el-button>
          </el-table-column>
          <el-table-column prop="address" label="商品总库存" width="300" />
          <el-table-column prop="address" label="SPU参数" width="100">
            <el-button slot-scope="scope" type="text" size="small" @click="shwoProductSpuInfo(scope.row.date)">查看详情</el-button>
          </el-table-column>
          <el-table-column prop="address" label="SKU参数" width="100">
            <el-button slot-scope="scope" type="text" size="small" @click="showProductSkuInfo(scope.row.date)">查看详情</el-button>
          </el-table-column>
          <el-table-column prop="address" label="商品状态" width="90">
            <el-link type="primary" :underline="false">上架</el-link>
          </el-table-column>
          <el-table-column prop="address" label="创建人" width="300" show-overflow-tooltip="true" />
          <el-table-column prop="address" label="操作人" width="300" show-overflow-tooltip="true" />
          <el-table-column prop="zip" label="所属店铺" width="120" show-overflow-tooltip="true">
            <el-button slot-scope="scope" type="text" size="small">{{ scope.row.date }}</el-button>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showProductInfo(scope.row.date)">查看</el-button>
              <el-button type="text" size="small" @click="editProduct(scope.row.date)">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- ======================= 商品信息管理Talbe(结束) =========================  -->

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

    <!-- ======================= 商品管理弹出层 =========================  -->

    <!-- ======================= 添加商品弹出层 =========================  -->
    <el-dialog
      v-loading="isProductLoading"
      top="7vh"
      width="60%"
      :append-to-body="true"
      custom-class="addProductDiv"
      :close-on-click-modal="false"
      :title="addProductTitle"
      :visible.sync="addProductFlag"
      class="title-menu-min"
    >
      <!-- ======================= 步骤一=========================  -->
      <div v-if="isShowOneFlag" id="stepone" class="stepList">

        <el-form ref="addProductTwoFrom" label-position="left" :inline="true" :model="addProductTwoFrom" label-width="80px">
          <el-row :gutter="24">

            <el-col :sm="{span: 12,offset: 6}" :xs="{span: 23}">

              <el-form-item label="商品类目" style="width:100%;">
                <el-cascader v-model="ProductMuluListIds" filterable style="width:100% !important;" :options="options" @change="handleChange" />
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
      <!-- ======================= 步骤一(结束)=========================  -->

      <!-- ======================= 步骤二=========================  -->
      <div v-if="isShowTwoFlag" id="steptwo">

        <el-form ref="addProductTwoFrom" :inline="true" label-position="left" :model="addProductTwoFrom" label-width="80px">

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 24}">
              <el-form-item label="商品名称" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" placeholder="请输入商品名称" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11}" :xs="{span: 24}">

              <el-form-item label="商品品牌" style="width:100%;">
                <el-select v-model="addProductTwoFrom.region" style="width:100% !important;" placeholder="请选择商品品牌">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 24}">
              <el-form-item label="市场价格" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" placeholder="请输入市场价格" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11}" :xs="{span: 24}">
              <el-form-item label="商城价格" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" placeholder="请输入商城价格" />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <!-- ======================= 步骤二(结束)=========================  -->

      <!-- ======================= 步骤三=========================  -->
      <div v-if="isShowThreeFlag" id="stepthree">
        <el-form ref="addProductThreeFrom" :inline="true" label-position="left" :model="addProductTwoFrom" label-width="80px">
          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品卖点" style="width:100%;" class="addProductItem">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商品卖点" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="排序" style="width:100%;" class="addProductItem">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商品排序" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品单位" style="width:100%;" class="addProductItem">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商品单位" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="商品简述" style="width:100%;">
                <el-input v-model="addProductTwoFrom.desc" type="textarea" class="addProductFormInput" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
             <el-form-item label="是否支持" style="width:100%;" class="addProductItem">
               <el-radio v-model="radio" label="1">支持无理由退货</el-radio>
               <el-radio v-model="radio" label="2">不支持无理由退货</el-radio>
                <el-input v-model="addProductTwoFrom.desc" placeholder="设置无理由退款天数(默认7天)"  class="addProductFormInput" />
             </el-form-item>
           </el-col>
          </el-row>

        </el-form>
      </div>
      <!-- ======================= 步骤三(结束)=========================  -->

      <!-- ======================= 步骤四========================  -->
      <div v-if="isShowFourFlag" id="stepfour">
        <el-form ref="addProductTwoFrom" :inline="true" label-position="left" :model="addProductTwoFrom" label-width="80px">
          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item label="SPU" style="width:100%;" class="addProductItem">
                <el-button type="primary" style="width:270px;" @click="addProductSPU">添加商品的SPU</el-button>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="SKU" style="width:100%;" class="addProductItem">
                <el-button type="primary" style="width:270px;" @click="addProductSKU">添加商品的SKU</el-button>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="24">
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
          </el-row>

        </el-form>

      </div>
      <!-- ======================= 步骤四(结束)=========================  -->

      <!-- ======================= 添加SPU ========================  -->
      <div v-if="addProductSpuFlag" id="addProductSpu" class="title-menu-min" style="max-height: 400px; margin-left: 20px;">
        <el-form ref="addProductTwoFrom" label-position="left" :inline="true" :model="addProductTwoFrom" label-width="80px">
          <el-row v-for="(o,index) in addProductSpuForm.domains" :key="o.key" class="spusRowClass" :gutter="24">

            <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">
              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuKey" class="SpuInput" placeholder="请输入Key" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuValue" class="SpuInput" placeholder="请输入值" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuOrder" class="SpuInput2" placeholder="排序" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSpuLink(o)" />
              </el-col>
            </el-card>
          </el-row>
        </el-form>
      </div>
      <!-- ======================= SPU窗口按钮组 ========================  -->
      <div v-if="addProductSpuFlag" style="margin-left: 20px;">
        <el-row class="spusRowClass" :gutter="24">

          <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">

            <el-collapse accordion>
              <el-collapse-item title="操作菜单" name="1">
                <el-col :sm="{span: 4}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" @click="addProductSpuLine">新增一行</el-button>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" class="addAndClose" @click="closeSpuWindows">保存SPU配置并关闭窗口</el-button>
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

      <!-- ======================= 添加SKU ========================  -->
      <div v-if="addProductSkuFlag" id="addProductSku" class="title-menu-min" style="max-height: 400px; margin-left: 20px;">
        <el-form ref="addProductTwoFrom" label-position="left" :inline="true" :model="addProductTwoFrom" label-width="80px">
          <el-row v-for="(o,index) in addProductSkuForm.domains" :key="o.key" class="spusRowClass" :gutter="24">

            <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">
              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuKey" class="SpuInput" placeholder="SKU名称" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuValue" class="SpuInput" placeholder="SKU值" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuOrder" class="SpuInput2" placeholder="排序" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSkuLink(o)" />
              </el-col>
            </el-card>
          </el-row>
        </el-form>
      </div>
      <div v-if="addProductSkuFlag" style="margin-left: 20px;">
        <el-row class="spusRowClass" :gutter="24">

          <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">

            <el-collapse accordion>
              <el-collapse-item title="操作菜单" name="1">
                <el-col :sm="{span: 4}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" @click="addProductSkuLine">新增一行</el-button>
                </el-col>

                <el-col :sm="{span: 7}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" class="addAndClose" @click="closeSkuWindows">保存SKU配置并关闭窗口</el-button>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span: 23}">
                  <el-button type="primary" style="width: 100%;" class="addAndClose" @click="createProductSku">生成商品的SKU库存与价格</el-button>
                </el-col>

                <el-col :sm="{span: 5}" :xs="{span: 23}">
                  <el-button style="width: 100%;" @click="closeSkuWindows">关闭窗口</el-button>
                </el-col>
              </el-collapse-item>

            </el-collapse>
          </el-card>
        </el-row>
      </div>
      <!-- ======================= 添加SKU(结束) ========================  -->

      <!-- ======================= 添加商品图片 ========================  -->
      <div v-if="uploadProductPLists">

        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://192.168.0.127/ucc/vue/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          name="fileImage"
          :multiple="true"
          limit="6"
          accept="image/*"
          :on-success="uploadProductImageSuccess"
          :on-exceed="exceedFun"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture"
        >
          <el-button slot="trigger" size="small" type="primary">选取需要上传的文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <el-button style="margin-left: 10px;" size="small" @click="closeProductImages">关闭窗口</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <div slot="tip" class="el-upload__tip">图片默认显示顺序也是根据上传的顺序规定</div>
        </el-upload>
      </div>
      <!-- ======================= 添加商品图片(结束) ========================  -->

      <!-- ======================= 添加商品详情 ========================  -->
      <div v-if="uploadProductInfoFlag" class="title-menu-min" style="max-height: 400px;">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          name="pLists2"
          :multiple="true"
          limit="30"
          accept="image/*"
          :on-exceed="exceedFun"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture"
        >
          <el-button slot="trigger" size="small" type="primary">选取需要上传的文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <el-button style="margin-left: 10px;" size="small" @click="closeProductInfo">关闭窗口</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <div slot="tip" class="el-upload__tip">图片默认显示顺序也是根据上传的顺序规定</div>
        </el-upload>
      </div>
      <!--=======================添加商品详情（结束）========================-->

      <!-- ======================= 添加商品进度=========================  -->
      <el-steps :active="active" finish-status="success" align-center style="margin-top:30px;">
        <el-step title="步骤1" description="选择商品类目" show-overflow-tooltip="true" />
        <el-step title="步骤2" description="添加宝贝基本信息" show-overflow-tooltip="true" />
        <el-step title="步骤3" description="添加宝贝详细信息" />
        <el-step title="步骤4" :description="stepFourContent" />
      </el-steps>

      <el-row class="spusRowClass" :gutter="24">

        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button
            v-if="isAddOrNextFlag"
            type="primary"
            :disabled="isStepBtn"
            style="margin-top: 12px; width: 100% !important;  padding-left: 0px !important; padding-right: 0px !important;"
            @click="next"
          >我已阅读无误,下一步</el-button>
          <el-button
            v-if="!isAddOrNextFlag"
            type="primary"
            :disabled="isStepBtn"
            style="margin-top: 12px;  width: 100% !important;   padding-left: 0px !important; padding-right: 0px !important;"
            @click="next"
          >我已阅读无误,确认添加</el-button>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button
            type="primary"
            style="margin-top: 12px;  width: 100% !important;  padding-left: 0px !important; padding-right: 0px !important;"
            :disabled="isStepBtn"
            @click="last"
          >上一步</el-button>
        </el-col>

        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button
            style="margin-top: 12px;  width: 100% !important; padding-left: 0px !important; padding-right: 0px !important;"
            :disabled="isStepBtn"
            @click="closeAddProduct"
          >关闭窗口</el-button>
        </el-col>
      </el-row>

    </el-dialog>
    <!-- ======================= 添加商品弹出层End =========================  -->

    <!-- ======================= 查看商品类目 =========================  -->

    <el-dialog
      title="商品类目信息"
      width="400px"
      :close-on-click-modal="false"
      :visible.sync="productLeiMuInfoFlag"
      class="addProduct"
      @close="spuWindow"
    >
      <div>
        <el-form ref="productLeiMuInfoFlag" label-position="left" :inline="true" :model="addProductTwoFrom" label-width="80px">
          <el-row :gutter="24">

            <el-col :sm="{span: 23}" :xs="{span: 23}" class="productLeiMuInfoClass">

              <el-form-item label="商品类目" style="width:100%;">
                <el-input v-model="productLeiMuValue" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-button style="margin-top: 12px;" @click="productLeiMuInfoFlag = false">关闭窗口</el-button>
    </el-dialog>
    <!-- ======================= 查看商品类目(结束) =========================  -->

    <!-- ======================= 查看商品SPU =========================  -->
    <el-dialog
      v-loading="isProductInfoLoading"
      title="商品SPU信息"
      top="7vh"
      :close-on-click-modal="false"
      :modal-append-to-body="true"
      :visible.sync="productSpuFlag"
      custom-class="addProductDiv"
    >
      <div v-if="productSpuFlag2">
        <div class="title-menu-min spuDialogClass" style="max-height: 400px;">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55" />
            <el-table-column label="SPU名称" width="160" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column label="SPU值" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column label="排序" width="55" show-overflow-tooltip>
              <template slot-scope="scope">123</template>
            </el-table-column>
            <el-table-column label="状态" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tag>使用中</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
              <el-button type="text" size="small" @click="addProductInfoSpu2">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
        <el-row :gutter="24">
          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="margin-top: 12px;width: 100%;" type="primary" @click="addProductInfoSpu">新增SPU</el-button>
          </el-col>
          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="margin-top: 12px;width: 100%;" type="primary">批量注销SPU</el-button>
          </el-col>
          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="margin-top: 12px;width: 100%;" @click="productSpuFlag = false">关闭窗口</el-button>
          </el-col>
        </el-row>

      </div>

      <!-- ======================= 添加SPU ========================  -->
      <div v-if="addProductSpuFlag2" id="addProductSpu" class="title-menu-min" style="max-height: 400px; margin-left: 15px;">
        <el-form ref="addProductTwoFrom" label-position="left" :inline="true" :model="addProductTwoFrom" label-width="80px">
          <el-row v-for="(o,index) in addProductSpuForm.domains" :key="o.key" class="spusRowClass" :gutter="24">

            <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">
              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuKey" class="SpuInput" placeholder="请输入Key" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuValue" class="SpuInput" placeholder="请输入值" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuOrder" class="SpuInput2" placeholder="排序" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSpuLink(o)" />
              </el-col>
            </el-card>
          </el-row>
        </el-form>
      </div>
      <!-- ======================= SPU窗口按钮组 ========================  -->
      <div v-if="addProductSpuFlag2" style="margin-left: 10px;">
        <el-row class="spusRowClass" :gutter="24">

          <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">

            <el-collapse accordion>
              <el-collapse-item title="操作菜单" name="1">
                <el-col :sm="{span: 8}" :xs="{span: 23}">
                  <el-button style="width: 100%;" type="primary" @click="addProductSpuLine">新增一行</el-button>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span: 23}">
                  <el-button style="width: 100%;" type="primary" class="addAndClose">保存新的SPU</el-button>
                </el-col>

                <el-col :sm="{span: 8}" :xs="{span:23}">
                  <el-button style="width: 100%;" type="primary" @click="closeSpuWindows2">保存SPU配置并关闭窗口</el-button>
                </el-col>
              </el-collapse-item>

            </el-collapse>
          </el-card>
        </el-row>
      </div>
      <!-- ======================= SPU窗口按钮组(结束) ========================  -->

      <!-- ======================= 修改SPU ========================  -->
      <div v-if="addProductSpuFlag3" id="addProductSpu" class="title-menu-min" style="max-height: 400px; margin-left: 15px;">
        <el-form ref="addProductTwoFrom" label-position="left" :inline="true" :model="addProductTwoFrom" label-width="80px">
          <el-row v-for="(o,index) in addProductSpuForm.domains" :key="o.key" class="spusRowClass" :gutter="24">

            <el-card shadow="always" class="SpusClass" style="margin-bottom: 5px;width:95%;">
              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuKey" class="SpuInput" placeholder="请输入Key" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 8}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuValue" class="SpuInput" placeholder="请输入值" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-form-item>
                  <el-input v-model="o.spuOrder" class="SpuInput2" placeholder="排序" />
                </el-form-item>
              </el-col>

              <el-col :sm="{span: 4}" :xs="{span: 12}">
                <el-button type="danger" icon="el-icon-delete" circle @click.pprevent="removeProducSpuLink(o)" />
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
                  <el-button type="primary" style="width: 100%;">保存当前配置</el-button>
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
    </el-dialog>
    <!-- ======================= 查看商品SPU(结束) =========================  -->

    <!-- ======================= 查看商品详细信息 =========================  -->

    <el-dialog
      v-loading="isProductSPULoading"
      title="商品信息"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :lock-scroll="true"
      :visible.sync="productInfoFlag"
      width="70%"
      custom-class="addProductDiv"
      :top="productTopHtml"
    >

      <!-- ======================= 查看商品信息 =========================  -->
      <div v-if="productInfoFlag2" class="productInfo" style="max-height:500px;">
        <el-row class="spusRowClass" :gutter="24">
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

            <el-row class="spusRowClass" :gutter="24">
              <el-col :sm="{span: 24}" :xs="{span:24}">
                <el-tabs v-model="productActiveName">
                  <el-tab-pane label="商品基础信息" name="first" style="max-height:500px;" class="title-menu-min el-tab-paneClass">
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

                  </el-tab-pane>
                  <el-tab-pane label="商品评论列表" name="second"  class="title-menu-min el-tab-paneClass">
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

                    <span v-for="o in 10" style="cursor: pointer;" @click="showCommentInfo(o)">
                      <el-row :gutter="24">
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
                      </el-row>
                    </span>

                  </el-tab-pane>
                  <el-tab-pane label="商品SPU列表" name="third" class="title-menu-min el-tab-paneClass">
                    <el-col v-for="o in 10" :span="8" :xs="{span:24}">
                      <el-card shadow="hover" style="margin-bottom:10px;">
                        <el-divider content-position="left">品牌 {{ o }}</el-divider>
                        DW手表
                      </el-card>
                    </el-col>
                  </el-tab-pane>
                  <el-tab-pane label="商品SKU列表" name="fourth" class="title-menu-min el-tab-paneClass" style="max-height: 220px;">
                    <el-table :data="tableData" border style="width: 100%">
                      <el-table-column prop="date" label="SKU名称" min-width="150" />
                      <el-table-column prop="province" label="排序" width="120" />
                      <el-table-column prop="name" label="SKU值" fixed="right" width="120" />
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </div>
      <!-- ======================= 查看商品信息(结束) =========================  -->

      <!-- ======================= 评论详细信息 =========================  -->
      <el-dialog
        width="50%"
        custom-class="addProductDiv"
        :top="productTopHtml"
        title="商品评价信息"
        :visible.sync="productInfoFlag3"
        append-to-body
      >

        <div class="productInfo title-menu-min" style="max-height:500px;">
          <el-row class="spusRowClass" :gutter="24">
            <el-col :sm="{span: 4}" :xs="{span:24}">
              <div class="block">
                <el-avatar shape="square" :size="77" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />
              </div>
            </el-col>
            <el-col :sm="{span: 19}" :xs="{span:24}">
              <el-card class="box-card" style="width:100%;">
                <div class="text item">
                  <el-divider content-position="left">评价人</el-divider>
                  <el-link type="primary">鹿七七七</el-link>
                  <el-divider content-position="left">商品参数</el-divider>
                  红色,16GB,中国大陆
                  <el-divider content-position="left">评价内容</el-divider>
                  <span style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;">
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  </span>
                  <el-divider content-position="left">评价时间</el-divider>
                  2019-07-03 11:53
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-col :sm="{span: 8,offset: 5}" style="margin-top:20px; margin-bottom: 20px;" :xs="{span: 23}">
            <el-button style="width: 100%;" @click="productInfoFlag3 = false">关闭窗口</el-button>
          </el-col>
        </div>
      </el-dialog>

      <!-- ======================= 评论详细信息(结束) =========================  -->
    </el-dialog>
    <!-- ======================= 查看商品详细信息(结束) =========================  -->

    <!-- ======================= 商品SKU信息管理 =========================  -->
    <el-dialog
      v-loading="isProductSKULoading"
      width="77%"
      :top="productTopHtml"
      custom-class="addProductDiv"
      title="商品SKU信息"
      :visible.sync="productInfoSkuInfos"
      append-to-body
    >

      <div style="max-height: 550px;" class="title-menu-min">
        <el-table :data="SKUInfoForm" border style="width: 100%">
          <el-table-column fixed show-overflow-tooltip="true" prop="SKUValue" label="商品SKU值" min-width="200" />
          <el-table-column label="库存数量" width="120">
            <el-input v-model="scope.row.SKUKuCun" slot-scope="scope" :value="scope.row.SKUKuCun" />
          </el-table-column>
          <el-table-column prop="province" label="价格" width="120">
            <el-input v-model="scope.row.SKUPrice" slot-scope="scope" :value="scope.row.SKUPrice" />
          </el-table-column>
        </el-table>
        <el-col :sm="{span: 8}" style="margin-top:20px;" :xs="{span: 23}">
          <el-button type="primary" style="width: 100%;" @click="productInfoFlag3 = false">保存配置</el-button>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 23}" style="margin-top:20px;">
          <el-button style="width: 100%; " @click="productInfoSkuInfos = false">关闭窗口</el-button>
        </el-col>
      </div>
    </el-dialog>
    <!-- ======================= 商品SKU信息管理(结束) =========================  -->

    <!-- ======================= 修改商品信息 =========================  -->

    <el-dialog
      v-loading="editProductFlag"
      width="77%"
      :top="productTopHtml"
      custom-class="productSkuInfoDialog title-menu-min"
      title="編輯商品"
      :visible.sync="editProductInfoFlag"
      append-to-body
    >

      <div style="max-height: 550px;">
        <el-form ref="editProduct" :model="editProduct" label-width="80px">

          <el-row :gutter="24">

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item class="addProductItem" label="商品名称" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商品名称" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="商品品牌" class="addProductItem" style="width:100%;">
                <el-select v-model="addProductTwoFrom.region" style="width:100%;" class="addProductFormInput" placeholder="请选择商品品牌">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item class="addProductItem" label="市场价格" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入市场价格" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="商城价格" class="addProductItem">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商城价格" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item class="addProductItem" label="市场价格" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入市场价格" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="商城价格" class="addProductItem">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商城价格" />
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item class="addProductItem" label="商品卖点" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商品卖点" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="排序" class="addProductItem">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入排序" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item class="addProductItem" label="商品单位" style="width:100%;">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商品单位" />
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="商品简述" class="addProductItem">
                <el-input v-model="addProductTwoFrom.name" class="addProductFormInput" placeholder="请输入商品简述" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">
              <el-form-item class="addProductItem" label="商品图片" style="width:100%;">
                <el-button type="primary" style="width:270px;" @click="editProductImage = true">修改商品图片</el-button>
              </el-form-item>
            </el-col>

            <el-col :sm="{span: 11,offset: 1}" :xs="{span: 23}">

              <el-form-item label="商品详情" class="addProductItem">
                <el-button type="primary" style="width:270px;" @click="addProductInfos">修改商品详情</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="spusRowClass" :gutter="24">

            <el-col :sm="{span: 6,offset: 1}" :xs="{span: 24}">
              <el-button type="primary" style="margin-top: 12px;  width: 100% !important;  ">保存编辑</el-button>
            </el-col>

            <el-col :sm="{span: 6}" :xs="{span: 24}">
              <el-button style="margin-top: 12px;  width: 100% !important; margin-bottom: 10px !important;" @click="editProductInfoFlag = false">关闭窗口</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- ======================= 修改商品图片 =========================  -->
      <el-dialog
        width="77%"
        :top="productTopHtml"
        custom-class="productSkuInfoDialog title-menu-min"
        title="修改商品图片"
        :visible.sync="editProductImage"
        append-to-body
      >

        <el-divider content-position="left">当前使用的商品图片</el-divider>
        <el-table :data="productImages" style="width: 100%" max-height="250">
          <el-table-column label="商品图片" width="150">

            <el-image slot-scope="scope" style="width: 100px; height: 100px" :src="scope.row.imageUrl" fit="scale-down" />
          </el-table-column>
          <el-table-column label="图片地址" show-overflow-tooltip="true">
            <el-link slot-scope="scope" type="primary">{{ scope.row.imageUrl }}</el-link>
          </el-table-column>
          <el-table-column prop="imageOrder" label="显示顺序" width="120">

            <el-input v-model="scope.row.imageOrder" slot-scope="scope" maxlength="1" />
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider content-position="left">上传新的商品图片</el-divider>

        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://192.168.0.127/ucc/vue/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          name="fileImage"
          :multiple="true"
          limit="6"
          accept="image/*"
          :on-success="uploadProductImageSuccess"
          :on-exceed="exceedFun"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture"
        >
          <el-button slot="trigger" size="small" type="primary">选取需要上传的文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且图片数量最多为6张,最少为一张</div>
          <div slot="tip" class="el-upload__tip">图片默认显示顺序也是根据上传的顺序规定</div>
        </el-upload>

        <el-col :sm="{span: 8}" style="margin-top:20px; margin-bottom: 20px;" :xs="{span: 23}">
          <el-button style="width: 100%;" type="primary">确认保存</el-button>
        </el-col>

        <el-col :sm="{span: 8 ,offset: 1}" style="margin-top:20px; margin-bottom: 20px;" :xs="{span: 23}">
          <el-button style="width: 100%;" @click="editProductImage = false">关闭窗口</el-button>
        </el-col>
      </el-dialog>
      <!-- ======================= 修改商品图片(结束) =========================  -->

    </el-dialog>
    <!-- ======================= 修改商品信息(结束) =========================  -->

    <!-- ======================= 商品管理弹出层End =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '',
      // 商品图片列表
      productImages: [{
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      },
      {
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      },
      {
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      },
      {
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      },
      {
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      },
      {
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      },
      {
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      },
      {
        imageId: '1',
        imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imageOrder: '1'
      }
      ],
      // 修改商品图片窗口的flag
      editProductImage: false,
      // 修改商品窗口的flag
      editProductInfoFlag: false,
      // 商品SKU信息的加载层
      isProductSKULoading: false,
      // 商品SKU库存与价格模拟数据
      SKUInfoForm: [{
        SKUValue: '红色,16GB,中国大陆红色,16GB,中国大陆红色,16GB,中国大陆',
        SKUKuCun: 10,
        SKUPrice: '3000.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      },
      {
        SKUValue: '红色2,16GB,中国大陆',
        SKUKuCun: 102,
        SKUPrice: '30020.00'
      }
      ],
      // 商品SKU信息操作flag
      productInfoSkuInfos: false,
      // 商品详细信息距离网页头顶的距离
      productTopHtml: '10vh',
      // 商品评论信息flag
      productInfoFlag3: false,
      // 商品信息flag
      productInfoFlag2: true,
      // 商品信息的默认选中
      productActiveName: 'first',
      // 商品详细信息窗口加载层
      isProductInfoLoading: false,
      // 商品详细信息窗口Flag
      productInfoFlag: false,
      // 修改SPU窗口
      addProductSpuFlag3: false,
      // 商品SPU信息的新增SPU窗口
      addProductSpuFlag2: false,
      // loading是否全屏显示
      isLoadingFull: false,
      // 浏览器大小
      screenWidth: '',
      screenHeight: '',
      // 查询商品SPU信息
      productSpuFlag: false,
      // 商品类目值
      productLeiMuValue: '衣服/牛仔裤',
      // 是否显示商品类目页面Flag
      productLeiMuInfoFlag: false,
      // 是否显示商品详情页面Flag
      uploadProductInfoFlag: false,
      // 添加商品图片显示的集合
      fileList: [],
      // 是否打开上传商品图片flag
      uploadProductPLists: false,
      // 是否开启进步条禁用按钮
      isStepBtn: false,
      // Sku键值对表单
      addProductSkuForm: {
        domains: [{
          spuKey: '',
          spuValue: '',
          spuOrder: '',
          isSystemDef: true
        }]
      },
      // 添加商品的SkuFlag
      addProductSkuFlag: false,
      // 是否开启"加载"
      isProductLoading: false,
      // SPU的表单
      addProductSpuForm: {
        domains: [{
          spuKey: '',
          spuValue: '',
          spuOrder: '',
          isSystemDef: true
        }]
      },
      // 第四步的内容
      stepFourContent: '填写宝贝重要信息',
      // 添加商品SPUFlag
      addProductSpuFlag: false,
      // 商品类目选中数据
      ProductMuluListIds: [],
      // 商品类目实体数据
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }, {
          value: 'daohang',
          label: '导航'
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic'
        }, {
          value: 'form',
          label: 'Form'
        }, {
          value: 'data',
          label: 'Data'
        }, {
          value: 'notice',
          label: 'Notice'
        }, {
          value: 'navigation',
          label: 'Navigation'
        }, {
          value: 'others',
          label: 'Others'
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      // 第二步用到的表单
      addProductTwoFrom: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 商品监听对象的集合
      ProductEventLists: [{
        // 商品类目窗口的监听对象
        ProductLeiMuEvent: ''
      }],
      // 是否显示第四步flag
      isShowFourFlag: false,
      // 是否显示第三步flag
      isShowThreeFlag: false,
      // 是否显示第二步flag
      isShowTwoFlag: false,
      // 是否显示第一步flag
      isShowOneFlag: true,
      // 商品二级类目的id
      productTwoTypeId: '',
      // 商品一级类目的id
      productOneTypeId: '',
      // 添加商品时,显示添加还是下一步的flag
      // true显示下一步 false显示添加
      isAddOrNextFlag: true,
      // 添加商品步骤数
      active: 0,
      value1: '',
      value2: '',
      listLoading: true,
      formInline: {
        user: '',
        region: '',
        productState: ''
      },
      total: 100,
      currentPage: 2,
      dialogFormVisible: false,
      // 是否显示添加商品的窗口
      addProductFlag: false,
      // 添加商品的标题
      addProductTitle: '添加商品',
      tableData: [{
        date: '2016-05-021',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-021',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-021',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-021',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-021',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-042',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-013',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-034',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  created() {
    this.listLoading = false
    this.COMMON.startLoading()
    this.COMMON.stopLoading()
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
    if (this.screenWidth <= 500) {
      this.isLoadingFull = true
      this.productTopHtml = '1vh'
    } else {
      this.isLoadingFull = false
    }
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        // 判断宽度是否小于500 小于500 全部全屏显示
        if (this.screenWidth <= 500) {
          this.isLoadingFull = true
          this.productTopHtml = '1vh'
        } else {
          this.isLoadingFull = false
          this.productTopHtml = '10vh'
        }
      })()
    }
  },
  methods: {
    // 打开商品编辑窗口
    editProduct() {
      this.COMMON.startLoading()
      this.editProductInfoFlag = true
      // 查询商品信息
      this.COMMON.stopLoading()
    },
    // 显示商品SKU信息
    showProductSkuInfo() {
      this.COMMON.startLoading()
      // 发送请求 传递数据
      this.productInfoSkuInfos = true
      this.COMMON.stopLoading()
    },
    // 查看评论具体信息，
    showCommentInfo(id) {
      this.isProductInfoLoading = true
      this.$message({
        type: 'info',
        message: '评论详细信息:id=' + id
      })
      this.productInfoFlag3 = true
      this.isProductInfoLoading = false
    },
    // 显示商品详细信息
    showProductInfo(id) {
      console.log(id)
      this.COMMON.startLoading()
      this.productInfoFlag = true
      this.COMMON.stopLoading()
    },
    // 显示修改SPU窗口
    addProductInfoSpu2() {
      this.isProductLoading = true
      this.addProductSpuFlag3 = true
      this.productSpuFlag2 = false
      this.isProductLoading = false
    },
    // 关闭修改SPU的窗口
    closeSpuWindows3() {
      this.isProductLoading = true
      this.addProductSpuFlag3 = false
      this.productSpuFlag2 = true
      this.isProductLoading = false
    },
    // 关闭商品信息SPU的 新增窗口
    closeSpuWindows2() {
      this.isProductLoading = true
      this.addProductSpuFlag2 = false
      this.productSpuFlag2 = true
      this.isProductLoading = false
    },
    // 显示商品SPU信息的SPU添加窗口
    addProductInfoSpu() {
      this.isProductLoading = true
      this.addProductSpuFlag2 = true
      this.productSpuFlag2 = false
      this.isProductLoading = false
    },
    // 显示SPU窗口
    shwoProductSpuInfo() {
      this.COMMON.startLoading()
      this.productSpuFlag = true
      this.productSpuFlag2 = true
      this.COMMON.stopLoading()
    },
    // 关闭添加商品弹出层
    closeAddProduct() {
      this.htmlMove()
      this.addProductFlag = false
    },
    // 打开添加商品弹出层
    showAddProduct() {
      this.COMMON.startLoading()
      this.addProductFlag = true
      this.COMMON.stopLoading()
    },
    /** *滑动限制***/
    htmlStop() {
      var mo = function(e) {
        e.preventDefault()
      }
      document.getElementById('productInfoDiv').style.overflow = 'hidden'
      document.getElementById('productInfoDiv').addEventListener('touchmove', mo, false) // 禁止页面滑动

      this.ProductEventLists.ProductLeiMuEvent = mo
    },
    /** *取消滑动限制***/
    htmlMove() {
      document.getElementById('productInfoDiv').style.overflow = ''
      document.getElementById('productInfoDiv').removeEventListener('touchmove', this.ProductEventLists.ProductLeiMuEvent,
        false)
    },
    spuWindow() {
      this.htmlMove()
    },
    onSubmit() {
      console.log('submit!')
    },
    showMess(currIndex, obj2) {
      alert(obj2[currIndex].users)
    },
    // 查询商品类目
    showProductLeimu(id) {
      this.COMMON.startLoading()
      // id为该商品的id
      this.productLeiMuInfoFlag = true
      this.COMMON.stopLoading()
    },
    // 关闭上传商品详情页面
    closeProductInfo() {
      this.isProductLoading = true
      // 打开步骤四 关闭图片窗口
      this.isShowFourFlag = true
      this.uploadProductInfoFlag = false
      // 改变内容
      this.stepFourContent = '填写宝贝重要信息'
      // 打开上一步下一步
      this.isStepBtn = false
      this.isProductLoading = false
    },
    // 显示上传商品详情页面
    addProductInfos() {
      // 打开加载
      this.isProductLoading = true

      // 关闭步骤四 打开上传图片详情
      this.isShowFourFlag = false
      this.uploadProductInfoFlag = true
      // 改变内容
      this.stepFourContent = '上传图片的详情'
      // 关闭上一步下一步
      this.isStepBtn = true
      this.isProductLoading = false
    },
    // 关闭商品图片
    closeProductImages() {
      this.isProductLoading = true
      // 打开步骤四 关闭图片窗口
      this.isShowFourFlag = true
      this.uploadProductPLists = false
      // 改变内容
      this.stepFourContent = '填写宝贝重要信息'
      // 打开上一步下一步
      this.isStepBtn = false
      this.isProductLoading = false
    },
    // 添加商品图片
    addProductImages() {
      this.isProductLoading = true
      // 关闭步骤四 打开图片窗口
      this.isShowFourFlag = false
      this.uploadProductPLists = true
      // 改变内容
      this.stepFourContent = '上传商品的图片'
      // 关闭上一步下一步
      this.isStepBtn = true
      this.isProductLoading = false
    },
    // 上传商品图片的钩子函数
    submitUpload() {
      this.$refs.upload.submit()
    },
    exceedFun() {
      this.$message.error('最多只能上传6个文件')
    },
    // 文件上传成功
    uploadProductImageSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 生成商品SKU的价格和库存
    createProductSku() {
      // 需要将商品的信息保存 并整理出SKU对应的列表
      this.$confirm('此操作将保存你之前填写好的商品信息, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '继续',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
    },
    // 关闭SKUchuangk
    closeSkuWindows() {
      this.isProductLoading = true
      this.addProductSkuFlag = false
      this.isShowFourFlag = true
      this.isStepBtn = false
      this.stepFourContent = '填写宝贝重要信息'
      this.isProductLoading = false
    },
    // 打开SKU窗口
    addProductSKU() {
      this.isProductLoading = true
      this.isStepBtn = true
      // 改变步骤内容
      this.stepFourContent = '填写宝贝的SKU信息'
      // 打开和关闭对应窗口
      this.isShowFourFlag = false
      this.addProductSkuFlag = true
      this.isProductLoading = false
    },
    // 打开SPU窗口
    addProductSPU() {
      this.isProductLoading = true
      // 改变步骤内容
      this.isStepBtn = true
      this.stepFourContent = '填写宝贝的SPU信息'
      // 打开和关闭对应窗口
      this.isShowFourFlag = false
      this.addProductSpuFlag = true
      this.isProductLoading = false
    },
    // 关闭Spu窗口
    closeSpuWindows() {
      this.isProductLoading = true
      // 显示第四步
      this.isShowFourFlag = true
      this.isStepBtn = false
      // 关闭SPU窗口
      this.addProductSpuFlag = false
      this.stepFourContent = '填写宝贝重要信息'
      this.isProductLoading = false
    },
    // 删除一行SPU
    removeProducSpuLink(item) {
      this.isProductLoading = true
      var index = this.addProductSpuForm.domains.indexOf(item)
      if (item.isSystemDef) {
        this.$message({
          message: '不能删除系统定义好的哦',
          type: 'warning'
        })
        this.isProductLoading = false
        return
      }
      if (index !== -1) {
        this.addProductSpuForm.domains.splice(index, 1)
      }
      this.isProductLoading = false
    },
    // 删除一行SKU
    removeProducSkuLink(item) {
      this.isProductLoading = true
      var index = this.addProductSkuForm.domains.indexOf(item)
      if (item.isSystemDef) {
        this.$message({
          message: '不能删除系统定义好的哦',
          type: 'warning'
        })
        this.isProductLoading = false
        return
      }
      if (index !== -1) {
        this.addProductSkuForm.domains.splice(index, 1)
      }
      this.isProductLoading = false
    },
    // 新增一行SKU
    addProductSkuLine() {
      this.isProductLoading = true
      this.addProductSkuForm.domains.push({
        spuKey: '',
        spuValue: '',
        spuOrder: '',
        key: Date.now(),
        isSystemDef: false
      })
      this.$message({
        showClose: true,
        message: '新增成功,请拖动屏幕到底部'
      })
      this.isProductLoading = false
    },
    // 新增一行SPU
    addProductSpuLine() {
      this.isProductLoading = true
      this.addProductSpuForm.domains.push({
        spuKey: '',
        spuValue: '',
        spuOrder: '',
        key: Date.now(),
        isSystemDef: false
      })
      this.$message({
        showClose: true,
        message: '新增成功,请拖动屏幕到底部'
      })
      this.isProductLoading = false
    },
    // 添加商品的上一步操作
    last() {
      this.isProductLoading = true
      if (this.active <= 0) {
        this.$message.error('已经是第一步了')
        this.isProductLoading = false
        return
      } else if (this.active == 1) {
        // 当前为第二步,返回第一步
        this.isShowOneFlag = true
        this.isShowTwoFlag = false
        // 给出提示
        this.$message({
          message: '如果对`商品类目`进行修改后,SPU和SKU就会变成初始化的值哦',
          type: 'warning'
        })
      } else if (this.active == 2) {
        // 当前为第三步,返回第二步
        this.isShowTwoFlag = true
        this.isShowThreeFlag = false
      } else if (this.active == 3) {
        // 当前为第四步，返回第三不
        this.isShowThreeFlag = true
        this.isShowFourFlag = false
      }
      // 当前步骤数量-1
      this.active = this.active - 1
      this.isAddOrNextFlag = true
      this.isProductLoading = false
    },
    // 添加商品的下一步操作
    next() {
      this.isProductLoading = true
      // 判断是否为第一步
      if (this.active == 0) {
        // 需要判断是否勾选一二级类目
        if (this.ProductMuluListIds.length != 2) {
          this.$message.error('请选择该商品的类目(准确到二级类目去)')
          this.isProductLoading = false
          return
        }
        this.isShowOneFlag = false
        this.isShowTwoFlag = true
      } else if (this.active == 1) {
        // 第二步
        // 需要判断表单的值是否正确
        this.$message({
          message: '记住将表单填写完整',
          type: 'warning'
        })
        // 将第二步骤隐藏
        this.isShowTwoFlag = false
        // 打开第三步骤
        this.isShowThreeFlag = true
      } else if (this.active == 2) {
        // 第三步
        // 需要判断表单的值是否正确
        this.$message({
          message: '记住将表单填写完整',
          type: 'warning'
        })

        // 将第三步骤隐藏
        this.isShowThreeFlag = false
        // 打开第四步骤
        this.isShowFourFlag = true
      }
      if (this.active++ >= 3) {
        this.isAddOrNextFlag = false
        this.$message({
          message: '提交前请记住做校验哦',
          type: 'warning'
        })
      }
      this.isProductLoading = false
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style>
  .el-tab-paneClass {
    max-height: 407px !important;
  }
  .spusRowClass {
    margin-left: 20px !important;
  }

  .addProductDiv .el-form-item__content {
    width: 70% !important;
  }

  @media only screen and (min-width: 500px) and (max-width: 1250px) {
    .productSearchForm .el-form-item .el-form-item__content {
      width: 88% !important;
    }

    .searchButton {
      width: 100% !important;
      margin-left: 0rem !important;
      margin-bottom: 0.625rem !important;
    }
  }

  /*  768  ~~~~ 1366 */
  @media only screen and (min-width: 1366px) and (max-width: 1400px) {
    .productSearchForm .el-form-item .el-form-item__content {
      width: 70% !important;
    }
  }

  .productSearchForm .el-form-item .el-form-item__content {
    width: 72% !important;
  }

  @media only screen and (min-width: 310px) and (max-width: 500px) {
    .el-tab-paneClass {
      max-height: 220px !important;
    }

    .productSkuInfoDialog {
      width: 100% !important;
    }

    .el-form-item__content {
      width: 75% !important;
    }

    .addProductDiv {
      width: 100% !important;
    }

    .el-input__inner {
      width: 100% !important;
    }

    .searchButton {
      width: 100% !important;
      margin-left: 0rem !important;
      margin-bottom: 0.625rem !important;
    }
  }

  #productInfoDiv .el-divider span {
    color: #606266;
    font-weight: bold;
  }

  #productInfoDiv .el-table__row th .cell {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0px 0px;
  }

  #productInfoDiv .el-table__row th {
    padding: 3px 0px;
    padding-left: 10px;
    color: #606266;

  }

  #productInfoDiv .el-table__row td {
    padding: 3px 0;
  }

  .spusRowClass button {
    margin-bottom: 10px;
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
