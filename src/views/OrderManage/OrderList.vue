<!--======订单列表模块=======-->
<template>
  <div id="OrderList">
    <el-form :inline="true" class="demo-form-inline searchForm">
      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单编号">
            <el-input v-model="orderPid" placeholder="输入编号"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="店铺名称">
            <el-input v-model="dianPuName" placeholder="输入名称"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单类型">
            <el-select v-model="orderCast" placeholder="选择">
              <el-option label="普通订单" value="普通订单" />
              <el-option label="优惠订单" value="优惠订单" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单状态">
            <el-select v-model="orderState" placeholder="选择">
              <el-option label="待付款" value="待付款" />
              <el-option label="已取消" value="已取消" />
              <el-option label="未发货" value="未发货" />
              <el-option label="已发货" value="已发货" />
              <el-option label="未收货" value="未收货" />
              <el-option label="未收货-退单中" value="未收货-退单中" />
              <el-option label="未收货-退单成功" value="未收货-退单成功" />
              <el-option label="已收货" value="已收货" />
              <el-option label="已收货-退单中" value="已收货-退单中" />
              <el-option label="已收货-退单成功" value="已收货-退单成功" />
              <el-option label="已收货-换货中" value="已收货-换货中" />
              <el-option label="已收货-换货成功" value="已收货-换货成功" />
              <el-option label="待评价" value="待评价" />
              <el-option label="已结算" value="已结算" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker
              v-model="startDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker
              v-model="endDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6, offset: 6}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 215px; margin-left: 70px;" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>店铺名称:小鹏家具</span>
            <el-divider direction="vertical" />
            <span>数量:900笔</span>
            <el-divider direction="vertical" />
            <span>时间:2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column label="序号" show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="订单编号" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.pid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="店铺" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.store }}</span>
            </template>
          </el-table-column>

          <el-table-column label="下单时间" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.cast }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="状态" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>订单商品</span>
              <el-tooltip class="item" effect="dark" content="商品信息描述" placement="right">
                <svg-icon icon-class="product" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="productDesc(scope.$index, list)"
              >
                {{ scope.row.product }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>订单金额</span>
              <el-tooltip class="item" effect="dark" content="订单金额描述" placement="right">
                <svg-icon icon-class="price" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderPriceDesc(scope.$index, list)"
              >
                {{ scope.row.price }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>用户</span>
              <el-tooltip class="item" effect="dark" content="用户信息描述" placement="right">
                <i class="el-icon-user-solid" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderUserDesc(scope.$index, list)"
              >
                {{ scope.row.users }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>物流</span>
              <el-tooltip class="item" effect="dark" content="订单物流描述" placement="right">
                <i class="el-icon-location" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderExpressDesc(scope.$index, list)"
              >
                {{ scope.row.logistics }}
              </el-button>
              <span />
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

    <!--===================商品详情描述弹出框(开始)========================-->
    <el-dialog title="商品详情" :visible.sync="productDescVisible" width="30%">
      <el-table
        v-loading="listLoading"
        :data="orderDescList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="productDescVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================商品详情描述弹出框(结束)========================-->

    <!--===================订单金额详情弹出框(开始)========================-->
    <el-dialog title="订单金额" :visible.sync="orderPriceVisible" width="30%">
      <el-table
        v-loading="listLoading"
        :data="orderPriceList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.$index==6">
              <el-input v-model="elsePrice" placeholder="请输入" :value="scope.row.desc" />
            </span>
            <span v-if="scope.$index==7">
              <el-input v-model="elseDesc" placeholder="请输入" :value="scope.row.desc" />
            </span>
            <span v-if="scope.$index!=7&&scope.$index!=6">
              {{ scope.row.desc }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-button @click="orderPriceVisible = false">关 闭</el-button>
        <el-button type="primary" @click="orderPriceVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--===================订单金额详情弹出框(结束)========================-->

    <!--===================用户详情弹出框(开始)========================-->
    <el-dialog title="用户详情" :visible.sync="orderUserVisible" width="30%">
      <el-table
        v-loading="listLoading"
        :data="orderUserList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>
              {{ scope.row.desc }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="orderUserVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================用户详情弹出框(结束)========================-->

    <!--===================物流详情弹出框(开始)========================-->
    <el-dialog v-loading="loadings" title="物流详情" :visible.sync="orderExpressVisible" width="35%" :close-on-click-modal="false">
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
            <div class="title-menu-min">
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
            </div>
          </el-col>
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="orderExpressVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--===================物流详情弹出框(结束)========================-->

  </div>
</template>

<script>

export default {
  data() {
    return {
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      orderCast: '', // 订单类型
      orderState: '', // 订单状态
      orderPid: '', // 订单编号
      dianPuName: '', // 店铺名称
      expressPid: '', // 物流单号
      elsePrice: '', // 订单金额对应里面的其他金额
      elseDesc: '', // 订单金额对应里面的其他描述
      productDescVisible: false, // 订单商品描述弹出框是否打开关闭
      orderPriceVisible: false, // 订单金额描述弹出框是否打开关闭
      orderUserVisible: false, // 订单用户描述弹出框是否打开关闭
      orderExpressVisible: false, // 订单物流描述弹出框是否打开关闭

      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      orderDescList: [ // 商品详细描述信息列表
        { cast: '商品编号', desc: '1231241413' },
        { cast: '店铺名称', desc: '小彭家具' },
        { cast: '商品名称', desc: '茶杯' },
        { cast: '商品数量', desc: '2' },
        { cast: '商品总金额', desc: '78' },
        { cast: '商品购项', desc: '红色-4g-6+128' }
      ],
      orderPriceList: [ // 金额详细描述信息列表
        { cast: '支付编号', desc: '5148949848948' },
        { cast: '下单时间', desc: '2019-1' },
        { cast: '商品金额', desc: '110' },
        { cast: '优惠金额', desc: '20' },
        { cast: '实付金额', desc: '90' },
        { cast: '运费', desc: '15' },
        { cast: '其他金额', desc: '0' },
        { cast: '其他描述', desc: '无' },
        { cast: '支付时间', desc: '2019-1-1' },
        { cast: '支付类型', desc: '支付宝' }
      ],
      orderUserList: [ // 订单用户列表信息
        { cast: '账户', desc: '5148949848948' },
        { cast: '用户姓名', desc: '小李' },
        { cast: '收货地址', desc: '江西省上饶市广丰县' },
        { cast: '电话', desc: '15717007490' }
      ],
      list: [ // 订单列表情况集合
        {
          pid: '1',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '2',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '3',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '4',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '5',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '6',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '7',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '8',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '8',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '9',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '10',
          number: '123123',
          store: '小彭家居',
          date: '2019-9-9',
          cast: '优惠订单',
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        }
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
    // 表单提交方法
    onSubmit() {
      console.log('submit!')
    },

    // 商品详情方法
    productDesc(currIndex, obj) {
      this.productDescVisible = true
    },
    // 订单金额方法
    orderPriceDesc(currIndex, obj) {
      this.orderPriceVisible = true
    },
    // 订单用户方法
    orderUserDesc(currIndex, obj) {
      this.orderUserVisible = true
    },
    // 订单物流方法
    orderExpressDesc(currIndex, obj) {
      this.orderExpressVisible = true
    }
  }
}

</script>

<style >

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/

  #OrderList .el-form .el-row{
    margin: 0 auto;
    text-align:center !important;
  }

  #OrderList .el-divider span{
    color: #606266;font-weight:bold;
  }
  #OrderList .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #OrderList .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #OrderList .el-table td{
    padding: 0px;
  }
  #OrderList{
    margin: 30px;
  }

  /*========弹出框样式信息开始============*/
  #OrderList .el-dialog__wrapper div[role="dialog"]{
    margin-top: 50px !important;
  }
  #OrderList .el-dialog__body{
    padding-top: 10px !important;
  }
  #OrderList .el-dialog__body .el-table td{
    padding: 6px 0px !important;
  }
  /*========弹出框样式信息结束============*/

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/
    #OrderList .el-form .el-form-item .el-input__inner{
      width: 216px !important;
    }
  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/
    #OrderList .searchForm .el-input__inner{
      width: 9.6rem !important
    }
    #OrderList .searchForm button{
      width: 9.6rem !important;
    }

    #OrderList div[aria-label="物流详情"] .el-input__inner {
      width: 10rem !important;
    }

    #OrderList div[aria-label="物流详情"] .el-row .el-col:nth-child(2)  button{
      width: 140px !important;
    }

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) {  /*宽================360 -- 500px================*/
    #OrderList .el-form .el-form-item .el-input__inner{
      width: 250px !important;
    }
    #OrderList .el-col-xs-23{
      width: 100%;
    }
    #OrderList .el-form-item .el-button{
      width: 250px !important;
    }
    #OrderList .el-divider span{
      font-size: 11px;
    }
    #OrderList .el-col{
      padding: 0px !important;
    }

    #OrderList .el-dialog__wrapper .el-dialog{
      width: 90% !important;
    }

    #OrderList div[aria-label="物流详情"] .el-form .el-form-item .el-input__inner{ /*=物流详情弹出框信息*/
      width: 184px !important;
    }
    #OrderList div[aria-label="物流详情"] .el-form .el-form-item .el-button{
      margin-left: 68px !important;
      width: 184px !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px)  { /*宽=================200 -- 350==================*/
    #OrderList .searchForm .el-col{
      padding: 0px !important;
      margin-left: 10px;
    }
    #OrderList .searchForm  .el-form-item .el-form-item__content{
      width: 194px !important;
    }
    #OrderList .searchForm .el-form-item .el-button{
      margin-left: 34px !important;
      width: 195px !important;
    }
    #OrderList .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    #OrderList .el-dialog__wrapper .el-dialog{             /*========弹出框样式信息开始============*/
      width: 100% !important;
    }
    #OrderList div[aria-label="物流详情"] .el-form-item__content{
      width: 194px !important;
    }
    #OrderList div[aria-label="物流详情"] .el-form-item__content button{
      width: 194px !important;
      margin-left: 35px !important;
    }
  }

  /*==================自定义自适应css样式详情结束 ========================*/

  /*=======内部滚动条显示的css样式情况 开始==========*/
  #OrderList .title-menu-min { /*新加入隐藏滚动条效果*/
    height: 450px !important;
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  #OrderList .title-menu-min::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  #OrderList .title-menu-min::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  #OrderList .title-menu-min::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  /*=======内部滚动条显示的css样式情况 开始==========*/

  /*=======物流详细描述信息css样式开始==========*/
  #OrderList .title-menu-min ul {
    padding-left:1.5rem;
  }

  #OrderList .title-menu-min ul li{
    list-style:none;
    font-size:0.8rem;
  }
  #OrderList .track-rcol{
    width: 90% !important;
  }
  #OrderList .track-list{
    position:relative;
  }
  #OrderList .track-list li{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:1rem;
    border-left:1px solid #d9d9d9;
    color: #999;
  }
  #OrderList .track-list li.first{
    color:red;
    padding-top:0;
    width:100%;
    text-align:left;
    border-left:1px solid #d9d9d9;
  }
  #OrderList .track-list li .node-icon{
    position: absolute;
    left: -5.5px;
    border-radius: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
    top:4px;
    background-color: #999999;
  }
  #OrderList .track-list li.first .node-icon{
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
  #OrderList .track-list li .time{
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
  #OrderList .track-list li .txt{
    position:relative;
    display:inline-block;
    vertical-align:top;
    color: #999;
  }
  #OrderList .track-list li.first .time{
    text-align: left;
    width: 94%;
    color:red;
  }
  #OrderList .track-list li.first .txt{
    color: red;
    text-align:left;
    width: 94%;
  }
  #OrderList .track-list li.finall{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:18px;
    border-color:white;
    border-left:1px solid #ffffff;
    color: #999;
  }
  #OrderList .track-list li.finall .div-spilander{
    width: 1px;
    position: absolute;
    position: absolute;
    left: -1.5px;
    height: 0.5rem;
    background-color: #d9d9d9;
  }
  /*=======物流详细描述信息css样式结束==========*/
</style>
