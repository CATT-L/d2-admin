
import request from '@/plugin/axios'
import util from '@/libs/util';


// 全局函数挂载
if(typeof window.mount == "undefined"){
	window.mount = function(name, func){
		if(typeof window[name] == "undefined"){
			window[name] = func;
		}
	}
}

window.mount("isDev", function(){
	return process.env.NODE_ENV == "development";
});

window.mount("log", util.log);

window.mount("trace", function(obj, title = ""){
	console.group(">> 调试输出 ", title);
	log.capsule(title || "调试输出", ">> 开始", "danger");

	console.log(obj);

	log.capsule(title || "调试输出", "<< 结束", "danger");

	console.groupEnd();
});

window.mount("debug", function(){
	if(isDev()) trace(...arguments);
});


/**
 * 仅在开发环境会挂载
 *
 * 之所以挂载这些函数是为了能够直接在控制台进行方便地调试,
 * 或者是在代码中临时地方便地调用
 *
 * 因此不能在代码中使用下方挂载的函数
 */

window.mount("mountDev", function(name, func){

	if(! isDev()) return;

	window.mount(name, function(){

		log.capsule("提示", "开发环境挂载", "danger");
		log.danger("window[\"" + name + "\"] 仅当 process.env.NODE_ENV == development 时可用, 请勿在代码中使用");

		return func;
	})
});


window.mountDev("util", util);
window.mountDev("request", request);
