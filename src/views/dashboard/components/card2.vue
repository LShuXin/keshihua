
<template>
  <el-card class="box-card BigBox" shadow="hover" style="height:100%;">
    <!-- <el-button
      style="float: right; padding: 3px 0;font-size:20px; line-height:0px;"
      type="text"
    >· · ·</el-button>-->
    <span class="topBox">工作台</span>
    <el-row :gutter="20" :span="24">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" id="rdgt" @click.native="msge">
          <!-- <img src="../../../../public/image/rdgt.png" alt  /> -->
          <span class="icon iconfont" id="One" style="font-size:25px;line-height:30px;">&#xe79b;</span>

          <p>事故多发</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" id="wqx" @click.native="msge">
          <!-- <img src="../../../../public/image/wqx.png" alt  /> -->
          <span class="icon iconfont" id="One" style="font-size:35px;line-height:30px;">&#xe60e;</span>

          <p>微气象</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" id="xlfb" @click.native="msge">
          <!-- <img src="../../../../public/image/xlfb.png" alt  /> -->
          <span class="icon iconfont" id="One" style="font-size:25px;line-height:30px;">&#xe660;</span>

          <p>线路分布</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" :span="24">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" id="ssjk" @click.native="rout">
          <!-- <img src="../../../../public/image/ssjk.png" alt  /> -->
          <span class="icon iconfont" id="One" style="font-size:25px;line-height:30px;">&#xe609;</span>

          <p>实时监控</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" id="zcgl" @click.native="msge">
          <!-- <img src="../../../../public/image/tj.png" alt  /> -->
          <span class="icon iconfont" id="One" style="font-size:25px;line-height:30px;">&#xe6d9;</span>

          <p>资产管理</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" id="qtxm" @click.native="msge">
          <!-- <img src="../../../../public/image/qtxm.png" alt  /> -->
          <span class="icon iconfont" id="One" style="font-size:25px;line-height:30px;">&#xe786;</span>

          <p>其他项目</p>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<style lang="scss" scoped>
.el-row {
  height: 50%;
}
.el-col {
  height: 100%;
}
img {
  width: 20%;
  height: 20%;
}
.topBox {
  font-size: 18px;
  cursor: default;
}

.BigBox {
  border-radius: 10px;
  height: 100%;
  .box-card {
    height: 85%;
    margin-top: 5%;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    line-height: 0;
    cursor: pointer;
    img {
      margin-top: 0px;
      width: 30px;
      height: 28px;
    }
  }
  .box-card >>> .el-card__body {
    height: 100%;
    padding: 0px;
    padding-top: 20px;
  }
}
.BigBox >>> .el-card__body {
  height: 100%;
}

#rdgt {
  background: #1ca3ff;
  &:hover {
    background: #fff;
    color: #1ca3ff;
    // margin-top: -1%;
    // margin-left: -4%;
    border: 0px solid #fff;
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
  }
  &:active {
    // margin-top: 10%;
    // margin-left: 20%;
    // width: 85%;
    // height: 65%;
    // background: pink;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);

    border: 0px solid #fff;
    margin-left: 0;
    box-shadow: 0 0 0 #fff !important;
  }
  // box-shadow: 6 6 10 #fff !important;
}
#wqx {
  background: #f74f77;
  &:hover {
    background: #fff;
    color: #f74f77;
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    border: 0px solid #fff;
  }
  &:active {
    // margin-top: 10%;
    // margin-left: 20%;
    // width: 85%;
    // height: 65%;
    // background: pink;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    border: 0px solid #fff;
    margin-left: 0;
    box-shadow: 0 0 0 #fff !important;
  }
}
#xlfb {
  background: #f7b84f;
  &:hover {
    background: #fff;
    color: #f7b84f;
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    border: 0px solid #fff;
  }
  &:active {
    // margin-top: 10%;
    // margin-left: 20%;
    // width: 85%;
    // height: 65%;
    // background: pink;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    border: 0px solid #fff;
    margin-top: 5%;
    margin-left: 0;
    box-shadow: 0 0 0 #fff !important;
  }
}
#ssjk {
  background: #6b5afc;
  &:hover {
    background: #fff;
    color: #6b5afc;
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    border: 0px solid #fff;
  }
  &:active {
    // margin-top: 10%;
    // margin-left: 20%;
    // width: 85%;
    // height: 65%;
    // background: pink;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    border: 0px solid #fff;
    margin-left: 0;
    box-shadow: 0 0 0 #fff !important;
  }
}
#qtxm {
  background: #fff;
  color: #c0c0c0;
  &:hover {
    background: #c0c0c0;
    color: #fff;
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    border: 0px solid #fff;
  }
  &:active {
    // margin-top: 10%;
    // margin-left: 20%;
    // width: 85%;
    // height: 65%;
    // background: pink;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    border: 0px solid #fff;
    margin-left: 0;
    box-shadow: 0 0 0 #fff !important;
  }
}
#zcgl {
  background: #28d7c0;
  color: #fff;

  &:hover {
    background: #fff;
    color: #28d7c0;
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    border: 0px solid #fff;
  }
  &:active {
    // margin-top: 10%;
    // margin-left: 20%;
    // width: 85%;
    // height: 65%;
    // background: pink;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    border: 0px solid #fff;
    margin-left: 0;
    box-shadow: 0 0 0 #fff !important;
  }
}
</style>
<script>
export default {
  methods: {
    msge() {
      this.$message({
        showClose: false,
        message: "该功能正在研发中~",
        type: "warning"
      });
    },
    rout(){
       this.$router.push("/nested")
    }
  }
};
</script>