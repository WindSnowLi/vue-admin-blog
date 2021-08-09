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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/publish',
    component: Layout,
    redirect: '/publish/list',
    name: '内容管理',
    meta: {
      title: '内容管理',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/publish/create'),
        name: 'CreateArticle',
        meta: { title: '创建文章', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/publish/edit'),
        name: 'EditArticle',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/publish/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/publish/list'),
        name: 'ArticleList',
        meta: { title: '文章列表', icon: 'list' }
      },
      {
        path: 'manage',
        component: () => import('@/views/table/ManageArticle'),
        name: 'ManageArticle',
        meta: { title: '管理文章', icon: 'table' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/ui',
    name: 'setting',
    meta: {
      title: '设置',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'ui',
        component: () => import('@/views/setting/ui'),
        name: 'SettingUi',
        meta: { title: 'UI设置', icon: 'theme' }
      },
      {
        path: 'storage',
        component: () => import('@/views/setting/storage'),
        name: 'SettingStorage',
        meta: { title: '存储设置', icon: 'el-icon-files' }
      },
      {
        path: 'sys',
        component: () => import('@/views/setting/sys'),
        name: 'SettingSys',
        meta: { title: '系统设置', icon: 'el-icon-s-platform' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    name: 'profile',
    meta: {
      title: '个人中心',
      icon: 'user'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/base'),
        name: 'Profile',
        meta: { title: '基础信息', icon: 'people', noCache: true }
      },
      {
        path: 'about',
        component: () => import('@/views/profile/about'),
        name: 'Profile',
        meta: { title: '关于信息', icon: 'eye-open', noCache: true }
      }
    ]
  },
  {
    path: '/links',
    component: Layout,
    redirect: '/links/friendLinks',
    name: 'links',
    meta: {
      title: '链接管理',
      icon: 'el-icon-s-promotion'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/links/FriendLink'),
        name: 'FriendLink',
        meta: { title: '友链管理', icon: 'el-icon-lollipop', noCache: true }
      }
    ]
  },
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
