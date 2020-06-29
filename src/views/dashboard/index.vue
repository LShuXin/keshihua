<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :span="8">
        <div id="linechart">
          <lineChart />
        </div>
      </el-col>
      <el-col :span="3">
        <div id="cardBox">
          <cardBox />
        </div>
      </el-col>
      <el-col :span="7">
        <div id="listchart">
          <listchart />
        </div>
      </el-col>

      <el-col :span="6">
        <div id="buttonBox">
          <card2Box />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="18">
        <div id="mapBox">
          <mapBox />
        </div>
      </el-col>
      <el-col :span="6">
        <div id="ssgj">
          <ssgj />
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
              <sbgl />
            </div>
          </el-col>
          <el-col :span="12">
            <div id="sbxx">
              <sbxx />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
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
  width: 100%;
  height: 246px;
  float: left;
}
#cardBox {
  width: 100%;
  height: 246px;
  float: left;
}
#listchart {
  width: 100%;
  height: 246px;
  float: left;
}
#buttonBox {
  float: left;

  width: 100%;
  height: 246px;
}
#mapBox {
  float: left;
  margin-top: 10px;
  width: 100%;
  height: 708px;
}
#rouechart {
  float: left;
  margin-top: 10px;
  width: 100%;
  height: 260px;
}
#ssgj {
  width: 100%;
  height: 260px;
  float: left;
  margin-top: 10px;
}
#sbgl {
  width: 100%;
  height: 158px;
  float: left;
  margin-top: 10px;
}
#sbxx {
  width: 100%;
  height: 158px;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
