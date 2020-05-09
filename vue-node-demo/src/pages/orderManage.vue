<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入订单ID" v-model="id"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="value" placeholder="请选择状态" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-button icon="el-icon-search" circle @click="search"></el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%" height="780">
      <el-table-column prop="id" label="订单ID" width="150"> </el-table-column>
      <el-table-column prop="buy" label="买家" width="150"> </el-table-column>
      <el-table-column prop="sale" label="卖家" width="150"> </el-table-column>
      <el-table-column prop="time" label="时间" width="150"> </el-table-column>
      <el-table-column prop="place" label="地点" width="180"> </el-table-column>
      <el-table-column prop="money" label="价格" width="180"> </el-table-column>
      <el-table-column prop="label" label="状态" width="180"> </el-table-column>
      <el-table-column prop="carId" label="车辆ID" width="150"> </el-table-column>
      <el-table-column width="130" label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单ID" prop="id">
              <el-input v-model="form.id" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆ID" prop="carId">
              <el-input v-model="form.carId" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="买家" prop="buy">
              <el-input v-model="form.buy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="卖家" prop="sale">
              <el-input v-model="form.sale"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="时间" prop="time">
              <el-date-picker v-model="form.time" type="month" placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地点" prop="place">
              <el-input v-model="form.place"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="价格" prop="money">
              <el-input v-model="form.money"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="value">
              <el-select v-model="form.value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      value: '',
      options: [],
      id: '',
      dialogVisible: false,
      form: {
        id: '',
        carId: '',
        buy: '',
        sale: '',
        time: '',
        place: '',
        money: '',
        value: '',
      },
      rules: {
        buy: [{ required: true, message: '请输入买家', trigger: 'blur' }],
        sale: [{ required: true, message: '请输入卖家', trigger: 'blur' }],
        time: [{ required: true, message: '请输入时间', trigger: 'blur' }],
        place: [{ required: true, message: '请输入地点', trigger: 'blur' }],
        money: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        value: [{ required: true, message: '请输入状态', trigger: 'blur' }],
      },
    }
  },
  methods: {
    edit(row) {
      this.dialogVisible = true
      this.form = row
      this.form.value = row.status
    },
    cancel() {
      this.dialogVisible = false
    },
    confirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let time = this.$moment(this.form.time).format('YYYY-MM-DD HH:mm:ss')
          this.$http
            .post('/api/admin/editOrder', {
              buy: this.form.buy,
              sale: this.form.sale,
              time,
              place: this.form.place,
              money: this.form.money,
              status: this.form.value,
              id: this.form.id
            })
            .then(() => {
              this.reload()
              this.dialogVisible = false
              this.$message.success('修改成功')
            })
        } else {
          return false
        }
      })
    },
    search() {
        this.$http.post('/api/admin/orderManageSearch', {
            id: this.id,
            value: this.value
        }).then(res => {
            this.tableData = res.data.data
        })
    }
  },
  mounted() {
    this.$http.post('/api/admin/orderList').then((res) => {
      this.tableData = res.data.data
    })
    this.$http.post('/api/admin/statusList').then((res) => {
      this.options = res.data.data
    })
  },
}
</script>

<style lang="less" scoped></style>
