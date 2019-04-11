<template>
  <div class="app-container">

    <el-dialog
      title="确定删除？"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>删除后将不可恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteComment">确 定</el-button>
      </span>
    </el-dialog>

    <div class="searchWrapper">
      <el-input v-model="searchText" placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
    </div>

    <el-table ref="dragTable" v-loading="listLoading" class="min-table" :data="list" :border="false" row-key="id" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="" width="80">
        <template slot-scope="scope">
          <div class="container-case-img">
            <img :src="scope.row.user.avatar" alt="">
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="100%" label="">
        <template slot-scope="scope">
          <div class="container-case-info">
            <div class="info-name">{{ scope.row.user.nickname }} <i /> {{ scope.row.rate_star }}分</div>
            <div class="info-describe">{{ scope.row.content }}</div>
            <div class="time">{{ scope.row.created_at }}</div>
          </div>
          <div v-if="scope.row.showCommentInput" class="commentInput">
            <el-input
              v-model="commentContent"
              type="textarea"
              :rows="5"
              resize="none"
              placeholder="请输回复入内容"
            />
            <el-button class="submit" type="primary" @click="submitComment">发布</el-button>
          </div>
          <div v-if="scope.row.official_reply" class="replyContent">
            <div class="top">
              <span>{{ scope.row.official_reply.author }}</span>
              <div class="delete" @click="delOfficialReply(scope.row.official_reply.id)"><i class="el-icon-delete" style="color: #03AEF9; margin-right: 6px" />删除</div>
            </div>
            <div class="content">{{ scope.row.official_reply.content }}</div>
            <div class="createdTime">{{ scope.row.official_reply.created_at }}</div>
          </div>
          <div class="operation">
            <el-row>
              <el-checkbox v-model="scope.row.is_recommend" :true-label="1" :false-label="0" @change="recommend(scope.row)">加精</el-checkbox>
              <el-button type="primary" size="small" icon="el-icon-edit" @click="reply(scope.row)" />
              <el-button type="primary" size="small" icon="el-icon-delete" @click="delComment(scope.row)" />
            </el-row>
          </div>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { dianpingList, officialReplyDianping, delOfficialReplyDianping, recommendDianping, delDianping } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: true,
      searchText: '',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        product_id: ''
      },
      commentContent: '',
      showCommentInput: false,
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
    deleteComment() {
      delDianping({
        id: this.item.id
      }).then(res => {
        if (res.code === 1000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.centerDialogVisible = false
          var index = this.list.indexOf(this.item)
          this.list.splice(index, 1)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    delComment(item) {
      this.item = item
      this.centerDialogVisible = true
    },
    recommend(item) {
      recommendDianping({
        id: item.id
      }).then(res => {
        if (res.code === 1000) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    delOfficialReply(id) {
      delOfficialReplyDianping({
        id: id
      }).then(res => {
        if (res.code === 1000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    reply(item) {
      this.item = item
      this.$set(item, 'showCommentInput', item.showCommentInput ? !item.showCommentInput : true)
    },
    submitComment() {
      officialReplyDianping({
        id: this.item.id,
        content: this.commentContent
      }).then(res => {
        if (res.code === 1000) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.commentContent = ''
          this.$set(this.item, 'showCommentInput', this.item.showCommentInput ? !this.item.showCommentInput : true)
          this.getList()
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    getList() {
      this.listLoading = true
      dianpingList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .searchWrapper {
    overflow: hidden;
  }
  .container-case-img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: #cccccc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 30px;
    }
  }
  .container-case-info {
    font-size: 14px;
    .info-name {
      color: #4A5F7B;
      line-height: 20px;
      font-family:PingFangSC-Medium;
      i {
        width: 1px;
        height: 12px;
        margin: 0 10px;
        position: relative;
        top: 2px;
        background: #E0E8EF;
        display: inline-block;
      }
    }
    .info-describe {
      color: #7C8EA6;
      margin-top: 12px;
    }
    .time {
      color: #B3C2D5;
      margin-top: 6px;
    }
  }
  .commentInput {
    margin-top: 14px;
    .submit {
      float: right;
      margin-top: 10px;
    }
  }
  .operation {
    position: absolute;
    top: 0;
    right: 15px;
  }
  .pagination-container {
    text-align: center;
  }
  .replyContent {
    margin-top: 14px;
    padding: 11px 20px;
    border: 1px solid #E0E8EF;
    .top {
      display: flex;
      justify-content: space-between;
      span {
        color: #4A5F7B;
        font-size: 14px;
        font-family:PingFangSC-Medium;
      }
      .delete {
        color: #7C8EA6;
        font-size: 14px;
      }
    }
    .content {
      color: #7C8EA6;
      font-size: 14px;
      line-height: 20px;
      margin-top: 12px;
    }
    .createdTime {
      color: #B3C2D5;
      font-size: 14px;
      margin-top: 6px;
    }
  }
</style>
<style>
  .searchWrapper .el-input-group {
    width: 326px;
    float: right;
  }
  .min-table .el-table_1_column_1, .min-table .el-table_1_column_3 {
    vertical-align: top !important;
  }
  .min-table .cell {
    position: relative;
    padding-top: 4px;
  }
  .operation .el-checkbox {
    margin-right: 10px;
  }
</style>
