<template>
  <div class="app-container">

    <el-dialog title="添加标签" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="marginLight">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="输入标签名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <div class="userInfoWrapper">
      <div class="info">
        <div class="avatar">
          <img src="../../assets/404_images/404.png" alt="">
        </div>
        <div class="userInfo">
          <div class="name">张小白</div>
          <div class="phone"><i class="el-icon-phone"></i>18300624364</div>
        </div>
      </div>
      <div class="tagsWrapper">
        <span>高度关注<i class="el-icon-close"></i></span>
        <span>高度关注<i class="el-icon-close"></i></span>

        <span class="addTags" @click="dialogFormVisible = true">添加标签</span>
      </div>
    </div>

    <div class="title">访问记录</div>

    <el-table v-loading="listLoading" class="container-table" :data="list" :border="false" fit highlight-current-row style="width: 100%">
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
      <el-table-column min-width="140px" align="" label="访问时间">
        <template slot-scope="">
          <span style="color: #03AEF9">2019.02.18 18:00</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { visitedUserList } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  data() {
    return {
      listLoading: true,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        product_id: '',
        oauth_id: this.$route.query.id
      },
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px'
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
      visitedUserList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .userInfoWrapper {
    width: 100%;
    padding: 30px;
    background: #576F8F;
    .info {
      display: flex;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #D8D8D8;
        border: 4px solid #B1BDCC;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .userInfo {
        margin-top: 14px;
        margin-left: 30px;
        .name {
          color: #ffffff;
          font-size: 30px;
          font-weight:500;
          line-height: 42px;
          font-family: PingFangSC-Medium;
        }
        .phone {
          color: #ffffff;
          font-size: 16px;
          margin-top: 8px;
          i {
            color: #B3C2D5;
          }
        }
      }
    }
    .tagsWrapper {
      margin-top: 38px;
      .addTags {
        color: #FFFFFF;
        background: #576F8F;
        border: 1px solid #E0E8EF;
      }
      span {
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        color: #4A5F7B;
        margin: 0 3px;
        font-size: 14px;
        border-radius: 30px;
        background: #E0E8EF;
        display: inline-block;
        i {
          color: #B3C2D5;
          margin-left: 6px;
        }
      }
    }
  }
  .title {
    height: 46px;
    color: #4A5F7B;
    font-size: 18px;
    margin-top: 10px;
    line-height: 46px;
    font-family: PingFangSC-Medium;
  }
  .pagination-container {
    text-align: center;
  }
</style>
<style>
  .marginLight .el-form-item__content {
    margin-left: 0 !important;
  }
</style>
