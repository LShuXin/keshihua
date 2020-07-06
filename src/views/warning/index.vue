<template>
  <el-container>
    <el-aside width="40%">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        header-row-class-name="rowtitle"
        :row-class-name="tableRowClassName"
        @current-change="handleCurrentChange"
      >
        <el-table-column label="预警时间" width="200px">
          <template slot-scope="date">
            <span>{{date.row.reportedAt | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lineName" label="线路名" />
        <el-table-column header-align="center" align="center" prop="towerNum" label="杆塔" />
        <el-table-column
          header-align="center"
          align="center"
          prop="installationLocationName"
          label="监拍朝向"
        />
        <el-table-column header-align="center" align="center" prop="departmentName" label="部门" />
        <el-table-column header-align="center" align="center" label="是否已读">
          <template slot-scope="scope">
            <span v-if="scope.row.hasRead === 1">已读</span>
            <span v-else style="color:#ff0000;">未读</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="pageChange"
        :page-size="12  "
      />
    </el-aside>
    <el-main>
      <el-container>
        <el-main>
          <el-image
            style="width: 100%;height:800px;"
            :src="url"
            fit="fit"
            :preview-src-list="[url]"
          />
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
              <el-button size="mini" type="primary" @click="userName">紧急联系人</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="mini" @click="copyFun">复制</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-top:20px;">
            <el-col :span="7">
              <span>告警原因</span>
              <el-select v-model="alarmCause" placeholder size="mini" multiple >
                <el-option
                  v-for="item in this.LABEL_DATA.ALARM_CAUSE"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col :span="7">
              <span>告警级别</span>
              <el-select v-model="alarmLevel" placeholder size="mini" >
                <el-option
                  v-for="item in this.LABEL_DATA.ALARM_LEVEL"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="danger" size="mini" @click="alarm">告警</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="mini" @click="NoAlarm">非告警</el-button>
            </el-col>
            <el-col :span="2 ">
              <el-button type="info" size="mini" @click="MissAlarm">误报</el-button>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
    </el-main>
    <el-dialog :visible.sync="imgBox" width="60%" style="margin-top:5vh">
      <div>
        <el-image style="width: 100%; height: 1000px" :src="zpurl" fit="fill" />
      </div>
    </el-dialog>
    <el-dialog title="紧急联系人" :visible.sync="userNameBox" width="30%">
      <el-form label-width="120px">
        <el-form-item label="负责人">
          <el-input v-model="Name" disabled />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="Phone" disabled style="color:red" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="error" @click="userNameBox = false">关 闭</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import { parseTime } from "@/utils/index.js";
export default {
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      Name: "李艳丽",
      Phone: "1746645228",
      tableData: [],
      url: "http://47.104.136.74/image/error.jpg",
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
      userId: localStorage.getItem("userId"),
      userNameBox: false,
      set: setInterval(this.setFun, 2000)
    };
  },

  mounted() {
    this.oneMsg();
  },
  methods: {
    setFun() {
      if (this.LABEL_DATA.Early_Alarms) {
        this.oneMsg();
        this.LABEL_DATA.Early_Alarms = false;
      }
    },
    // 未读信息添加背景色
    tableRowClassName({ row, rowIndex }) {
      // if (row.hasRead === 0) {
      //   return "warning-row";
      // }
    },
    oneMsg() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/alarm/query-early-alarm?order-by=alarm.created_at&order=desc&page=" +
          this.page +
          "&size=12" +
          "&user-id=" +
          this.userId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.data.alarms !== null) {
          this.tableData = msg.data.data.alarms;
          this.lineName = msg.data.data.alarms[0].lineName;
          this.departmentName = msg.data.data.alarms[0].departmentName;
          this.towerNum = msg.data.data.alarms[0].towerNum;
          this.reportedAt = msg.data.data.alarms[0].reportedAt;
          this.alarmImageUrl = msg.data.data.alarms[0].alarmImageUrl;
          this.total = msg.data.data.totalCount;
          this.url = msg.data.data.alarms[0].alarmImageUrl;
        }
      });
    },
    // 推送告警
    alarm() {
      var m = "";
      var n = this.alarmCause;
      for (var a = 0; a < n.length; a++) {
        m = m + `${n[a]},`;
      }
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
          this.oneMsg();
        } else {
          this.$message.error("告警失败");
        }
      });
    },
    // 选择一条预警
    handleCurrentChange(val) {
      this.deviceCode = val.deviceCode;
      this.alarmId = val.id;
      this.towerId = val.towerId;
      this.url = val.alarmImageUrl;
      this.alarmLevel = val.level;
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/user-early-alarm/create",
        data: {
          userId: Number(this.userId),
          alarmId: val.id
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
    
        if (msg.data.code === 0) {
          val.hasRead = 1;
        }
      });
      val.causes = val.causes.replace(new RegExp(",", "g"), "");
      if (val.causes.length > 1) {
        for (var i = 0; i < val.causes.length; i++) {
          this.alarmCause[i] = Number(val.causes[i]);
        }
        var min;
        this.alarmCause = this.alarmCause.reverse();
      } else {
        this.alarmCause = [Number(val.causes)];
      }
    },
    // 非告警
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
        this.oneMsg();
        if (msg.data.code === 0) {
          this.$message.success("成功");
        } else {
          this.$message.error("失败");
        }
      });
    },
    // 误报
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
        if (msg.data.code === 0) {
          this.$message.success("成功");
        } else {
          this.$message.error("失败");
        }
      });
    },
    // 抓拍
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
    // 复制
    copyFun() {
      this.$copyText(
        `预警时间:${this.reportedAt},预警线路:${this.lineName},杆塔号:${this.towerNum},图片地址:${this.alarmImageUrl}`
      );
    },
    // 翻页
    pageChange(index) {
      this.page = index;
      this.oneMsg();
    },
    // 紧急联系人
    userName() {
      this.userNameBox = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table >>> .rowtitle {
  .cell {
    color: #1ca3ff;
  }
}
.el-table >>> .warning-row {
  background: #ecc68b !important;
  color: #fff;
  &:hover {
    color: #000 !important;
    td {
      background: #e7cba1;
    }
  }
}
.el-table >>> .current-row > td {
  background: #1ca3ff !important;
  color: #fff;
}
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

