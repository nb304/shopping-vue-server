
<!--======订单签收详情模块=======-->
<template>
  <div id="orderSign">
    <el-form ref="form" :model="logisticsForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="用户账号">
            <el-input v-model="logisticsForm.userName" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="电话号码">
            <el-input v-model="logisticsForm.phoneNumber" />
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

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="店铺名称">
            <el-input v-model="logisticsForm.shopName" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6,offset:12}" :xs="{span: 23}">
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

            <el-tooltip class="item" effect="dark" content="当前店铺总次数" placement="right">
              <svg-icon icon-class="wuliu2" />
            </el-tooltip>
            <span style="margin-right: 20px">店铺签收次数：69</span>

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
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <el-table
          v-loading="listLoading"
          :data="signDataList"
          stripe="true"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column label="序号" show-overflow-tooltip="true" width="80px" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <el-table-column label="用户账号" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userAccount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户姓名" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="身份证号" show-overflow-tooltip="true" width="200px" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userPid }}</span>
            </template>
          </el-table-column>

          <el-table-column label="电话号码" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.phoneNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="签收次数" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.receiptNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true" width="200px" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              <span>历史订单记录</span>
              <el-tooltip class="item" effect="dark" content="历史订单记录" placement="right">
                <i class="el-icon-s-order" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderDesc(scope.row, list)"
              >
                查看订单详情
              </el-button>
              <span />
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true" width="200px" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              <span>历史签收记录</span>
              <el-tooltip class="item" effect="dark" content="历史签收记录" placement="right">
                <i class="el-icon-edit-outline" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="signDesc(scope.row, list)"
              >
                查看签收详情
              </el-button>
              <span />
            </template>
          </el-table-column>
        </el-table>

        <!--=============查看历史订单详情弹出框   开始 ==============-->
        <el-dialog
          title="历史订单"
          :visible.sync="orderDescLog"
          width="50%"
        >
          <el-scrollbar style="height:500px;width: 90%;margin: 0 auto">
            <div class="radio">
              排序：
              <el-radio-group v-model="reverse">
                <el-radio :label="true">倒序</el-radio>
                <el-radio :label="false">正序</el-radio>
              </el-radio-group>
            </div>
            <el-timeline style="height:500px;width: 90%;margin: 10px auto" :reverse="reverse">
              <el-timeline-item
                v-for="(activity, index) in orderActivities"
                :key="index"
                color="#8080ff"
                :timestamp="activity.orderTime"
                placement="top"
              >
                <el-card shadow="hover">
                  <el-table
                    v-loading="listLoading"
                    :data="activity.orderDescList"
                    element-loading-text="Loading"
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
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>

          <span slot="footer" class="dialog-footer">
            <el-row :gutter="24">
              <el-col :lg="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
                <el-button style="width: 90%; " @click="orderDescLog = false">关闭窗口</el-button>
              </el-col>
            </el-row>
          </span>
        </el-dialog>
        <!--=============查看历史订单详情弹出框   结束 ==============-->

        <!--=============查看历史签收详情弹出框   开始 ==============-->
        <el-dialog
          title="历史签收"
          :visible.sync="signDescLog"
          width="60%"
        >
          <el-row :gutter="24">
            <el-col :lg="{span:12}" :xs="{span: 24}">
              <el-scrollbar style="height:500px;">
                <div class="radio" style="text-align: center;margin-bottom: 15px">
                  排序：
                  <el-radio-group v-model="reverse">
                    <el-radio :label="true">倒序</el-radio>
                    <el-radio :label="false">正序</el-radio>
                  </el-radio-group>
                </div>
                <el-timeline style="height:500px;width: 90%;margin: 10px " :reverse="reverse">
                  <el-timeline-item
                    v-for="(activity, index) in signActivities"
                    :key="index"
                    color="#8080ff"
                    :timestamp="activity.logisticsTime"
                    placement="top"
                  >
                    <el-card shadow="hover">
                      <h4><span style="margin-right: 10px">物流编号：{{ activity.logisticsNumber }}</span><br><span>物流名称：{{ activity.logisticsName }}</span></h4>
                      <el-button
                        type="text"
                        size="20px"
                        @click.native.prevent="logisticsDesc(scope.row)"
                      >
                        查看本次签收详情
                      </el-button>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </el-scrollbar>
            </el-col>

            <el-col :lg="{span:12}" :xs="{span: 24}">
              <el-scrollbar v-if="this.logisticsList.length>0" style="height:500px;">
                <h4 style="text-align: center;margin-bottom: 15px"><span style="margin-right: 10px">物流编号：1231412312312341234</span> <span>物流名称：圆通</span></h4>
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
              </el-scrollbar>
            </el-col>

          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-row :gutter="24">
              <el-col :lg="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
                <el-button style="width: 90%; " @click="orderDescLog = false">关闭窗口</el-button>
              </el-col>
            </el-row>
          </span>
        </el-dialog>
        <!--=============查看历史签收详情弹出框   结束 ==============-->

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

  </div>
</template>

<script>
export default {
  name: 'OrderSign',
  data() {
    return {
      reverse: true, // 历史订单签收详情中设置升序还是降序
      orderActivities: [
        {
          orderTime: '2018-04-03 20:46',
          orderDescList: [ // 订单描述信息
            { cast: '店铺名称 ', desc: '小彭家具3' },
            { cast: '商品名称', desc: '小米6x' },
            { cast: '购买数量', desc: '2' },
            { cast: '实付金额', desc: '78' },
            { cast: '商品参数', desc: '红色-4g-6+128' },
            { cast: '订单类型', desc: '已发货' }
          ]
        },
        {
          orderTime: '2018-04-02 20:46',
          orderDescList: [ // 订单描述信息
            { cast: '店铺名称 ', desc: '小彭家具2' },
            { cast: '商品名称', desc: '小米6x' },
            { cast: '购买数量', desc: '2' },
            { cast: '实付金额', desc: '78' },
            { cast: '商品参数', desc: '红色-4g-6+128' },
            { cast: '订单类型', desc: '已发货' }
          ]
        },
        {
          orderTime: '2018-04-01 20:46',
          orderDescList: [ // 订单描述信息
            { cast: '店铺名称 ', desc: '小彭家具1' },
            { cast: '商品名称', desc: '小米6x' },
            { cast: '购买数量', desc: '2' },
            { cast: '实付金额', desc: '78' },
            { cast: '商品参数', desc: '红色-4g-6+128' },
            { cast: '订单类型', desc: '已发货' }
          ]
        }
      ],

      signActivities: [ // 历史签收详情
        { logisticsTime: '2018-04-01 20:46', logisticsNumber: '498984654648484', logisticsName: '圆通' },
        { logisticsTime: '2018-01-01 20:46', logisticsNumber: '498984654648484', logisticsName: '顺丰' },
        { logisticsTime: '2018-03-01 20:46', logisticsNumber: '498984654648484', logisticsName: '圆通' },
        { logisticsTime: '2018-02-01 20:46', logisticsNumber: '498984654648484', logisticsName: '中通' }
      ],
      signDescLog: false, // 历史签收详情弹出框
      orderDescLog: false, // 历史订单详情弹出框
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      logisticsForm: { // 查询用户签收信息form表单
        userName: '', // 用户名称
        phoneNumber: '', // 电话号码
        shopName: '', // 店铺名称
        startDate: '', // 开始时间
        endDate: ''// 结束时间
      },
      signDataList: [
        { userAccount: '123124123123', userName: '刘梓江1', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江2', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江3', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江4', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江5', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江6', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江7', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江8', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江9', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' },
        { userAccount: '123124123123', userName: '刘梓江10', userPid: '362322200004047530', phoneNumber: '15717007490', receiptNumber: '55' }
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
    // 历史订单详情方法
    orderDesc: function(currData) {
      // 获取当前用户对于的历史订单信息

      // 获取后打开对应的订单历史详情弹出框
      this.orderDescLog = true
    },

    // 历史签收详情方法
    signDesc: function(currData) {
      // 获取当前用户对于的历史签收信息

      // 获取后打开对应的签收历史详情弹出框
      this.signDescLog = true
    }
  }
}
</script>

<style >

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #orderSign{
    margin: 30px;
  }

  #orderSign .el-divider span{
    color: #606266;font-weight:bold;
  }
  #orderSign .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }

  #orderSign .el-table th{
    padding: 2px 0px !important;
    padding-left: 10px !important;
    color: #606266 !important;
  }
  #orderSign .el-table td{
    padding: 0px !important;
  }

  #orderSign .el-date-editor{
    width: 105% !important;
  }

  /*对编辑人员信息弹出框设置样式*/
  #orderSign div.el-dialog:nth-child(1){
    margin-top: 30px !important;
  }

  /*对用户基础输入信息模块的form标签设置样式*/
  #orderSign  .el-form-item__content{
    width: 70% !important;
  }

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/

    /*对编辑人员信息弹出框设置样式*/
    #orderSign div.el-dialog:nth-child(1){
      width: 100% !important;
    }

    #orderSign .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/
    /*对编辑人员信息弹出框设置样式*/
    #orderSign div.el-dialog:nth-child(1){
      width: 100% !important;
    }

    #orderSign .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
  }

  /*=======物流详细描述信息css样式开始==========*/

  #orderSign .track-rcol{
    margin-left: 10px;
    width: 90% !important;
  }
  #orderSign .track-list{
    position:relative;
  }
  #orderSign .track-list li{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:1rem;
    border-left:1px solid #d9d9d9;
    color: #999;
  }
  #orderSign .track-list li.first{
    color:red;
    padding-top:0;
    width:100%;
    text-align:left;
    border-left:1px solid #d9d9d9;
  }
  #orderSign .track-list li .node-icon{
    position: absolute;
    left: -5.5px;
    border-radius: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
    top:4px;
    background-color: #999999;
  }
  #orderSign .track-list li.first .node-icon{
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
  #orderSign .track-list li .time{
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
  #orderSign .track-list li .txt{
    position:relative;
    display:inline-block;
    vertical-align:top;
    color: #999;
  }
  #orderSign .track-list li.first .time{
    text-align: left;
    width: 94%;
    color:red;
  }
  #orderSign .track-list li.first .txt{
    color: red;
    text-align:left;
    width: 94%;
  }
  #orderSign .track-list li.finall{
    position:relative;
    padding:0px 0 1.5rem 25px;
    line-height:18px;
    border-color:white;
    border-left:1px solid #ffffff;
    color: #999;
  }
  #orderSign .track-list li.finall .div-spilander{
    width: 1px;
    position: absolute;
    position: absolute;
    left: -1.5px;
    height: 0.5rem;
    background-color: #d9d9d9;
  }
  /*=======物流详细描述信息css样式结束==========*/
</style>
