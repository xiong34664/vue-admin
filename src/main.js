// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 注册全局守卫 在路由跳转前 对路由进行跳转 防止未登录的用户跳转到其他页面 还将已登录的用户  访问 /login 跳转至home
router.beforeEach((to, from, next) => {
  let token = localStorage.xxtoken
  if (token) {
    // 登陆了就放行
    next()
    if (to.path === '/login') {
      next({ path: '/home' })
    }
  } else if (to.path !== '/login') {
    next({ path: '/login' })
  } else {
    // 如果没有登录访问的又是login  就不干涉
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
