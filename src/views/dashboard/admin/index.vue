<template>
  <div class="dashboard-editor-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>浏览情况</span>
      </div>
      <div class="totalCount">{{totalCount}}<span>浏览量(次)</span></div>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>
    </el-card>



    <el-card class="box-card" style="margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>小程序二维码</span>
      </div>
      <img :src="weappCodeUrl" class="ercode"/>
    </el-card>

  </div>
</template>

<script>
import LineChart from './components/Liulanqingkuang'
import { getInfo, getViewData } from '@/api/product'
import { getCurTimestamp, getSevenDayBeforeTimestamp, getThirtyDayBeforeTimestamp } from '@/utils/time'

export default {
  name: 'DashboardAdmin',
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: {
        xAxis: [],
        data: []
      },
      activeName: '',
      data: null,
      weappCodeUrl: '',
      totalCount: 0
    }
  },
  created() {

    getInfo().then(response => {
      this.data = response.data
      this.weappCodeUrl = response.data.weappCodeUrl

      getViewData({id: this.data.id, start_time: getSevenDayBeforeTimestamp() / 1000, end_time: getCurTimestamp() / 1000}).then(res => {
        const list = res.data.list

        this.totalCount = 0

        for (var i in list) {
          this.lineChartData.xAxis.push(list[i].ref_date)
          this.lineChartData.data.push(list[i].value)
          this.totalCount += list[i].value
        }
      })
    })


  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleClick() {

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
