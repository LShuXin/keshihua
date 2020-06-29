<template>
  <el-card shadow="never" class="Box" :body-style="{ padding: '0px' }">
    <el-container>
      <!-- 搜索条件 -->
      <el-header height style="margin-bottom:10px; padding:0px;">
        <el-card shadow="never">
          <el-row :gutter="10">
            <el-col :span="4">
              <span class="text">告警原因：</span>
              <el-select v-model="gjyyvalue" placeholder="请选择类别" size="mini" clearable>
                <el-option v-for="item in gjyy" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>告警级别：</span>
              <el-select v-model="gjjbvalue" placeholder size="mini" clearable>
                <el-option v-for="item in gjjb" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>监拍朝向：</span>
              <el-select v-model="jpcxvalue" placeholder size="mini" clearable>
                <el-option
                  v-for="item in jpcx"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>电压等级：</span>
              <el-select v-model="dydjvalue" placeholder size="mini" clearable>
                <el-option v-for="item in dydj" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>是否分派：</span>
              <el-select v-model="sffpvalue" placeholder size="mini" disabled clearable>
                <el-option v-for="item in sffp" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>超期提醒：</span>
              <el-select v-model="cqtxvalue" placeholder size="mini" disabled clearable>
                <el-option v-for="item in cqtx" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="downRow">
            <el-col :span="4">
              <span>告警部门：</span>
              <el-select
                v-model="gjbmvalue"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
                size="mini"
                clearable
                @change="gjbmName"
              >
                <el-option v-for="item in gjbm" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>告警班组：</span>
              <el-select
                v-model="gjbzvalue"
                filterable
                remote
                size="mini"
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethodbz"
                :loading="loadingbz"
                clearable
                @change="gjbzName"
              >
                <el-option v-for="item in gjbz" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>告警线路：</span>
              <el-select
                v-model="gjxlvalue"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethodxl"
                :loading="loadingxl"
                size="mini"
                clearable
                @change="gjxlName"
              >
                <el-option v-for="item in gjxl" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>是否已读：</span>
              <el-checkbox v-model="checked">已读</el-checkbox>
              <el-checkbox v-model="checked2">未读</el-checkbox>
            </el-col>
            <el-col :span="5">
              <span>告警时间：</span>
              <el-date-picker
                v-model="value2"
                size="mini"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                clearable
              />
            </el-col>
            <el-col :span="3">
              <el-button
                plain
                icon="el-icon-search"
                style="border:0; background: #f7b84f; color:#fff;"
                @click="resloveFun"
              >重置</el-button>
              <el-button
                plain
                icon="el-icon-search"
                style="border:0; background: #1ca3ff;color:#fff;"
                @click="createdMsg"
              >查询</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="btnBoxRow">
            <el-col :span="2" :offset="6"></el-col>
            <el-col :span="3" :offset="8">
              <el-button
                plain
                icon="el-icon-search"
                style="border:0; background: #28d7c0; color:#fff;"
                @click="msgc"
              >&nbsp;&nbsp;&nbsp;&nbsp;今日告警&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                plain
                icon="el-icon-search"
                style="border:0; background: #6b5af4; color:#fff;"
                @click="msgc"
              >最近一周告警</el-button>
            </el-col>
            <el-col :span="3" />
          </el-row>
        </el-card>
      </el-header>

      <el-container>
        <!-- 告警图片 -->
        <el-aside width="50%">
          <el-card id="gjimgBox">
            <p>告警详情图</p>
            <el-image style="width:100%; height:100%" :src="url" :preview-src-list="[url]" />
          </el-card>
        </el-aside>
        <el-main style="padding:0 20px 15px 20px">
          <p>数据详情表</p>
          <!-- 告警列表 -->
          <el-table
            :data="gjsjdata"
            highlight-current-row
            style="width: 100%;height:88%; "
            header-row-class-name="rowtitle"
            :row-class-name="tableRowClassName"
            @row-click="test"
          >
            <el-table-column label="告警时间" width="100px">
              <template slot-scope="scope">
                <span>
                  {{
                  scope.row.updatedAt | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="level" label="告警级别" >
              <template slot-scope="scop">
                <span v-if ="scop.row.level === 1"> 紧急</span>
                <span v-else>非紧急</span>
              </template>
            </el-table-column>
            <el-table-column prop="departmentName" label="部门" />
            <el-table-column prop="teamName" label="班组" />
            <el-table-column prop="lineName" label="线路" />
            <el-table-column prop="towerNum" label="杆塔" />
            <el-table-column prop="causes" label="告警原因" />
            <el-table-column prop="hasRead" label="是否已读">
              <template slot-scope="scope">
                <span v-if="scope.row.hasRead === 0" style="color: #ff0000">未读</span>
                <span v-else style="color:#1AE642">已读</span>
              </template>
            </el-table-column>
            <el-table-column label="分派" width="100">
              <template slot-scope="data">
                <el-button
                  v-if="!data.row.hasWorkOrder"
                  plain
                  icon="el-icon-user"
                  style="border:0; background: #f74f77; color:#fff;"
                  size="mini"
                  @click="paFun()"
                >派工</el-button>
                <span v-else>已派工</span>
              </template>
            </el-table-column>
            <el-table-column prop="installationLocationName" label="监拍朝向" />

            <el-table-column prop="gjcqLabel" label="超期" />
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            style="float:right;"
            :total="pagess"
            :page-size="7"
            @current-change="current"
          />
        </el-main>
      </el-container>
    </el-container>
    <!-- 派工联系人信息 -->
    <el-dialog title :visible.sync="pgBox" width="30%">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-form-item label="线路名">
          <el-input v-model="form.xgLineName" disabled />
        </el-form-item>
        <el-form-item label="杆塔号">
          <el-input v-model="form.xgTowerName" disabled />
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.xgUserName" disabled />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.xgPhoneNum" disabled />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="pgBox = false">取 消</el-button>
        <el-button type="primary" @click="pgTrue">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<style lang="scss" scoped>
.el-table >>> {
  .rowtitle {
    .cell {
      color: #1ca3ff;
    }
  }
}
.Box {
  margin: 0px;
  .downRow {
    margin-top: 20px;
  }
  .btnBoxRow {
    margin-top: 20px;
  }
}
.el-date-editor {
  width: 70%;
}
.el-main::-webkit-scrollbar {
  width: 0 !important;
}
.el-table >>> .current-row > td {
  background: #1ca3ff !important;
  color: #fff;
}
.el-table >>> .warning-row {
  background: #f56c6c !important;
  color: #fff !important;
  &:hover {
    color: #000 !important;
    td {
      background: #fdc7c7;
    }
  }
}
.el-button {
  &:hover {
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
    -webkit-box-shadow: 0px 14px 18px -5px rgba(0, 36, 100, 0.3) !important ;
    box-shadow: 0px 14px 18px -5px rgba(0, 36, 100, 0.3) !important ;
  }
  &:active {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}
.el-input >>> .el-input__inner {
  width: 260px;
}
</style>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { parseTime } from "@/utils/index.js";
export default {
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      gjyy: this.LABEL_DATA.ALARM_CAUSE,
      gjyyvalue: "",
      gjjb: this.LABEL_DATA.ALARM_LEVEL,
      gjjbvalue: "",
      gjjbname: "",
      jpcx: this.LABEL_DATA.DEVICE_POSITION,
      jpcxvalue: "",
      dydj: this.LABEL_DATA.VOLTAGE_LEVEL,
      dydjvalue: "",
      sffp: [
        {
          id: 1,
          name: "是"
        },
        {
          id: 0,
          name: "否"
        }
      ],
      sffpvalue: "",
      cqtx: [
        {
          id: 1,
          name: "未超期"
        },
        {
          id: 0,
          name: "已超期"
        }
      ],
      cqtxvalue: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: ["", ""],
      checked: false,
      checked2: false,
      gjbm: [],
      gjbmvalue: "",
      gjbmname: "",
      loading: false,
      gjbz: [],
      gjbzvalue: "",
      gjbzname: "",
      loadingbz: false,
      gjxl: [],
      gjxlvalue: "",
      gjxlname: "",
      loadingxl: false,
      gjgt: [],
      gjgtvalue: "",
      loadinggt: false,
      url: "http://47.104.136.74/image/error.jpg",
      gjsjdata: [],
      pagess: 0,
      pageindex: 1,
      form: {
        xgLineName: "",
        xgTowerName: "",
        xgUserName: "",
        xgPhoneNum: ""
      },

      pgBox: false,
      row: {}
    };
  },
  created() {
    // 告警列表
    axios({
      method: "post",
      url:
        this.GLOBAL.AJAX_URL +
        "/v1/alarm/query?user-id=" +
        localStorage.getItem("userId") +
        "&order-by=alarm.updated_at&page=1&size=7&department=&team=&start-time=&end-time=&cause-level=&location=&line=&tower=&voltage-level=",
      headers: {
        Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      }
    }).then(msg => {
      console.log(msg);
      if (msg.data.data.alarms === []) {
        this.$message.warning("暂无告警");
      } else {
        this.pagess = msg.data.data.totalCount;
        this.gjsjdata = msg.data.data.alarms;
        this.url =
          "http://47.104.136.74:8083/" + msg.data.data.alarms[0].alarmImagePath;
      }
    });
  },
  methods: {
    // paigong
    paFun(){
      this.pgBox = true;
    },
    // 未读消息添加背景色
    tableRowClassName({ row, rowIndex }) {
      if (row.hasRead === 0) {
        // return "warning-row";
        return;
      }
    },

    // 查询条件下的翻页
    current(val) {
      if (this.value2 !== null && this.value2[0] !== undefined) {
        // console.log(this.value2);
        var i = "";
        var o = "";
        if (this.checked) {
          i = "1";
        }
        if (this.checked2) {
          o = "0";
        }
        axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/alarm/query?user-id=" +
            localStorage.getItem("userId") +
            "&order-by=alarm.created_at&order=&page=" +
            val +
            "&size=7&department=" +
            this.gjbmname +
            "&team=" +
            this.gjbzname +
            "&has-read=" +
            i +
            "" +
            o +
            "&start-time=" +
            this.value2[0] +
            "&end-time=" +
            this.value2[1] +
            "&cause-level=" +
            this.gjjbvalue +
            "&location=" +
            this.jpcxvalue +
            "&line=" +
            this.gjxlname +
            "&tower=" +
            this.gjgtvalue +
            "&voltage-level=" +
            this.dydjvalue +
            "&cause-name=" +
            String(this.gjyyvalue),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.code === 0) {
            console.log(msg)
            this.gjsjdata = msg.data.data.alarms;
            this.pagess = msg.data.data.totalCount;
          } else {
            this.$message.error("查询失败");
          }
        });
      } else {
        var i = "";
        var o = "";
        if (this.checked) {
          i = "1";
        }
        if (this.checked2) {
          o = "0";
        }
        axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/alarm/query?user-id=" +
            localStorage.getItem("userId") +
            "&order-by=alarm.created_at&order=&page=" +
            val +
            "&size=7&department=" +
            this.gjbmname +
            "&team=" +
            this.gjbzname +
            "&has-read=" +
            i +
            "" +
            o +
            "&cause-level=" +
            this.gjjbvalue +
            "&location=" +
            this.jpcxvalue +
            "&line=" +
            this.gjxlname +
            "&tower=" +
            this.gjgtvalue +
            "&voltage-level=" +
            this.dydjvalue +
            "&cause-name=" +
            String(this.gjyyvalue),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(String(this.gjyyvalue));
          if (msg.data.code === 0) {
            // this.$message.success("查询成功");
            this.gjsjdata = msg.data.data.alarms;
            this.pagess = msg.data.data.totalCount;
          } else {
            // this.$message.error("查询失败");
          }
          // console.log(msg);
          // console.log(this.value2);

          // console.log(this.dydjvalue)
        });
      }
    },
    // 点击改为已读状态
    test(row, colunm, event) {
      this.row = row;
      this.form.xgLineName = row.lineName;
      this.form.xgTowerName = row.towerNum;
      this.form.xgUserName = row.userName;
      this.form.xgPhoneNum = row.userPhone;
      this.url = "http://47.104.136.74:8083/" + row.alarmImagePath;
      axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/user-alarm/create",
        data: {
          userId: Number(localStorage.getItem("userId")),
          alarmId: Number(row.id)
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        row.hasRead = 1;
      });
    },
    // 告警部门模糊查询
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/department/search-by-name?name=" +
            query,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          this.loading = false;
          this.gjbm = msg.data.data;
        });
      }
    },
    // 告警班组模糊查询
    remoteMethodbz(query) {
      if (query !== "") {
        this.loadingbz = true;
        axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/team/search-by-name?name=" +
            query +
            "&department-id=" +
            this.gjbmvalue,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          for (var i = 0; i < msg.data.data.length; i++) {
            var obj = {};
            obj = {
              id: i,
              name: msg.data.data[i]
            };

            this.loadingbz = false;
            this.gjbz.push(obj);
          }
        });
      }
    },
    // 告警线路模糊查询
    remoteMethodxl(query) {
      if (query !== "") {
        this.loadingxl = true;
        axios({
          method: "post",
          url: this.GLOBAL.AJAX_URL + "/v1/line/search-by-name?name=" + query,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          this.loadingxl = false;
          this.gjxl = msg.data.data;
        });
      }
    },
    // id转换成name
    gjbmName(id) {
      var obj = {};
      obj = this.gjbm.find(function(item) {
        return item.id === id;
      });
      this.gjbmname = obj.name;
    },
    // id转换成name
    gjbzName(id) {
      var obj = {};
      obj = this.gjbz.find(function(item) {
        return item.id === id;
      });
      this.gjbzname = obj.name;
    },
    // id转换成name
    gjxlName(id) {
      var obj = {};
      obj = this.gjxl.find(function(item) {
        return item.id === id;
      });
      this.gjxlname = obj.name;
    },
    // 确认派工
    pgTrue() {
      axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/work-order/create-work-order",
        data: {
          alarmId: Number(this.row.id),
          userName: this.row.userName,
          userPhone: this.row.userPhone
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("派工成功");
          axios({
            method: "post",
            url:
              this.GLOBAL.AJAX_URL +
              "/v1/alarm/send-sms?alarm-id=" +
              this.row.id,
            headers: {
              Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
            }
          }).then(msg => {
            // console.log(msg);
            if (msg.data.code === 0) {
              this.$message.success("短信发送成功");
              this.row.hasWorkOrder = 1;
            } else {
              this.$message.error("短信发送失败");
            }
          });
        } else {
          this.$message.error(msg.data.message);
        }
        this.pgBox = false;
      });
    },
    // 重置查询条件
    resloveFun() {
      this.gjyyvalue = "";
      this.gjjbvalue = "";
      this.gjjbname = "";
      this.jpcxvalue = "";
      this.dydjvalue = "";
      this.cqtxvalue = "";
      this.value2 = "";
      this.gjbmvalue = "";
      this.gjbmname = "";
      this.gjbzvalue = "";
      this.gjbzname = "";
      this.gjxlvalue = "";
      this.gjxlname = "";
      this.gjgtvalue = "";
      this.checked = false;
      this.checked2 = false;
      // this.gjbzname = "";
    },
    // 查询
    createdMsg() {
      if (this.value2 !== null && this.value2[0] !== undefined) {
        // console.log(this.value2);
        var i = "";
        var o = "";
        if (this.checked) {
          i = "1";
        }
        if (this.checked2) {
          o = "0";
        }
        axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/alarm/query?user-id=" +
            localStorage.getItem("userId") +
            "&order-by=alarm.created_at&order=&page=1&size=7&department=" +
            this.gjbmname +
            "&team=" +
            this.gjbzname +
            "&has-read=" +
            i +
            "" +
            o +
            "&start-time=" +
            this.value2[0] +
            "&end-time=" +
            this.value2[1] +
            "&cause-level=" +
            this.gjjbvalue +
            "&location=" +
            this.jpcxvalue +
            "&line=" +
            this.gjxlname +
            "&tower=" +
            this.gjgtvalue +
            "&voltage-level=" +
            this.dydjvalue +
            "&cause-name=" +
            String(this.gjyyvalue),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(String(this.gjyyvalue));
          if (msg.data.code === 0) {
            console.log(msg)
            this.$message.success("查询成功");
            this.gjsjdata = msg.data.data.alarms;
            this.pagess = msg.data.data.totalCount;
          } else {
            this.$message.error("查询失败");
          }
        });
      } else {
        var i = "";
        var o = "";
        if (this.checked) {
          i = "1";
        }
        if (this.checked2) {
          o = "0";
        }
        axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/alarm/query?user-id=" +
            localStorage.getItem("userId") +
            "&order-by=alarm.created_at&order=&page=1&size=7&department=" +
            this.gjbmname +
            "&team=" +
            this.gjbzname +
            "&has-read=" +
            i +
            "" +
            o +
            "&cause-level=" +
            this.gjjbvalue +
            "&location=" +
            this.jpcxvalue +
            "&line=" +
            this.gjxlname +
            "&tower=" +
            this.gjgtvalue +
            "&voltage-level=" +
            this.dydjvalue +
            "&cause-name=" +
            String(this.gjyyvalue),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(String(this.gjyyvalue));
          if (msg.data.code === 0) {
            console.log(msg)
            this.$message.success("查询成功");
            this.gjsjdata = msg.data.data.alarms;
            this.pagess = msg.data.data.totalCount;
          } else {
            this.$message.error("查询失败");
          }
          // console.log(msg);
          // console.log(this.value2);
          //
          // console.log(this.dydjvalue)
        });
      }
    },
    // 提示信息
    msgc() {
      this.$message.warning("该账号没有此权限~");
    }
  }
};
</script>
