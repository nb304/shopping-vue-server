<!--======用户反馈管理模块=======-->
<template>
  <div id="userFeedInfoDiv">

    <!-- ======================= 用户反馈按钮集合 =========================  -->
    <el-form :inline="true" :model="userFeedbackSearchForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 3}" :xs="{span: 8}" style="margin-bottom: 10px;;">
          <el-select v-model="userFeedbackSearchForm.querykey" placeholder="选择查询条件">
            <el-option label="反馈单号" value="shanghai" />
            <el-option label="反馈人用户名" value="beijing" />
          </el-select>
        </el-col>
        <el-col :sm="{span: 5}" :xs="{span: 15}" style="margin-bottom: 10px;;" class="queryValueClass">
          <el-input v-model="userFeedbackSearchForm.queryValue" placeholder="请输入查询条件" />
        </el-col>

        <el-col :sm="{span:9}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-date-picker
            v-model="userFeedbackSearchForm.queryTimes"
            style="width:100%;"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-button type="primary" icon="el-icon-search" style="width: 100% !important;" @click="onSubmit">搜索</el-button>
        </el-col>
      </el-row>

    </el-form>

    <!-- ======================= 用户反馈按钮集合 (结束) =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>共900个反馈</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 用户反馈Table =========================  -->
    <el-row :gutter="24" class="title-menu-min">
      <el-col :sm="{span: 24}" :xs="{span: 24}">

        <el-table :data="userFeedbackDatas" border style="width: 100%">
          <el-table-column prop="userFeedId" label="反馈单号" width="150" />
          <el-table-column label="问题描述" width="100">
            <el-link type="primary" @click="userFeedbackDiaLogFlas.issueDescribeFlag = true">查看信息</el-link>
          </el-table-column>
          <el-table-column prop="userFeedUserName" label="反馈人用户名" width="120" />
          <el-table-column label="反馈附件" width="120">
            <el-link type="primary" @click="userFeedbackDiaLogFlas.lookAccessFlag = true">查看信息</el-link>
          </el-table-column>
          <el-table-column prop="ralationQQEmail" label="联系方式(qq邮箱)" width="220" />
          <el-table-column prop="userFeedTime" label="反馈时间" width="150" />
          <el-table-column prop="state" label="状态" width="100" />
          <el-table-column prop="conductor" label="处理人" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="userFeedbackDiaLogFlas.replyUserMessageFlag = true;">回复</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
    <!-- ======================= 用户反馈Table(结束) =========================  -->

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 5, offset: 18}" :xs="{span: 24}">
        <el-pagination
          background
          layout="prev, pager, next"
          current-page="30"
          :total="total"
          page-size="3"
          small="false"
          style="margin-top: 15px;margin-right: 10px;"
          @current-change="handleSizeChange"
        />
      </el-col>
    </el-row>
    <!-- ======================= 分页层 (结束) =========================  -->

    <!-- ======================= 用户反馈--问题描述 =========================  -->
    <el-dialog
      width="50%"
      :top="productTopHtml"
      custom-class="issueDescribeClass"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="问题描述"
      :visible.sync="userFeedbackDiaLogFlas.issueDescribeFlag"
    >

      <el-row :gutter="24">
        <el-col :sm="{span: 4}" :xs="{span: 24}">
          <el-image
            style="width: 100px; height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="scale-down"
          />
        </el-col>
        <el-col :sm="{span: 20}" :xs="{span: 24}">
          <el-divider content-position="left">用户名称</el-divider>
          <el-link type="primary">鹿七七</el-link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>时间：2019-07-06 15:51</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-divider content-position="left">问题描述</el-divider>
        <el-col :sm="{span: 24}" :xs="{span: 24}">
          <el-card class="box-card title-menu-min" style="width:100%; max-height: 18.75rem;">
            <span style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </span>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :sm="{span: 4}" :xs="{span: 24}">
          <el-button type="primary" style="width: 100% !important; margin-top: 10px;" @click="issueDescribeTolookAccess">查看附件</el-button>
        </el-col>
        <el-col :sm="{span: 4}" :xs="{span: 24}">
          <el-button type="primary" style="width: 100% !important; margin-top: 10px;" @click="replayUser">回复</el-button>
        </el-col>
        <el-col :sm="{span: 4}" :xs="{span: 24}">
          <el-button type="primary" style="width: 100% !important; margin-top: 10px;" @click="onSubmit">删除反馈</el-button>
        </el-col>
        <el-col :sm="{span: 4}" :xs="{span: 24}">
          <el-button style="width: 100% !important; margin-top: 10px;" @click="userFeedbackDiaLogFlas.issueDescribeFlag = false">关闭窗口</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- ======================= 用户反馈--问题描述(结束) =========================  -->

    <!-- ======================= 用户反馈--查询附件 =========================  -->
    <el-dialog
      width="50%"
      custom-class="issueDescribeClass"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="查看附件"
      :visible.sync="userFeedbackDiaLogFlas.lookAccessFlag"
    >
      <el-table :data="AccessDatas" border style="width: 100%">
        <el-table-column prop="accessName" label="附件名称" min-width="150" show-overflow-tooltip="true" />
        <el-table-column prop="accessDesc" label="附件描述" width="220" show-overflow-tooltip="true" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row :gutter="24">
        <el-col :sm="{span: 4}" :xs="{span: 24}">
          <el-button style="width: 100% !important; margin-top: 10px;" @click="userFeedbackDiaLogFlas.lookAccessFlag = false">关闭窗口</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- ======================= 用户反馈--查看附件(结束) =========================  -->

    <!-- ======================= 用户反馈--回复用户 =========================  -->

    <el-dialog
      width="400px"
      custom-class="issueDescribeClass"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="回复"
      :visible.sync="userFeedbackDiaLogFlas.replyUserMessageFlag"
    >

      <el-divider content-position="left">回复用户: {{ replayData.username }}</el-divider>
      <el-row :gutter="24">
        <el-col :sm="{span: 24}" :xs="{span: 24}">
          <el-input v-model="replayData.content" type="textarea" style="width: 100%;" />
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button style="width: 100% !important; margin-top: 10px;" type="primary" @click="userFeedbackDiaLogFlas.replyUserMessageFlag = false">回复</el-button>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button style="width: 100% !important; margin-top: 10px;" @click="userFeedbackDiaLogFlas.replyUserMessageFlag = false">关闭窗口</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- ======================= 用户反馈--回复用户(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 回复用户数据
      replayData: {
        username: '鹿七七',
        content: ''
      },
      // 附件数据集合
      AccessDatas: [{
        accessId: '1',
        accessName: '附件1',
        accessDesc: 'xxxxxxxxxx'
      }],
      // 弹出层信息距离网页头顶的距离
      productTopHtml: '10vh',
      // 用户反馈弹出层Flag
      userFeedbackDiaLogFlas: {
        // 问题描述FLag
        issueDescribeFlag: false,
        // 查看附件
        lookAccessFlag: false,
        // 回复消息
        replyUserMessageFlag: false
      },
      // 用户反馈数据集合
      userFeedbackDatas: [{
        userFeedId: '1',
        userFeedUserName: 'luqiqi',
        ralationQQEmail: '2246483156@qq.com',
        userFeedTime: '2019-08-06 15:00',
        state: '暂未处理',
        conductor: '鹿七七'
      },
      {
        userFeedId: '1',
        userFeedUserName: 'luqiqi',
        ralationQQEmail: '2246483156@qq.com',
        userFeedTime: '2019-08-06 15:00',
        state: '暂未处理',
        conductor: '鹿七七'
      },
      {
        userFeedId: '1',
        userFeedUserName: 'luqiqi',
        ralationQQEmail: '2246483156@qq.com',
        userFeedTime: '2019-08-06 15:00',
        state: '暂未处理',
        conductor: '鹿七七'
      },
      {
        userFeedId: '1',
        userFeedUserName: 'luqiqi',
        ralationQQEmail: '2246483156@qq.com',
        userFeedTime: '2019-08-06 15:00',
        state: '暂未处理',
        conductor: '鹿七七'
      }
      ],
      // 分页条数
      total: 100,
      // 日期快捷键
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '关闭',
          onClick(picker) {
            picker.$emit('pick', ['', ''])
          }
        }]
      },
      // 用户反馈搜索表单
      userFeedbackSearchForm: {
        querykey: '',
        queryValue: '',
        queryTimes: []
      },
      // 页面的长宽
      screenWidth: '',
      screenHeight: ''
    }
  },
  created() {
    // 初始化方法 vue组件初始化完成,网页未完成
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
    if (this.screenWidth <= 500) {
      this.productTopHtml = '1vh'
    } else {
      this.productTopHtml = '10vh'
    }
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        // 判断宽度是否小于500 小于500 全部全屏显示
        if (this.screenWidth <= 500) {
          this.productTopHtml = '1vh'
        } else {
          this.productTopHtml = '10vh'
        }
      })()
    }
  },
  methods: {
    // 从问题描述那回复用户
    replayUser() {
      this.userFeedbackDiaLogFlas.issueDescribeFlag = false
      this.userFeedbackDiaLogFlas.replyUserMessageFlag = true
    },
    // 从问题描述那查看附件
    issueDescribeTolookAccess() {
      this.userFeedbackDiaLogFlas.issueDescribeFlag = false
      this.userFeedbackDiaLogFlas.lookAccessFlag = true
    }
  }
}
</script>

<style>
	#userFeedInfoDiv .el-range-separator {
		width: 10% !important;
	}

	#userFeedInfoDiv .el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	#userFeedInfoDiv .el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	#userFeedInfoDiv .el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	#userFeedInfoDiv .el-form-item .el-form-item__content .addProductFormInput .el-input__inner,

	#userFeedInfoDiv .autocut {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		-icab-text-overflow: ellipsis;
		-khtml-text-overflow: ellipsis;
		-moz-text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
	}

	/*新加入隐藏滚动条效果*/
	#userFeedInfoDiv .title-menu-min2 {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#userFeedInfoDiv .title-menu-min2::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#userFeedInfoDiv .title-menu-min2::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#userFeedInfoDiv .title-menu-min2::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*新加入隐藏滚动条效果*/
	#userFeedInfoDiv .title-menu-min {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#userFeedInfoDiv .title-menu-min::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#userFeedInfoDiv .title-menu-min::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#userFeedInfoDiv .title-menu-min::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*==================自定义自适应css 宽度 1301 -- 2000px========================*/
	@media only screen and (min-width: 1301px) and (max-width: 2000px) {}

	@media only screen and (min-width: 300px) and (max-width: 409px) {
		#userFeedInfoDiv .issueDescribeClass {
			width: 100% !important;
		}

	#userFeedInfoDiv 	.productBrandInputClass {
			width: 170px !important;
		}

		#userFeedInfoDiv .spuDialogClass {
			max-height: 300px;
		}

	#userFeedInfoDiv 	.addAndClose {
			margin-top: 10px !important;
		}

		#userFeedInfoDiv .fixedClass {
			position: absolute;
			top: 100px;
		}

		#userFeedInfoDiv .spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#userFeedInfoDiv .SpusClass {
			width: 270px !important;
		}

		/*  添加商品的css  */
		#userFeedInfoDiv .addProduct .el-dialog {
			width: 330px !important;
		}

		#userFeedInfoDiv .addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 500px) {
		#userFeedInfoDiv .issueDescribeClass {
			width: 100% !important;
		}

		#userFeedInfoDiv .queryValueClass {
			padding-left: 0px !important;
			padding-right: 0px !important;
		}

	#userFeedInfoDiv 	.productSkuInfoDialog {
			width: 100% !important;
		}

		#userFeedInfoDiv .productCommentInfoClass {
			width: 100% !important;
		}

		#userFeedInfoDiv .SpusClass button {
			margin-top: 0.625rem !important;
		}

		#userFeedInfoDiv .spuDialogClass {
			max-height: 300px;
		}

		#userFeedInfoDiv .addAndClose {
			margin-top: 10px !important;
		}

		#userFeedInfoDiv .fixedClass {
			position: absolute;
			top: 100px;
		}

		#userFeedInfoDiv .spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#userFeedInfoDiv .SpusClass {
			width: 330px !important;
		}

		/*  添加商品的css  */
		#userFeedInfoDiv .addProduct .el-dialog {
			width: 400px !important;
		}

		#userFeedInfoDiv .addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 1300px) {

		#userFeedInfoDiv .el-form .el-form-item .SpuInput .el-input__inner {
			width: 100px !important;
		}

		#userFeedInfoDiv .el-form .el-form-item .SpuInput2 .el-input__inner {
			width: 100px !important;
		}

		/*  添加商品的css结束  */
		#userFeedInfoDiv .el-form .el-form-item .el-input__inner {
			width: 250px;
		}

		#userFeedInfoDiv .el-form .el-row {
			margin: 0 auto;
			text-align: center;
		}

		#userFeedInfoDiv .el-col-xs-23 {
			width: 100%;
		}

		#userFeedInfoDiv .el-form-item .el-button {
			width: 250px !important;
		}

		#userFeedInfoDiv .el-divider span {
			font-size: 11px;
		}

		/* .myItem{
			width: 100% !important;
		}
		.myItem .el-form-item__label{
			width: 66px;
			padding: 0px;
			text-align: left;
		} */
	}

	#userFeedInfoDiv .el-divider span {
		color: #606266;
		font-weight: bold;
	}

	#userFeedInfoDiv .el-table__row th .cell {
		word-break: keep-all;
		white-space: nowrap;
		padding: 0px 0px;
	}

	#userFeedInfoDiv .el-table__row th {
		padding: 3px 0px;
		padding-left: 10px;
		color: #606266;

	}

	#userFeedInfoDiv .el-table__row td {
		padding: 3px 0;
	}

	#userFeedInfoDiv {
		margin: 30px;
	}
</style>
