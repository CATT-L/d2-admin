import request from '@/plugin/axios'

// 页面框架布局
import layoutHeaderAside from '@/layout/header-aside';


const TYPE_VIEW = 2;
const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

export default {
	
	GetMenu: function(){
		return request({
			url: '/user/menu',
			method: 'post',
		})
	},

	// 转换成路由格式
	ParseRouter: function(menuList){

		var dRouter = {
			path: "/",
			component: layoutHeaderAside,
			children: []
		};

		menuList.forEach((item, index) => {

			if(item.type == TYPE_VIEW){

				// 拼接目录防止出现双斜杠
				var componentArr = ("custom/" + item.router).split("/");

				var strArr = [];

				componentArr.forEach(item => {
					if(item != "") strArr.push(item);
				});

				// 把路径中的 / 换成 . 当作名字
				var nameArr = item.router.split("/");
				var nameStr = [];
				nameArr.forEach(item => {
					if(item != "") nameStr.push(item);
				});
				nameStr = nameStr.join(".");

				// 补充孩子路由
				dRouter.children.push({
					path: item.router,
					name: nameStr,
					meta: {
						title: item.title
					},
					component: _import(strArr.join("/")),
				});				
			}
		});

		return dRouter;
	},

	ParseMenuTree: function(menuList){

		let nodes  = [];
		let kids   = {};
		let tree   = [];
		let rootId = 0;

		menuList.forEach(item => {
			if(item.aside_shown){
				item.path = item.router;
				nodes.push(item);
			}
		});


		// 子列表
		for(let i = 0; i < nodes.length; i ++){

			let pid = nodes[i].parent_id;

			if(! kids[pid]) {
				kids[pid] = [];
			}

			kids[pid].push(nodes[i]);
		}


		// 建树
		if(kids[rootId]) {
			tree = kids[rootId];
		}

		function traverseTreeNodeKid(treeNodeKid) {

			for(let i = 0; i < treeNodeKid.length; i ++){

				let node = treeNodeKid[i];

				if(kids[node.id]){
					node.children = kids[node.id];
					traverseTreeNodeKid(node.children);
				}
			}
		}

		traverseTreeNodeKid(tree);

		return tree;
	}
};


