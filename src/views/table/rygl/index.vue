<template>
  <el-container>
    <el-header>
      <el-row :gutter="10">
        <el-col :span="4">
          <!-- <span>用户名：</span>
          <el-select
            v-model="userId"
            placeholder="请输入用户名"
            clearable
            size="mini"
            filterable
            remote
            :remote-method="userFun"
          >
            <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>-->
          <el-row :gutter="10">
            <el-col :span="24">
              <span>用户名：</span>
              <el-input
                v-model="username"
                placeholder="请输入用户名"
                size="mini"
                style="width:178px;"
                clearable
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <span>角色：</span>
          <el-select v-model="casbinRoleId" placeholder size="mini" clearable>
            <el-option
              v-for="item in casbinRoles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>所属公司：</span>
          <el-select v-model="gongsiId" placeholder size="mini" @change="bumenFun" clearable>
            <el-option v-for="item in gongsis" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>所属部门：</span>
          <el-select v-model="departmentId" placeholder size="mini" clearable>
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
      <el-table :data="users" highlight-current-row header-row-class-name="rowtitle">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column property="companyName" label="公司"></el-table-column>
        <el-table-column property="departmentName" label="部门"></el-table-column>
        <el-table-column property="teamName" label="班组"></el-table-column>
        <el-table-column property="roleName" label="角色"></el-table-column>
        <el-table-column property="userUsername" label="用户名"></el-table-column>
        <el-table-column property="userName" label="姓名"></el-table-column>
        <el-table-column property="phone" label="电话"></el-table-column>
        <el-table-column property="weChat" label="微信号"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="xgFun(scope.row)">修改</el-button>
            <el-button type="primary" size="mini" @click="QXFun(scope.row)">访问权限</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        @current-change="pageChange"
        style="float:right;margin-top:5px;"
      ></el-pagination>
    </el-main>
    <!-- 删除 -->
    <el-dialog id="delBox" title="删除用户" :visible.sync="delBox" width="30%" style="color:#F56C6C;">
      <span>确定删除此用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delBox = false">取 消</el-button>
        <el-button type="primary" @click="delTrue">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加用户" :visible.sync="tjBox" width="60%">
      <el-form v-model="tjform">
        <el-form-item label="个人信息：" :label-width="formLabelWidth" required>
          <span>&nbsp;&nbsp;&nbsp;姓名：</span>
          <el-input v-model="tjform.name" size="mini"></el-input>
          <span id="right-item">手机号：</span>
          <el-input v-model="tjform.phone" size="mini"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>微信号：</span>
          <el-input v-model="tjform.weChat" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="账户信息：" :label-width="formLabelWidth" required>
          <span>用户名：</span>
          <el-input v-model="tjform.userName" size="mini"></el-input>
          <span id="right-item">密码：</span>
          <el-input v-model="tjform.password" show-password size="mini"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label
          :label-width="formLabelWidth"
          :rules="[
            { required: false, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <span>&nbsp;&nbsp;&nbsp;邮箱：</span>
          <el-input v-model="tjform.email" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="公司信息：" :label-width="formLabelWidth" required>
          <span>&nbsp;&nbsp;&nbsp;公司：</span>
          <el-select v-model="tjform.companyId" placeholder size="mini" @change="bumenFunxg">
            <el-option v-for="item in gongsis" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span id="right-item">&nbsp;&nbsp;&nbsp;部门：</span>
          <el-select
            v-model="tjform.departmentId"
            placeholder
            size="mini"
            clearable
            @change="banzuFun"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span id="right-item">&nbsp;&nbsp;&nbsp;班组：</span>
          <el-select v-model="tjform.teamId" placeholder size="mini">
            <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>&nbsp;&nbsp;&nbsp;角色：</span>
          <el-select v-model="tjform.roleId" placeholder size="mini">
            <el-option
              v-for="item in casbinRoles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="tjBox = false">取 消</el-button>
        <el-button type="primary" @click="tjtrue">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="xgBox" width="60%">
      <el-form :model="xgform">
        <el-form-item label="个人信息：" :label-width="formLabelWidth" required>
          <span>&nbsp;&nbsp;&nbsp;姓名：</span>
          <el-input v-model="xgform.name" size="mini"></el-input>
          <span id="right-item">手机号：</span>
          <el-input v-model="xgform.phone" size="mini"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>微信号：</span>
          <el-input v-model="xgform.weChat" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="账户信息：" :label-width="formLabelWidth" required>
          <span>用户名：</span>
          <el-input v-model="xgform.userName" size="mini"></el-input>
          <span id="right-item">密码：</span>
          <el-input v-model="xgform.password" show-password size="mini"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <span>&nbsp;&nbsp;&nbsp;邮箱：</span>
          <el-input v-model="xgform.email" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="公司信息：" :label-width="formLabelWidth" required>
          <span>&nbsp;&nbsp;&nbsp;公司：</span>
          <el-select v-model="xgform.companyId" placeholder size="mini" @change="bumenFunXg2">
            <el-option v-for="item in gongsis" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span id="right-item">&nbsp;&nbsp;&nbsp;部门：</span>
          <el-select
            v-model="xgform.departmentId"
            placeholder
            size="mini"
            clearable
            @change="banzuFun2"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span id="right-item">&nbsp;&nbsp;&nbsp;班组：</span>
          <el-select v-model="xgform.teamId" placeholder size="mini">
            <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span>&nbsp;&nbsp;&nbsp;角色：</span>
          <el-select v-model="xgform.roleId" placeholder size="mini">
            <el-option
              v-for="item in casbinRoles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="xgBox = false">取 消</el-button>
        <el-button type="primary" @click="xgTrue">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="用户访问权限" :visible.sync="qxBox" width="30%" @opened="openFun">
      <div class style="margin-left:40px;">
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          node-key="prefixId"
          :default-checked-keys="Keys"
          accordion
          show-checkbox
          :render-content="renderConent"
          @check-change="userTower"
          @check="userTowerFun"
          ref="tree"
        ></el-tree>
      </div>
    </el-dialog>
  </el-container>
</template>


<script>
import Axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      Keys: ["1282"],
      username: "",
      casbinRoleId: "",
      casbinRoles: [],
      userId: "",
      users: [],
      gongsiId: "",
      gongsis: [],
      departmentId: "",
      departments: [],
      teams: [],
      tableData: [],
      delId: "",
      page: 1,
      delBox: false,
      xgform: {
        id: "",
        name: "",
        userName: "",
        password: "",
        phone: "",
        weChat: "",
        email: "",
        companyId: "",
        departmentId: "",
        teamId: "",
        roleId: "",
        email: "",
        password: ""
      },
      tjform: {
        name: "",
        userName: "",
        password: "",
        phone: "",
        weChat: "",
        email: "",
        companyId: "",
        departmentId: "",
        teamId: "",
        roleId: ""
      },
      formLabelWidth: "120px",
      xgBox: false,
      tjBox: false,
      total: 1,
      qxBox: false,
      voltages: [],
      companys: [],
      lines: [],
      qxform: {
        voltageId: "",
        companyId: "",
        lineId: ""
      },
      Towers: [],
      tableBox: false,
      props: {
        label: "name"
      },
      UserId: "",
      check: [],
      TrueorFalse: "",
      Rowdata: ""
    };
  },
  mounted() {
    this.usersFun();
    this.casbinRolesFun();
    this.gongsiFun();
    this.bumenFun();
  },
  methods: {
    valFun(val) {
      console.log(val);
    },
    daochu() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/user/export",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        window.location.href = msg.data.data;
      });
    },
    //   所有数据
    usersFun() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/user/query-detail?order-by=user.created_at&order=asc&page=" +
          this.page +
          "&size=10",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.users = msg.data.data.users;
        this.total = msg.data.data.totalCount;
      });
    },
    //翻页
    pageChange(val) {
      this.page = val;
      this.usersFun();
    },
    // 角色名
    casbinRolesFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/casbin-role/get-no-limit",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.casbinRoles = msg.data.data;
      });
    },
    //公司
    gongsiFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/company/get-no-limit",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.gongsis = msg.data.data;
      });
    },
    //部门
    bumenFun() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/department/get-no-limit-by-company-id?company-id=1282",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.departments = msg.data.data;
      });
    },
    //添加部门
    bumenFunxg() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/department/get-no-limit-by-company-id?company-id=" +
          this.tjform.companyId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.departments = msg.data.data;
      });
    },
    bumenFunXg2(val) {
      console.log(val);
      console.log(this.xgform.companyId);
      console.log(this.gongsis);
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/department/get-no-limit-by-company-id?company-id=" +
          this.xgform.companyId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.departments = msg.data.data;
      });
    },
    //添加班组
    banzuFun() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/team/get-no-limit-by-department-id?department-id=" +
          this.tjform.departmentId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.teams = msg.data.data;
      });
    },
    banzuFun2() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/team/get-no-limit-by-department-id?department-id=" +
          this.xgform.departmentId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.teams = msg.data.data;
      });
    },
    // 删除
    del(row) {
      this.delId = row.userId;
      this.delBox = true;
    },
    delTrue() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/user/delete?id=" + this.delId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);

        this.delBox = false;
        if (msg.data.code === 0) {
          if (msg.data.data.rowsAffected != 0) {
            this.usersFun();
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        } else {
          this.$message.error("删除失败");
        }
      });
    },

    // 添加
    tianjia() {
      this.tjBox = true;
    },
    tjtrue() {
      this.tjform.companyId = Number(this.tjform.companyId);
      this.tjform.departmentId = Number(this.tjform.departmentId);
      this.tjform.teamId = Number(this.tjform.teamId);
      this.tjform.roleId = Number(this.tjform.roleId);
      switch ("" || 0) {
        case this.tjform.name:
          this.$message.error("姓名不能为空");
          break;
        case this.tjform.phone:
          this.$message.error("手机号不能为空");
          break;
        case this.tjform.weChat:
          this.$message.error("微信不能为空");
          break;
        case this.tjform.userName:
          this.$message.error("用户名不能为空");
          break;
        case this.tjform.password:
          this.$message.error("密码不能为空");
          break;
        case this.tjform.email:
          this.$message.error("邮箱不能为空");
          break;
        case this.tjform.companyId:
          this.$message.error("未选择公司");
          break;
        case this.tjform.departmentId:
          this.$message.error("未选择部门");
          break;
        case this.tjform.teamId:
          this.$message.error("未选择班组");
          break;
        case this.tjform.roleId:
          this.$message.error("未选择角色");
          break;
        default:
          Axios({
            method: "post",
            url: this.GLOBAL.AJAX_URL + "/v1/user/create ",
            data: this.tjform,
            headers: {
              Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
            }
          }).then(msg => {
            console.log(msg);
            // this.tjBox = false;
            if (msg.data.code === 0) {
              this.$message.success("添加成功");
              this.tjform.name = "";
              this.tjform.phone = "";
              this.tjform.weChat = "";
              this.tjform.userName = "";
              this.tjform.password = "";
              this.tjform.email = "";
              this.tjform.companyId = "";
              this.tjform.departmentId = "";
              this.tjform.teamId = "";
              this.tjform.roleId = "";
              this.usersFun();
            } else {
            }
          });
          break;
      }
    },
    //修改
    xgFun(row) {
      console.log(row);
      this.xgform.id = row.userId;
      this.xgform.name = row.userName;
      this.xgform.phone = row.phone;
      this.xgform.weChat = row.weChat;
      this.xgform.userName = row.userUsername;
      // this.xgform.phone = row.phone;
      this.xgform.teamId = Number(row.teamId);
      this.xgform.companyId = Number(row.companyId);
      this.xgform.departmentId = Number(row.departmentId);
      this.xgform.roleId = Number(row.roleId);
      this.xgform.password = row.password;
      this.xgform.email = row.email;
      this.gongsiFun();
      this.banzuFun2();
      this.xgBox = true;
    },
    xgTrue() {
      this.xgform.id = Number(this.xgform.id);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/user/update",
        data: this.xgform,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.xgBox = false;
        if (msg.data.code === 0) {
          if (msg.data.data.rowsAffected != 0) {
            this.$message.success("修改成功");
            this.xgform.name = "";
            this.xgform.phone = "";
            this.xgform.weChat = "";
            this.usersFun();
          } else {
            this.$message.warning("未修改");
          }
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    QXFun(row) {
      this.qxBox = true;
      this.Rowdata = row;
      this.$nextTick(() => {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/user-tower/get-by-user-id?user-id=" +
            this.Rowdata.userId,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
          var a = [];
          if (msg.data.data.towers !== null) {
            for (var i = 0; i < msg.data.data.towers.length; i++) {
              a.push(`${msg.data.data.towers[i].towerId}`);
            }

            this.$refs.tree.setCheckedKeys(a);
          } else {
            this.$refs.tree.setCheckedKeys([]);
          }

          // console.log(this.Keys)
        });

        this.UserId = Number(this.Rowdata.userId);
        // console.log(this.UserId);
      });
    },
    openFun() {},
    oneleave(node, resolve) {
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
        // console.log("权限");
        // this.companys = msg.data.data;
        resolve(msg.data.data);
      });
    },
    voltageFun(node, resolve) {
      this.qxform.companyId = node.data.id;
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/line/get-voltage-level?department-id=" +
          node.data.id,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        resolve(msg.data.data);
      });
    },
    xianluFun(node, resolve) {
      // console.log(this.qxform.companyId);
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/line/get-line?department-id=" +
          this.qxform.companyId +
          "&voltage-level=" +
          node.data.id,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        // console.log("线路");
        resolve(msg.data.data);
      });
    },
    TowerFun(node, resolve) {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/line-tower/get-tower?line-id=" +
          node.data.id,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        console.log("杆塔");
        resolve(msg.data.data);
      });
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        this.oneleave(node, resolve);
      }
      if (node.level === 1) {
        console.log("第1层");
        this.voltageFun(node, resolve);
      }
      if (node.level === 2) {
        console.log("第2层");
        this.xianluFun(node, resolve);
      }
      if (node.level === 3) {
        this.TowerFun(node, resolve);
      }
      if (node.level === 4) {
        resolve([]);
        console.log(node);
      }
    },
    renderConent(h, node, data, store) {
      if (node.node.level === 0) {
        return (
          <span>
            <span style="font-size:12px;"> {node.data.name} </span>{" "}
          </span>
        );
      }
      if (node.node.level === 1) {
        return (
          <span>
            <span style="font-size:12px;"> {node.data.name} </span>{" "}
          </span>
        );
      }
      if (node.node.level === 2) {
        return (
          <span>
            <span style="font-size:12px;"> {node.data.name} </span>{" "}
          </span>
        );
      }
      if (node.node.level === 3) {
        return (
          <span>
            <span style="font-size:12px;"> {node.data.name} </span>{" "}
          </span>
        );
      }
      if (node.node.level === 4) {
        return (
          <span>
            <span style="font-size:12px;"> {node.data.towerNum} </span>{" "}
          </span>
        );
      }
    },
    userTowerFun(a, b) {
      // console.log("aaaaa")
      // console.log(a)
      // console.log("bbbb")
      // console.log(b)
      if (this.TrueorFalse === true) {
        Axios({
          method: "post",
          url: this.GLOBAL.AJAX_URL + "/v1/user-tower/create",
          data: {
            userId: this.UserId,
            towerId: a.towerID
          },
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
        });
      } else {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/user-tower/delete-by-user-id-and-tower-id?user-id=" +
            this.UserId +
            "&tower-id=" +
            a.towerID,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);
        });
      }
    },
    userTower(a, b, c) {
      // console.log(a);
      // console.log(b);
      this.TrueorFalse = b;
      // console.log(c);
      // console.log(this.UserId)
      // if (b === true) {
      //   Axios({
      //     method: "post",
      //     url: this.GLOBAL.AJAX_URL + "/v1/user-tower/create",
      //     data: {
      //       userId: this.UserId,
      //       towerId: a.towerID
      //     },
      //     headers: {
      //       Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      //     }
      //   }).then(msg => {
      //     console.log(msg);
      //   });
      // }else{
      //     Axios({
      //     method: "post",
      //     url: this.GLOBAL.AJAX_URL + "/v1/user-tower/delete-by-user-id-and-tower-id?user-id="+this.UserId+"&tower-id="+a.towerID,
      //     headers: {
      //       Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      //     }
      //   }).then(msg => {
      //     console.log(msg);
      //   });
      // }
    },
    //查询
    chaxun() {
      this.page = 1;
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/user/query-detail?order-by=user.created_at&order=asc&page=" +
          this.page +
          "&size=8" +
          "&role-id=" +
          this.casbinRoleId +
          "&company-id=" +
          this.gongsiId +
          "&department-id=" +
          this.departmentId +
          "&username=" +
          this.username,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.users = msg.data.data.users;

        // this.total = msg.data.data.totalCount;
        this.$message.success("查询成功");
      });
    }
  }
};
</script>




<style lang="scss" scoped>
.el-table >>> {
  .rowtitle {
    .cell {
      color: #1ca3ff;
    }
  }
}
#right-item {
  margin-left: 10px;
}
.el-header {
  height: auto !important;
  padding: 20px 10px;
  span {
    font-size: 14px;
  }
}
#delBox {
  > .el-dialog__title {
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

.miniTitle {
  margin: 0 10px;
}
</style>
