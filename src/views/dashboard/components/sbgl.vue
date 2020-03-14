<template>
  <el-card shadow="hover" style="height:100%;border-radius:10px;">
    <div id="boxTop">设备管理</div>
    <p class="one">新装设备匹配</p>
    <p class="two">+900<span style="font-size:16px; color:#333;">/1000</span></p>
    <el-progress :percentage="30" :show-text="false"></el-progress>
    <p class="three">
      最新安装了
      <span>900</span> 台设备
    </p>
  </el-card>
</template>
<style lang="scss" scoped>
.el-card >>> .el-card__body{
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
  font-size:0.9em;
  color: #666666;
  span {
    color: #6b5af4;
  }
}
</style>