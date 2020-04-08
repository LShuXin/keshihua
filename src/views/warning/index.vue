<template>
  <el-container>
    <el-aside width="40%">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="reportedAt" label="预警时间"></el-table-column>
        <el-table-column prop="lineName" label="线路名"></el-table-column>
        <el-table-column header-align="center" align="center" prop="towerNum" label="杆塔"></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="installationLocationName"
          label="监拍朝向"
        ></el-table-column>
        <el-table-column header-align="center" align="center" prop="departmentName" label="部门"></el-table-column>
        <el-table-column header-align="center" align="center" label="抓拍状态">
          <template slot-scope="scope">
            <span v-if="scope.row.captureStatus === 0">未抓拍</span>
            <span v-if="scope.row.captureStatus === 1">抓拍中</span>
            <el-button
              type="primary"
              v-if="scope.row.captureStatus === 2"
              @click.stop="ZPimg(scope.row)"
              size="mini"
            >查看图片</el-button>
            <span v-if="scope.row.captureStatus === 3">抓拍失败</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </el-aside>
    <el-main>
      <el-container>
        <el-main>
          <el-image style="width: 100%;height:auto;" :src="url" fit="fit"></el-image>
        </el-main>
        <el-footer height="6%" style="width:100%">
          <el-row :gutter="15" style="margin-top:10px;">
            <el-col :span="3">
              <el-button size="mini" type="primary" @click="deviceSnap">主动拍照</el-button>
            </el-col>
            <el-col :span="3">
              <el-button size="mini" type="primary" disabled>主动录像</el-button>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" type="primary">紧急联系人</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="mini" @click="copyFun">复制</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-top:20px;">
            <el-col :span="7">
              <span>告警原因</span>
              <el-select v-model="alarmCause" placeholder size="mini" multiple @change="val">
                <el-option
                  v-for="item in this.LABEL_DATA.ALARM_CAUSE"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <span>告警级别</span>
              <el-select v-model="alarmLevel" placeholder size="mini" @change="val">
                <el-option
                  v-for="item in this.LABEL_DATA.ALARM_LEVEL"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="danger" size="mini" @click="alarm">告警</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="mini" @click="NoAlarm">非告警</el-button>
            </el-col>
            <el-col :span="2  ">
              <el-button type="info" size="mini" @click="MissAlarm">误报</el-button>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
    </el-main>
    <el-dialog title :visible.sync="imgBox" width="60%" style="margin-top:5vh">
      <div>
        <el-image style="width: 100%; height: 1000px" :src="zpurl" fit="fill"></el-image>
      </div>
      <!-- <div slot="footer">
        <el-button @click="imgBox = false">关闭</el-button>
       <el-button type="primary" @click="imgBox = false">确 定</el-button>
      </div>-->
    </el-dialog>
  </el-container>
</template>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      tableData: [
        // {
        //   id: 1,
        //   lineName: "",
        //   status: 1,
        //   deviceId: "",
        //   departmentName: "",
        //   towerNum: "",
        //   installationLocationName: "",
        //   reportedAt: "",
        //   alarmImageUrl: "",
        //   captureStatus: ""
        // },
        // {
        //   id: 1,
        //   name: "2",
        //   status: 1
        // }
      ],
      url: "http://47.104.136.74/image/3.jpg",
      alarmCause: [],
      btnLoding: false,
      imgBox: false,
      alarmLevel: "",
      alarmId: "",
      deviceCode: "",
      lineName: "",
      departmentName: "",
      towerNum: "",
      reportedAt: "",
      alarmImageUrl: "",
      page: 1,
      total: 2,
      zpurl: "http://47.104.136.74/image/3.jpg",
      userId: localStorage.getItem("userId")
    };
  },

  mounted() {
    this.oneMsg();
  },
  methods: {
    oneMsg() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/alarm/query-early-alarm?order-by=alarm.created_at&order=asc&page=" +
          this.page +
          "&size=10",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.data.alarms !== null) {
          this.tableData = msg.data.data.alarms;
          // this.deviceCode = msg.data.data.deviceCode;
          this.lineName = msg.data.data.alarms[0].lineName;
          this.departmentName = msg.data.data.alarms[0].departmentName;
          this.towerNum = msg.data.data.alarms[0].towerNum;
          this.reportedAt = msg.data.data.alarms[0].reportedAt;
          this.alarmImageUrl = msg.data.data.alarms[0].alarmImageUrl;
          this.total = msg.data.data.totalCount;
          this.url = msg.data.data.alarms[0].alarmImageUrl
        } else {
          this.$message.error("暂无预警");
        }
      });
    },
    val(val) {
      // console.log(val);
    },
    alarm() {
      var m = "";
      var n = this.alarmCause;
      // console.log(n);
      for (var a = 0; a < n.length; a++) {
        m = m + `${n[a]},`;
      }
      // console.log(m);
      // console.log(this.alarmLevel);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/alarm/alarm",
        data: {
          type: 2,
          level: this.alarmLevel,
          causes: m,
          id: this.alarmId
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("告警成功");
        } else {
          this.$message.error("告警失败");
        }
      });
    },

    handleCurrentChange(val) {
      console.log(val);
      this.deviceCode = val.deviceCode;
      this.alarmId = val.id;
      this.towerId = val.towerId;
      this.url = val.alarmImageUrl;
    },
    NoAlarm() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/alarm/alarm",
        data: {
          type: 3,
          level: 1,
          causes: "1,",
          id: this.alarmId
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.oneMsg();
        if (msg.data.code === 0) {
          this.$message.success("成功");
        } else {
          this.$message.error("失败");
        }
      });
    },
    MissAlarm() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/alarm/alarm",
        data: {
          type: 4,
          level: 1,
          causes: "1,",
          id: this.alarmId
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        this.oneMsg();
        // console.log(msg);
        if (msg.data.code === 0) {
          this.$message.success("成功");
        } else {
          this.$message.error("失败");
        }
      });
    },
    deviceSnap() {
      if (this.towerId !== "") {
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/hub/device-snap?user-id=" +
            this.userId +
            "&tower-id=" +
            this.towerId,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
          if (msg.data.message === "OK") {
            this.$message.success("抓拍成功！");
          } else {
            this.$message.error("抓拍失败！");
          }
        });
      } else {
        this.$message.warning("请选择设备！");
      }
    },
    copyFun() {
      this.$copyText(
        `预警时间:${this.reportedAt},预警线路:${this.lineName},杆塔号:${this.towerNum},图片地址:${this.alarmImageUrl}`
      );
      // console.log("111");
    },
    ZPimg(row) {
      console.log(row);
      this.imgBox = true;
      // this.zpurl = row.captureImageUrl;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 5px 5px 5px 5px;
  // padding-right: 5px;
  // padding-left: 5px;
}
.el-footer {
  // posi tion: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
}
.el-pagination {
  position: absolute;
  bottom: 10px;
  right: 60%;
  float: right;
}
</style>

