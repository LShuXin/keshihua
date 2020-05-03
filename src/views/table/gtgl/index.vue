<template>
  <el-container>
    <el-header>
      <!-- 搜索框和button -->
      <el-row :gutter="10">
        <el-col :span="4">
          <span>杆塔性质：</span>
          <el-select v-model="natureId" placeholder="选择杆塔性质" size="mini" clearable>
            <el-option v-for="item in natures" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>杆塔类型：</span>
          <el-select v-model="towerId" placeholder="杆塔类型" size="mini" clearable>
            <el-option v-for="item in towers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>杆塔状态：</span>
          <el-select clearable v-model="statusId" placeholder="选择杆塔状态" size="mini">
            <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-row :gutter="10">
            <el-col :span="24">
              <span>杆塔号：</span>
              <el-input
                v-model="name"
                placeholder="请输入杆塔号"
                size="mini"
                style="width:178px;"
                clearable
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="chaxun">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="tianjia">添加</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" icon="el-icon-download" @click="daochu">导出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" :highlight-current-row="true" header-row-class-name="rowtitle">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="单位" property="companyName">
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
        <el-table-column label="排序号" property="orderNo"></el-table-column>
        <el-table-column label="杆塔型号" prop="towerTypeName">
          <!-- <template slot-scope="sim" :prop="towerTypeName">
            <span v-if="sim.row.simNum ==='未绑定 SIM 卡'" style="color:#d0d0d0;">{{sim.row.simNum}}</span>
            <span v-else>{{sim.row.simNum}}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="杆塔性质" property="nature">
          <!-- <template slot-scope="simProvider">
            <span
              v-if="simProvider.row.simProvider ==='未绑定 SIM 卡'"
              style="color:#d0d0d0;"
            >{{simProvider.row.simProvider}}</span>
            <span v-else>{{simProvider.row.simProvider }}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="杆塔材质" property="towerCategoryName"></el-table-column>
        <el-table-column label="杆塔状态" property="status"></el-table-column>
        <el-table-column label="隐患类型" property="parentRiskName"></el-table-column>
        <el-table-column label="隐患详情" property="riskName"></el-table-column>
        <el-table-column label="运维班组" property="teamName"></el-table-column>
        <!-- <el-table-column label="负责人" property="departmentName"></el-table-column> -->
        <el-table-column label="位置描述" property="address"></el-table-column>
        <el-table-column label="建成日期">
          <template slot-scope="date">
            <span
              v-if="date.row.towerCreatedAt === '未安装'"
              style="color:#d0d0d0"
            >{{date.row.towerCreatedAt}}</span>
            <span v-else>{{date.row.towerCreatedAt | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope" style="text-alin">
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
        id="el-pagination"
      ></el-pagination>
    </el-main>
    <!-- 添加 -->
    <el-dialog title="添加杆塔" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="form">
        <el-form-item label="公司信息：" :label-width="formLabelWidth" required>
          <span>所属公司：</span>
          <el-select v-model="form.companyId" placeholder="请选择所属公司" @change="bumen">
            <el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span style="margin-left:10px;">所属部门：</span>
          <el-select v-model="form.departmentId" placeholder="请选择所属部门" @change="banzu">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span style="margin-left:10px;">所属班组：</span>
          <el-select v-model="form.teamId" placeholder="请选择所属班组">
            <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>属地化：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-select
            v-model="form.localizationId"
            placeholder="请选择属地化"
            filterable
            remote
            :remote-method="localizationFun"
            :loading="localizationLoading"
          >
            <el-option
              v-for="item in localizations"
              :key="item.id"
              :label="item.companyName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="杆塔信息：" :label-width="formLabelWidth" required>
          <span>杆塔类型：</span>
          <el-select v-model="form.towerCategory" placeholder="请选择杆塔类型">
            <el-option v-for="item in towers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <span style="margin-left:10px;">杆塔型号：</span>
          <el-input v-model="form.towerType" placeholder="请输入杆塔型号" style="width:200px"></el-input>

          <span style="margin-left:10px;">杆塔性质：</span>
          <el-select v-model="form.nature" placeholder="请选择杆塔性质">
            <el-option v-for="item in natures" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span style>杆塔状态：</span>
          <el-select v-model="form.status" placeholder="请选择杆塔状态">
            <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span style="margin-left:10px">所属线路：</span>
          <el-select
            v-model="form.lineId"
            placeholder="请选择所属线路"
            filterable
            remote
            :remote-method="LineFun"
          >
            <el-option v-for="item in Lines" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span style="margin-left:10px">杆塔号：</span>
          <el-input v-model="form.towerNum" placeholder="请输入杆塔号"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>杆塔序号：</span>
          <el-input v-model="form.orderNo" placeholder="请输入杆塔序号(数字)"></el-input>
        </el-form-item>
        <el-form-item label="隐患信息：" :label-width="formLabelWidth" required>
          <span>隐患大类：</span>
          <el-select v-model="form.parentRiskId" placeholder="请选择隐患大类" @change="riskFun">
            <el-option
              v-for="item in parentRisks"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <span style="margin-left:10px;">隐患小类：</span>
          <el-select v-model="form.riskId" placeholder="请选择隐患小类">
            <el-option v-for="item in riskIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="其他信息：" :label-width="formLabelWidth" required>
          <span>责任人：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-select
            v-model="form.userId"
            filterable
            remote
            :remote-method="UserFun"
            placeholder="请选择责任人"
          >
            <el-option v-for="item in Users" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span style="margin-left:10px;">建成日期：</span>
          <el-date-picker
            v-model="form.towerCreatedAt"
            type="date"
            placeholder="选择日期"
            @change="test"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址信息：" :label-width="formLabelWidth" required>
          <span>经度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-input v-model="form.longitude" placeholder="请输入经度"></el-input>
          <span style="margin-left:10px;">纬度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-input v-model="form.latitude" placeholder="请输入纬度"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>具体位置：</span>
          <el-input type="textarea" :rows="2" v-model="form.address" placeholder="请输入具体位置"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="towerCreateTrue">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->

    <el-dialog id="delBox" title="删除杆塔" :visible.sync="delBox" width="30%" style="color:#F56C6C;">
      <span>确定删除此杆塔吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delBox = false">取 消</el-button>
        <el-button type="primary" @click="delTrue">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改信息" :visible.sync="xgBox" width="55%">
      <el-form :model="xgform">
        <el-form-item label="公司信息：" :label-width="formLabelWidth" required>
          <span>所属公司：</span>
          <el-select v-model="xgform.companyId" placeholder="请选择所属公司" @change="bumen">
            <el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span style="margin-left:10px;">所属部门：</span>
          <el-select v-model="xgform.departmentId" placeholder="请选择所属部门" @change="banzu">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span style="margin-left:10px;">所属班组：</span>
          <el-select v-model="xgform.teamId" placeholder="请选择所属班组">
            <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>属地化：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-select
            v-model="xgform.localizationId"
            placeholder="请选择属地化"
            filterable
            remote
            :remote-method="localizationFun"
            :loading="localizationLoading"
          >
            <el-option
              v-for="item in localizations"
              :key="item.id"
              :label="item.companyName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="杆塔信息：" :label-width="formLabelWidth" required>
          <span>杆塔类型：</span>
          <el-select v-model="xgform.towerCategory" placeholder="请选择杆塔类型">
            <el-option v-for="item in towers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <span style="margin-left:10px;">杆塔型号：</span>
          <el-input v-model="xgform.towerType" placeholder="请输入杆塔型号" style="width:200px"></el-input>

          <span style="margin-left:10px;">杆塔性质：</span>
          <el-select v-model="xgform.nature" placeholder="请选择杆塔性质">
            <el-option v-for="item in natures" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span style>杆塔状态：</span>
          <el-select v-model="xgform.status" placeholder="请选择杆塔状态">
            <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span>所属线路：</span>
          <el-select
            v-model="xgform.lineId"
            placeholder="请选择所属线路"
            filterable
            remote
            :remote-method="LineFun"
          >
            <el-option v-for="item in Lines" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span style="margin-left:10px">杆塔号：</span>
          <el-input v-model="xgform.towerNum" placeholder="请输入杆塔号"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>杆塔序号：</span>
          <el-input v-model="xgform.orderNo" placeholder="请输入杆塔序号(数字)"></el-input>
        </el-form-item>
        <el-form-item label="隐患信息：" :label-width="formLabelWidth" required>
          <span>隐患大类：</span>
          <el-select v-model="xgform.parentRiskId" placeholder="请选择隐患大类" @change="riskFun">
            <el-option
              v-for="item in parentRisks"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <span style="margin-left:10px;">隐患小类：</span>
          <el-select v-model="xgform.riskId" placeholder="请选择隐患小类">
            <el-option v-for="item in riskIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="其他信息：" :label-width="formLabelWidth" required>
          <span>责任人：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-select
            v-model="xgform.userId"
            filterable
            remote
            :remote-method="XgUserFun"
            placeholder="请选择责任人"
          >
            <el-option v-for="item in Users" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span style="margin-left:10px;">建成日期：</span>
          <el-date-picker
            v-model="xgform.towerCreatedAt"
            type="date"
            placeholder="选择日期"
            @change="test"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址信息：" :label-width="formLabelWidth" required>
          <span>经度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-input v-model="xgform.longitude" placeholder="请输入经度"></el-input>
          <span style="margin-left:10px;">纬度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-input v-model="xgform.latitude" placeholder="请输入纬度"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>具体位置：</span>
          <el-input type="textarea" :rows="2" v-model="xgform.address" placeholder="请输入具体位置"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="xgBox = false">取 消</el-button>
        <el-button type="primary" @click="xgTrue">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<style lang="scss" scoped>
.el-table >>> {
  .rowtitle {
    .cell {
      color: #1ca3ff;
      padding: 0 14px !important;
      width: auto !important;
    }
  }
  .el-table-column--selection .cell {
    padding-left: 14px;
  }
}
.el-header {
  height: auto !important;
  padding: 20px 10px;
  span {
    font-size: 14px;
  }
}
#delBox {
  >>> .el-dialog__title {
    color: #f56c6c;
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
</style>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import { parseTime } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      natures: this.LABEL_DATA.TOWER_NATURE,
      natureId: "",
      name: "",
      statuss: this.LABEL_DATA.DEVICE_OPERATING_STATUS,
      statusId: "",
      towers: this.LABEL_DATA.TOWER_CATEGORY,
      towerId: "",
      yinhuanId: "",
      yinhuans: [],
      dialogFormVisible: false, //修改框显示
      page: 1, //页数
      total: 1, //总条数
      form: {
        companyId: "",
        departmentId: "",
        teamId: "",
        towerCategory: "",
        riskId: "",
        localizationId: "",
        parentRiskId: "",
        towerType: "",
        address: "",
        longitude: "",
        latitude: "",
        userId: "",
        towerCreatedAt: "",
        status: "",
        orderNo: "",
        lineId: "",
        towerNum: "",
        nature: ""
      },
      companys: [],
      departments: [],
      teams: [],
      // towerCategorys: [],
      localizations: [],
      parentRisks: [],
      riskIds: [],
      towerTypeIds: [],

      xgform: {
        id: "",
        companyId: "",
        departmentId: "",
        teamId: "",
        towerCategory: "",
        riskId: "",
        localizationId: "",
        parentRiskId: "",
        towerType: "",
        address: "",
        longitude: "",
        latitude: "",
        userId: "",
        towerCreatedAt: "",
        status: "",
        orderNo: "",
        lineId: "",
        towerNum: "",
        nature: ""
      },
      formLabelWidth: "120px",
      loading: false,
      delBox: false,
      delId: 0,
      xgBox: false,
      loading: false,
      localizationLoading: false,
      Users: [],
      Lines: []
    };
  },
  filters: {
    parseTime: parseTime
  },
  mounted() {
    //获取设备信息
    // console.log(this.LABEL_DATA.TOWER_CATEGORY);
    this.oneMsg();
    // this.towerFun();
  },

  methods: {
    test(val) {
      // console.log(val);
      // console.log(this.form.towerCreatedAt);
    },

    oneMsg() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/tower/query-detail?user-id=" +
          localStorage.getItem("userId") +
          "&order-by=tower.id&order=asc&page=" +
          this.page +
          "&size=8",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.tableData = msg.data.data.towers;
        this.total = msg.data.data.totalCount;
      });
    },
    handleEdit(index, row) {
      this.companyFun();
      this.riskBigFun();
      this.LineFun(row.lineId);
      // console.log(row);
      this.xgform.id = Number(row.towerId);
      this.xgform.companyId = Number(row.companyId);
      this.xgform.departmentId = Number(row.departmentId);
      this.xgform.teamId = Number(row.teamId);
      this.xgform.riskId = Number(row.riskId);
      this.xgform.localizationId = new Date(row.localizationId);
      this.xgform.orderNo = row.orderNo;
      this.xgform.principal = row.principal;
      this.xgform.localizationId = Number(row.localizationId);
      this.xgform.towerType = row.towerTypeName;
      this.xgform.parentRiskId = Number(row.parentRiskId);
      this.xgform.userId = Number(row.userId);
      this.xgform.towerCreatedAt = row.towerCreatedAt;
      this.xgform.longitude = row.longitude;
      this.xgform.latitude = row.latitude;
      this.xgform.address = row.address;
      this.xgform.towerNum = row.towerNum;
      this.xgform.lineId = Number(row.lineId);
      this.bumen(this.xgform.companyId);
      this.banzu(this.xgform.departmentId);
      this.localizationFun(" ");
      this.riskFun(this.xgform.parentRiskId);
      this.XgUserFun(" ");
      if (row.nature === "耐张") {
        this.xgform.nature = 1;
      } else {
        this.xgform.nature = 2;
      }
      if (row.status === "有效") {
        this.xgform.status = 1;
      } else {
        this.xgform.status = 0;
      }
      if (row.towerCategoryName === "角钢塔") {
        this.xgform.towerCategory = 1;
      } else {
        this.xgform.towerCategory = 2;
      }
      this.xgform.address = row.address;
      this.xgBox = true;
    },
    xgTrue() {
      this.xgform.orderNo = Number(this.xgform.orderNo);
      this.xgform.towerCreatedAt =
        this.xgform.towerCreatedAt + "T00:00:00.000Z";
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/tower/update",
        data: this.xgform,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        this.xgBox = false;
        if (msg.data.code === 0) {
          if (msg.data.data.rowsAffected != 0) {
            this.pageChange(this.page);
            this.$message.success("修改成功");
          } else {
            this.$message.warning("未修改");
          }
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    handleDelete(index, row) {
      this.delId = row.towerId;
      this.delBox = true;
    },
    delTrue() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/tower/delete?id=" + this.delId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
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
      // console.log(index);
      this.page = index;
      this.chaxun();
    },

    tianjia() {
      this.dialogFormVisible = true;
      this.companyFun();
      this.riskBigFun();
    },
    companyFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/company/get-no-limit",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.companys = msg.data.data;
      });
    },

    riskBigFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/risk/get-parent-risk",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.parentRisks = msg.data.data;
      });
    },
    //隐患小类
    riskFun(val) {
      this.form.riskId = "";
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/risk/get-risk-by-parent-id?parent-id=" +
          val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.riskIds = msg.data.data;
      });
    },

    //选择部门
    bumen(val) {
      // console.log(val);
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/department/get-no-limit-by-company-id?company-id=" +
          val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.departments = msg.data.data;
      });
    },
    //选择班组
    banzu(val) {
      this.form.teamId = "";
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/team/get-no-limit-by-department-id?department-id=" +
          val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        this.teams = msg.data.data;
      });
    },
    //属地化信息
    localizationFun(query) {
      if (query != "") {
        this.localizationLoading = true;
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/localization/search-by-company-name?company-name=" +
            query,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(msg);
          this.localizations = msg.data.data;
          this.localizationLoading = false;
        });
      }
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
        });
      }
    },
    towerCreateTrue() {
      this.form.orderNo = Number(this.form.orderNo);
      // console.log(this.form.companyId);
      switch ("") {
        case this.form.companyId:
          this.$message.error("未选择公司");
          break;
 case this.form.departmentId:
          this.$message.error("未选择部门");
          break;
           case this.form.teamId:
          this.$message.error("未选择班组");
          break;
           case this.form.localizationId:
          this.$message.error("未选择属地化");
          break;
           case this.form.towerCategory:
          this.$message.error("未选择杆塔类型");
          break;
           case this.form.towerType:
          this.$message.error("未选择杆塔型号");
          break;
           case this.form.nature:
          this.$message.error("未选择杆塔性质");
          break;
           case this.form.status:
          this.$message.error("未选择杆塔状态");
          break;
           case this.form.lineId:
          this.$message.error("未选择所属线路");
          break;
           case this.form.towerNum:
          this.$message.error("未输入杆塔号");
          break;
           case this.form.orderNo:
          this.$message.error("未选择输入杆塔序号");
          break;
           case this.form.parentRiskId:
          this.$message.error("未选择隐患大类");
          break;
           case this.form.riskId:
          this.$message.error("未选择隐患小类");
          break;
           case this.form.userId:
          this.$message.error("未选择责任人");
          break;
           case this.form.towerCreatedAt:
          this.$message.error("未选择建成日期");
          break;
           case this.form.latitude:
          this.$message.error("未输入纬度");
          break;
           case this.form.longitude:
          this.$message.error("未输入经度");
          break;  
          case this.form.address:
          this.$message.error("未输入具体位置");
          break;
          
        default:
          Axios({
            method: "post",
            url:
              this.GLOBAL.AJAX_URL +
              "/v1/tower/create?user-id=" +
              localStorage.getItem("userId"),
            data: this.form,
            headers: {
              Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
            }
          }).then(msg => {
            // console.log(msg);
            if (msg.data.code === 0) {
              this.oneMsg();
              this.dialogFormVisible = false;
              this.$message.success("创建成功");
              Object.keys(this.form).forEach(key => (this.form[key] = ""));
              // console.log(this.form);
            } else {
              this.dialogFormVisible = false;
              this.$message.error("创建失败");
              // console.log(this.form);
              Object.keys(this.form).forEach(key => (this.form[key] = ""));
              // console.log(this.form);
            }
          });
          break;
      }
    },
    UserFun(val) {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/user/search-users-by-team-id?team-id=" +
          this.form.teamId +
          "&key-world=" +
          val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.Users = msg.data.data.users;
      });
    },
    XgUserFun(val) {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/user/search-users-by-team-id?team-id=" +
          this.xgform.teamId +
          "&key-world=" +
          val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        this.Users = msg.data.data.users;
      });
    },

    LineFun(val) {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line/search-by-name?name=" + val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.Lines = msg.data.data;
      });
    },
    daochu() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/tower/export",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        window.location.href = msg.data.data;
      });
    },
    chaxun() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/tower/query-detail?user-id=" +
          localStorage.getItem("userId") +
          "&order-by=tower.id&order=asc&page=" +
          this.page +
          "&size=8" +
          "&nature=" +
          this.natureId +
          "&tower-category=" +
          this.towerId +
          "&status=" +
          this.statusId +
          "&name=" +
          this.name,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);

        this.tableData = msg.data.data.towers;
        this.total = msg.data.data.totalCount;
        this.$message.success("查询成功");
      });
    }
  }
};
</script>
