<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" height="780">
      <el-table-column prop="buy" label="买家" width="180"> </el-table-column>
      <el-table-column prop="sale" label="卖家" width="180"> </el-table-column>
      <el-table-column prop="carId" label="车辆编号" width="180"> </el-table-column>
      <el-table-column prop="time" label="交易时间" width="180"> </el-table-column>
      <el-table-column prop="place" label="交易地点" width="180"> </el-table-column>
      <el-table-column prop="money" label="价格" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="returnCar(scope.row)">同意退订</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    returnCar(row) {
      this.$http
        .post('/api/admin/returnCar', {
          id: row.id,
        })
        .then(() => {
          this.$message.success('已同意退订')
          this.reload()
        })
    },
  },
  mounted() {
    this.$http.post('/api/admin/Returnlist').then((res) => {
      this.tableData = res.data.data
    })
  },
}
</script>

<style lang="less" scoped></style>
