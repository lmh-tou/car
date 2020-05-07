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
    <el-table :data="tableData" stripe style="width: 100%;margin-top:5%" height="400">
      <el-table-column prop="userName" label="账号" width="180" fixed> </el-table-column>
      <el-table-column prop="password" label="密码" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" width="180"> </el-table-column>
      <el-table-column prop="describe1" label="描述" width="180"> </el-table-column>
      <el-table-column prop="money" label="价格" width="180"> </el-table-column>
      <el-table-column prop="brand" label="品牌" width="180"> </el-table-column>
      <el-table-column prop="time" label="上牌时间" width="180"> </el-table-column>
      <el-table-column prop="distance" label="行驶里程" width="180"> </el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="showImg(scope.row.img)" alt="" v-if="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)">修改</el-button>
          <el-button @click="deleteOne(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="50%">
      <el-form label-width="80px">
        <el-row>
          <el-col>
            <el-form-item>
              <img
                :src="showImg(this.form.img)"
                alt=""
                v-if="this.form.img"
                class="img"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
          <el-col :span="12">
            <el-form-item label="描述">
              <el-input v-model="form.describe1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="价格">
              <el-input v-model="form.money"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌">
              <el-input v-model="form.brand"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上牌时间">
              <el-date-picker v-model="form.time" type="month" placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行驶里程">
              <el-input v-model="form.distance"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12' :offset='3'>
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :limit="1"
              ref="upload"
              :on-exceed="onExceed"
              :on-change="fileChange"
              :disabled="show"
            >
              <div slot="tip" class="el-upload__tip">
                只能上传一张jpg/png文件
              </div>
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
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
      userName: '',
      form: {
        img: '',
        userName: '',
        password: '',
        phone: '',
        name: '',
        address: '',
        describe1: '',
        brand: '',
        money: '',
        distance: '',
        time: '',
      },
    }
  },
  methods: {
    showImg(icon) {
      return require('../../../server/img/' + icon)
    },
    edit(row) {
      console.log(row)
      this.dialogVisible = true
      this.form.img = row.img
      this.form.userNamw = row.userName
      this.form.password = row.password
      this.form.phone = row.phone
      this.form.name = row.name
      this.form.address = row.address
      this.form.describe1 = row.describe1
      this.form.money = row.money
      this.form.brand = row.brand
      this.form.distance = row.distance
      this.form.time = row.time
    },
    cancel() {
      this.dialogVisible = false
    },
    deleteOne(row) {
      this.$http.post('/api/sale/deleteOne', {
        userName: row.userName
      }).then(() => {
        this.reload();
        this.$message.success('删除成功')
      })
    },
    search() {
      this.$http.post('/api/sale/search', {
        userName: this.userName
      }).then((res) => {
        this.tableData = res.data.data
      })
    }
  },
  mounted() {
    this.$http.post('/api/sale/saleList').then((res) => {
      this.tableData = res.data.data
    })
  },
}
</script>

<style lang="less" scoped>
.back {
  img {
    width: 35px;
    height: 35px;
  }
  .img {
    width: 300px;
    height: 200px;
  }
}
</style>
