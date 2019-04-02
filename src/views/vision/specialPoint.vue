<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加咨询</el-button>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" :border="false" row-key="id" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="" width="115">
        <template>
          <div class="container-case-img">
            <img src="../../assets/404_images/404_cloud.png" alt="">
          </div>
        </template>
      </el-table-column>

      <el-table-column width="753px" align="center" label="">
        <template>
          <div class="container-case-info">
            <div class="info-name">GeneDock</div>
            <div class="info-describe">帮助合作伙伴在医学健康和卫生领域不断进行创新</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="" width="320">
        <template>
          <el-row>
            <el-checkbox v-model="checked">显示</el-checkbox>
            <el-button type="primary" icon="el-icon-edit" />
            <el-button type="primary" icon="el-icon-delete" />
          </el-row>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" class="pagination-container" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Sortable from 'sortablejs'

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
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      sortable: null,
      oldList: [],
      newList: [],
      checked: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
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
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
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
    background: pink;
    margin: 10px 0;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
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
