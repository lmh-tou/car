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
        <div @click="returnCar">
          退订车辆
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          猜你喜欢
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          用户咨询
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          我的订单
        </div>
      </el-card>
      <el-card class="box-card">
        <div @click="loginOut">
          退出登录
        </div>
      </el-card>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>当前订单状态为{{this.label}}，请选择是否退订，如需查看详细订单信息，可进入我的订单进行查看</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      label: '',
      id: ''
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
    returnCar() {
      let userName = sessionStorage.getItem('userName')
      this.$http
        .post('/api/user/selectReturn', {
          userName,
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            this.$message.warning('暂无可退订车辆')
          } else {
            this.label = res.data.data[0].label
            this.id = res.data.data[0].id
            this.dialogVisible = true
          }
        })
    },
    confirm() {
      this.$http.post('/api/user/userReturn', {
        id: this.id
      }).then(() => {
        this.dialogVisible = false
        this.$message.success('退货申请已发出')
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
