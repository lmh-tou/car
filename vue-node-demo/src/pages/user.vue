<template>
  <div class="back">
    <div class="main">
      <el-card class="box-card">
        <div @click="userManage">
          用户信息管理
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="look">
          查看车辆
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="cancel">
          退订车辆
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="like">
          猜你喜欢
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="consult">
          用户咨询
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="consult">
          我的订单
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="loginOut">
          退出登录
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut() {
      this.$router.replace('/')
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    },
    look() {
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
    userManage() {
      let newpage = this.$router.resolve({
        name: 'userManage',
      })
      window.open(newpage.href, '_blank')
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
  .main {
    width: 15%;
    height: 90%;
    margin-top: 5%;
    margin-left: 55%;
    text-align: center;
    font-size: 20px;
  }
  .box-card {
    margin-bottom: 10%;
    cursor: pointer;
  }
}
</style>
