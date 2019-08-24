<!--======店铺人员管理模块=======-->
<template>
  <div id="StoreUserManage">
    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <el-tooltip class="item" effect="dark" content="店铺名称" placement="right">
              <svg-icon icon-class="dianpu2" />
            </el-tooltip>
            <span style="margin-right: 20px">:小鹏家具</span>
            <el-tooltip class="item" effect="dark" content="在线人数" placement="right">
              <i class="el-icon-user-solid" />
            </el-tooltip>
            <span>:6498人</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24">
      <!--=================权限信息标签模块(开始)========================-->
      <el-col id="jurisdictionInfo" :lg="{span: 4}" :xs="{span: 24}">
        <el-row :gutter="24">
          <el-col :lg="{span: 24}" :xs="{span: 24}">
            <el-divider content-position="center">
              <span>权限</span>
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
      </el-col>
      <!--=================权限信息标签模块(结束)========================-->

      <!--=================基本信息标签模块(开始)========================-->
      <el-col id="basicInfo" :lg="{span: 5}" :xs="{span: 24}">
        <el-form :model="addUserForm" :inline="true" class="demo-form-inline" :rules="rules">

          <el-row :gutter="24">

            <el-col :lg="{span: 24}" :xs="{span: 24}">
              <el-divider content-position="center">
                <span>基本信息</span>
              </el-divider>
            </el-col>

            <el-col :lg="{span: 24}" :xs="{span: 24}">
              <el-form-item label="身份证号" prop="userPid">
                <el-input v-model="addUserForm.userPid" placeholder="请输入身份证"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :lg="{span: 24}" :xs="{span: 24}">
              <el-form-item label="电话号码" prop="phoneNumber">
                <el-input v-model="addUserForm.phoneNumber" placeholder="请输入电话号码"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :lg="{span: 24}" :xs="{span: 24}">
              <el-form-item label="用户姓名" prop="userName">
                <el-input v-model="addUserForm.userName" placeholder="请输入姓名"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :lg="{span: 24}" :xs="{span: 24}">
              <el-form-item label="用户地址" prop="userAddress">
                <el-input v-model="addUserForm.userAddress" placeholder="请输入地址"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :lg="{span: 24}" :xs="{span: 24}">
              <el-form-item label="账户密码" prop="userPassword">
                <el-input v-model="addUserForm.userPassword" placeholder="请输入密码"><i slot="prefix" class="el-icon-edit" /></el-input>
              </el-form-item>
            </el-col>

            <el-col :lg="{span: 24}" :xs="{span: 24}">
              <el-form-item label="性别" style="width: 100% !important;margin-left: 10px !important;">
                <el-radio-group v-model="addUserForm.sex" style="margin-left: 25px">
                  <el-radio label="男" value="0" />
                  <el-radio label="女" value="0" />
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :offset="4" :lg="{span: 20}" :xs="{span: 24}" style="padding-left: 17px;">
              <el-button type="primary" icon="el-icon-circle-plus" @click="onSubmit">添加</el-button>
            </el-col>

          </el-row>
        </el-form>
      </el-col>
      <!--=================基本信息标签模块(结束)========================-->

      <!--=================店铺人员信息标签模块(开始)========================-->
      <el-col id="storePerson" :lg="{span: 15}" :xs="{span: 24}">
        <el-row :gutter="24">
          <el-col :lg="{span: 24}" :xs="{span: 24}">
            <el-divider content-position="center">
              <span>店铺人员</span>
            </el-divider>
          </el-col>
          <el-col :lg="{span: 24}" :xs="{span: 24}">
            <el-table
              v-loading="listLoading"
              :data="userList"
              stripe="true"
              element-loading-text="Loading"
              style="width: 100% !important;"
              @row-dblclick="handleSelect"
            >
              <el-table-column label="序号" show-overflow-tooltip="true" width="40px" header-align="center" align="center">
                <template slot-scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column label="账号" show-overflow-tooltip="true" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.userId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" show-overflow-tooltip="true" width="70px" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="号码" show-overflow-tooltip="true" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.phoneNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" show-overflow-tooltip="true" width="80px" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="最近登录" show-overflow-tooltip="true" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.loginTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否在线" show-overflow-tooltip="true" width="80px" header-align="center" align="center">
                <template slot-scope="scope">
                  <span :style="{ 'color': scope.row.whetherOnline==1?'#33cc33' : '#404040' }">{{ scope.row.whetherOnline==1?"在线":"未上线" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" show-overflow-tooltip="true" width="40px" header-align="center" align="center">
                <template slot-scope="scope">
                  <span :style="{ 'color': scope.row.state==1?'#33cc33' : 'red' }">{{ scope.row.state==1?"正常":"锁定" }}</span>
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="20px" @click.native.prevent="removeStoreUser(scope.row, list)"> 删除</el-button>
                  <el-button type="text" size="20px" @click.native.prevent="lockStoreUser(scope.row, list)"> 锁定</el-button>
                  <el-button type="text" size="20px" @click.native.prevent="updateStoreUser(scope.row, list)"> 修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>

          <!--=========================修改店铺人员权限及信息对应的弹出框 开始==================================-->
          <el-dialog
            id="updateUser"
            title="修改信息"
            :visible.sync="updateUserLog"
            width="50%"
          >
            <el-form :model="updateUserForm" :inline="true" class="demo-form-inline" :rules="rules">
              <el-row :gutter="24">
                <el-col :lg="{span:12}" :xs="{span: 24}">
                  <el-col :lg="{span: 24}" :xs="{span: 24}">
                    <el-divider content-position="center">
                      <span>基本信息</span>
                    </el-divider>
                  </el-col>

                  <el-col :lg="{span: 24}" :xs="{span: 24}">
                    <el-form-item label="身份证号" prop="userPid">
                      <el-input v-model="updateUserForm.userPid" placeholder="请输入身份证"><i slot="prefix" class="el-icon-edit" /></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="{span: 24}" :xs="{span: 24}">
                    <el-form-item label="电话号码" prop="phoneNumber">
                      <el-input v-model="updateUserForm.phoneNumber" placeholder="请输入电话号码"><i slot="prefix" class="el-icon-edit" /></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="{span: 24}" :xs="{span: 24}">
                    <el-form-item label="用户姓名" prop="userName">
                      <el-input v-model="updateUserForm.userName" placeholder="请输入姓名"><i slot="prefix" class="el-icon-edit" /></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="{span: 24}" :xs="{span: 24}">
                    <el-form-item label="用户地址" prop="userAddress">
                      <el-input v-model="updateUserForm.userAddress" placeholder="请输入地址"><i slot="prefix" class="el-icon-edit" /></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="{span: 24}" :xs="{span: 24}">
                    <el-form-item label="账户密码" prop="userPassword">
                      <el-input v-model="updateUserForm.userPassword" placeholder="请输入密码"><i slot="prefix" class="el-icon-edit" /></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="{span: 24}" :xs="{span: 24}">
                    <el-form-item label="性别" style="width: 100% !important;margin-left: 10px !important;">
                      <el-radio-group v-model="updateUserForm.sex" style="margin-left: 25px">
                        <el-radio label="男" value="0" />
                        <el-radio label="女" value="0" />
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-col>

                <el-col :lg="{span:11}" :xs="{span: 24}">
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
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="updateUserLog = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">修 改</el-button>
            </span>
          </el-dialog>
          <!--=========================修改店铺人员权限及信息对应的弹出框 开始==================================-->

        </el-row>
      </el-col>
      <!--=================店铺人员信息标签模块(结束)========================-->

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

  </div>

</template>
<script>
export default {
  data() {
    return {
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
      ],
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      updateUserLog: false, // 修改店铺人员信息弹出框
      addUserForm: { // 添加人员信息的表单
        userPid: '', // 用户id
        phoneNumber: '', // 电话号码
        userName: '', // 用户名称
        userAddress: '', // 用户地址
        userPassword: '', // 用户密码
        sex: '男' // 性别

      },
      updateUserForm: { // 修改人员信息的表单
        userPid: '', // 用户id
        phoneNumber: '', // 电话号码
        userName: '', // 用户名称
        userAddress: '', // 用户地址
        userPassword: '', // 用户密码
        sex: '男' // 性别
      },
      userList: [
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 1 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 1 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 0 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 1, state: 1 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 1 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 1 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 0 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 1, state: 1 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 1 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 0, state: 0 },
        { userId: '15717007490', userName: '刘梓将', phoneNumber: '15717007490', createTime: '2019-9-9', loginTime: '2019-9-9 14:24:44', whetherOnline: 1, state: 1 }
      ],
      rules: {
        userPid: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userAddress: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
  },
  methods: {
    // 编辑打开对应的店铺人员信息
    updateStoreUser: function(currData) {
      // 获取对应的人员信息,及对应的权限信息

      // 获取成功后打开对应的updateUserLog框
      this.updateUserLog = true
    }
  }

}
</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #StoreUserManage{
    margin: 30px;
  }

  #StoreUserManage .el-divider span{   /*分割线样式*/
    color: #606266;
    font-weight:bold;
  }

  #StoreUserManage .el-form--inline .el-form-item{
    margin: 0px !important;
    margin-bottom: 19px !important;
  }
  #StoreUserManage .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #StoreUserManage .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #StoreUserManage .el-table td{
    padding: 0px !important;

  }

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽 ==================1501--2000px===========*/

    /*对用户基础输入信息模块的form标签设置样式*/
    #StoreUserManage #basicInfo .el-form-item__content{
      width: 67% !important;
    }
    #StoreUserManage #basicInfo button{
      width: 82% !important;
      margin-left: 28px;
    }
  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/

    /*对用户基础输入信息模块的form标签设置样式*/
    #basicInfo .el-form-item__content{
      width: 60% !important;
    }
    #basicInfo .el-radio-group{
      margin-left: 10px !important;
    }
    #basicInfo button{
      width: 100% !important;
    }

    /*对应编辑人员信息中的表单标签设置样式*/
    #updateUser .el-form-item__content{
      width: 70% !important;
    }
  }

  @media only screen and (min-width: 360px) and (max-width: 500px) { /*宽================360 -- 500px================*/
    #basicInfo button{
      width: 61% !important;
      margin-left: 13px !important;
    }

    /*对编辑人员信息弹出框设置样式*/
    #updateUser div[aria-label="修改信息"] {
      width: 100% !important;
      margin-top: 20px !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px) { /*宽=================200 -- 350==================*/
    /*对用户基础输入信息模块的form标签设置样式*/
    #basicInfo .el-form-item__content{
      width: 70% !important;
    }
    #basicInfo button{
      width: 70% !important;
      margin-left: 23px !important;
    }

    /*对编辑人员信息弹出框设置样式*/
    #updateUser div[aria-label="修改信息"] {
      width: 100% !important;
      margin-top: 20px !important;
    }
    #updateUser .el-form-item__content{
      width: 69%  !important;
    }

  }
</style>
