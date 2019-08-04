<!--======我的个人中心模块=======-->
<template>

  <div id="myInforMation">

    <!-- ======================= 个人中心 =========================  -->
    <el-row :gutter="20">
      <!-- ======================= 左边的账户资料 =========================  -->
      <el-col :xs="{span: 24}" :lg="{span: 6}">

        <transition name="el-fade-in-linear">

          <!-- ======================= 显示的账户资料 =========================  -->
          <div v-if="isShowMyInfo" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
            <el-card class="box-card" style="width: 100% !important; max-height: 500px; min-height: 500px;">
              <div slot="header" class="clearfix">
                <span style="font-size: 15px;">个人资料</span>
                <el-button style="float: right; padding: 0px 0;font-size: 12px;" type="text" @click="editUserInfo">编辑</el-button>
              </div>
              <div class="text item">
                <!-- ======================= 头像(结束) =========================  -->
                <el-col :xs="{span: 24}" :lg="{span: 24}" style="text-align: center;">
                  <div class="block" style="margin-top: 10px;">
                    <div style="cursor: pointer;" @click="editUserImage">
                      <el-avatar :size="100" :src="url" />
                    </div>
                    <p style="font-family: 楷体; font-size: 20px;">
                      鹿七七
                      <svg-icon icon-class="xingbienan" style="width:20px;height: 20px;" />
                    </p>
                    <p style="font-family: 楷体; font-size: 14px;">花如盛世绽放，以人心培育</p>
                  </div>
                </el-col>
                <!-- ======================= 头像(结束) =========================  -->

                <!-- ======================= 其他信息 =========================  -->
                <el-col :xs="{span: 24}" :lg="{span: 24}" style="text-align: center;">
                  <div class="block" style="margin-top: 20px;">
                    <el-divider content-position="left"><i class="el-icon-shopping-cart-full" style="font-size: 17px;" /></el-divider>
                    <el-card shadow="hover" style="width:100%; border: none; text-align: left; font-size: 12px; margin-bottom: 5px;">
                      <span type="primary">注册时间 <i class="el-icon-time" />:&nbsp;&nbsp;</span> 2019年07月18日 10:07
                    </el-card>

                    <el-card shadow="hover" style="width:100%; border: none; text-align: left;  font-size: 12px; margin-bottom: 5px;">
                      <span type="primary">所在地址
                        <svg-icon icon-class="dizhi" /> :&nbsp;&nbsp;</span> 江西省 上饶市 广丰区
                    </el-card>

                    <el-card shadow="hover" style="width:100%; border: none; text-align: left;  font-size: 12px; margin-bottom: 5px;">
                      <span type="primary">总订单数
                        <svg-icon icon-class="dingdanhei" /> :&nbsp;&nbsp;</span> 36笔
                    </el-card>

                    <el-card shadow="hover" style="width:100%; border: none; text-align: left;  font-size: 12px; margin-bottom: 5px;">
                      <span type="primary">担任职位
                        <svg-icon icon-class="zhiwei" /> :&nbsp;&nbsp;</span> 客服
                    </el-card>

                    <el-card shadow="hover" style="width:100%; border: none; text-align: left;  font-size: 12px; margin-bottom: 5px;">
                      <span type="primary">信用积分
                        <svg-icon icon-class="xinyong" /> :&nbsp;&nbsp;</span> <span style="color: #4FFF40;">100</span>
                    </el-card>
                  </div>
                </el-col>
                <!-- ======================= 其他信息(结束) =========================  -->
              </div>
            </el-card>
          </div>
          <!-- ======================= 显示的账户资料(结束) =========================  -->

          <!-- ======================= 修改账户资料 =========================  -->
          <transition name="el-fade-in-linear">
            <div v-if="isEditMyInfo" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)  margin-bottom: 20px;">
              <el-card class="box-card" style="width: 100% !important; max-height: 500px; min-height: 500px;">
                <div slot="header" class="clearfix">
                  <span style="font-size: 15px;">编辑资料</span>
                  <el-button style="float: right; padding: 0px 0;font-size: 12px;" type="text" @click="closeEditWindows">关闭</el-button>
                  <el-button style="float: right; padding: 0px 0;font-size: 12px;" type="text" @click="updateInfo">保存</el-button>
                </div>
                <div class="text item">

                  <div class="block" style="margin-top: 20px;">
                    <el-form
                      ref="editUserInfoForm"
                      :inline="true"
                      label-position="left"
                      :model="editUserInfoForm"
                      label-width="50px"
                    >
                      <el-col :sm="{span: 23}" :xs="{span: 23}">
                        <el-form-item label="昵称">
                          <el-input v-model="editUserInfoForm.patName" style="width:100%;" placeholder="请填写你昵称" />
                        </el-form-item>
                      </el-col>

                      <el-col :sm="{span: 23}" :xs="{span: 23}">
                        <el-form-item label="所在地">
                          <el-cascader
                            v-model="editUserInfoForm.address"
                            filterable
                            style="width: 100%;"
                            :options="options"
                            @change="handleChange"
                          />
                        </el-form-item>
                      </el-col>

                      <el-col :sm="{span: 23}" :xs="{span: 23}">
                        <el-form-item label="性别">
                          <el-radio v-model="editUserInfoForm.sex" label="1">男</el-radio>
                          <el-radio v-model="editUserInfoForm.sex" label="2">女</el-radio>
                        </el-form-item>
                      </el-col>

                      <el-col :sm="{span: 23}" :xs="{span: 23}">
                        <el-form-item label="手机号">
                          <el-input v-model="editUserInfoForm.phone" style="width:100%;" placeholder="请填写你的手机号" />
                        </el-form-item>
                      </el-col>

                      <el-col :sm="{span: 23}" :xs="{span: 23}">
                        <el-form-item label="签名">
                          <el-input v-model="editUserInfoForm.ps" type="textarea" style="width:100%;" placeholder="个性签名" />
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </div>
                </div>
              </el-card>
            </div>
          </transition>
          <!-- ======================= 修改账户资料(结束) =========================  -->
        </transition>
      </el-col>
      <!-- ======================= 左边的账户资料(结束) =========================  -->

      <!-- ======================= 右边的个人中心 =========================  -->
      <el-col :xs="{span: 24}" :lg="{span: 16}">
        <div style="max-height: 600px; min-height: 600px;  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); padding: 10px;">
          <el-tabs tab-position="top" style="height: 100%;">

            <!-- ======================= 我的资金 =========================  -->
            <el-tab-pane label="我的资金">
              <el-row>
                <el-col :xs="{span: 6}" :lg="{span: 4}">
                  <svg-icon class="fanghu" icon-class="qianbao" style="width: 130px; height: 95px;" />
                </el-col>
                <el-col :xs="{span: 18}" :lg="{span: 20}">
                  <el-alert
                    title="这里是您的资金,资金包括(可提现资金,冻结中资金,扣押资金,已提现资金,...),这里只进行金钱的统计,详细信息请进入对应模块查看."
                    type="success"
                    :closable="false"
                  />
                </el-col>
              </el-row>

              <div id="zhanghuSafety">
                <el-divider />

                <!-- ======================= 资金列表 =========================  -->
                <el-row v-for="fund in fundDatas" :key="fund.fundName" style=" margin-top: 20px;">
                  <div style="height: 60px;">
                    <el-col :xs="{span: 24}" :lg="{span: 12}">
                      <el-col :xs="{span: 8}" :lg="{span: 8}">
                        <span style="line-height: 60px; padding-left: 20px;">{{ fund.fundName }}：</span>
                      </el-col>
                      <el-col :xs="{span: 8}" :lg="{span: 8}">
                        <span style="line-height: 60px;">{{ fund.fundValue }}</span>
                      </el-col>
                      <el-col :xs="{span: 8}" :lg="{span: 8}">
                        <span style="line-height: 60px;color: #409EFF; cursor: pointer;" @click="lookFundInfo(fund.infoTitle)">查看</span>
                      </el-col>
                    </el-col>
                  </div>
                  <el-divider />
                </el-row>
                <!-- ======================= 资金列表(结束) =========================  -->
              </div>
            </el-tab-pane>
            <!-- ======================= 我的资金(结束) =========================  -->

            <!-- ======================= 账号安全 =========================  -->
            <el-tab-pane label="账号安全">
              <el-row>
                <el-col :xs="{span: 6}" :lg="{span: 4}">
                  <svg-icon class="fanghu" :icon-class="fanghuClass" style="width: 130px; height: 95px;" />
                </el-col>
                <el-col :xs="{span: 18}" :lg="{span: 20}">
                  <el-alert title="账号安全评分为:95 , 您的账号安全状况棒棒哒，请继续保持良好的安全习惯哦" type="success" :closable="false" />
                </el-col>
              </el-row>

              <div id="zhanghuSafety" style="max-height: 400px; min-height: 400px;">
                <el-divider />
                <!-- ======================= 安全信息 =========================  -->
                <el-row v-for="user in userSafetyData" :key="user.key">
                  <div style="height: 60px;">
                    <el-col :xs="{span: 8}" :lg="{span: 8}">
                      <span style="line-height: 60px; font-size: 14px; margin: 0 20px;">
                        <svg-icon :icon-class="user.keyIcon" />
                        {{ user.key }}
                      </span>
                    </el-col>
                    <el-col :xs="{span: 8}" :lg="{span: 8}">
                      <span style="line-height: 60px; font-size: 12px; ">{{ user.state }}</span>
                    </el-col>
                    <el-col :xs="{span: 8}" :lg="{span: 8}">
                      <span style="line-height: 60px; ">
                        <el-link type="primary" :underline="false" style="font-size: 12px; cursor: pointer;">{{ user.functionBtm }}</el-link>
                      </span>
                    </el-col>
                  </div>

                  <el-divider />
                </el-row>
                <!-- ======================= 安全信息 (结束)=========================  -->
              </div>
            </el-tab-pane>
            <!-- ======================= 账号安全(结束) =========================  -->

            <!-- ======================= 登入记录 =========================  -->
            <el-tab-pane label="登入记录">
              <el-alert
                title="登入记录"
                type="warning"
                description="根据登录时间，IP，地理位置，若判断为异常情况，请在核实后及时修改密码 !!!只显示最后十条的信息"
                :closable="false"
              />

              <div style="max-height: 450px !important;" class="title-menu-min">
                <el-table :data="tableData" border style="width: 100%; ">
                  <el-table-column prop="date" fixed label="时间" width="200" />
                  <el-table-column prop="ipaddress" label="IP地址" width="200" />
                  <el-table-column prop="address" label="地理位置" min-width="120" />
                </el-table>
              </div>
            </el-tab-pane>
            <!-- ======================= 登入记录(结束) =========================  -->

            <!-- ======================= 实名认证 =========================  -->
            <el-tab-pane label="实名认证">
              <el-card id="shiming" class="box-card" style="width: 350px; border: 2px solid #DDDDDD; border-radius: 4px;">
                <div slot="header" class="clearfix">
                  <span style="font-size: 20px; font-weight: bold;">

                    <svg-icon icon-class="shenfenzheng" style="font-size: 20px;" /> 你已经通过了实名认证
                  </span>
                </div>
                <div class="text item" style="font-size: 0.75rem; margin-left: 30px;">
                  真实姓名： **七
                </div>
                <div class="text item" style="font-size: 0.75rem; margin-left: 30px; margin-top: 20px;">
                  证号号码： 36***************5
                </div>

              </el-card>
            </el-tab-pane>
            <!-- ======================= 实名认证(结束) =========================  -->
          </el-tabs>
        </div>
      </el-col>
      <!-- ======================= 右边的个人中心(结束) =========================  -->
    </el-row>

    <!--  头像上传组件 -->
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />

  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      // 资金列表的数据
      fundDatas: [{
        fundName: '可提现资金',
        fundValue: '300',
        infoTitle: '请进入"资金管理"模块查看详情'
      }, {
        fundName: '冻结资金',
        fundValue: '300',
        infoTitle: '请进入"资金管理"模块查看详情'
      }, {
        fundName: '扣押资金',
        fundValue: '300',
        infoTitle: '请进入"资金管理"模块查看详情'
      }, {
        fundName: '已提现资金',
        fundValue: '300',
        infoTitle: '请进入"资金管理"模块查看详情'
      }],
      // 账户安全数据
      userSafetyData: [{
        key: '手机号',
        keyIcon: 'anquan-zh',
        state: '已绑定',
        functionBtm: '更换手机号'
      },
      {
        key: '邮箱',
        keyIcon: 'jinggao-zh',
        state: '未绑定',
        functionBtm: '绑定邮箱'
      },
      {
        key: '实名认证',
        keyIcon: 'anquan-zh',
        state: '已认证',
        functionBtm: '查看详情'
      },
      {
        key: '设置密码',
        keyIcon: 'anquan-zh',
        state: '已设置',
        functionBtm: '修改密码'
      }
      ],
      // 账户安全的图标
      fanghuClass: 'fanghu-3',
      // 登录记录的数据
      tableData: [{
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }, {
        date: '2019-07-18 11:23:03',
        ipaddress: '183.193.***.**',
        address: '中国上海移动'
      }],
      // 所在地
      options: [{
        value: 'jx',
        label: '江西',
        children: [{
          value: 'shangrao',
          label: '上饶',
          children: [{
            value: 'gf',
            label: '广丰'
          }]
        }]
      },
      {
        value: 'bj',
        label: '北京',
        children: [{
          value: 'beijing',
          label: '北京市'
        }]
      }
      ],
      // 编辑个人资料
      editUserInfoForm: {
        patName: '',
        sex: '',
        address: [],
        phone: '',
        // 个性签名
        ps: ''
      },
      // 个人信息的头像
      url: 'http://39.105.41.2:8080/uec//media/file//ideaBackImg.jpg',
      // 是否是观看的个人信息
      isShowMyInfo: true,
      // 是否修改个人信息
      isEditMyInfo: false,
      imagecropperShow: false,
      imagecropperKey: 0
    }
  },
  mounted() {},
  methods: {
    // 查看资金详情
    lookFundInfo(info) {
      this.$message({
        showClose: true,
        message: info
      })
    },
    // 上传头像的方法
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    },
    // 显示账户修改页面
    editUserInfo() {
      this.isShowMyInfo = false
      this.isEditMyInfo = true
    },
    // 关闭修改页面
    closeEditWindows() {
      this.isEditMyInfo = false
      this.isShowMyInfo = true
    },
    // 保存修改的账户信息
    updateInfo() {
      this.closeEditWindows()
    },
    handleChange(value) {
      console.log(value)
    },
    // 更换头像
    editUserImage() {
      if (document.body.clientWidth < 700) {
        this.$message({
          showClose: true,
          message: '手机端暂不支持更换头像,请使用电脑切换',
          type: 'warning'
        })
        return
      }
      this.imagecropperShow = true
    }
  }
}
</script>

<style>
  @media only screen and (min-width: 300px) and (max-width: 700px) {
    .fanghu {
      width: 80px !important;
    }
  }

  #zhanghuSafety .el-divider {
    margin: 5px !important;
  }

  #myInforMation {
    margin: 1.875rem;
    background-color: ;
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

  #myInforMation .el-form-item__content {
    width: 13.125rem !important;
  }

  #myInforMation #shiming .el-card__body {
    padding: 0px !important;
    background-color: #F9F9F9;
    height: 6.875rem;
    padding-top: 30px !important;
  }
</style>
