<template>
  <div class="back">
    <img :src="showImg(this.form.img)" alt="" v-if="this.form.img" />
    <el-card class="box">
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="上传图片" :hide-required-asterisk="true">
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
          <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="上牌时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="month"
            placeholder="选择月"
            :disabled="show"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="行驶里程" prop="distance">
          <el-input v-model="form.distance" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="money">
          <el-input v-model="form.money" :disabled="show"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.describe1"
            :disabled="show"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button @click="upload">上传</el-button>
        <el-button @click="edit">修改</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        brand: '',
        time: '',
        distance: '',
        money: '',
        describe: '',
        img: '',
      },
      file: '',
      show: true,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {
        brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
        time: [{ required: true, message: '请输入时间', trigger: 'blur' }],
        distance: [{ required: true, message: '请输入里程', trigger: 'blur' }],
        money: [{ required: true, message: '请输入价格', trigger: 'blur' }],
      },
    }
  },
  methods: {
    onExceed() {
      this.$message.warning('当前限制选择1个文件')
    },
    fileChange(file) {
      this.file = file
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove() {
      this.$refs.upload.clearFiles()
    },
    showImg(icon) {
      return require('../../../server/img/' + icon)
    },
    edit() {
      this.show = false
    },
    upload() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$refs.upload.uploadFiles.length == 0) {
            this.uploadMessage()
          } else {
            if (this.file.raw.type == 'image/jpeg' || this.file.raw.type == 'image/png') {
              this.uploadMessage()
              const formData = new FormData()
              const file = this.$refs.upload.uploadFiles[0]
              const headerConfig = {
                headers: { 'Content-Type': 'multipart/form-data' },
              }
              formData.append('file', file.raw)
              this.$http.post('/api/sale/upload', formData, headerConfig).then(() => {
                this.reload()
                this.$message.success('上传成功')
              })
            } else {
              this.$message.warning('只能上传jpg/png格式的图片')
            }
          }
        } else {
          return false
        }
      })
    },
    uploadMessage() {
      let saleUserName = sessionStorage.getItem('saleUserName')
      let time = this.$moment(this.form.time).format('YYYY-MM-DD HH:mm:ss')
      this.$http
        .post('/api/sale/uploadMessage', {
          brand: this.form.brand,
          time,
          distance: this.form.distance,
          money: this.form.money,
          describe1: this.form.describe1,
          saleUserName,
        })
        .then(() => {
          this.reload()
          this.$message.success('上传成功')
          this.show = true
        })
    },
  },
  mounted() {
    let saleUserName = sessionStorage.getItem('saleUserName')
    this.$http
      .post('/api/sale/list', {
        saleUserName,
      })
      .then((res) => {
        this.form = res.data.data[0]
      })
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
  img {
    float: left;
    width: 500px;
    height: 400px;
    margin-top: 20%;
    margin-left: 15%;
  }
  .box {
    width: 37%;
    height: 80%;
    margin-top: 8%;
    margin-left: 60%;
    background: rgb(158, 155, 155);
  }
  .button {
    margin-left: 37%;
  }
}
</style>
