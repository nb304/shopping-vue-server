<!--======店铺资金模板=======-->
<template>
  <div id="capitalShop" style="margin:30px;">
    <!--==================表单提交(开始)========================-->
    <el-form ref="form" :model="form" label-width="80px">

      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="店铺名称">
            <el-input v-model="form.region" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}" style="padding:0">
          <el-form-item label="提交审核时间" label-width="130px">
            <el-date-picker
              type="date"
              placeholder="选择提交审核时间"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}" style="padding: 0;">
          <el-form-item label="确认审核时间" label-width="190px">
            <el-date-picker
              type="date"
              placeholder="选择确认审核时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 3}" :xs="{span: 24}">
          <el-form-item label-width="140px">
            <el-button type="primary" style="width: 100% ;" @click="deleteEvaluate">查询</el-button>
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
      <el-table-column prop="brandNumber" label="编号" width="100" show-overflow-tooltip="true" />
      <el-table-column prop="newsName" label="店铺名称" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="source" label="用户名称" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shopName" label="提交审核时间" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="newsDescribe" label="确认审核时间" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="deposit" label="押金(元)" show-overflow-tooltip="true"></el-table-column>

      <el-table-column fixed="right" label="操作" width="150" style="padding: 3px 0;">
        <template slot-scope="scope">
          <el-button type="text" size="primary">删除</el-button>
        </template>
      </el-table-column>
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
          brandNumber: "001",
          newsName: "小彭店铺",
          source: "王小虎",
          shopName: "2019-10-5",
          newsDescribe: "2019-10-10",
          deposit: 122,
        },
        {
           brandNumber: "002",
          newsName: "小刘子",
          source: "王小虎",
          shopName: "2019-10-5",
          newsDescribe: "2019-10-15",
          deposit: 122,
        },
        {
         brandNumber: "003",
          newsName: "小刘子",
          source: "王小虎",
          shopName: "2019-10-5",
          newsDescribe: "2019-10-15",
          deposit: 122,
        },
        {
           brandNumber: "004",
          newsName: "小刘子",
          source: "王小虎",
          shopName: "2019-10-5",
          newsDescribe: "2019-10-15",
          deposit: 122,
        }
      ],
      // 表单元素中绑定的数据参数
      form: {
        name: "",
        region: ""
      },
      // 分页数据
      total: 100,
      currentPage: 2
    };
  },
  methods: {
    customerForm() {
      this.customerFormVisible = true;
    },

    shoppingSrc(a) {
      alert(`我跳到了${a}中`);
    }
  }
};
</script>

<style>
@media only screen and (min-width: 310px) and (max-width: 500px) {
    #capitalShop .el-form-item__content {
      width: 100% !important;
    }

    #capitalShop .storeTypeSearchForm .el-form-item__content {
      width: 75% !important;
    }
  }

  #capitalShop .el-form-item__content {
    width: 80%;
  }

  #capitalShop .el-range-separator {
    width: 10% !important;
  }

  #capitalShop .el-divider span {
    color: #606266;
    font-weight: bold;
  }

  #capitalShop .el-table__row th .cell {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0px 0px;
  }

  #capitalShop .el-table__row th {
    padding: 3px 0px;
    padding-left: 10px;
    color: #606266;

  }

  #capitalShop .el-table__row td {
    padding: 3px 0;
  }
  #capitalShop .el-divider span{
  color: #606266;font-weight:bold;
}

#capitalShop .el-table th .cell{
  word-break: keep-all;
  white-space:nowrap;
  padding: 0px  0px;
}
#capitalShop .el-table th{
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
#capitalShop .el-table td{
  padding: 0px;
}
</style>


