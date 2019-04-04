<template>
  <div class="singleImageUpload2 upload-container">
    <el-upload
      ref="uploadEl"
      action="''"
      :auto-upload="false"
      :show-file-list="false"
      list-type="picture"
      :on-change="handleImageSuccess"
      class="image-uploader"
      drag
    >

      <i class="el-icon-upload" />
      <div class="el-upload__text">
        Drag或<em>点击上传</em>
      </div>

      <div v-show="imageUrl.length>0" class="image-preview">
        <div v-show="imageUrl.length>1" class="image-preview-wrapper">
          <img :src="imageUrl">
          <div class="image-preview-action">
            <i class="el-icon-plus"/>
          </div>
        </div>
      </div>
    </el-upload>

  </div>
</template>

<script>
import { getToken } from '@/api/qiniu'
import { fileToBase64 } from '@/utils/image'

export default {
  name: 'SingleImageUpload2',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    uploadStart() {
      console.log(this.$refs.uploadEl)
    },
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(file) {
      fileToBase64(file, (base64) => {
        this.emitInput(base64)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  height: 100%;
  position: relative;
  .image-uploader {
    height: 100%;
  }
  .image-preview {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    border: 1px dashed #d9d9d9;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
