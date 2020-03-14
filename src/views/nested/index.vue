<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="ourTv">全部轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary">分组轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary">场景轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary">预警轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary">告警轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary">轮播配置</el-button>
          </div>
        </el-col>
        <el-col :span="4" :offset="6">
          <div>
            距离页面跳转还有
            <span style="color:#f7b84f; font-size:40px">{{this.setime}}</span> 秒
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-card id="imgBigBox">
        <!-- <div id="title" v-if="titleTF">
          距离页面跳转还有
          <span style="color:#f7b84f; font-size:40px">{{this.setime}}</span> 秒
        </div>-->
        <el-row :gutter="10">
          <el-col :span="6" v-for="(item,index) in items" :key="index">
            <el-image
              :key="index"
              style="width:100%; height:200px; margin-top:30px;"
              :src="item.imageUrl"
              @click="test(item.imageUrl)"
              :preview-src-list="srcList"
              fit="fill"
            ></el-image>
            <span class="icon iconfont" id="One" @click.stop="copyData(item.towerNum,item.lineName,item.departmentName,item.installedAt,item.imageUrl)">&#xe618;</span>
            <!-- <span class="icon iconfont" id="Two"  v-bind:class="{'waring':item.waring}">&#xe62e;</span> -->
            <span class="icon iconfont" id="Two"  >&#xe62e;</span>
          </el-col>
        </el-row>

        <div class="pages">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pagenum"
            :total="pagess"
            @current-change="current"
            :page-size="12"
          ></el-pagination>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
header {
  div {
    margin-top: 5px;
  }
}
.pages {
  margin-top: 10px;
  float: right;
  margin-bottom: 20px;
}
#imgBigBox {
  >>> .el-col {
    text-align: center;
    margin-top: 10px;
    position: relative;
  }
  .el-image {
    position: relative;
  }
  #Two {
    position: absolute;
    width: 20px;
    text-align: center;
    top: 35px;
    right: 30px;
    background: #667599;
    display: inline-block;
    cursor:pointer
  }
  #One {
    position: absolute;
    width: 20px;
    text-align: center;
    top: 35px;
    right: 60px;
    background: #667599;
    display: inline-block;
    cursor:pointer
  }

  .waring {
    background: #f74f77 !important;
  }
  #Three {
    position: absolute;
    width: 20px;
    text-align: center;
    top: 35px;
    right: 90px;
    background: red;
    display: inline-block;
  }
}
</style>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
export default {
  data() {
    return {
      titleTF: false,
      pagenum: 1,
      items: [
        {
          imageUrl: "http://47.104.136.74/image/3.jpg",
          waring:true

        },
        {
          imageUrl: "http://47.104.136.74/image/3.jpg",
          waring:false

        },
        {
          imageUrl: "http://47.104.136.74/image/3.jpg",
          waring:true
        }
      ],
      srcList: [],
      setime: "12",
      index: 1,
      set: setInterval(this.upImg, 1000),
      pagess: 1
    };
  },
  mounted() {
    // this.set;
    Axios({
      method: "post",
      url:
        this.GLOBAL.AJAX_URL +
        "/v1/device/query?order-by=created_at&order=asc&page=" +
        this.index +
        "&size=12",
      headers: {
        Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      }
    }).then(msg => {
      if (msg.data.code === 0 && msg.data.data.devices != null) {
        console.log(msg);
        this.items = msg.data.data.devices;
        //  console.log(this.items);
        this.index = this.index + 1;
      } else {
        console.log(msg);
        this.$message("没有更多图片");
        clearInterval(this.set);
        this.pagess = msg.data.totalCount;
      }
    });
  },
  methods: {
    copyData(T,L,D,I,Img){
      this.$copyText(`所属部门：${D}，线路名：${L}，杆塔号：${T}，时间：${moment(I).format("YYYY-MM-DD")}，图片地址：${Img}。`)
      console.log("复制成功！")
    },
    test(value) {
      this.srcList = [value];
    },
    pageup() {
      this.index = this.index - 1;
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/device/query?order-by=created_at&order=asc&page=" +
          this.index +
          "&size=12",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.items = msg.data.data.devices;

        this.setime = 12;
      });
    },
    current(val) {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/device/query?order-by=created_at&order=asc&page=" +
          val +
          "&size=12",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.items = msg.data.data.devices;
        this.index = val;
        this.setime = 12;
      });
    },
    upImg() {
      this.setime = this.setime - 1;
      if (this.setime === 0) {
        this.setime = "12";
        this.pagenum = this.pagenum + 1;
        Axios({
          method: "post",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/device/query?order-by=created_at&order=asc&page=" +
            this.index +
            "&size=12",
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.code === 0 && msg.data.data.devices != null) {
            console.log(msg);
            this.items = msg.data.data.devices;
            //  console.log(this.items);
            this.index = this.index + 1;
          } else {
            console.log(msg);
            this.$message("没有更多图片");
            clearInterval(this.set);
          }
        });
      }
    },
    pagenext() {
      this.index = this.index + 1;
      Axios({
        method: "post",
        url:
          THIS.GLOBAL.AJAX_URL +
          "/v1/device/query?order-by=created_at&order=asc&page=" +
          this.index +
          "&size=12",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        this.items = msg.data.data.devices;

        this.setime = 12;
      });
    },
    ourTv() {
      var ele = document.getElementById("imgBigBox");
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
        this.titleTF = true;
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
        this.titleTF = true;
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
        this.titleTF = true;
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
        this.titleTF = true;
      }
    }
  },
  destroyed() {
    if (this.set) {
      clearInterval(this.set);
    }
  }
  // created() {
  //   //全局监听键盘事件
  //   var _this = this;
  //   document.onkeydown = function(e) {
  //     let key = window.event.keyCode;
  //     console.log(key);
  //     if (key === 122) {
  //       console.log(1111);
  //     }
  //   };
  // }
};
</script>