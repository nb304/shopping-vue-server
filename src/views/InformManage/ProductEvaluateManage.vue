<!--======商品评价管理模块=======-->

<template>
  <div id="productEvalInfo">

    <!-- ======================= 商品评价按钮集合  =========================  -->
    <el-form :inline="true" :model="productEvaluateSearchForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span: 3}" :xs="{span: 8}" style="margin-bottom: 10px;;">
          <el-select v-model="productEvaluateSearchForm.querykey" placeholder="选择查询条件">
            <el-option label="订单编号" value="1"/>
            <el-option label="用户名称" value="2"/>
          </el-select>
        </el-col>
        <el-col :sm="{span: 5}" :xs="{span: 15}" style="margin-bottom: 10px;;" class="queryValueClass">
          <el-input v-model="productEvaluateSearchForm.queryValue" placeholder="请输入查询条件"/>
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
          <el-button type="primary" icon="el-icon-search" style="width: 100% !important;" @click="searchProduceEv">搜索
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-divider>评论类型筛选</el-divider>
        <el-col :sm="{span: 4}" :xs="{span: 8}">
          <el-button
            type="primary"
            style="width: 100% !important;"
            :disabled="evaluatePage.isHZCState == 1"
            @click="state(1)"
          >好评
          </el-button>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 8}">
          <el-button
            type="primary"
            style="width: 100% !important;"
            :disabled="evaluatePage.isHZCState == 2"
            @click="state(2)"
          >中评
          </el-button>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 8}">
          <el-button
            type="primary"
            style="width: 100% !important;"
            :disabled="evaluatePage.isHZCState == 3"
            @click="state(3)"
          >差评
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- ======================= 商品评价按钮集合 (结束) =========================  -->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>共{{ evaluatePage.totalSize }}个评价</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 商品评论管理 =========================  -->
    <el-row :gutter="24">
      <div class="title-menu-min" style="max-height: 31.25rem;">
        <el-col v-for="(o,index) in evaluateDatas" :span="24" style="margin-bottom: 5px;">

          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                订单编号:{{ o.orderNumber }}<i class="header-icon el-icon-s-comment"/>
              </template>
              <el-card shadow="hover">
                <div class="userEvaInfoDiv">
                  <el-row :gutter="24">
                    <el-divider content-position="right">订单编号:
                      <el-link type="primary">{{ o.orderNumber }}</el-link>
                    </el-divider>

                    <el-col :sm="{span: 1}" :xs="{span: 5}">
                      <el-avatar
                        shape="square"
                        :size="50"
                        :src="o.image"
                      />
                    </el-col>

                    <el-col :sm="{span: 23}" :xs="{span: 19}" class="title-menu-min" style="max-height: 100px;">
                      <el-card shadow="always" style="float: right; width:100%;">
                        <span
                          style="width: 100% !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: normal !important;"
                        >
                          <el-link type="primary">{{ o.productEvaluateUsername }}:</el-link>
                          {{ o.productEvaluateContent }}
                        </span>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-row>
                    <span style="float:right; height: 20px; line-height: 20px;">评价于：{{ o.createTimeStr }}</span>
                  </el-row>
                </div>
                <div class="paroductEvaInfoDiv" style="position: relative;">

                  <el-row :gutter="24">
                    <el-divider content-position="right">商品信息
                    </el-divider>

                    <el-col :sm="{span: 2}" :xs="{span: 6}">
                      <el-avatar
                        shape="square"
                        :size="77"
                        :src="o.pImage"
                      />
                    </el-col>

                    <el-col :sm="{span: 22}" :xs="{span: 18}" class="title-menu-min" style="max-height: 100px;">
                      <span>
                        <el-link type="primary">{{ o.pName }}</el-link>
                      </span><br>
                      <span>2099.99￥</span><br>
                      <span>商品参数：红色,64GB</span>
                    </el-col>
                  </el-row>
                </div>

                <el-row :gutter="24">
                  <el-col :sm="{span: 2}" :xs="{span: 8}">
                    <el-link type="primary" @click="replyEv(index , o)"
                    >回复卖家
                    </el-link>
                  </el-col>

                  <el-col :sm="{span: 2}" :xs="{span: 8}">
                    <el-link type="primary" @click="reportContent(index , o )">举报评论</el-link>
                  </el-col>

                  <el-col :sm="{span: 2}" :xs="{span: 8}">
                    <el-link type="primary" @click="productEvaluateFlags.replyEvaluate = true">删除评论</el-link>
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
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-pagination
          :small="pageFlag"
          :pager-count="5"
          :current-page="evaluatePage.currentPage"
          :page-sizes="[1,2,3,5,10]"
          hide-on-single-page="true"
          :page-size="evaluatePage.currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="evaluatePage.totalSize"
          @size-change="categoryCurrentSize"
          @current-change="categoryCurrentPage"
        />

      </el-col>
    </el-row>
    <!-- ======================= 分页层 (结束) =========================  -->

    <!-- ======================= 评论回复弹出层 =========================  -->
    <el-dialog v-el-drag-dialog
               :append-to-body="true"
               width="400px"

               title="回复评论"
               :visible.sync="productEvaluateFlags.replyEvaluate"
    >
      <el-form
        ref="replyEvaluateForm"
        label-position="left"
        :inline="true"
        :model="replyEvaluateForm"
        label-width="80px"
      >
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="回复内容" style="width:100%;">
              <el-input v-model="currentFunctionObj.retain1" :html="currentFunctionObj.retain1"
                        :disabled=" currentFunctionObj.retain1 != null && currentFunctionObj.retain1.length > 1"
                        v-if=" currentFunctionObj.retain1 != null && currentFunctionObj.retain1.length > 1"
                        type="textarea" maxlength="500" show-word-limit/>

              <el-input v-if="currentFunctionObj.retain1 == null || currentFunctionObj.retain1.length < 1"
                        v-model="replyEvaluateForm.content"
                        type="textarea" maxlength="500" show-word-limit/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:4}" :xs="{span: 23}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;"
                       :disabled=" currentFunctionObj.retain1 != null && currentFunctionObj.retain1.length > 1"
                       @click="yesReply">确认回复
            </el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button
              style="width:100%;margin-bottom: 15px !important;"
              @click="productEvaluateFlags.replyEvaluate = false"
            >关闭窗口
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog v-el-drag-dialog>
    <!-- ======================= 评论回复弹出层(结束) =========================  -->

    <!-- ======================= 评论举报弹出层 =========================  -->
    <el-dialog v-el-drag-dialog
               :append-to-body="true"
               width="400px"

               title="举报"
               :visible.sync="productEvaluateFlags.reportFlag"
    >
      <el-form ref="reportForm" label-position="left" :inline="true" :model="reportForm" label-width="80px">
        <el-row :gutter="24">

          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="举报类型" style="width:100%;">
              <el-select style="width:270px;" v-model="reportForm.reportState" placeholder="请选择举报类型"
                         v-if="currentFunctionObj.retain3 == null || currentFunctionObj.retain3.length < 1">
                <el-option :label="o.reportName" v-for="(o , index) in rePortStatePojos"
                           :value="o.reportValue"/>
              </el-select>

              <el-select style="width:270px;" v-model="currentFunctionObj.retain4" placeholder="请选择举报类型"
                         :disabled="true"
                         v-if="currentFunctionObj.retain3 != null && currentFunctionObj.retain3.length > 1">
                <el-option :label="o.reportName" v-for="(o , index) in rePortStatePojos"
                           :value="o.reportValue"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="举报内容" style="width:100%;">
              <el-input v-model="reportForm.reportContent" maxlength="1000" show-word-limit
                        v-if="currentFunctionObj.retain3 == null || currentFunctionObj.retain3.length < 1"
                        type="textarea"/>

              <el-input v-model="currentFunctionObj.retain3" :disabled="true"
                        v-if="currentFunctionObj.retain3 != null && currentFunctionObj.retain3.length > 1"
                        type="textarea"/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:4}" :xs="{span: 23}">

            <el-button :disabled="currentFunctionObj.retain3 != null && currentFunctionObj.retain3.length"
                       type="primary" style="width:100%;margin-bottom: 15px;" @click="yesReport">确认举报
            </el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 23}">
            <el-button
              style="width:100%;margin-bottom: 15px !important;"
              @click="productEvaluateFlags.reportFlag = false"
            >关闭窗口
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog v-el-drag-dialog>
    <!-- ======================= 评论举报弹出层(结束) =========================  -->
  </div>
</template>

<script>
  import elDragDialog from '@/el-drag-dialog'
  import {
    productAjaxPost,
    productAjaxGet
  } from '@/api/table.js'

  var systemUrl = ''

  export default {
    directives: {
      elDragDialog
    },
    data() {
      return {

        // 举报状态
        rePortStatePojos: [],
        // 举报的表单
        reportForm: {
          reportState: '',
          reportContent: '',
          reportEvId: ''
        },
        // 当前操作的评价
        currentFunctionIndex: 0,
        currentFunctionObj: '',
        // 分页小型的flag
        pageFlag: false,
        // 评价的分类数据
        evaluatePage: {
          totalSize: 0, // 总条数
          currentSize: 10, // 显示的条数
          currentPage: 1, // 当前显示的页数
          orderNumber: '',
          userName: '',
          startTimeStr: '',
          endTimeStr: ''
        },
        // 商品评价搜索表单
        productEvaluateSearchForm: {
          querykey: '',
          queryValue: '',
          queryTimes: []
        },
        // 评价的集合数据
        evaluateDatas: [],
        // //////////////////////////////////////////////////////////////////////////////////

        htmlIntter: '复制成功',
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
        // 页面的长宽
        screenWidth: '',
        screenHeight: ''
      }
    },
    created() {
      // 初始化方法 vue组件初始化完成,网页未完成
      this.getEvaluateInfo()
    },
    mounted() {
      this.screenWidth = document.body.clientWidth
      this.screenHeight = document.body.clientHeight
      if (this.screenWidth <= 500) {
        this.productTopHtml = '1vh'
        this.pageFlag = true
      } else {
      }
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
          this.screenHeight = document.body.clientHeight
          // 判断宽度是否小于500 小于500 全部全屏显示
          if (this.screenWidth <= 500) {
            this.pageFlag = true
          } else {
          }
        })()
      }
    },
    methods: {
      // 确认举报
      yesReport() {
        this.$confirm('您确定要举报该评论吗?只有一次机会哦！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url = '/product/evaluate/report'
          productAjaxPost(url, this.reportForm).then(data => {
            if (data.status == 200) {
              this.$message({
                type: 'success',
                message: '举报成功'
              })
              // this.evaluateDatas[this.currentFunctionIndex].retain3 = 1
              this.evaluateDatas[this.currentFunctionIndex].retain3 = this.reportForm.reportContent
              this.evaluateDatas[this.currentFunctionIndex].retain4 = this.reportForm.reportState
              this.currentFunctionObj.retain3 = this.reportForm.reportContent
              this.currentFunctionObj.retain4 = this.reportForm.reportState
              this.productEvaluateFlags.reportFlag = false
              this.reportForm.reportContent=''
              this.reportForm.reportState=''
              this.COMMON.stopLoading()
            } else if (data.status == 500) {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error',
                duration: 3000,
                customClass: 'zzIndex'
              })

              this.COMMON.stopLoading()
            } else {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error',
                duration: 3000,
                customClass: 'zzIndex'
              })

              this.COMMON.stopLoading()
            }
          })
        })
      },
      // 打开举报内容
      reportContent(index, o) {
        this.currentFunctionIndex = index
        this.currentFunctionObj = o
        this.reportForm.reportEvId = o.productEvaluateId
        this.productEvaluateFlags.reportFlag = true
      },
      // 确认回复
      yesReply() {
        this.$confirm('您确定要回复吗?只有一次机会哦！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url = '/product/evaluate/reply'
          var para = { 'evalId': this.currentFunctionObj.productEvaluateId, 'content': this.replyEvaluateForm.content }
          productAjaxPost(url, para).then(data => {
            if (data.status == 200) {
              this.$message({
                type: 'success',
                message: '回复成功'
              })
              this.evaluateDatas[this.currentFunctionIndex].retain1 = this.replyEvaluateForm.content
              this.productEvaluateFlags.replyEvaluate = false
              this.replyEvaluateForm.content=''
              this.COMMON.stopLoading()
            } else if (data.status == 500) {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error',
                duration: 3000,
                customClass: 'zzIndex'
              })

              this.COMMON.stopLoading()
            } else {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error',
                duration: 3000,
                customClass: 'zzIndex'
              })

              this.COMMON.stopLoading()
            }
          })
        })
      },
      // 回复评论
      replyEv(index, obj) {
        this.currentFunctionIndex = index
        this.currentFunctionObj = obj
        this.productEvaluateFlags.replyEvaluate = true
      },
      // 商品类型
      state(state) {
        this.evaluatePage.isHZCState = state
        this.getEvaluateInfo()
      },
      // 切换商品的条数
      categoryCurrentSize(val) {
        this.evaluatePage.currentSize = val
        this.getEvaluateInfo()
      },
      // 切换商品页数
      categoryCurrentPage(val) {
        // 替换当前页数
        this.evaluatePage.currentPage = val
        this.getEvaluateInfo()
      },
      // 格式化时间
      timeToString(time) {
        var date = new Date(time)
        var year = date.getFullYear() + '-'
        var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date
            .getMonth() + 1) +
          '-'
        date = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
        return year + month + date
      },
      // 单击搜索
      searchProduceEv() {
        this.evaluatePage.startTimeStr = ''
        this.evaluatePage.endTimeStr = ''
        this.evaluatePage.currentPage = 1
        this.evaluatePage.userName = ''
        this.evaluatePage.orderNumber = ''
        if (this.productEvaluateSearchForm.querykey == 1) {
          this.evaluatePage.orderNumber = this.productEvaluateSearchForm.queryValue
          this.evaluatePage.userName = ''
        } else if (this.productEvaluateSearchForm.querykey == 2) {
          this.evaluatePage.orderNumber = ''
          this.evaluatePage.userName = this.productEvaluateSearchForm.queryValue
        }

        if (this.productEvaluateSearchForm.queryTimes != null && this.productEvaluateSearchForm.queryTimes.length == 1) {
          this.evaluatePage.startTimeStr = this.timeToString(this.productEvaluateSearchForm.queryTimes[0])
        } else if (this.productEvaluateSearchForm.queryTimes != null && this.productEvaluateSearchForm.queryTimes.length == 2) {
          this.evaluatePage.startTimeStr = this.timeToString(this.productEvaluateSearchForm.queryTimes[0])
          this.evaluatePage.endTimeStr = this.timeToString(this.productEvaluateSearchForm.queryTimes[1])
        }

        this.getEvaluateInfo()
      },
      // 查询商品评价信息
      getEvaluateInfo() {
        this.COMMON.startLoading()
        var url = '/product/evaluate/index'
        productAjaxPost(url, this.evaluatePage).then(data => {
          if (data.status == 200) {
            this.evaluateDatas = data.data.productEvaluateDatas
            this.evaluatePage.currentSize = data.data.currentSize
            this.evaluatePage.currentPage = data.data.currentPage
            this.evaluatePage.totalSize = data.data.totalSize
            this.rePortStatePojos = data.data.rePortStatePojos
            this.COMMON.stopLoading()
          } else if (data.status == 500) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.COMMON.stopLoading()
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.COMMON.stopLoading()
          }
        })
      }
    }
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

  .el-form-item__content {
    width: 73% !important;
  }

  /*==================自定义自适应css 宽度 1301 -- 2000px========================*/
  @media only screen and (min-width: 1301px) and (max-width: 2000px) {
  }

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
    #productEvalInfo .addProduct .el-dialog v-el-drag-dialog {
      width: 330px !important;
    }

    #productEvalInfo .addProduct .el-dialog v-el-drag-dialog #steptwo {
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
    #productEvalInfo .addProduct .el-dialog v-el-drag-dialog {
      width: 400px !important;
    }

    #productEvalInfo .addProduct .el-dialog v-el-drag-dialog #steptwo {
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
