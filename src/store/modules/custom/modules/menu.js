
import menuApi from "@/api/cus.menu";

export default {
	namespaced: true,
	state: {
		// 原始菜单列表
		memuList: [],

		// 左侧菜单树结构
		asideMenuTree: []
	},
	actions: {},
	mutations: {

		menuListSet (state, menuList){

			// 设置自定义菜单
			state.menuList = menuList;

			let menuTree = menuApi.ParseMenuTree(menuList);

			state.asideMenuTree = menuTree;
			
			this.commit('d2admin/menu/asideSet', menuTree);
		}

	}
};