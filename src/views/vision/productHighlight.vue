<template>
  <div class="app-container">
    <div class="top-text">请上传统一尺寸的图片，否则以首张图片尺寸为准(限10张)</div>

    <div class="imageListWrapper">
      <transition-group
        tag="ul"
        :class="[
          'el-upload-list',
          'el-upload-list--picture-card',

        ]"
        name="el-list-test"
      >
        <li v-for="(item, key) in dialogImageUrl" :key="item.url + key" class="imageItem">
          <ImageView :src="item.url" />

          <div class="itemOperation">
            <span
              @click="removeImage(key)"
            >
              <i class="el-icon-delete" />
            </span>
          </div>
        </li>
      </transition-group>

      <el-upload
        ref="foreignPersonUploadItem"
        class="avatar-image"
        action="''"
        :auto-upload="false"
        multiple
        list-type="picture-card"
        :on-change="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="dialogImageUrl"
        :on-exceed="handleExceed"
        :limit="10"
        :show-file-list="false"
        :before-remove="beforeRemove"
      >
        <div class="container-text">
          <svg-icon icon-class="camera" />
          <div>添加产品亮点图</div>
          <div>推荐尺寸900px*1250px</div>
        </div>
      </el-upload>
    </div>

    <el-dialog :visible.sync="dialogVisible" class="image-list">
      <img width="100%" :src="dialogImageUrlReview" alt="">
    </el-dialog>

    <el-row>
      <el-button type="primary" @click="submitBtn">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { getIntroducePic, updateIntroducePic, deleteIntroducePic, sortIntroducePic } from '@/api/product'
import { fileToBase64 } from '@/utils/image'
import Sortable from 'sortablejs'
import { reSortArrByTwoElement } from '@/utils/array'
export default {
  data: function() {
    return {
      dialogImageUrl: [],
      dialogImageUrlReview: '',
      dialogVisible: false,
      listQuery: {
        product_id: ''
      },
      filePic: [],
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  computed: {
    addData() {
      const rs = []
      for (var i in this.dialogImageUrl) {
        const item = this.dialogImageUrl[i]
        if (item.isNew) {
          rs.push(item.url)
        }
      }
      return rs
    }
  },
  created() {
    this.$store.dispatch('product/getProductInfo', (product) => {
      this.listQuery.product_id = product.id

      this.getPicList()
    })
  },
  mounted() {
  },
  methods: {
    removeImage(index) {
      this.$confirm('删除后将不可恢复。', '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteIntroducePic({
          introduce_pic: this.dialogImageUrl[index].url,
          id: this.listQuery.product_id
        }).then(res => {
          if (res.code === 1000) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.dialogImageUrl.splice(index, 1)
          } else {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
        })
      }).catch(() => {
      })
    },
    submit() {
      updateIntroducePic({
        id: this.listQuery.product_id,
        introduce_pic_arr: this.addData
      }).then(res => {
        if (res.code === 1000) {
          getIntroducePic({
            id: this.listQuery.product_id
          }).then(res => {
            const newArr = res.data.introduce_pic.map(item => { return { url: item } })
            this.dialogImageUrl = []
            this.dialogImageUrl = newArr
            if (this.dialogImageUrl.length >= 10) {
              document.querySelector('.avatar-image .el-upload--picture-card').style.display = 'none'
            } else {
              document.querySelector('.avatar-image .el-upload--picture-card').style.display = 'inline-block'
            }
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    submitBtn() {
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    getPicList() {
      getIntroducePic({
        id: this.listQuery.product_id
      }).then(res => {
        const newArr = res.data.introduce_pic.map(item => { return { url: item } })
        this.dialogImageUrl = newArr
        if (this.dialogImageUrl.length >= 10) {
          document.querySelector('.avatar-image .el-upload--picture-card').style.display = 'none'
        } else {
          document.querySelector('.avatar-image .el-upload--picture-card').style.display = 'inline-block'
        }
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {

    },
    handleRemove(file, fileList) {
      console.log(fileList, '删除成功')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrlReview = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(file, fileList) {
      if (fileList.length >= 10) {
        document.querySelector('.avatar-image .el-upload--picture-card').style.display = 'none'
      }
      fileToBase64(file, (base64) => {
        this.dialogImageUrl.push({ url: base64, isNew: true })
        this.submit()
      })
    },
    setSort() {
      const el = this.$el.querySelector('.imageListWrapper > ul')
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          this.dialogImageUrl = reSortArrByTwoElement(this.dialogImageUrl, evt.oldIndex, evt.newIndex)

          const newArr = this.dialogImageUrl.map(item => { return item.url })
          sortIntroducePic({
            id: this.listQuery.product_id,
            introduce_pic_arr: newArr
          }).then(res => {
            console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .avatar-image {
    display: inline-block;
    vertical-align: top;
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

  .imageListWrapper{
    margin: 6px 0 20px;
    display: inline-block;
    .imageItem{
      display: inline-block;
      width: 266px;
      height: 399px;
      border-radius: 6px;
      background: #fff;
      overflow: hidden;
      margin: 0 8px 8px 0;
      position: relative;
      cursor:pointer;

      .itemOperation{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        height:100%;
        background: #000;
        cursor: pointer;
        z-index:9;
        color:#fff;
        display: none;
        align-items: center;
        justify-content: center;
      }

      &:hover{
        .itemOperation{
          display: flex;
          opacity: 0.7;
        }
      }

        img{
          width:100%;
          height:100%;
          object-fit: cover;
        }
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
    border: none;
  }
  .avatar-image .el-upload-list li img {
    object-fit: cover;
  }
</style>
