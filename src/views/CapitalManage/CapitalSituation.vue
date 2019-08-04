<!--======资金概况模板=======-->
<template>

  <div id="capitalSituation" style="margin: 1rem">
    <el-row :gutter="20">
      <el-col :lg="{span: 24}" :xs="{span: 24}" style="margin-bottom: 10px;">
        <el-card
          shadow="always"
          style="min-height: 7.6875rem;max-height: 7.6875rem; cursor: pointer;"
        >
          <el-col
            :lg="{span: 24}"
            :xs="{span: 24}"
            style="display:flex; justify-content:space-around;min-height: 87px;"
          >
            <el-col :lg="{span: 6}" :xs="{span: 6}">
              <div style=" font-size: 18px; margin-top: 0.8rem; text-align: center">
                <p style="color: #666;margin-bottom: 1.3rem;">昨日总成交金额</p>
                <p style="color: #8C8C8C;">9999</p>
              </div>
            </el-col>
            <el-col :lg="{span: 6}" :xs="{span: 6}">
              <div style=" font-size: 18px; margin-top: 0.8rem; text-align: center">
                <p style="color: #666;margin-bottom: 1.3rem;">本月总成交金额</p>
                <p style="color: #8C8C8C;">9999</p>
              </div>
            </el-col>
            <el-col :lg="{span: 6}" :xs="{span: 6}">
              <div style=" font-size: 18px; margin-top: 0.8rem; text-align: center">
                <p style="color: #666;margin-bottom: 1.3rem;">上月总成交金额</p>
                <p style="color: #8C8C8C;">9999</p>
              </div>
            </el-col>
            <el-col :lg="{span: 6}" :xs="{span: 6}">
              <div style=" font-size: 18px; margin-top: 0.8rem; text-align: center">
                <p style="color: #666;margin-bottom: 1.3rem;">可提现金额</p>
                <p style="color: #8C8C8C;">9999</p>
              </div>
            </el-col>

            <div style=" font-size: 18px; margin-top: 0.8rem; text-align: center">
              <el-button type="primary">提现</el-button>
            </div>
          </el-col>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="{span: 8}" :xs="{span: 24}" style="margin-bottom: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日</span>
            <el-button style="font-size: 0.8rem; float: right; padding: 3px 0" type="text">明细</el-button>
          </div>
          <div v-for="(itme,index) in orderMoney" :key="index" class="text item">
            <span>{{ itme.title }}</span>
            <span>{{ itme.num }}</span>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="{span: 8}" :xs="{span: 24}" style="margin-bottom: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本月</span>
            <el-button style="float: right; padding: 3px 0" type="text">明细</el-button>
          </div>
          <div v-for="(itme,index) in orderMoney" :key="index" class="text item">
            <span>{{ itme.title }}</span>
            <span>{{ itme.num }}</span>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="{span: 8}" :xs="{span: 24}" style="margin-bottom: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>上月</span>
            <el-button style="float: right; padding: 3px 0" type="text">明细</el-button>
          </div>
          <div v-for="(itme,index) in orderMoney" :key="index" class="text item">
            <span>{{ itme.title }}</span>
            <span>{{ itme.num }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <!-- <span>数量:900笔</span> -->
            <!-- <el-divider direction="vertical" /> -->
            <!-- <span>时间:2019年1月1日-2019年2月2日</span> -->
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24">
      <el-col :sm="{span:9}" :xs="{span: 24}" style="margin-bottom: 10px;">
        <el-date-picker
          v-model="val7"
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

      <el-col :sm="{span: 3}" :xs="{span: 24}" style="margin-bottom: 10px;">
        <el-button type="primary" icon="el-icon-search" style="width: 100% !important;">搜索</el-button>
      </el-col>
    </el-row>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <!-- <span>数量:900笔</span> -->
            <el-divider direction="vertical" />
            <span>时间:2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <!-- ======================= Table(开始) =========================  -->
    <el-row :gutter="23" style="box-sizing: border-box;padding: 0.2rem 1rem;">
      <el-col :sm="{span: 24}" :xs="{span: 24}" class="title-menu-min">
        <el-table :data="storeCheckInDatas" border style="width: 100%">
          <el-table-column prop="checkInId" label="时间" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="storeName" label="成交订单" show-overflow-tooltip="true" />
          <el-table-column
            prop="storeName"
            label="成交订单总金额"
            width="120"
            show-overflow-tooltip="true"
          />
          <el-table-column
            prop="checkInCard"
            label="退款订单数"
            width="200"
            show-overflow-tooltip="true"
          />
          <el-table-column
            prop="checkInPhone"
            label="退款订单总金额"
            width="120"
            show-overflow-tooltip="true"
          />
          <el-table-column
            prop="checkInTime"
            label="冻结资金"
            width="150"
            show-overflow-tooltip="true"
          />
          <el-table-column prop="goMomey" label="可提现资金" width="120" show-overflow-tooltip="true" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button type="text" size="mini" style="padding:2px 15px !important;">明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- ======================= 分页层 =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 4, offset: 17}" :xs="{span: 24}">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      // 快捷时间选择
      val7: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },

      // 资金信息展示
      orderMoney: [
        { title: '今日成交订单数', num: '12' },
        { title: '今日成交金额', num: '12' },
        { title: '今日退款中订单', num: '12' },
        { title: '今日退款中订单金额', num: '12' }
      ],
      storeCheckInDatas: [
        {
          checkInId: '2019-7-7',
          storeName: '323',
          checkInName: '12',
          checkInCard: '1232',
          checkInPhone: '21321',
          checkInTime: '23223',
          goMomey: 12322
        },
        {
          checkInId: '2019-7-7',
          storeName: '323',
          checkInName: '12',
          checkInCard: '1232',
          checkInPhone: '21321',
          checkInTime: '23223',
          goMomey: 12322
        },
        {
          checkInId: '2019-7-7',
          storeName: '323',
          checkInName: '12',
          checkInCard: '1232',
          checkInPhone: '21321',
          checkInTime: '23223',
          goMomey: 12322
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
@media only screen and (min-width: 310px) and (max-width: 500px) {
  #capitalSituation .el-form-item__content {
    width: 100% !important;
  }

  #capitalSituation .storeTypeSearchForm .el-form-item__content {
    width: 75% !important;
  }
}

#capitalSituation .el-form-item__content {
  width: 80%;
}

#capitalSituation .el-range-separator {
  width: 10% !important;
}

#capitalSituation .el-divider span {
  color: #606266;
  font-weight: bold;
}

#capitalSituation .el-table__row th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}

#capitalSituation .el-table__row th {
  padding: 3px 0px;
  padding-left: 10px;
  color: #606266;
}

#capitalSituation .el-table__row td {
  padding: 3px 0;
}
#capitalSituation .el-divider span {
  color: #606266;
  font-weight: bold;
}

#capitalSituation .el-table th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}
#capitalSituation .el-table th {
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
#capitalSituation .el-table td {
  padding: 0px;
}

.el-range-separator {
  width: 1rem !important;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 1rem 0 0.6rem;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  font-size: 1.2rem;
}

.box-card {
  width: 100%;
}
</style>

