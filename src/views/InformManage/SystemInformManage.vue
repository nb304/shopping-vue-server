
<!--======网站通知管理模块=======-->
<template>
  <div id="systenInfo">

    <!-- ======================= 用户反馈按钮集合  =========================  -->
    <el-form :inline="true" :model="userFeedbackSearchForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 4}" :xs="{span: 23}" style="margin-bottom: 10px;;">
          <el-select v-model="systemInformSearchForm.querykey" style="width:100% !important;" placeholder="消息类型">
            <el-option label="订单方面" value="shanghai" />
            <el-option label="投书" value="beijing" />
          </el-select>
        </el-col>

        <el-col :sm="{span:5}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <div class="block">
            <el-date-picker
              v-model="systemInformSearchForm.values"
              style="width:100% !important;"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            />
          </div>

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
            <span>共900个通知</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 用户反馈Table =========================  -->
    <el-row :gutter="24" class="title-menu-min">
      <el-col :sm="{span: 24}" :xs="{span: 24}">

        <el-table :data="systemInformDatas" border style="width: 100%">
          <el-table-column prop="inforId" label="通知号" width="150" show-overflow-tooltip="true" />
          <el-table-column prop="inforContent" label="通知内容" min-width="200" show-overflow-tooltip="true" />
          <el-table-column prop="inforUserName" label="通知人" width="150" show-overflow-tooltip="true" />
          <el-table-column prop="inforState" label="状态" width="100" />
          <el-table-column prop="inforTime" label="通知时间" width="150" show-overflow-tooltip="true" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">已读</el-button>
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
    />
    <!-- ======================= 用户反馈--查看附件(结束) =========================  -->

    <!-- ======================= 用户反馈--回复用户 =========================  -->

    <!-- ======================= 用户反馈--回复用户(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: '',
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
      // 通知数据集合
      systemInformDatas: [{
        inforId: '1',
        inforContent: 'luqiqi',
        inforUserName: '2246483156@qq.com',
        inforState: '未读',
        inforTime: '2019-08-06 15:00'
      }, {
        inforId: '1',
        inforContent: 'luqiqi',
        inforUserName: '2246483156@qq.com',
        inforState: '未读',
        inforTime: '2019-08-06 15:00'
      }, {
        inforId: '1',
        inforContent: 'luqiqi',
        inforUserName: '2246483156@qq.com',
        inforState: '未读',
        inforTime: '2019-08-06 15:00'
      }, {
        inforId: '1',
        inforContent: 'luqiqi',
        inforUserName: '2246483156@qq.com',
        inforState: '未读',
        inforTime: '2019-08-06 15:00'
      }, {
        inforId: '1',
        inforContent: 'luqiqi',
        inforUserName: '2246483156@qq.com',
        inforState: '未读',
        inforTime: '2019-08-06 15:00'
      }],
      // 分页条数
      total: 100,
      // 日期快捷键
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }, {
          text: '关闭',
          onClick(picker) {
            picker.$emit('pick', ['', ''])
          }
        }]
      },
      // 通知管理搜索表单
      systemInformSearchForm: {
        querykey: '',
        values: ''
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
	#systenInfo .el-range-separator {
		width: 10% !important;
	}

	#systenInfo .el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	#systenInfo .el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	#systenInfo .el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	#systenInfo .el-form-item .el-form-item__content .addProductFormInput .el-input__inner,

	#systenInfo .autocut {
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
	#systenInfo .title-menu-min2 {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#systenInfo .title-menu-min2::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#systenInfo .title-menu-min2::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#systenInfo .title-menu-min2::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*新加入隐藏滚动条效果*/
	#systenInfo .title-menu-min {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#systenInfo .title-menu-min::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#systenInfo .title-menu-min::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#systenInfo .title-menu-min::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*==================自定义自适应css 宽度 1301 -- 2000px========================*/
	@media only screen and (min-width: 1301px) and (max-width: 2000px) {}

	@media only screen and (min-width: 300px) and (max-width: 409px) {
		#systenInfo .issueDescribeClass {
			width: 100% !important;
		}

		#systenInfo .productBrandInputClass {
			width: 170px !important;
		}

		#systenInfo .spuDialogClass {
			max-height: 300px;
		}

		#systenInfo .addAndClose {
			margin-top: 10px !important;
		}

		#systenInfo .fixedClass {
			position: absolute;
			top: 100px;
		}

		#systenInfo .spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#systenInfo .SpusClass {
			width: 270px !important;
		}

		/*  添加商品的css  */
		#systenInfo .addProduct .el-dialog {
			width: 330px !important;
		}

	#systenInfo 	.addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 500px) {
		#systenInfo .issueDescribeClass {
			width: 100% !important;
		}

		#systenInfo .queryValueClass {
			padding-left: 0px !important;
			padding-right: 0px !important;
		}

		.productSkuInfoDialog {
			width: 100% !important;
		}

		#systenInfo .productCommentInfoClass {
			width: 100% !important;
		}

		.SpusClass button {
			margin-top: 0.625rem !important;
		}

		#systenInfo .spuDialogClass {
			max-height: 300px;
		}

		#systenInfo .addAndClose {
			margin-top: 10px !important;
		}

		#systenInfo .fixedClass {
			position: absolute;
			top: 100px;
		}

		#systenInfo .spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#systenInfo .SpusClass {
			width: 330px !important;
		}

		/*  添加商品的css  */
		#systenInfo .addProduct .el-dialog {
			width: 400px !important;
		}

		#systenInfo .addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 1300px) {

		#systenInfo .el-form .el-row {
			margin: 0 auto;
			text-align: center;
		}

		#systenInfo .el-col-xs-23 {
			width: 100%;
		}

		#systenInfo .el-form-item .el-button {
			width: 250px !important;
		}

		#systenInfo .el-divider span {
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

	#systenInfo .el-divider span {
		color: #606266;
		font-weight: bold;
	}

	#systenInfo .el-table__row th .cell {
		word-break: keep-all;
		white-space: nowrap;
		padding: 0px 0px;
	}

	#systenInfo .el-table__row th {
		padding: 3px 0px;
		padding-left: 10px;
		color: #606266;

	}

	#systenInfo .el-table__row td {
		padding: 3px 0;
	}

	#systenInfo {
		margin: 30px;
	}
</style>
