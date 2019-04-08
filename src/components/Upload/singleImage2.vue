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

      <div class="image-prepare">
        <svg-icon icon-class="camera" />
        <div class="image-desc" v-html="placeholder"></div>
      </div>

      <div v-show="imageUrl.length>0" class="image-preview">
        <div v-show="imageUrl.length>1" class="image-preview-wrapper">
          <img :src="imageUrl">
          <div class="image-preview-action">
            <svg-icon icon-class="camera" />
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
    },
    placeholder: {
      type: String,
      default: '添加产品Logo<br/>尺寸200px*200px<br/>2M以内'
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
  .image-prepare{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    background:rgba(247,251,254,1);


    .svg-icon{
      font-size:39px;
      color:#B1BDCC;
    }

    .image-desc{
      color:#B1BDCC;
      font-size:14px;
      margin-top:5px;
      line-height:20px;
    }
  }
  .image-preview {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;

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
      border-radius:8px;
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
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
      .svg-icon{
        font-size:26px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
        background:rgba(42,52,68,1);
        opacity:0.7;
      }
    }
  }
}
</style>
