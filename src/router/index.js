import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/LoginManage/Login'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [{
    path: 'home',
    name: '系统首页',
    component: () => import('@/views/SystemIndexManage/Home'),
    meta: {
      title: '系统首页',
      icon: 'shouye'
    }
  }]
},
{
  path: '/chatManage',
  component: Layout,
  redirect: '/chatManage/info',
  hidden: true,
  children: [{
    path: 'info',
    name: '消息中心',
    component: () => import('@/views/ChatManage/ChatRoom'),
    meta: {
      title: '消息中心',
      icon: 'shouye'
    }
  }]
},
{
  path: '/my',
  component: Layout,
  redirect: '/my/information',
  hidden: true,
  children: [{
    path: 'information',
    name: '个人中心',
    component: () => import('@/views/InformationManage/MyInformation'),
    meta: {
      title: '个人中心',
      icon: 'shouye'
    }
  }]
},
{
  path: '/productManage',
  component: Layout,
  redirect: '/productManage/productInfo',
  name: '商品管理',
  meta: {
    title: '商品管理',
    icon: 'shangpinguanli'
  },
  children: [{
    path: 'productInfo',
    name: '商品信息管理',
    component: () => import('@/views/ProductManage/ProductInfoManage'),
    meta: {
      title: '商品信息管理'
    }
  },
  {
    path: 'productBrand',
    name: '商品品牌管理',
    component: () => import('@/views/ProductManage/ProductBrandManage'),
    meta: {
      title: '商品品牌管理'
    }
  },
  {
    path: 'productClassify',
    name: '商品类目',
    component: () => import('@/views/ProductManage/ProductClassifyManage'),
    meta: {
      title: '商品类目管理'
    }
  },
  {
    path: 'FreightManage',
    name: '商品运费管理',
    component: () => import('@/views/ProductManage/FreightManage'),
    meta: {
      title: '商品运费管理'
    }
  }
  ]

},

{
  path: '/applyManage',
  redirect: '/applyManage/productapply',
  component: Layout,
  meta: {
    title: '采购管理',
    icon: 'caigou'
  },
  children: [{
    path: 'productapply',
    name: '商品申请采购',
    component: () => import('@/views/ApplyManage/Productapply'),
    meta: {
      title: '商品申请采购'
    }
  },
  {
    path: 'addPurchasing',
    name: '添加采购管理',
    component: () => import('@/views/ApplyManage/AddPurchasing'),
    meta: {
      title: '添加采购管理'
    }
  }, {
    path: 'purchasingList',
    name: '采购列表管理',
    component: () => import('@/views/ApplyManage/PurchasingList'),
    meta: {
      title: '采购列表管理'
    }
  }
  ]
},

{
  path: '/informManage',
  component: Layout,
  redirect: '/informManage/productEvaluateManage',
  name: '通知管理',
  meta: {
    title: '通知管理',
    icon: 'tongzhi'
  },
  children: [{
    path: 'productEvaluateManage',
    component: () => import('@/views/InformManage/ProductEvaluateManage'), // Parent router-view
    name: '商品评价管理',
    meta: {
      title: '商品评价管理'
    }
  },
  {
    path: 'userFeedbackManage',
    component: () => import('@/views/InformManage/UserFeedbackManage'),
    name: '用户反馈管理',
    meta: {
      title: '用户反馈管理'
    }
  },
  {
    path: 'systemInformManage',
    component: () => import('@/views/InformManage/SystemInformManage'),
    name: '网站通知管理',
    meta: {
      title: '网站通知管理'
    }
  }
  ]
},

{
  path: '/storeManage',
  component: Layout,
  redirect: '/storeManage/storeInfoManage',
  name: '店铺管理',
  meta: {
    title: '店铺管理',
    icon: 'dianpu'
  },
  children: [{
    path: 'storeInfoManage',
    component: () => import('@/views/StoreManage/StoreInfoManage'), // Parent router-view
    name: '店铺信息管理',
    meta: {
      title: '店铺信息管理'
    }
  },
  {
    path: 'storeUserManage',
    component: () => import('@/views/StoreManage/StoreUserManage'),
    name: '店铺人员管理',
    meta: {
      title: '店铺人员管理'
    }
  },
  {
    path: 'storeCheckInManage',
    component: () => import('@/views/StoreManage/StoreCheckInManage'),
    name: '店铺入驻管理',
    meta: {
      title: '店铺入驻管理'
    }
  },
  {
    path: 'storeTypeManage',
    component: () => import('@/views/StoreManage/StoreTypeManage'),
    name: '店铺分类管理',
    meta: {
      title: '店铺分类管理'
    }
  }
  ]
},
{
  path: '/userManage',
  component: Layout,
  redirect: '/userManage/userList',
  name: '用户管理',
  meta: {
    title: '用户管理',
    icon: 'yonghuguanli'
  },
  children: [{
    path: 'roleList',
    component: () => import('@/views/UserManage/RoleList'), // Parent router-view
    name: '成员角色管理',
    meta: {
      title: '成员角色管理'
    }
  },
  {
    path: 'userList',
    component: () => import('@/views/UserManage/UserList'),
    name: '用户账号列表',
    meta: {
      title: '用户账号列表'
    }
  }
  ]
},
{
  path: '/orderManage',
  component: Layout,
  redirect: '/orderManage/orderList',
  name: 'order',
  meta: {
    title: '订单管理',
    icon: 'dingdan'
  },
  children: [{
    path: 'orderList',
    component: () => import('@/views/OrderManage/OrderList'), // Parent router-view
    name: '订单列表',
    meta: {
      title: '订单列表'
    }
  },
  {
    path: 'orderReview',
    component: () => import('@/views/OrderManage/OrderReview'),
    name: '订单审核',
    meta: {
      title: '订单审核'
    }
  },
  {
    path: 'deliverManage',
    component: () => import('@/views/OrderManage/DeliverManage'),
    name: '发货管理',
    meta: {
      title: '发货管理'
    }
  }
  ]
},
{
  path: '/inventoryManage',
  component: Layout,
  redirect: '/inventoryManage/inventoryList',
  name: '库存管理',
  meta: {
    title: '库存管理',
    icon: 'kucun'
  },
  children: [{
    path: 'inventoryList',
    component: () => import('@/views/InventoryManage/InventoryList'), // Parent router-view
    name: '库存管理列表',
    meta: {
      title: '库存管理列表'
    }
  }]
},

{
  path: '/logisticsManage',
  component: Layout,
  redirect: '/logisticsManage/orderSign',
  name: '物流管理',
  meta: {
    title: '物流管理',
    icon: 'wuliu'
  },
  children: [{
    path: 'orderSign',
    component: () => import('@/views/logisticsManage/OrderSign'), // Parent router-view
    name: '订单签收详情',
    meta: {
      title: '订单签收详情'
    }
  }, {
    path: 'orderLogistics',
    component: () => import('@/views/logisticsManage/OrderLogistics'), // Parent router-view
    name: '订单物流列表',
    meta: {
      title: '订单物流列表'
    }
  }]
},
/* {
      path: '/nested98',
      component: Layout,
      name: 'Nested98',
      meta: {
        title: '统计管理',
        icon: 'tongjiguanli'
      },
      children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '商品统计'
        }
      }, {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '商品评价统计'
        }
      }, {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '订单数量统计'
        }
      }, {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '店铺差评统计'
        }
      }, {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '商品库存统计'
        }
      }]
    }, */
{
  path: '/marketingManage',
  component: Layout,
  redirect: '/marketingManage/coupon',
  name: '营销管理',
  meta: {
    title: '营销管理',
    icon: 'yingxiao'
  },
  children: [{
    path: 'coupon',
    component: () => import('@/views/MarketingManage/Coupon'), // Parent router-view
    name: '优惠券管理',
    meta: {
      title: '优惠券管理'
    }
  }, {
    path: 'promotion',
    component: () => import('@/views/MarketingManage/Promotion'), // Parent router-view
    name: '推广管理',
    meta: {
      title: '推广管理'
    }
  }, {
    path: 'integral',
    component: () => import('@/views/MarketingManage/Integral'), // Parent router-view
    name: '积分管理',
    meta: {
      title: '积分管理'
    }
  }]
},
{
  path: '/potaryNews',
  component: Layout,
  redirect: '/potaryNews/rotaryNews',
  name: '网站管理',
  meta: {
    title: '网站管理',
    icon: 'wangzhan'
  },
  children: [{
    path: 'rotaryNews',
    component: () => import('@/views/WebsiteManage/RotaryNews'), // Parent router-view
    name: '轮播管理',
    meta: {
      title: '轮播管理'
    }
  }, {
    path: 'oneNews',
    component: () => import('@/views/WebsiteManage/OneNews'), // Parent router-view
    name: '单页新闻',
    meta: {
      title: '单页新闻'
    }
  }]
},

{
  path: '/customerManage',
  component: Layout,
  name: '客服管理',
  redirect: '/customerManage/customer',
  meta: {
    title: '客服管理',
    icon: 'kefu'
  },
  children: [{
    path: 'customer',
    component: () => import('@/views/CustomerManage/Customer'), // Parent router-view
    name: '在线售后客服',
    meta: {
      title: '在线售后客服'
    }
  }]
},
{
  path: '/capitalManage',
  component: Layout,
  name: '资金管理',
  redirect: '/capitalManage/capitalSituation',
  meta: {
    title: '资金管理',
    icon: 'zhijingguanli'
  },
  children: [{
    path: 'capitalSituation',
    component: () => import('@/views/CapitalManage/CapitalSituation'), // Parent router-view
    name: '资金概况',
    meta: {
      title: '资金概况'
    }
  },
  {
    path: 'capitalOrder',
    component: () => import('@/views/CapitalManage/CapitalOrder'), // Parent router-view
    name: '订单资金',
    meta: {
      title: '订单资金'
    }
  },
  {
    path: 'capitalShop',
    component: () => import('@/views/CapitalManage/CapitalShop'), // Parent router-view
    name: '店铺资金',
    meta: {
      title: '店铺资金'
    }
  }
  ]
},
/* {
      path: '/nested31',
      component: Layout,
      name: 'Nested31',
      meta: {
        title: '日志管理',
        icon: 'rizhi'
      },
      children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '系统日志管理'
        }
      }]
    }, */
/* {
    path: '/nested518',
    component: Layout,
    name: 'Nested18',
    meta: {
      title: '系统管理',
      icon: 'xitongguanli'
    },
    children: [{
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: {
        title: '模块设置'
      }
    },
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: {
        title: '权限设置'
      }
    }
    ]
  }, */
{
  path: '/test',
  component: Layout,
  name: 'test',
  children: [{
    path: 'test',
    component: () => import('@/views/404'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: '模块设置'
    }
  }]
},
// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
