<template>
  <div class="back">
    <div class="main">
      <el-card class="box-card">
        <div @click="saleManage">
          用户信息管理
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          上传车辆信息
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
    saleManage() {
      let newpage = this.$router.resolve({
        name: 'saleManage',
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
    width: 40%;
    height: 90%;
    margin-top: 15%;
    margin-left: 55%;
  }
  .box-card {
    margin-bottom: 10%;
    cursor: pointer;
  }
}
</style>
