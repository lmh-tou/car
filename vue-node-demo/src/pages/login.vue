<template>
  <div class="back">
    <el-row class="identity">
      <el-col :offset="20">
        <el-radio v-model="radio" label="1">我是买家</el-radio>
        <el-radio v-model="radio" label="2">我是卖家</el-radio>
        <el-radio v-model="radio" label="3">我是管理员</el-radio>
      </el-col>
    </el-row>
    <div class="box-card">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form
            label-position="left"
            label-width="80px"
            :model="formLogin"
            :rules="rules"
            ref="formLogin"
          >
            <el-form-item label="账号" prop="userName">
              <el-input v-model="formLogin.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLogin.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formLogin.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
            <el-form-item>
              <router-link to="/register">
                <el-button type>
                  没有账号，立即注册
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
// 引入vuex /src/helper.js中的辅助函数，
// 将actions中的方法直接转为组件中的方法
import { mapActions } from 'vuex'

export default {
  data() {
    let checkUserName = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('账户不能为空!'))
      } else {
        cb() // 将判断传递给后面
      }
    }
    let checkPassword = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('密码不能为空!'))
      } else {
        cb()
      }
    }
    let checkPhone = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('手机号不能为空!'))
      } else if (value.length !== 11) {
        return cb(new Error('手机号必须为11位数字!'))
      } else {
        cb()
      }
    }
    return {
      formLogin: {
        userName: '',
        password: '',
        phone: '',
      },
      radio: '1',
      rules: {
        userName: [{ validator: checkUserName, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    // 向登录接口发起请求
    login() {
      let user = this.formLogin
      let formData = {
        userName: user.userName,
        password: user.password,
        phone: user.phone,
        identity: this.radio,
      }
      // 表单验证
      this.$refs['formLogin'].validate((valid) => {
        if (valid) {
          // 通过验证之后才请求登录接口
          this.$http.post('/api/login', formData).then((res) => {
            if (res.data.code == 1) {
              this.$message.success(res.data.message)
              console.log(res.data.identity)
              if (res.data.identity == '卖家') {
                this.$router.push('/sale')
                sessionStorage.setItem('saleUserName', this.formLogin.userName)
              } else if (res.data.identity == '管理员') {
                this.$router.push('/admin')
              }
            } else {
              this.$message.error(`${res.data.message}`)
              return false
            }
          })
        } else {
          this.$message.error('表单验证失败!')
          return false
        }
      })
    },
    // 表单重置
    resetForm() {
      this.$refs['formLogin'].resetFields()
    },
  },
}
</script>
<style lang="less" scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  .identity {
    position: relative;
    top: 23%;
    right: 20%;
  }
  .box-card {
    width: 35%;
    margin-left: 55%;
    margin-top: 15%;
  }
}
</style>
<style>
.el-form-item__label {
  color: #fff !important;
}
.el-radio {
  color: #fff !important;
}
</style>
