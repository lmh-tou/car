<template>
  <div class="back">
    <el-scrollbar style="height: 100%">
      <el-row>
        <el-col :span="12" :offset="6">
          <div style="margin-top: 15px;">
            <el-input
              placeholder="请输入车辆品牌"
              v-model="input"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="main">
        <el-row :gutter="20">
          <div v-for="item in carList" :key="item.id" @click="toCar(item)">
            <el-col :span="6">
              <el-card shadow="hover" :body-style="{ padding: '0px' }" class="card">
                <img :src="showImg(item.img)" alt="" class="img" />
                <div class="content">
                  <span>{{ item.brand }}</span>
                  <div class="describe">{{ item.describe1 }}</div>
                  <span class="text">{{ item.time }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="text">{{ item.distance }}公里</span>
                  <div class="money">{{ item.money }}万</div>
                </div>
              </el-card>
            </el-col>
          </div>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      carList: [],
    }
  },
  methods: {
    showImg(icon) {
      return require('../../../server/img/' + icon)
    },
    search() {
      this.$http
        .post('/api/user/search', {
          brand: this.input,
        })
        .then((res) => {
          this.carList = res.data.data
        })
    },
    toCar(item) {
      sessionStorage.setItem('carId', item.id)
      this.$router.push('/details')
    },
  },
  mounted() {
    this.$http.post('/api/user/guess').then((res) => {
      this.carList = res.data.data
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
  .main {
    margin-top: 3%;
    width: 90%;
    margin-left: 5%;
    height: 100%;
    .card {
      cursor: pointer;
      width: 285px;
      margin-top: 15px;
      .img {
        width: 285px;
        height: 193px;
      }
      .content {
        padding-left: 10px;
        padding-right: 24px;
        .describe {
          margin-left: 10%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          position: relative;
          top: -22px;
          left: 30px;
        }
        .text {
          color: #a5abb2;
        }
        .money {
          color: red;
          margin-top: 10px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
