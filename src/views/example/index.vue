<template>
  <el-card id="bigBoxCard" :body-style="{padding:'0px'}">
    <el-container>
      <el-aside width="250px">
        <!-- <el-select
          v-model="value"
          filterable
          placeholder
          style="margin-left:10px; margin-top:10px; width:90%; border-radius:40px;"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="float:left"
          ></el-option>
        </el-select>-->
        <!-- <span class="btnSelect" style="float:right">快速搜索</span>
        <span class="btnSelect" style="float:right">详情搜索</span>-->
        <!-- 搜索功能未实现，注释掉了 -->
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          node-key="key"
          accordion
          :render-content="renderConent"
          :default-expanded-keys="[1]"
          @node-click="msgId"
        />
      </el-aside>

      <el-card id="imgBox" shadow="never" :body-style="{padding:'0px'}" style="height:100%;">
        <div class="Small">{{ this.topData }}</div>
        <!-- 左上角线路杆塔信息  -->
        <el-card id="imgCardBox" shadow="always" :body-style="{padding:'10px'}">
          <!-- 右上角时间 -->
          <span v-if="dateMsg" class="timeBox">{{ dateMsg | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          <!-- 气象信息  未实现 -->
          <div class="qixiang">
            <p>
              <span class="QxName">温度：</span>
              <el-tag type="success">22℃</el-tag>
            </p>
            <p>
              <span class="QxName">湿度：</span>
              <el-tag type="info">16%</el-tag>
            </p>
            <p>
              <span class="QxName">风向：</span>
              <el-tag type="warning">东北风</el-tag>
            </p>
            <p>
              <span class="QxName">风力：</span>
              <el-tag type="danger">3级</el-tag>
            </p>

            <p>
              <span class="QxName">降水：</span>
              <el-tag>0</el-tag>
            </p>
          </div>
          <el-image
            style="width: 100%; height:100%;"
            fit="contain"
            :src="url"
            :preview-src-list="[url]"
          />
        </el-card>

        <el-container>
          <el-aside width="60px">
            <!-- 左箭头 -->
            <div id="leftBox" @click="uparr">
              <i id="leftIconSmall" class="el-icon-arrow-left" />
            </div>
          </el-aside>
          <el-main id="SmallBox" style="position:relative">
            <!-- 抓拍标志  未实现 -->
            <el-badge
              v-if="newPhont"
              value="抓拍"
              class="item"
              style="position:absolute;top:22px;left:15px; z-index:999;"
            />
            <!-- 小图列表 -->
            <el-card
              ref="imgSbox"
              v-for="(item,i) in imgArr"
              :key="i"
              shadow="never"
              style="width:20%"
            >
              <div
              v-if='(item.createdAt !=="暂无图片")'
                style="text-align: right;"
              >{{ item.createdAt | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
              <el-image
                v-if="item.url"
                :key="i"
                ref="i"
                lazy
                style="width: 100%; height: 89%; margin:1%;border-radius:10px;"
                :src="item.url"
                @error="imgErrFun()"
                :class="{'ImgActive' : i === imgIndex}"
                fit="contain"
                @click="testIndex(item.url,i)"
              />
            </el-card>
          </el-main>
          <!-- 右箭头 -->
          <el-aside width="60px">
            <div id="leftBox" @click="downarr">
              <i id="leftIconSmall" class="el-icon-arrow-right" />
            </div>
          </el-aside>
        </el-container>
      </el-card>
      <!-- 右边栏 -->
      <el-aside id="rightBox" width="320px">
        <el-card shadow="never" class="elCard" style="height:100%" :body-style="{padding:'10px'}">
          <div id="top" style="font-family: SimHei; font-weight:600;">选项操作</div>
          <el-card id="clenderBox" shadow="never" :body-style="{padding:'10px'}">
            <div
              style="color:#888; font-family: SimHei; font-size:10px; padding-bottom:5px;"
            >选择日期快速查询</div>
            <!-- 日历插件 Calendar -->
            <div id="calender">
              <Calendar ref="Calendar" @choseDay="clickDay" />
            </div>
          </el-card>
          <!-- 按钮组 -->
          <el-card id="btnBox" shadow="never" :body-style="{padding:'10px'}">
            <div
              id="btnBoxTop"
              style="font-family: SimHei; color:#999999; font-size:10px; padding-bottom:0px;"
            >操作选项</div>
            <el-row :gutter="20" :span="24">
              <el-col :span="10" :offset="1">
                <el-card
                  id="txzp"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="deviceSnap"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px;display:block;"
                  >&#xe620;</span>
                  <p>主动抓拍</p>
                </el-card>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-card
                  id="spps"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="msgBox"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px; display:block;"
                  >&#xe828;</span>

                  <p>视频拍摄</p>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20" :span="24">
              <el-col :span="10" :offset="1">
                <el-card
                  id="kpsz"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="DeviceSetting"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px; display:block;"
                  >&#xe6e7;</span>

                  <p>定时拍照</p>
                </el-card>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-card
                  id="pzsz"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="CopeyFun"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px;display:block;"
                  >&#xe618;</span>

                  <p>复制信息</p>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20" :span="24">
              <el-col :span="10" :offset="1">
                <el-card
                  id="yjts"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="alarmBoxFun"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px;display:block;"
                  >&#xe615;</span>

                  <p>预警推送</p>
                </el-card>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-card
                  id="lstp"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="lsImgFun"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px;display:block;"
                  >&#xe66a;</span>

                  <p>历史图片</p>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20" :span="24">
              <el-col :span="10" :offset="1">
                <el-card
                  id="sbcq"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="msgBox"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px;display:block;"
                  >&#xe661;</span>

                  <p>设备重启</p>
                </el-card>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-card
                  id="sbcz"
                  class="box-card"
                  shadow="never"
                  :body-style="{padding:'0px'}"
                  @click.native="msgBox"
                >
                  <span
                    id="One"
                    class="icon iconfont"
                    style="font-size:30px;display:block;"
                  >&#xe611;</span>

                  <p>设备重置</p>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
          <!-- 设备操作 -->
          <el-card id="jcxBox" shadow="never">
            <p class="topTextSmall">设备配置</p>
            <el-row :gutter="10" :span="24" class="btnRow">
              <el-col :span="22" :offset="1">
                <div class="btnCol" @click="msgBox">
                  <span id="One" class="icon iconfont">&#xe764;</span>
                  线路总览
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="10" class="btnRow">
              <el-col :span="22" :offset="1">
                <div class="btnCol" @click="msgBox">
                  <span id="One" class="icon iconfont">&#xe65b;</span>
                  隐患设置
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" :span="24" class="btnRow">
              <el-col :span="22" :offset="1">
                <div class="btnCol" @click="yxcsFun">
                  <span id="One" class="icon iconfont">&#xe6a6;</span>
                  运行参数
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="btnRow">
              <el-col :span="22" :offset="1">
                <div class="btnCol" @click="msgBox">
                  <span id="One" class="icon iconfont">&#xe606;</span>
                  设备详情
                </div>
              </el-col>
            </el-row>
          </el-card>
          <!-- 切换杆塔，未实现 注释掉 -->
          <!-- <el-card style="margin-top:10px;" shadow="never">
            <el-button type="button" style="background:#f7b84f; color:#Fff;" @click="msgBox">
              <i class="el-icon-arrow-left"></i> 上一杆塔
            </el-button>
            <el-button
              type="button"
              style="background:#f7b84f; color:#Fff; float:right;"
              @click="msgBox"
            >
              下一杆塔
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </el-card>-->
        </el-card>
      </el-aside>
    </el-container>
    <!-- 定时拍照间隔设置 -->
    <el-dialog :title="titleName" :visible.sync="SettingBox" width="30%" center>
      <div v-if="!mimaBox">
        <el-input v-model="mima" placeholder="123456" show-password />
      </div>
      <div v-if="!mimaBox" slot="footer">
        <el-button type="primary" @click="mimaFun">确定</el-button>
      </div>
      <div v-else slot="footer">
        <el-button type="primary" @click="FiveM">5分钟</el-button>
        <el-button type="primary" @click="FifteenM">15分钟</el-button>
        <el-button type="primary" @click="Halfhour">30分钟</el-button>
      </div>
    </el-dialog>
    <!-- 运行参数 未实现  假数据 -->
    <el-dialog title="运行参数" :visible.sync="yxcsBox" width="20%">
      <el-form ref="form" label-width="120px">
        <el-form-item label="程序版本号" size="mini">
          <el-input v-model="yxcs.cxbbh" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="电池类型" size="mini">
          <el-input v-model="yxcs.dclx" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="有无降级电容" size="mini">
          <el-input v-model="yxcs.jjdr" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="当前时间" size="mini">
          <el-input v-model="yxcs.dqsj" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="电池电量" size="mini">
          <el-input v-model="yxcs.dcdl" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="电池电压" size="mini">
          <el-input v-model="yxcs.dcdy" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="充电电压" size="mini">
          <el-input v-model="yxcs.cddy" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="太阳能板电压" size="mini">
          <el-input v-model="yxcs.tynbdy" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="超级电容电压" size="mini">
          <el-input v-model="yxcs.ckdrdy" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="充电电流" size="mini">
          <el-input v-model="yxcs.cddl" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="负载电流" size="mini">
          <el-input v-model="yxcs.fzdl" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="工作温度" size="mini">
          <el-input v-model="yxcs.gzwd" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="控制板工作模式" size="mini">
          <el-input v-model="yxcs.kzbgzms" placeholder disabled class="yxcsInput" />
        </el-form-item>
        <el-form-item label="浮充状态" size="mini">
          <el-input v-model="yxcs.fczt" placeholder disabled class="yxcsInput" />
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 历史图片  粗略功能  需要完善 -->
    <el-dialog id="lsImg" :title="topData" :visible.sync="lsImgBox" width="90%">
      <el-row :gutter="10" style="padding-bottom:20px;">
        <el-col :span="4" :offset="4">
          <!-- <label style="font-size:16px;">所属线路：{{ topData }}</label> -->
        </el-col>
        <el-col :span="6" :offset="3">
          <label>选择时间：</label>
          <el-date-picker
            v-model="LsImgDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="lsImgdateFun"
          />
        </el-col>
      </el-row>

      <div style="height:800px;overflow:auto; position:relative">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item ,i) in lsImgData " :key="i">
            <el-card style="margin-top:20px">
              <label
                style="padding-bottom:15px; display:block;text-align:center"
              >拍摄时间：{{ item.createdAt | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</label>
              <el-image
                style="width: 100%; height: 400px"
                :src="item.url"
                fit="fill"
                :preview-src-list="[item.url]"
                lazy
              />
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 预警推送 -->
    <el-dialog title="预警推送" :visible.sync="yujingBox" width="30%">
      <div>
        <el-form ref="form" label-width="180px">
          <el-form-item label="预警原因：">
            <el-select v-model="alarmCause" placeholder multiple>
              <!-- 与后端约定变量 详细值在语雀-->
              <el-option
                v-for="item in this.LABEL_DATA.ALARM_CAUSE"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="预警级别：">
            <el-select v-model="alarmLevel" placeholder>
              <el-option
                v-for="item in this.LABEL_DATA.ALARM_LEVEL"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="yujingBox = false">取 消</el-button>
        <el-button type="primary" @click="alarmFun">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<style lang="scss" scoped>
#lsImg {
  >>> .el-dialog {
    margin-top: 5vh !important;
  }
}
.yxcsInput {
  width: 200px;
  >>> input {
    color: #000 !important;
  }
}
#imgCardBox {
  height: 600px;
  width: 98%;
  margin-left: 1%;
  // border: 1px solid;
  border-radius: 10px;
  position: relative;
}

#el-select >>> .el-input__inner {
  border-radius: 5.58px;
}

.btnSelect {
  padding: 5px;
  border: 1px solid #e3e3e5;
  border-radius: 5px;
  float: right;
  margin-right: 10px;
  margin-top: 15px;
}

#btnBox {
  height: 25%;

  >>> .el-card__body {
    height: 100%;
  }

  >>> .el-card__header {
    padding: 5px;
  }

  margin-top: 10px;

  .box-card >>> .el-card__body {
    height: 100%;
  }

  .el-row {
    height: 50%;
  }

  .el-col {
    height: 100%;
  }

  .box-card {
    height: 4.5rem;
    margin-top: 10px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;

    span {
      margin-top: 10px;
    }
  }

  p {
    // color: #fff;
    font-size: 13px;
    line-height: 0;
    margin-top: 12px;
  }
}

.elCard >>> .el-card__body {
  height: 100%;
}

.elCard {
  float: left;

  #txzp {
    background: #1ca3ff;
    color: #fff;

    &:hover {
      background: #fff;
      color: #1ca3ff !important;
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      border: 0 solid #fff;
    }

    &:active {
      // margin-top: 10%;
      // margin-left: 20%;
      // width: 85%;
      // height: 65%;
      // background: pink;
      border: 0 solid #fff;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
      margin-left: 0;
      box-shadow: 0 0 0 #fff !important;
    }
  }

  #pzsz {
    background: #f74f77;
    color: #fff;

    &:hover {
      background: #fff;
      color: #f74f77 !important;
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      border: 0 solid #fff;
    }

    &:active {
      // margin-top: 10%;
      // margin-left: 20%;
      // width: 85%;
      // height: 65%;
      // background: pink;
      border: 0 solid #fff;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
      margin-left: 0;
      box-shadow: 0 0 0 #fff !important;
    }
  }

  #spps {
    background: #ababab;
    color: #fff;
    // &:hover {
    //   background: #fff;
    //   color: #f7b84f !important;
    //   -webkit-transform: translateY(-6px);
    //   transform: translateY(-6px);
    //   -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    //   box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important ;
    //   border: 0px solid #fff;
    // }
    // &:active {
    //   border: 0px solid #fff;
    //   -webkit-transform: translateY(0px);
    //   transform: translateY(0px);
    //   margin-left: 0;
    //   box-shadow: 0 0 0 #fff !important;
    // }
  }

  #kpsz {
    background: #6b5af4;
    color: #fff;
    &:hover {
      background: #fff;
      color: #6b5af4 !important;
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
      border: 0px solid #fff;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
      margin-left: 0;
      box-shadow: 0 0 0 #fff !important;
    }
  }

  #yjts {
    background: #28d7c0;
    color: #fff;

    &:hover {
      background: #fff;
      color: #28d7c0 !important;
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      border: 0 solid #fff;
    }

    &:active {
      // margin-top: 10%;
      // margin-left: 20%;
      // width: 85%;
      // height: 65%;
      // background: pink;
      border: 0 solid #fff;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
      margin-left: 0;
      box-shadow: 0 0 0 #fff !important;
    }
  }
  #sbcq {
    background: #ff9900;
    color: #fff;

    &:hover {
      background: #fff;
      color: #ff9900 !important;
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      border: 0 solid #fff;
    }

    &:active {
      // margin-top: 10%;
      // margin-left: 20%;
      // width: 85%;
      // height: 65%;
      // background: pink;
      border: 0 solid #fff;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
      margin-left: 0;
      box-shadow: 0 0 0 #fff !important;
    }
  }

  #lstp {
    background: #1ca3ff;
    color: #fff;

    &:hover {
      background: #fff;
      color: #1ca3ff !important;
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      border: 0 solid #fff;
    }

    &:active {
      // margin-top: 10%;
      // margin-left: 20%;
      // width: 85%;
      // height: 65%;
      // background: pink;
      border: 0 solid #fff;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
      margin-left: 0;
      box-shadow: 0 0 0 #fff !important;
    }
  }

  #sbcz {
    background: #f74f77;
    color: #fff;

    &:hover {
      background: #fff;
      color: #f74f77 !important;
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3) !important;
      border: 0 solid #fff;
    }

    &:active {
      // margin-top: 10%;
      // margin-left: 20%;
      // width: 85%;
      // height: 65%;
      // background: pink;
      border: 0 solid #fff;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
      margin-left: 0;
      box-shadow: 0 0 0 #fff !important;
    }
  }

  #jcxBox {
    margin-top: 10px;

    .topTextSmall {
      background: #1ca3ff;
      width: 100%;
      text-align: center;
      margin: 0;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      border-radius: 10px;
      color: #fff;
    }

    .btnRow {
      margin-top: 10px;

      .btnCol {
        border: 2px solid #e3e3e5;
        border-radius: 5px;
        text-align: center;
        line-height: 22px;
        color: #868686;
        font-size: 13px;
        cursor: pointer;

        span {
          font-size: 22px;
        }

        &:hover {
          background: #1ca3ff;
          color: #fff;
          border: 2px solid #e3e3e500;
        }
      }

      .icon {
        font-size: 26px;
      }
    }
  }
}

.wh_container >>> .wh_content_all {
  background-color: #ffffff !important;
  border: 1px solid #dfe0e6;
  //width: 600px;
  border-radius: 6px;
}

.wh_container {
  margin: 0 !important;
}

.wh_container >>> .wh_top_changge {
  height: 25px;
}

.wh_container >>> .wh_item_date {
  color: #28d7c0;
  height: 20px;
  width: 20px;
}

.wh_container >>> .wh_item_date:hover {
  color: #ffffff;
  background: #136aa7;
  border-radius: 50%;
}

.wh_container >>> .wh_other_dayhide {
  color: #cccccc;
}

.wh_container >>> .wh_content_item {
  height: 20px;
  // width:20px;
  margin-bottom: 0;
  margin-top: 5px;
}

.wh_container >>> .wh_content {
  color: black;
}

.wh_container >>> .wh_top_tag {
  color: #f7b84f;
  line-height: 0;
  font-size: 10px;
  height: 20px;
  width: auto;
}

.wh_container >>> .wh_content_li {
  color: #162947;
  font-weight: bold;
  font-size: 9px;
  background: #1ca3ff;
  color: #fff;
  height: 16px !important;
}

.wh_container >>> .wh_jiantou1 {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  height: 8px;
  width: 8px;
}

.wh_container >>> .wh_jiantou2 {
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  height: 8px;
  width: 8px;
}

.wh_container >>> li {
  height: 16px !important;
  background: #1ca3ff;
  color: #fff;
}

.wh_container >>> .wh_content_item > .wh_isMark {
  background-color: #28d7c0;
  /*border-radius: 0px;*/
}

.wh_container >>> .wh_content_item .wh_isToday {
  background-color: #28d7c0; //当前日期颜色
  /*border-radius: 0px;*/
  color: #ffffff;
}

.wh_container >>> .wh_content_item .wh_chose_day {
  background-color: #136aa7;
  /*border-radius: 0px;*/
  color: #ffffff;
}

#rightBox {
  height: 100%;
  border-radius: 0 !important;
}

#rightBox {
  margin-left: 0;

  #top {
    font-size: 14px;
    color: #333333;
    margin-top: 0 !important;
  }

  #clenderBox {
    margin-top: 10px;

    >>> .el-card__header {
      padding: 5px;
    }
  }
}

#imgBoxSmall {
  height: 12%;
}

#SmallBox {
  // .el-image {
  //   margin-left: 45px;
  // }
  // .el-image:nth-child(1){
  //     margin-left: 0px;
  // }
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
  // border: 1px solid #ccc;
  border-radius: 20px;

  .el-image {
    border: 2px solid rgba(0, 0, 0, 0);
    padding: 5px;

    & >>> img {
      border-radius: 5px;
    }
  }

  .el-image:hover {
    //   -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.5) !important ;
    // box-shadow: 0 2px 12px 0px rgba(0, 36, 100, 0.5) !important ;
    border: 2px solid #136aa7;
  }
  .ImgActive {
    border: 2px solid #136aa7;
  }
}

#leftIconSmall {
  border-radius: 20px;
  font-size: 30px;
  padding: 0;
  width: 40px;
  margin-left: 10px;
}

#leftBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#leftIcon {
  border-radius: 20px;
  font-size: 70px;
  padding: 0;
  width: 60px;
  margin-left: 10px;
}

.Small {
  font-size: 16px;
  line-height: 35px;
  margin-left: 10px;
  color: #333333;
  height: 35px;
}

#bigBoxCard {
  height: 100%;
}

.el-main {
  padding: 0;
  margin: 0;
}

#imgBox {
  border-radius: 0 !important;

  .el-container {
    margin-top: 20px;
    height: 246px;
  }
}

#imgBox >>> .el-card__body {
  height: 100%;
}

.timeBox {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 22px;
  color: #fff;
  z-index: 999;
  background: rgba(44, 61, 75, 0.418);
}
.qixiang {
  position: absolute;
  padding: 0px;
  z-index: 999;
  .QxName {
    color: #666666;
  }
}
.newPhont {
  position: absolute;
  left: 20px;
  top: 35px;
  font-size: 22px;
  color: red;
  z-index: 999;
  background: rgba(0, 0, 0, 0);
}
</style>
<script>
import Axios from "axios";
import Cookies from "js-cookie";
import Calendar from "vue-calendar-component";
import moment from "moment";
import { parseTime } from "@/utils/index.js";
export default {
  components: {
    Calendar
  },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      imgReload: true,
      imgArr: [
        {
          url: "http://47.104.136.74/image/error.jpg",
          createdAt: "暂无图片"
        },
        {
          url: "http://47.104.136.74/image/error.jpg",
          createdAt: "暂无图片"
        },
        {
          url: "http://47.104.136.74/image/error.jpg",
          createdAt: "暂无图片"
        },
        {
          url: "http://47.104.136.74/image/error.jpg",
          createdAt: "暂无图片"
        },
        {
          url: "http://47.104.136.74/image/error.jpg",
          createdAt: "暂无图片"
        }
      ],
      titleName: "请输入密码",
      mimaBox: false,
      newPhont: false,
      totalAt: null,
      yujingBox: false,
      alarmCause: [],
      alarmLevel: null,
      alarmImgUrl: null,
      deviceId: null,
      dateMsg: "",
      mima: null,
      dateArr: [],
      ul: 1,
      imgIndex: 0,
      url: "http://47.104.136.74/image/error.jpg",
      srcList: ["http://47.104.136.74/image/3.jpg"],
      urls: [
        "http://47.104.136.74/image/error.jpg",
        "http://47.104.136.74/image/error.jpg",
        "http://47.104.136.74/image/error.jpg",
        "http://47.104.136.74/image/error.jpg",
        "http://47.104.136.74/image/error.jpg"
      ],
      urlsdata: [],
      options: [],
      value: "",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      },
      department: 0,
      topData: "",
      topDataSave: " ",
      towerId: "",
      gongsi: "",
      bumen: "",
      diya: "",
      xianlu: "",
      ganta: "",
      deviceCode: null,
      userId: Number(localStorage.getItem("userId")),
      SettingBox: false,
      treeId: [3],
      TowerNumId: "",
      set: setInterval(this.setFun, 5000),
      yxcsBox: false,
      yxcs: {
        cxbbh: "1.0",
        dclx: "锂电池",
        jjdr: "无",
        dqsj: moment().format("YYYY-MM-DD hh:mm:ss"),
        dcdl: `9${Math.floor(Math.random() * 10)}%`,
        dcdy: `11.${Math.floor(Math.random() * 10)}V`,
        cddy: `15.${Math.floor(Math.random() * 10)}V`,
        tynbdy: `21.${Math.floor(Math.random() * 10)}V`,
        ckdrdy: `15.${Math.floor(Math.random() * 10)}V`,
        cddl: `5.${Math.floor(Math.random() * 10)}A`,
        fzdl: `5.${Math.floor(Math.random() * 10)}A`,
        gzwd: `3${Math.floor(Math.random() * 10)}.${Math.floor(
          Math.random() * 10
        )}℃`,
        kzbgzms: "正常模式",
        fczt: "充放电"
      },
      lsImgBox: false,
      lsImgData: undefined,
      LsImgDate: undefined,
      totalCountNum: undefined,
      loading: ""
    };
  },
  mounted() {
    //获取最近一次上传图片的杆塔id
    Axios({
      method: "POST",
      url:
        this.GLOBAL.AJAX_URL +
        "/v1/tower/get-tower-by-user-id?user-id=" +
        this.userId,
      headers: {
        Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
      }
    }).then(msg => {
      this.TowerNumId = msg.data.data.id;
      this.msg();
    });
  },
  //页面关闭时清除定时任务
  beforeDestroy() {
    if (this.set) {
      clearInterval(this.set);
    }
  },
  methods: {
    // 小图加载失败
    imgErrFun() {
      if (this.towerId !== "") {
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/picture/get-by-tower-id?size=5&user-id=" +
            Number(localStorage.getItem("userId")) +
            "&tower-id=" +
            this.towerId +
            "&day=" +
            moment().format("YYYY-MM-DD"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          this.imgArr = msg.data.data.pictures;
        });
      }
      this.$forceUpdate();
    },
    //拍照间隔二级密码确认  演示使用
    mimaFun() {
      if (this.mima === "123456") {
        this.titleName = "请选择拍摄间隔";
        this.mimaBox = true;
      } else {
        this.$message.error("密码错误！");
      }
    },

    alarmBoxFun() {
      if (this.deviceCode === null) {
        this.$message.error("请选择杆塔");
      } else {
        this.yujingBox = true;
        // 图片 url前加上ip
        this.alarmImgUrl = this.url.replace("http://47.104.136.74:8083/", "");
      }
    },
    alarmFun() {
      // 预警推送
      Axios({
        method: "POST",
        url: this.GLOBAL.AJAX_URL + "/v1/alarm/create",
        data: {
          causes: String(this.alarmCause),
          level: this.alarmLevel,
          alarmImagePath: this.alarmImgUrl,
          deviceId: Number(this.deviceId)
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("预警成功！");
          this.yujingBox = false;
          this.alarmCause = [];
          this.alarmLevel = null;
        } else {
          this.$message.error("预警失败！");
          this.yujingBox = false;
          this.alarmCause = [];
          this.alarmLevel = null;
        }
      });
    },
    // 初始函数  获取图片
    msg() {
      Axios({
        method: "POST",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/picture/get-by-tower-id?size=5&user-id=" +
          this.userId +
          "&tower-id=" +
          this.TowerNumId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        console.log(msg);
        console.log(this.imgArr.createdAt);
        if (msg.data.code === 20011) {
          this.$message.error("没有访问权限！");
        } else {
          if (msg.data.data.totalCount === 0) {
            this.$message.error("暂无图片");
          } else {
            this.imgArr = msg.data.data.pictures;
            this.url = msg.data.data.pictures[0].url;
            this.dateMsg = moment(msg.data.data.pictures[0].createdAt).format(
              "YYYY-MM-DD hh:mm:ss"
            );
            var urlse = [];
            var dateArr = [];
            for (var a = 0; a < msg.data.data.pictures.length; a++) {
              urlse.push(msg.data.data.pictures[a].url);
              dateArr.push(msg.data.data.pictures[a].createdAt);
            }
            this.srcList = urlse;
            this.dateArr = dateArr;
            if (msg.data.data.pictures.length <= 5) {
              var urlsev = [];
              var dateArr = [];
              for (var b = 0; b < msg.data.data.pictures.length; b++) {
                dateArr.push(msg.data.data.pictures[b].createdAt);
                urlsev.push(msg.data.data.pictures[b].url);
                // console.log(this.urls);
              }
              this.urls = urlsev;
              this.dateArr = dateArr;
              this.ul = this.urls.length;
            } else {
              this.urlsdata = msg.data.data.pictures;
              var dateArr = [];
              var urlseve = [];
              for (var b = 0; b < 5; b++) {
                urlseve.push(msg.data.data.pictures[b].url);
                dateArr.push(msg.data.data.pictures[b].createdAt);
                // console.log(this.urls);
              }
              this.dateArr = dateArr;
              this.urls = urlseve;
            }
          }
        }
      });
    },
    // 树列表样式
    renderConent(h, node, data, store) {
      if (node.node.level === 1) {
        return (
          <span>
            <span style="font-size:14px; color:#000000">
              {" "}
              {node.data.name}{" "}
            </span>
          </span>
        );
      }
      if (node.node.level === 2) {
        return (
          <span>
            <i class="icon iconfont"> &#xe60d; </i>
            <span style="font-size:13px; color:#67C23A;">
              {" "}
              {node.data.name}{" "}
            </span>{" "}
          </span>
        );
      }
      if (node.node.level === 3) {
        return (
          <span>
            <i class="icon iconfont"> &#xe610; </i>{" "}
            <span style="font-size:12px; color:#E6A23C;">
              {" "}
              {node.data.name}{" "}
            </span>{" "}
          </span>
        );
      }
      if (node.node.level === 4) {
        return (
          <span>
            <i class="icon iconfont"> &#xe764; </i>{" "}
            <span style="font-size:12px; color:#F56C6C;">
              {" "}
              {node.data.name}{" "}
            </span>{" "}
          </span>
        );
      }
      if (node.node.level === 5) {
        return (
          <span>
            {" "}
            <span style="font-size:12px; color:#409EFF;">
              {" "}
              {node.data.name}{" "}
            </span>{" "}
          </span>
        );
      }
    },
    // 树列表每层数据
    oneleave(node, resolve) {
      Axios({
        method: "POST",
        url: this.GLOBAL.AJAX_URL + "/v1/company/get-no-limit",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        msg.data.data[0].key = 1;
        resolve(msg.data.data);
      });
    },
    // 树列表数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.oneleave(node, resolve);
      }

      if (node.level === 1) {
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/department/get-no-limit-by-company-id?company-id=" +
            node.data.id,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.data === null) {
            return resolve("");
          } else {
            return resolve(msg.data.data);
          }
        });
      }
      if (node.level === 2) {
        this.department = node.data.id;
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/line/get-voltage-level?department-id=" +
            node.data.id,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.data === null) {
            return resolve([]);
          } else {
            return resolve(msg.data.data);
          }
        });
      }
      if (node.level === 3) {
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/line/get-line?department-id=" +
            this.department +
            "&voltage-level=" +
            node.data.id,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.data === null) {
            return resolve([]);
          } else {
            return resolve(msg.data.data);
          }
        });
      }
      if (node.level === 4) {
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/line-tower/get-tower?line-id=" +
            node.data.id,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.data === null) {
            return resolve([]);
          } else {
            var msgdata = [];
            for (var i = 0; i < msg.data.data.length; i++) {
              var msgdataobj = {};
              msgdataobj.name = msg.data.data[i].towerNum;
              msgdataobj.id = msg.data.data[i].towerID;
              msgdata.push(msgdataobj);
            }

            return resolve(msgdata);
          }
        });
      }
      if (node.level === 5) {
        return resolve([]);
      }
    },
    // 图片左上角杆塔
    msgId(data, node, objc) {
      if (node.level === 1) {
        this.gongsi = node.data.name;
      }
      if (node.level === 2) {
        this.bumen = node.data.name;
      }
      if (node.level === 3) {
        this.diya = node.data.name;
      }
      if (node.level === 4) {
        this.xianlu = node.data.name;
      }
      if (node.level === 5) {
        this.ganta = node.data.name;
        this.topData = this.bumen + this.diya + this.xianlu + this.ganta;
        this.towerId = data.id;
        this.$refs.Calendar.ChoseMonth(moment().format("YYYY-MM-DD"));
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/picture/get-by-tower-id?size=5&user-id=" +
            Number(localStorage.getItem("userId")) +
            "&tower-id=" +
            this.towerId +
            "&day=" +
            moment().format("YYYY-MM-DD"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(msg);
          if (msg.data.code === 20011) {
            this.$message.error("没有访问权限！");
          } else {
            if (msg.data.data.totalCount === 0) {
              // this.$message.error("暂无图片");
            } else {
              this.imgArr = msg.data.data.pictures;
              this.url = msg.data.data.pictures[0].url;
              this.dateMsg = moment(msg.data.data.pictures[0].createdAt).format(
                "YYYY-MM-DD hh:mm:ss"
              );
              this.deviceCode = msg.data.data.pictures[0].deviceCode;
              this.deviceId = msg.data.data.pictures[0].deviceId;
              this.totalAt = moment(msg.data.data.pictures[0].createdAt).format(
                "YYYY-MM-DD hh:mm:ss"
              );
              var urlse = [];
              var dateArr = [];
              for (var a = 0; a < msg.data.data.pictures.length; a++) {
                urlse.push(msg.data.data.pictures[a].url);
                // console.log(this.srcList);
                dateArr.push(msg.data.data.pictures[a].createdAt);
              }
              this.srcList = urlse;
              this.dateArr = dateArr;
              if (msg.data.data.pictures.length <= 5) {
                var urlsev = [];
                var dateArr = [];
                for (var b = 0; b < msg.data.data.pictures.length; b++) {
                  urlsev.push(msg.data.data.pictures[b].url);
                  dateArr.push(msg.data.data.pictures[b].createdAt);
                  // console.log(this.urls);
                }
                // console.log();
                this.urls = urlsev;
                this.dateArr = dateArr;
                this.ul = this.urls.length;
              } else {
                this.urlsdata = msg.data.data.pictures;
                var urlseve = [];
                var dateArr = [];
                for (var b = 0; b < 5; b++) {
                  urlseve.push(msg.data.data.pictures[b].url);
                  dateArr.push(msg.data.data.pictures[b].createdAt);
                  // console.log(this.urls);
                }
                this.dateArr = dateArr;
                this.urls = urlseve;
              }
            }
          }
        });
      }
    },
    // 点击小图预览大图
    testIndex(url, i) {
      this.url = url;
      this.imgIndex = i;
      this.dateMsg = this.dateArr[i];
      this.newPhont = false;
    },
    // 上一页
    uparr() {
      if (this.ul === 1) {
        this.$message("没有更多的图片了");
      } else {
        this.ul = this.ul - 1;
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/picture/get-by-tower-id?user-id=" +
            localStorage.getItem("userId") +
            "&tower-id=" +
            this.towerId +
            "&page=" +
            this.ul +
            "&size=5",
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          // console.log(msg);
          var arr = [];
          var dateArr = [];
          for (var i = 0; i < msg.data.data.pictures.length; i++) {
            arr.push(msg.data.data.pictures[i].url);
            dateArr.push(msg.data.data.pictures[i].createdAt);
          }
          this.dateArr = dateArr;
          this.urls = arr;
          this.imgArr = msg.data.data.pictures;
        });
      }
    },
    // 下一页
    downarr() {
      this.ul = this.ul + 1;
      Axios({
        method: "POST",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/picture/get-by-tower-id?user-id=" +
          localStorage.getItem("userId") +
          "&tower-id=" +
          this.towerId +
          "&page=" +
          this.ul +
          "&size=5",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log("接口");
        if (msg.data.data.pictures === undefined) {
          this.$message("没有更多图片了");
        } else {
          var arr = [];
          var dateArr = [];
          for (var i = 0; i < msg.data.data.pictures.length; i++) {
            arr.push(msg.data.data.pictures[i].url);
            dateArr.push(msg.data.data.pictures[i].createdAt);
          }
          this.urls = arr;
          this.imgIndex = 4;
          this.dateArr = dateArr;
          this.imgArr = msg.data.data.pictures;
        }
      });
    },
    // 选择日期
    clickDay(data) {
      Axios({
        method: "POST",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/picture/get-by-tower-id?size=5&user-id=" +
          localStorage.getItem("userId") +
          "&tower-id=" +
          this.towerId +
          "&day=" +
          moment(data).format("YYYY-MM-DD"),
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 20011) {
          // console.log("没有访问权限！");
        } else {
          // console.log(msg);
          // console.log(this.towerId);
          if (msg.data.code === 31001) {
            this.$message.error("请选择杆塔");
          }
          if (msg.data.data.pictures === null) {
            this.$message.error("暂无图片");
          } else {
            // console.log(msg)
            this.imgArr = msg.data.data.pictures;
            this.url = msg.data.data.pictures[0].url;
            this.deviceCode = msg.data.data.pictures[0].deviceCode;
            this.deviceId = msg.data.data.pictures[0].deviceId;
            var dateArr = [];
            var urlse = [];
            for (var a = 0; a < msg.data.data.pictures.length; a++) {
              urlse.push(msg.data.data.pictures[a].url);
              dateArr.push(msg.data.data.pictures[a].createdAt);
              // console.log(this.srcList);
            }
            this.dateArr = dateArr;
            this.srcList = urlse;
            if (msg.data.data.pictures.length <= 5) {
              var urlsev = [];
              var dateArr = [];
              for (var b = 0; b < msg.data.data.pictures.length; b++) {
                urlsev.push(msg.data.data.pictures[b].url);
                dateArr.push(msg.data.data.pictures[b].createdAt);
                // console.log(this.urls);
              }
              // console.log();
              this.urls = urlsev;
              this.dateArr = dateArr;
              this.ul = this.urls.length;
            } else {
              this.urlsdata = msg.data.data.pictures;
              var dateArr = [];
              var urlseve = [];
              for (var b = 0; b < 5; b++) {
                urlseve.push(msg.data.data.pictures[b].url);
                dateArr.push(msg.data.data.pictures[b].createdAt);
                // console.log(this.urls);
              }
              this.dateArr = dateArr;
              this.urls = urlseve;
            }
          }
        }
      });
    },
    clickToday(data) {},
    // 未完成功能提示信息
    msgBox() {
      this.$message.warning("该账号不支持此功能");
    },
    // 抓拍
    deviceSnap() {
      if (this.towerId !== "") {
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/hub/device-snap?user-id=" +
            this.userId +
            "&tower-id=" +
            this.towerId,
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.message === "OK") {
            this.$message.success("抓拍成功！");
          }
        });
      } else {
        this.$message.warning("请选择杆塔！");
      }
    },
    // 判断是否选择杆塔
    DeviceSetting() {
      if (this.deviceCode !== "") {
        this.SettingBox = true;
      } else {
        this.$message.warning("请选择设备！");
      }
    },
    // 设置抓拍时间
    FiveM() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/hub/device-snap-setting?uuid=" +
          this.deviceCode +
          "&snap-invert=1" +
          "&user-id=" +
          this.userId +
          "&tower-id=" +
          this.towerId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("设置成功！");
        } else {
          this.$message.error("设置失败！");
        }
        this.SettingBox = false;
        this.mimaBox = false;
      });
    },
    // 设置抓拍时间
    FifteenM() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/hub/device-snap-setting?uuid=" +
          this.deviceCode +
          "&snap-invert=2" +
          "&user-id=" +
          this.userId +
          "&tower-id=" +
          this.towerId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("设置成功！");
        } else {
          this.$message.error("设置失败！");
        }
        this.SettingBox = false;
        this.mimaBox = false;
      });
    },
    // 设置抓拍时间
    Halfhour() {
      Axios({
        method: "post",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/hub/device-snap-setting?uuid=" +
          this.deviceCode +
          "&snap-invert=3" +
          "&user-id=" +
          this.userId +
          "&tower-id=" +
          this.towerId,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.code === 0) {
          this.$message.success("设置成功！");
        } else {
          this.$message.error("设置失败！");
        }
        this.SettingBox = false;
        this.mimaBox = false;
      });
    },
    // 复制信息
    CopeyFun() {
      if (this.ganta !== "") {
        this.$copyText(
          `部门：${this.bumen},线路：${this.xianlu},杆塔号：${this.ganta},图片地址：${this.url}`
        );
        this.$message.success("复制成功");
      } else {
        this.$message.error("请先选择杆塔");
      }
    },
    // 定时任务已选择杆塔
    setFun() {
      if (this.towerId !== "") {
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/picture/get-by-tower-id?size=5&user-id=" +
            Number(localStorage.getItem("userId")) +
            "&tower-id=" +
            this.towerId +
            "&day=" +
            moment().format("YYYY-MM-DD"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          if (msg.data.code === 20011) {
            // this.$message.error("没有访问权限！");
          } else {
            if (msg.data.data.totalCount === 0) {
              // this.$message.error("暂无图片");
            } else {
              if (this.totalAt === msg.data.data.pictures[0].createdAt) {
                // console.log(this.totalAt);
                // console.log(msg)
                if (this.loading !== "") {
                  this.loading.close();
                  this.loading = "";
                }
                return;
              } else {
                if (this.loading !== "") {
                  this.loading.close();
                  this.loading = "";
                }
                this.imgArr = msg.data.data.pictures;
                // console.log(this.totalAt);
                // console.log(msg.data.data.pictures[0].createdAt)
                this.totalAt = msg.data.data.pictures[0].createdAt;
                this.dateMsg = msg.data.data.pictures[0].createdAt;
                this.url = msg.data.data.pictures[0].url;
                this.deviceCode = msg.data.data.pictures[0].deviceCode;
                var urlse = [];
                var dateArr = [];
                this.newPhont = true;
                for (var a = 0; a < msg.data.data.pictures.length; a++) {
                  urlse.push(msg.data.data.pictures[a].url);
                  // console.log(this.srcList);
                  dateArr.push(msg.data.data.pictures[a].createdAt);
                }
                this.srcList = urlse;
                this.dateArr = dateArr;
                if (msg.data.data.pictures.length <= 5) {
                  var urlsev = [];
                  var dateArr = [];
                  for (var b = 0; b < msg.data.data.pictures.length; b++) {
                    urlsev.push(msg.data.data.pictures[b].url);
                    dateArr.push(msg.data.data.pictures[b].createdAt);
                    // console.log(this.urls);
                  }
                  // console.log();
                  this.urls = urlsev;
                  this.dateArr = dateArr;
                  this.ul = this.urls.length;
                } else {
                  this.urlsdata = msg.data.data.pictures;
                  var urlseve = [];
                  var dateArr = [];
                  for (var b = 0; b < 5; b++) {
                    urlseve.push(msg.data.data.pictures[b].url);
                    dateArr.push(msg.data.data.pictures[b].createdAt);
                    // console.log(this.urls);
                  }
                  this.dateArr = dateArr;
                  this.urls = urlseve;
                }
              }
            }
          }
        });
      } else {
        this.setmsg();
      }
    },
    // 定时任务未选择杆塔
    setmsg() {
      Axios({
        method: "POST",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/picture/get-by-tower-id?size=5&user-id=" +
          this.userId +
          "&tower-id=" +
          this.TowerNumId +
          "&day=" +
          moment().format("YYYY-MM-DD"),
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        if (msg.data.data.code === 20011) {
        } else {
          if (msg.data.data.totalCount === 0) {
          } else {
            if (this.totalAt === msg.data.data.pictures[0].createdAt) {
              return;
            } else {
              this.imgArr = msg.data.data.pictures;
              this.totalAt = msg.data.data.pictures[0].createdAt;
              this.url = msg.data.data.pictures[0].url;
              this.dateMsg = msg.data.data.pictures[0].createdAt;
              var urlse = [];
              var dateArr = [];
              for (var a = 0; a < msg.data.data.pictures.length; a++) {
                urlse.push(msg.data.data.pictures[a].url);
                dateArr.push(msg.data.data.pictures[a].createdAt);
              }
              this.srcList = urlse;
              this.dateArr = dateArr;
              if (msg.data.data.pictures.length <= 5) {
                var urlsev = [];
                var dateArr = [];
                for (var b = 0; b < msg.data.data.pictures.length; b++) {
                  dateArr.push(msg.data.data.pictures[b].createdAt);
                  urlsev.push(msg.data.data.pictures[b].url);
                }
                this.urls = urlsev;
                this.dateArr = dateArr;
                this.ul = this.urls.length;
              } else {
                this.urlsdata = msg.data.data.pictures;
                var dateArr = [];
                var urlseve = [];
                for (var b = 0; b < 5; b++) {
                  urlseve.push(msg.data.data.pictures[b].url);
                  dateArr.push(msg.data.data.pictures[b].createdAt);
                  // console.log(this.urls);
                }
                this.dateArr = dateArr;
                this.urls = urlseve;
              }
            }
          }
        }
      });
    },
    // 运行参数
    yxcsFun() {
      this.yxcsBox = true;
      this.yxcs.dcdl = `9${Math.floor(Math.random() * 10)}%`;
      this.yxcs.dcdy = `11.${Math.floor(Math.random() * 10)}V`;
      this.yxcs.cddy = `15.${Math.floor(Math.random() * 10)}V`;
      this.yxcs.tynbdy = `21.${Math.floor(Math.random() * 10)}V`;
      this.yxcs.ckdrdy = `15.${Math.floor(Math.random() * 10)}V`;
      this.yxcs.cddl = `5.${Math.floor(Math.random() * 10)}A`;
      this.yxcs.fzdl = `5.${Math.floor(Math.random() * 10)}A`;
      this.yxcs.gzwd = `3${Math.floor(Math.random() * 10)}.${Math.floor(
        Math.random() * 10
      )}℃`;
    },
    // 历史图片
    lsImgFun() {
      if (this.ganta !== "") {
        this.lsImgBox = true;
        Axios({
          method: "POST",
          url:
            this.GLOBAL.AJAX_URL +
            "/v1/picture/get-by-tower-id?user-id=" +
            Number(localStorage.getItem("userId")) +
            "&tower-id=" +
            this.towerId +
            "&day=" +
            moment().format("YYYY-MM-DD"),
          headers: {
            Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
          }
        }).then(msg => {
          console.log(msg);

          if (msg.data.code === 0) {
            if (msg.data.data.totalCount !== 0) {
              this.lsImgData = msg.data.data.pictures;
            } else {
              this.$message.error("暂无图片");
            }
          } else {
            this.$message.error(msg.data.message);
          }
        });
      } else {
        this.$message.error("请先选择杆塔");
      }
    },
    lsImgdateFun(val) {
      // console.log(val);
      Axios({
        method: "POST",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/picture/get-by-tower-id?user-id=" +
          Number(localStorage.getItem("userId")) +
          "&tower-id=" +
          this.towerId +
          "&day=" +
          val,
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 0) {
          if (msg.data.data.totalCount !== 0) {
            this.lsImgData = msg.data.data.pictures;
          } else {
            this.$message.error("暂无图片");
          }
        } else {
          this.$message.error(msg.data.message);
        }
      });
    }
  }
};
</script>
