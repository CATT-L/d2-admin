import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import util from '@/libs/util';

var CATT   = require("@/catt/index");
var config = require("@/config");


// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  
  // 添加到日志
  // store.dispatch('d2admin/log/push', {
  //   message: '数据请求异常',
  //   type: 'danger',
  //   meta: {
  //     error
  //   }
  // })
  
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error.message)
  }
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  request => {

    // 在请求发送之前做一些处理


    // 生成签名
    var params = {};

    if(request.method == "post"){
      // post 请求
      if(request.data) params.data = request.data;

    } else if(request.method == "get"){
      // get 请求
      params = request.params;
    }

    var merchant = config.merchant;

    var sign = CATT.Sign.parse(params, merchant.mch_id, merchant.secret);

    // 将签名参数放在请求头
    request.headers = {...request.headers, ...sign};

    var bearer = util.cookies.get("bearer");

    if(bearer){
      request.headers["Authorization"] = "Bearer " + bearer;
    }

    return request
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {

    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data

    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断

    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios

    } else {

      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {

        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data

        default:
          // 不是正确的 code
          // errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          errorCreate(`${dataAxios.msg}`)
          break
      }

    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
