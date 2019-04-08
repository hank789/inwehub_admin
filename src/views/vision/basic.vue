<template>
  <div class="app-container visionBasic" :v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>

      <Upload v-model="dialogImageUrl" style="width:200px;height:200px;" :placeholder="'添加产品Logo<br/>尺寸200px*200px<br/>2M以内'"/>

      <el-form ref="ruleForm" :model="form" :rules="formRules" label-width="100px" label-position="top">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" name="name" placeholder="输入产品名称"/>
        </el-form-item>
        <el-form-item label="产品介绍" prop="desc">
          <el-input v-model="form.desc" name="desc" type="textarea" size="medium" class="textareaInput" placeholder="输入产品详细介绍"/>
        </el-form-item>

        <el-form-item label="上传介绍图" prop="imageUrl">
          <Upload v-model="form.imageUrl" style="width:480px;height:184px;" :placeholder="'添加产品介绍图<br/>推荐尺寸900px*600px'"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateInfo } from '@/api/product'
import Upload from '@/components/Upload/singleImage2'

export default {
  data() {
    return {
      loading: 1,
      id: null,
      form: {
        name: '',
        desc: '',
        imageUrl: ''
      },
      formRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入产品名称'}
        ],
        desc: [{ required: true, trigger: 'blur', message: '请输入产品介绍' }],
        imageUrl: [{ required: true, trigger: 'blur', message: '请上传介绍图' }],
      },
      dialogImageUrl: ''
    }
  },
  components: {
    Upload
  },
  created() {
    this.$store.dispatch('product/getProductInfo', (product) => {
      this.loading = 0
      this.dialogImageUrl = product.log
      this.id = product.id
      this.form.name = product.name
      this.form.desc = product.summary
      this.form.imageUrl = product.cover_pic
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
            cover_pic: this.form.imageUrl
          }).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'error'
          })
          return false
        }
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
