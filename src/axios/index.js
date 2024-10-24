import axios from 'axios'
import { ElMessage } from 'element-plus'

import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  // baseURL: '/api' // api base_url
  baseURL: 'http://localhost:80/' // 网络代理，需要跟后端端口保持一致
  //baseURL: process.env.VUE_APP_API_BASE_URL,//不用代理就用这个
  // timeout: 6000 // 请求超时时间
})

const err = error => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 500) {
      if (data.message?.length > 0) {
        ElMessage({
          message: data.message,
          type: 'error',
        })
      }
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

service.interceptors.request.use(config => {
  return config
}, err)
/**
 * response interceptor
 * 所有请求统一返回
 */
service.interceptors.response.use(response => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }
