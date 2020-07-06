<template>
  <el-card class="box-card BigBox" shadow="hover" style="height:100%">
    <span class="topBox">厂商兼容</span>
    <div class="text item">
      <el-card v-for="(item, i) in datas" :key="i" class="box-card SmallBox" shadow="hover">
        <div class="text item">
          <span id="One" class="icon iconfont" :class="'ss' + i">&#xe7e5;</span>
          <span class="nameBox">{{ item.shortName }}</span>
          <span class="numBox">{{ item.percent }}</span>
        </div>
      </el-card>
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
  border-radius: 10px;
  cursor: default;
}
.SmallBox {
  margin-top: 20px;
  border-radius: 10px;
}
.item {
  margin: -10px;
}
</style>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "Card",
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
  mounted() {
    this.msg();
  },
  methods: {
    //获取厂商信息
    
    msg() {
       console.log(Cookies.get('vue_admin_template_token'))
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/device/get-device-manufacture-info?user-id=" +
          localStorage.getItem("userId"),
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code !== 0) {
          Cookies.remove("vue_admin_template_token");
          this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          this.$router.go(0);
        } else {
          this.datas = msg.data.data;
        }
      });
    }
  }
};
</script>
