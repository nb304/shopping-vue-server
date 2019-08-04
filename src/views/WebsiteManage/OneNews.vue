<!--======单页新闻模块=======-->
<template>
  <div id="OneNews" style="margin:30px ;">
    <!--==================表单提交(开始)========================-->
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="24">
        <el-col :sm="{span: 7}" :xs="{span: 24}">
          <el-form-item label="新闻名称" placeholder="请选择活动区域">
            <el-input v-model="form.name" placeholder="输入新闻名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="新闻来源" placeholder="请选择活动区域">
            <el-input v-model="form.region" placeholder="输入新闻来源"></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" style="width: 100% !important;" @click="deleteEvaluate">查询</el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" style="width: 100% !important;" @click="newsForm()">添加</el-button>
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
      <el-table-column prop="newsName" label="新闻名称" width="100" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="source" label="新闻来源" width="100" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shopName" label="店铺名称" show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="新闻图片" width="120" prop="brandLogoUrl">
        <div slot-scope="scope">
          <el-image
            style="width: 100px; height: 30px;cursor: pointer;"
            :src="scope.row.brandLogoUrl"
          />
        </div>
      </el-table-column>
      <el-table-column prop="stateTime" label="上架时间" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="endTime" label="下架时间" show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="新闻跳转链接" width="140" show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span @click="shoppingSrc(scope.row.brandNumber)">{{ scope.row.shopSrc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="newsDescribe" label="描述" show-overflow-tooltip="true"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="primary">停用</el-button>
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

    <!-- ======================= 新增新闻页面弹出层(结束) =========================  -->

    <el-dialog title="添加新闻" :visible.sync="newsFormVisible">
      <el-row :gutter="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="10">
            <el-form-item label="新闻名称">
              <el-input v-model="form.hig" placeholder="请输入新闻名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="新闻来源">
              <el-input v-model="form.num" placeholder="请输入新闻来源"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="店铺名称">
              <el-input v-model="form.num" placeholder="请输入店铺名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品链接">
              <el-input v-model="form.num" placeholder="请输入商品链接"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="新闻图片">
              <!-- <el-input v-model="form.num" placeholder="请输入新闻图片"></el-input> -->
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :limit="1"
              >
                <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                <!-- <el-button
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload"
                >上传到服务器</el-button>-->
                <div slot="tip" class="el-upload__tip">只能上传jpg/png图片一张</div>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="活动时间">
              <el-col :span="8" style="padding:0">
                <el-date-picker
                  type="date"
                  placeholder="选择开始日期"
                  v-model="form.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="8" style="padding: 0;">
                <el-date-picker
                  type="date"
                  placeholder="选择结束日期"
                  v-model="form.date2"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="新闻描述">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="newsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newsFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ======================= 新增新闻页面弹出层(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文件图片
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      newsFormVisible: false, // 添加新闻弹窗
      // 表格数据
      tableData: [
        {
          brandNumber: "001",
          newsName: "2016-05-02",
          source: "王小虎",
          shopName: "上海市普陀区金沙江路 1518 弄",
          brandLogoUrl: "http://39.105.41.2:8080/uec//media/file//timg13.gif",
          stateTime: "2016-05-02",
          endTime: "2016-05-02",
          shopSrc: "点我",
          newsDescribe: " .... "
        },
        {
          brandNumber: "002",
          newsName: "2016-05-02",
          source: "王小虎",
          shopName: "上海市普陀区金沙江路 1518 弄",
          brandLogoUrl: "http://39.105.41.2:8080/uec//media/file//timg13.gif",
          stateTime: "2016-05-02",
          endTime: "2016-05-02",
          shopSrc: "点我",
          newsDescribe: " .... "
        },
        {
          brandNumber: "003",
          newsName: "2016-05-02",
          source: "王小虎",
          shopName: "上海市普陀区金沙江路 1518 弄",
          brandLogoUrl: "http://39.105.41.2:8080/uec//media/file//timg13.gif",
          stateTime: "2016-05-02",
          endTime: "2016-05-02",
          shopSrc: "点我",
          newsDescribe: " .... "
        },
        {
          brandNumber: "004",
          newsName: "2016-05-02",
          source: "王小虎",
          shopName: "上海市普陀区金沙江路 1518 弄",
          brandLogoUrl: "http://39.105.41.2:8080/uec//media/file//timg13.gif",
          stateTime: "2016-05-02",
          endTime: "2016-05-02",
          shopSrc: "点我",
          newsDescribe: " .... "
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
    newsForm() {
      this.newsFormVisible = true;
    },

    shoppingSrc(a) {
      alert(`我跳到了${a}中`);
    }
  }
};
</script>

<style>
@media only screen and (min-width: 310px) and (max-width: 500px) {
  #OneNews .el-form-item__content {
    width: 100% !important;
  }

  #OneNews .storeTypeSearchForm .el-form-item__content {
    width: 75% !important;
  }
}

#OneNews .el-form-item__content {
  width: 80%;
}

#OneNews .el-range-separator {
  width: 10% !important;
}

#OneNews .el-divider span {
  color: #606266;
  font-weight: bold;
}

#OneNews .el-table__row th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}

#OneNews .el-table__row th {
  padding: 3px 0px;
  padding-left: 10px;
  color: #606266;
}

#OneNews .el-table__row td {
  padding: 3px 0;
}

#OneNews .el-divider span {
  color: #606266;
  font-weight: bold;
}

#OneNews .el-table th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}
#OneNews .el-table th {
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
#OneNews .el-table td {
  padding: 0px;
}
</style>


