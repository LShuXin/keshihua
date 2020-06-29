<template>
  <el-card class="box-card" shadow="hover" style="height:100%;">
    <div id="topBox">告警分类</div>
    <div ref="thisHeight" style="height:80%;">
      <div id="c3" />
    </div>
  </el-card>
</template>
<script>
import G2 from '@antv/g2'
import axios from 'axios'
import Cookies from 'js-cookie'
// import Axios from "axios";
import moment from 'moment'
export default {
  name: 'Listcard',
  data() {
    return {
      data: [
      ]
    }
  },
  mounted() {
    this.initComponent()
  },
  methods: {
    initComponent() {
      const thisHeight = this.$refs.thisHeight.offsetHeight
      const chart = new G2.Chart({
        container: 'c3',
        forceFit: true,
        height: thisHeight,
        padding: [0, 30, 0, 70]
      })
      chart.source(this.data, {
        value: {
          min: 0,
          nice: false,
          alias: ''
        }
      })
      chart.axis('type', {
        label: {
          textStyle: {
            fill: '#666',
            fontSize: 12
          }
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        },
        line: {
          lineWidth: 0
        }
      })
      chart.axis('value', {
        label: null,
        title: {
          offset: 30,
          textStyle: {
            fontSize: 12,
            fontWeight: 300
          }
        }
      })
      chart.legend(false)
      chart.coord().transpose()
      chart
        .interval()
        .position('cause*count')
        .color('cause', [
          '#4ab7bd',
          '#3a71a8',
          '#fec171',
          '#79abff',
          '#30b08f',
          '#8679ff',
          '#71feef',
          '#e65d6e'
        ])
        .size(10)
        .opacity(1)
        .label('count', {
          textStyle: {
            fill: '#000'
          },
          offset: 10
        })
      chart.on('click', ev => {
        this.$router.push('/form')
      })
      //获取数据，end-time时间要按当天时间加一天才能拿到当天的值
      axios({
        method: 'post',
        url:
          this.GLOBAL.AJAX_URL +
          '/v1/alarm/get-alarm-cause-statistics?start-time=' +
          moment()
            .subtract('days', 6)
            .format('YYYY-MM-DD') +
          '&end-time=' +
          moment().add(1,"days").format('YYYY-MM-DD') + '&user-id=' + localStorage.getItem('userId'),
        headers: {
          Authorization: 'Bearer ' + Cookies.get('vue_admin_template_token')
        }
      }).then(msg => {
        // console.log(msg);
        chart.changeData(msg.data.data)
      })
      chart.render(this.data)
    }
  }
}
</script>
<style scoped>
.box-card >>> .el-card__body {
  height: 100%;
  cursor: default;
}
#c3 {
  margin-top: 20px;
}

.box-card {
  border-radius: 10px;
}
#c3 >>> canvas {
  cursor: pointer !important;
}
#topBox {
  font-size: 18px;
}
</style>
