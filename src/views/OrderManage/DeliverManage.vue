<!--======发货管理模块=======-->
<template>
  <div id="DeliverManage">
    <el-form :inline="true" class="demo-form-inline searchForm">
      <el-row :gutter="24">
        <el-col :sm="{span: 5}" :xs="{span: 23}">
          <el-form-item label="订单编号">
            <el-input v-model="orderPid" placeholder="输入编号"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 5}" :xs="{span: 23}">
          <el-form-item label="订单类型">
            <el-select v-model="orderCast" placeholder="选择">
              <el-option label="普通订单" value="普通订单" />
              <el-option label="优惠订单" value="优惠订单" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 5}" :xs="{span: 23}">
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
        <el-col :sm="{span: 5}" :xs="{span: 23}">
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

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 200%;" @click="onSubmit">搜索</el-button>
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

    <!--==================一键生成按钮(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-button type="primary" icon="el-icon-thumb" class="produce" style="width: 10%;" @click="onSubmit">一键生成</el-button>
      </el-col>
    </el-row>
    <!--==================一键生成按钮(结束)========================-->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <el-checkbox v-model="isChecked">
                <span>序号</span>
              </el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox v-model="isChecked">
                {{ scope.$index }}
              </el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="订单编号" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.pid }}</span>
            </template>
          </el-table-column>

          <el-table-column label="下单时间" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column label="订单类型" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.orderCast }}</span>
            </template>
          </el-table-column>

          <el-table-column label="是否发货" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.isLogistics==0?'未发货':已发货 }}</span>
            </template>
          </el-table-column>

          <el-table-column show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>发货数量</span>
              <el-tooltip class="item" effect="dark" content="发货数量(需发货/已发货)" placement="right">
                <svg-icon icon-class="yiwen" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.deliverNumber }}</span>
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
              <span>发货操作</span>
              <el-tooltip class="item" effect="dark" content="发货操作" placement="right">
                <svg-icon icon-class="wuliu2" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="showDeliverHandle(scope.$index, list)"
              >
                发货
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
            <span>
              {{ scope.row.desc }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="orderPriceVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
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

    <!--===================发货操作弹出框(开始)========================-->
    <el-dialog id="review" title="发货操作" :visible.sync="deliverHandleVisible" width="21%">
      <el-form :inline="true" class="demo-form-inline" >
        <el-row :gutter="24" style="text-align: left !important;">
          <el-col :sm="{span: 23}" :xs="{span: 23}">
            <el-form-item label="发货数量">
              <el-input v-model="deliverNumber" placeholder="输入发货数量"><i slot="prefix" class="el-icon-edit" /></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 23}" :xs="{span: 23}">
            <el-form-item label="物流单号">
              <el-input v-model="deliverPid" placeholder="输入物流单号"><i slot="prefix" class="el-icon-edit" /></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 23}" :xs="{span: 23}">
            <el-form-item label="物流名称">
              <el-input v-model="deliverName" placeholder="输入物流名称"><i slot="prefix" class="el-icon-edit" /></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 23}" :xs="{span: 23}" style="color: #ff761a;font-size: 10px ">
            <svg-icon icon-class="jinggao" style="margin-right: 5px" /> 如果选择手动输入发货该订单就不能用一件生成功能
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer ">
        <el-button @click="deliverHandleVisible = false">关 闭</el-button>
        <el-button type="primary" @click="deliverHandleVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--===================发货操作弹出框(结束)========================-->
  </div>
</template>

<script>
export default {
  name: 'DeliverManage',
  data() {
    return {
      isChecked: false, // 是否勾选
      orderPid: '', // 订单编号
      orderCast: '', // 订单类型
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      productDescVisible: false, // 订单商品描述弹出框是否打开关闭
      orderPriceVisible: false, // 金额描述弹出框是否打开默认不显示
      orderUserVisible: false, // 订单用户描述弹出框是否打开关闭
      deliverHandleVisible: false, // 发货操作弹出框是否打开关闭
      deliverNumber: '', // 发货数量
      deliverPid: '', // 物流编号
      deliverName: '', // 物流名称
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
      list: [ // 订单发货列表情况集合
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        },
        {
          pid: '114123214',
          date: '2019-9-9',
          orderCast: '优惠订单',
          isLogistics: '0',
          product: '小米MIX3',
          price: '1999.9',
          users: '小明',
          deliverNumber: '2/2'
        }

      ]
    }
  },
  methods: {
    productDesc(currIndex, obj) { // 商品详情方法
      this.productDescVisible = true
    },
    orderPriceDesc(currIndex, obj) { // 显示订单金额详情
      this.orderPriceVisible = true
    },
    orderUserDesc(currIndex, obj) { // 订单用户方法
      this.orderUserVisible = true
    },
    showDeliverHandle(currIndex, obj) { // 发货操作方法
      this.deliverHandleVisible = true
    }

  }
}
</script>

<style >

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #DeliverManage{
    margin: 30px;
  }



  #DeliverManage .searchForm .el-row{
     text-align: left !important;
   }

  #DeliverManage .el-divider span{
    color: #606266;font-weight:bold;
  }
  #DeliverManage .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #DeliverManage .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #DeliverManage .el-table td{
    padding: 0px;
  }

  /*========弹出框样式信息开始============*/
  #DeliverManage .el-dialog__wrapper div[role="dialog"]{
    margin-top: 50px !important;
  }
  #DeliverManage .el-dialog__body{
    padding-top: 10px !important;
  }
  #DeliverManage .el-dialog__body .el-table td{
    padding: 6px 0px !important;
  }
  /*========弹出框样式信息结束============*/

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

    #DeliverManage .el-form .el-form-item .el-input__inner{
      width: 10rem !important;
    }

    #DeliverManage .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 15px !important;
    }

    #DeliverManage div[aria-label="发货操作"] .el-form .el-form-item .el-input__inner{
      width: 11.5rem !important;
    }


  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/
    #DeliverManage .searchForm .el-input__inner{
      width: 7.3rem !important
    }
    #DeliverManage .searchForm button{
      width: 7.3rem !important;
    }

    #DeliverManage div[aria-label="发货操作"] .el-input__inner{
      width: 9rem  !important;
    }
  }

  @media only screen and (min-width: 360px) and (max-width: 500px) {  /*宽================360 -- 500px================*/

    #DeliverManage .searchForm .el-row{
      text-align: center !important;
    }

    #DeliverManage .el-form .el-form-item .el-input__inner {
      width: 12.8rem !important;
    }
    #DeliverManage .searchForm .el-col:nth-child(5){   /*代表设置功能搜索区域的第五个 el-col对应下标签的演示*/
      margin-left: -2rem !important;
    }

    #DeliverManage .searchForm button{
      width: 205% !important;
      margin-left: 0.8rem;
    }

    #DeliverManage .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }

    #DeliverManage .produce {  /*一键生成按钮样式*/
      width: 67% !important;
      margin-left: 4.8rem !important;
    }

    #DeliverManage .el-dialog__wrapper .el-dialog{             /*========弹出框样式信息开始============*/
      width: 90% !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350px==================*/
    #DeliverManage .searchForm .el-row{
      text-align: center !important;
    }

    #DeliverManage .el-form .el-form-item .el-input__inner {
      width: 10.6rem !important;
    }

    #DeliverManage .searchForm .el-col:nth-child(5){   /*代表设置功能搜索区域的第五个 el-col对应下标签的演示*/
      margin-left: -0.5rem !important;
    }

    #DeliverManage .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    #DeliverManage .produce {  /*一键生成按钮样式*/
      width: 60% !important;
      margin-left: 5.5rem !important;
    }

    #DeliverManage .el-dialog__wrapper .el-dialog{             /*========弹出框样式信息开始============*/
      width: 100% !important;
    }
  }

  /*==================自定义自适应css样式详情结束 ========================*/
</style>
