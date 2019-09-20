<!--======店铺入驻管理模块=======-->
<template>
  <div id="checkInDiv" style="margin:30px ;">
    <!-- ======================= 店铺入住按钮集合 =========================  -->
    <el-form :inline="true" :model="stroreCheckInSearchForm" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :sm="{span:9}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-date-picker
            v-model="stroreCheckInSearchForm.queryTimes"
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

        <el-col :sm="{span: 5}" :xs="{span: 23}" style="margin-bottom: 10px;;">
          <el-select v-model="page.state" style="width: 100%;;" placeholder="选择查询条件">
            <el-option label="全部" value="" />
            <el-option v-for="(data) in storeStates" :label="data.key" :value="data.value" />
          </el-select>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-button type="primary" icon="el-icon-search" style="width: 100% !important;" @click="searchStoreEnter">搜索
          </el-button>
        </el-col>
      </el-row>

    </el-form>

    <!-- ======================= 店铺入住按钮集合 (结束) =========================  -->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>共900个入住请求</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 用户反馈Table =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}" class="title-menu-min">

        <el-table :data="storeCheckInDatas" border style="width: 100%">
          <el-table-column prop="storeCheckNumber" label="入住编号" width="120" show-overflow-tooltip="true" />
          <el-table-column label="店铺名称" prop="storeCheckStorename" show-overflow-tooltip="true" />
          <el-table-column prop="storeCheckName" label="入住者姓名" width="120" show-overflow-tooltip="true" />
          <el-table-column label="入住者身份证" prop="storeCheckCard" width="200" show-overflow-tooltip="true" />
          <el-table-column prop="storeCheckPhone" label="联系电话" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="storeCheckCreateTimeStr" label="申请时间" width="150" show-overflow-tooltip="true" />
          <el-table-column prop="storeCheckUsername" label="申请人账号" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="storeCheckZfb" label="支付宝账户" width="120" show-overflow-tooltip="true" />
          <el-table-column label="状态" width="100" show-overflow-tooltip="true">
            <template slot-scope="scope">

              <el-link v-if="scope.row.storeCheckState == 1" type="success">已通过</el-link>
              <el-link v-else-if="scope.row.storeCheckState == 2" type="warning">未通过</el-link>
              <el-link v-else-if="scope.row.storeCheckState == 3" type="info">未处理</el-link>
              <el-link v-else type="danger">未知状态</el-link>

            </template>
          </el-table-column>
          <el-table-column prop="storeCheckDisposeName" label="处理人" show-overflow-tooltip="true" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.storeCheckState != 3"
                @click="editStoreState(scope.$index , scope.row , 1)"
              >通过
              </el-button>
              <el-button
                type="text"
                :disabled="scope.row.storeCheckState == 1"
                size="small"
                @click="openNot(scope.$index , scope.row)"
              >未通过
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
    <!-- ======================= 用户反馈Table(结束) =========================  -->

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-pagination
          :small="pageFlag"
          :pager-count="5"
          :current-page="page.currentPage"
          :page-sizes="[1,2,3,5,10]"
          hide-on-single-page="true"
          :page-size="page.currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalSize"
          @size-change="productCurrentSize"
          @current-change="productCurrentPage"
        />

      </el-col>
    </el-row>
    <!-- ======================= 分页层 (结束) =========================  -->

    <!-- ======================= 未通过回复商家 =========================  -->
    <el-dialog
      v-el-drag-dialog
      width="400px"
      :modal-append-to-body="false"
      :close-on-click-modal="true"
      :modal="true"
      title="回复商家"
      :visible.sync="isReplyMerchantDiv"
    >

      <el-row :gutter="24">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-input
              v-if="currentFunctionObj.storeCheckState == 2"
              v-model="currentFunctionObj.retain1"
              :disabled="true"
              placeholder="请输入未通过的理由"
              type="textarea"
              style="width: 100%;"
            />

            <el-input
              v-if="currentFunctionObj.storeCheckState == 3"
              v-model="replayData.content"
              placeholder="请输入未通过的理由"
              type="textarea"
              style="width: 100%;"
            />
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8}" :xs="{span: 24}">
            <el-button
              style="width: 100% !important; margin-top: 10px;"
              type="primary"
              :disabled="currentFunctionObj.storeCheckState == 2"
              @click="editStoreState(currentFunctionIndex , currentFunctionObj , 2)"
            >回复
            </el-button>
          </el-col>
          <el-col :sm="{span: 8}" :xs="{span: 24}">
            <el-button style="width: 100% !important; margin-top: 10px;" @click="isReplyMerchantDiv = false">关闭窗口
            </el-button>
          </el-col>
        </el-row>
      </el-row>
    </el-dialog>

    <!-- ======================= 未通过回复商家(结束) =========================  -->
  </div>
</template>

<script>
import {
  productAjaxPost,
  productAjaxGet
} from '@/api/table.js'

var systemUrl = ''
import elDragDialog from '@/el-drag-dialog'
export default {
  directives: {
    elDragDialog
  },
  data() {
    return {
      // 当前操作的信息
      currentFunctionIndex: 0,
      currentFunctionObj: {},
      // 小型分页数据
      pageFlag: false,
      // 商家入驻的状态
      storeStates: [],
      // 商家的入驻信息集合
      storeCheckInDatas: [],
      page: {
        totalSize: 0, // 总条数
        currentSize: 10, // 显示的条数
        currentPage: 1, // 当前显示的页数
        state: '', // 状态
        startTimeStr: '',
        endTimeStr: ''
      },
      // ///////////////////////////////////////////////
      replayData: {
        content: ''
      },
      // 回复商家Div
      isReplyMerchantDiv: false,
      // 入住管理查询表单
      stroreCheckInSearchForm: {
        queryTimes: [],
        querykey: ''
      },
      // 时间格式化
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
      }
    }
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
    if (this.screenWidth <= 500) {
      this.pageFlag = true
    }
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        // 判断宽度是否小于500 小于500 全部全屏显示
        if (this.screenWidth <= 500) {
          this.pageFlag = true
        } else {
          this.pageFlag = false
        }
      })()
    }
  },
  created() {
    this.getStoreEnterInfo()
  },
  methods: {
    // 打开拒绝通过
    openNot(index, obj) {
      this.currentFunctionIndex = index
      this.currentFunctionObj = obj
      this.isReplyMerchantDiv = true
    },
    // 修改店铺入住的状态
    editStoreState(index, obj, state) {
      var msg = ''
      if (state == 1) {
        msg = '通过'
      } else {
        msg = '拒绝通过'
      }

      this.$confirm('您确定要把状态改成' + msg + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.COMMON.startLoading()
        var url = '/store/enter/edit/state'
        var param = { 'content': this.replayData.content, 'state': state, 'storeEnterId': obj.storeCheckId }
        productAjaxPost(url, param).then(data => {
          if (data.status == 200) {
            this.$message({
              showClose: true,
              message: msg + '成功',
              type: 'success',
              duration: 1000,
              customClass: 'zzIndex'
            })
            this.storeCheckInDatas[index].storeCheckState = state
            this.COMMON.stopLoading()
          } else {
            this.$message({
              showClose: true,
              message: data.msg + '--请重新刷新页面',
              type: 'error',
              duration: 3000,
              customClass: 'zzIndex'
            })

            this.listLoading = false
            this.COMMON.stopLoading()
          }
        })
      })
    },
    // 搜索店铺信息
    searchStoreEnter() {
      this.page.currentPage = 1
      if (this.stroreCheckInSearchForm.queryTimes != null && this.stroreCheckInSearchForm.queryTimes.length == 1) {
        this.page.startTimeStr = this.timeToString(this.stroreCheckInSearchForm.queryTimes[0])
      } else if (this.stroreCheckInSearchForm.queryTimes != null && this.stroreCheckInSearchForm.queryTimes.length == 2) {
        this.page.startTimeStr = this.timeToString(this.stroreCheckInSearchForm.queryTimes[0])
        this.page.endTimeStr = this.timeToString(this.stroreCheckInSearchForm.queryTimes[1])
      }

      this.getStoreEnterInfo()
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
    // 切换店铺的条数
    productCurrentSize(val) {
      this.page.currentSize = val
      this.getStoreEnterInfo()
    },
    // 切换店铺页数
    productCurrentPage(val) {
      // 替换当前页数
      this.page.currentPage = val
      this.getStoreEnterInfo()
    },
    // 获取店铺入驻的信息
    getStoreEnterInfo() {
      // 发送Ajax请求数据
      this.COMMON.startLoading()
      var url = '/store/enter/index'
      productAjaxPost(url, this.page).then(data => {
        if (data.status == 200) {
          this.$message({
            showClose: true,
            message: '查询成功',
            type: 'success',
            duration: 1000,
            customClass: 'zzIndex'
          })
          this.page.currentPage = data.data.currentPage
          this.page.currentSize = data.data.currentSize
          this.page.totalSize = data.data.totalSize
          this.storeCheckInDatas = data.data.storeDatas
          this.storeStates = data.data.dtos
          this.COMMON.stopLoading()
        } else {
          this.$message({
            showClose: true,
            message: data.msg + '--请重新刷新页面',
            type: 'error',
            duration: 3000,
            customClass: 'zzIndex'
          })

          this.listLoading = false
          this.COMMON.stopLoading()
        }
      })
    }
  }
}
</script>

<style>

  /*新加入隐藏滚动条效果*/
  .title-menu-min {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  .title-menu-min::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  .title-menu-min::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .title-menu-min::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  #checkInDiv.el-range-separator {
    width: 10% !important;
  }

  #checkInDiv .el-divider span {
    color: #606266;
    font-weight: bold;
  }

  #checkInDiv.el-table__row th .cell {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0px 0px;
  }

  #checkInDiv.el-table__row th {
    padding: 3px 0px;
    padding-left: 10px;
    color: #606266;

  }

  #checkInDiv .el-table__row td {
    padding: 3px 0;
  }
</style>
