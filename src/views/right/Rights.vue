<template>
    <div class="rights">
   <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-table :data="rightList"
                  border
                  height="490"
                  v-loading="loading">
            <el-table-column type="index"
                             width="50"></el-table-column>
            <el-table-column prop="authName"
                             label="权限名称">
            </el-table-column>
            <el-table-column prop="path"
                             label="路径">
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scoped">
                   <span>{{scoped.row.level | fmtLevel}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getRightList} from '@/api'
export default {
  data () {
    return {
      loading: true,
      rightList: []
    }
  },
  created () {
    this.initRight()
  },
  methods: {
    initRight () {
      this.loading = true
      getRightList({type: 'list'}).then(res => {
        if (res.meta.status === 400) return this.$message(res.meta.msg)
        this.rightList = res.data
        this.loading = false
      })
    }
  },
  filters: {
    fmtLevel (eve) {
      switch (eve) {
        case '0':
          return '一级'
          break
        case '1':
          return '二级'
          break
        case '2':
          return '三级'
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
</style>
