<template>
    <div class="roles">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"
                    class="add-input">
                <el-button @click="add"
                           type="primary"
                           plain>添加角色</el-button>
            </el-col>
        </el-row>
        <el-table :data="roleList"
                  v-loading="loading"
                  border
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scoped">
                   这里眼替换
                </template>
            </el-table-column>
            <el-table-column label="角色名称"
                             prop="roleName">
            </el-table-column>
            <el-table-column label="描述"
                             prop="roleDesc">
            </el-table-column>
            <el-table-column label="操作"
                             prop="desc">
                <template slot-scope="scoped">
                    <el-button size="mini"
                               plain
                               type="primary"
                               icon="el-icon-edit"></el-button>
                    <el-button size="mini"
                               plain
                               type="danger"
                               icon="el-icon-delete"></el-button>
                    <el-button size="mini"
                               plain
                               type="warning"
                               icon="el-icon-check"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getRoles} from '@/api'
export default {
  data () {
    return {
      roleList: [],
      loading: true
    }
  },
  created () {
    this.initRolesList()
  },
  methods: {
    initRolesList () {
      this.loading = true
      getRoles().then(res => {
        if (res.meta.status === 400) return this.$message(res.meta.msg)
        this.roleList = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add-input {
  margin-bottom: 5px;
}
</style>
