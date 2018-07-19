<template>
    <div class="home">
        <el-container>

            <el-aside width="200px">
                <el-radio-group v-model="isCollapse"
                                style="margin-bottom: 20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="2"
                         class="el-menu-vertical-demo"
                         @open="handleOpen"
                         @close="handleClose"
                         :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3"
                                  disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header>
                    <el-menu :default-active="activeIndex"
                             class="el-menu-demo"
                             mode="horizontal"
                             @select="handleSelect">
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
                </el-header>
                <el-main>
                    <el-table :data="userList.users"
                              style="width: 100%">
                        <el-table-column prop="role_name"
                                         label="日期"
                                         width="180">
                        </el-table-column>
                        <el-table-column prop="username"
                                         label="姓名"
                                         width="180">
                        </el-table-column>
                        <el-table-column prop="mobile"
                                         label="地址">
                        </el-table-column>
                    </el-table>
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
