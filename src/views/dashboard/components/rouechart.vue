<template>
  <el-card class="box-card" shadow="hover" style="height:100%; border-radius:10px;  ">
    <div id="topBox">事故占比</div>
    <div ref="thisHeight" style="height:100%; width:50%; float:left;">
      <div id="c2"></div>
    </div>
    <ul id="list">
      <li>
        <span class="icon iconfont" id="One">&#xe7e5;</span>
        <span>烟火</span>
      </li>
      <li>
        <span class="icon iconfont" id="Two">&#xe7e5;</span>
        <span>大型车辆</span>
      </li>
      <li>
        <span class="icon iconfont" id="Three">&#xe7e5;</span>
        <span>异物</span>
      </li>
      <li>
        <span class="icon iconfont" id="Four">&#xe7e5;</span>
        <span>飞鸟入侵</span>
      </li>
      <li>
        <span class="icon iconfont" id="Five">&#xe7e5;</span>
        <span>杆塔倾斜</span>
      </li>
    </ul>
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
  & >>> canvas{
    cursor: pointer !important;
  }
}
#topBox {
  font-size: 18px;
  cursor:default;
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
      data: [
        {
          cause: "烟火",
          percent: 0.21
        },
        {
          cause: "大型车辆",
          percent: 0.4
        },
        {
          cause: "异物",
          percent: 0.17
        },
        {
          cause: "飞鸟入侵",
          percent: 0.13
        },
        {
          cause: "杆塔倾斜",
          percent: 0.09
        }
      ]
    };
  },
  methods: {
    initComponent() {
      const thisHeight = this.$refs.thisHeight.offsetHeight;
      console.log(thisHeight);
      const chart = new G2.Chart({
        container: "c2",
        forceFit: true,
        height: thisHeight,
        padding: [30, 30, 40, 30]
      });
      chart.source(this.data);
      chart.coord("theta", {
        innerRadius: 0.6
      });
      chart.legend(false);
      chart.tooltip(false);
      var interval = chart
        .intervalStack()
        .position("percent")
        .color("cause", ["#4ab7bd", "#3a71a8", "#fec171", "#79abff", "#30b08f"])
        .shape("sliceShape");
      chart.on("click", ev => {
        this.$router.push("/form");
      });
      chart.render();
    }
  }
};
</script>