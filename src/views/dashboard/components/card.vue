<template>
  <el-card class="box-card BigBox" shadow="hover" style="height:100%">
    <span class="topBox">厂商兼容</span>
    <div class="text item">
      <el-card class="box-card SmallBox" shadow="hover" v-for="(item,i) in datas" :key="i">
        <div class="text item">
          <span class="icon iconfont" id="One" :class="'ss'+i">&#xe7e5;</span>
          <span class="nameBox">{{item.shortName}}</span>
          <span class="numBox">{{item.percent}}</span>
        </div>
      </el-card>
      <!-- <el-card class="box-card SmallBox" shadow="hover">
        <div class="text item">
          <span class="icon iconfont" id="Two">&#xe7e5;</span>
          <span class="nameBox">{{datas[1].name}}</span>
          <span class="numBox">{{datas[1].num}}</span>
        </div>
      </el-card>
      <el-card class="box-card SmallBox" shadow="hover">
        <div class="text item">
          <span class="icon iconfont" id="Three">&#xe7e5;</span>
          <span class="nameBox">{{datas[2].name}}</span>
          <span class="numBox">{{datas[2].num}}</span>
        </div>
      </el-card> -->
    </div>
  </el-card>
</template>
<style scoped>
.topBox {
  font-size: 18px;
  color: #333333;
}
.nameBox {
  width: auto;
  margin-left: 10px;
  color: #333333;
  font-size: 16px;
}
.numBox {
  width: auto;
  margin-left: 10px;
  color: #999999;
  font-size: 14px;
}
.ss0 {
  color: #28d70c;
}
.ss1 {
  color: #f7b84f;
}
.ss2 {
  color: #f74f77;
}
.BigBox {
  /* width: 332px;
  height: 432px; */
  border-radius: 10px;
  cursor:default
}
.SmallBox {
  margin-top: 20px;
  border-radius: 10px;
}
.item{
  margin: -10px;
}
</style>
<script>
import Axios from 'axios';
import Cookies from "js-cookie";
export default {
  name: "card",
  data() {
    return {
      datas: [
        {
          shortName: "智景无限",
          percent: "70%"
        },
        {
          shortName: "信通",
          percent: "10%"
        },
        {
          shortName: "智洋",
          percent: "10%"
        }
      ]
    };
  },
  mounted(){
    this.msg()
  },
  methods:{
    msg(){
      Axios({
        method:"post",
        url:this.GLOBAL.AJAX_URL + "/v1/device/get-device-manufacture-info?user-id="+localStorage.getItem("userId"),
        headers:{
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg =>{
        // console.log(msg)
        this.datas = msg.data.data
      })
    }
  }
};
</script>