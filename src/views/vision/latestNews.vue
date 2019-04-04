<template>
  <div class="app-container">
    <el-button type="primary" class="add-latest-news" @click="dialogFormVisible = true">添加咨询</el-button>

    <el-dialog title="添加资讯" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="top" class="form-wrapper">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="输入文章链接" />
          <div class="search" @click="search">搜索</div>
          <div class="urlInfoWrapper">
            <div class="urlName">{{ searchInfo.title }}</div>
            <div class="bottomInfo">
              <span>{{ searchInfo.date }}</span>
              <i />
              <span>{{ searchInfo.author }}</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPoint">确 定</el-button>
      </div>
    </el-dialog>

    <el-tabs v-model="activeName" class="container-tabs" @tab-click="handleClick">
      <el-tab-pane label="资讯管理" name="first">资讯管理</el-tab-pane>
      <el-tab-pane label="内容管理" name="second">内容管理</el-tab-pane>
    </el-tabs>

    <el-table v-loading="listLoading" class="container-table" :data="list" :border="false" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="标题" width="440px">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="来源">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column width="280px" align="center" label="收录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="" width="270">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.status" :true-label="1" :false-label="0" @change="selectTrigger(scope.row, 1)">{{ scope.row.status? '显示' : '隐藏' }}</el-checkbox>
          <el-button type="primary" icon="el-icon-delete" @click="selectTrigger(scope.row, 2)" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { newsList, updateNewsStatus, fetchUrlInfo, storeNews } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

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
        name: ''
      },
      formLabelWidth: '120px',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        product_id: ''
      },
      checked: true,
      activeName: 'first',
      searchInfo: {}
    }
  },
  created() {
    this.$store.dispatch('product/getProductInfo', (product) => {
      this.listQuery.product_id = product.id

      this.getList()
    })
  },
  methods: {
    search() {
      fetchUrlInfo({
        url: this.form.name
      }).then(res => {
        this.searchInfo = res.data
        console.log(res, '搜索数据')
      })
    },
    submitPoint() {
      storeNews({
        url: this.form.name,
        product_id: this.listQuery.product_id
      }).then(res => {
        if (res.code === 1000) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    selectTrigger(item, num) {
      console.log(item, '数据')
      if (num === 1) {
        updateNewsStatus({
          product_id: this.listQuery.product_id,
          news_id: item.id,
          status: item.status
        }).then(res => {
          item.status = res.data.status
        })
      }
      if (num === 2) {
        updateNewsStatus({
          product_id: this.listQuery.product_id,
          news_id: item.id,
          status: 3
        }).then(res => {
          var index = this.list.indexOf(item)
          this.list.splice(index, 1)
          if (res.code === 1000) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          }
        })
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getList() {
      this.listLoading = true
      newsList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
  .pagination-container {
   text-align: center;
  }
  .form-wrapper {
    position: relative;
  }
  .form-wrapper {
    .search {
      color: #03AEF9;
      font-size: 16px;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 0;
      font-family:PingFangSC-Medium;
    }
    .urlInfoWrapper {
      font-size: 14px;
      margin-top: 20px;
      .urlName {
        color: #4A5F7B;
        line-height: 20px;
        margin-bottom: 6px;
        font-family:PingFangSC-Medium;
      }
      .bottomInfo {
        color: #7C8EA6;
        line-height: 20px;
        font-family:PingFangSC-Regular;
        i {
          width: 1px;
          height: 12px;
          vertical-align: middle;
          background: #E0E8EF;
          display: inline-block;
        }
      }
    }
  }
</style>

<style>
  .add-latest-news {
    position: relative;
    z-index: 9;
  }
  .container-tabs {
    text-align: right;
    margin-top: -28px;
  }
  .container-tabs .el-tabs__nav {
    float: right;
  }
  .container-tabs .el-tabs__content {
    display: none;
  }
  .container-table tbody tr td, .container-table thead tr th {
    text-align: left !important;
  }
  .form-wrapper .el-form-item__content {
    margin-left: 0 !important;
  }
  .form-wrapper .el-form-item__content .el-input__inner {
    padding-right: 56px;
  }
</style>
