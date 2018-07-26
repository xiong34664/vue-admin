import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Main from '@/views/main/Main'
import Users from '@/views/user/Users'
import Roles from '@/views/right/Roles'
import Rights from '@/views/right/Rights'
import Category from '@/views/category/Category'
import Goods from '@/views/category/Goods'
import AddGoods from '@/views/category/AddGoods'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {path: '/', redirect: {name: 'Main'}},
        {name: 'Main', path: 'main', component: Main},
        {name: 'Users', path: 'users', component: Users},
        {name: 'Roles', path: 'roles', component: Roles},
        {name: 'Rights', path: 'rights', component: Rights},
        {name: 'Category', path: 'categories', component: Category},
        {name: 'Goods', path: 'goods', component: Goods},
        {name: 'AddGoods', path: 'toadd', component: AddGoods}
      ]
    }
  ]
})
