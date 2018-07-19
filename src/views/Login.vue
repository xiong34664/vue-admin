<template>
  <div class="login">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             class="container">
      <el-form-item>
        <div class="avatar"></div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username"
                  prefix-icon="xxicon xxicon-user"
                  placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password"
                  type="password"
                  prefix-icon="xxicon xxicon-key"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info"
                   class="login-btn"
                   @click="loginSubmit('form')">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { checkUser } from '@/api'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    loginSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkUser(this.form).then(res => {
            if (res.meta.status === 400) return this.$message.error(res.meta.msg)
            localStorage.xxtoken = res.data.token
            this.$router.push({ name: 'Home' })
          })
        } else {
          console.log('信息填写不完整!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #32383d;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
      background: url(../assets/avatar.gif) no-repeat center / cover;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
