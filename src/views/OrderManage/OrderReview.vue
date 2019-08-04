<!--======订单审核模块=======-->
<template>
  <div id="OrderReview">
    <el-form :inline="true" class="demo-form-inline searchForm">
      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单编号">
            <el-input v-model="orderPid" placeholder="输入编号"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="用户账号">
            <el-input v-model="userPid" placeholder="输入账号"><i slot="prefix" class="el-icon-edit" /></el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="审批类型">
            <el-select v-model="reviewCast" placeholder="选择">
              <el-option label="审批未通过" value="审批未通过" />
              <el-option label="审批通过" value="审批未通过" />
              <el-option label="待审批" value="待审批" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="订单状态">
            <el-select v-model="orderState" placeholder="选择">
              <el-option label="待付款" value="待付款" />
              <el-option label="已取消" value="已取消" />
              <el-option label="未发货" value="未发货" />
              <el-option label="已发货" value="已发货" />
              <el-option label="未收货" value="未收货" />
              <el-option label="未收货-退单中" value="未收货-退单中" />
              <el-option label="未收货-退单成功" value="未收货-退单成功" />
              <el-option label="已收货" value="已收货" />
              <el-option label="已收货-退单中" value="已收货-退单中" />
              <el-option label="已收货-退单成功" value="已收货-退单成功" />
              <el-option label="已收货-换货中" value="已收货-换货中" />
              <el-option label="已收货-换货成功" value="已收货-换货成功" />
              <el-option label="待评价" value="待评价" />
              <el-option label="已结算" value="已结算" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="开始时间" class="myItem">
            <el-date-picker
              v-model="startDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 6}" :xs="{span: 23}">
          <el-form-item label="结束时间" class="myItem">
            <el-date-picker
              v-model="endDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="{span: 6, offset: 6}" :xs="{span: 23}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="width: 215px; margin-left: 70px;" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <span>数量:900笔</span>
            <el-divider direction="vertical" />
            <span>时间:2019年1月1日-2019年2月2日</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <el-table
          :data="list"
          element-loading-text="Loading"
          @row-dblclick="handleSelect"
        >
          <el-table-column label="序号" show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="订单编号" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.pid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.applyTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="审批类型" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.reviewCast }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="订单状态" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.orderState }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>审批信息</span>
              <el-tooltip class="item" effect="dark" content="审批信息详情" placement="right">
                <svg-icon icon-class="product" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="showReviewDesc(scope.$index, list)"
              >
                {{ scope.row.reviewMess }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column v-if="isAdmin" prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>商家信息</span>
              <el-tooltip class="item" effect="dark" content="商家信息详情" placement="right">
                <svg-icon icon-class="dianpu2" style="color: #606266;" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="merchantDesc(scope.$index, list)"
              >
                {{ scope.row.merchant }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>订单金额</span>
              <el-tooltip class="item" effect="dark" content="订单金额描述" placement="right">
                <svg-icon icon-class="price" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderPriceDesc(scope.$index, list)"
              >
                {{ scope.row.price }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>用户</span>
              <el-tooltip class="item" effect="dark" content="用户信息描述" placement="right">
                <i class="el-icon-user-solid" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="orderUserDesc(scope.$index, list)"
              >
                {{ scope.row.users }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>审批结果</span>
              <el-tooltip class="item" effect="dark" content="审批结果信息" placement="right">
                <svg-icon icon-class="result" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="showReviewResult(scope.$index, list)"
              >
                审批结果
              </el-button>
              <span />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" show-overflow-tooltip="true">
            <template slot="header" slot-scope="scope">
              <span>操作</span>
              <el-tooltip class="item" effect="dark" content="审批操作" placement="right">
                <svg-icon icon-class="xiugai2" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="20px"
                @click.native.prevent="showReviewHandle(scope.$index, list)"
              >
                审批
              </el-button>
              <span />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--===================审批信息描述弹出框(开始)========================-->
    <el-dialog title="审批信息" :visible.sync="reviewDescVisible" width="30%">
      <el-table
        v-loading="listLoading"
        :data="reviewDescList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.$index!=7">{{ scope.row.desc }}</span>
            <el-button
              v-else
              type="text"
              size="20px"
              @click.native.prevent="showImgProofDesc(scope.$index, list)"
            >
              图片凭证详情
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="reviewDescVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================审批信息描述弹出框(结束)========================-->

    <!--===================上传图片凭证描述弹出框(开始)========================-->
    <el-dialog title="图片凭证" :visible.sync="imgProofDescVisible" width="30%">
      <div class="demo-image__lazy">
        <el-image v-for="url in urls" :key="url" :src="url" lazy />
      </div>

      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="imgProofDescVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================上传图片凭证描述弹出框(结束)========================-->

    <!--===================商家信息描述弹出框(开始)========================-->
    <el-dialog title="商家信息" :visible.sync="merchantDescVisible" width="30%">
      <el-table
        v-loading="listLoading"
        :data="merchantDescList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.$index!=4">{{ scope.row.desc }}</span>
            <el-button
              v-else
              type="text"
              size="20px"
              @click.native.prevent="contactMerchant(scope.$index, list)"
            >
              联系店铺
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="merchantDescVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================审批信息描述弹出框(结束)========================-->

    <!--===================订单金额详情弹出框(开始)========================-->
    <el-dialog title="订单金额" :visible.sync="orderPriceVisible" width="30%">
      <el-table
        v-loading="listLoading"
        :data="orderPriceList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>
              {{ scope.row.desc }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="orderPriceVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================订单金额详情弹出框(结束)========================-->

    <!--===================用户详情弹出框(开始)========================-->
    <el-dialog title="用户详情" :visible.sync="orderUserVisible" width="30%">
      <el-table
        v-loading="listLoading"
        :data="orderUserList"
        element-loading-text="Loading"
        border
      >
        <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.cast }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.$index==6">
              <el-input v-model="elsePrice" placeholder="请输入" :value="scope.row.desc" />
            </span>
            <span v-if="scope.$index==7">
              <el-input v-model="elseDesc" placeholder="请输入" :value="scope.row.desc" />
            </span>
            <span v-if="scope.$index!=7&&scope.$index!=6">
              {{ scope.row.desc }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="orderUserVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================用户详情弹出框(结束)========================-->

    <!--===================审批结果详情弹出框(开始)========================-->
    <el-dialog title="历史审批详情" :visible.sync="reviewResultVisible" width="30%">
      <div class="title-menu-min">
        <el-row :gutter="24" style="width:100%">
          <el-col v-for="result in reviewResultList" :sm="{span: 24}" :xs="{span: 24}" style="margin-bottom: 15px">
            <el-card shadow="hover" style="width: 90%; margin-left: 15px;">
              <el-table
                v-loading="listLoading"
                :data="result"
                element-loading-text="Loading"
              >
                <el-table-column class-name="status-col" label="类型" show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cast }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="created_at" label="信息" show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{ scope.row.desc }}
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer ">
        <el-row :gutter="24">
          <el-col :sm="{span: 8,offset:16}" :xs="{span: 23}" style="margin-top:20px; text-align: center;">
            <el-button style="width: 90%; " @click="reviewResultVisible = false">关闭窗口</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!--===================审批结果详情弹出框(结束)========================-->

    <!--===================审批操作弹出框(开始)========================-->
    <el-dialog id="review" title="审批操作" :visible.sync="reviewHandleVisible" width="21%">
      <el-form :inline="true" class="demo-form-inline" label-position="left">
        <el-row :gutter="24" style="text-align: left !important;">
          <el-col :sm="{span: 23}" :xs="{span: 23}">
            <el-form-item label="审批">
              <el-select v-model="reviewCast" placeholder="选择">
                <el-option label="通过" value="通过" />
                <el-option label="不通过" value="不通过" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="{span: 23}" :xs="{span: 23}">
            <el-form-item label="描述">
              <el-input type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer ">
        <el-button @click="reviewHandleVisible = false">关 闭</el-button>
        <el-button type="primary" @click="reviewHandleVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--===================审批操作弹出框(结束)========================-->

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

  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: true, // 是否是管理员如果是管理员 商家信息列就会显示出来 反之不会显示
      orderPid: '', // 订单编号
      userPid: '', // 用户账号
      reviewCast: '', // 订单类型
      orderState: '', // 订单状态
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      urls: null, // 显示图片凭证列表
      reviewDescVisible: false, // 审批信息弹出框默认不显示
      imgProofDescVisible: false, // 图片凭证信息弹出框默认不显示
      merchantDescVisible: false, // 商家信息详情模态框默认不显示
      orderPriceVisible: false, // 金额描述弹出框是否打开默认不显示
      orderUserVisible: false, // 用户描述弹出框是否打开默认不显示
      reviewResultVisible: false, // 审批结果详情弹出框是否打开默认不显示
      reviewHandleVisible: false, // 审批操作弹出框是否打开默认不显示
      list: [
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        },
        {
          pid: '123214123',
          applyTime: '2019-1-1',
          reviewCast: '待审批',
          orderState: '发货中',
          reviewMess: '小米mix3',
          merchant: '小彭家居',
          price: '9100',
          users: '刘老板',
          reviewResult: '结果信息 '
        }
      ],
      reviewDescList: [ // 审批详细描述信息列表
        { cast: '商品编号', desc: '1231241413' },
        { cast: '店铺名称', desc: '小彭家具' },
        { cast: '商品名称', desc: '茶杯' },
        { cast: '商品数量', desc: '2' },
        { cast: '商品总金额', desc: '78' },
        { cast: '商品购项', desc: '红色-4g-6+128' },
        { cast: '退货原因', desc: '江西先锋软件职业技术学院,江西先锋软件职业技术学院' },
        { cast: '上传凭证', desc: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg,https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg,https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg' }
      ],
      merchantDescList: [
        { cast: '店铺编号', desc: '1231423213' },
        { cast: '店铺名称', desc: '小彭家具' },
        { cast: '店铺电话', desc: '12321412312' },
        { cast: '店主名称', desc: '刘梓江' },
        { cast: '介入', desc: '1231423213' }
      ],
      orderPriceList: [ // 金额详细描述信息列表
        { cast: '支付编号', desc: '5148949848948' },
        { cast: '下单时间', desc: '2019-1' },
        { cast: '商品金额', desc: '110' },
        { cast: '优惠金额', desc: '20' },
        { cast: '实付金额', desc: '90' },
        { cast: '运费', desc: '15' },
        { cast: '其他金额', desc: '0' },
        { cast: '其他描述', desc: '无' },
        { cast: '支付时间', desc: '2019-1-1' },
        { cast: '支付类型', desc: '支付宝' }
      ],
      orderUserList: [ // 订单用户列表信息
        { cast: '账户', desc: '5148949848948' },
        { cast: '用户姓名', desc: '小李' },
        { cast: '收货地址', desc: '江西省上饶市广丰县' },
        { cast: '电话', desc: '15717007490' }
      ],
      reviewResultList: [ // 审批结果历史详情列表
        [
          { cast: '审批人', desc: '小白' },
          { cast: '人员类型', desc: '官方客服' },
          { cast: '审批人账户', desc: '213412312' },
          { cast: '审批状态', desc: '不通过' },
          { cast: '审批时间', desc: '2019-11-02' },
          { cast: '审批理由', desc: '由于时间原因' }
        ], [
          { cast: '审批人', desc: '小白' },
          { cast: '人员类型', desc: '官方客服' },
          { cast: '审批人账户', desc: '213412312' },
          { cast: '审批状态', desc: '不通过' },
          { cast: '审批时间', desc: '2019-11-02' },
          { cast: '审批理由', desc: '由于时间原因' }
        ]
      ]

    }
  },
  methods: {
    showReviewDesc(currIndex, obj) { // 显示审批信息模态框
      this.reviewDescVisible = true
    },
    showImgProofDesc(currIndex, obj) { // 显示图片凭证模态框
      const imgUrlStr = this.reviewDescList[this.reviewDescList.length - 1].desc
      if (imgUrlStr != null) {
        // 获取当前商品商品情况对应的图片凭证列表信息
        const urlArr = imgUrlStr.split(',')
        this.urls = urlArr
        this.imgProofDescVisible = true
      } else {
        this.$message({
          showClose: true,
          message: '没有对应的图片凭证信息',
          type: 'warning'
        })
      }
    },
    merchantDesc(currIndex, obj) { // 显示商家信息模态框
      this.merchantDescVisible = true
    },
    orderPriceDesc(currIndex, obj) { // 显示订单金额详情
      this.orderPriceVisible = true
    },
    orderUserDesc(currIndex, obj) { // 订单用户方法
      this.orderUserVisible = true
    },
    showReviewResult(currIndex, obj) { // 审批历史结果方法
      this.reviewResultVisible = true
    },
    showReviewHandle(currIndex, obj) { // 审批操作方法
      this.reviewHandleVisible = true
    }
  }

}

</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/

  #OrderReview .el-form .el-row{
    margin: 0 auto;
    text-align:center !important;
  }

  #OrderReview .el-divider span{
    color: #606266;font-weight:bold;
  }
  #OrderReview .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #OrderReview .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #OrderReview .el-table td{
    padding: 0px;
  }

  /*========弹出框样式信息开始============*/
  #OrderReview .el-dialog__wrapper div[role="dialog"]{
    margin-top: 50px !important;
  }
  #OrderReview .el-dialog__body{
    padding-top: 10px !important;
  }
  #OrderReview .el-dialog .el-table td{ /*弹出框下的列表样式信息*/
    padding: 5px !important;
  }

  #OrderReview{
    margin: 30px;
  }
  /*========弹出框样式信息结束============*/

  /*========当前页面的一些初始样式 输入框和表格等标签样式 结束===========*/

  /*==================自定义自适应css样式详情开始 ========================*/
  @media only screen and (min-width: 1501px) and (max-width: 2000px) { /*宽=================1501 -- 2000==================*/
    #OrderReview .el-form .el-form-item .el-input__inner{
      width: 216px !important;
    }

    /*=====审批弹出框下的表单样式修改开始=======*/
    #OrderReview #review .el-input__inner{
      width: 109%!important;
    }

    #OrderReview #review textarea{
      width: 127% !important;
    }

    #OrderReview #review .el-col{
      padding-right: 0px !important;
    }
    #OrderReview #review  .el-form-item{
      margin-right: 0px !important
    }
    /*=====审批弹出框下的表单样式修改结束=======*/

  }

  @media only screen and (min-width: 1300px) and (max-width: 1500px) { /*宽 ==================1300--1500px===========*/
    #OrderReview .searchForm .el-input__inner{
      width: 9.6rem !important
    }
    #OrderReview .searchForm button{
      width: 9.6rem !important;
    }

    #OrderReview div[aria-label="审批操作"] .el-input__inner,#OrderReview div[aria-label="审批操作"] .el-textarea__inner{
      width: 10.5rem !important;
    }

  }

  @media only screen and (min-width: 360px) and (max-width: 500px) {  /*宽================360 -- 500px================*/
    #OrderReview .el-form .el-form-item .el-input__inner{
      width: 250px !important;
    }
    #OrderReview .el-col-xs-23{
      width: 100%;
    }
    #OrderReview .el-form-item .el-button{
      width: 250px !important;
    }
    #OrderReview .el-divider span{  /*分割线显示样式*/
      font-size: 11px;
    }
    #OrderReview .el-col{
      padding: 0px !important;
    }
    #OrderReview div[aria-label="审批操作"] .el-row{
      margin-left: 0px !important;
    }
    #OrderReview div[aria-label="审批操作"] .el-textarea{
       width: 138% !important;
    }

    #OrderReview .el-dialog__wrapper .el-dialog{
      width: 90% !important;
    }
  }

  @media only screen and (min-width: 200px) and (max-width: 350px)  {   /*宽=================200 -- 350==================*/
    #OrderReview .searchForm .el-col{
      padding: 0px !important;
      margin-left: 10px;
    }
    #OrderReview .searchForm  .el-form-item .el-form-item__content{
      width: 194px !important;
    }
    #OrderReview .searchForm .el-form-item .el-button{
      margin-left: 34px !important;
      width: 195px !important;
    }

    #OrderReview .el-divider__text{  /*分割线样式*/
      right:0px !important;
      font-size: 9px !important;
    }
    #OrderReview .searchForm .el-form-item .el-button{
      margin-left: 34px !important;
      width: 195px !important;

    }
    #OrderReview div[aria-label="审批操作"] .el-col{   /*========审批操作弹出框样式信息============*/
      padding: 0px !important;
      margin-left: 10px;
    }
    #OrderReview div[aria-label="审批操作"]   .el-input__inner{
      width: 14.8rem !important;
    }

    #OrderReview div[aria-label="审批操作"] .el-textarea__inner{
      width: 132% !important;
    }

    #OrderReview .el-dialog__wrapper .el-dialog{             /*========弹出框样式信息开始============*/
      width: 100% !important;
    }
  }

  /*==================自定义自适应css样式详情结束 ========================*/

  /*=======内部滚动条显示的css样式情况 开始==========*/
  #OrderReview .title-menu-min { /*新加入隐藏滚动条效果*/
    height: 350px !important;
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  #OrderReview .title-menu-min::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  #OrderReview .title-menu-min::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  #OrderReview .title-menu-min::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  /*=======内部滚动条显示的css样式情况 开始==========*/
</style>
