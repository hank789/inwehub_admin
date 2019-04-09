<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加专家观点</el-button>

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

    <el-dialog title="添加专家观点" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="formRules" label-position="top">
        <el-form-item label="" prop="dialogImageUrl">
          <el-upload
            class="avatar-uploader container-pointImg"
            action="''"
            :auto-upload="false"
            :show-file-list="false"
            list-type="picture"
            :on-change="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <img v-if="form.dialogImageUrl" :src="form.dialogImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="专家姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="专家职位" prop="job" :label-width="formLabelWidth">
          <el-input v-model="form.job" autocomplete="off" />
        </el-form-item>
        <el-form-item label="观点内容" prop="content" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPoint">确 定</el-button>
      </div>
    </el-dialog>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" :border="false" row-key="id" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="" width="115">
        <template slot-scope="scope">
          <div class="container-case-img">
            <img :src="scope.row.avatar" alt="">
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="753px" align="center" label="">
        <template slot-scope="scope">
          <div class="container-case-info">
            <div class="info-name">{{ scope.row.name }}</div>
            <div class="info-describe">{{ scope.row.content }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="" width="320">
        <template slot-scope="scope">
          <el-row>
            <el-checkbox v-model="scope.row.status" :true-label="1" :false-label="0" @change="selectTrigger(scope.row, 1)">{{ scope.row.status? '显示' : '隐藏' }}</el-checkbox>
            <el-button type="primary" icon="el-icon-edit" @click="editPonit(scope.row)" />
            <el-button type="primary" icon="el-icon-delete" @click="selectTrigger(scope.row, 2)" />
          </el-row>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { ideaList, updateIdeaStatus, updateIdea, storeIdea } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Sortable from 'sortablejs'
import { fileToBase64 } from '@/utils/image'

export default {
  name: 'ArticleList',
  components: { Pagination },
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
        content: '',
        job: '',
        dialogImageUrl: ''
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '请填写专家姓名' }],
        job: [{ required: true, trigger: 'blur', message: '请填写专家职位' }],
        content: [{ required: true, trigger: 'blur', message: '请填写观点内容' }],
        dialogImageUrl: [{ required: true, trigger: 'blur', message: '请上传专家头像' }]
      },
      formLabelWidth: '120px',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        product_id: ''
      },
      sortable: null,
      oldList: [],
      newList: [],
      checked: true,
      upDate: false,
      pointId: '',
      dialogVisible: false,
      centerDialogVisible: false,
      item: {}
    }
  },
  created() {
    this.$store.dispatch('product/getProductInfo', (product) => {
      this.listQuery.product_id = product.id

      this.getList()
    })
  },
  methods: {
    emptyForm() {
      this.form = {
        name: '',
        content: '',
        dialogImageUrl: '',
        job: ''
      }
    },
    editPonit(item) {
      this.dialogFormVisible = true
      this.form.content = item.content
      this.form.name = item.name
      this.form.dialogImageUrl = item.avatar
      this.upDate = true
      this.pointId = item.id
    },
    deleteNews() {
      updateIdeaStatus({
        idea_id: this.item.id,
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
        updateIdeaStatus({
          idea_id: item.id,
          status: item.status
        }).then(res => {
          item.status = res.data.status
        })
      }
      if (num === 2) {
        this.item = item
        this.centerDialogVisible = true
      }
    },

    submitPoint() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.upDate) {
            updateIdea({
              idea_id: this.pointId,
              name: this.form.name,
              content: this.form.content,
              avatar: this.form.dialogImageUrl,
              title: this.form.job
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
            storeIdea({
              id: this.listQuery.product_id,
              name: this.form.name,
              title: this.form.job,
              avatar: this.form.dialogImageUrl,
              content: this.form.content
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
      ideaList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false

        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
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
    background: pink;
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
</style>

<style>
  .container-pointImg.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .container-pointImg.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .container-pointImg .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .container-pointImg .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
