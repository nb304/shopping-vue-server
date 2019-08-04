<!--======店铺信息管理模块=======-->
<template>

  <div id="stortInfo" style="margin: 50px 0px 0 0px !important;">

    <!-- ======================= 店铺信息管理  =========================  -->
    <el-divider content-position="left">店铺信息管理</el-divider>
    <div id="stortDiv" style="margin: 30px 50px 0 50px;">
      <el-form :inline="true" :model="stortInfoForm" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :sm="{span: 23}" :lg="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺名称" style="width:100% !important;">
              <el-input v-model="stortInfoForm.stortName" style="width:100% !important;" placeholder="店铺名称" />
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 23}" :lg="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺网址" style="width:100% !important;">
              <el-input v-model="stortInfoForm.stortUrl" style="width:100% !important;" disabled placeholder="店铺网址" />
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 23}" :lg="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺等级" style="width:100% !important;">
              <el-input v-model="stortInfoForm.storeLeven" style="width:100% !important;" disabled placeholder="店铺等级" />
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 23}" :lg="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺图片" style="width:100% !important;">
              <el-button type="primary" style="width: 100%;" @click="stortDivFlags.storeLogoFlag = true">设置店铺LOGO</el-button>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 23}" :lg="{span: 12}" :xs="{span: 23}">
            <el-form-item label="设支付宝" style="width:100% !important;">
              <el-button type="primary" style="width: 100%;" @click="stortDivFlags.gatheringFlag = true">设置收款的支付宝账户</el-button>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 23}" :lg="{span: 12}" :xs="{span: 23}">
            <el-form-item label="店铺描述" style="width:100% !important;">
              <el-input v-model="stortInfoForm.storeDesc" type="textarea" class="InputPx1200" />
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 8}" :lg="{span: 4}" :xs="{span: 23}">
            <el-form-item style="width:100%;">
              <el-button type="danger" class="btn" style="width: 215px; margin-left: 70px;">确认修改</el-button>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 8}" :lg="{span: 4}" :xs="{span: 23}">
            <el-form-item>
              <el-button type="primary" class="recoverBtn" style="width: 215px; margin-left: 110px; ">恢复默认</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- ======================= 店铺信息管理(结束) =========================  -->

    <!-- ======================= 设置店长支付宝 =========================  -->
    <el-dialog
      :append-to-body="true"
      width="400px"
      :close-on-click-modal="false"
      title="编辑店长支付宝账户"
      :visible.sync="stortDivFlags.gatheringFlag"
      class="title-menu-min2"
    >

      <el-form ref="editGatheringForm" label-position="left" :model="editGatheringForm" label-width="100px">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="身份证信息" style="width:100%;">
              <el-input v-model="editGatheringForm.identity" placeholder="请填写你'申请入驻'时的身份证信息" />
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="手机号信息" style="width:100%;">
              <el-input v-model="editGatheringForm.phone" placeholder="请填写你'申请入驻'时的手机号码信息" />
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="入住时姓名" style="width:100%;">
              <el-input v-model="editGatheringForm.name" placeholder="请填写你'申请入驻'时的姓名" />
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="当前收款账户" style="width:100%;">
              <el-input v-model="editGatheringForm.oldGathering" placeholder="请填写你'旧支付宝账户'" />
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="新的收款账户" style="width:100%;">
              <el-input v-model="editGatheringForm.newGathering" placeholder="请填写你'新支付宝账户'" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:4}" :xs="{span: 24}">

            <el-button type="primary" style="width:100%;margin-bottom: 15px;" @click="stortDivFlags.verificationFlag = true">发送验证码</el-button>
          </el-col>

          <el-col :sm="{span: 8}" :xs="{span: 24}">
            <el-button style="width:100%;margin-bottom: 15px !important;" @click="stortDivFlags.gatheringFlag = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-dialog
        custom-class="verificationClass"
        :append-to-body="true"
        width="400px"
        :close-on-click-modal="false"
        title="编辑店长支付宝账户"
        :visible.sync="stortDivFlags.verificationFlag"
        class="title-menu-min2"
      >

        <el-form ref="editGatheringForm" :inline="true" label-position="left" :model="editGatheringForm" label-width="70px">
          <el-row :gutter="24">
            <el-col :sm="{span: 18}" :xs="{span: 18}">
              <el-form-item label="验证码">
                <el-input v-model="editGatheringForm.verification" style="width:100%;" placeholder="请填写你验证码" />
              </el-form-item>
            </el-col>

            <el-col class="reloadBtn" :sm="{span: 6}" :xs="{span: 6}">
              <el-button type="primary" style="width:100%;margin-bottom: 15px !important;" @click="stortDivFlags.gatheringFlag = false">重新发送</el-button>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :sm="{span: 8,offset:4}" :xs="{span: 24}">

              <el-button type="primary" style="width:100%;margin-bottom: 15px;" @click="stortDivFlags.verificationFlag = false">确认修改</el-button>
            </el-col>

            <el-col :sm="{span: 8}" :xs="{span: 24}">
              <el-button style="width:100%;margin-bottom: 15px !important;" @click="stortDivFlags.verificationFlag = false">关闭窗口</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>

    </el-dialog>
    <!-- ======================= 设置店长支付宝(结束) =========================  -->

    <!-- ======================= 设置店铺LOGO=========================  -->

    <el-dialog
      :append-to-body="true"
      width="60%"
      custom-class="storeLogo"
      :close-on-click-modal="false"
      title="设置店铺LOGO"
      :visible.sync="stortDivFlags.storeLogoFlag"
      class="title-menu-min2"
    >
      <el-divider content-position="left">当前LOGO</el-divider>
      <el-row :gutter="24">
        <el-col :sm="{span: 23}" :xs="{span: 23}">
          <el-image style="width: 100px; height: 100px" :src="editStoreLogoForm.oldUrl" fit="scale-down" />
        </el-col>
      </el-row>
      <el-divider content-position="left">新的LOGO</el-divider>
      <el-row :gutter="24">
        <el-col :sm="{span: 23}" :xs="{span: 23}">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://192.168.0.127/ucc/vue/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            name="fileImage"
            :multiple="true"
            limit="1"
            accept="image/*"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary">选取需要上传的文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且图片数量最多为6张,最少为一张</div>
            <div slot="tip" class="el-upload__tip">图片默认显示顺序也是根据上传的顺序规定</div>
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button type="primary" style="width:100%;margin-top: 15px;" @click="stortDivFlags.storeLogoFlag = false">确认修改</el-button>
        </el-col>
        <el-col :sm="{span: 8}" :xs="{span: 24}">
          <el-button style="width:100%;margin-top: 15px !important;" @click="stortDivFlags.storeLogoFlag = false">关闭窗口</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- ======================= 设置店铺LOGO(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 修改店铺的LOGOForm
      editStoreLogoForm: {
        oldUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        newUrl: ''
      },
      // 修改店长支付宝Form
      editGatheringForm: {
        identity: '',
        phone: '',
        name: '',
        oldGathering: '',
        newGathering: '',
        verification: ''
      },
      // 店铺弹出层Div
      stortDivFlags: {
        // 店长收款DivFlag
        gatheringFlag: false,
        // 验证码flag
        verificationFlag: false,
        // 店铺LOGOFlag
        storeLogoFlag: false
      },
      // 店铺信息管理Form
      stortInfoForm: {
        stortName: '鹿七七的小店',
        stortUrl: 'http://localhost:8080/store/luqiqi/23',
        storeLeven: '皇冠',
        storeDesc: ''
      }
    }
  }
}
</script>

<style>
	.verificationClass .reloadBtn {
		padding-left: 0px !important;
	}

	.verificationClass .el-col {
		padding-right: 0px !important;
	}

	.verificationClass .el-form-item__content {
		width: 70% !important;
	}

	#stortInfo .el-form-item__content {
		width: 77% !important;
	}

	@media only screen and (min-width: 300px) and (max-width: 409px) {
		.storeLogo {
			width: 100% !important;
		}

		#stortInfo .el-form-item__content {
			width: 77% !important;
		}

		#stortDiv {
			margin: 0px 10px 0 20px !important;
		}

		.btn {
			width: 250px !important;
		}

		.recoverBtn {
			margin-left: 70px !important;
			width: 250px !important;
		}
	}

	@media only screen and (min-width: 410px) and (max-width: 500px) {
		.storeLogo {
			width: 100% !important;
		}

		#stortDiv {
			margin: 0px 10px 0 20px !important;
		}

		.btn {
			width: 280px !important;
		}

		.recoverBtn {
			margin-left: 70px !important;
			width: 280px !important;
		}

	}

	@media only screen and (min-width: 1300px) and (max-width: 1400px) {}
</style>
