
<!--======推广管理模块=======-->
<template>
  <div id="Promotion" style="margin: 1rem">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="推广人昵称">
            <el-input v-model="form.region" placeholder="输入推广人"></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="被推广人昵称" label-width="140px">
            <el-input v-model="form.region" placeholder="输入被推广人"></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 4}" :xs="{span: 24}">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              style="width: 100% ;"
              @click="onSearch()"
            >查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

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

    <el-table :data="list" class="title-menu-min" border style="width: 100%">
      <el-table-column prop="brandNumber" label="编号" width="100" show-overflow-tooltip="true" />
      <el-table-column prop="promoter" label="推广人" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="promotee" label="被推广人" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="entryTime" label="推广进入时间" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="reward" label="推广人获得奖励" show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="promoterTime" label="推广人推广人数" show-overflow-tooltip="true"></el-table-column>

      <el-table-column fixed="right" label="操作" width="150" style="padding: 3px 0;">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="addShops(scope.$index, list)"
            type="text"
            size="primary"
          >查看全部推广人</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--==================分页组件(开始)========================-->
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
    <!--==================分页组件(结束)========================-->

    <!--===================查看推广人数(开始)========================-->
    <el-dialog title="查看推广人数" :visible.sync="addShopsVisible" width="60%">
      <el-row :gutter="24" style="padding：0;">
        <el-form ref="form" :model="form" label-width="100px">

          <el-col :sm="{span: 6}" :xs="{span: 24}">
            <el-form-item label="被推广人昵称">
              <el-input v-model="form.region" placeholder="输入被推广人"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="{span: 6}" :xs="{span: 24}">
            <el-form-item label-width="80px">
              <el-button
                type="primary"
                icon="el-icon-search"
                style="width: 100% ;"
                @click="onSearch()"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <el-table
        v-loading="listLoading"
        :data="shopList"
        element-loading-text="Loading"
        @row-dblclick="handleSelect"
      >
        <el-table-column show-overflow-tooltip="true">
          <template slot="header" slot-scope="scope">
            <span>序号</span>
          </template>
          <template slot-scope="scope">
            {{ scope.$index }}
            <!-- <el-checkbox v-model="isChecked">{{ scope.$index }}</el-checkbox> -->
          </template>
        </el-table-column>
        <el-table-column label="昵称" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.petName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="推广时间" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.entryTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="获得奖励" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.reward }}</span>
          </template>
        </el-table-column>
        <el-table-column label="推广人数" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.promoterTime }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row :gutter="12">
        <el-col :sm="{span: 8, offset: 8}" :xs="{span: 12}">
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
      <!-- 分页 -->

      <div slot="footer" class="dialog-footer">
        <el-button @click="addShopsVisible = false">关闭窗口</el-button>
      </div>
    </el-dialog>
    <!--===================查看推广人数(结束)========================-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIndeterminate: true,
      form: {},
      addShopsVisible: false, // 查看推广人数弹窗
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      shopList: [
        //预览优惠商品列表数据
        {
          petName: "王二",
          entryTime: "2018-09-09",
          reward: "100元优惠券",
          promoterTime: "1"
        },
        {
          petName: "江刘二",
          entryTime: "2018-09-09",
          reward: "100元优惠券",
          promoterTime: "1"
        },
        {
          petName: "而立",
          entryTime: "2018-09-09",
          reward: "100元优惠券",
          promoterTime: "1"
        }
      ],
      list: [
        // 订单列表情况集合
        {
          promoter: "推广人",
          promotee: "被推广人",
          entryTime: "推广进入时间",
          reward: "推广人获得奖励",
          promoterTime: "推广人推广人数"
        },
        {
          promoter: "推广人",
          promotee: "被推广人",
          entryTime: "推广进入时间",
          reward: "推广人获得奖励",
          promoterTime: "推广人推广人数"
        },
        {
          promoter: "推广人",
          promotee: "被推广人",
          entryTime: "推广进入时间",
          reward: "推广人获得奖励",
          promoterTime: "推广人推广人数"
        }
      ]
    };
  },
  methods: {
    // 表单提交方法
    onSearch() {
      alert("搜索");
    },
    // 预览添加优惠商品
    addShops() {
      this.addShopsVisible = true;
    },
    // 添加优惠商品/店铺
    addAllShops() {
      this.addAllShopsVisible = true;
    },
    addSuccess() {
      this.$message({
        message: "添加成功",
        type: "success"
      });
    }
  }
};
</script>

<style>
@media only screen and (min-width: 310px) and (max-width: 500px) {
  #Promotion .el-form-item__content {
    width: 100% !important;
  }

  #Promotion .storeTypeSearchForm .el-form-item__content {
    width: 75% !important;
  }
}

#Promotion .el-form-item__content {
  width: 80%;
}

#Promotion .el-range-separator {
  width: 10% !important;
}

#Promotion .el-divider span {
  color: #606266;
  font-weight: bold;
}

#Promotion .el-table__row th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}

#Promotion .el-table__row th {
  padding: 3px 0px;
  padding-left: 10px;
  color: #606266;
}

#Promotion .el-table__row td {
  padding: 3px 0;
}
#Promotion .el-divider span{
  color: #606266;font-weight:bold;
}

#Promotion .el-table th .cell{
  word-break: keep-all;
  white-space:nowrap;
  padding: 0px  0px;
}
#Promotion .el-table th{
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
#Promotion .el-table td{
  padding: 0px;
}
</style>
