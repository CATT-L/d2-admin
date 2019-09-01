import playground from './modules/playground'
import frame from './modules/frame'
import d2Crud from './modules/d2-crud'
import plugins from './modules/plugins'
import charts from './modules/charts'
import components from './modules/components'
import element from './modules/element'
import filters from './modules/filters'
import business from './modules/business'

import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'root' },
    component: layoutHeaderAside,
    children: [
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        meta: {
          title: "正在刷新...",
          withoutAuth: true,
        },
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        meta: {
          title: "正在跳转...",
          withoutAuth: true,
        },
        component: _import('system/function/redirect')
      }
    ]
  },
  playground,
  frame,
  d2Crud,
  plugins,
  charts,
  components,
  element,
  filters,
  business
]

/**
 * 在主框架之外显示
 */
const frameOut = [

  // 网站根目录, 我把这一页设置成判断用户是否登录的空白页面
  {
    path: "/",
    name: "root",
    meta: {
      title: "",
      withoutAuth: true
    },
    component: _import('custom/checkLogin')
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "登录",
      withoutAuth: true
    },
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    meta: {
      title: "找不到页面",
    },
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
