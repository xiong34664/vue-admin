<template>
  <div class="goods">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
              class="addMsg">添加商品信息</el-col>
    </el-row>
    <el-steps :active="active"
              finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             tab-position="left"
             class="mt20">
      <el-tab-pane label="基本信息"
                   name="first">
        <el-form status-icon
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 :model="goods"
                 class="demo-ruleForm">
          <el-form-item label="商品名称"
                        prop="goods_name">
            <el-input v-model="goods.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格"
                        prop="goods_price">
            <el-input v-model.number="goods.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量"
                        prop="goods_weight">
            <el-input v-model.number="goods.goods_weight"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品数量"
                        prop="goods_number">
            <el-input v-model.number="goods.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="父级名称"
                        prop="goods_cat">
            <el-cascader :options="options"
                         change-on-select
                         :props="props"
                         v-model="goods.goods_cat"
                         placeholder="请选择分类"
                         @active-item-change="handleItemChange">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="warning"
                       @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数"
                   name="second">配置管理</el-tab-pane>
      <el-tab-pane label="商品属性"
                   name="third">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片"
                   name="fourth">
        <el-upload action="http://localhost:8888/api/private/v1/upload"
                   :headers="setHeaders()"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :on-success="handleSuccess"
                   list-type="picture">
          <el-button size="small"
                     type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容"
                   name="fifth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCategories } from '@/api'
export default {
  data () {
    return {
      active: 0,
      activeName: 'first',
      goods: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        pics: '',
        attrs: []
      },
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name'
      },
      rules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, type: 'number', message: '请输入正确的商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入正确的商品重量' }],
        goods_number: [{ type: 'number', required: true, message: '请输入正确的商品数量', trigger: 'blur' }],
        goods_cat: [{ type: 'array', required: true, message: '请至少选择一个分类', trigger: 'blur' }]
      }
    }
  },
  created () {
    getCategories({ type: '2' }).then(res => {
      if (res.meta.status === 200) {
        this.options = res.data
        this.addDialogFormVisible = true
      }
    })
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    handleClick (tab, event) {
      this.active = +tab.index
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    setHeaders () {
      return { 'Authorization': localStorage.xxtoken }
    },
    handleSuccess (response, file, fileList) {
      if (response.meta.status === 200) this.$message.success(response.meta.msg)
    },
    handleItemChange (val) {
      console.log(val)
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.addMsg {
  margin-top: -5px;
  padding: 14px 15px;
  background-color: #dbe3eb;
  margin-bottom: 20px;
}
.mt20 {
  margin-top: 20px;
}
</style>
