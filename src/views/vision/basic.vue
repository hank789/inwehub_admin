<template>
  <div class="app-container visionBasic">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>

      <el-upload
        class="avatar-uploader"
        action="''"
        :auto-upload="false"
        :show-file-list="false"
        list-type="picture"
        :on-change="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>

      <el-form ref="ruleForm" :model="form" :rules="formRules" label-width="100px" label-position="top">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" name="name" placeholder="输入产品名称"/>
        </el-form-item>
        <el-form-item label="产品介绍" prop="desc">
          <el-input v-model="form.desc" name="desc" type="textarea" size="medium" class="textareaInput" placeholder="输入产品详细介绍"/>
        </el-form-item>

        <el-form-item label="上传介绍图" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="''"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getInfo, updateInfo } from '@/api/product'
import { fileToBase64 } from '@/utils/image'

export default {
  data() {
    return {
      id: null,
      form: {
        name: '',
        desc: ''
      },
      formRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入产品名称'},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [{ required: true, trigger: 'blur', message: '请输入产品介绍' }],
        imageUrl: [{ required: true, trigger: 'blur', message: '请上传介绍图' }],
      },
      imageUrl: '',
      dialogImageUrl: ''
    }
  },
  created() {
    getInfo().then(response => {
      this.dialogImageUrl = response.data.log
      this.id = response.data.id
      this.form.name = response.data.name
      this.form.desc = response.data.summary
      this.imageUrl = response.data.cover_pic
    })
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          updateInfo({
            id: this.id,
            name: this.form.name,
            logo: this.dialogImageUrl,
            summary: this.form.desc,
            cover_pic: this.imageUrl
          }).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess(file) {
      fileToBase64(file, (base64) => {
        this.imageUrl = base64
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      fileToBase64(file, (base64) => {
        this.dialogImageUrl = base64
      })
    }
  }
}
</script>

<style>
  .visionBasic .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .visionBasic .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .visionBasic .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .visionBasic .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style lang="scss">
  .textareaInput{
    textarea{
      height:120px;
    }
  }
</style>
