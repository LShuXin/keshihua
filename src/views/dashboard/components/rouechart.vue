<template>
  <el-card class="box-card" shadow="hover" style="height:100%; border-radius:10px;  ">
    <div id="topBox">事故占比</div>
    <div ref="thisHeight" style="height:100%; width:100%; float:left;">
      <div id="c2"></div>
    </div>
  </el-card>
</template>
<style lang="scss" scoped>
.el-card >>> .el-card__body {
  height: 100%;
}
#c2 {
  margin-top: 10px;
  width: 100%;
  float: left;
  & >>> canvas {
    cursor: pointer !important;
  }
}
#topBox {
  font-size: 18px;
  cursor: default;
}
#list {
  float: right;
  width: 40%;
  list-style: none;
  // margin-top: 150px;
  // margin-left: 20px;
  text-align: left;
  // position: relative;
  // left: -50px;
  li {
    margin-top: 10px;
  }
  #One {
    color: #4ab7bd;
  }
  #Two {
    color: #3a71a8;
  }
  #Three {
    color: #fec171;
  }
  #Four {
    color: #79abff;
  }
  #Five {
    color: #30b08f;
  }
}
</style>
<script>
import G2 from "@antv/g2";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";

export default {
  name: "rouechart",
  mounted() {
    this.initComponent();
  },
  data() {
    return {
      msg: "",
      chart: null,
      data: []
    };
  },
  methods: {
    initComponent() {
      const thisHeight = this.$refs.thisHeight.offsetHeight;
      // console.log(thisHeight);
      const chart = new G2.Chart({
        container: "c2",
        forceFit: true,
        height: thisHeight,
        padding: [20, 90, 20, 0]
      });
      // chart.source(this.data);
      //  chart.coord("theta", {
      //   innerRadius: 0.6
      // });
      // chart.legend(false);
      // chart.tooltip(false);
      // var interval = chart
      //   .intervalStack()
      //   .position("percent")
      //   .color("cause", ["#4ab7bd", "#3a71a8", "#fec171", "#79abff", "#30b08f"])
      //   .shape("sliceShape");
      // chart.on("click", ev => {
      //   this.$router.push("/form");
      // });
      // chart.render();
      chart.legend({
        position: "right"
      });
      chart.source(this.data, {
        percent: {
          formatter: function formatter(percent) {
            percent = percent +"%";
            return percent;
          }
        }
      });
      chart.coord("theta", {
        radius: 0.75,
        innerRadius: 0.6
      });
      // console.log(cause)
      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span> {name}:{value} </li>'
      });
      //  辅助文本
      // chart.guide().html({
      //   position: ["50%", "50%"],
      //   html:
      //     '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      //   alignX: "middle",
      //   alignY: "middle"
      // });
      var interval = chart
        .intervalStack()
        .position("percent")
        .color("cause")
        .label("cause", {
          formatter: function formatter(percent, cause) {
            return percent + ": " + (cause.point.percent *100).toFixed(2) + "%";
          }
        })
        .tooltip("cause*percent", function(cause, percent) {
          percent = (percent*100).toFixed(2) + "%";
          // console.log(cause);
          return {
            name: cause,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      chart.render();
      chart.on("click", ev => {
        this.$router.push("/form");
      });
      axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/alarm/get-accident-statistics?start-time=" +
          moment()
            .subtract(29, "days")
            .format("YYYY-MM-DD") +
          "&end-time=" +
          moment().format("YYYY-MM-DD")+"&user-id="+localStorage.getItem("userId"),
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg.data.data)
        for(var i=0;i<msg.data.data.length;i++){
          msg.data.data[i].percent = msg.data.data[i].percent/100
        }
        chart.changeData(msg.data.data);
        interval.setSelected(msg.data.data[0]);
      });
    }
  }
};
</script>