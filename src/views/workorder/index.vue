<template>
  <el-container>
    <el-header>
      <el-row :gutter="10">
        <el-col :span="4">
          <span>部门名称：</span>
          <el-select v-model="departmentId" placeholder="请选择部门" size="mini" clearable>
            <el-option v-for="item in bumens" :key="item.id" :label="item.name" :value="item.name"></el-option>
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
            <el-option v-for="item in xianlus" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span>告警时间：</span>
          <el-date-picker
            size="mini"
            v-model="gjdate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="test"
          ></el-date-picker>
        </el-col>
        <el-col :span="4">
          <span>工单状态：</span>
          <el-select v-model="status" placeholder="请选择工单状态" size="mini" clearable>
            <el-option v-for="item in statusS" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="Query" size="mini">查询</el-button>
          <!-- <el-button type="primary" size="mini">导出</el-button> -->
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="gdVal" style="width: 100%" @row-click="reading">
        <el-table-column type="selection" width="30px"></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="createdAt" label="派单时间"></el-table-column>
        <el-table-column prop="status" label="工单状态"></el-table-column>
        <el-table-column prop="departmentName" label="部门名称"></el-table-column>
        <el-table-column prop="voltageLevel" label="电压等级"></el-table-column>
        <el-table-column prop="lineName" label="线路名称"></el-table-column>
        <el-table-column prop="towerName" label="杆塔号"></el-table-column>
        <el-table-column prop="deviceInstallationLocation" label="监拍朝向"></el-table-column>
        <el-table-column prop="alarmAt" label="告警时间"></el-table-column>
        <el-table-column prop="orderNo" label="是否已读">
          <template slot-scope="scope">
            <span v-if="scope.row.hasRead === '已读'">已读</span>
            <span v-else style="color:#F56C6C;">未读</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="xiangqing(scope.row)">查看详情</el-button>
            <br />
            <el-button type="primary" size="mini" @click.stop="chuli(scope.row)">工单处理</el-button>
            <br />
            <el-button type="primary" size="mini" @click.stop="chulilishi(scope.row)">处理历史</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="工单详情" :visible.sync="gdxq" width="70%">
      <el-table :data="gdxqData" style="width: 100%">
        <el-table-column prop="createdAt" label="派单时间" width="150px"></el-table-column>
        <el-table-column header-align="center" align="center" prop="departmentName" label="部门名称"></el-table-column>
        <el-table-column header-align="center" align="center" prop="voltageLevel" label="电压等级"></el-table-column>
        <el-table-column header-align="center" align="center" prop="lineName" label="线路名"></el-table-column>
        <el-table-column header-align="center" align="center" prop="towerName" label="杆塔号"></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="deviceInstallationLocation"
          label="监拍朝向"
        ></el-table-column>
        <el-table-column header-align="center" align="center" prop="userName" label="处理用户"></el-table-column>
        <el-table-column header-align="center" align="center" prop="userPhone" label="联系方式"></el-table-column>
        <el-table-column header-align="center" align="center" prop="riskName" label="隐患类型"></el-table-column>
        <el-table-column header-align="center" align="center" prop="alarmCauses" label="告警原因"></el-table-column>
        <el-table-column header-align="center" align="center" prop="status" label="工单状态"></el-table-column>
      </el-table>
      <el-image style="width: 100%; height: 500px" :src="url" fit="fit"></el-image>
    </el-dialog>
    <el-dialog title :visible.sync="gdcl" width="75%">
      <el-row :gutter="10">
        <el-col :span="4">
          <span>部门：</span>
          <el-input v-model="departmentName" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4">
          <span>电压等级：</span>
          <el-input v-model="voltageLevel" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4">
          <span>线路名称：</span>
          <el-input v-model="lineName" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4">
          <span>杆塔号：</span>
          <el-input v-model="towerName" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4">
          <span>监拍朝向：</span>
          <el-input v-model="position" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4">
          <span>隐患类型：</span>
          <el-input v-model="riskName" placeholder size="mini" disabled></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:20px;">
        <el-col :span="4">
          <span>告警原因：</span>
          <el-input v-model="alarmCauses" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4">
          <span>告警时间：</span>
          <el-date-picker
            v-model="gjdate"
            type="date"
            placeholder="date"
            size="mini"
            style="width:60%"
            disabled
          ></el-date-picker>
        </el-col>
        <el-col :span="4">
          <span>处理用户：</span>
          <el-input v-model="userName" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4">
          <span>联系方式：</span>
          <el-input v-model="userPhone" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="3" style="padding:0px">
          <span>处理班组：</span>
          <el-input v-model="teamName" placeholder size="mini" disabled></el-input>
        </el-col>
        <el-col :span="4" style="padding:0px">
          <span>是否录入隐患系统：</span>
          <el-input v-model="yorn" placeholder size="mini" disabled></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:20px;">
        <el-col :span="24">
          <span style="margin-top:0px;line-height:60px;">现场信息：</span>
          <el-input type="textarea" v-model="scene" placeholder style="width:90%"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:20px;">
        <el-col :span="24">
          <span style="margin-top:0px;line-height:60px;">处置措施：</span>
          <el-input type="textarea" v-model="handleDesc" placeholder style="width:90%"></el-input>
        </el-col>
      </el-row>
      <p>现场图片上传（最多五张）</p>
      <el-upload
        :action="upimgUrl"
        list-type="picture-card"
        :auto-upload="true"
        :disabled="uping"
        :headers="headers"
        :limit="5"
        :on-success="upImg"
        :on-progress="upingFun"
        :on-exceed="maxFun"
        name="media"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        ref="upload"
      >
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <div slot="footer">
        <el-button @click="gdgj">持续跟进</el-button>
        <el-button type="primary" @click="gdzj">工单终结</el-button>
      </div>
    </el-dialog>
    <el-dialog title="处理历史" :visible.sync="cllsBox" width="70%">
      <div style="height:800px; overflow-y:auto;">
        <el-form
          ref="form"
          label-width="80px"
          v-for="(item,i) in lsform"
          :key="i"
          style="margin-bottom:40px; border-bottom:1px solid #000;"
        >
          <el-form-item label="处理时间">
            <el-input v-model="item.createdAt" disabled></el-input>
            <label class="inLabel">处理用户</label>
            <el-input v-model="item.userName" disabled></el-input>
            <label class="inLabel">联系方式</label>
            <el-input v-model="item.userPhone" disabled></el-input>
            <label class="inLabel">处置班组</label>
            <el-input v-model="item.teamName" disabled></el-input>
            <label class="inLabel">是否再派工</label>
            <el-select v-model="item.isReworkOrder" placeholder disabled>
              <el-option
                v-for="item in ReworkOrder"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <label class="inLabel">录入隐患系统</label>
            <el-select v-model="item.isRecordIntoRiskSystem" placeholder disabled>
              <el-option
                v-for="item in ReworkOrder"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现场信息">
            <el-input type="textarea" v-model="item.scene"></el-input>
          </el-form-item>
          <el-form-item label="处理信息">
            <el-input type="textarea" v-model="item.handleDesc"></el-input>
          </el-form-item>
          <el-form-item label="现场图片">
            <el-image
              style="width: 220px; height: 200px;margin-left:20px;"
              v-for="(img,x) in item.pictures"
              :key="x"
              :src="img"
              fit="fill"
            ></el-image>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="cllsBox = false" type="danger">关闭</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import { parseTime } from "@/utils/index.js";
import moment from "moment";
export default {
  data() {
    return {
      departmentId: "",
      bumens: "",
      dianyas: this.LABEL_DATA.VOLTAGE_LEVEL,
      dianyaId: "",
      xianluId: "",
      xianlus: [],
      gdVal: [
        {
          id: "1",
          name: "1"
        }
      ],
      gdxq: false,
      gdxqData: [
        {
          id: 1,
          name: "1"
        }
      ],
      url: "http://47.105.48.15:8900/3.jpg",
      gdcl: false,
      dialogVisible: false,
      dialogImageUrl: "",
      disabled: false,
      headers: {
        Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      },
      uping: false,
      upimgUrl: this.GLOBAL.AJAX_URL + "/v1/work-order-handling-pic/upload",
      departmentName: "",
      voltageLevel: "",
      lineName: "",
      gjdate: "",
      towerName: "",
      position: "",
      riskName: "",
      alarmCauses: "",
      userName: "",
      userPhone: "",
      teamName: "",
      yorn: "",
      scene: "",
      handleDesc: "",
      id: "",
      imgArr: [],
      statusS: [
        {
          id:1,
          name:"处理中"
        },{
          id:0,
          name:"未处理"
        }
      ],
      pageNum: 1,
      status: "",
      cllsBox: false,
      lsform: [
        // {
        //   createdAt: "1",
        //   userName: "2",
        //   userPhone: "3",
        //   teamName: "4",
        //   isReworkOrder: 1,
        //   isRecordIntoRiskSystem: 0,
        //   scene: "5",
        //   handleDesc: "6",
        //   pictures:[
        //     "http://47.104.136.74/image/3.jpg",
        //     "http://47.104.136.74/image/2.jpg",
        //     "http://47.104.136.74/image/2.jpg",
        //     "http://47.104.136.74/image/2.jpg",
        //     "http://47.104.136.74/image/2.jpg",
        //     "http://47.104.136.74/image/2.jpg",
        //     "http://47.104.136.74/image/2.jpg",
        //   ]
        // }
      ],

      ReworkOrder: [
        { id: 0, name: "否" },
        { id: 1, name: "是" }
      ],
      fileList: []
    };
  },
  mounted() {
    this.gongsiFun();
    this.workOrder();
  },
  methods: {
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
        this.bumens = msg.data.data;
      });
    },
    //线路名
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
          this.xianlus = msg.data.data;
        });
      }
    },
    workOrder() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/work-order/query-detail?user-id=" +
          localStorage.getItem("userId"),
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.gdVal = msg.data.data.devices;
      });
    },
    xiangqing(row) {
      console.log(row);
      this.gdxqData = [row];
      this.url = row.alarmImagePath;
      // console.log(this.url);
      this.gdxq = true;
    },
    chuli(row) {
      // console.log(row);
      // console.log(this.id);
      this.departmentName = row.departmentName;
      this.voltageLevel = row.voltageLevel;
      this.lineName = row.lineName;
      this.towerName = row.towerName;
      this.position = row.deviceInstallationLocation;
      this.riskName = row.riskName;
      this.alarmCauses = row.alarmCauses;
      this.gjdate = row.alarmAt;
      this.userName = row.userName;
      this.userPhone = row.userPhone;
      this.teamName = row.teamName;
      this.gdcl = true;
      this.id = Number(row.workOrderId);
    },
    gdzj() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/work-order-handling/finish-handling",
        data: {
          userName: this.userName,
          userPhone: this.userPhone,
          teamName: this.teamName,
          isReworkOrder: 1,
          isRecordIntoRiskSystem: 1,
          scene: this.scene,
          handleDesc: this.handleDesc,
          workOrderId: this.id,
          picIds: this.imgArr
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 0) {
          this.$message.success("工单终结");
           this.$refs.upload.clearFiles()
        } else {
          this.$message.error("终结失败");
           this.$refs.upload.clearFiles()
        }
        this.workOrder();
        this.gdcl = false;
        this.userName = "";
        this.userPhone = "";
        this.teamName = "";
        this.scene = "";
        this.handleDesc = "";
        this.id = "";
        this.imgArr = "";
      });
    },
    gdgj() {
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/work-order-handling/follow-handling",
        data: {
          userName: this.userName,
          userPhone: this.userPhone,
          teamName: this.teamName,
          isReworkOrder: 1,
          isRecordIntoRiskSystem: 1,
          scene: this.scene,
          handleDesc: this.handleDesc,
          workOrderId: this.id,
          picIds: this.imgArr
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 0) {
          this.$message.success("工单跟进~");
          this.$refs.upload.clearFiles();
        } else {
          this.$message.error("跟进失败");
           this.$refs.upload.clearFiles()
        }
        this.workOrder();
        this.gdcl = false;
        this.userName = "";
        this.userPhone = "";
        this.teamName = "";
        this.scene = "";
        this.handleDesc = "";
        this.id = "";
        this.imgArr = [];
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      // console.log(file);
    },
    handleRemove(file) {
      // console.log(file);
    },
    upImg(response, file, fileList) {
      // console.log(file);
      console.log(response);
      console.log(fileList);
      this.$message.success("上传成功");
      this.uping = false;
      this.imgArr.push(response.data.id);
    },
    upingFun() {
      this.uping = true;
      // this.$message.error("请等待上一张上传完毕");
    },
    maxFun() {
      this.uping = false;
      this.$message.error("只能上传五张图片");
    },
    chulilishi(row) {
      this.cllsBox = true;
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/work-order-handling/history-handling?work-order-id=" +
          row.workOrderId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 0) {
          this.lsform = msg.data.data;
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    Query() {
      if (this.gjdate !== null && this.gjdate[0] !== undefined) {
        console.log(this.gjdate);
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/work-order/query-detail?order-by=work_order.created_at&order=asc&page=" +
            this.pageNum +
            "&size=12&department-name=" +
            this.departmentId +
            "&voltage-level=" +
            this.dianyaId +
            "&line-name=" +
            this.xianluId +
            "&start-time=" +
            this.gjdate[0] +
            "&end-time=" +
            this.gjdate[1] +
            "&status=" +
            this.status +
            "&user-id=" +
            localStorage.getItem("userId"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          this.gdVal = msg.data.data.devices;
          // console.log(msg);
        });
      } else {
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/work-order/query-detail?order-by=work_order.created_at&order=asc&page=" +
            this.pageNum +
            "&size=12&department-name=" +
            this.departmentId +
            "&voltage-level=" +
            this.dianyaId +
            "&line-name=" +
            this.xianluId +
            "&status=" +
            this.status +
            "&user-id=" +
            localStorage.getItem("userId"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          this.gdVal = msg.data.data.devices;
          // console.log(msg);
        });
      }
    },
    test(val) {
      // console.log(val);
      // console.log(this.gjdate);
    },
    reading(row) {
      console.log(row);
      Axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/user-work-order/create",
        data: {
          userId: Number(localStorage.getItem("userId")),
          workOrderId: Number(row.workOrderId)
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
      });
    }
  }
};
</script>
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
    margin-top: 10px;
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
    width: 100px;
  }
}
.inLabel {
  margin-left: 20px;
}
.el-date-editor {
  width: 70%;
}
</style>      