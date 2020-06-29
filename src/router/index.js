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
// import login from "@/views/login"
// import dashboard from '@/views/dashboard/index'
// import loss from '@/views/404'
// import ssjk from '@/views/example/index'
// import yjym from '@/views/warning/index'
// import gjlb from '@/views/form/index'
// import gdgl from '@/views/workorder/index'
// import tplb from '@/views/nested/index'
// import zjyp from '@/views/zhijingyun/index2'
// import xlgl from '@/views/table/xlgl/index'
export const constantRoutes = [
  {
    path: '/login',
    component: (resolve) => require(['@/views/login/index.vue'], resolve),
    // component: login,
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/404'], resolve),
    // component: loss,

    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    alwaysShow: false,
    breadcrumb: true,
    children: [{
      path: 'dashboard',
      name: '首页',
      component: (resolve) => require(['@/views/dashboard/index'], resolve),
      // component: dashboard,
      meta: { title: '首页', icon: 'index' },
      noCache: true,
      affix: true
    }]
  },
  {
    path: '/example',
    component: Layout,
    // redirect: '/example',
    breadcrumb: true,
    alwaysShow: false,

    children: [{
      path: '',
      name: '实时监控',
      component: (resolve) => require(['@/views/example/index'], resolve),
      // component:() => import('@/views/ssjk'),
      meta: { title: '实时监控', icon: 'ssjk' },
      noCache: true,
      affix: true
    }]
  },
  {
    path: '/warning',
    component: Layout,
    // redirect: '/example',
    breadcrumb: true,
    alwaysShow: false,

    children: [{
      path: '',
      name: '预警页面',
      component: (resolve) => require(['@/views/warning/index'], resolve),
      // component: yjym,
      meta: { title: '预警页面', icon: 'ssjk' },
      noCache: true,
      affix: true
    }]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: '',
        name: '告警列表',
        component: (resolve) => require(['@/views/form/index'], resolve),
        // component: gjlb,
        meta: { title: '告警列表', icon: 'gjlb', noCache: true }
      }
    ]
  },
  {
    path: '/workorder',
    component: Layout,
    // redirect: '/example',
    breadcrumb: true,
    alwaysShow: false,

    children: [{
      path: '',
      name: '工单管理',
      component: (resolve) => require(['@/views/workorder/index'], resolve),
      // component: gdgl,
      meta: { title: '工单管理', icon: 'ssjk', noCache: true },
      noCache: true,
      affix: true
    }]
  },
  {
    path: '/nested',
    component: Layout,
    children: [
      {
        path: '',
        name: '图片轮播',
        component: (resolve) => require(['@/views/nested/index'], resolve),
        // component: tplb,
        meta: { title: '图片轮播', icon: 'tplb' }
      }
    ]

  }, {
    path: '/zhijingyun',
    component: Layout,
    children: [
      {
        path: '',
        name: '智景云盘',
        component: (resolve) => require(['@/views/zhijingyun/index2'], resolve),
        // component: zjyp,
        meta: { title: '智景云盘', icon: 'tplb' }
      }
    ]

  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table',
    name: '资产管理',
    meta: {
      title: '资产管理',
      icon: 'table'
    },
    children: [
      {
        path: 'xlgl',
        name: '线路管理',
        component: (resolve) => require(['@/views/table/xlgl/index'], resolve),
        // component: xlgl,
        meta: { title: '线路管理', icon: 'tplb' }
      },
      {
        path: 'gtgl',
        name: '杆塔管理',
        component: (resolve) => require(['@/views/table/gtgl/index'], resolve),
        meta: { title: '杆塔管理', icon: 'tplb' }
      },
      {
        path: 'sim',
        name: 'SIM卡管理',
        component: (resolve) => require(['@/views/table/sim/index'], resolve),
        meta: { title: 'SIM卡管理', icon: 'tplb' }
      },
      {
        path: 'sblb',
        name: '设备列表',
        component: (resolve) => require(['@/views/table/sbxx/index'], resolve),
        meta: { title: '设备列表', icon: 'tplb' }
      },
      {
        path: 'rygl',
        name: '人员管理',
        component: (resolve) => require(['@/views/table/rygl/index'], resolve),
        meta: { title: '人员管理', icon: 'tplb' }
      },
      {
        path: 'xzgt',
        name: '新增杆塔',
        hidden: true,
        component: (resolve) => require(['@/views/table/xlgl/xzgt/index'], resolve),
        meta: { title: '新增杆塔', icon: 'tplb' }
      }
    ]

  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  // {
  //   path:"、",
  //   component:Layout,
  //   children:[
  //     {
  //       path:"1111",
  //       meta:{
  //         title:"dwadwa"
  //       }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
