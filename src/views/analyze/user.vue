<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="container-tabs" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="first"></el-tab-pane>
      <el-tab-pane label="来访记录" name="second"></el-tab-pane>
    </el-tabs>

    <el-table v-if="activeName === 'first'" v-loading="listLoading" class="container-table" :data="list" :border="false" fit highlight-current-row style="width: 100%">
      <el-table-column align="" label="头像" min-width="80px">
        <template slot-scope="scope">
          <a class="avatarImg" :href="scope.row.link_url" target="_blank">
            <img src="../../assets/404_images/404_cloud.png" alt="">
          </a>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="" label="昵称">
        <template slot-scope="">
          <span>张小白</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="" label="电话">
        <template slot-scope="">
          <span>18300624364</span>
        </template>
      </el-table-column>
      <el-table-column min-width="580px" align="" label="标签">
        <template slot-scope="">
          <div class="tagsWrapper">
            <span>高度关注</span><span>行业专家</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="" label="访问记录">
        <template slot-scope="">
          <span style="color: #03AEF9">查看访问记录</span>
        </template>
      </el-table-column>

    </el-table>

    <el-table v-if="activeName === 'second'" v-loading="listLoading" class="container-table" :data="list" :border="false" fit highlight-current-row style="width: 100%">
      <el-table-column align="" label="头像" min-width="80px">
        <template slot-scope="scope">
          <a class="avatarImg" :href="scope.row.link_url" target="_blank">
            <img src="../../assets/404_images/404_cloud.png" alt="">
          </a>
        </template>
      </el-table-column>
      <el-table-column min-width="400px" align="" label="昵称">
        <template slot-scope="">
          <span>张小白</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="" label="访问页面">
        <template slot-scope="">
          <span>评论</span>
        </template>
      </el-table-column>
      <el-table-column width="280px" align="" label="停留时长">
        <template slot-scope="">
          <span>00:08</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="" label="访问时间">
        <template slot-scope="">
          <span style="color: #03AEF9">2019.02.18 18:00</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { newsList, sourceList } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  data() {
    return {
      listLoading: true,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        product_id: ''
      },
      activeName: 'first'
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
      if (this.activeName === 'first') {
        newsList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      } else if (this.activeName === 'second') {
        sourceList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      }
    },
    handleClick(tab, event) {
      console.log(event.srcElement.innerText, this.activeName, 'tab:event')
    }
  }
}
</script>

<style scoped lang="scss">
  .avatarImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #cccccc;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .tagsWrapper {
    span {
      height: 24px;
      color: #4A5F7B;
      font-size: 14px;
      padding: 0 10px;
      margin: 0 3px;
      line-height: 24px;
      display: inline-block;
      border-radius: 12px;
      background: #E0E8EF;
    }
  }
  .pagination-container {
    text-align: center;
  }
</style>
<style>
  .container-tabs {
    text-align: right;
  }
  .container-tabs .el-tabs__nav {
    float: right;
  }
  .container-tabs .el-tabs__content {
    display: none;
  }
</style>
