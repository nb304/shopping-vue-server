<!--======订单资金模板=======-->
<template>

  <div id="capitalOrder" style="margin:30px ;">
    <!--==================表单提交(开始)========================-->
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="订单编号">
            <el-input v-model="form.region" placeholder="请输入订单编号" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="用户名" label-width="140px">
            <el-input v-model="form.region" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="订单状态" label-width="140px">
            <el-select v-model="form.region" placeholder="请选择订单状态">
              <el-option label="全部" value="shanghai" />
              <el-option label="已付款" value="beijing" />
              <el-option label="已签收" value="beijing" />
              <el-option label="运送中" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="提交审核时间" label-width="100px">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择提交审核时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="确认审核时间" label-width="140px">
            <el-date-picker
              v-model="form.date2"
              type="date"
              placeholder="选择确认审核时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}" style="margin-left: 62px">
          <el-form-item label-width="80px">
            <el-button type="primary" style="width: 100%;">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--==================表单提交(开始)========================-->

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <el-divider direction="vertical" />
            <span>时间:2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <!--==================table表格(开始)========================-->
    <el-table :data="tableData" class="title-menu-min" border style="width: 100%">
      <el-table-column prop="brandNumber" label="订单编号" width="170" show-overflow-tooltip="true" />
      <el-table-column prop="newsName" label="用户名" show-overflow-tooltip="true" />
      <el-table-column prop="source" label="付款时间" show-overflow-tooltip="true" />
      <el-table-column prop="shopName" label="订单状态" show-overflow-tooltip="true" />
      <el-table-column prop="deposit" label="付款价格（元）" show-overflow-tooltip="true" />
    </el-table>
    <!--================== table表格(结束) ========================-->

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 5, offset: 17}" :xs="{span: 24}">
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
    <!-- ======================= 分页层 (结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          brandNumber: 'DD1160001160001160',
          newsName: '小彭店铺',
          source: '2019-10-5',
          shopName: '已签收',
          deposit: 122
        },
        {
          brandNumber: 'DD1160001160001160',
          newsName: '小彭店铺',
          source: '2019-10-5',
          shopName: '已签收',
          deposit: 122
        },
        {
          brandNumber: 'DD1160001160001160',
          newsName: '小彭店铺',
          source: '2019-10-5',
          shopName: '已签收',
          deposit: 122
        },
        {
          brandNumber: 'DD1160001160001160',
          newsName: '小彭店铺',
          source: '2019-10-5',
          shopName: '已签收',
          deposit: 122
        }
      ],
      // 表单元素中绑定的数据参数
      form: {
        name: '',
        region: ''
      },
      // 分页数据
      total: 100,
      currentPage: 2
    }
  },
  methods: {
    customerForm() {
      this.customerFormVisible = true
    },

    shoppingSrc(a) {
      alert(`我跳到了${a}中`)
    }
  }
}
</script>

<style>
 @media only screen and (min-width: 310px) and (max-width: 500px) {
    #capitalOrder .el-form-item__content {
      width: 100% !important;
    }

    #capitalOrder .storeTypeSearchForm .el-form-item__content {
      width: 75% !important;
    }
  }

  #capitalOrder .el-form-item__content {
    width: 80%;
  }

  #capitalOrder .el-range-separator {
    width: 10% !important;
  }

  #capitalOrder .el-divider span {
    color: #606266;
    font-weight: bold;
  }

  #capitalOrder .el-table__row th .cell {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0px 0px;
  }

  #capitalOrder .el-table__row th {
    padding: 3px 0px;
    padding-left: 10px;
    color: #606266;

  }

  #capitalOrder .el-table__row td {
    padding: 3px 0;
  }

  #capitalOrder .el-divider span{
  color: #606266;font-weight:bold;
}

#capitalOrder .el-table th .cell{
  word-break: keep-all;
  white-space:nowrap;
  padding: 0px  0px;
}
#capitalOrder .el-table th{
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
#capitalOrder .el-table td{
  padding: 0px;
}
</style>

