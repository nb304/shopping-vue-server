<!--======优惠券管理模块=======-->
<template>
  <div id="Coupon" style="margin:1rem;">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="优惠券标题">
            <el-input v-model="form.region" placeholder="输入编号" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="优惠券类型">
            <el-select v-model="orderCast" placeholder="选择">
              <el-option label="店铺优惠" value="店铺优惠" />
              <el-option label="商品优惠" value="商品优惠" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="优惠门槛">
            <el-input v-model="form.region" placeholder="输入金额" />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择开始时间"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.date2"
              type="date"
              placeholder="选择结束时间"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item>
            <el-button type="primary" style="width: 100% ;" @click="deleteEvaluate">查询</el-button>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 24}">
          <el-form-item>
            <el-button type="primary" style="width: 100% ;" @click="dialogFormVisible = true">添加优惠券</el-button>
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
      <el-table-column prop="title" label="优惠券标题" show-overflow-tooltip="true" />
      <el-table-column prop="type" label="优惠券类型" show-overflow-tooltip="true" />
      <el-table-column prop="term" label="优惠门槛" show-overflow-tooltip="true" />
      <el-table-column prop="money" label="优惠金额" show-overflow-tooltip="true" />
      <el-table-column prop="timeState" label="开始时间" show-overflow-tooltip="true" />
      <el-table-column prop="tiemEnd" label="结束时间" show-overflow-tooltip="true" />
      <el-table-column prop="num" label="发放个数" show-overflow-tooltip="true" />
      <el-table-column prop="created_at" show-overflow-tooltip="true">
        <template slot="header" slot-scope="scope">
          <span>优惠范围</span>
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="20px"
            @click.native.prevent="addShops(scope.$index, list)"
          >添加商品</el-button>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150" style="padding: 3px 0;">
        <template slot-scope="scope">
          <el-button type="text" size="primary">下架</el-button>
          <el-button type="text" size="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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

    <!--===================添加优惠券(开始)========================-->
    <el-dialog title="添加优惠券" :visible.sync="dialogFormVisible">
      <el-row :gutter="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="12">
            <el-form-item label="优惠标题">
              <el-input v-model="form.tiele" placeholder="优惠标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠券类型">
              <el-select v-model="form.region" placeholder="请选择优惠的类型">
                <el-option label="店铺优惠" value="shanghai" />
                <el-option label="商品优惠" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="优惠门槛">
              <el-input v-model="form.hig" placeholder="满减门槛" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="优惠金额">
              <el-input v-model="form.hig" placeholder="优惠金额" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="发放个数">
              <el-input v-model="form.num" placeholder="发放个数" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="活动时间">
              <el-col :span="8" style="padding:0">
                <el-date-picker
                  v-model="form.date1"
                  type="date"
                  placeholder="选择开始日期"
                  style="width: 100%;"
                />
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="8">
                <el-date-picker
                  v-model="form.date2"
                  type="date"
                  placeholder="选择结束日期"
                  style="width: 100%;"
                />
              </el-col>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--===================添加优惠券信息(结束)========================-->

    <!--===================添加优惠券商品(开始)========================-->
    <el-dialog title="参与优惠商品" :visible.sync="addShopsVisible" width="50%">
      <el-button type="primary">删除</el-button>
      <el-button type="primary" @click="addAllShops()">选择参与优惠商品/店铺</el-button>

      <el-table
        v-loading="listLoading"
        :data="shopList"
        element-loading-text="Loading"
        @row-dblclick="handleSelect"
      >
        <el-table-column show-overflow-tooltip="true">
          <template slot="header" slot-scope="scope">
            <el-checkbox v-model="isChecked">
              <span>序号</span>
            </el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="isChecked">{{ scope.$index }}</el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="店铺名" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsLogo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
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
    <!--===================添加优惠券商品(结束)========================-->

    <!--===================添加参与优惠商品(开始)========================-->
    <el-dialog title="参与优惠商品" :visible.sync="addAllShopsVisible" width="60%">
      <el-button type="primary" @click="addSuccess">添加</el-button>

      <el-table
        v-loading="listLoading"
        :data="addShopList"
        element-loading-text="Loading"
        @row-dblclick="handleSelect"
      >
        <el-table-column show-overflow-tooltip="true">
          <template slot="header" slot-scope="scope">
            <el-checkbox v-model="isChecked">
              <span>序号</span>
            </el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="isChecked">{{ scope.$index }}</el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="店铺名" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsLogo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
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
        <el-button @click="addAllShopsVisible = false">关闭窗口</el-button>
      </div>
    </el-dialog>
    <!--===================添加参与优惠商品(结束)========================-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      addAllShopsVisible: false, // 内部商品添加
      isChecked: false, // 是否勾选
      isIndeterminate: true,
      dialogFormVisible: false, // 添加优惠券
      form: {},
      addShopsVisible: false, // 添加优惠去弹窗
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      addShopList: [
        // 添加商品列表数据
        {
          shopName: '小王店铺',
          goodsName: '王小虎',
          goodsLogo: '图片',
          price: '200'
        },
        {
          shopName: '小王店铺',
          goodsName: '王小虎',
          goodsLogo: '图片',
          price: '200'
        },
        {
          shopName: '小王店铺',
          goodsName: '王小虎',
          goodsLogo: '图片',
          price: '200'
        }
      ],
      shopList: [
        // 预览优惠商品列表数据
        {
          shopName: '小王店铺',
          goodsName: '王小虎',
          goodsLogo: '图片',
          price: '200'
        },
        {
          shopName: '小王店铺',
          goodsName: '王小虎',
          goodsLogo: '图片',
          price: '200'
        },
        {
          shopName: '小王店铺',
          goodsName: '王小虎',
          goodsLogo: '图片',
          price: '200'
        }
      ],
      list: [
        // 订单列表情况集合
        {
          title: '优惠券标题',
          type: '优惠券类型',
          term: '优惠条件',
          money: '优惠金额',
          timeState: '开始时间',
          tiemEnd: '结束时间',
          num: '发放个数',
          shops: '优惠范围'
        },
        {
          title: '优惠券标题',
          type: '优惠券类型',
          term: '优惠条件',
          money: '优惠金额',
          timeState: '开始时间',
          tiemEnd: '结束时间',
          num: '发放个数',
          shops: '优惠范围'
        },
        {
          title: '优惠券标题',
          type: '优惠券类型',
          term: '优惠条件',
          money: '优惠金额',
          timeState: '开始时间',
          tiemEnd: '结束时间',
          num: '发放个数',
          shops: '优惠范围'
        },
        {
          title: '优惠券标题',
          type: '优惠券类型',
          term: '优惠条件',
          money: '优惠金额',
          timeState: '开始时间',
          tiemEnd: '结束时间',
          num: '发放个数',
          shops: '优惠范围'
        }
      ]
    }
  },
  methods: {
    // 表单提交方法
    onSearch() {
      alert('搜索')
    },
    // 预览添加优惠商品
    addShops() {
      this.addShopsVisible = true
    },
    // 添加优惠商品/店铺
    addAllShops() {
      this.addAllShopsVisible = true
    },
    addSuccess() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    }
  }
}
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

#Coupon .el-range-separator {
  width: 10% !important;
}

#Coupon .el-divider span {
  color: #606266;
  font-weight: bold;
}

#Coupon .el-table__row th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}

#Coupon .el-table__row th {
  padding: 3px 0px;
  padding-left: 10px;
  color: #606266;
}

#Coupon .el-table__row td {
  padding: 3px 0;
}
#Coupon .el-divider span {
  color: #606266;
  font-weight: bold;
}

#Coupon .el-table th .cell {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 0px;
}
#Coupon .el-table th {
  padding: 2px 0px;
  padding-left: 10px;
  color: #606266;
}
#Coupon .el-table td {
  padding: 0px;
}
</style>
