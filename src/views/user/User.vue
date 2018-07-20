<template>
    <div class="user">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容"
                          class="search-input"
                          v-model="searchVal"
                          @keyup.native.enter="initList">
                    <el-button slot="append"
                               icon="el-icon-search"
                               @click="initList"></el-button>

                </el-input>
                <el-button type="success"
                           plain="">添加用户</el-button>
            </el-col>

        </el-row>
        <el-table :data="userList"
                  border
                  style="width: 100%">
            <el-table-column type="index"
                             width="50"></el-table-column>
            <el-table-column prop="username"
                             label="用户名"
                             width="180">
            </el-table-column>
            <el-table-column prop="email"
                             label="邮箱"
                             width="180">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="电话">
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scoped">
                    <el-switch v-model="scoped.row.mg_state"
                               @change="changeUserState(scoped.row)"
                               active-color="#13ce66"
                               inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
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
        <el-row>
            <el-col :span="24">
                <div class="page">
                    <el-pagination @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-sizes="[1, 3, 5, 7]"
                                   :page-size="pagesize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="total">
                    </el-pagination>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getUserList, changeUserStates } from '@/api'
export default {
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.initList()
    },
    initList () {
      let params = { params: { query: this.searchVal, pagenum: this.pagenum, pagesize: this.pagesize } }
      getUserList(params).then(res => {
        if (res.meta.status === 400) return this.$message('暂无数据')
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    changeUserState (row) {
      let params = { uid: row.id, type: row.mg_state }
      changeUserStates(params).then(res => {
        if (res.meta.status === 400) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
      })
    }
  },
  created () {
    this.initList()
  },
  data () {
    return {
      userList: [],
      currentPage: 1,
      searchVal: '',
      total: 0,
      pagesize: 3,
      pagenum: 1
    }
  }
}
</script>

<style scoped lang="scss">
.user {
  .search-input {
    width: 300px;
    margin-bottom: 5px;
  }
  .page {
    margin-top: 5px;
    padding: 5px 0;
    background-color: #d3dce6;
  }
}
</style>
