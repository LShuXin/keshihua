<template>
  <el-card shadow="hover" style="height:100%;border-radius:10px;">
    <div id="boxTop">设备管理</div>
    <p class="one">新装设备匹配</p>
    <p class="two">
      +{{installedCount}}
      <span style="font-size:16px; color:#333;">/{{totalCount}}</span>
    </p>
    <el-progress :percentage="installedPercent" :show-text="false"></el-progress>
    <p class="three">
      最新安装了
      <span>{{installedCount}}</span> 台设备
    </p>
  </el-card>
</template>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      totalCount: "",
      installedPercent: 0,
      installedCount:""
    };
  },
  mounted() {
    this.msg();
  },
  methods: {
    msg() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/device/get-device-manager?user-id=" +
          localStorage.getItem("userId"),
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        this.totalCount = msg.data.data.totalCount;
        this.installedPercent =Number(msg.data.data.installedPercent);
        this.installedCount = Number(msg.data.data.installedCount);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-card >>> .el-card__body {
  height: 100%;
}
#boxTop {
  font-size: 18px;
}
.one {
  font-size: 16px;
  color: #666666;
}
.two {
  line-height: 20px;
  margin: 0;
  font-size: 20px;
  color: #6b5af4;
}
.three {
  font-size: 0.9em;
  color: #666666;
  span {
    color: #6b5af4;
  }
}
</style>