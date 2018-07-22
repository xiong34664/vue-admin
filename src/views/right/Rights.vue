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
                  v-loading="loading"
                  style="width: 100%">
            <el-table-column type="index"
                             width="50"></el-table-column>
            <el-table-column prop="authName"
                             label="权限名称"
                             width="180">
            </el-table-column>
            <el-table-column prop="path"
                             label="路径">
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scoped">
                   <span>{{scoped.row.level | fmtLevel}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scoped">
                    <el-button size="mini"
                               plain
                               type="primary"
                               icon="el-icon-edit"
                               @click="getUser(scoped.row.id)"></el-button>
                    <el-button size="mini"
                               plain
                               type="danger"
                               icon="el-icon-delete"
                               @click="deleteUser(scoped.row.id)"></el-button>
                    <el-button size="mini"
                               plain
                               type="warning"
                               icon="el-icon-check"
                               @click="showGrantDialog(scoped.row)"></el-button>
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
