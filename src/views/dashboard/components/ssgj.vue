<template>
  <el-card shadow="hover" style="height:100%; border-radius:10px;" @click.native="rout">
    <div id="topBox" style="color:red;">实时告警</div>
    <el-table :data="tableData" style="width: 100%" height="180px">
      <el-table-column prop="date" label="杆塔名称"></el-table-column>
      <el-table-column prop="name" label="告警原因"></el-table-column>
      <el-table-column prop="address" label="巡视时间"></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "枣庄I线#219",
          name: "大型车辆",
          address: "17:00:59"
        },
        {
          date: "菏泽II线#121",
          name: "烟火",
          address: "11:20:00"
        },
        {
          date: "黄滨I线#142",
          name: "大型车辆",
          address: "12:00:00"
        },
        {
          date: "黄滨II线#221",
          name: "大型车辆",
          address: "13:00:00"
        }
      ]
    };
  },
  methods: {
    rout() {
      this.$router.push("/form");
    }
  }
};
</script>
<style lang="scss" scoped>
#topBox {
  font-size: 18px;
  cursor: pointer;
}
.el-table {
  cursor: pointer;
  margin-top: 3px;

  >>> .el-table__body-wrapper::-webkit-scrollbar {
    width: 0 !important;
  }
  >>> .el-table__body-wrapper {
    font-size: 16px;
    text-align: center;
  }
  >>> .el-table_1_column_1 {
    text-align: left;
  }
  >>> .el-table_1_column_2 {
    text-align: center;
  }
  >>> .el-table_1_column_3 {
    text-align: right;
  }
}
</style>