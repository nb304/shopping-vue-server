<!--======商品评价管理模块=======-->

<template>
  <div id="productEvalInfo">

    <!-- ======================= 商品评价按钮集合  =========================  -->
    <el-form :inline="true" :model="productEvaluateSearchForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 3}" :xs="{span: 8}" style="margin-bottom: 10px;;">
          <el-select v-model="productEvaluateSearchForm.querykey" placeholder="选择查询条件">
            <el-option label="订单编号" value="shanghai" />
            <el-option label="商品名称" value="beijing" />
            <el-option label="用户名称" value="beiji2ng" />
          </el-select>
        </el-col>
        <el-col :sm="{span: 5}" :xs="{span: 15}" style="margin-bottom: 10px;;" class="queryValueClass">
          <el-input v-model="productEvaluateSearchForm.queryValue" placeholder="请输入查询条件" />
        </el-col>

        <el-col :sm="{span:9}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-date-picker
            v-model="productEvaluateSearchForm.queryTimes"
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

      <el-row :gutter="24">
        <el-divider>评论类型筛选</el-divider>
        <el-col :sm="{span: 4}" :xs="{span: 8}">
          <el-button type="primary" style="width: 100% !important;" @click="onSubmit">好评</el-button>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 8}">
          <el-button type="primary" style="width: 100% !important;" @click="onSubmit">中评</el-button>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 8}">
          <el-button type="primary" style="width: 100% !important;" @click="onSubmit">差评</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- ======================= 商品评价按钮集合 (结束) =========================  -->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>共900个消息</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 商品评论管理 =========================  -->
    <el-row :gutter="24">
      <div class="title-menu-min" style="max-height: 31.25rem;">
        <el-col v-for="o in 10" :span="24" style="margin-bottom: 5px;">

          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                订单编号:AIGOU13123OJDCAK2143<i class="header-icon el-icon-s-comment" />
              </template>
              <el-card shadow="hover">
                <div class="userEvaInfoDiv">
                  <el-row :gutter="24">
                    <el-divider content-position="right">订单编号:
                      <el-link type="primary">AIGOU13123OJDCAK2143</el-link>
                    </el-divider>

                    <el-col :sm="{span: 1}" :xs="{span: 5}">
                      <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    </el-col>

                    <el-col :sm="{span: 23}" :xs="{span: 19}" class="title-menu-min" style="max-height: 100px;">
                      <el-card shadow="always" style="float: right; width:100%;">
                        <span style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;">
                          <el-link type="primary">鹿七七:</el-link>
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                          总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示总是显示
                        </span>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-row>
                    <span style="float:right; height: 20px; line-height: 20px;">评价于：2019-07-06 12:55</span>
                  </el-row>
                </div>
                <div class="paroductEvaInfoDiv" style="position: relative;">

                  <el-row :gutter="24">
                    <el-divider content-position="right">商品信息
                    </el-divider>

                    <el-col :sm="{span: 2}" :xs="{span: 6}">
                      <el-avatar shape="square" :size="77" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    </el-col>

                    <el-col :sm="{span: 22}" :xs="{span: 18}" class="title-menu-min" style="max-height: 100px;">
                      <span>
                        <el-link type="primary">DW手表</el-link>
                      </span><br>
                      <span>2099.99￥</span><br>
                      <span>商品参数：红色,64GB</span>
                    </el-col>
                  </el-row>
                </div>

                <el-row :gutter="24">
                  <el-col :sm="{span: 8}" :xs="{span: 8}">
                    <el-button type="primary" style="width: 100% !important;" @click="productEvaluateFlags.replyEvaluate = true">回复</el-button>
                  </el-col>

                  <el-col :sm="{span: 8}" :xs="{span: 8}">
                    <el-tooltip class="item" effect="dark" content="恶意评论" placement="top">
                      <el-button type="primary" style="width: 100% !important;" @click="productEvaluateFlags.reportFlag = true">举报</el-button>
                    </el-tooltip>
                  </el-col>

                  <el-col :sm="{span: 8}" :xs="{span: 8}">
                    <el-tooltip class="item" effect="dark" content="提供链接给用户,用户确认删除后,即可删除该条评论" placement="top">
                      <el-button type="primary" style="width: 100% !important;" @click="deleteEvaluate">删除</el-button>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </el-card>
            </el-collapse-item>
          </el-collapse>

        </el-col>
      </div>
    </el-row>
    <!-- ======================= 商品信息管理Talbe(结束) =========================  -->

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 5, offset: 19}" :xs="{span: 24}">
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

    <!-- ======================= 评论回复弹出层 =========================  -->
    <el-dialog :append-to-body="true" width="400px" :close-on-click-modal="false" title="回复评论" :visible.sync="productEvaluateFlags.replyEvaluate">
      <el-form ref="replyEvaluateForm" label-position="left" :inline="true" :model="replyEvaluateForm" label-width="80px">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="回复内容" style="width:100%;">
              <el-input v-model="replyEvaluateForm.content" type="textarea" />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:4}" :xs="{span: 23}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;">确认回复</el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="width:100%;margin-bottom: 15px !important;" @click="productEvaluateFlags.replyEvaluate = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- ======================= 评论回复弹出层(结束) =========================  -->

    <!-- ======================= 评论举报弹出层 =========================  -->
    <el-dialog :append-to-body="true" width="400px" :close-on-click-modal="false" title="举报" :visible.sync="productEvaluateFlags.reportFlag">
      <el-form ref="reportForm" label-position="left" :inline="true" :model="reportForm" label-width="80px">
        <el-row :gutter="24">

          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="举报类型" style="width:100%;">
              <el-select v-model="reportForm.reportContent" style="width:270px;" placeholder="请选择举报类型">
                <el-option label="恶意刷单" value="shanghai" />
                <el-option label="恶意差评" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="举报内容" style="width:100%;">
              <el-input v-model="reportForm.reportType" type="textarea" />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:4}" :xs="{span: 23}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;">确认举报</el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button style="width:100%;margin-bottom: 15px !important;" @click="productEvaluateFlags.reportFlag = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- ======================= 评论举报弹出层(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlIntter: '复制成功',
      // 举报回复的表单对象
      reportForm: {
        reportContent: '',
        reportType: ''
      },
      // 商品回复Form
      replyEvaluateForm: {
        content: ''
      },
      // 商品评论弹出层
      productEvaluateFlags: {
        // 回复的弹出层Flag
        replyEvaluate: false,
        // 举报的弹出层Flag
        reportFlag: false
      },
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
      // 商品评价搜索表单
      productEvaluateSearchForm: {
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
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        // 判断宽度是否小于500 小于500 全部全屏显示
        if (this.screenWidth <= 500) {} else {}
      })()
    }
  },
  methods: {}
}
</script>

<style>
	#productEvalInfo .el-range-separator {
		width: 10% !important;
	}

	#productEvalInfo .el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	#productEvalInfo .el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	#productEvalInfo .el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	#productEvalInfo .el-form-item .el-form-item__content .addProductFormInput .el-input__inner,
	#productEvalInfo .el-textarea__inner {
		width: 270px !important;
	}

	#productEvalInfo .autocut {
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
	#productEvalInfo .title-menu-min2 {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#productEvalInfo .title-menu-min2::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#productEvalInfo .title-menu-min2::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#productEvalInfo .title-menu-min2::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*新加入隐藏滚动条效果*/
	#productEvalInfo .title-menu-min {
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
	}

	#productEvalInfo .title-menu-min::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	#productEvalInfo .title-menu-min::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	#productEvalInfo .title-menu-min::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	/*==================自定义自适应css 宽度 1301 -- 2000px========================*/
	@media only screen and (min-width: 1301px) and (max-width: 2000px) {}

	@media only screen and (min-width: 300px) and (max-width: 409px) {
		#productEvalInfo .productBrandInputClass {
			width: 170px !important;
		}

		#productEvalInfo .spuDialogClass {
			max-height: 300px;
		}

		#productEvalInfo .addAndClose {
			margin-top: 10px !important;
		}

		#productEvalInfo .fixedClass {
			position: absolute;
			top: 100px;
		}

		#productEvalInfo .spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#productEvalInfo .SpusClass {
			width: 270px !important;
		}

		/*  添加商品的css  */
		#productEvalInfo .addProduct .el-dialog {
			width: 330px !important;
		}

		#productEvalInfo .addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 500px) {
		#productEvalInfo .queryValueClass {
			padding-left: 0px !important;
			padding-right: 0px !important;
		}

		#productEvalInfo .productSkuInfoDialog {
			width: 100% !important;
		}

		#productEvalInfo .productCommentInfoClass {
			width: 100% !important;
		}

		#productEvalInfo .SpusClass button {
			margin-top: 0.625rem !important;
		}

		#productEvalInfo .spuDialogClass {
			max-height: 300px;
		}

		#productEvalInfo .addAndClose {
			margin-top: 10px !important;
		}

		#productEvalInfo .fixedClass {
			position: absolute;
			top: 100px;
		}

		#productEvalInfo .spusRowClass {
			margin-right: 0px !important;
			margin-left: 7px !important;
		}

		#productEvalInfo .SpusClass {
			width: 330px !important;
		}

		/*  添加商品的css  */
		#productEvalInfo .addProduct .el-dialog {
			width: 400px !important;
		}

		#productEvalInfo .addProduct .el-dialog #steptwo {
			max-height: 31.25rem;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 1300px) {

		#productEvalInfo .el-form .el-form-item .SpuInput .el-input__inner {
			width: 100px !important;
		}

		#productEvalInfo .el-form .el-form-item .SpuInput2 .el-input__inner {
			width: 100px !important;
		}

		/*  添加商品的css结束  */
		#productEvalInfo .el-form .el-form-item .el-input__inner {
			width: 250px;
		}

		#productEvalInfo .el-form .el-row {
			margin: 0 auto;
			text-align: center;
		}

		#productEvalInfo .el-col-xs-23 {
			width: 100%;
		}

		#productEvalInfo .el-form-item .el-button {
			width: 250px !important;
		}

		#productEvalInfo .el-divider span {
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

	#productEvalInfo .el-divider span {
		color: #606266;
		font-weight: bold;
	}

	#productEvalInfo .el-table__row th .cell {
		word-break: keep-all;
		white-space: nowrap;
		padding: 0px 0px;
	}

	#productEvalInfo .el-table__row th {
		padding: 3px 0px;
		padding-left: 10px;
		color: #606266;

	}

	#productEvalInfo .el-table__row td {
		padding: 3px 0;
	}

	#productEvalInfo {
		margin: 30px;
	}
</style>
