
var CATT = {};

CATT.Sign    = require("./Sign");
CATT.ToolKit = require("./ToolKit");

// // 开发模式挂载到全局
// window.mountDev("CATT", CATT);

// console.log(CATT);

// module.exports = CATT;


console.log(process.env);

/** 开发模式挂载到全局 */
if(process.env.NODE_ENV == "development"){
	window.CATT = CATT;
}

module.exports = CATT;
