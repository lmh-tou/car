<template>
  <div class="back">
    <div class="main">
      <el-card class="box-card">
        <div @click="saleManage">
          用户信息管理
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="upload">
          上传车辆信息
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="message">
          消息通知
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="loginOut">
          退出登录
        </div>
      </el-card>
    </div>
    <el-dialog
      title="消息"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <div>买家账号：{{ this.userName }}</div>
      <div>买家姓名：{{ this.name }}</div>
      <div>买家手机号：{{ this.phone }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">拒绝</el-button>
        <el-button type="primary" @click="confirm">同意</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      userName: '',
      name: '',
      phone: '',
      id: '',
      carId: ''
    }
  },
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
    upload() {
      let saleUserName = sessionStorage.getItem('saleUserName')
      this.$http
        .post('/api/sale/list', {
          saleUserName,
        })
        .then((res) => {
          if (!res.data.data[0].address || !res.data.data[0].name) {
            this.$message.error('请先完成用户信息管理')
          } else {
            let newpage = this.$router.resolve({
              name: 'upload',
            })
            window.open(newpage.href, '_blank')
          }
        })
    },
    message() {
      let saleUserName = sessionStorage.getItem('saleUserName')
      this.$http
        .post('/api/sale/saleMessage', {
          saleUserName,
        })
        .then((res) => {
          if (res.data.data.length == '0' || res.data.data[0].status != 6) {
            this.$message.warning('暂无消息通知')
            this.dialogVisible = false
          } else {
            this.dialogVisible = true
            this.id = res.data.data[0].id
            this.carId = res.data.data[0].carId
            this.$http
              .post('/api/sale/selectUser', {
                userName: res.data.data[0].buy,
              })
              .then((res) => {
                this.userName = res.data.data[0].userName
                this.name = res.data.data[0].name
                this.phone = res.data.data[0].phone
              })
          }
        })
    },
    cancel() {
      this.$http
        .post('/api/sale/cancel', {
          id: this.id,
        })
        .then(() => {
          this.$message.success('已拒绝')
          this.dialogVisible = false
        })
    },
    confirm() {
      this.$http
        .post('/api/sale/confirm', {
          id: this.id,
          carId: this.carId
        })
        .then(() => {
          this.$message.success('已同意')
          this.dialogVisible = false
        })
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
    margin-top: 15%;
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
