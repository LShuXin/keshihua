<template>
  <el-container>
    <el-header>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="tj">新增关联杆塔</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" @row-click="up2">
        <el-table-column type="selection"></el-table-column>
        <el-table-column header-align="center" align="center" property="teamName" label="班组"></el-table-column>
        <el-table-column header-align="center" align="center" property="nature" label="杆塔属性"></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          property="towerCategoryName"
          label="杆塔分类"
        ></el-table-column>
        <el-table-column header-align="center" align="center" property="towerNum" label="杆塔号"></el-table-column>
        <el-table-column header-align="center" align="center" property="code" label="杆塔编码"></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          property="towerCategoryName"
          label="杆塔分类"
        ></el-table-column>
        <el-table-column header-align="center" align="center" label="状态">
          <template slot-scope="scope">{{scope.row.towerStatus }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="建成日期">
          <template slot-scope="scope">{{scope.row.createdAt | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="prop" label="修改日期">
          <template slot-scope="scope">{{scope.row.updatedAt | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" @click.stop="up(scope.row)" size="mini">123</el-button> -->
            <el-button type="danger" @click.stop="del(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加杆塔" :visible.sync="tjBox" width="50%">
        <label class="labelClass">线路名：</label>
        <el-select
          clearable
          v-model="xianluId"
          placeholder="选择线路名"
          size="mini"
          filterable
          remote
          :remote-method="xianluFun"
          @change="lineTowerFun"
        >
          <el-option v-for="item in xianlus" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!-- <label class="labelClass">杆塔号：</label>
        <el-input v-model="name" placeholder="请输入杆塔号" size="mini" style="width:178px;" clearable ></el-input>-->
        <el-card style="margin-top:20px" shadow="never">
          <div slot="杆塔列表"></div>
          <div style="height:500px; overflow-y:auto">
            <el-table :data="towers" style="width: 100%">
              <el-table-column header-align="center" align="center" prop="towerNum" label="杆塔号"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="creatTower(scope.$index, scope.row)"
                  >添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <div slot="footer">
          <el-button @click="tjBox = false">取 消</el-button>
          <el-button type="primary" @click="tjBox = false">确 定</el-button>
        </div>
        <el-dialog title="请输入绑定后的杆塔号" :visible.sync="towerNumBox" width="30%" append-to-body>
          <el-input v-model="TowerNumStr"></el-input>
          <div slot="footer">
            <el-button type="primary" @click="creatTowerFun">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>

      <el-dialog id="delBox" title="确认删除吗" :visible.sync="delBox" width="30%">
        <div>删除杆塔</div>
        <div slot="footer">
          <el-button @click="delBox = false">取 消</el-button>
          <el-button type="primary" @click="delTrue">确 定</el-button>
        </div>
      </el-dialog>
      <el-pagination
        background
        @current-change="pageChange"
        layout="prev, pager, next"
        :total="totalT"
        :page-size="10"
      ></el-pagination>
    </el-main>
  </el-container>
</template>
 
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import { parseTime } from "@/utils/index.js";
export default {
  data() {
    return {
      lineId: this.$route.query.id,
      page: 1,
      tableData: [],
      tjBox: false,
      tjform: {
        lineId: "",
        Str: "",
        towerId: ""
      },
      delId: "",
      delBox: false,
      dianyaId: "",
      dianyas: [],
      xianluId: "",
      xianlus: [],
      towers: [],
      totalT: null,
      TowerNumStr: "",
      creatTowerId: null,
      towerNumBox:false
    };
  },
  filters: {
    parseTime: parseTime
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
          "/v1/line-tower/query-detail?order-by=line_tower.created_at&order=asc&page=" +
          this.page +
          "&size=10&line-id=" +
          this.xianluId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.totalT = msg.data.data.totalCount;
        this.tableData = msg.data.data.lineTowers;
      });
    },
    up(row) {
      console.log(row);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line-tower/create",
        data: {
          towerNum: row.towerNum,
          lineId: Number(row.lineId),
          towerId: Number(row.lineTowerId)
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.tableData = msg.data.data.lineTowers;
        this.total = msg.data.data.totalCount;
      });
    },
    up2(row) {
      console.log("行");
    },
    tj() {
      this.tjBox = true;
    },
    del(row) {
      this.delBox = true;
      this.delId = row.lineTowerId;
      console.log(this.delId);
    },
    delTrue() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line-tower/delete?id=" + this.delId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
       this.delBox = false
        if(msg.data.code === 0){
          this.$message.success("删除成功")
          this.oneMsg()
        }else{
          this.$message.error("删除失败")
        }
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
          console.log(msg);
          this.xianlus = msg.data.data;
        });
      }
    },
    creatTower(index, row) {
      console.log(row);
      this.creatTowerId = row.towerID;
      this.towerNumBox = true;
    },
    creatTowerFun() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line-tower/create",
        data: {
          towerNum: this.TowerNumStr,
          lineId: Number(this.lineId),
          towerId: this.creatTowerId
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("添加成功");
        } else {
          this.$message.warning(msg.data.message);
        }
        this.TowerNumStr = null;
        this.creatTowerId = null;
        this.towerNumBox = false;
      });
    },
    lineTowerFun() {
      console.log(this.xianluId);
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/line-tower/get-tower?line-id=" +
          this.xianluId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.towers = msg.data.data;
      });
    },
    pageChange(index) {
      console.log(index);
      this.page = index;
      this.oneMsg();
    }
  }
};
</script>
<style lang="scss" scoped>
.labelClass {
  margin-left: 15px;
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