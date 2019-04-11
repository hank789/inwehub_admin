<template>
  <div class="app-container">
    <div class="searchWrapper">
      <el-input v-model="searchText" placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
    </div>

    <el-table ref="dragTable" class="min-table" v-loading="listLoading" :data="list" :border="false" row-key="id" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="" width="80">
        <template slot-scope="">
          <div class="container-case-img">
            <img src="../../assets/404_images/404.png" alt="">
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="100%" label="">
        <template slot-scope="">
          <div class="container-case-info">
            <div class="info-name">路非非 <i /> 4.3分</div>
            <div class="info-describe">阿里云CDN的价格相对而言比较低，而且服务也不错，算得上是性价比很高的cdn提供商了。还是推荐大家去使用的。算得上是性价比很高的cdn提供商了。还是推荐大家去使用的。</div>
            <div class="time">2019.02.18 18:00</div>
          </div>
          <div class="commentInput" v-if="showCommentInput">
            <el-input
              type="textarea"
              :rows="5"
              resize="none"
              placeholder="请输回复入内容"
              v-model="commentContent">
            </el-input>
            <el-button class="submit" type="primary">发布</el-button>
          </div>
          <div class="operation">
            <el-row>
              <el-checkbox :true-label="1" :false-label="0" @change="selectTrigger(scope.row, 1)">加精</el-checkbox>
              <el-button type="primary" size="small" icon="el-icon-edit" @click="" />
              <el-button type="primary" size="small" icon="el-icon-delete" @click="selectTrigger(scope.row, 2)" />
            </el-row>
          </div>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { ideaList } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
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
      showCommentInput: false
    }
  },
  components: {
    Pagination
  },
  created() {
    this.$store.dispatch('product/getProductInfo', (product) => {
      this.listQuery.product_id = product.id
      this.getList()
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      ideaList(this.listQuery).then(response => {
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
