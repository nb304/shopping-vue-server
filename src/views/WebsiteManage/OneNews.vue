<!--======单页新闻模块=======-->
<template>
  <div id="OneNews" style="margin:30px ;">
    <!--==================表单提交(开始)========================-->
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-row :gutter="24">
        <el-col :sm="{span: 7}" :xs="{span: 24}">
          <el-form-item label="新闻名称" placeholder="请选择活动区域">
            <el-input v-model.trim="form.newsName" placeholder="输入新闻名称" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 7}" :xs="{span: 23}">
          <el-form-item label="新闻来源" placeholder="请选择活动区域">
            <el-input v-model.trim="form.newsForm" placeholder="输入新闻来源" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" style="width: 100% !important;" @click="checkNews">查询</el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" style="width: 100% !important;" @click="addNews()">添加</el-button>
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
      <el-table-column prop="newsName" label="新闻名称" width="100" show-overflow-tooltip="true" />
      <el-table-column prop="source" label="新闻来源" width="100" show-overflow-tooltip="true" />
      <el-table-column prop="shopName" label="店铺名称" show-overflow-tooltip="true" />
      <el-table-column label="新闻图片" width="120" prop="brandLogoUrl">
        <div slot-scope="scope">
          <el-image
            style="width: 100px; height: 30px;cursor: pointer;"
            :src="scope.row.brandLogoUrl"
          />
        </div>
      </el-table-column>
      <el-table-column prop="stateTime" label="上架时间" show-overflow-tooltip="true" />
      <el-table-column prop="endTime" label="下架时间" show-overflow-tooltip="true" />
      <el-table-column label="新闻跳转链接" width="140" show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span @click="shoppingSrc(scope.row.brandNumber)">{{ scope.row.shopSrc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="newsDescribe" label="描述" show-overflow-tooltip="true" />
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
        <el-form ref="formName" :rules="rules" :model="form" label-width="80px">
          <el-col :span="10">
            <el-form-item label="新闻名称" prop="addNewsName">
              <el-input v-model.trim="form.addNewsName" placeholder="请输入新闻名称" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="新闻来源" prop="addNewsFrom">
              <el-input v-model.trim="form.addNewsFrom" placeholder="请输入新闻来源" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="店铺名称" prop="addNewsShop">
              <el-input v-model.trim="form.addNewsShop" placeholder="请输入店铺名称" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品链接" prop="addNewsUrl">
              <el-input v-model.trim="form.addNewsUrl" placeholder="请输入商品链接" />
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="新闻图片">
              <!-- <el-input v-model.trim="form.num" placeholder="请输入新闻图片"></el-input> -->
              <el-upload
                ref="upload"
                class="upload-demo"
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
            <el-col :span="8" style="padding:0">
              <el-form-item label="活动时间" prop="startDate">
                <el-date-picker
                  v-model.trim="form.startDate"
                  type="date"
                  placeholder="选择开始日期"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>

            <el-col :span="8" style="padding: 0;">
              <el-form-item label="活动时间" prop="endDate">
                <el-date-picker
                  v-model.trim="form.endDate"
                  type="date"
                  placeholder="选择结束日期"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-form-item label="新闻描述" prop="addNewsDescribe">
              <el-input v-model.trim="form.addNewsDescribe" type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="newsFormVisibleSync('formName')">立即创建</el-button>
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
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      newsFormVisible: false, // 添加新闻弹窗
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
        newsName: '', // 查询新闻名称
        newsForm: '', // 查询新闻来源
        addNewsName: '', // 添加新闻名称
        addNewsFrom: '', // 添加新闻来源
        addNewsShop: '', // 添加新闻店铺名
        addNewsUrl: '', // 添加新闻跳转地址
        startDate: '', // 添加新闻开始时间
        endData: '', // 添加新闻结束时间
        addNewsDescribe: '' // 添加新闻描述
        // imgfile: this.$refs.upload.submit(),
      },
      rules: {
        newsName: [
          { required: true, message: '新闻名称不能为空', trigger: 'blur' }
        ],
        // 表单正则验证
        addNewsName: [
          { required: true, message: '新闻名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '新闻名称为20个字符以内',
            trigger: 'blur'
          }
        ],
        addNewsFrom: [
          { required: true, message: '新闻店铺名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '新闻名称为20个字符以内',
            trigger: 'blur'
          }
        ],
        addNewsShop: [
          { required: true, message: '新闻来源不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '新闻来源为10个字符以内',
            trigger: 'blur'
          }
        ],
        addNewsUrl: [
          { required: true, message: '跳转地址不能为空', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endData: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],
        addNewsDescribe: [
          { required: true, message: '新闻描述不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 120,
            message: '新闻名称为120个字符以内',
            trigger: 'blur'
          }
        ]
      },
      // 分页数据
      total: 100,
      currentPage: 2
    }
  },
  methods: {
    addNews() {
      this.newsFormVisible = true
    },

    // 添加新闻
    newsFormVisibleSync(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('新增成功')
          alert(
            `${this.form.addNewsName}--${this.form.addNewsFrom}--${this.form.addNewsShop}--${this.form.addNewsUrl}--${this.form.startDate}--${this.form.endData}--${this.form.addNewsDescribe}`
          )
          this.newsFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 查询新闻
    checkNews(e) {
      alert(`${this.form.newsName}--${this.form.newsForm}`)
    }
  }
}
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

