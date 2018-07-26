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
        <el-button type="primary"
                   @click="dialogAddRole = true"
                   plain>添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="roleList"
              v-loading="loading"
              border
              height="450"
              style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scoped">
          <el-row v-for="firstChildren in scoped.row.children"
                  :key="firstChildren.id"
                  v-if=" scoped.row.children.length !== 0">
            <el-col :span="3">
              <el-tag closable
                      @close="delRight(scoped.row,firstChildren.id)">{{firstChildren.authName}}</el-tag>
              <i class="el-icon-arrow-right"
                 v-if="firstChildren.children.length !== 0"></i>
            </el-col>
            <el-col :span="21">
              <el-row v-for="secondChildren in firstChildren.children"
                      :key="secondChildren.id">
                <el-col :span="3">
                  <el-tag type="success"
                          closable
                          @close="delRight(scoped.row,secondChildren.id)">{{secondChildren.authName}}</el-tag>
                  <i class="el-icon-arrow-right"
                     v-if="firstChildren.children.length !== 0"></i>
                </el-col>
                <el-col :span="21">
                  <el-tag type="warning"
                          v-for="thirdChildren in secondChildren.children"
                          :key="thirdChildren.id"
                          closable
                          @close="delRight(scoped.row,thirdChildren.id)">{{thirdChildren.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scoped.row.children.length === 0">
            <el-col :span="24">
              <el-tag type="danger">该角色没有分配权限,请前往分配</el-tag>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"
                       width="50"></el-table-column>
      <el-table-column label="角色名称"
                       prop="roleName"
                       width="200">
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
                     icon="el-icon-edit"
                     @click="showEditDialog(scoped.row)"></el-button>
          <el-button size="mini"
                     plain
                     type="danger"
                     icon="el-icon-delete"
                     @click="delRole(scoped.row.id)"></el-button>
          <el-tooltip class="item"
                      effect="light"
                      content="授权角色"
                      placement="right-start">
            <el-button size="mini"
                       plain
                       type="warning"
                       icon="el-icon-check"
                       @click="showDialog(scoped.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="授权角色"
               :visible.sync="dialogRoleRight">
      <el-tree :data="data"
               show-checkbox
               node-key="id"
               ref="tree"
               :default-expand-all="true"
               :default-checked-keys="selectedRights"
               :props="defaultProps">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogRoleRight = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitGrant">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加角色"
               :visible.sync="dialogAddRole">
      <el-form :model="roleForm"
               :rules="rules"
               ref="roleForm"
               label-width="120px">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.roleDesc"
                    @keyup.native.enter="addSubmitRole"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddRole = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色"
               :visible.sync="dialogEditRole">
      <el-form :model="editForm"
               :rules="rules"
               ref="editForm"
               label-width="120px">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.roleDesc"
                    @keyup.native.enter="editSubmitRole"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogEditRole = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, delRoleRight, getRightList, grantRoleRight, addRole, deleteRole, editRole } from '@/api'
export default {
  data () {
    return {
      roleList: [],
      loading: true,
      dialogRoleRight: false,
      dialogAddRole: false,
      dialogEditRole: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      selectedRights: [],
      currentRole: {},
      roleForm: {
        roleName: '',
        roleDesc: ''
      },
      editForm: {
        roleName: '',
        roleDesc: ''
      },
      currentRoleId: null,
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
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
    },
    delRight (row, rightId) {
      let roleId = row.id
      delRoleRight({ roleId, rightId }).then(res => {
        if (res.meta.status === 400) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        // res 返回的是当前所有拥有的角色信息  所有  应该把 删除后的角色信息传给当前行
        row.children = res.data
      })
    },
    showDialog (row) {
      this.currentRole = row
      getRightList({ type: 'tree ' }).then(res => {
        if (res.meta.status === 400) return this.$message.error(res.meta.msg)
        this.data = res.data
        this.dialogRoleRight = true
      })
      // 取出当前点击角色的所有权限
      this.selectedRights.length = 0
      this.currentRole.children.forEach(first => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0) {
              second.children.forEach(third => {
                this.selectedRights.push(third.id)
              })
            }
          })
        }
      })
    },
    submitGrant () {
      let rids = this.$refs.tree.getCheckedKeys().toString()
      grantRoleRight(this.currentRole.id, { rids }).then(res => {
        if (res.meta.status === 400) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.dialogRoleRight = false
        this.initRolesList()
      })
    },
    addSubmitRole () {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          addRole(this.roleForm).then(res => {
            if (res.meta.status === 400) return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.dialogAddRole = false
            this.roleForm.roleName = ''
            this.roleForm.roleDesc = ''
            this.initRolesList()
          })
        }
      })
    },
    delRole (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then(res => {
          if (res.meta.status === 400) return this.$message.error(res.meta.msg)
          this.$message.success(res.meta.msg)
          this.initRolesList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showEditDialog (row) {
      this.editForm.roleName = row.roleName
      this.editForm.roleDesc = row.roleDesc
      this.currentRoleId = row.id
      this.dialogEditRole = true
    },
    editSubmitRole () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          editRole(this.currentRoleId, this.editForm).then(res => {
            if (res.meta.status === 400) return this.$message.error(res.meta.msg)
            this.$message.success('编辑成功')
            this.dialogEditRole = false
            this.initRolesList()
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add-input {
  margin-bottom: 5px;
}
.el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.el-tree {
  height: 300px;
  overflow-y: scroll;
}
</style>
