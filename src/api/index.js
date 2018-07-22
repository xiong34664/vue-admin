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
// 更改用户状态
export const changeUserStates = params => {
  return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data)
}
// 更改用户状态
export const addUser = params => {
  return axios.post('users', params).then(res => res.data)
}
// 编辑用户信息
export const getUserById = id => {
  return axios.get(`users/${id}`).then(res => res.data)
}
// 编辑用户信息
export const editUser = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data)
}
// 删除用户
export const delUser = id => {
  return axios.delete(`users/${id}`).then(res => res.data)
}
// 获取角色列表
export const getRoles = id => {
  return axios.get('roles').then(res => res.data)
}
// 分配角色
export const grantUserRole = params => {
  return axios.put(`users/${params.id}/role`, { id: params.id, rid: params.rid }).then(res => res.data)
}
// 获取权限列表
export const getRightList = params => {
  return axios.get(`rights/${params.type}`).then(res => res.data)
}
// 删除角色指定权限
export const delRoleRight = params => {
  return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data)
}
// 删除角色指定权限
export const grantRoleRight = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, rids).then(res => res.data)
}
