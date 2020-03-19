<template>
  <el-card
    shadow="hover"
    style="height:100%; border-radius:10px; overflow-y:auto;"
    @click.native="rout"
  >
    <div id="topBox" style="color:red;">实时告警</div>
    <el-table :data="tableData" style="width: 100%" height="180px">
      <el-table-column label="杆塔名称">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>经度: {{ scope.row.longitude }}</p>
            <p>维度: {{ scope.row.latitude }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.towerName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="causes" label="告警原因"></el-table-column>
      <el-table-column prop="reportedAt" label="巡视时间"></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      tableData: [
        {
          reportedAt: "11:28:35",
          causes: "大型车辆",
          towerName: "测试线路11",
          longitude: "111",
          latitude: "21"
        }
      ],
      set: null
    };
  },
  created() {
    this.set = setInterval(this.setFun, 5000);
    this.setFun();
  },
  methods: {
    rout() {
      this.$router.push("/form");
    },
    setFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/alarm/get-real-time-alarm",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        this.tableData = msg.data.data;
        // console.log(msg);
      });
    }
  },
  // destoryed() {
  //   clearInterval(this.set);
  // },
  beforeDestroy() {
    clearInterval(this.set);
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