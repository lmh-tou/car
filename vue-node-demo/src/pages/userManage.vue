<template>
  <div class="back">
    <el-card class="box">
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="账号" class="input" prop="userName">
          <el-input v-model="form.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="input" prop="password">
          <el-input v-model="form.password" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="手机号" class="input" prop="phone">
          <el-input v-model="form.phone" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="input" prop="name">
          <el-input v-model="form.name" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" :disabled="show"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button @click="save">保存</el-button>
        <el-button @click="edit">修改</el-button>
      </div>
      <div class="text" @click="toCar">跳转到查看车辆</div>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        userName: '',
        password: '',
        phone: '',
        name: '',
        address: '',
      },
      show: true,
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号必须为11位', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
      },
    }
  },
  methods: {
    edit() {
      this.show = false
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http
            .post('/api/user/save', {
              userName: this.form.userName,
              password: this.form.password,
              phone: this.form.phone,
              name: this.form.name,
              address: this.form.address,
            })
            .then(() => {
              this.$message.success('修改成功')
              this.reload()
            })
        } else {
          return false
        }
      })
    },
    toCar() {
      let userName = sessionStorage.getItem('userName')
      this.$http
        .post('/api/user/userList', {
          userName,
        })
        .then((res) => {
          if (res.data.data[0].address == '' || res.data.data[0].name == '') {
              this.$message.error('请先填写用户信息')
          } else {
              this.$router.push('/look')
          }
        })
    },
  },
  mounted() {
    let userName = sessionStorage.getItem('userName')
    this.$http
      .post('/api/user/userList', {
        userName,
      })
      .then((res) => {
        this.form.userName = res.data.data[0].userName
        this.form.password = res.data.data[0].password
        this.form.phone = res.data.data[0].phone
        this.form.name = res.data.data[0].name
        this.form.address = res.data.data[0].address
      })
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
  .box {
    width: 37%;
    height: 68%;
    margin-top: 10%;
    margin-left: 60%;
    background: rgb(158, 155, 155);
    .input {
      margin-bottom: 10%;
    }
  }
  .button {
    margin-left: 35%;
  }
  .text {
    margin-top: 5%;
    margin-left: 35%;
    color: #fff;
    cursor: pointer;
  }
}
</style>
