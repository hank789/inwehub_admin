<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="container-tabs" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="first" />
      <el-tab-pane label="来访记录" name="second" />
    </el-tabs>

    <el-table v-if="activeName === 'first'" v-loading="listLoading" class="container-table" :data="list" :border="false" fit highlight-current-row style="width: 100%">
      <el-table-column align="" label="头像" min-width="80px">
        <template slot-scope="scope">
          <router-link class="avatarImg" :to="'/analyze/userInfo?id=' + scope.row.oauth_id" target="_blank">
            <img :src="scope.row.avatar" alt="">
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="" label="电话">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="580px" align="" label="标签">
        <template slot-scope="scope">
          <div class="tagsWrapper">
            <span v-for="(tags, index) in scope.row.tags" :key="index">{{ tags }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="" label="访问记录">
        <template slot-scope="scope">
          <router-link target="_blank" :to="'/analyze/userInfo?id=' + scope.row.oauth_id">
            <span style="color: #03AEF9">查看访问记录</span>
          </router-link>
        </template>
      </el-table-column>

    </el-table>

    <el-table v-if="activeName === 'second'" v-loading="listLoading" class="container-table" :data="list" :border="false" fit highlight-current-row style="width: 100%">
      <el-table-column align="" label="头像" min-width="80px">
        <template slot-scope="scope">
          <router-link class="avatarImg" :to="'/analyze/userInfo?id=' + scope.row.user.oauth_id" target="_blank">
            <img :src="scope.row.user.avatar" alt="">
          </router-link>
        </template>
      </el-table-column>
      <el-table-column min-width="400px" align="" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.user.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="" label="访问页面">
        <template slot-scope="scope">
          <span>{{ scope.row.page }}</span>
        </template>
      </el-table-column>
      <el-table-column width="280px" align="" label="停留时长">
        <template slot-scope="scope">
          <span>{{ scope.row.stay_time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="240px" align="" label="访问时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { visitedUserList, userVisitList } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
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
  watch: {
    'activeName'() {
      this.getList()
    }
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
        visitedUserList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      } else if (this.activeName === 'second') {
        userVisitList(this.listQuery).then(response => {
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
