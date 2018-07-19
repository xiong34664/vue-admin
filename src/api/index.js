import axios from 'axios'

const baseURL = 'http://localhost:8888/api/private/v1/'

axios.defaults.baseURL = baseURL

// 添加请求拦截器

axios.interceptors.request.use(function (config) {
  // 将token 给前后台约定好的key中作为请求发送
  let token = localStorage.xxtoken
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// login验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}
// 获取用户列表
export const getUserList = params => {
  return axios.get('users', params).then(res => res.data)
}
