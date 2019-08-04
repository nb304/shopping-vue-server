<!--======用户账号列表模块=======-->
<template>

  <div id="userList">
    <el-form ref="form" :model="userListForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="用户账号">
            <el-input v-model="userListForm.userNunmber" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="用户电话">
            <el-input v-model="userListForm.userPhone" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="店铺名称">
            <el-input v-model="userListForm.storeName" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="用户类型">
            <el-select v-model="userListForm.userType" placeholder="选择">
              <el-option label="管理员" value="管理员" />
              <el-option label="卖家" value="卖家" />
              <el-option label="买家" value="买家" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="用户状态">
            <el-select v-model="userListForm.userState" placeholder="选择">
              <el-option label="使用中" value="使用中" />
              <el-option label="锁定" value="锁定" />
              <el-option label="已注销" value="已注销" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker
              v-model="userListForm.startDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker
              v-model="userListForm.endDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 100%;" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <el-tooltip class="item" effect="dark" content="卖家类型" placement="right">
              <i class="el-icon-menu" />
            </el-tooltip>
            <span>类别:卖家</span>

            <el-tooltip class="item" effect="dark" content="总人数" placement="right" style="margin-left: 10px">
              <svg-icon icon-class="users" />
            </el-tooltip>
            <span>:6498人</span>

            <el-tooltip class="item" effect="dark" content="在线人数" placement="right" style="margin-left: 10px">
              <svg-icon icon-class="zaixian" />
            </el-tooltip>
            <span>:6498人</span>

            <el-tooltip class="item" effect="dark" content="时间" placement="right" style="margin-left: 10px">
              <i class="el-icon-timer" />
            </el-tooltip>
            <span>时间：2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24">
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <el-table
          :data="userList"
          element-loading-text="Loading"
        >
          <el-table-column label="序号" show-overflow-tooltip="true" header-align="center" align="center" width="50px">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>

          <el-table-column label="用户账号" show-overflow-tooltip="true" header-align="center" align="center" width="130px">
            <template slot-scope="scope">
              <span>{{ scope.row.userAccount }}</span>
            </template>
          </el-table-column>

          <el-table-column label="用户名称" show-overflow-tooltip="true" header-align="center" align="center" width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="用户电话" show-overflow-tooltip="true" header-align="center" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.userPhone }}</span>
            </template>
          </el-table-column>

          <el-table-column v-if="userTypeFalg" label="店铺名称" show-overflow-tooltip="true" header-align="center" align="center" width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.storeName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="是否在线" show-overflow-tooltip="true" header-align="center" align="center" width="100px">
            <template slot-scope="scope">
              <span :style="{ 'color': scope.row.whetherOnline==1?'#33cc33' : '#404040' }">{{ scope.row.whetherOnline==1?"在线":"未上线" }}</span>
            </template>
          </el-table-column>

          <el-table-column label="账户状态" show-overflow-tooltip="true" header-align="center" align="center" width="100px">
            <template slot-scope="scope">
              <span :style="{ 'color': scope.row.AccountState==0?'#33cc33' : 'red' }">{{ scope.row.AccountState==0?"使用中":scope.row.AccountState==1?"锁定":"注销" }}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" show-overflow-tooltip="true" header-align="center" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="最近登录" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recentlyLogin }}</span>
            </template>
          </el-table-column>

          <el-table-column  label="操作" header-align="center" align="center" width="230px">
            <template slot-scope="scope">


              <el-button type="text" size="20px" style="margin-right: 14px" @click.native.prevent="checkHandle(scope.row, list)"> 查看</el-button>
              <el-button type="text" size="20px" style="margin-right: 14px" @click.native.prevent="jurisdictionHandle(scope.row, list)">权限</el-button>

              <el-popover
                placement="right"
                width="160"
                trigger="click"
              >
                <el-select v-model="userState" placeholder="选择">
                  <el-option label="删除" value="删除" />
                  <el-option label="注销" value="注销" />
                </el-select>
                <div style="text-align: right; margin-top:5px">
                  <el-button type="primary" size="mini">确定</el-button>
                </div>
                <el-button slot="reference" style="border: none;color: #409EFF">设置</el-button>
              </el-popover>
            </template>
          </el-table-column>

        </el-table>
      </el-col>

    </el-row>

    <!--==================分页组件(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 4, offset: 18}" :xs="{span: 24}">
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

    <!--=========================权限信息对应的弹出框 开始==================================-->
    <el-dialog
      id="updateUser"
      title="查看编辑"
      :visible.sync="dialogVisible"
      width="20%"
    >
      <el-row :gutter="24">
        <el-col :lg="{span:24}" :xs="{span: 24}">
          <el-scrollbar style="height:400px">
            <el-row :gutter="24">
              <el-col :lg="{span: 24}" :xs="{span: 24}">
                <el-divider content-position="center">
                  <span>当前权限</span>
                </el-divider>
              </el-col>
              <el-col :lg="{span: 24}" :xs="{span: 24}">
                <el-tree
                  ref="tree"
                  :data="jurisdictionList"
                  show-checkbox
                  node-key="id"
                  highlight-current
                  :props="defaultProps"
                />
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--=========================权限信息对应的弹出框 开始==================================-->

  </div>

</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      userState: '', // 设置用户状态
      settingLog: false, // 设置显示设置框默认不打开
      userTypeFalg: true, // 用户类型如果是商家用户类型就显示商家信息
      dialogVisible: false, // 查看权限信息
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      userListForm: { // 查询用户列表条件信息form
        userNunmber: '', // 用户账号
        userPhone: '', // 用户电话号码
        storeName: '', // 店铺名称
        userType: '', // 用户类型
        userState: '', // 用户状态
        startDate: '', // 开始时间
        endDate: ''// 结束时间
      },
      userList: [ // 人员信息
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '0', AccountState: '0', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '0', AccountState: '0', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '1', AccountState: '0', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '0', AccountState: '1', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '0', AccountState: '0', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '1', AccountState: '1', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '0', AccountState: '0', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '0', AccountState: '0', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '1', AccountState: '0', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' },
        { userAccount: '1348609141', userName: '小刘刘', userPhone: '15717007490', storeName: '小彭家居', whetherOnline: '1', AccountState: '1', createTime: '2019-9-9', recentlyLogin: '2019-9-9 14:24:44' }
      ],
      jurisdictionList: [
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        },
        {
          id: 1,
          label: '商品管理',
          children: [{
            id: 4,
            label: '商品信息管理列表'
          },
          {
            id: 5,
            label: '商品品牌管理'
          },
          {
            id: 5,
            label: '商品类目管理'
          },
          {
            id: 5,
            label: '商品运费管理'
          }
          ]
        }
      ]

    }
  },

  methods: {
    jurisdictionHandle: function(currData) {
      this.dialogVisible = true
    }
  }

}
</script>

<style >

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #userList{
    margin: 30px;
  }

  #userList .el-divider span{
    color: #606266;font-weight:bold;
  }

  #userList .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #userList .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #userList .el-table td{
    padding: 0px;
  }

  #userList  .el-select{
    width: 100%;
  }

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/

    #userList .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }

  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/

    #userList .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }

  }
  /*==================自定义自适应css样式详情  结束 ========================*/

</style>
