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
          <el-select v-model="stroreCheckInSearchForm.querykey" style="width: 100%;;" placeholder="选择查询条件">
            <el-option label="已通过" value="shanghai" />
            <el-option label="未通过" value="beijing" />
          </el-select>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-button type="primary" icon="el-icon-search" style="width: 100% !important;" @click="onSubmit">搜索</el-button>
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
          <el-table-column prop="checkInId" label="入住编号" width="120" show-overflow-tooltip="true" />
          <el-table-column label="店铺名称" prop="storeName" show-overflow-tooltip="true" />
          <el-table-column prop="storeName" label="入住者姓名" width="120" show-overflow-tooltip="true" />
          <el-table-column label="入住者身份证" prop="checkInCard" width="200" show-overflow-tooltip="true" />
          <el-table-column prop="checkInPhone" label="联系电话" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="checkInTime" label="申请时间" width="150" show-overflow-tooltip="true" />
          <el-table-column prop="username" label="申请人账号" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="zfbNumber" label="支付宝账户" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="state" label="状态" width="100" show-overflow-tooltip="true" />
          <el-table-column prop="disposeName" label="处理人" show-overflow-tooltip="true" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">通过</el-button>
              <el-button type="text" size="small" @click="isReplyMerchantDiv = true;">未通过</el-button>
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
          total="100"
          page-size="3"
          small="false"
          style="margin-top: 15px;margin-right: 10px;"
        />
      </el-col>
    </el-row>
    <!-- ======================= 分页层 (结束) =========================  -->

    <!-- ======================= 未通过回复商家 =========================  -->
    <el-dialog width="400px" :append-to-body="true" :close-on-click-modal="false" title="回复商家" :visible.sync="isReplyMerchantDiv">

      <el-row :gutter="24">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-input v-model="replayData.content" placeholder="请输入未通过的理由" type="textarea" style="width: 100%;" />
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8}" :xs="{span: 24}">
            <el-button style="width: 100% !important; margin-top: 10px;" type="primary" @click="isReplyMerchantDiv = false">回复</el-button>
          </el-col>
          <el-col :sm="{span: 8}" :xs="{span: 24}">
            <el-button style="width: 100% !important; margin-top: 10px;" @click="isReplyMerchantDiv = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-row>
    </el-dialog>

    <!-- ======================= 未通过回复商家(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      replayData: {
        content: ''
      },
      // 回复商家Div
      isReplyMerchantDiv: false,
      // 入住信息
      storeCheckInDatas: [{
        checkInId: 'IODV1002',
        storeName: '鹿七七的小店',
        checkInName: '鹿七七',
        checkInCard: '322344200108270019',
        checkInPhone: '13827629761',
        checkInTime: '2019-07-13 10:43',
        username: 'luqiqi',
        zfbNumber: '13827629761',
        state: '未处理',
        disposeName: '无'
      },
      {
        checkInId: 'IODV1002',
        storeName: '鹿七七的小店',
        checkInName: '鹿七七',
        checkInCard: '322344200108270019',
        checkInPhone: '13827629761',
        checkInTime: '2019-07-13 10:43',
        username: 'luqiqi',
        zfbNumber: '13827629761',
        state: '未处理',
        disposeName: '无'
      },
      {
        checkInId: 'IODV1002',
        storeName: '鹿七七的小店',
        checkInName: '鹿七七',
        checkInCard: '322344200108270019',
        checkInPhone: '13827629761',
        checkInTime: '2019-07-13 10:43',
        username: 'luqiqi',
        zfbNumber: '13827629761',
        state: '未处理',
        disposeName: '无'
      }, {
        checkInId: 'IODV1002',
        storeName: '鹿七七的小店',
        checkInName: '鹿七七',
        checkInCard: '322344200108270019',
        checkInPhone: '13827629761',
        checkInTime: '2019-07-13 10:43',
        username: 'luqiqi',
        zfbNumber: '13827629761',
        state: '未处理',
        disposeName: '无'
      }
      ],
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
