<template>
  <div class="dashboard-editor-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>浏览情况</span>

      </div>

      <el-tabs class="container-tabs" v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="7天" name="seven">
          <div v-loading="!lineChartData.isInit">
            <div class="totalCount">{{ lineChartData.totalCount }}<span>浏览量(次)</span></div>
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
              <line-chart :chart-data="lineChartData" />
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="30天" name="thirty">
          <div v-loading="!lineChartThirtyData.isInit">
            <div class="totalCount">{{ lineChartThirtyData.totalCount }}<span>浏览量(次)</span></div>
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
              <line-chart :chart-data="lineChartThirtyData" v-if="lineChartThirtyData.isInit"/>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-card class="box-card" style="margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>小程序二维码</span>
      </div>
      <img :src="weappCodeUrl" class="ercode">
    </el-card>

  </div>
</template>

<script>
import LineChart from './components/Liulanqingkuang'
import { getViewData } from '@/api/product'
import { getCurTimestamp, getSevenDayBeforeTimestamp, getThirtyDayBeforeTimestamp } from '@/utils/time'

export default {
  name: 'DashboardAdmin',
  components: {
    LineChart
  },
  data() {
    return {
      activeName: 'seven',
      lineChartData: {
        xAxis: [],
        data: [],
        totalCount: 0,
        isInit: false
      },
      lineChartThirtyData: {
        xAxis: [],
        data: [],
        totalCount: 0,
        isInit: false
      },
      data: null,
      weappCodeUrl: ''
    }
  },
  created() {
    this.$store.dispatch('product/getProductInfo').then((product) => {
      this.data = product
      this.weappCodeUrl = product.weappCodeUrl
      this.getLineChartData('seven')
    })
  },
  methods: {
    getLineChartData (type) {
      let container = this.lineChartData
      let startTime = getSevenDayBeforeTimestamp() / 1000
      console.log('type', type)
      if (type == 'thirty') {
        container = this.lineChartThirtyData
        startTime = getThirtyDayBeforeTimestamp() / 1000
      }

      if (container.isInit) {
        return
      }

      getViewData({ id: this.data.id, start_time: startTime, end_time: getCurTimestamp() / 1000 }).then(res => {
        const list = res.data.list
        container.totalCount = 0
        container.isInit = true

        for (var i in list) {
          container.xAxis.push(list[i].ref_date)
          container.data.push(list[i].value)
          container.totalCount += list[i].value
        }
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleClick(tab, event) {
      this.getLineChartData(tab.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.ercode{
  width:139px;
  height:139px;
}

.totalCount{
  text-align: center;
  font-size:26px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(74,95,123,1);
  line-height:40px;

  span{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(124,142,166,1);
    vertical-align: middle;
  }
}
</style>
