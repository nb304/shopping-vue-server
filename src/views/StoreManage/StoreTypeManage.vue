<!--======店铺分类管理模块=======-->
<template>
  <div id="stortTypeDiv" style="margin:30px ;">

    <!-- ======================= 店铺类型按钮集合 =========================  -->
    <el-form :inline="true" :model="stroreCheckInSearchForm" class="demo-form-inline storeTypeSearchForm">
      <el-row :gutter="24">
        <el-col :sm="{span: 8}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-form-item label="店铺类型" style="width:100%;">
            <el-input v-model="storeTypeSearchForm.typeName" placeholder="查询分类名称" style="width:100%;"><i
              slot="prefix"
              class="el-icon-edit"
            /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span:4}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-button type="primary" icon="el-icon-search" style="width: 100% !important;" @click="onSubmit">搜索</el-button>
        </el-col>

        <el-col :sm="{span:4}" :xs="{span: 23}" style="margin-bottom: 10px;; ">
          <el-button type="primary" style="width: 100%;" @click="storeTypeFlags.addStoreTypeFlag = true">
            <svg-icon icon-class="tianjia" class-name="" style="width:14px !important; height:14px !important; margin-right:10px;" />
            添加类型
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- ======================= 店铺类型按钮集合 (结束) =========================  -->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>共900个店铺类型</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>

    <!-- ======================= 用户反馈Table =========================  -->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}" class="title-menu-min">

        <el-table :data="storeCheckInDatas" border style="width: 100%">
          <el-table-column prop="checkInId" label="分类编号" width="120" show-overflow-tooltip="true" />
          <el-table-column label="店铺名称" prop="storeName" show-overflow-tooltip="true" />
          <el-table-column prop="storeName" label="分类姓名" width="120" show-overflow-tooltip="true" />
          <el-table-column label="店铺分类图标" prop="checkInCard" width="200" show-overflow-tooltip="true" />
          <el-table-column label="达到要求" width="100" show-overflow-tooltip="true">
            <el-button type="text" size="small" @click="storeTypeFlags.storeTypeReachFlag = true">查看</el-button>
          </el-table-column>
          <el-table-column label="福利" width="100" show-overflow-tooltip="true">
            <el-button type="text" size="small">查看</el-button>
          </el-table-column>
          <el-table-column prop="username" label="创建时间" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="zfbNumber" label="创建人" width="120" show-overflow-tooltip="true" />
          <el-table-column prop="state" label="最后修改人" width="100" show-overflow-tooltip="true" />
          <el-table-column prop="disposeName" label="状态" show-overflow-tooltip="true" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="storeTypeFlags.editStoreTypeFlag = true">修改</el-button>
              <el-button type="text" size="small" @click="isReplyMerchantDiv = true;">删除</el-button>
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

    <!-- ======================= 添加店铺分类 =========================  -->
    <el-dialog
      custom-class="addStoreType"
      width="400px"
      top="1vh"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="添加店铺分类"
      :visible.sync="storeTypeFlags.addStoreTypeFlag"
    >
      <el-form :inline="true" :model="addStoreTypeForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="分类名称" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入分类名称" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-divider>达到要求</el-divider>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="总售出量" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入总售出量" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="月售出量" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入月售出量" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="好评率" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入好评率" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-divider>福利</el-divider>
          </el-col>

          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-card class="box-card">
              <div class="text item">
                等待开发
              </div>
            </el-card>
          </el-col>

        </el-row>

        <el-row>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-button type="primary" style="width: 100% !important; margin-top: 0.625rem;" @click="onSubmit">增加类型</el-button>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-button style="width: 100% !important; margin-top: 0.625rem;" @click="storeTypeFlags.addStoreTypeFlag = false">关闭窗口</el-button>
          </el-col>

        </el-row>
      </el-form>
      <!-- <el-row :gutter="24">
					<el-col :sm="{span: 8}" :xs="{span: 24}">
						<el-button style="width: 100% !important; margin-top: 10px;" type="primary" @click="isReplyMerchantDiv = false">回复</el-button>
					</el-col>
					<el-col :sm="{span: 8}" :xs="{span: 24}">
						<el-button style="width: 100% !important; margin-top: 10px;" @click="isReplyMerchantDiv = false">关闭窗口</el-button>
					</el-col>
				</el-row> -->
    </el-dialog>
    <!-- ======================= 添加店铺分类(结束) =========================  -->

    <!-- ======================= 查看分类达到要求 =========================  -->
    <el-dialog
      custom-class="addStoreType"
      width="400px"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="查看分类达到要求"
      :visible.sync="storeTypeFlags.storeTypeReachFlag"
    >
      <el-form :inline="true" :model="addStoreTypeForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-divider>达到要求</el-divider>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="总售出量" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入总售出量" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="月售出量" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入月售出量" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="好评率" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入好评率" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-button style="width: 100% !important; margin-top: 0.625rem;" @click="storeTypeFlags.storeTypeReachFlag = false">关闭窗口</el-button>
          </el-col>

        </el-row>
      </el-form>
    </el-dialog>
    <!-- ======================= 查看分类达到要求(结束) =========================  -->

    <!-- ======================= 修改店铺分类 =========================  -->
    <el-dialog
      custom-class="addStoreType"
      width="400px"
      top="1vh"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="修改店铺分类"
      :visible.sync="storeTypeFlags.editStoreTypeFlag"
    >
      <el-form :inline="true" :model="addStoreTypeForm" class="demo-form-inline" label-width="80px">
        <el-row :gutter="24">
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="分类名称" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入分类名称" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-divider>达到要求</el-divider>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="总售出量" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入总售出量" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="月售出量" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入月售出量" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-form-item label="好评率" style="width:100%;">
              <el-input v-model="addStoreTypeForm.stroeName" placeholder="请输入好评率" style="width:100%;"><i
                slot="prefix"
                class="el-icon-edit"
              /></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-divider>福利</el-divider>
          </el-col>

          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-card class="box-card">
              <div class="text item">
                等待开发
              </div>
            </el-card>
          </el-col>

        </el-row>

        <el-row>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-button type="primary" style="width: 100% !important; margin-top: 0.625rem;" @click="onSubmit">增加类型</el-button>
          </el-col>
          <el-col :sm="{span: 24}" :xs="{span: 24}">
            <el-button style="width: 100% !important; margin-top: 0.625rem;" @click="storeTypeFlags.editStoreTypeFlag = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- ======================= 修改店铺分类(结束) =========================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {

      // 添加店铺的分类名称Form
      addStoreTypeForm: {
        stroeName: ''
      },
      // 店铺类型Flag
      storeTypeFlags: {
        // 添加类型
        addStoreTypeFlag: false,
        // 查看达到要求
        storeTypeReachFlag: false,
        // 修改店铺分类
        editStoreTypeFlag: false
      },
      // 分页总条数
      total: 100,
      // 店铺类型查询Form
      storeTypeSearchForm: {
        typeName: ''
      },
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
      ]
    }
  }
}
</script>

<style>
  .addStoreType .el-form-item__label {
    margin-left: 1.0625rem;
  }

  @media only screen and (min-width: 310px) and (max-width: 500px) {
    #stortTypeDiv .el-form-item__content {
      width: 100% !important;
    }

    #stortTypeDiv .storeTypeSearchForm .el-form-item__content {
      width: 75% !important;
    }
  }

  #stortTypeDiv .el-form-item__content {
    width: 80%;
  }

  #stortTypeDiv .el-range-separator {
    width: 10% !important;
  }

  #stortTypeDiv .el-divider span {
    color: #606266;
    font-weight: bold;
  }

  #stortTypeDiv .el-table__row th .cell {
    word-break: keep-all;
    white-space: nowrap;
    padding: 0px 0px;
  }

  #stortTypeDiv .el-table__row th {
    padding: 3px 0px;
    padding-left: 10px;
    color: #606266;

  }

  #stortTypeDiv .el-table__row td {
    padding: 3px 0;
  }
</style>
