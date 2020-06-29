<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="grid-content bg-purple" />
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="ourTv">全部轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="cFun">分组轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="cFun">场景轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="cFun">预警轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="cFun">告警轮播</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="cFun">轮播配置</el-button>
          </div>
        </el-col>
        <el-col :span="4" :offset="6">
          <div>
            距离页面跳转还有
            <span style="color:#f7b84f; font-size:40px">{{ this.setime }}</span> 秒
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-card id="imgBigBox">
        <el-row :gutter="10">
          <el-col v-for="(item,index) in items" :key="index" :span="6">
            <span style="position:absolute">{{ item.lineName }}   #{{ item.towerNum }}  {{ item.deviceInstallationLocationName }}  {{ item.lastPhotographAt | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}  </span>
            <span style="position:absolute;top:20px;" />
            <el-image
              :key="index"
              style="width:400px; height:200px; margin-top:30px;"
              :src="item.imageUrl"
              :preview-src-list="[item.imageUrl]"
              fit="fill"
            />
            <span id="One" class="icon iconfont" @click.stop="copyData(item)">&#xe618;</span>
            <span id="Two" class="icon iconfont">&#xe62e;</span>
          </el-col>
        </el-row>

        <div class="pages">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pagess"
            :page-size="12"
            :current-page="pagenum"
            @current-change="current"
          />
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
    cursor: pointer;
  }
  #One {
    position: absolute;
    width: 20px;
    text-align: center;
    top: 35px;
    right: 60px;
    background: #667599;
    display: inline-block;
    cursor: pointer;
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
import Axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import { parseTime } from '@/utils/index.js'
export default {
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      titleTF: false,
      pagenum: 1,
      items: [
        {
          imageUrl: 'http://47.104.136.74/image/3.jpg',
          waring: true
        },
        {
          imageUrl: 'http://47.104.136.74/image/3.jpg',
          waring: false
        },
        {
          imageUrl: 'http://47.104.136.74/image/3.jpg',
          waring: true
        }
      ],
      srcList: [],
      setime: '12',
      index: 1,
      set: setInterval(this.upImg, 1000),
      pagess: 1
    }
  },
  mounted() {
    this.msg()
  },
  destroyed() {
    if (this.set) {
      clearInterval(this.set)
    }
  },
  methods: {
    msg() {
      Axios({
        method: 'post',
        url:
        this.GLOBAL.AJAX_URL +
        '/v1/device/get-latest-image?&page=' +
        this.index +
        '&size=12&user-id=' + localStorage.getItem('userId'),
        headers: {
          Authorization: 'Bearer ' + Cookies.get('vue_admin_template_token')
        }
      }).then(msg => {
        if (msg.data.code === 0 && msg.data.data.devices != null) {
          this.items = msg.data.data.devices
          this.index = this.index + 1
          this.pagess = msg.data.data.totalCount
        } else {
          this.$message('没有更多图片')
          clearInterval(this.set)
        }
      })
    },
    // 复制信息
    copyData(item) {
      this.$copyText(
        `时间：${moment(item.lastPhotographAt).format('YYYY-MM-DD')}，图片地址：${
          item.imageUrl
        }。`
      )
      this.$message.success('复制成功！')
    },
    // 分页
    current(val) {
      Axios({
        method: 'post',
        url:
          this.GLOBAL.AJAX_URL +
          '/v1/device/get-latest-image?&page=' +
          val +
          '&size=12&user-id=' + localStorage.getItem('userId'),
        headers: {
          Authorization: 'Bearer ' + Cookies.get('vue_admin_template_token')
        }
      }).then(msg => {
        this.items = msg.data.data.devices
        this.index = val
        this.setime = 12
      })
    },
    // 定时刷新
    upImg() {
      this.setime = this.setime - 1
      if (this.setime === 0) {
        this.setime = '12'
        this.pagenum = this.pagenum + 1
        this.index = this.index + 1
        Axios({
          method: 'post',
          url:
            this.GLOBAL.AJAX_URL +
            '/v1/device/get-latest-image?&page=' +
            this.index +
            '&size=12&user-id=' + localStorage.getItem('userId'),
          headers: {
            Authorization: 'Bearer ' + Cookies.get('vue_admin_template_token')
          }
        }).then(msg => {
          if (msg.data.code === 0 && msg.data.data.devices != null) {
            this.items = msg.data.data.devices
            this.index = this.index + 1
          } else {
            this.$message('没有更多图片')
            this.index = 1
            this.pagenum = 1
            this.msg()
          }
        })
      }
    },
    // 
    ourTv() {
      this.$router.go(0)
    },
    cFun() {
      this.$message.warning('该账号没有此权限')
    }
  }
}
</script>
