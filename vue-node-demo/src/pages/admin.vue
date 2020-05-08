<template>
  <div class="back">
    <div class="main">
      <el-form>
        <el-form-item class="text">
          <el-select
            v-model="value"
            placeholder="用户信息管理"
            class="select"
            @change="change"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text">
          <el-select
            v-model="carValue"
            placeholder="车辆管理"
            class="select"
            @change="carManage"
            clearable
          >
            <el-option
              v-for="item in carOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-card class="box-card">
        <div @click="orderManage">
          订单管理
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
  data() {
    return {
      value: '',
      orderValue: '',
      carValue: '',
      options: [
        {
          value: '1',
          label: '买家详情表',
        },
        {
          value: '2',
          label: '卖家详情表',
        },
      ],
      orderOptions: [
        {
          value: '1',
          label: '订单列表',
        },
        {
          value: '2',
          label: '订单详情表',
        },
      ],
      carOptions: [
        {
          value: '1',
          label: '申请售卖',
        },
        {
          value: '2',
          label: '退订车辆',
        },
      ],
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
    userManage() {
      let newpage = this.$router.resolve({
        name: 'adminUserManage',
      })
      window.open(newpage.href, '_blank')
    },
    orderManage() {
      let newpage = this.$router.resolve({
        name: 'orderManage',
      })
      window.open(newpage.href, '_blank')
    },
    carManage() {
      if (this.carValue == 1) {
        let newpage = this.$router.resolve({
          name: 'saleCar',
        })
        window.open(newpage.href, '_blank')
      } else {
        let newpage = this.$router.resolve({
          name: 'returnCar',
        })
        window.open(newpage.href, '_blank')
      }
    },
    change() {
      if (this.value == 2) {
        let newpage = this.$router.resolve({
          name: 'saleTable',
        })
        window.open(newpage.href, '_blank')
      }
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
    .select {
      margin-bottom: 2%;
      width: 217px;
      margin-left: -25%;
    }
    .text {
      margin-left: 20%;
      font-size: 20px;
    }
  }
  .box-card {
    margin-bottom: 10%;
    cursor: pointer;
  }
}
</style>
