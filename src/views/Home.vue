<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu class="el-menu-admin"
                 :collapse='isCollapse'
                 :unique-opened='true'
                 :router='true'>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">
                <i class="el-icon-tickets"></i>用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="roles">
                <i class="el-icon-tickets"></i>角色列表
              </el-menu-item>
              <el-menu-item index="rights">
                <i class="el-icon-tickets"></i>权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
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
export default {
  data () {
    return {
      activeIndex: '1',
      isCollapse: false
    }
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
