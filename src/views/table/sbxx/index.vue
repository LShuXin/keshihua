<template>
  <el-container>
    <el-header>
      <!-- 搜索框和button -->
      <el-row :gutter="10">
        <el-col :span="4">
          <span>公司名称：</span>
          <el-select v-model="gongsiId" placeholder="选择公司" size="mini" clearable>
            <el-option v-for="item in gongsis" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>电压等级：</span>
          <el-select v-model="dianyaId" placeholder="选择电压等级" size="mini" clearable>
            <el-option v-for="item in dianyas" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>线路名称：</span>
          <el-select
            clearable
            v-model="xianluId"
            placeholder="选择线路名"
            size="mini"
            filterable
            remote
            :remote-method="xianluFun"
          >
            <el-option v-for="item in xianlus" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <span>生产厂家：</span>
          <el-select v-model="changjiaId" placeholder="选择生产厂家" size="mini" clearable>
            <el-option v-for="item in changjias" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>隐患类型：</span>
          <el-select v-model="yinhuanId" placeholder="选择隐患类型" size="mini" clearable>
            <el-option v-for="item in yinhuans" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="chaxun">查询</el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="tianjia">添加</el-button>
          <el-button type="primary" size="mini" icon="el-icon-download" @click="daochu">导出</el-button>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10" style="margin-top:10px;">
        <el-col :span="2" :offset="6">
          <el-button type="primary" size="mini" icon="el-icon-plus">添加</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" size="mini">添加</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" size="mini">添加</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" size="mini">添加</el-button>
        </el-col>
      </el-row>-->
    </el-header>
    <el-main>
      <el-table :data="tableData" :highlight-current-row="true" header-row-class-name="rowtitle">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="公司" property="companyName" width="220px">
          <!-- <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.gongsi}}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="电压等级">
          <template slot-scope="scope">
            <!-- <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>-->
            <span>{{scope.row.voltageLevelName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="线路名" property="lineName"></el-table-column>
        <el-table-column label="杆塔号" property="towerNum"></el-table-column>
        <el-table-column label="安装方向" property="deviceInstallationLocationName"></el-table-column>
        <el-table-column label="SIM卡号" width="120px">
          <template slot-scope="sim">
            <span v-if="sim.row.simNum ==='未绑定 SIM 卡'" style="color:#d0d0d0;">{{sim.row.simNum}}</span>
            <span v-else>{{sim.row.simNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="网络类型" property="simProvider">
          <template slot-scope="simProvider">
            <span
              v-if="simProvider.row.simProvider ==='未绑定 SIM 卡'"
              style="color:#d0d0d0;"
            >{{simProvider.row.simProvider}}</span>
            <span v-else>{{simProvider.row.simProvider }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备编号" property="deviceCode"></el-table-column>
        <el-table-column label="生产厂家" property="manufactureName"></el-table-column>
        <el-table-column label="安装日期">
          <template slot-scope="date">
            <span
              v-if="date.row.deviceInstalledAt === '未安装'"
              style="color:#d0d0d0"
            >{{date.row.deviceInstalledAt}}</span>
            <span v-else>{{date.row.deviceInstalledAt | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="隐患类型" property="parentRiskName"></el-table-column>
        <el-table-column label="隐患详情" property="riskName"></el-table-column>
        <el-table-column label="运维单位" property="departmentName"></el-table-column>
        <el-table-column label="检测类型" property="deviceCategoryName"></el-table-column>
        <el-table-column label="设备型号" property="deviceType"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="8"
        @current-change="pageChange"
        style="float:right;margin-top:5px;"
      ></el-pagination>
    </el-main>

    <el-dialog title="新增设备" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="form">
        <el-form-item label="设备编码" :label-width="formLabelWidth" required>
          <el-input v-model="form.code" autocomplete="off" placeholder="请输入设备编码"></el-input>
          <label class="miniTitle trueClass">安裝日期</label>
          <el-date-picker
            v-model="form.installedAt"
            type="date"
            placeholder="请选择安装日期"
            @change="ATdate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="设备类型" :label-width="formLabelWidth" required>
          <el-select v-model="form.type" placeholder="请选择设备类型">
            <el-option v-for="item in formtypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">设备厂商</label>
          <el-select v-model="form.manufactureId" placeholder="请选择设备厂商">
            <el-option v-for="item in changjias" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">设备分类</label>
          <el-select v-model="form.deviceCategory" placeholder="请选择设备分类">
            <el-option
              v-for="item in deviceCategoryIds"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :model="form">
        <el-form-item label="电压等级" :label-width="formLabelWidth" required>
          <el-select v-model="form.voltageLevel" placeholder="请选择电压等级">
            <el-option v-for="item in dianyas" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">线路名称</label>
          <el-select
            clearable
            v-model="form.lineId"
            placeholder="请输入所属线路"
            filterable
            remote
            :remote-method="xianluFun"
          >
            <el-option v-for="item in xianlus" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">杆 塔 号</label>
          <el-select
            clearable
            v-model="form.towerId"
            placeholder="请输入杆塔号"
            filterable
            remote
            :remote-method="TowerFun"
          >
            <el-option
              v-for="item in towerNums"
              :key="item.towerId"
              :label="item.towerNum"
              :value="item.towerId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SIM卡号" :label-width="formLabelWidth" required>
          <el-select
            clearable
            v-model="form.simId"
            placeholder="请输入SIM卡号"
            filterable
            remote
            :remote-method="SIMFun"
          >
            <el-option v-for="item in SIMs" :key="item.id" :label="item.num" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">安装方向</label>
          <el-select clearable v-model="form.deviceInstallationLocation" placeholder="请选择安装方向">
            <el-option
              v-for="item in deviceLocation"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth" required>
          <el-select
            clearable
            v-model="form.departmentId"
            placeholder="请选择部门"
            filterable
            remote
            :remote-method="BuMenFun"
            @change="BanZuFun"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <label class="miniTitle trueClass">运维班组</label>
          <el-select
            clearable
            v-model="form.teamId"
            placeholder="请选择班组"
            filterable
            remote
            :remote-method="BanZuFun"
          >
            <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deviceTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改框 -->
    <el-dialog title="修改设备信息" :visible.sync="xgbool" width="width">
      <el-form :model="upData">
        <el-form-item label="设备类型" :label-width="formLabelWidth" required >
          <el-select v-model="upData.type" :placeholder="typeTxt">
            <el-option v-for="item in formtypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">设备厂商</label>
          <el-select v-model="upData.manufactureId" :placeholder="manufactureIdTxt">
            <el-option v-for="item in changjias" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">设备分类</label>
          <el-select v-model="upData.deviceCategory" :placeholder="deviceCategoryTxt">
            <el-option
              v-for="item in deviceCategoryIds"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电压等级" :label-width="formLabelWidth" required >
          <el-select v-model="upData.voltageLevel" :placeholder="voltageLevelTxt">
            <el-option v-for="item in dianyas" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">线路名称</label>
          <el-select
            clearable
            v-model="upData.lineId"
            :placeholder="lineIdTxt"
            filterable
            remote
            :remote-method="xianluFun"
          >
            <el-option v-for="item in xianlus" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">杆 塔 号</label>
          <el-select
            clearable
            v-model="upData.towerId"
            :placeholder="towerIdTxt"
            filterable
            remote
            :remote-method="TowerFun"
          >
            <el-option
              v-for="item in towerNums"
              :key="item.towerId"
              :label="item.towerNum"
              :value="item.towerId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SIM卡号" :label-width="formLabelWidth" required >
          <el-select
            clearable
            v-model="upData.simId"
            :placeholder="simIdTxt"
            filterable
            remote
            :remote-method="SIMFun"
            @change="test"
          >
            <el-option v-for="item in SIMs" :key="item.id" :label="item.num" :value="item.id"></el-option>
          </el-select>
          <label class="miniTitle trueClass">安装方向</label>
          <el-select
            clearable
            v-model="upData.deviceInstallationLocation"
            :placeholder="deviceInstallationLocationTxt"
          >
            <el-option
              v-for="item in deviceLocation"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth" required >
          <el-select
            clearable
            v-model="upData.departmentId"
            :placeholder="departmentIdTxt"
            filterable
            remote
            :remote-method="BuMenFun"
            @change="BanZuFun"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <label class="miniTitle trueClass">运维班组</label>
          <el-select
            clearable
            v-model="upData.teamId"
            :placeholder="teamIdTxt"
            filterable
            remote
            :remote-method="BanZuFun"
          >
            <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="xgbool = false">取 消</el-button>
        <el-button type="primary" @click="codeTrue">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog id="delBox" title="删除设备" :visible.sync="delBox" width="30%" style="color:#F56C6C;">
      <span>确定删除此设备吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delBox = false">取 消</el-button>
        <el-button type="primary" @click="delTrue">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<style lang="scss" scoped>
.el-table >>> {
  .rowtitle {
    .cell {
      color: #1ca3ff;
    }
  }
}
.el-header {
  height: auto !important;
  padding: 20px 10px;
  span {
    font-size: 14px;
  }
}
.el-main {
  padding: 0;
  .el-button--primary {
    margin-right: 10px;
  }
  .el-button--danger {
    margin-top: 10px;
    margin-left: 0 !important;
  }
  .el-pagination {
    position: absolute;
    bottom: 5px;
    right: 10px;
    float: right;
  }
}
.el-dialog {
  .el-input {
    width: 300px;
  }
}
#delBox {
  >>> .el-dialog__title {
    color: #f56c6c;
  }
}
.miniTitle {
  margin: 0 10px;
}
.trueClass::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import { parseTime } from "@/utils/index.js";
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      gongsis: [],
      gongsiId: "",
      dianyas: this.LABEL_DATA.VOLTAGE_LEVEL,
      dianyaId: "",
      xianlus: [],
      xianluId: "",
      changjias: [],
      changjiaId: "",
      yinhuanId: "",
      yinhuans: [],
      departments: [],
      teams: [],
      dialogFormVisible: false, //添加设备显示
      page: 1, //页数
      total: 1, //总条数
      form: {
        companyId: 1282,
        code: "", //添加设备Id
        type: "",
        manufactureId: "",
        deviceCategory: "",
        voltageLevel: "",
        lineId: "",
        installedAt: "",
        towerId: "",
        simId: "",
        departmentId: "",
        teamId: "",
        deviceInstallationLocation: ""
      },
      formLabelWidth: "120px",
      formtypes: this.LABEL_DATA.DEVICE_TYPE,
      deviceCategoryIds: this.LABEL_DATA.DEVICE_CATEGORY,
      loading: false,
      xgbool: false,
      delBox: false,
      delId: 0,
      deviceLocation: this.LABEL_DATA.DEVICE_POSITION,
      SIMs: [],
      departments: [],
      towerNums: "",
      upData: {
        // companyId:1282,
        id: "",
        manufactureId: "", //
        type: "", //
        deviceCategory: "", //
        simId: "", //
        departmentId: "", //
        teamId: "", //
        voltageLevel: "", //
        lineId: "",
        towerId: "",
        deviceInstallationLocation: ""
      },
      manufactureIdTxt: "",
      typeTxt: "",
      deviceCategoryTxt: "",
      simIdTxt: "",
      departmentIdTxt: "",
      teamIdTxt: "",
      voltageLevelTxt: "",
      lineIdTxt: "",
      towerIdTxt: "",
      deviceInstallationLocationTxt: "",
      rowDate: ""
    };
  },
  filters: {
    parseTime: parseTime
  },
  mounted() {
    //获取设备信息
    this.oneMsg();
    this.gongsiFun();
    // this.dianyaFun();
    this.changshangFun();
    this.yinhuanFun();
  },

  methods: {
    daochu() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/device/export",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        window.location.href = msg.data.data;
      });
    },
    test(val) {
      console.log(val);
      console.log(this.upData);
    },
    ATdate(val) {
      this.form.installedAt = moment(val).format("YYYY-MM-DD") + "T00:00:00Z";
    },
    oneMsg() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/device/query-detail?user-id=" +
          localStorage.getItem("userId") +
          "&order-by=device.created_at&order=asc&page=" +
          this.page +
          "&size=8",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.tableData = msg.data.data.devices;
        this.total = msg.data.data.totalCount;
      });
    },
    handleEdit(index, row) {
      this.rowDate = row;
      this.manufactureIdTxt = row.manufactureName;
      this.typeTxt = row.deviceType;
      this.deviceCategoryTxt = row.deviceCategoryName;
      this.simIdTxt = row.simNum;
      this.departmentIdTxt = row.departmentName;
      this.teamIdTxt = row.teamId;
      this.voltageLevelTxt = row.voltageLevelName;
      this.lineIdTxt = row.lineName;
      this.towerIdTxt = row.towerNum;
      this.deviceInstallationLocationTxt = row.deviceInstallationLocationName;
      this.xgbool = true;
      this.upData.id = "";
      this.upData.manufactureId = "";
      this.upData.type = "";
      this.upData.deviceCategory = "";
      this.upData.simId = "";
      this.upData.departmentId = "";
      this.upData.teamId = "";
      this.upData.voltageLevel = "";
      this.upData.lineId = "";
      this.upData.towerId = "";
      this.upData.deviceInstallationLocation = "";
      console.log(this.upData);
    },
    upDataFun() {
      // console.log(this.rowDate);
      if (this.upData.manufactureId === "") {
        this.upData.manufactureId = Number(this.rowDate.manufactureId);
      }
      if (this.upData.deviceCategory === "") {
        this.upData.deviceCategory = Number(this.rowDate.deviceCategory);
      }
      if (this.upData.departmentId === "") {
        this.upData.departmentId = Number(this.rowDate.departmentId);
      }
      if (this.upData.teamId === "") {
        this.upData.teamId = Number(this.rowDate.teamId);
      }
      if (this.upData.voltageLevel === "") {
        this.upData.voltageLevel = Number(this.rowDate.voltageLevel);
      }
      if (this.upData.towerId === "") {
        this.upData.towerId = Number(this.rowDate.towerId);
      }
      if (this.upData.type === "") {
        this.upData.type = Number(this.rowDate.type);
      }
      if (this.upData.simId === "") {
        this.upData.simId = Number(this.rowDate.simId);
      }
      if (this.upData.lineId === "") {
        this.upData.lineId = Number(this.rowDate.lineId);
      }
      if (this.upData.deviceInstallationLocation === "") {
        this.upData.deviceInstallationLocation = Number(
          this.rowDate.deviceInstallationLocation
        );
      }
    },
    codeTrue() {
      this.upDataFun();
      this.updatedAxios();
      console.log(this.rowDate);
      this.upData.id = Number(this.rowDate.deviceId);
      console.log(this.upData);
    },
    updatedAxios() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/device/update",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        },
        data: this.upData
      }).then(msg => {
        console.log(this.upData);
        console.log("测试");
        console.log(msg);
        if (msg.data.code === 0) {
          if (msg.data.data.rowsAffected != 0) {
            this.pageChange(this.page);
            this.xgbool = false;
            this.$message.success("修改成功");
          } else {
            this.$message.warning("未修改");
            this.xgbool = false;
          }
        } else {
          this.xgbool = false;
          this.$message.error("修改失败");
        }
      });
    },
    handleDelete(index, row) {
      this.delBox = true;
      this.delId = Number(row.deviceId);
      console.log(row);
    },
    delTrue() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/device/delete?id=" + this.delId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        if (msg.data.data.rowsAffected != 0) {
          this.pageChange(this.page);
          this.delBox = false;
          this.$message.success("删除成功");
        } else {
          this.delBox = false;
          this.$message.error("删除失败");
        }
      });
    },

    pageChange(index) {
      this.page = index;
      this.oneMsg();
    },
    gongsiFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/company/get-no-limit",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.gongsis = msg.data.data;
      });
    },
    tianjia() {
      this.dialogFormVisible = true;
      // Axios({
      //   method: "post",
      //   url:  this.GLOBAL.AJAX_URL+"/v1/device-category/get-no-limit",
      //   headers: {
      //     Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      //   }
      // }).then(msg => {
      //   // console.log(msg);
      //   this.deviceCategoryIds = msg.data.data;
      // });
    },
    // dianyaFun() {
    //   Axios({
    //     method: "post",
    //     url:  this.GLOBAL.AJAX_URL+"/v1/voltage-level/get-no-limit",
    //     headers: {
    //       Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
    //     }
    //   }).then(msg => {
    //     // console.log(msg);
    //     this.dianyas = msg.data.data;
    //   });
    // },
    changshangFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/manufacture/get-no-limit",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.changjias = msg.data.data;
      });
    },
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
          this.xianlus = msg.data.data;
          console.log(this.xianlus);
        });
      }
    },
    yinhuanFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/risk/get-parent-risk",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.yinhuans = msg.data.data;
      });
    },
    deviceTrue() {
      console.log(this.form);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/device/create",
        data: this.form,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        this.dialogFormVisible = false;
        console.log(msg);
        if (msg.data.code === 0) {
          this.$message.success("添加成功");
          this.oneMsg();
        }
      });
    },
    SIMFun(query) {
      if (query !== "") {
        this.loading = true;
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL + "/v1/sim/get-unused-sims?key-world=" + query,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          this.SIMs = msg.data.data.sims;
        });
      }
    },
    BuMenFun(query) {
      if (query !== "") {
        this.loading = true;
        Axios({
          method: "post",
          url: this.GLOBAL.AJAX_URL + "/v1/department/get-no-limit",
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
          this.departments = msg.data.data;
          // console.log(this.departments)
        });
      }
    },
    BanZuFun(query) {
      if (query !== "") {
        if (this.form.departmentId !== "") {
          this.loading = true;
          Axios({
            method: "post",
            url:
              this.GLOBAL.AJAX_URL +
              "/v1/team/get-no-limit-by-department-id?department-id=" +
              this.form.departmentId,
            headers: {
              Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
            }
          }).then(msg => {
            console.log(msg);
            this.teams = msg.data.data;
            // console.log(this.departments)
          });
        } else {
          if (this.upData.departmentId !== "") {
            this.loading = true;
            Axios({
              method: "post",
              url:
                this.GLOBAL.AJAX_URL +
                "/v1/team/get-no-limit-by-department-id?department-id=" +
                this.upData.departmentId,
              headers: {
                Authorization:
                  "Bearer " + Cookies.get("vue_admin_template_token")
              }
            }).then(msg => {
              console.log(msg);
              this.teams = msg.data.data;
              // console.log(this.departments)
            });
          } else {
            this.$message.error("请先选择部门");
          }
        }
      }
    },
    TowerFun(query) {
      if (query !== "") {
        if (this.form.lineId !== "") {
          this.loading = true;
          Axios({
            method: "post",
            url:
              this.GLOBAL.AJAX_URL +
              "/v1/line-tower/search-by-tower-num?line-id=" +
              this.form.lineId +
              "&tower-num=" +
              query,
            headers: {
              Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
            }
          }).then(msg => {
            // console.log(msg);
            this.towerNums = msg.data.data;
            // console.log(this.departments)
          });
        } else {
          if (this.upData.lineId !== "") {
            this.loading = true;
            Axios({
              method: "post",
              url:
                this.GLOBAL.AJAX_URL +
                "/v1/line-tower/search-by-tower-num?line-id=" +
                this.upData.lineId +
                "&tower-num=" +
                query,
              headers: {
                Authorization:
                  "Bearer " + Cookies.get("vue_admin_template_token")
              }
            }).then(msg => {
              // console.log(msg);
              this.towerNums = msg.data.data;
              // console.log(this.departments)
            });
          } else {
            this.$message.error("请先选择线路");
          }
        }
      }
    },

    chaxun() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/device/query-detail?user-id=" +
          localStorage.getItem("userId") +
          "&order-by=device.created_at&order=asc&page=" +
          this.page +
          "&size=8" +
          "&company-id=" +
          this.gongsiId +
          "&voltage-level=" +
          this.dianyaId +
          "&line-id=" +
          this.xianluId +
          "&manufacture-id=" +
          this.changjiaId +
          "&risk-id=" +
          this.yinhuanId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.tableData = msg.data.data.devices;
        this.total = msg.data.data.totalCount;
        console.log(this.dianyas);
      });
    }
  }
};
</script>
