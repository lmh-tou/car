<template>
  <div class="back">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入账号" v-model="userName"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button icon="el-icon-search" circle @click="search"></el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%;margin-top:5%" height="700">
      <el-table-column prop="userName" label="账号" width="180"> </el-table-column>
      <el-table-column prop="password" label="密码" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="230"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" width="250"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)">修改</el-button>
          <el-button @click="deleteOne(scope.row)" v-if="scope.row.userName != 'admin'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="50%">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号">
              <el-input v-model="form.userName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址">
              <el-input v-model="form.address"></el-input>
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
      dialogVisible: false,
      dialogVisible1: false,
      userName: '',
      form: {
        userName: '',
        password: '',
        phone: '',
        name: '',
        address: '',
      }
    }
  },
  methods: {
    edit(row) {
      this.dialogVisible = true
      this.form.userName = row.userName
      this.form.password = row.password
      this.form.phone = row.phone
      this.form.name = row.name
      this.form.address = row.address
    },
    cancel() {
      this.dialogVisible = false
    },
    deleteOne(row) {
      this.$http
        .post('/api/admin/deleteOne', {
          userName: row.userName,
        })
        .then(() => {
          this.reload()
          this.$message.success('删除成功')
        })
    },
    confirm() {
      this.$http.post('/api/admin/editUser', {
        userName: this.form.userName,
        password: this.form.password,
        phone: this.form.phone,
        name: this.form.name,
        address: this.form.address
      }).then(() => {
        this.reload()
        this.$message.success('修改成功')
      })
    },
    search() {
      this.$http
        .post('/api/admin/search', {
          userName: this.userName,
        })
        .then((res) => {
          this.tableData = res.data.data
        })
    },
  },
  mounted() {
    this.$http.post('/api/admin/userList').then((res) => {
      this.tableData = res.data.data
    })
  },
}
</script>

<style lang="less" scoped>
.back {
  .showImg {
    width: 35px;
    height: 35px;
  }
  .img {
    width: 300px;
    height: 200px;
  }
}
</style>
