import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

// 页面框架布局
import layoutHeaderAside from '@/layout/header-aside';

// 获取菜单API
import menuApi from "@/api/cus.menu";


Vue.use(VueRouter)

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

let routerFlag = false;

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {

  debug({to, from, next}, "路由拦截钩子")

  // 进度条
  NProgress.start()

  // 关闭搜索面板
  store.commit('d2admin/search/set', false);

  // 判断登录状态
  const bearer = util.cookies.get("bearer");

  if(bearer && bearer !== "undefined"){
    // 已经登录
    
    // 检查动态路由是否已经加载
    if(! routerFlag){

      routerFlag = true;

      menuApi.GetMenu().then(data => {

        store.commit('custom/menu/menuListSet', data.menulist);

        let dRouter = menuApi.ParseRouter(data.menulist);

        router.addRoutes([dRouter]);

        routes.push(dRouter);

        // 更新路由设置
        store.commit('d2admin/page/init', routes);
        
        // 跳转到指定路由
        next({path: to.path});
      });

      return;
    } else {
      next();
    }

  } else {
    // 未经登录
    
    if(to.matched.some(r => r.meta.withoutAuth)){
      next();
      return;
    } else {

      // 跳转到登录页面
      next({
        name: "login",
        query: {
          redirect: to.fullPath
        }
      });

      return;
    }
  }

})

router.afterEach(to => {

  // 进度条
  NProgress.done()
  
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  
  // 更改标题
  util.title(to.meta.title)
})

export default router
