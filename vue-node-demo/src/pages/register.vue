<template>
  <div class="back">
    <el-row class="identity">
      <el-col :offset="20">
        <el-radio v-model="radio" label="1">我是买家</el-radio>
        <el-radio v-model="radio" label="2">我是卖家</el-radio>
      </el-col>
    </el-row>
    <div class="box-card">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form
            label-position="left"
            label-width="80px"
            :model="formRegister"
            :rules="rules"
            ref="formRegister"
          >
            <el-form-item label="账号" prop="userName">
              <el-input v-model="formRegister.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formRegister.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input v-model="formRegister.checkPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formRegister.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUser">立即注册</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
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
    let checkPasswordAgain = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('再次输入密码不能为空!'))
      } else if (value !== this.formRegister.password) {
        return cb(new Error('两次输入密码不一致!'))
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
      formRegister: {
        userName: '',
        password: '',
        checkPassword: '',
        phone: '',
      },
      rules: {
        userName: [{ validator: checkUserName, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
        checkPassword: [{ validator: checkPasswordAgain, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
      },
      radio: '1'
    }
  },
  methods: {
    // 用户注册
    addUser() {
      let user = this.formRegister
      let formData = {
        userName: user.userName,
        password: user.password,
        phone: user.phone,
        radio: this.radio
      }
      //表单验证
      this.$refs['formRegister'].validate((valid) => {
        if (valid) {
          this.$http.post('/api/registered/add', formData).then((res) => {
            if (res.data.code == 0) {
              this.$message.error('用户名已存在')
            } else if (res.data.code == 2) {
              this.$message.error('手机号已存在')
            } else {
              this.$router.push('/login')
            }
          })
        } else {
          this.$message.error('表单验证失败!')
          return false
        }
      })
    },
    cancel() {
      this.$router.push('/login')
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
    right: 10%;
  }
  .box-card {
    width: 50%;
    margin-left: 55%;
    margin-top: 15%;
  }
}
</style>
