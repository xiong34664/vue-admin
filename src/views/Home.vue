<template>
  <div class="home">
    <el-container v-loading="loading">
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu class="el-menu-admin"
                 :collapse='isCollapse'
                 :unique-opened='true'
                 :router='true'>
          <el-submenu v-for="first in menuList" :key="first.id" :index="first.order+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item-group v-for="second in first.children" :key="second.id">
              <el-menu-item :index="second.path">
                <i class="el-icon-tickets"></i>{{second.authName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i class="xxicon xxicon-menu toggle-btn"
             @click="toggleCollapse"></i>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{$store.state.username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import {getMenus} from '@/api'
export default {
  data () {
    return {
      activeIndex: '1',
      isCollapse: false,
      menuList: [],
      loading: true
    }
  },
  created () {
    getMenus().then(res => {
      if (res.meta.status === 200) this.menuList = res.data
      this.loading = false
    })
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      // 清除登入状态即保存在 localStorage中的token
      localStorage.removeItem('xxtoken')
      localStorage.removeItem('username')
      // 跳转到登录页面
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style lang="scss" scoped>
$color: #409eff;

.home {
  height: 100%;
  background-color: #e5e5e5;
  .el-menu{
    border-right: none;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #fff;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }
  .logo {
    height: 60px;
    background: #fff url(../assets/logo.png) no-repeat center / contain;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: #35495e;
    cursor: pointer;
    &:hover {
      background-color: #ecf5ff;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
