import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Main from '@/views/main/Main'
import User from '@/views/user/User'
import Roles from '@/views/right/Roles'
import Rights from '@/views/right/Rights'

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
      // name: 'Home',
      component: Home,
      children: [
        {path: '/', redirect: {name: 'Main'}},
        {name: 'Main', path: 'main', component: Main},
        {name: 'User', path: 'user', component: User},
        {name: 'Roles', path: 'roles', component: Roles},
        {name: 'Rights', path: 'rights', component: Rights}
      ]
    }
  ]
})
