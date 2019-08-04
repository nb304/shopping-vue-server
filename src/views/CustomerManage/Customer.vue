<!--======在线售后客服模板=======-->
<template>

  <div id="customer" style="margin:30px ;">
    <!--==================表单提交(开始)========================-->
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="24">
        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="客服名称">
            <el-input v-model="form.region" placeholder="输入客服名称" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" style="width: 100% !important;" @click="deleteEvaluate">查询</el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" style="width: 100% !important;" @click="customerForm()">添加</el-button>
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
      <el-table-column prop="brandNumber" label="编号" width="60" show-overflow-tooltip="true" />
      <el-table-column prop="newsName" label="客服名称" show-overflow-tooltip="true" />
      <el-table-column prop="source" label="客服昵称" show-overflow-tooltip="true" />
      <el-table-column prop="shopName" label="客服联系方式" min-width="120" show-overflow-tooltip="true" />
      <el-table-column prop="shopName" label="管理范围" show-overflow-tooltip="true" />

      <el-table-column fixed="right" label="操作" min-width="60" max-width="120">
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

    <!-- ======================= 添加客服弹出层(结束) =========================  -->
    <el-dialog title="添加新闻" :visible.sync="customerFormVisible">
      <el-row :gutter="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="10">
            <el-form-item label="客服名称">
              <el-input v-model="form.tiele" placeholder="请输入客服名称" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客服昵称">
              <el-input v-model="form.hig" placeholder="请输入客服昵称" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="管理范围">
              <el-input v-model="form.num" placeholder="请输入管理的范围" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客服号码">
              <el-input v-model="form.hig" placeholder="请输入客服号码" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="customerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="customerFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ======================= 添加客服弹出层(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文件图片
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      customerFormVisible: false, // 添加新闻弹窗
      // 表格数据
      tableData: [
        {
          brandNumber: '001',
          newsName: '2016-05-02',
          source: '王小虎',
          shopName: '上海市普陀区金沙江路 1518 弄',
          brandLogoUrl: 'http://39.105.41.2:8080/uec//media/file//timg13.gif',
          stateTime: '2016-05-02',
          endTime: '2016-05-02',
          shopSrc: '点我',
          newsDescribe: ' .... '
        },
        {
          brandNumber: '002',
          newsName: '2016-05-02',
          source: '王小虎',
          shopName: '上海市普陀区金沙江路 1518 弄',
          brandLogoUrl: 'http://39.105.41.2:8080/uec//media/file//timg13.gif',
          stateTime: '2016-05-02',
          endTime: '2016-05-02',
          shopSrc: '点我',
          newsDescribe: ' .... '
        },
        {
          brandNumber: '003',
          newsName: '2016-05-02',
          source: '王小虎',
          shopName: '上海市普陀区金沙江路 1518 弄',
          brandLogoUrl: 'http://39.105.41.2:8080/uec//media/file//timg13.gif',
          stateTime: '2016-05-02',
          endTime: '2016-05-02',
          shopSrc: '点我',
          newsDescribe: ' .... '
        },
        {
          brandNumber: '004',
          newsName: '2016-05-02',
          source: '王小虎',
          shopName: '上海市普陀区金沙江路 1518 弄',
          brandLogoUrl: 'http://39.105.41.2:8080/uec//media/file//timg13.gif',
          stateTime: '2016-05-02',
          endTime: '2016-05-02',
          shopSrc: '点我',
          newsDescribe: ' .... '
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
    #customer .el-form-item__content {
      width: 100% !important;
    }

    #customer .storeTypeSearchForm .el-form-item__content {
      width: 75% !important;
    }
  }

  #customer .el-form-item__content {
    width: 80%;
  }

  #customer .el-range-separator {
    width: 10% !important;
  }

  #customer .el-divider span {
    color: #606266;
    font-weight: bold;
  }

  #customer .el-table__row th .cell {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0px 0px;
  }

  #customer .el-table__row th {
    padding: 3px 0px;
    padding-left: 10px;
    color: #606266;

  }

  #customer .el-table__row td {
    padding: 3px 0;
  }
  #customer .el-divider span{
  color: #606266;font-weight:bold;
}

#customer .el-table th .cell{
  word-break: keep-all;
  white-space:nowrap;
  padding: 0px  0px;
}
#customer .el-table th{
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
#customer .el-table td{
  padding: 0px;
}
</style>

