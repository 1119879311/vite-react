import axios from "axios";

const Axios = axios.create({
  baseURL: "/api",
});
//拦截请求

Axios.interceptors.request.use(
  function (req) {
    try {
      var token = localStorage.getItem("APP_TOKEN");
    } catch (error) {
      token = "";
    }
    req.headers.Authorization = "Bearer " + token;
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios;
// 服务器返回的数据状态code:

// "NoToken":401, //缺失或者过期token
// "NoAuth":403, //无权限操作
// "Success":200 //操作成功
// 其他：操作失败或者服务错误

//拦截响应
// Axios.interceptors.response.use(function (res) {
//     var resData = res.data;
//     if(res.headers['content-type'].indexOf('application/json')===-1||resData.status){
//         return res
//     }
//     // message.error(resData.message||"操作失败")
//     // return Promise.reject(res.data);
//     return res;
//   }, function (error) {

//     message.error(error.response.data.message||"服务器异常，操作失败")
//     return Promise.reject(error.response.data);
//   });
