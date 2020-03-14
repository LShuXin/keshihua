<template>
  <el-card class="box-card" shadow="hover" style="height:100%;">
    <div id="topBox">告警分类</div>
    <div ref="thisHeight" style="height:80%;">
      <div id="c3"></div>
    </div>
  </el-card>
</template>
<script>
import G2 from "@antv/g2";
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "listcard",
  mounted() {
    this.initComponent();
  },
  data() {
    return {
      data: [
        {
          type: "烟火",
          value: 103
        },
        {
          type: "大型车辆",
          value: 142
        },
        {
          type: "雷电侦测",
          value: 251
        },
        {
          type: "飞鸟入侵",
          value: 367
        },
        {
          type: "杆塔倾斜",
          value: 491
        },
        {
          type: "异物入侵",
          value: 672
        },
        {
          type: "异常放电",
          value: 868
        },
        {
          type: "树木生长",
          value: 232
        }
      ]
    };
  },
  methods: {
    initComponent() {
      const thisHeight = this.$refs.thisHeight.offsetHeight;
      //  console.log(thisHeight)
      const chart = new G2.Chart({
        container: "c3",
        forceFit: true,
        height: thisHeight,
        padding: [0, 30, 0, 70]
      });
      chart.source(this.data, {
        value: {
          min: 0,
          nice: false,
          alias: " "
        }
      });
      chart.axis("type", {
        label: {
          textStyle: {
            fill: "#666",
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
      });
      chart.axis("value", {
        label: null,
        title: {
          offset: 30,
          textStyle: {
            fontSize: 12,
            fontWeight: 300
          }
        }
      });
      chart.legend(false);
      chart.coord().transpose();
      chart
        .interval()
        .position("type*value")
        .color("type", [
          "#4ab7bd",
          "#3a71a8",
          "#fec171",
          "#79abff",
          "#30b08f",
          "#8679ff",
          "#71feef",
          "#e65d6e"
        ])
        .size(10)
        .opacity(1)
        .label("value", {
          textStyle: {
            fill: "#000"
          },
          offset: 10
        });
     chart.on("click", ev => {
        this.$router.push("/form");
      });
      chart.render();
    }
  }
};
</script>
<style scoped>
.box-card >>> .el-card__body {
  height: 100%;
  cursor:default
}
#c3 {
  margin-top: 20px;
}

.box-card {
  border-radius: 10px;
}
#c3 >>> canvas{
  cursor: pointer !important;
}
#topBox {
  font-size: 18px;
}
</style>