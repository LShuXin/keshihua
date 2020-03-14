<template>
  <el-card shadow="never" class="Box" :body-style="{padding:'0px'}">
    <el-container>
      <el-header height style="margin-bottom:10px; padding:0px;">
        <el-card shadow="never">
          <el-row :gutter="10">
            <el-col :span="4">
              <span class="text">告警原因：</span>
              <el-select v-model="gjyyvalue" placeholder="请选择类别" size="mini" @change="testSelect">
                <el-option v-for="item in gjyy" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>告警级别：</span>
              <el-select v-model="gjjbvalue" placeholder size="mini">
                <el-option v-for="item in gjjb" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>监拍朝向：</span>
              <el-select v-model="jpcxvalue" placeholder size="mini">
                <el-option
                  v-for="item in jpcx"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>电压等级：</span>
              <el-select v-model="dydjvalue" placeholder size="mini">
                <el-option
                  v-for="item in dydj"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>是否分派：</span>
              <el-select v-model="sffpvalue" placeholder size="mini" disabled>
                <el-option v-for="item in sffp" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>超期提醒：</span>
              <el-select v-model="cqtxvalue" placeholder size="mini" disabled>
                <el-option v-for="item in cqtx" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="downRow">
            <el-col :span="4">
              <span>告警部门：</span>
              <el-select
                @change="gjbmName"
                v-model="gjbmvalue"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
                size="mini"
              >
                <el-option v-for="item in gjbm" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <span>告警班组：</span>
              <el-select
                @change="gjbzName"
                v-model="gjbzvalue"
                filterable
                remote
                size="mini"
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethodbz"
                :loading="loadingbz"
              >
                <el-option v-for="item in gjbz" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                @change="gjxlName"
                size="mini"
              >
                <el-option v-for="item in gjxl" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="4">
              <span>告警杆塔：</span>
              <el-select
                v-model="gjgtvalue"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethodgt"
                :loading="loadinggt"
                size="mini"
              >
                <el-option
                  v-for="item in gjgt"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>-->
            <el-col :span="4">
              <span>是否已读：</span>
              <el-checkbox v-model="checked">已读</el-checkbox>
              <el-checkbox v-model="checked2">未读</el-checkbox>
            </el-col>
            <el-col :span="5">
              <span>告警时间：</span>
              <el-date-picker
                size="mini"
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-button
                @click="msgc"
                plain
                icon="el-icon-search"
                style="border:0; background: #f7b84f; color:#fff;"
              >重置</el-button>
              <el-button
                plain
                icon="el-icon-search"
                @click="created"
                style="border:0; background: #1ca3ff;color:#fff;"
              >查询</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="btnBoxRow">
            <el-col :span="2" :offset="6">
              <!-- <el-button
                plain
                icon="el-icon-search"
                @click="created"
                style="border:0; background: #1ca3ff;color:#fff;"
              >查询</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                @click="msgc"
                plain
                icon="el-icon-search"
                style="border:0; background: #f7b84f; color:#fff;"
              >重置</el-button>-->
            </el-col>
            <el-col :span="3" :offset="8">
              <el-button
                @click="msgc"
                plain
                icon="el-icon-search"
                style="border:0; background: #28d7c0; color:#fff;"
              >&nbsp;&nbsp;&nbsp;&nbsp;今日告警&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                @click="msgc"
                plain
                icon="el-icon-search"
                style="border:0; background: #6b5af4; color:#fff;"
              >最近一周告警</el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                @click="pgFun"
                plain
                icon="el-icon-user"
                style="border:0; background: #f74f77; color:#fff;"
              >&nbsp;&nbsp;&nbsp;&nbsp;一键派工&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-header>
      <el-container>
        <el-aside width="50%">
          <el-card id="gjimgBox">
            <p>告警详情图</p>
            <el-image style="width:100%; height:100%" :src="url" :preview-src-list="srcList"></el-image>
          </el-card>
        </el-aside>
        <el-main style="padding:0 20px 15px 20px">
          <p>数据详情表</p>
          <el-table
            :data="gjsjdata"
            stripe
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%;height:88%; "
            @row-click="test"
          >
            <el-table-column prop="createdAt" label="告警时间">
              <template slot-scope="scope">
                <span>{{scope.row.createdAt | parseTime('{y}-{m}-{d}')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="level" label="告警级别"></el-table-column>
            <el-table-column prop="departmentName" label="部门"></el-table-column>
            <el-table-column prop="teamName" label="班组"></el-table-column>
            <el-table-column prop="lineName" label="线路"></el-table-column>
            <el-table-column prop="towerNum" label="杆塔"></el-table-column>
            <el-table-column prop="installationLocationName" label="监拍朝向"></el-table-column>
            <el-table-column prop="causes" label="告警原因"></el-table-column>
            <el-table-column prop="hasRead" label="是否已读">
              <template slot-scope="scope">
                <span v-if="scope.row.hasRead === 0" style="color: #ff0000">未读</span>
                <span v-else style="color:#1AE642">已读</span>
              </template>
            </el-table-column>
            <el-table-column prop="gjfpLabel" label="分派"></el-table-column>
            <el-table-column prop="gjcqLabel" label="超期"></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            style="float:right;"
            :total="pagess"
            :page-size="7"
            @current-change="current"
          ></el-pagination>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title :visible.sync="pgBox" width="20%">
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-form-item label="线路名">
          <el-input v-model="form.xgLineName" disable></el-input>
        </el-form-item>
        <el-form-item label="杆塔号">
          <el-input v-model="form.xgTowerName" disable></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.xgUserName" disable></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.xgPhoneNum" disable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="
        pgBox= false">取 消</el-button>
        <el-button type="primary" @click="pgTrue">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<style lang="scss" scoped>
.Box {
  margin: 0px;
  .downRow {
    margin-top: 20px;
  }
  .btnBoxRow {
    margin-top: 20px;
  }
}
.el-main::-webkit-scrollbar {
  width: 0 !important;
}
.el-table >>> .current-row > td {
  background: #1ca3ff !important;
  color: #fff;
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
  created() {
    //告警列表
    axios({
      method: "post",
      url:
        this.GLOBAL.AJAX_URL +
        "/v1/alarm/query?user-id=" +
        localStorage.getItem("userId") +
        "&order-by=alarm.created_at&order=asc&page=1&size=7&department=&team=&start-time=&end-time=&cause-level=&location=&line=&tower=&voltage-level=",
      headers: {
        Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      }
    }).then(msg => {
      console.log(msg);
      this.pagess = msg.data.data.totalCount;
      this.gjsjdata = msg.data.data.alarms;
      console.log(this.gjsjdata);
    });
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
      // list: [],
      loading: false,
      gjbz: [],
      gjbzvalue: "",
      gjbzname: "",
      // list: [],
      loadingbz: false,
      gjxl: [],
      gjxlvalue: "",
      gjxlname: "",
      // list: [],
      loadingxl: false,
      gjgt: [],
      gjgtvalue: "",
      // list: [],
      loadinggt: false,
      url: "http://47.104.136.74/image/3.jpg",
      srcList: [
        "http://47.104.136.74/image/3.jpg",
        "http://47.104.136.74/image/2.jpg"
      ],
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
  filters: {
    parseTime: parseTime
  },
  methods: {
    testSelect(val) {
      console.log(val);
    },
    prev() {
      this.index = this.index - 1;
      axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/alarm/query?user-id=" +
          localStorage.getItem("userId") +
          "&order-by=created_at&order=asc&page=" +
          this.index +
          "&size=7&department=&team=&start-time=&end-time=&cause-level=&location=&line=&tower=&voltage-level=",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);

        this.gjsjdata = msg.data.data.alarms;
        // console.log(this.gjsjdata);
      });
    },
    prev() {
      this.index = this.index + 1;
      axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/alarm/query?user-id=" +
          localStorage.getItem("userId") +
          "&order-by=created_at&order=asc&page=" +
          this.index +
          "&size=7&department=&team=&start-time=&end-time=&cause-level=&location=&line=&tower=&voltage-level=",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);

        this.gjsjdata = msg.data.data.alarms;
        // console.log(this.gjsjdata);
      });
    },
    current(val) {
      axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/alarm/query?user-id=" +
          localStorage.getItem("userId") +
          "&order-by=created_at&order=asc&page=" +
          val +
          "&size=7&department=&team=&start-time=&end-time=&cause-level=&location=&line=&tower=&voltage-level=",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);

        this.gjsjdata = msg.data.data.alarms;
        // console.log(this.gjsjdata);
        this.pageindex = val;
      });
    },
    test(row, colunm, event) {
      // console.log(row);
      console.log(row);
      if (row.id == 1282) {
        this.url = "http://47.104.136.74/image/2.jpg";
      } else {
        this.url = "http://47.104.136.74/image/3.jpg";
      }
      this.row = row;
      this.form.xgLineName = row.lineName;
      this.form.xgTowerName = row.towerNum;
      this.form.xgUserName = row.userName;
      this.form.xgPhoneNum = row.userPhone;

      // console.log(event);
      // axios({
      //   method: "post",
      //   url:
      //     this.GLOBAL.AJAX_URL +
      //     "/v1/alarm/update-has-read?has-read=1&id=" +
      //     row.id,
      //   headers: {
      //     Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      //   }
      // }).then(msg => {
      //   row.hasRead = 1;
      // });
       axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/user-alarm/create",
          data:{
            userId:localStorage.getItem("userId"),
            alarmId:row.id
          },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // row.hasRead = 1;
        console.log(msg)
      });
    },
    handleCurrentChange(val) {
      // console.log(val);
    },
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
          //  console.log(msg);

          this.loading = false;
          this.gjbm = msg.data.data;
        });
      }
    },
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
          // console.log(msg);
          for (var i = 0; i < msg.data.data.length; i++) {
            var obj = {};
            obj = {
              id: i,
              name: msg.data.data[i]
            };

            this.loadingbz = false;
            this.gjbz.push(obj);
          }
          //console.log(this.gjbmvalue)
        });
      }
    },
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
          // console.log(msg);
          this.loadingxl = false;
          this.gjxl = msg.data.data;
        });
      }
    },
    // remoteMethodgt(query) {
    //   if (query !== "") {
    //     this.loadinggt = true;
    //     //console.log(this.gjxlvalue)
    //     axios({
    //       method: "post",
    //       url:
    //         this.GLOBAL.AJAX_URL +
    //         "/v1/line-tower/search-by-tower-num?tower-num=" +
    //         query +
    //         "&line-id=" +
    //         this.gjxlvalue,
    //       headers: {
    //         Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
    //       }
    //     }).then(msg => {
    //       for (var i = 0; i < msg.data.data.length; i++) {
    //         var obj = {};
    //         obj = {
    //           id: i,
    //           name: msg.data.data[i]
    //         };

    //         this.loadinggt = false;
    //         this.gjgt.push(obj);
    //       }
    //     });
    //   }
    // },
    gjbmName(id) {
      var obj = {};
      obj = this.gjbm.find(function(item) {
        return item.id === id;
      });

      // console.log(obj.name)
      this.gjbmname = obj.name;
      // console.log(this.gjbmname)
    },
    gjbzName(id) {
      var obj = {};
      obj = this.gjbz.find(function(item) {
        return item.id === id;
      });
      // console.log(obj.name)
      this.gjbzname = obj.name;
    },
    gjxlName(id) {
      var obj = {};
      obj = this.gjxl.find(function(item) {
        return item.id === id;
      });
      // console.log(obj.name)
      this.gjxlname = obj.name;

      console.log(this.gjxlname);
    },
    pgFun() {
      this.pgBox = true;
    },
    pgTrue() {
      axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/work-order/create-work-order",
        data: {
          alarmId: Number(this.row.id),
          userName: this.row.userName,
          userPhone: this.row.userName
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("派工成功");
        } else {
          this.$message.error(msg.data.message);
        }
        this.pgBox = false;
      });
    },
    created() {
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
          "&order-by=created_at&order=&page=1&size=2&department=" +
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
          this.dydjvalue,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        console.log(this.value2);

        // console.log(this.dydjvalue)
      });
    },
    msgc() {
      this.$message.warning("该功能正在研发中~");
    }
  }
};
</script>