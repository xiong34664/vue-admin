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
                  placeholder="密码"
                  @keyup.native.enter="loginSubmit('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
        plain
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
            this.$store.commit('setUser', res.data.username)
            this.$router.push('/')
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
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/architectural-architectural-design-architecture-1029614.png) no-repeat center /cover;
  .container {
    width: 280px;
    padding: 28px 40px 10px;
    position: absolute;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    // border-radius: 5px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
    transition: all 1s ease;
    &:hover{
      box-shadow: 0px 6px 20px rgba(20, 20, 20, 0.13);
      transform: translateY(-50.5%) translateY(-10px);
    }
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      // margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 0 0px 7px rgba(255, 255, 255, 0.6),0 0 0px 14px rgba(255, 255, 255, 0.4);
      overflow: hidden;
      background: url(../assets/avatar.gif) no-repeat center / cover;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
