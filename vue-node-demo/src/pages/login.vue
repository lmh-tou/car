<template>
  <el-card class="box-card">
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
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formLogin.checkPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formLogin.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/src/pages/register">
              <el-button type>
                没有账号，立即注册
                <i class="el-icon-arrow-right el-icon--right"></i>
              </el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">
// 引入vuex /src/helper.js中的辅助函数，
// 将actions中的方法直接转为组件中的方法
import { mapActions } from "vuex";

export default {
  data() {
    let checkUserName = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("账户不能为空!"));
      } else {
        cb(); // 将判断传递给后面
      }
    };
    let checkPassword = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("密码不能为空!"));
      } else {
        cb();
      }
    };
    let checkPasswordAgain = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("再次输入密码不能为空!"));
      } else if (value !== this.formLogin.password) {
        return cb(new Error("两次输入密码不一致!"));
      } else {
        cb();
      }
    };
    let checkPhone = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("手机号不能为空!"));
      }else if(value.length !== 11){
        return cb(new Error("手机号必须为11位数字!"));
      }else {
        cb();
      }
    };
    return {
      formLogin: {
        userName: "",
        password: "",
        checkPassword: "",
        phone: ""
      },
      rules: {
        userName: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        checkPassword: [{ validator: checkPasswordAgain, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    // 向登录接口发起请求
    login() {
      let user = this.formLogin;
      let formData = {
        userName: user.userName,
        password: user.password,
        phone: user.phone
      };
      // 表单验证
      this.$refs["formLogin"].validate(valid => {
        if (valid) {
          // 通过验证之后才请求登录接口
          this.$http.post("/api/login", formData)
            .then(res => {
              console.dir(res.data);
              if (res.data.success) {
                this.userLogin(res.data);
                this.$message.success(`${res.data.message}`);
                // 登录成功 跳转至首页
                // this.$router.push({name:'Home'})
                this.$router.push("/");
              } else {
                this.$message.error(`${res.data.message}`);
                return false;
              }
            })
            .catch(err => {
              this.$message.error(`${err.message}`, "ERROR!");
            });
        } else {
          this.$message.error("表单验证失败!");
          return false;
        }
      });
    },
    // 表单重置
    resetForm() {
      console.log("session");
      this.$refs["formLogin"].resetFields();
    }
  }
};
</script>


<style lang="scss" scoped>
</style>