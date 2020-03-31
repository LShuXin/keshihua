<template>
  <el-container>
    <el-header>
      <el-row :gutter="10">
        <el-col :span="4">
          <span>部门名称：</span>
          <el-select v-model="departmentId" placeholder="请选择部门" size="mini" clearable>
            <el-option v-for="item in bumens" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>运营商：</span>
          <el-select v-model="providerId" placeholder="请选择运营商" size="mini" clearable>
            <el-option v-for="item in providers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>电话号码：</span>
          <el-input v-model="phoneNum" placeholder="请输入手机号码" size="mini" style="width:178px;" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <span>使用情况：</span>
          <el-select v-model="statusId" placeholder="请选择使用情况" size="mini" clearable>
            <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>质保情况：</span>
          <el-select v-model="expiredId" placeholder="请选择质保情况" size="mini" clearable>
            <el-option v-for="item in expireds" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="chaxun">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="tianjia">添加</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" highlight-current-row>
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column property="departmentName" label="公司"></el-table-column>
        <el-table-column property="cityName" label="属地化"></el-table-column>
        <el-table-column property="providerName" label="运营商"></el-table-column>
        <el-table-column property="num" label="电话号码"></el-table-column>
        <el-table-column property="orderNo" label="序号"></el-table-column>
        <el-table-column label="使用状态">
          <template slot-scope="statusId">
            <span v-if="statusId.row.status === '1'">使用中</span>
            <span v-else style="color:'#d0d0d0'">未使用</span>
          </template>
        </el-table-column>
        <el-table-column property="deviceId" label="设备ID"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="createAts">
            <!-- <span>{{createAts.row.createAt | parseTime('{y}-{m}-{d}')}} </span> -->
            <span>{{createAts.row.createdAt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="createAts">
            <!-- <span>{{createAts.row.createAt | parseTime('{y}-{m}-{d}')}} </span> -->
            <span>{{createAts.row.updatedAt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="质保到期时间">
          <template slot-scope="createAts">
            <!-- <span>{{createAts.row.createAt | parseTime('{y}-{m}-{d}')}} </span> -->
            <span>{{createAts.row.expiredAt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="data">
            <el-button size="mini" type="primary" @click="xg(data.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="del(data.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        @current-change="pageChange"
        style="float:right;margin-top:5px;"
      ></el-pagination>
    </el-main>
    <!-- 添加SIM卡 -->
    <el-dialog title="添加SIM卡" :visible.sync="tjBox" width="30%">
      <el-form :model="tjform">
        <el-form-item label="电话号码：" :label-width="formWidth">
          <el-input v-model="tjform.num" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="属地城市：" :label-width="formWidth">
          <el-input v-model="tjform.cityName" placeholder="请输入属地城市"></el-input>
        </el-form-item>
        <el-form-item label="运营商：" :label-width="formWidth">
          <el-select v-model="tjform.provider" placeholder="请选择运营商">
            <el-option v-for="item in providers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门：" :label-width="formWidth">
          <el-select v-model="tjform.departmentId" placeholder="请选择所属部门" clearable>
            <el-option v-for="item in bumens" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流量到期时间：" :label-width="formWidth">
          <el-date-picker v-model="tjform.expiredAt" type="date" placeholder="请选择流量到期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="序号：" :label-width="formWidth">
          <el-input v-model="tjform.orderNo" placeholder="请输入数字序号" @change="valNum"></el-input>
        </el-form-item>
        <el-form-item label="使用情况：" :label-width="formWidth">
          <el-select v-model="tjform.status" placeholder="请选择使用情况" clearable>
            <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="tjBox = false">取 消</el-button>
        <el-button type="primary" @click="tjTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除SIM卡 -->
    <el-dialog id="delBox" title="删除SIM卡" :visible.sync="delBox" width="30%">
      <div>确定删除该SIM卡吗？</div>
      <div slot="footer">
        <el-button @click="delBox = false">取 消</el-button>
        <el-button type="primary" @click="delTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改SIM卡信息" :visible.sync="xgBox" width="30%">
      <el-form :model="xgform">
        <el-form-item label="电话号码：" :label-width="formWidth">
          <el-input v-model="xgform.num" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="属地城市：" :label-width="formWidth">
          <el-input v-model="xgform.cityName" placeholder="请输入属地城市"></el-input>
        </el-form-item>
        <el-form-item label="运营商：" :label-width="formWidth">
          <el-select v-model="xgform.provider" placeholder="请选择运营商">
            <el-option v-for="item in providers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门：" :label-width="formWidth">
          <el-select v-model="xgform.departmentId" placeholder="请选择所属部门" clearable>
            <el-option v-for="item in bumens" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流量到期时间：" :label-width="formWidth">
          <el-date-picker v-model="xgform.expiredAt" type="date" placeholder="请选择流量到期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="序号：" :label-width="formWidth">
          <el-input v-model="xgform.orderNo" placeholder="请输入数字序号" @change="valNum"></el-input>
        </el-form-item>
        <el-form-item label="使用情况：" :label-width="formWidth">
          <el-select v-model="xgform.status" placeholder="请选择使用情况" clearable>
            <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="xgfalse" size="mini">取 消</el-button>
        <el-button type="primary" @click="xgTrue" size="mini">确 定</el-button>
      </div>
    </el-dialog>
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
      departmentId: "",
      bumens: [],
      phoneNum: "",
      providerId: "",
      providers: this.LABEL_DATA.SIM_PROVIDER,
      statusId: "",
      statuss: [
        {
          id: 1,
          name: "使用中"
        },
        {
          id: 0,
          name: "未使用"
        }
      ],
      expiredId: "",
      expireds: [
        {
          id: 0,
          name: "未到期"
        },
        {
          id: 1,
          name: "已到期"
        },
        {
          id: 2,
          name: "全部"
        }
      ],
      tjform: {
        num: "",
        provider: "",
        cityName: "",
        departmentId: "",
        expiredAt: "",
        status: "",
        orderNo: ""
      },
      xgform: {
        id: "",
        status: "",
        num: "",
        provider: "",
        orderNo: "",
        cityName: "",
        expiredAt: "",
        status: ""
      },
      deviceIds: [],
      delId: "",
      xgId: "",
      total: 1,
      formWidth: "120px",
      tjBox: false,
      delBox: false,
      xgBox: false,
      page: 1,
      rowData: ""
    };
  },
  filters: {
    parseTime: parseTime
  },
  mounted() {
    this.oneMsg();
    this.gongsiFun();
  },
  methods: {
    //所有信息
    oneMsg() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/sim/query-detail?order-by=sim.created_at&order=asc&page=" +
          this.page +
          "&size=10",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.tableData = msg.data.data.sims;
        this.total = msg.data.data.totalCount;
      });
    },
    //公司
    gongsiFun() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/department/get-no-limit-by-company-id?company-id=1282",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.bumens = msg.data.data;
      });
    },
    //添加
    tianjia() {
      this.tjBox = true;
    },
    deviceFun(query) {
      if (query !== "") {
        this.loading = true;
        Axios({
          method: "post",
          url: this.GLOBAL.AJAX_URL + "/v1/device/search-by-code?code=" + query,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(msg);
          this.deviceIds = msg.data.data;
        });
      }
    },
    //确认添加
    tjTrue() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/sim/create",
        data: this.tjform,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.tjBox = false;
        if (msg.data.code === 0) {
          this.$message.success("添加成功");
          this.oneMsg();
          this.tjform.num = "";
          this.tjform.provider = "";
          this.tjform.cityName = "";
          this.tjform.departmentId = "";
          this.tjform.expiredAt = "";
          this.tjform.orderNo = "";
          this.tjform.status = "";
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    //删除
    del(row) {
      this.delId = row.simId;
      this.delBox = true;
    },
    delTrue() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/sim/delete?id=" + this.delId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);

        this.delBox = false;
        if (msg.data.code === 0) {
          if (msg.data.data.rowsAffected != 0) {
            this.oneMsg();
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    //分页
    pageChange(index) {
      this.page = index;
      this.oneMsg();
    },
    //修改
    xg(row) {
      this.xgform.id = row.simId;
      console.log(row);
      this.xgform.num = row.num;
      this.xgform.status = Number(row.status);
      this.xgform.orderNo = Number(row.orderNo);
      this.xgform.cityName = row.cityName;
      this.xgform.expiredAt = row.expiredAt;
      this.xgform.provider = Number(row.provider);
      this.xgform.departmentId = Number(row.departmentId);
      console.log(this.xgform);
      this.xgBox = true;
    },
    xgTrue() {
      this.xgform.id = Number(this.xgform.id);

      this.xgform.orderNo = Number(this.xgform.orderNo);
      this.xgform.status = Number(this.xgform.status);
      this.xgform.expiredAt = new Date(this.xgform.expiredAt);
      console.log(this.xgform);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/sim/update",
        data: this.xgform,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);

        this.xgBox = false;
        if (msg.data.code === 0) {
          if (msg.data.data.rowsAffected != 0) {
            console.log(msg.data.data.rowsAffected);
            this.oneMsg();
            this.$message.success("修改成功");
          } else {
            this.$message.warning("未修改");
          }
        } else {
          this.$message.error("修改失败");
        }
        this.xgform.num = "";
        this.xgform.status = "";
        this.xgform.orderNo = "";
        this.xgform.cityName = "";

        this.xgform.expiredAt = "";
      });
    },
    xgfalse() {
      this.xgBox = false;
      this.xgform.num = "";
      this.xgform.status = "";
      this.xgform.orderNo = "";
      this.xgform.cityName = "";

      this.xgform.expiredAt = "";
    },
    valNum(val) {
      this.xgform.orderNo = Number(val);
      this.tjform.orderNo = Number(val);
    },
    // 查询
    chaxun() {
      this.page = 1;
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/sim/query-detail?order-by=sim.created_at&order=asc&page=" +
          this.page +
          "&size=10" +
          "&department-id=" +
          this.departmentId +
          "&provider=" +
          this.providerId +
          "&num=" +
          this.phoneNum +
          "&status=" +
          this.statusId +
          "&expired=" +
          this.expiredId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
         console.log(msg);
        if (msg.data.code === 0) {
          if (msg.data.data.sims === null) {
            this.$message.success("暂无数据");
            this.tableData = []
          } else {
            this.tableData = msg.data.data.sims;
            this.total = msg.data.data.totalCount
          }
         
        }
      });
    }
  }
};
</script>
