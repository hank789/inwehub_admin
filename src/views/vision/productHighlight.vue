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
      <div class="container-text">
        <svg-icon icon-class="camera" />
        <div>添加产品亮点图</div>
        <div>推荐尺寸900px*1250px</div>
      </div>
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
  .container-text {
    margin-top: 139px;
    svg {
      font-size: 39px;
      color: #B1BDCC;
      margin-bottom: 10px;
    }
    div {
      color: #B1BDCC;
      font-size: 14px;
      line-height: 20px;
    }
  }
</style>
<style>
  .avatar-image .el-upload--picture-card {
    width: 266px;
    height: 399px;
    border: none;
    line-height: 0px;
    background: #F7FBFE;
  }
</style>
