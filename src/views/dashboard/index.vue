<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->

    <!-- <div id="linechart">
      <lineChart></lineChart>
    </div>
    <div id="cardBox">
      <cardBox></cardBox>
    </div>
    <div id="listchart">
      <listchart></listchart>
    </div>
    <div id="buttonBox">
      <card2Box></card2Box>
    </div>-->
    <el-row :gutter="10">
      <el-col :span="8">
        <div id="linechart">
          <lineChart></lineChart>
        </div>
      </el-col>
      <el-col :span="3">
        <div id="cardBox">
          <cardBox></cardBox>
        </div>
      </el-col>
      <el-col :span="7">
        <div id="listchart">
          <listchart></listchart>
        </div>
      </el-col>

      <el-col :span="6">
        <div id="buttonBox">
          <card2Box></card2Box>
        </div>
      </el-col>
    </el-row>
    <!-- <div id="mapBox">
      <mapBox></mapBox>
    </div>
    <div id="ssgj">
      <ssgj></ssgj>
    </div>
    <div id="rouechart">
      <rouechart />
    </div>

    <div id="sbgl">
      <sbgl></sbgl>
    </div>
    <div id="sbxx">
      <sbxx></sbxx>
    </div>-->
    <el-row :gutter="10">
      <el-col :span="18">
        <div id="mapBox">
          <mapBox></mapBox>
        </div>
      </el-col>
      <el-col :span="6">
        <div id="ssgj">
          <ssgj></ssgj>
        </div>
      </el-col>
      <el-col :span="6">
        <div id="rouechart">
          <rouechart />
        </div>
      </el-col>
      <el-col :span="6">
        <el-row :gutter="10">
          <el-col :span="12">
            <div id="sbgl">
              <sbgl></sbgl>
            </div>
          </el-col>
          <el-col :span="12">
            <div id="sbxx">
              <sbxx></sbxx>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import lineChart from "./components/lineChart";
import cardBox from "./components/card";
import rouechart from "./components/rouechart";
import card2Box from "./components/card2";
import mapBox from "./components/map";
import listchart from "./components/listchart";
import ssgj from "./components/ssgj";
import sbgl from "./components/sbgl";
import sbxx from "./components/sbxx";
export default {
  components: {
    lineChart,
    cardBox,
    rouechart,
    card2Box,
    mapBox,
    listchart,
    ssgj,
    sbgl,
    sbxx
  },
  name: "首页",
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  float: left;
  height: 100%;
  &-container {
    width: 100%;
    height: 100%;
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}
#linechart {
  // background: blue;
  width: 100%;
  height: 246px;
  float: left;
}
#cardBox {
  // background: pink;
  width: 100%;
  height: 246px;
  // margin-left: 20px;
  float: left;
}
#listchart {
  // background: skyblue;
  width: 100%;
  height: 246px;
  float: left;
  // margin-left: 20px;
}
#buttonBox {
  // background: slateblue;
  float: left;
  // margin-left: 20px;
  width: 100%;
  height: 246px;
}
#mapBox {
  // background: gold;
  float: left;
  margin-top: 10px;
  width: 100%;
  height: 708px;
}
#rouechart {
  // background: greenyellow;
  float: left;
  margin-top: 10px;
  // margin-left: 20px;
  width: 100%;
  height: 260px;
}
#ssgj {
  // background: hotpink;
  width: 100%;
  height: 260px;
  // margin-left: 20px;
  float: left;
  margin-top: 10px;
}
#sbgl {
  // background: aquamarine;
  width: 100%;
  height: 158px;
  float: left;
  margin-top: 10px;
  // margin-left: 20px;
}
#sbxx {
  // background: violet;
  width: 100%;
  height: 158px;
  float: left;
  margin-top: 10px;
  // margin-left: 20px;
  margin-bottom: 10px;
}
</style>
