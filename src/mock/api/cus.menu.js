
// id 按钮自增id
// parent_id 父级id
// icon 图标样式
// title 显示标题

// status
// 1 启用
// 0 停用

// type
// 
// 1 标题
// 2 内链Tab
// 3 外链
// 4 api接口

// aside_shown
// 
// 1 在左侧菜单栏显示
// 0 不显示

// router 路由

const menuList = [
  {
    id          : 1,
    parent_id   : 0,
    icon        :'home',
    title       : '首页',
    router      : '/index',
    type        : 2,
    aside_shown : 1,
    status      : 1,
  },
  {
    id          : 2,
    parent_id   : 0,
    icon        :'puzzle-piece',
    title       : '功能',
    router      : '',
    type        : 1,
    aside_shown : 1,
    status      : 1,
  },
  {
    id          : 3,
    parent_id   : 2,
    icon        :'',
    title       : '追番列表',
    router      : '/bangumi/index',
    type        : 2,
    aside_shown : 1,
    status      : 1,
  }
];


export default [
  {
    path: '/api/user/menu',
    method: 'post',
    handle (params) {

      return {
        code : 0,
        msg  : "操作成功",
        data : {
          menuList
        }
      };
    }
  }
]
