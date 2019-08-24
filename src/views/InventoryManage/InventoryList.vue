<!--======库存管理列表模块=======-->
<template>
  <div id="inventoryList">
    <el-form ref="form" :model="inventoryListForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="商品名称">
            <el-input v-model="inventoryListForm.productName" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="商品名称">
            <el-input v-model="inventoryListForm.productNumber" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker
              v-model="inventoryListForm.startDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker
              v-model="inventoryListForm.endDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
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

            <el-tooltip class="item" effect="dark" content="商品总数量" placement="right" style="margin-left:10px">
              <i class="el-icon-menu" />
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
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <el-table
          v-loading="listLoading"
          :data="inventoryList"
          element-loading-text="Loading"
        >

          <el-table-column label="序号" show-overflow-tooltip="true" header-align="left" align="center" width="70px">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>

          <el-table-column label="商品编号" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.productNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品名称" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="已销售金额" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.salesAmount }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品总数量" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.totalNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="已销售数量" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.salesNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="可售数量" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.totalNumber-scope.row.salesNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品状态" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.productState }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true" width="150px" header-align="center" align="center">
            <template slot="header" slot-scope="scope">
              <span>库存操作记录</span>
              <el-tooltip class="item" effect="dark" content="历史入库记录" placement="right">
                <i class="el-icon-s-order" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="inventoryListDesc(scope.row, list)"
              >
                库存历史详情
              </el-button>
              <span />
            </template>
          </el-table-column>

          <el-table-column label="操作" width="100px" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="20px" @click.native.prevent="inventoryHandel(scope.row, list)">编辑库存</el-button>
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

    <!--=============查看库存历史详情弹出框   开始 ==============-->
    <el-dialog
      title="历史订单"
      :visible.sync="inventoryHistoryLog"
      width="35%"
    >
      <el-scrollbar style="height:400px;width: 90%;margin: 0 auto">
        <div class="radio">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="true">倒序</el-radio>
            <el-radio :label="false">正序</el-radio>
          </el-radio-group>
        </div>
        <el-timeline style="height:500px;width: 90%;margin: 10px auto" :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in inventoryHistoryList"
            :key="index"
            color="#8080ff"
            :timestamp="activity.handleTime"
            placement="top"
          >
            <el-card shadow="hover">
              <el-table
                v-loading="listLoading"
                :data="activity.handleData"
                element-loading-text="Loading"
              >
                <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cast }}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="created_at" label="描述" show-overflow-tooltip="true">
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
          <el-col :lg="{span: 8,offset:16}" :xs="{span: 24}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="inventoryHistoryLog = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <!--=============查看库存历史详情弹出框   结束 ==============-->

    <!--============== 编辑库存操作弹出框 开始===============-->
    <el-dialog
      title="编辑库存"
      :visible.sync="updateInventoryLog"
      width="20%"
    >
      <el-form ref="form" :model="updateInventoryForm" label-width="70px">
        <el-row :gutter="24">

          <!--     updateNumber: '', // 操作库存数量
          updateDesc: '', // 操作描述
          updateState: ''// 操作状态-->
          <el-col :lg="{span: 24}" :xs="{span: 24}">
            <el-form-item label="操作数量">
              <el-input v-model="updateInventoryForm.updateNumber" />
            </el-form-item>
          </el-col>

          <el-col :lg="{span: 24}" :xs="{span: 24}">
            <el-form-item label="操作描述">
              <el-input v-model="updateInventoryForm.updateDesc" />
            </el-form-item>
          </el-col>

          <el-col :lg="{span: 24}" :xs="{span: 24}">

            <el-form-item label="操作类型">
              <el-radio-group v-model="updateInventoryForm.updateState">
                <el-radio label="出库" value="1" />
                <el-radio label="入库" value="0" />
              </el-radio-group>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateInventoryLog = false">取 消</el-button>
        <el-button type="primary" @click="updateInventoryLog = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--============== 编辑库存操作弹出框 结束===============-->

  </div>
</template>

<script>
export default {
  name: 'InventoryList',
  data() {
    return {
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      reverse: true, // 库存历史详情中设置升序还是降序
      inventoryHistoryLog: false, // 库存历史弹出框默认关闭
      updateInventoryLog: false, // 编辑库存弹出框默认关闭
      inventoryListForm: { // 库存管理列表搜索要用的form表单
        productName: '', // 商品名称
        productNumber: '', // 商品编号
        startDate: '', // 开始时间
        endDate: ''// 结束时间
      },
      updateInventoryForm: { // 操作库存要用的form表单
        updateNumber: '', // 操作库存数量
        updateDesc: '', // 操作描述
        updateState: ''// 操作状态

      },

      inventoryList: [ // 商品库存信息列表
        // productName: '', // 商品名称
        // productNumber: '', // 商品编号
        // totalNumber: '', // 商品总数量
        // salesNumber:'',//以销售数量
        // salesAmount: '', // 销售金额
        // productState: ''// 商品状态
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' },
        { productName: '小米6x', productNumber: '449845465648', salesNumber: '50', totalNumber: '2000', salesAmount: '56446', productState: '下架' }
      ],
      inventoryHistoryList: [ // 库存列表信息
        {
          handleTime: '2019-7-6',
          handleData: [
            { cast: '操作类型', desc: '出库' },
            { cast: '操作时间', desc: '2019-7-6' },
            { cast: '操作数量', desc: '10' },
            { cast: '操作人名', desc: '刘梓将' },
            { cast: '联系方式', desc: '123141231' },
            { cast: '入库描述', desc: '迎战双十一' }
          ]
        },
        {
          handleTime: '2019-7-5',
          handleData: [
            { cast: '操作类型', desc: '入库' },
            { cast: '操作时间', desc: '2019-7-5' },
            { cast: '操作数量', desc: '10' },
            { cast: '操作人名', desc: '刘梓将' },
            { cast: '联系方式', desc: '123141231' },
            { cast: '入库描述', desc: '迎战双十一' }
          ]
        },
        {
          handleTime: '2019-7-4',
          handleData: [
            { cast: '操作类型', desc: '出库' },
            { cast: '操作时间', desc: '2019-7-4' },
            { cast: '操作数量', desc: '10' },
            { cast: '操作人名', desc: '刘梓将' },
            { cast: '联系方式', desc: '123141231' },
            { cast: '入库描述', desc: '迎战双十一' }
          ]
        }

      ]

    }
  },

  methods: {
    inventoryHandel: function() { // 编辑库存方法
      // 开启编辑库存弹出框
      this.updateInventoryLog = true
    },

    inventoryListDesc: function() { // 历史入库方法
      // 获取当前商品对应的库存操作数据

      // 获取后打开对应的历史库存操作弹出框
      this.inventoryHistoryLog = true
    }
  }
}
</script>

<style >
  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #inventoryList{
    margin: 30px;
  }

  #inventoryList .el-col-lg-5 {
    width: 19.83333%;
  }

  #inventoryList .el-divider span{
    color: #606266;font-weight:bold;
  }

  #inventoryList .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #inventoryList .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #inventoryList .el-table td{
    padding: 0px;
  }

  #inventoryList div[role="dialog"]{
    margin-top: 30px !important;
  }

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/
    #inventoryList .el-col-xs-24 {
      width: 100% !important;
    }

    #inventoryList div.el-dialog{
      width: 90% !important;
    }

    #inventoryList .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/
    #inventoryList .el-col-xs-24 {
      width: 100% !important;
    }

    #inventoryList div.el-dialog{
      width: 90% !important;
    }

    #inventoryList .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }

  }

</style>
