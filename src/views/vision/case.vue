<!--suppress ALL -->
<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加案例</el-button>

    <el-dialog
      title="确定删除？"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>删除后将不可恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteNews">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加案例" :visible.sync="dialogFormVisible">

      <el-form ref="form" :model="form" :rules="formRules" label-position="top">

        <Upload v-model="form.dialogImageUrl" style="width:300px;height:200px;" :placeholder="'添加案例封面<br/>尺寸200px*200px<br/>2M以内'" />

        <el-form-item label="案例名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="输入案例名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="案例概述" prop="desc" :label-width="formLabelWidth">
          <el-input v-model="form.desc" type="textarea" :rows="8" placeholder="输入案例概述" />
        </el-form-item>
        <el-radio v-model="radio" label="link">链接</el-radio>
        <el-radio v-model="radio" label="pdf">PDF文档</el-radio>
        <el-radio v-model="radio" label="image">图片</el-radio>

        <el-form-item class="marginTop" prop="linkName" label="" :label-width="formLabelWidth">
          <el-input v-if="radio === 'link'" v-model="form.linkUrl" placeholder="输入案例链接,当前仅支持公众号文章链接" />
        </el-form-item>

        <el-form-item v-if="radio === 'pdf'" label="">
          <el-upload
            class="upload-demo"
            action="''"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item v-if="radio === 'image'">
          <Upload v-model="caseImg" style="width:200px;height:200px;" :placeholder="'添加案例封面<br/>尺寸200px*200px<br/>2M以内'" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitCase">确 定</el-button>
      </div>
    </el-dialog>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" :border="false" row-key="id" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="" width="115">
        <template slot-scope="scope">
          <div class="container-case-img ">
            <ImageView :src="scope.row.cover_pic" />
            <!--<img :src="scope.row.cover_pic" alt="">-->
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="753px" align="center" label="">
        <template slot-scope="scope">
          <div class="container-case-info">
            <a :href="scope.row.link_url" target="_blank">
              <div class="info-name">{{ scope.row.title }}</div>
              <div class="info-describe">{{ scope.row.desc }}</div>
            </a>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="" width="320">
        <template slot-scope="scope">
          <el-row>
            <el-checkbox v-model="scope.row.status" :true-label="1" :false-label="0" @change="selectTrigger(scope.row, 1)">{{ scope.row.status? '显示' : '隐藏' }}</el-checkbox>
            <el-button type="primary" icon="el-icon-edit" @click="editCase(scope.row)" />
            <el-button type="primary" icon="el-icon-delete" @click="selectTrigger(scope.row, 2)" />
          </el-row>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.perPage" @pagination="getList" />
  </div>
</template>

<script>
import { caseList, storeCase, updateCaseStatus, updateCase, sortCase } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Sortable from 'sortablejs'
import { fileToBase64 } from '@/utils/image'
import Upload from '@/components/Upload/singleImage2'

export default {
  name: 'ArticleList',
  components: {
    Pagination,
    Upload
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        desc: '',
        linkUrl: '',
        dialogImageUrl: '',
        imageUrl: ''
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入案例名称' }],
        desc: [{ required: true, trigger: 'blur', message: '请输入案例介绍' }],
        dialogImageUrl: [{ required: true, trigger: 'blur', message: '请上传封面图' }]
      },
      formLabelWidth: '120px',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        product_id: '',
        perPage: 20
      },
      sortable: null,
      oldList: [],
      newList: [],
      checked: true,
      radio: 'link',
      fileList: [],
      showFileList: false,
      dialogVisible: false,
      imageName: '',
      upDate: false,
      caseId: '',
      centerDialogVisible: false,
      item: {},
      caseImg: ''
    }
  },
  watch: {
    'radio'() {
      // this.fileList = []
      this.form.linkUrl = ''
    }
  },
  created() {
    this.$store.dispatch('product/getProductInfo', (product) => {
      this.listQuery.product_id = product.id

      this.getList()
    })
  },
  mounted() {
  },
  methods: {
    emptyForm() {
      this.form = {
        name: '',
        desc: '',
        linkUrl: '',
        imageUrl: '',
        radio: 'link',
        dialogImageUrl: ''
      }
    },
    cancel() {
      this.dialogFormVisible = false
      this.upDate = false
      this.emptyForm()
    },
    editCase(item) {
      this.dialogFormVisible = true
      this.form.desc = item.desc
      this.form.name = item.title
      this.form.dialogImageUrl = item.cover_pic
      this.form.linkUrl = item.link_url
      this.form.imageUrl = item.link_url
      this.radio = item.type
      this.upDate = true
      this.caseId = item.id
      this.caseImg = item.link_url
      if (this.radio === 'pdf') {
        this.fileList = [
          {
            name: item.link_url,
            url: item.link_url
          }
        ]
      } else {
        this.fileList = []
      }
    },
    deleteNews() {
      updateCaseStatus({
        case_id: this.item.id,
        status: 3
      }).then(res => {
        var index = this.list.indexOf(this.item)
        this.list.splice(index, 1)
        if (res.code === 1000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.centerDialogVisible = false
        }
      })
    },
    selectTrigger(item, num) {
      if (num === 1) {
        updateCaseStatus({
          case_id: item.id,
          status: item.status
        }).then(res => {
          item.status = res.data.status
        })
      }
      if (num === 2) {
        this.centerDialogVisible = true
        this.item = item
      }
    },
    handleChange(file) {
      fileToBase64(file, (base64) => {
        this.form.imageUrl = base64
        this.imageName = file.name
      })
      console.log(file, '文件')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      console.log(fileList, '当前限制选择')
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    // shangtu
    beforeAvatarUpload(file) {
      console.log(file.type + '格式')
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitCase() {
      var file = ''
      if (this.radio === 'image') {
        file = this.caseImg
      } else if (this.radio === 'pdf') {
        file = {
          'name': this.imageName,
          'base64': this.form.imageUrl
        }
      }
      this.$refs.form.validate(valid => {
        if (this.radio === 'link' && !this.form.linkUrl) {
          this.$message({
            message: '请填写链接地址',
            type: 'error'
          })
          return false
        }
        if (this.radio === 'image' && !this.caseImg) {
          this.$message({
            message: '请上传案例图片',
            type: 'error'
          })
          return false
        }
        if (this.radio === 'pdf' && !this.form.imageUrl) {
          this.$message({
            message: '请上传pdf文件',
            type: 'error'
          })
          return false
        }

        if (valid) {
          if (this.upDate) {
            updateCase({
              case_id: this.caseId,
              title: this.form.name,
              desc: this.form.desc,
              cover_pic: this.form.dialogImageUrl,
              type: this.radio,
              file: file,
              link_url: this.form.linkUrl
            }).then(res => {
              if (res.code === 1000) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.dialogFormVisible = false
                this.getList()
                this.upDate = false
                this.emptyForm()
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
            })
          } else {
            storeCase({
              id: this.listQuery.product_id,
              title: this.form.name,
              desc: this.form.desc,
              cover_pic: this.form.dialogImageUrl,
              type: this.radio,
              file: file,
              link_url: this.form.linkUrl
            }).then(res => {
              if (res.code === 1000) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.dialogFormVisible = false
                this.getList()
                this.emptyForm()
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
            })
          }
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'error'
          })
          return false
        }
      })
    },
    getList() {
      this.listLoading = true
      caseList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.newIndex, 1)[0]
          console.log(targetRow, '交换排序targetRow')
          this.list.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.list.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          console.log(tempIndex, '被交换排序tempIndex')
          sortCase({
            case_id: targetRow.id,
            to_case_id: tempIndex.id
          }).then(res => {
            if (res.code !== 1000) {
              this.$message({
                message: res.message,
                type: 'error'
              })
              return false
            }
            this.getList()
          })
        }
      })
    },
    handlePictureCardPreview(file) {
      fileToBase64(file, (base64) => {
        this.form.dialogImageUrl = base64
        this.dialogVisible = true
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .container-case-img {
    width: 90px;
    height: 60px;
    border-radius: 4px;
    margin: 10px 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .container-case-info {
    text-align: left;
    font-size: 14px;
    .info-name {
      color: #4A5F7B;
      font-family:PingFangSC-Medium;
    }
    .info-describe {
      color: #7C8EA6;
      margin-top: 12px;
    }
  }
  .pagination-container {
    text-align: center;
  }
  .marginTop {
    margin-top: 10px;
  }
</style>

<style>
  .container-caseImg.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .container-caseImg.avatar-uploader .el-upload:hover {
  }
  .container-caseImg .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 200px;
    background: #F7FBFE;
    line-height: 178px;
    text-align: center;
  }
  .container-caseImg .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .container-case-img .el-image {
    height: 100%;
  }
  .container-case-img .el-image img {
    border-radius: 4px;
  }
</style>
