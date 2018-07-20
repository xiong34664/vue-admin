import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Main from '@/views/main/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {name: 'default', path: '/', redirect: {name: 'main'}},
        {name: 'main', path: 'main', component: Main}
      ]
    }
  ]
})
