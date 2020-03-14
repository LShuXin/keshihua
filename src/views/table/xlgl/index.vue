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
      <el-col :span="4" :offset="2">
        <span>电压等级：</span>
        <el-select v-model="dianyaId" placeholder="选择电压等级" size="mini" clearable>
          <el-option v-for="item in dianyas" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="2">
        <span>线路名称：</span>
        <el-select clearable v-model="xianluId" placeholder="选择线路名" size="mini" filterable remote :remote-method="xianluFun">
          <el-option v-for="item in xianlus" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="primary" size="mini" icon="el-icon-search" @click="chaxun">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="tianjia">添加</el-button>
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
    <el-table :data="tableData" :highlight-current-row="true">
      <el-table-column type="selection" width="30px"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="单位" property="companyName"></el-table-column>
      <el-table-column label="部门" property="departmentName"></el-table-column>

      <el-table-column label="电压等级">
        <template slot-scope="scope">
          <span>{{scope.row.voltageLevelName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="线路名" property="lineName"></el-table-column>
      <el-table-column label="备注信息" property="desc"></el-table-column>
      <el-table-column label="排序号" property="orderNo"></el-table-column>
      <el-table-column label="运行状态" property="status">
        <template slot-scope="status">
          <span v-if="status.row.status === '1'">运行中</span>
          <span v-else style="color:#d0d0d0">停运</span>
        </template>
      </el-table-column>

      <el-table-column label="建成日期">
        <template slot-scope="date">
          <span v-if="date.row.createdAt === '未安装'" style="color:#d0d0d0">{{date.row.createdAt}}</span>
          <span v-else>{{date.row.createdAt | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新日期">
        <template slot-scope="date">
          <span v-if="date.row.updatedAt === '未安装'" style="color:#d0d0d0">{{date.row.updatedAt}}</span>
          <span v-else>{{date.row.updatedAt | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope" style="text-alin">
          <router-link :to="{path:'/table/xzgt',query:{id:scope.row.lineId}}">
            <el-button size="mini" type="primary">关联杆塔</el-button>
          </router-link>

          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" @current-change="pageChange" id="el-pagination"></el-pagination>
  </el-main>
  <!-- 添加 -->
  <el-dialog title="添加线路" :visible.sync="dialogFormVisible" width="30%">
    <el-form :model="form">
      <el-form-item label="线路名称：" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入线路名"></el-input>
      </el-form-item>
      <el-form-item label="电压等级：" :label-width="formLabelWidth">
        <el-select v-model="form.voltageLevel">
          <el-option v-for="item in dianyas" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序号：" :label-width="formLabelWidth">
        <el-input v-model="form.orderNo" placeholder="请输入排序号"></el-input>
      </el-form-item>
      <el-form-item label="起始杆塔号：" :label-width="formLabelWidth">
        <el-input v-model="form.startTowerNum" placeholder="请输入起始杆塔号"></el-input>
      </el-form-item>
      <el-form-item label="终止杆塔号：" :label-width="formLabelWidth">
        <el-input v-model="form.endTowerNum" placeholder="请输入终止杆塔号"></el-input>
      </el-form-item>
      <el-form-item label="运行状态：" :label-width="formLabelWidth">
        <el-select v-model="form.status">
          <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属公司：" :label-width="formLabelWidth">
        <el-select v-model="form.companyId" placeholder="请选择所属公司" @change="bumenFun">
          <el-option v-for="item in gongsis" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门：" :label-width="formLabelWidth">
        <el-select v-model="form.departmentId" placeholder="请选择所属部门">
          <el-option v-for="item in departments" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息：" :label-width="formLabelWidth">
        <el-input v-model="form.desc" placeholder="请输入备注信息"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="lineCreateTrue">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 删除 -->

  <el-dialog id="delBox" title="删除线路" :visible.sync="delBox" width="30%" style="color:#F56C6C;">
    <span>确定删除此线路吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delBox = false">取 消</el-button>
      <el-button type="primary" @click="delTrue">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 修改 -->
  <el-dialog title="修改信息" :visible.sync="xgBox" width="30%">
    <el-form :model="xgform">
      <el-form-item label="线路名称：" :label-width="formLabelWidth">
        <el-input v-model="xgform.name"></el-input>
      </el-form-item>
      <el-form-item label="电压等级：" :label-width="formLabelWidth">
        <el-select v-model="xgform.voltageLevel">
          <el-option v-for="item in dianyas" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序号：" :label-width="formLabelWidth">
        <el-input v-model="xgform.orderNo"></el-input>
      </el-form-item>
      <el-form-item label="起始杆塔号：" :label-width="formLabelWidth">
        <el-input v-model="xgform.startTowerNum" placeholder="请输入起始杆塔号"></el-input>
      </el-form-item>
      <el-form-item label="终止杆塔号：" :label-width="formLabelWidth">
        <el-input v-model="xgform.endTowerNum" placeholder="请输入终止杆塔号"></el-input>
      </el-form-item>
      <el-form-item label="线路状态：" :label-width="formLabelWidth">
        <el-select v-model="xgform.status" placeholder>
          <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属公司：" :label-width="formLabelWidth">
        <el-select v-model="xgform.companyId" placeholder="请选择所属公司" @change="bumenFun">
          <el-option v-for="item in gongsis" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门：" :label-width="formLabelWidth">
        <el-select v-model="xgform.departmentId" placeholder="请选择所属部门">
          <el-option v-for="item in departments" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息：" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" v-model="xgform.desc" placeholder="备注信息"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="xgBox = false">取 消</el-button>
      <el-button type="primary" @click="xgTrue">确 定</el-button>
    </div>
  </el-dialog>
  <!-- <router-view /> -->
</el-container>
</template>
<style lang="scss" scoped>
.el-header {
    height: auto !important;
    padding: 20px 10px;
    span {
        font-size: 14px;
    }
}
#delBox {
    >  >  > .el-dialog__title {
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
import {
  parseTime
} from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      gongsiId: "",
      gongsis: [],
      dianyaId: "",
      dianyas: this.LABEL_DATA.VOLTAGE_LEVEL,
      xianluId: "",
      xianlus: [],
      natures: [{
          id: 1,
          name: "耐张塔"
        },
        {
          id: 2,
          name: "直线塔"
        }
      ],
      natureId: "",
      name: "",
      statuss: [{
          id: 1,
          name: "运行中"
        },
        {
          id: 0,
          name: "未运行"
        }
      ],
      statusId: "",
      towers: [],
      towerId: "",
      yinhuanId: "",
      yinhuans: [],
      dialogFormVisible: false, //修改框显示
      page: 1, //页数
      total: 1, //总条数
      form: {
        name: "",
        desc: "",
        voltageLevel: "",
        companyId: "",
        departmentId: "",
        orderNo: "",
        status: "",
        startTowerNum: "",
        endTowerNum: "",

      },
      companys: [],
      departments: [],
      teams: [],
      towerCategorys: [],
      localizations: [],
      parentRisks: [],
      riskIds: [],
      towerTypeIds: [],

      xgform: {
        id: "",
        name: "",
        desc: "",
        voltageLevel: "",
        companyId: "",
        departmentId: "",
        orderNo: "",
        status: "",
        startTowerNum: "",
        endTowerNum: "",
      },
      formLabelWidth: "120px",
      loading: false,
      delBox: false,
      delId: 0,
      xgBox: false,
      loading: false,
      localizationLoading: false
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
  },

  methods: {
    test(val) {
      console.log(val);
      console.log(this.form.towerCreatedAt);
    },

    oneMsg() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line/query-detail?order-by=line.id&order=asc&page=" +
          this.page +
          "&size=10",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.tableData = msg.data.data.lines;
        this.total = msg.data.data.totalCount;
      });
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
    // dianyaFun() {
    //   Axios({
    //     method: "post",
    //     url: this.GLOBAL.AJAX_URL+"/v1/voltage-level/get-no-limit",
    //     headers: {
    //       Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
    //     }
    //   }).then(msg => {
    //     console.log(msg);
    //     this.dianyas = msg.data.data;
    //   });
    // },
    // xianluFun(query) {
    //   if (query !== "") {
    //     this.loading = true;
    //     Axios({
    //       method: "post",
    //       url: this.GLOBAL.AJAX_URL+"/v1/line/search-by-name?name=" + query,
    //       headers: {
    //         Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
    //       }
    //     }).then(msg => {
    //       // console.log(msg);
    //       this.xianlus = msg.data.data;
    //     });
    //   }
    // },
    handleEdit(index, row) {
      console.log(row);
      this.xgform.id = Number(row.lineId);
      this.xgform.orderNo = Number(row.orderNo);
      this.xgform.status = Number(row.status);
      this.xgform.voltageLevel = Number(row.voltageLevel)
      this.xgform.companyId = Number(row.companyId)
      this.xgform.departmentId = Number(row.departmentId)
      this.xgform.startTowerNum = row.startTowerNum
      this.xgform.endTowerNum = row.endTowerNum
      this.xgform.name = row.lineName;
      this.xgform.desc = row.desc;
      this.bumenFun(this.xgform.companyId)
      this.xgBox = true;
    },
    xgTrue() {
      this.xgform.orderNo = Number(this.xgform.orderNo);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line/update",
        data: this.xgform,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 0 && msg.data.data.rowsAffected != 0) {
          this.pageChange(this.page);
          this.xgBox = false;
          this.$message.success("修改成功");
        } else {
          this.xgBox = false;
          this.$message.error("修改失败");
        }
      });
    },
    handleDelete(index, row) {
      this.delId = row.lineId;
      this.delBox = true;
    },
    delTrue() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line/delete?id=" + this.delId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 0 && msg.data.data.rowsAffected != 0) {
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

    tianjia() {
      this.dialogFormVisible = true;
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
    lineCreateTrue() {
      this.form.orderNo = Number(this.form.orderNo);
      this.form.status = Number(this.form.status);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line/create",
        data: this.form,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        if (msg.data.code === 0) {
          this.oneMsg();
          this.dialogFormVisible = false;
          this.$message.success("创建成功");
          this.form.name = "";
          this.form.desc = "";
          this.form.voltageLevel = "";
          this.form.companyId = "";
          this.form.departmentId = "";
          this.form.orderNo = "";
          this.form.startTowerNum = "";
          this.form.endTowerNum = "";
        } else {
          this.dialogFormVisible = false;
          this.$message.error("创建失败");
        }
      });
    },
    bumenFun(val) {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/department/get-no-limit-by-company-id?company-id=" +
          val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.departments = msg.data.data;
      });
    },
    glgt(index, row) {
      console.log(row);
    },
    chaxun() {
      this.page = 1;
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line/query-detail?order-by=line.id&order=asc&page=" +
          this.page +
          "&size=8" +
          "&company-id=" +
          this.gongsiId +
          "&voltage-level=" +
          this.dianyaId +
          "&name=" +
          this.xianluId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);

        this.tableData = msg.data.data.lines;
        this.total = msg.data.data.totalCount;
        this.$message.success("查询成功");
      });
    }
  }
};
</script>
