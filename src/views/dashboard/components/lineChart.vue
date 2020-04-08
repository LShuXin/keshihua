<template style="height:100%;"  >
  <el-card class="box-card" shadow="hover" style="height:100%;">
    <span id="topBox">告警</span>
    <br />
    <span id="valbox">整体走势</span>
    <span id="smallvalbox">(单位/次)</span>
    <div ref="thisBox" style="height:70%;">
      <div id="c1"></div>
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
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import G2 from "@antv/g2";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

export default {
  name: "g2Demo",
  components: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {
    //   var time =
    // axios
    //   .post(
    //        this.GLOBAL.AJAX_URL+  "/v1/alarm/get-day-total-count?end-time=2019-11-15"
    //   )
    //   .then( (msg) =>{
    //       console.log(msg)
    //   });

    this.initComponent();
  },
  data() {
    return {
      msg: "整体走势",
      chart: null,
      data: []
    };
  },
  // 方法集合
  watch: {},
  methods: {
    initComponent() {
      // console.log(Cookies.get("vue_admin_template_token"));
      // 此函数为个人习惯,喜欢创建一个初始化的函数
      //console.log(this.data);
      // this.msg = "整体走势";
      const thisHeight = this.$refs.thisBox.offsetHeight;
      // console.log(thisHeight)
      const chart = new G2.Chart({
        container: "c1",
        forceFit: true,
        height: thisHeight,
        padding: [10, 20, 25, 30]
      });
      chart.source(this.data);
      //console.log(this.data);
      chart.scale("day", {
        min: 0
      });
      chart.scale("count", {
        range: [0, 1]
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: "<li>告警： {value} </li>",
        crosshairs: {
          type: "line"
        }
      });
      chart.line().position("day*count");
      chart
        .point()
        .position("day*count")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      this.chart = chart;
      this.chart.render();
      this.chart.on("click", ev => {
        this.$router.push("/form");
      });
      axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/alarm/get-day-total-count?end-time=" +
          moment().format("YYYY-MM-DD"),
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        chart.changeData(msg.data.data);
        //  console.log(this.data);
      });
    }
  },
  // 计算属性
  computed: {}
};
</script>