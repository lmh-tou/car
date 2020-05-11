<template>
  <div class="back">
    <div class="content">
      <img :src="showImg(detail.img)" alt="" />
      <div class="deta">
        <div>
          <span class="text">品牌名称：</span>
          <span>{{ detail.brand }}</span>
        </div>
        <div>
          <span class="text">车辆信息：</span>
          <span>{{ detail.describe1 }}</span>
        </div>
        <div>
          <span class="text">上牌时间：</span>
          <span>{{ detail.time }}</span>
        </div>
        <div>
          <span class="text">行驶里程：</span>
          <span>{{ detail.distance }}公里</span>
        </div>
        <div>
          <span class="text">价格：</span>
          <span>{{ detail.money }}万</span>
        </div>
        <div class="button">
          <el-row>
            <el-col :span="3">
              <el-button type="warning" plain @click="reservation">我要预定</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="success" @click="buy">立即购买</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: [],
    }
  },
  methods: {
    reservation() {
      let time = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      let userName = sessionStorage.getItem('userName')
      this.$http
        .post('/api/user/reservation', {
          carId: this.detail.id,
          userName,
          saleUserName: this.detail.saleUserName,
          time,
          place: '线上交易',
          money: this.detail.money,
          status: 4,
          label: '已预订'
        })
        .then(() => {
          this.$message.success('预订成功')
        })
    },
    buy() {
        let userName = sessionStorage.getItem('userName')
        this.$http.post('/api/user/buy', {
            userName,
            carId: this.detail.id
        }).then(() => {
            this.$message.success('购买申请已提交')
        })
    },
    showImg(icon) {
      return require('../../../server/img/' + icon)
    }
  },
  mounted() {
    let id = sessionStorage.getItem('carId')
    this.$http
      .post('/api/user/toCar', {
        id,
      })
      .then((res) => {
        this.detail = res.data.data[0]
      })
  },
}
</script>

<style lang="less" scoped>
.back {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .content {
    width: 80%;
    height: 100%;
    margin-left: 10%;
    margin-top: 8%;
    img {
      width: 462px;
      height: 315px;
      margin-top: 40px;
      float: left;
    }
    .deta {
      line-height: 30px;
      position: relative;
      top: 40px;
      left: 37px;
      .text {
        color: #6b6666;
      }
      .inven {
        font-size: 10px;
        margin-left: 20px;
        color: #6b6666;
      }
      .button {
        margin-top: 20px;
      }
    }
  }
}
</style>
