<template>
    <div class="home">
        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
                <el-menu default-active="1-1"
                         class="el-menu-admin"
                         :collapse='isCollapse'
                         :router='true'>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-location"></i>用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
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
                    <el-menu :default-active="activeIndex"
                             class="el-menu-demo"
                             mode="horizontal">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">我的工作台</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="2-4-1">选项1</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3"
                                      disabled>消息中心</el-menu-item>
                        <el-menu-item index="4">
                            <a href="https://www.ele.me"
                               target="_blank">订单管理</a>
                        </el-menu-item>
                    </el-menu>
                    <el-button type="text"
                               @click="logout">退出登录</el-button>

                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
import { getUserList } from '@/api'
export default {
  data () {
    return {
      activeIndex: '1',
      isCollapse: false,
      userList: []
    }
  },
  mounted () {
    let params = { params: { query: '', pagenum: 1, pagesize: 5 } }
    getUserList(params).then(res => {
      if (res.meta.status === 400) return this.$message('暂无数据')
      this.userList = res.data
    })
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      // 清除登入状态即保存在 localStorage中的token
      localStorage.removeItem('xxtoken')
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
    // background-size: cover;
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
