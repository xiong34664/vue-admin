<template>
  <div class="category">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success"
                   plain
                   @click="addCategory">添加分类</el-button>
      </el-col>
    </el-row>
    <tree-grid :treeStructure="true"
               :columns="columns"
               :data-source="dataSource"
               @deleteCate="deleteCategory"
               @editCate="editCategory"
               v-loading="loading">
    </tree-grid>
    <el-row>
      <el-col :span="24">
        <div class="page">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[5, 10, 18, 25]"
                         :page-size="pagesize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>

      </el-col>
    </el-row>
    <el-dialog title="添加分类"
               :visible.sync="addDialogFormVisible">
      <el-form :model="addForm"
               :rules="rules"
               ref="addCateForm"
               label-width="80px">
        <el-form-item label="分类名称"
                      prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader :options="options"
                       change-on-select
                       :props="props"
                       v-model="selectedOptions"
                       @active-item-change="handleItemChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addCateSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑分类"
               :visible.sync="editdialogFormVisible">
      <el-form :model="editForm"
               :rules="rules"
               ref="editCateForm">
        <el-form-item label="分类名称"
                      label-width="80px">
          <el-input v-model="editForm.cat_name"
                    prop="cat_name"
                    @keyup.native.enter="editCateSubmit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editCateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeGrid from '@/components/TreeGrid/TreeGrid'
import { getCategories, addCategories, delCategories, getCategorie, editCategories } from '@/api'
export default {
  data () {
    return {
      addDialogFormVisible: false,
      editdialogFormVisible: false,
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      editForm: {
        cat_name: '',
        id: null
      },
      selectedOptions: [],
      rules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name'
      },
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      pagesize: 5,
      pagenum: 1,
      currentPage: 1,
      total: 10,
      loading: true
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      this.loading = true
      getCategories({ type: '3', pagenum: this.pagenum, pagesize: this.pagesize }).then(res => {
        if (res.meta.status === 200) {
          this.total = res.data.total
          this.dataSource = res.data.result
          this.loading = false
        }
      })
    },
    deleteCategory (cid) {
      this.$confirm('此操作将永久删除改分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCategories(cid).then(res => {
          if (res.meta.status === 400) return this.$message.error(res.meta.msg)
          this.$message.success(res.meta.msg)
          this.initList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editCategory (cid) {
      getCategorie(cid).then(res => {
        if (res.meta.status === 400) this.$message.error(res.meta.msg)
        this.editForm.cat_name = res.data.cat_name
        this.editForm.id = res.data.cat_id
        this.editdialogFormVisible = true
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.initList()
    },
    addCateSubmit () {
      this.$refs.addCateForm.validate(valid => {
        if (valid) {
          if (this.selectedOptions.length === 0) {
            this.addForm.cat_pid = 0
            this.addForm.cat_level = 0
          } else if (this.selectedOptions.length === 1) {
            this.addForm.cat_pid = this.selectedOptions[0]
            this.addForm.cat_level = 1
          } else {
            this.addForm.cat_pid = this.selectedOptions[1]
            this.addForm.cat_level = 2
          }
          addCategories(this.addForm).then(res => {
            if (res.meta.status === 400) this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.addDialogFormVisible = false
            this.selectedOptions.length = 0
            this.addForm.cat_name = ''
            this.initList()
          })
        }
      })
    },
    handleItemChange (val) {
      console.log(val)
    },
    addCategory () {
      getCategories({ type: '2' }).then(res => {
        if (res.meta.status === 200) {
          this.options = res.data
          this.addDialogFormVisible = true
        }
      })
    },
    editCateSubmit () {
      editCategories(this.editForm.id, { 'cat_name': this.editForm.cat_name }).then(res => {
        if (res.meta.status === 400) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.editdialogFormVisible = false
        this.initList()
      })
    }
  },
  components: {
    treeGrid
  }
}
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 5px;
}
.page {
  margin-top: 5px;
  padding: 5px 0;
  background-color: #d3dce6;
}
</style>
