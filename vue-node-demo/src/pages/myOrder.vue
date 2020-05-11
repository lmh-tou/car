<template>
  <div class="back">
    <div class="content">
      <img :src="showImg(img)" alt="" />
      <div class="deta">
        <div>
          <span class="text">订单ID：</span>
          <span>{{orderId}}</span>
        </div>
        <div>
          <span class="text">卖家：</span>
          <span>{{sale}}</span>
        </div>
        <div>
          <span class="text">交易方式：</span>
          <span>线上交易</span>
        </div>
        <div>
          <span class="text">价格：</span>
          <span>{{money}}万元</span>
        </div>
        <div>
          <span class="text">订单状态：</span>
          <span>{{status}}</span>
        </div>
        <div>
          <span class="text">下单时间：</span>
          <span>{{time}}</span>
        </div>
        <div>
          <span class="text">品牌：</span>
          <span>{{brand}}</span>
        </div>
        <div>
          <span class="text">行驶里程：</span>
          <span>{{distance}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: '',
      orderId: '',
      sale: '',
      money: '',
      status: '',
      time: '',
      brand: '',
      distance: ''
    }
  },
  methods: {
    showImg(icon) {
      return require('../../../server/img/' + icon)
    }
  },
  mounted() {
    let userName = sessionStorage.getItem('userName')
    this.$http.post('/api/user/myOrder', {
      userName
    }).then(res => {
      this.orderId = res.data.data[0].id
      this.sale = res.data.data[0].sale
      this.money = res.data.data[0].money
      this.label = res.data.data[0].label
      this.time = res.data.data[0].time
      this.$http.post('/api/user/myCar', {
        id: res.data.data[0].carId
      }).then(res => {
        this.img = res.data.data[0].img
        this.brand = res.data.data[0].brand
        this.distance = res.data.data[0].distance
      })
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
    }
  }
}
</style>
