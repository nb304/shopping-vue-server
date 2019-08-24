
<!--===========商品申请采购模块========-->
<template>
  <div id="productapply">
    <el-form ref="form" :model="productapplyForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="商品名称">
            <el-input v-model="productapplyForm.productName" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 5}" :xs="{span: 24}">
          <el-form-item label="申请描述">
            <el-input v-model="productapplyForm.applyDesc" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span:5}" :xs="{span: 23}">
          <el-form-item label="申请状态">
            <el-select v-model="productapplyForm.applyState" placeholder="选择">
              <el-option label="未审批" value="未审批" />
              <el-option label="已审批" value="未审批" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span:4}" :xs="{span: 24}">
          <el-form-item label="上传图片">
            <el-upload
              ref="upload"
              class="upload-demo"
              :auto-upload="false"
              :on-remove="onRemove"
              :on-change="onChange"
              :file-list="productapplyForm.uploadFile"
              limit="1"
            >
              <el-button slot="trigger" size="small" icon="el-icon-picture" style="width: 100%;" type="primary">选择图片</el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 4}" :xs="{span: 24}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" style="width: 100%;" @click="onSubmit">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <el-tooltip class="item" effect="dark" content="店铺名称" placement="right">
              <svg-icon icon-class="dianpu2" />
            </el-tooltip>
            <span>：小鹏家具</span>
            <el-divider direction="vertical" />
            <span>已受理:900笔</span>
            <el-divider direction="vertical" />
            <span>未受理:400笔</span>
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
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <el-table-column label="申请人" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话号码" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.phoneNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="申请时间" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.applyTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="申请理由" show-overflow-tooltip="true" width="200px" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.applyDesc }}</span>
            </template>
          </el-table-column>

          <el-table-column label="审批状态" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.applyState==1?'已审批':'未审批' }}</span>
            </template>
          </el-table-column>

          <el-table-column label="图片详情" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="600"
                trigger="hover"
              >
                <el-image :src="scope.row.imgUrl">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <el-button slot="reference" style="border: none;color: #409EFF;">查看图片</el-button>
              </el-popover>

            </template>
          </el-table-column>

          <el-table-column label="审批结果" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">

              <el-popover
                v-if="scope.row.applyState==1"
                placement="bottom"
                width="300"
                trigger="hover"
              >
                <h5>审批人名：{{ examineRsult.examineUser }}</h5>
                <h5>审批时间：{{ examineRsult.examineTime }}</h5>
                <h5>审批结果：{{ examineRsult.examineRsult }}</h5>
                <h5>审批描述：{{ examineRsult.examineDesc }}</h5>
                <el-button slot="reference" style="border: none;color: #409EFF;">查看</el-button>
              </el-popover>
              <span v-if="scope.row.applyState==0">无</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="20px" @click.native.prevent="showReviewHandle(scope.row, list)"> 审批</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>

    <!--==================分页组件(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 4, offset: 18}" :xs="{span: 24}">
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

    <!--===================审批操作弹出框(开始)========================-->
    <el-dialog id="review" title="审批操作" :model="reviewForm" :visible.sync="reviewHandleVisible" width="21%">
      <el-form :inline="true" class="demo-form-inline" label-position="left">
        <el-row :gutter="24" style="text-align: left !important;">
          <el-col :lg="{span: 24}" :xs="{span: 23}">
            <el-form-item label="审批">
              <el-select v-model="reviewForm.reviewCast" placeholder="选择">
                <el-option label="通过" value="通过" />
                <el-option label="不通过" value="不通过" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="{span: 24}" :xs="{span: 23}">
            <el-form-item label="描述">
              <el-input v-model="reviewForm.desc" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer ">
        <el-button @click="reviewHandleVisible = false">关 闭</el-button>
        <el-button type="primary" @click="reviewHandleVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--===================审批操作弹出框(结束)========================-->

  </div>
</template>

<script>
export default {
  name: 'Productapply',
  data: function() {
    return {
      reviewHandleVisible: false, // 审批操作弹出框是否打开默认不显示
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      productapplyForm: { // 采购申请要用到的表单信息
        productName: '', // 商品名称
        applyDesc: '', // 申请描述
        applyState: '', // 申请在状态
        uploadFile: null// 上传的图片
      },

      reviewForm: { // 采购审批弹出框
        desc: '', // 描述
        reviewCast: ''// 审批类型
      },
      examineRsult: { // 审批结果信息内容
        examineUser: '小鹏有', // 审批人
        examineTime: '2016-03-10', // 审批时间
        examineRsult: '不通过', // 审批结果
        examineDesc: '这款商品卖完就下架吧' // 审批描述
      },
      list: [
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '0',
          imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '0',
          imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '0',
          imgUrl: ''
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '1',
          imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '0',
          imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '0',
          imgUrl: ''
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '1',
          imgUrl: ''
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '0',
          imgUrl: ''
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '1',
          imgUrl: ''
        },
        {
          userName: '刘梓江',
          phoneNumber: '15717007490',
          applyTime: '2016-03-10',
          productName: '电风扇35k',
          applyDesc: '双十一马上来了库存不足',
          applyState: '0',
          imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }

      ]
    }
  },
  methods: {
    showReviewHandle(currIndex, obj) { // 审批操作方法
      this.reviewHandleVisible = true
    }

  }
}
</script>

<style >

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #productapply{
    margin: 30px;
  }

  #productapply .el-divider span{
    color: #606266;font-weight:bold;
  }

  /*文件上传按钮样式*/
  #productapply .upload-demo .el-upload--text{
     width: 100% !important;
  }

  #productapply .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #productapply .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #productapply .el-table td{
    padding: 0px;
  }

  #productapply div[aria-label="审批操作"] .el-form-item{
      width: 100%;
  }
  #productapply div[aria-label="审批操作"] .el-form-item  .el-form-item__content{
       width: 80%;
  }
  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/

    #productapply .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    #productapply div.el-dialog{  /*对4个弹出框设置样式 */
      width: 80% !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/
    #productapply  .el-form-item{
      width: 100%;
    }
    #productapply  .el-form-item  .el-form-item__content{
      width: 76%;
    }

    #productapply .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    #productapply div.el-dialog{  /*对4个弹出框设置样式 */
      width: 80% !important;
    }

  }
  /*==================自定义自适应css样式详情  结束 ========================*/

</style>
