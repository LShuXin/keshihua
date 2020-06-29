<template>
  <el-card shadow="hover" style="height:100%;border-radius:10px;">
    <div id="topBox">设备信息</div>
    <div id="c4" />
  </el-card>
</template>
<style scoped>
#topBox {
  font-size: 18px;
}
</style>

<script>
//没有数据
import G2 from '@antv/g2'
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
  name: 'Sbxx',
  data() {
    return {
      data: [
        {
          type: '图片数量',
          value: 34
        },
        {
          type: '告警总数',
          value: 85
        },
        {
          type: '设备总数',
          value: 103
        },
        {
          type: '设备离线',
          value: 142
        }
      ]
    }
  },
  mounted() {
    this.initComponent()
  },
  methods: {
    initComponent() {
      const chart = new G2.Chart({
        container: 'c4',
        width: 290,
        height: 100,
        padding: [5, 0, 0, 65]
      })
      chart.source(this.data, {
        value: {
          max: 1300,
          min: 0,
          nice: false,
          alias: ' '
        }
      })
      chart.axis('type', {
        label: {
          textStyle: {
            fill: '#333',
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
          offset: 60,
          textStyle: {
            fontSize: 1,
            fontWeight: 100
          }
        }
      })
      chart.legend(false)
      chart.coord().transpose()
      chart
        .interval()
        .position('type*value')
        .size(16)
        .opacity(1)
        .label('value', {
          textStyle: {
            fill: '#8d8d8d',
            textAlign: 'middle'
            // textBaseline: "bottom"
          },
          offset: 10
        })
      chart.render()
    }
  }
}
</script>
<style scoped>
#c4 {
  margin-top: 10px;
}
</style>
