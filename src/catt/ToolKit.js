
var ToolKit = {};

ToolKit.get_nonce_str = function(len = 16){

  var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var txt = ""
  for (var i = 0; i < len; i++) {
    var index = Math.floor(Math.random() * str.length)
    txt += str.charAt(index)
  }
  return txt

};

module.exports = ToolKit;