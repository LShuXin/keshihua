<template>
  <div style="margin-bottom:10px; padding:10px;">
    <el-row
      :gutter="10"
      style="margin-top:5px; padding-bottom:5px; border-bottom:1px solid rgb(222,222,222);"
    >
      <el-col :span="4">
        <label>线路名：</label>
        <el-select
          v-model="lineId"
          clearable
          placeholder="选择线路名"
          filterable
          remote
          :remote-method="xianluFun"
        >
          <el-option v-for="item in lines" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <label>杆塔号：</label>
        <el-select
          v-model="towerId"
          clearable
          placeholder="选择杆塔"
          filterable
          remote
          :remote-method="towerFun"
        >
          <el-option
            v-for="item in towers"
            :key="item.towerId"
            :label="item.towerNum"
            :value="item.towerId"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <label for>电压等级：</label>
        <el-select v-model="levelId" placeholder>
          <el-option
            v-for="item in this.LABEL_DATA.VOLTAGE_LEVEL"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <label>图片日期：</label>
        <el-date-picker
          v-model="creatAt"
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
      <el-col :span="2" :offset="2">
        <el-button type="primary" @click="msgFun(1)">查询上报</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:5px; padding-top:5px; ">
      <el-col :span="4">
        <label>线路名：</label>
        <el-select
          v-model="lineName"
          clearable
          placeholder="选择线路名"
          filterable
          remote
          :remote-method="xianluFun"
        >
          <el-option
            v-for="item in lines"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            @click.stop="test(item.id)"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <label>杆塔号：</label>
        <el-input v-model="towerNum" placeholder="请输入杆塔号" style="width:205.74px" />
      </el-col>
      <el-col :span="4">
        <label for>电压等级：</label>
        <el-select v-model="levelIdAlarm" placeholder>
          <el-option
            v-for="item in this.LABEL_DATA.VOLTAGE_LEVEL"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <label>图片日期：</label>
        <el-date-picker
          v-model="creatAtAlarm"
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
      <el-col :span="2" :offset="2">
        <el-button type="danger" @click="msgFunAlarm(1)">查询告警</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:15px">
      <el-col v-for="(item,i) in pictures" :key="i" :span="6" style="margin-top:10px">
        <el-card v-if="!alarmQuery">
          <p>{{ item.lineName }}-{{ item.towerNum }}</p>
          <p>{{ item.picCreatedAt | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p>
          <div>
            <el-image
              style="width: 100%; height: 250px"
              :src="item.picUrl"
              :preview-src-list="[item.picUrl]"
              fit="fill"
            />
          </div>
        </el-card>
        <el-card v-else>
          <p>{{ item.lineName }}-{{ item.towerNum }}</p>
          <p>{{ item.createdAt }}</p>
          <div>
            <el-image
              style="width: 100%; height: 250px"
              :src="item.picUrl"
              :preview-src-list="[item.picUrl]"
              fit="fill"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      style="position:fixed;right:10px;bottom:10px;"
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="8"
      @current-change="pageFun"
    />
  </div>
</template>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import { parseTime } from '@/utils/index.js'

export default {
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      pictures: [],
      alarmCaues: "",
      lines: "",
      lineId: "",
      levelId: "",
      creatAt: [],
      totalCount: null,
      page: 1,
      towers: "",
      towerId: "",
      lineName: "",
      towerNum: "",
      levelIdAlarm: "",
      creatAtAlarm: [],
      alarmQuery: false,
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
      }
    };
  },
  mounted() {
    Axios({
      method: "post",
      url:
        this.GLOBAL.AJAX_URL +
        "/v1/picture/query?page=1&size=8&user-id=" +
        localStorage.getItem("userId"),
      headers: {
        Authorization: "Bearer" + Cookies.get("vue_admin_template_token")
      }
    }).then(msg => {
      console.log(msg);
      this.pictures = msg.data.data.pictures;
      this.totalCount = msg.data.data.totalCount;
    });
  },
  methods: {
    xianluFun(query) {
      if (query !== "") {
        this.loading = true;
        Axios({
          method: "post",
          url: this.GLOBAL.AJAX_URL + "/v1/line/search-by-name?name=" + query,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(msg);
          this.lines = msg.data.data;
        });
      }
    },
    msgFun(val) {
      this.alarmQuery = false;
      if (this.creatAt !== null && this.creatAt[0] !== undefined) {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/picture/query?tower-id=" +
            this.towerId +
            "&page=" +
            val +
            "&size=8" +
            "&line-id=" +
            this.lineId +
            "&voltage-level=" +
            this.levelId +
            "&start-time=" +
            this.creatAt[0] +
            "&end-time=" +
            this.creatAt[1] +
            "&user-id=" +
            localStorage.getItem("userId"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
          this.pictures = msg.data.data.pictures;
          this.totalCount = msg.data.data.totalCount;
        });
      } else {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/picture/query?tower-id=" +
            this.towerId +
            "&page=" +
            val +
            "&size=8" +
            "&line-id=" +
            this.lineId +
            "&voltage-level=" +
            this.levelId +
            "&user-id=" +
            localStorage.getItem("userId"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
          this.pictures = msg.data.data.pictures;
          this.totalCount = msg.data.data.totalCount;
          //   this.$message.success("查询成功");
        });
      }
    },
    pageFun(val) {
      console.log(val);
      if (this.alarmQuery) {
        this.msgFunAlarm(val);
      } else {
        this.msgFun(val);
      }
    },
    towerFun(val) {
      if (this.lineId !== null) {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/line-tower/search-by-tower-num?line-id=" +
            this.lineId +
            "&tower-num=" +
            val,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
          this.towers = msg.data.data;
        });
      } else {
        this.$message.error("请选择线路");
      }
    },

    msgFunAlarm(val) {
      this.alarmQuery = true;
      if (this.creatAt !== null && this.creatAt[0] !== undefined) {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/alarm/query-alarm-image?order-by=created_at&order=desc&page=" +
            val +
            "&size=8" +
            "&line-name=" +
            this.lineName +
            "&voltage-level=" +
            this.levelId +
            "&start-time=" +
            this.creatAt[0] +
            "&end-time=" +
            this.creatAt[1] +
            "&tower-num=" +
            this.towerNum +
            "&user-id=" +
            localStorage.getItem("userId"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          this.pictures = msg.data.data.pictures;
          this.totalCount = msg.data.data.totalCount;
          //   this.$message.success("查询成功");
        });
      } else {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/alarm/query-alarm-image?order-by=created_at&order=desc&page=" +
            val +
            "&size=8" +
            "&line-name=" +
            this.lineName +
            "&voltage-level=" +
            this.levelId +
            "&tower-num=" +
            this.towerNum +
            "&user-id=" +
            localStorage.getItem("userId"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
          this.pictures = msg.data.data.pictures;
          this.totalCount = msg.data.data.totalCount;
          //   this.$message.success("查询成功");
        });
      }
    },
    test(val) {
      console.log(val);
    }
  }
};
</script>
