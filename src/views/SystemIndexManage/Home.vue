<!--======首页管理模块=======-->
<template>
  <div class="dashboard-container">

    <!-- ======================= 系统主页的统计 =========================  -->
    <el-row :gutter="20">
      <el-col :lg="{span: 6}" :xs="{span: 12}" style="margin-bottom: 10px;">
        <el-card shadow="always" style="min-height: 6.6875rem;max-height: 6.6875rem; cursor: pointer;">
          <el-col :lg="{span: 6}" :xs="{span: 24}" style="min-height: 87px;">
            <span style="line-height: 87px;">
              <svg-icon icon-class="shangpinhei" style="width: 50px; height: 3.4375rem; margin-top: 10px; " />
            </span>
          </el-col>
          <el-col :lg="{span: 18}" :xs="{span: 0}" style="min-height: 87px;">
            <span style="float: right; font-size: 18px; margin-top: 11px; ">
              <p style="color: #8C8C8C;margin-bottom: 5px;">商品数量</p>
              <p style="color: #666666;">9999</p>
            </span>
          </el-col>
        </el-card>
      </el-col>
      <el-col :lg="{span: 6}" :xs="{span: 12}" style="margin-bottom: 10px;">
        <div @click="checkStatistic()">
          <el-card shadow="always" style="min-height: 6.6875rem;max-height: 6.6875rem; cursor: pointer;">
            <el-col :lg="{span: 6}" :xs="{span: 24}" style="min-height: 87px;">
              <span style="line-height: 87px;">
                <svg-icon icon-class="zijinhei" style="width: 50px; height: 3.4375rem; margin-top: 10px; " />
              </span>
            </el-col>
            <el-col :lg="{span: 18}" :xs="{span: 0}" style="min-height: 87px;">
              <span style="float: right; font-size: 18px; margin-top: 11px; ">
                <p style="color: #8C8C8C;margin-bottom: 5px;">总资金</p>
                <p style="color: #666666;">9999</p>
              </span>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :lg="{span: 6}" :xs="{span: 12}" style="margin-bottom: 10px;">
        <el-card shadow="always" style="min-height: 6.6875rem;max-height: 6.6875rem; cursor: pointer;">
          <el-col :lg="{span: 6}" :xs="{span:24}" style="min-height: 87px;">
            <span style="line-height: 87px;">
              <svg-icon icon-class="renyuan" style="width: 50px; height: 3.4375rem; margin-top: 10px; " />
            </span>
          </el-col>
          <el-col :lg="{span: 18}" :xs="{span: 0}" style="min-height: 87px;">
            <span style="float: right; font-size: 18px; margin-top: 11px; ">
              <p style="color: #8C8C8C;margin-bottom: 5px;">人员数量</p>
              <p style="color: #666666;">9999</p>
            </span>
          </el-col>
        </el-card>
      </el-col>

      <el-col :lg="{span: 6}" :xs="{span: 12}" style="margin-bottom: 10px;">
        <el-card shadow="always" style="min-height: 6.6875rem;max-height: 6.6875rem; cursor: pointer;">
          <el-col :lg="{span: 6}" :xs="{span: 24}" style="min-height: 87px;">
            <span style="line-height: 87px;">
              <svg-icon icon-class="dingdanhei" style="width: 50px; height: 3.4375rem; margin-top: 10px; " />
            </span>
          </el-col>
          <el-col :lg="{span: 18}" :xs="{span: 0}" style="min-height: 87px;">
            <span style="float: right; font-size: 18px; margin-top: 11px; ">
              <p style="color: #8C8C8C;margin-bottom: 5px;">订单数量</p>
              <p style="color: #666666;">9999</p>
            </span>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <!-- ======================= 系统主页的统计 =========================  -->
    <el-row>
      <div id="statisticDiv">
        <canvas id="myChart" width="400px" height="150px" />
      </div>
    </el-row>
    <!-- ======================= 系统主页的统计(结束) =========================  -->

    <!-- ======================= 其他功能 =========================  -->
    <el-row :gutter="24">
      <el-col :lg="{span: 6}" :xs="{span: 24}" style="margin-top: 15px;">
        <el-card shadow="always" style="min-height: 400px; max-height: 400px;" class="title-menu-min">
          <el-divider>文档列表</el-divider>
          <el-col :lg="{span: 24}" :xs="{span: 24}" style="margin-bottom: 10px;">
            <el-button type="primary" plain style="width: 100%;">下载平台使用说明文档</el-button>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <!-- ======================= 其他功能(结束) =========================  -->
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import Chart from 'chart.js'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      title: '商品数量',
      lineData: [65, 59, 0, 81, 56, 10, 40, 22, 32, 54, 10, 30],
      statisticType: 'line'
    }
  },
  created() {
    console.log("home")
    this.$notify({
      title: '注意!!!',
      message: '请尽量使用电脑打开后台管理系统,手机端适配暂不完全。',
      duration: 0
    })
  },
  mounted() {
    this.anewStatistic()
  },
  methods: {
    // 切换统计
    checkStatistic() {
      this.title = '总金额',
      this.lineData = [77, 88, 99, 33, 11, 10, 40, 62, 32, 87, 10, 30],
      this.statisticType = 'bar'
      this.anewStatistic()
    },
    anewStatistic() {
      var ctx2 = document.getElementById('myChart')

      var myChart2 = new Chart(ctx2, {
        type: this.statisticType,
        data: {
          labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月',
            '十一月', '十二月'
          ],
          datasets: [{
            label: this.title,
            backgroundColor: '#304156',
            borderColor: '#304156',
            borderWidth: 1,
            pointStrokeColor: '#fff',
            pointStyle: 'crossRot',
            data: this.lineData,
            cubicInterpolationMode: 'monotone',
            spanGaps: 'false',
            fill: 'false'
          }]
        },
        options: {

        }

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @media only screen and (min-width: 300) and (max-width: 700px) {
    #statisticDiv {
      height: 25rem;
    }

  }

  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

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
</style>
