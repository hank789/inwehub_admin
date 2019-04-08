<template>
  <div class="app-container">
    <div class="top-text">请上传统一尺寸的图片，否则以首张图片尺寸为准(限10张)</div>
    <el-upload
      class="avatar-image"
      action="''"
      :auto-upload="false"
      multiple
      list-type="picture-card"
      :on-change="handleAvatarSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="filePic"
      :on-exceed="handleExceed"
      :limit="10"
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
      <el-button type="primary" @click="submit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { getIntroducePic, updateIntroducePic, deleteIntroducePic } from '@/api/product'
import { fileToBase64 } from '@/utils/image'
export default {
  data: function() {
    return {
      dialogImageUrl: [],
      dialogVisible: false,
      listQuery: {
        product_id: ''
      },
      filePic: []
    }
  },
  created() {
    this.$store.dispatch('product/getProductInfo', (product) => {
      this.listQuery.product_id = product.id

      this.getPicList()
    })
  },
  methods: {
    submit() {
      // const newArr = this.dialogImageUrl.map(item => { return item })
      // console.log('图片', newArr)
      updateIntroducePic({
        id: this.listQuery.product_id,
        introduce_pic_arr: this.dialogImageUrl
      }).then(res => {
        if (res.code === 1000) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      })
    },
    getPicList() {
      getIntroducePic({
        id: this.listQuery.product_id
      }).then(res => {
        const newArr = res.data.introduce_pic.map(item => { return { url: item } })
        this.filePic = newArr
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    handleRemove(file, fileList) {
      console.log(file, fileList, '删除')
      deleteIntroducePic({
        introduce_pic: file.url,
        id: this.listQuery.product_id
      }).then(res => {
        if (res.code === 1000) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'success'
          })
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(file, fileList) {
      fileToBase64(file, (base64) => {
        this.dialogImageUrl.push(base64)
      })
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
  .avatar-image .el-upload-list li {
    width: 266px;
    height: 399px;
  }
  .avatar-image .el-upload-list li img {
    object-fit: cover;
  }
</style>
