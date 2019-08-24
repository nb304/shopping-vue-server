
<!--======订单物流列表模块=======-->
<template>
  <div id="orderLogistics">
    <el-form ref="form" :model="logisticsForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="订单编号">
            <el-input v-model="logisticsForm.orderNumber" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="物流编号">
            <el-input v-model="logisticsForm.logisticsNumber" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 23}">
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker
              v-model="logisticsForm.startDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="{span: 6}" :xs="{span: 23}">
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker
              v-model="logisticsForm.endDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单状态">
            <el-select v-model="logisticsForm.orderState" placeholder="选择">
              <el-option label="已发货" value="已发货" />
              <el-option label="已收货" value="已收货" />
              <el-option label="已退货" value="已退货" />
              <el-option label="已收货" value="已收货" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 23}">
          <el-form-item label="物流名称">
            <el-select v-model="logisticsForm.logisticsName" placeholder="选择">
              <el-option label="圆通" value="圆通" />
              <el-option label="中通" value="中通" />
              <el-option label="顺丰" value="顺丰" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="{span: 6,offset:6}" :xs="{span: 23}">
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
            <span style="margin-right: 20px">：小鹏家具</span>
            <el-tooltip class="item" effect="dark" content="时间" placement="right">
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
          :data="list"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column label="序号" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="订单编号" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.pid }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="状态" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.state }}</span>
            </template>
          </el-table-column>

          <el-table-column label="物流编号" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.logisticsNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="物流名称" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.logisticsName }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true" header-align="center" align="center">
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
          <el-table-column prop="created_at" show-overflow-tooltip="true" header-align="center" align="center">
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
          <el-table-column prop="created_at" show-overflow-tooltip="true" header-align="center" align="center">
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
          <el-table-column prop="created_at" show-overflow-tooltip="true" header-align="center" align="center">
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
                查看详情
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
      <el-row :gutter="24">
        <el-col :sm="{span: 24}" :xs="{span: 24}">
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
                <span>{{ scope.row.desc }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
          <el-button style="width: 90%; " @click="orderPriceVisible = false">关闭窗口</el-button>
        </el-col>
      </el-row>
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
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-scrollbar style="height:400px;">
              <h4 style="text-align: center;margin-bottom: 15px"><span style="margin-right: 10px">物流编号：1231412312312341234</span> <span>物流名称：圆通</span></h4>
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
  name: 'OrderLogistics',
  data() {
    return {
      logisticsForm: { // 查询物流详情的form表单
        orderNumber: '', // '订单编号'
        logisticsNumber: '', // 物流编号
        startDate: '', // 起始时间
        endDate: '', // 结束时间
        orderState: '', // 订单状态
        logisticsName: ''// 物流名称
      },
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
      list: [ // 订单物流列表情况集合
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
          state: '已发货',
          product: '苹果6x',
          price: 123,
          users: '小明',
          logistics: '123123'
        },
        {
          pid: '1',
          logisticsNumber: '13413445435334', // 物流编号
          logisticsName: '顺丰', // 物流名称
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

    // 商品详情方法
    productDesc: function(currIndex, obj) {
      this.productDescVisible = true
    },
    // 订单金额方法
    orderPriceDesc: function(currIndex, obj) {
      this.orderPriceVisible = true
    },
    // 订单用户方法
    orderUserDesc: function(currIndex, obj) {
      this.orderUserVisible = true
    },
    // 订单物流方法
    orderExpressDesc: function(currIndex, obj) {
      this.orderExpressVisible = true
    }

  }
}
</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #orderLogistics{
    margin: 30px;
  }

  #orderLogistics .el-divider span{
    color: #606266;font-weight:bold;
  }

  /*对用户基础输入信息模块的form标签设置样式*/
  #orderLogistics  .el-form-item__content{
    width: 65% !important;
  }

  #orderLogistics .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }

  #orderLogistics .el-date-editor,#orderLogistics .el-select{
    width: 105% !important;
  }

  #orderLogistics .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #orderLogistics .el-table td{
    padding: 0px;
  }
  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/
    #orderLogistics .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }

    #orderLogistics div.el-dialog{  /*对4个弹出框设置样式 */
      width: 95% !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/

    #orderLogistics .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    #orderLogistics div.el-dialog{  /*对4个弹出框设置样式 */
      width: 95% !important;
    }
  }

  /*=======物流详细描述信息css样式开始==========*/

  #orderLogistics .track-rcol{
    margin-left: 10px;
    width: 90% !important;
  }
  #orderLogistics .track-list{
    position:relative;
  }
  #orderLogistics .track-list li{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:1rem;
    border-left:1px solid #d9d9d9;
    color: #999;
  }
  #orderLogistics .track-list li.first{
    color:red;
    padding-top:0;
    width:100%;
    text-align:left;
    border-left:1px solid #d9d9d9;
  }
  #orderLogistics .track-list li .node-icon{
    position: absolute;
    left: -5.5px;
    border-radius: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
    top:4px;
    background-color: #999999;
  }
  #orderLogistics .track-list li.first .node-icon{
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
  #orderLogistics .track-list li .time{
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
  #orderLogistics .track-list li .txt{
    position:relative;
    display:inline-block;
    vertical-align:top;
    color: #999;
  }
  #orderLogistics .track-list li.first .time{
    text-align: left;
    width: 94%;
    color:red;
  }
  #orderLogistics .track-list li.first .txt{
    color: red;
    text-align:left;
    width: 94%;
  }
  #orderLogistics .track-list li.finall{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:18px;
    border-color:white;
    border-left:1px solid #ffffff;
    color: #999;
  }
  #orderLogistics .track-list li.finall .div-spilander{
    width: 1px;
    position: absolute;
    position: absolute;
    left: -1.5px;
    height: 0.5rem;
    background-color: #d9d9d9;
  }
  /*=======物流详细描述信息css样式结束==========*/

</style>
