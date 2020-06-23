import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import Toast from 'vant/es/toast';
import store from '../store/store';
import { getToken, getCookie } from './Auth';
import storeUtil from 'storejs';
import Vue from 'vue';
import md5 from 'js-md5';

// axios.get(process.env.BASE_API + '/admin/sessionId/get.do')
//   .then(function(response) {
//     sessionStorage.setItem('sessionId', response.data.data.sessionId)
//   })
//   .catch(function(error) {
//     console.log(error)
//   })
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['timestamp'] = parseInt(new Date().getTime() / 1000); // 每个请求都带上时间戳
    config.headers['sessionId'] = storeUtil('fx_sessionId'); // 让每个请求携带sessionId
    config.headers['token'] = md5(Vue.token + '[' + 'timestamp=' + config.headers.timestamp + '&' + 'sessionId=' + config.headers.sessionId + ']' + Vue.token);
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    // byTanj@2019-02-16 20:41:13
    console.debug('~~~~~~ 【Response拦截】http响应：', response);
    const res = response.data;
    // console.debug('~~~~~~ 业务结果码：', res.code)
    if (res.code === 200) {
      return response;
    } else {
      // toast消息
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // if (res.code === -4003) {// 验证码不正确
      //
      // } else
      if (res.code === -3002) {
        // -3001:授权失败, -3003:非法的token, -3004:非法的sessionId; 50012:其他客户端登录了;  50014:Token 过期了;
        MessageBox.confirm(
          '您已登出3002' + res.message + '，可以取消继续留在该页面，或者重新登录',
          '提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      } else if (res.code === -3000 || res.code === -3001 || res.code === -3003 || res.code === -3004) {
        // -3001:授权失败, -3003:非法的token, -3004:非法的sessionId; 50012:其他客户端登录了;  50014:Token 过期了;
        Toast(res.message);

        MessageBox.confirm(
          '您已登出3000' + res.message + '，可以取消继续留在该页面，或者重新登录',
          '提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      } else if (res.code === -4001) {
        Toast(res.message);
      } else {
        Toast(res.message);
        return response;
      }
      return Promise.reject(res);
    }
  },
  error => {
    console.log('err===>' + error); // for debug
    Toast('服务器报错:' + error.message);
    const message = error.message;
    if (message.indexOf('401') > -1) {
      MessageBox.confirm(
        '您已登出401' + res.message + '，可以取消继续留在该页面，或者重新登录',
        '提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
    } else if (message.indexOf('504') > -1 || message.indexOf('404') > -1) {
      Message({
        message: '无法连接服务器',
        type: 'error',
        duration: 5 * 1000
      });
    } else if (message.indexOf('500') > -1) {
      Message({
        message: '服务器出错了~~~',
        type: 'error',
        duration: 5 * 1000
      });
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      });
    }
    return Promise.reject(error);
  }
);


export default service;
