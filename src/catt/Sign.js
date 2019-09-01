
var ToolKit = require("./ToolKit");
var MD5 = require("js-md5");1

var Sign = {};

Sign.parse = function(params, mch_id, secret){

	var nonce_str = ToolKit.get_nonce_str();
	var timestamp = Math.floor((+ new Date()) / 1E3);

	params["nonce_str"] = nonce_str;
	params["timestamp"] = timestamp;
	params["mch_id"]    = mch_id;

	var arr = [];

	for(var key in params){
		if(params[key].toString() != ""){
			arr.push(`${key}=${params[key]}`);
		}
	}

	arr.sort();

	arr.push(`secret=${secret}`);

	var str = arr.join("&");
	var sign = MD5(str).toString().toUpperCase();

	return {
		nonce_str,
		timestamp,
		mch_id,
		sign,
	};
}

module.exports = Sign;