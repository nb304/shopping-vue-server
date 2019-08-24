<!--======商品运费管理模块=======-->
<template>
  <div id="freightManage">
    <el-form ref="form" :model="freightManageForm" label-width="70px">
      <el-row :gutter="24">
        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="运费标题">
            <el-input v-model="freightManageForm.freightTitle" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="商品列表">
            <el-select v-model="freightManageForm.products" placeholder="请选择" filterable="true" multiple="true" collapse-tags="true" clearable="true">
              <el-option
                v-for="item in productOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="发货地址">
            <el-input v-model="freightManageForm.shipAddress" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="运费价格">
            <el-input v-model="freightManageForm.freightPrice" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="选择省市">
            <el-select v-model="freightManageForm.city" placeholder="请选择" filterable="true" multiple="true" collapse-tags="true" clearable="true">
              <el-option-group
                v-for="group in cityOptions"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 6, offset:12}" :xs="{span: 24}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" style="width: 100%;" @click="onSubmit">添加</el-button>
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>

    <!--==================分割线(开始)========================-->
    <el-row :gutter="24">
      <el-col :sm="{span: 24}" :xs="{span: 24}">
        <div>
          <el-divider content-position="right">
            <el-tooltip class="item" effect="dark" content="店铺名称" placement="right">
              <svg-icon icon-class="dianpu2" />
            </el-tooltip>
            <span style="margin-right: 20px">:小鹏家具</span>

            <span>运费模板列表</span>
          </el-divider>
        </div>
      </el-col>
    </el-row>
    <!--==================分割线(结束)========================-->

    <!--==================查询运费模板(开始)========================-->
    <el-row :gutter="24">
      <el-form ref="form" :model="searchForm" label-width="70px">
        <el-col :lg="{span: 6}" :xs="{span: 24}">
          <el-form-item label="运费标题">
            <el-input v-model="searchForm.freightTitle" />
          </el-form-item>
        </el-col>

        <el-col :lg="{span: 4}" :xs="{span: 24}">
          <el-form-item>
            <el-button type="primary" icon="el-icon-thumb" style="width: 100%;" @click="searchClick">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!--==================查询运费模板(结束)========================-->

    <el-row :gutter="24">
      <el-col :lg="{span: 24}" :xs="{span: 24}">
        <el-table
          :data="freightManageList"
          element-loading-text="Loading"
        >
          <el-table-column label="序号" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>

          <el-table-column label="运费标题" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.freightTitle }}</template>
          </el-table-column>

          <el-table-column label="发货地址" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.shipAddress }}</template>
          </el-table-column>

          <el-table-column label="运费价格" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">{{ scope.row.freightPrice }}</template>
          </el-table-column>

          <el-table-column label="商品列表" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                width="300"
                trigger="click"
              >
                <el-scrollbar style="height:300px">
                  <el-table :data="scope.row.productList ">
                    <el-table-column width="150" property="productPid" label="商品ID" />
                    <el-table-column property="productName" label="商品名称" />
                  </el-table>
                </el-scrollbar>

                <el-button slot="reference" style="border: none;color: #409EFF">商品详情</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="省市列表" show-overflow-tooltip="true" header-align="center" align="center">
            <template slot-scope="scope">
              <el-popover
                placement="right"
                width="250"
                trigger="click"
              >
                <el-card class="box-card" style="width:230px" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span>省市名称</span>
                  </div>
                  <div v-for="city in scope.row.cityList" :key="city" class="text item">
                    {{ city.cityName }}
                  </div>
                </el-card>
                <el-button slot="reference" style="border: none;color: #409EFF">城市详情</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">

              <el-button type="text" size="20px" @click.native.prevent="updateHandle(scope.row, list)">修改</el-button>
              <el-button type="text" size="20px" @click.native.prevent="removeHandle(scope.row, list)">删除</el-button>

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

    <!--====================修改运费模板信息弹出框 开始===============-->
    <el-dialog
      title="编辑运费模板"
      :visible.sync="freightLog"
      width="40%"
    >
      <el-form ref="form" :model="updateFreightForm" label-width="70px">
        <el-row :gutter="24">
          <el-col :lg="{span: 12}" :xs="{span: 24}">
            <el-form-item label="运费标题">
              <el-input v-model="updateFreightForm.freightTitle" />
            </el-form-item>
          </el-col>

          <el-col :lg="{span: 12}" :xs="{span: 24}">
            <el-form-item label="商品列表">
              <el-select v-model="updateFreightForm.products" placeholder="请选择" filterable="true" multiple="true" collapse-tags="true" clearable="true">
                <el-option
                  v-for="item in productOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :lg="{span: 12}" :xs="{span: 24}">
            <el-form-item label="发货地址">
              <el-input v-model="updateFreightForm.shipAddress" />
            </el-form-item>
          </el-col>

          <el-col :lg="{span: 12}" :xs="{span: 24}">
            <el-form-item label="运费价格">
              <el-input v-model="updateFreightForm.freightPrice" />
            </el-form-item>
          </el-col>

          <el-col :lg="{span: 12}" :xs="{span: 24}">
            <el-form-item label="选择省市">
              <el-select v-model="updateFreightForm.city" placeholder="请选择" filterable="true" multiple="true" collapse-tags="true" clearable="true">
                <el-option-group
                  v-for="group in cityOptions"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="freightLog = false">取 消</el-button>
        <el-button type="primary" @click="freightLog = false">修 改</el-button>
      </span>
    </el-dialog>
    <!--====================修改运费模板信息弹出框 结束===============-->

  </div>

</template>

<script>
export default {
  name: 'FreightManage',
  data() {
    return {
      freightLog: false, // 修改运费模板弹出框
      total: 100, // 分页信息
      currentPage: 2, // 当前页数信息
      cityOptions: [ // 城市列表信息
        {
          label: '省份',
          cityOptions: [
            {
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '直辖市',
          cityOptions: [
            {
              value: 'Chengdu',
              label: '成都'
            },
            {
              value: 'Shenzhen',
              label: '深圳'
            },
            {
              value: 'Guangzhou',
              label: '广州'
            },
            {
              value: 'Dalian',
              label: '大连'
            }
          ]
        }
      ],
      productOptions: [ // 商品列表信息
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      searchForm: { // 查询运费信息所需的表单
        freightTitle: ''// 运费标题
      },
      freightManageForm: { // 添加运费管理所需的表单
        freightTitle: '', // 运费标题
        products: '', // 商品列表id信息
        shipAddress: '', // 发货地址
        freightPrice: '', // 运费价格
        city: ''// 发货城市
      },
      updateFreightForm: {
        freightTitle: '', // 运费标题
        products: '', // 商品列表id信息
        shipAddress: '', // 发货地址
        freightPrice: '', // 运费价格
        city: ''// 发货城市
      },
      freightManageList: [
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        },
        {
          freightTitle: '16元运费商品模板',
          shipAddress: '江西省上饶市广丰县',
          freightPrice: '16',
          productList: [
            { productPid: '123123412412', productName: '小米16x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' },
            { productPid: '123123412412', productName: '小米20x' },
            { productPid: '123123412412', productName: '小米17x' },
            { productPid: '123123412412', productName: '小米18x' },
            { productPid: '123123412412', productName: '小米19x' }
          ],
          cityList: [
            { cityName: '江西省' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' },
            { cityName: '广东省' },
            { cityName: '北京市' },
            { cityName: '上海市' }
          ]
        }
      ]
    }
  },
  methods: {
    updateHandle: function() {
      this.freightLog = true
    }
  }
}
</script>

<style>

  /*========当前页面的一些初始样式 输入框和表格等标签样式 开始===========*/
  #freightManage{
    margin: 30px;
  }

  #freightManage .el-divider span{
    color: #606266;font-weight:bold;
  }

  #freightManage .el-table th .cell{
    word-break: keep-all;
    white-space:nowrap;
    padding: 0px  0px;
  }
  #freightManage .el-table th{
    padding: 2px 0px;
    padding-left: 10px;
    color: #606266;
  }
  #freightManage .el-table td{
    padding: 0px;
  }

  #freightManage  .el-select{
    width: 100%;
  }

</style>
