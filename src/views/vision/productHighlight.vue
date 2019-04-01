<template>
  <div class="app-container">
    <div class="top-text">请上传统一尺寸的图片，否则以首张图片尺寸为准(限10张)</div>
    <el-upload
      class="avatar-image"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" class="image-list">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-row>
      <el-button type="primary">保存</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
  .avatar-image {
    margin: 6px 0 20px;
  }
  .top-text {
    color: #7C8EA6;
    font-size: 14px;
  }
</style>
