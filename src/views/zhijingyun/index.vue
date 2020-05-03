<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4" :offset="6" style="margin-top:10px">
        <el-button type="primary" @click="allFun">全部图片</el-button>
      </el-col>
      <el-col :span="4" style="margin-top:10px">
          <el-button type="success" @click="uploadFun">上报图片</el-button>
      </el-col>
      <el-col :span="4" style="margin-top:10px">
        <el-button type="danger" @click="alarmFun">告警图片</el-button>

      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item,i) in data" :key="i" style="margin-top:10px">
        <el-card shadow="never">
          <div style="word-wrap:break-word">{{item.name}}</div>
          <div>
            <el-image style="width: 100%; height: 300px" :src="item.url" fit="fill" :preview-src-list="[item.url]"></el-image>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import OSS from "ali-oss";
import { mount } from "@vue/test-utils";
export default {
  data() {
    return {
      client: new OSS({
        region: "oss-cn-qingdao",
        accessKeyId: "LTAI4Ff7K4tf8LLUKbx5Dxpk",
        accessKeySecret: "jTk1v1kvK5ALZIut4Nx3LYm9wsL2W9",
        bucket: "vision-sd"
      }),
      data: [],
      imgslc:[],
    };
  },
  mounted() {
    console.log(1);
    try {
      // 不带任何参数，默认最多返回1000个文件。
      //   let result = this.client.list();
      let result = this.client.list();
      //   console.log(result);
      result.then(val => {
        console.log(val);
        for (let a = 0; a < val.objects.length; a++) {
          if (val.objects[a].name.endsWith("/")) {
              // console.log(val.objects[a])
            val.objects.splice(a, 1);
          }
          // this.imgslc.push(val.objects.url)

        }
        this.data = val.objects;
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    imgFun(url){
      // this.imgslc.push(url)
    },
    allFun() {
      let result = this.client.list();
      result.then(val => {
        console.log(val);
        for (let a = 0; a < val.objects.length; a++) {
          if (val.objects[a].name.endsWith("/")) {
            //   console.log(val.objects[a])
            val.objects.splice(a, 1);
          }
        }
        this.data = val.objects;
      });
    },
    uploadFun() {
      let result = this.client.list({ prefix: "设备上报" });
      result.then(val => {
        console.log(val);
        for (let a = 0; a < val.objects.length; a++) {
          if (val.objects[a].name.endsWith("/")) {
            //   console.log(val.objects[a])
            val.objects.splice(a, 1);
          }
          this.imgslc.push(val.objects.url)
        }
        this.data = val.objects;
      });
    },
    alarmFun() {
      let result = this.client.list({
        prefix: "设备告警"
      });
      result.then(val => {
        console.log(val);
        for (let a = 0; a < val.objects.length; a++) {
          if (val.objects[a].name.endsWith("/")) {
            //   console.log(val.objects[a])
            val.objects.splice(a, 1);
          }
        }
        this.data = val.objects;
      });
    }
  }
};
</script>
<style scoped>
</style>