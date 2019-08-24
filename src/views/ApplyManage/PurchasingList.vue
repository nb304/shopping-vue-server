<!--======采购列表管理模块========-->
<template>

  <div id="purchasingList">
    <el-form ref="form" :model="purchasingListForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购编号">
            <el-input v-model="purchasingListForm.purchasingNumber" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="采购名称">
            <el-input v-model="purchasingListForm.purchasingName" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 23}">
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker
              v-model="purchasingListForm.startDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 23}">
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker
              v-model="purchasingListForm.endDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 100%;" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <el-tooltip class="item" effect="dark" content="小鹏家具" placement="right">
              <svg-icon icon-class="dianpu2" />
            </el-tooltip>
            <span>：小鹏家具</span>

            <el-tooltip class="item" effect="dark" content="购单数量" placement="right" style="margin-left:10px">
              <i class="el-icon-s-claim" />
            </el-tooltip>
            <span>：50</span>

            <el-tooltip class="item" effect="dark" content="时间" placement="right" style="margin-left: 10px">
              <i class="el-icon-timer" />
            </el-tooltip>
            <span>时间：2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-table
          v-loading="listLoading"
          :data="purchasingList"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column label="序号" show-overflow-tooltip="true" header-align="left" align="center" width="50px">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>

          <el-table-column label="采购单号" show-overflow-tooltip="true" header-align="center" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.purchasingNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购名称" show-overflow-tooltip="true" header-align="center" align="center" width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.purchasingName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="采购时间" show-overflow-tooltip="true" header-align="center" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.purchasingTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购总金额" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.purchasingPrice }}</span>
            </template>
          </el-table-column>

          <el-table-column label="收货状态" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.purchasingSate==1?'已收货':scope.row.purchasingSate==2?'部分收货':'未收货' }}</span>
            </template>
          </el-table-column>

          <el-table-column label="采购单图" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="600"
                trigger="click"
              >
                <el-image :src="scope.row.imgUrl">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <el-button slot="reference" style="border: none;color: #409EFF;">查看图片</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column show-overflow-tooltip="true" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              <span>采购单信息</span>
              <el-tooltip class="item" effect="dark" content="采购单信息" placement="left">
                <svg-icon icon-class="product" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="430"
                trigger="click"
              >
                <el-table stripe="true" :data="scope.row.purchasingDesc">
                  <el-table-column width="100" property="cast" label="类型" />
                  <el-table-column width="300" property="desc" label="描述" />
                </el-table>
                <el-button slot="reference" style="border: none;color: #409EFF;">查看详情</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              <span>采购物品</span>
              <el-tooltip class="item" effect="dark" content="采购物品信息" placement="left">
                <i class="el-icon-s-order" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="purchasingProductDesc(scope.row, list)"
              >
                查看详情
              </el-button>
            </template>
          </el-table-column>

          <el-table-column show-overflow-tooltip="true" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              <span>物流信息</span>
              <el-tooltip class="item" effect="dark" content="物流信息详情查看" placement="left">
                <i class="el-icon-location" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="purchasingExpressDesc(scope.row, list)"
              >
                查看详情
              </el-button>
              <span />
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200px" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="20px" @click.native.prevent="logisticsHandel(scope.row, list)"> 物流</el-button>
              <el-button type="text" size="20px" @click.native.prevent="takeProductHandel(scope.row, list)"> 收货</el-button>
              <el-button type="text" size="20px" @click.native.prevent="showUpdateProduct(scope.row, list)"> 修改</el-button>
              <el-button type="text" size="20px" @click.native.prevent="deleteHandel(scope.row, list)"> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--==================分页组件(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 4, offset: 17}" :xs="{span: 24}">
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
    <!--==================分页组件(结束)========================-->

    <!--===================物品详情弹出框(开始)========================-->
    <el-dialog title="采购商品详情" :visible.sync="productDescLog" width="50%">
      <el-table
        v-loading="listLoading"
        :data="productDescData"
        element-loading-text="Loading"
        border
      >
        <!-- { productName: '小米6x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },-->
        <el-table-column class-name="status-col" label="商品名称" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="商品描述" show-overflow-tooltip="true" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.productDesc }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="采购金额" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.countPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="采购数量" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.countNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="已收货数量" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.receivedNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="未收货数量" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.notReceiveNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="this.consigneeFlag==1" class-name="status-col" label="收货数量" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-input v-model="scope.row.input" />
          </template>
        </el-table-column>

      </el-table>
      <div v-if="this.consigneeFlag==0" slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="productDescLog = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
      <div v-if="this.consigneeFlag==1" slot="footer" class="dialog-footer ">
        <el-button @click="productDescLog = false">关 闭</el-button>
        <el-button type="primary" @click="getInputData">确认收货</el-button>
      </div>
    </el-dialog>
    <!--===================物品详情弹出框(结束)========================-->

    <!--===================物流详情弹出框(开始)========================-->
    <el-dialog v-loading="loadings" title="物流详情" :visible.sync="orderExpressLog" width="35%" :close-on-click-modal="false">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :sm="{span: 15}" :xs="{span: 24}">
            <el-form-item label="物流编号">
              <el-select v-model="expressPid" placeholder="选择">
                <el-option label="211231233123" />
                <el-option label="1231321312312" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 1}" :xs="{span: 24}">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" style="width: 170px; " @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-scrollbar style="height:400px;">
              <!--==========物流组件信息开始=======-->
              <div class="track-rcol">
                <div class="track-list">
                  <ul>
                    <div v-for="(item,index) in logisticsList" :key="index">
                      <li v-if="index===0" class="first">
                        <div />
                        <i class="node-icon" />
                        <span class="txt">{{ item.message }}</span>
                        <span class="time">{{ item.messageDate }}</span>
                      </li>
                      <li v-if="index > 0 && index !== logisticsList.length-1">
                        <i class="node-icon" />
                        <span class="txt">{{ item.message }}</span>
                        <span class="time">{{ item.messageDate }}</span>
                      </li>
                      <li v-if="index === logisticsList.length-1" class="finall">
                        <i class="div-spilander" />
                        <i class="node-icon" />
                        <span class="txt">{{ item.message }}</span>
                        <span class="time">{{ item.messageDate }}ss</span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <!--==========物流组件信息结束=======-->
            </el-scrollbar>
          </el-col>
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="orderExpressLog = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--===================物流详情弹出框(结束)========================-->

    <!--===================添加物流详情弹出框(开始)========================-->
    <el-dialog v-loading="loadings" title="物流编辑" :visible.sync="editOrderExpressLog" width="50%" :close-on-click-modal="false">
      <el-form :inline="true" :model="addExpressForm" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :lg="{span: 10}" :xs="{span: 24}">
            <el-form-item label="物流编号">
              <el-input v-model="addExpressForm.expressNumber" />
            </el-form-item>
          </el-col>
          <el-col :lg="{span: 10}" :xs="{span: 24}">
            <el-form-item label="物流名称">
              <el-input v-model="addExpressForm.expressName" />
            </el-form-item>
          </el-col>
          <el-col :lg="{span: 4}" :xs="{span: 24}">
            <el-form-item>
              <el-button type="primary" icon="el-icon-circle-plus-outline" style="width: 100%;" @click="onSubmit">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row :gutter="24">
        <el-col :lg="{span: 24}" :xs="{span: 24}">
          <el-table
            v-loading="listLoading"
            :data="addExpressList"
            element-loading-text="Loading"
            border
          >
            <el-table-column class-name="status-col" label="物流编号" show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.addExpressNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="物流名称" show-overflow-tooltip="true" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.addExpressName }}</span>
              </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="操作" show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-button type="text" size="20px" @click.native.prevent="expressDeleteHandel(scope.row, list)"> 删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="editOrderExpressLog = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================添加物流详情弹出框(结束)========================-->

    <!--===================采购商品修改(开始)========================-->
    <el-dialog title="商品修改" :visible.sync="productUpdateLog" width="50%">
      <el-table
        v-loading="listLoading"
        :data="productDescUpdateData"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="商品名称" show-overflow-tooltip="true" width="150px">
          <template slot-scope="scope">

            <el-input v-model="scope.row.productName" />
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="商品描述" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productDesc" />
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="采购金额" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-input v-model="scope.row.countPrice" />
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="采购数量" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-input v-model="scope.row.countNumber" />
          </template>
        </el-table-column>

      </el-table>

      <div slot="footer" class="dialog-footer ">
        <el-button @click="productUpdateLog = false">关 闭</el-button>
        <el-button type="primary" @click="updateProduct">确认修改</el-button>
      </div>
    </el-dialog>
    <!--===================物品详情弹出框(结束)========================-->

  </div>
</template>

<script>
export default {
  name: 'PurchasingList',
  data() {
    return {
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      consigneeFlag: 0, // 0代表物品弹出框只显示不编辑 1代表显示物品并编辑货物数量
      orderExpressLog: false, // 订单物流描述弹出框是否打开关闭
      productDescLog: false, // 采购物品详情弹出框默认不打开
      editOrderExpressLog: false, // 添加采购物流详情弹出框默认不打开
      productUpdateLog: false, // 修改采购商品详情弹出框默认不打开
      purchasingListForm: { // 搜索采购单信息的form表单
        purchasingNumber: '', // 采购编号
        purchasingName: '', // 采购名称
        startDate: '', // 采购起始时间
        endDate: ''// 采购结束时间
      },
      addExpressForm: { // 添加物流用的form表单
        addExpressName: '', // 添加物流名称
        addExpressNumber: ''// 添加物流编号
      },
      addExpressList: [ // 物流列表信息
        { addExpressName: '天天快递', addExpressNumber: '1231412312321' },
        { addExpressName: '德邦快递', addExpressNumber: '1231412312321' }
      ],
      purchasingList: [ // 采购单列表信息
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          purchasingDesc: [
            { cast: '采购单号', desc: '1233412' },
            { cast: '采购日期', desc: '2019-9-9' },
            { cast: '采购名称', desc: '小米采购' },
            { cast: '采购总数量', desc: '1233' },
            { cast: '采购总金额', desc: '江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上' },
            { cast: '联系人', desc: '刘老板' },
            { cast: '联系电话', desc: '15717007490' }]
        },

        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          purchasingDesc: [
            { cast: '采购单号', desc: '1233412' },
            { cast: '采购日期', desc: '2019-9-9' },
            { cast: '采购名称', desc: '小米采购' },
            { cast: '采购总数量', desc: '1233' },
            { cast: '采购总金额', desc: '江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上' },
            { cast: '联系人', desc: '刘老板' },
            { cast: '联系电话', desc: '15717007490' }]
        },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '1', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '0', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { purchasingNumber: '123124123132', purchasingName: '电脑采购', purchasingSate: '2', purchasingTime: '2019-9-9 14:24:44', purchasingPrice: '12314', imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          purchasingDesc: [
            { cast: '采购单号', desc: '1233412' },
            { cast: '采购日期', desc: '2019-9-9' },
            { cast: '采购名称', desc: '小米采购' },
            { cast: '采购总数量', desc: '1233' },
            { cast: '采购总金额', desc: '江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上饶市江西省上' },
            { cast: '联系人', desc: '刘老板' },
            { cast: '联系电话', desc: '15717007490' }]
        }

      ],
      productDescData: [ // 采购单中物品详情信息
        { productName: '小米6x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米7x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米8x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米6x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米4x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米8x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米6x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米4x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' },
        { productName: '小米8x', productDesc: '小米6采购快用完了', countPrice: '53345', countNumber: '30', receivedNumber: '20', notReceiveNumber: '10' }
      ],
      productDescUpdateData: [// 修改采购商品信息要用到的数据

      ],
      logisticsList: [ // 物流信息
        {
          message: '1包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！顺丰快递服务，期待下次继续为您服务！顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        },
        {
          message: '2包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        },
        {
          message: '3包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        },
        {
          message: '4包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        },
        {
          message: '3包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        },
        {
          message: '4包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        },
        {
          message: '3包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        },
        {
          message: '4包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！',
          messageDate: '2016-03-10 18:07:15'
        }
      ]

    }
  },
  methods: {
    purchasingProductDesc: function(currData) { // 采购物品详情查看方法
      // 获取当前采购的商品及对应的收货信息

      // 获取成功后打开对应的采购商品弹出框
      this.productDescLog = true

      this.consigneeFlag = 0 // 0代表物品弹出框只显示不编辑 1代表显示物品并编辑货物数量
    },

    takeProductHandel: function(currData) { // 物品收货用到的方法
      // 获取当前采购的商品及对应的收货信息

      // 获取成功后打开对应的采购商品弹出框
      this.productDescLog = true

      this.consigneeFlag = 1 // 0代表物品弹出框只显示不编辑 1代表显示物品并编辑货物数量
    },

    getInputData: function() {
      for (let i = 0; i < this.productDescData.length; i++) {
        console.log(this.productDescData[i].input + '刘子江555')
      }
    },
    // 订单物流方法
    purchasingExpressDesc: function(currIndex, obj) {
      this.orderExpressLog = true
    },

    // 编辑采购物流方法
    logisticsHandel: function(currData) {
      // 获取当前采购所有的物流信息

      // 获取成功后打开对应的编辑采购物流弹出框
      this.editOrderExpressLog = true
    },

    // 显示编辑采购物品弹出框信息方法:
    showUpdateProduct: function() {
      // 获取当前采购单对应的物品信息

      // 将该数据保存到productDescData,进行数据演示,在创建一个新数组到时候用于比较哪些是修改了的
      this.productDescUpdateData = this.productDescData

      // 获取成功后打开对应的编辑采购物品弹出框
      this.productUpdateLog = true
    },

    // 显示编辑采购物品弹出框信息方法:
    updateProduct: function() {
      this.productUpdateLog = false
    }

  }
}
</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #purchasingList{
    margin: 30px;
  }

  #purchasingList .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #purchasingList .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #purchasingList .el-table td{
    padding: 0px;
  }

  #purchasingList .el-divider span{
    color: #606266;font-weight:bold;
  }

  #purchasingList .el-date-editor{
      width: 105% !important;
  }

  #purchasingList div[role="dialog"]{
    margin-top: 30px !important;
  }
  /* 对弹出框内容中的表格设置样式*/
  #purchasingList div[role="dialog"] .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #purchasingList div[role="dialog"] .el-table td{
    padding: 3px;
  }

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

    #purchasingList div[role="dialog"] .el-form-item__content{
      width: 70%;
    }
  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/
    #purchasingList div[role="dialog"]{
      width: 90% !important;
    }

    #purchasingList .el-divider__text{  /*分割线样式*/
      left:0px !important;
      font-size: 9px !important;
    }

    /*对应的弹出框样式设置*/
    #purchasingList div[role="dialog"] .el-form-item__content{
      width: 71%;
    }
    #purchasingList div[role="dialog"] .el-form-item{
      width: 100%;
    }
    #purchasingList div[role="dialog"] .el-form-item button{
      margin-left: 69px;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/
    #purchasingList div[role="dialog"]{
      width: 90% !important;
    }

    #purchasingList .el-divider__text{  /*分割线样式*/
      left:0px !important;
      font-size: 9px !important;
    }

    /*对应的弹出框样式设置*/
    #purchasingList div[role="dialog"] .el-form-item__content{
      width: 71%;
    }
    #purchasingList div[role="dialog"] .el-form-item{
      width: 100%;
    }
    #purchasingList div[role="dialog"] .el-form-item button{
      margin-left: 69px;
    }

  }

  /*=======物流详细描述信息css样式开始==========*/

  #purchasingList .track-rcol{
    margin-left: 10px;
    width: 90% !important;
  }
  #purchasingList .track-list{
    position:relative;
  }
  #purchasingList .track-list li{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:1rem;
    border-left:1px solid #d9d9d9;
    color: #999;
  }
  #purchasingList .track-list li.first{
    color:red;
    padding-top:0;
    width:100%;
    text-align:left;
    border-left:1px solid #d9d9d9;
  }
  #purchasingList .track-list li .node-icon{
    position: absolute;
    left: -5.5px;
    border-radius: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
    top:4px;
    background-color: #999999;
  }
  #purchasingList .track-list li.first .node-icon{
    background-position:0-72px;
    background-color: red;
    width: 1rem;
    z-index: 2;
    height: 1rem;
    position: absolute;
    left: -9px;
    top: 0;
    border-radius: 0.5rem;
  }
  #purchasingList .track-list li .time{
    margin-right:20px;
    position:relative;
    top:4px;
    display:inline-block;
    vertical-align:middle;
    background-color: white;
    color: #999;
    width:100%;
    text-align :left;
  }
  #purchasingList .track-list li .txt{
    position:relative;
    display:inline-block;
    vertical-align:top;
    color: #999;
  }
  #purchasingList .track-list li.first .time{
    text-align: left;
    width: 94%;
    color:red;
  }
  #purchasingList .track-list li.first .txt{
    color: red;
    text-align:left;
    width: 94%;
  }
  #purchasingList .track-list li.finall{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:18px;
    border-color:white;
    border-left:1px solid #ffffff;
    color: #999;
  }
  #purchasingList .track-list li.finall .div-spilander{
    width: 1px;
    position: absolute;
    position: absolute;
    left: -1.5px;
    height: 0.5rem;
    background-color: #d9d9d9;
  }
  /*=======物流详细描述信息css样式结束==========*/

</style>
