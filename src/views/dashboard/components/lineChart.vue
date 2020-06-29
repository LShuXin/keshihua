<template style="height:100%;">
  <el-card class="box-card" shadow="hover" style="height:100%;">
    <span id="topBox">告警</span>
    <br>
    <span id="valbox">整体走势</span>
    <span id="smallvalbox">(单位/次)</span>
    <div ref="thisBox" style="height:70%;">
      <div id="c1" />
    </div>
  </el-card>
</template>
<style scoped lang="scss">
#c1 >>> canvas {
  cursor: pointer !important;
}
#topBox {
  font-size: 18px;
  color: #333333;
  line-height: 0;
}
#valbox {
  display: inline-block;
  margin-top: 5px;
  font-size: 16px;
  line-height: 0;
  color: #999999;
}
#smallvalbox {
  display: inline-block;
  margin-top: 30px;
  font-size: 12px;
  color: #999999;
}
.box-card {
  /* : 5px; */
  /* width: 862px; */
  /* width: 663px;
  height: 432px; */
  border-radius: 10px;
  cursor: default;
}
.box-card >>> .el-card__body {
  height: 100%;
}
#c1 {
  margin-top: 10px;
}
</style>

<script>
//图表用的G2组件
import G2 from '@antv/g2'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'

export default {
  name: 'G2Demo',
  components: {},
  data() {
    return {
      msg: '整体走势',
      chart: null,
      data: []
    }
  },
  mounted() {
    this.initComponent()
  },
  methods: {
    initComponent() {
      const thisHeight = this.$refs.thisBox.offsetHeight
      const chart = new G2.Chart({
        container: 'c1',
        forceFit: true,
        height: thisHeight,
        padding: [10, 20, 25, 30]
      })
      chart.source(this.data)
      chart.scale('day', {
        min: 0
      })
      chart.scale('count', {
        range: [0, 1]
      })
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li>告警： {value} </li>',
        crosshairs: {
          type: 'line'
        }
      })
      chart.line().position('day*count')
      chart
        .point()
        .position('day*count')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      this.chart = chart
      this.chart.render()
      this.chart.on('click', ev => {
        this.$router.push('/form')
      })
      //获取数据信息
      axios({
        method: 'post',
        url:
          this.GLOBAL.AJAX_URL +
          '/v1/alarm/get-day-total-count?user-id=' + localStorage.getItem('userId') + '&end-time=' +
          moment().format('YYYY-MM-DD'),
        headers: {
          Authorization: 'Bearer ' + Cookies.get('vue_admin_template_token')
        }
      }).then(msg => {
        // console.log(msg);
        chart.changeData(msg.data.data)
      })
    }
  }
}
</script>
