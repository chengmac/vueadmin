/*
 * @Author: chengmac 
 * @Date: 2018-11-10 14:39:07 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-10 15:20:04
 */

import API from './api'
import axios from 'axios'

const Axios = axios.create({
    baseURL: `${API}`
});

// 响应拦截器
Axios.interceptors.response.use(res => {
    return Promise.resolve(res);
  }, err => {
    // 错误统一处理
    return Promise.reject(err.response.data);
});

export default Axios;