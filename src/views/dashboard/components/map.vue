<template>
  <el-card shadow="hover" style="height:100%;border-radius:10px;">
    <div id="topBox">
      <div id="l-map"></div>
    </div>
  </el-card>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    // this.test();
    // this.msg();
    this.initMap();
  },

  methods: {
    initMap() {
      this.createMap(); //创建地图
      this.setMapEvent(); //设置地图事件
      this.addMapControl(); //向地图添加控件
      this.addMarker(); //向地图中添加marker
    },
    createMap() {
      var map = new BMap.Map("l-map"); //在百度地图容器中创建一个地图
      var point = new BMap.Point(116.404, 39.915); //定义一个中心点坐标
      map.centerAndZoom(point, 8); //设定地图的中心点和坐标并将地图显示在地图容器中
      window.map = map; //将map变量存储在全局
      map.setMapStyleV2({
        styleId: "97caa9e690b4ac61829a72d16cc1657d"
      });
    },
    setMapEvent() {
      map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
      map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
      map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
      map.enableKeyboard(); //启用键盘上下左右键移动地图
    },
    addMapControl() {
      //向地图中添加缩放控件
      var ctrl_nav = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
      });
      map.addControl(ctrl_nav);
      //向地图中添加缩略图控件
      var ctrl_ove = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
      });
      map.addControl(ctrl_ove);
      //向地图中添加比例尺控件
      var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
      map.addControl(ctrl_sca);
    },
    addMarker() {
      var point = new Array(); //定义数组标注经纬信息

      var marker = new Array(); //定义数组点对象信息

      var info = new Array(); //定义悬浮提示信息
      var markerArr = new Array();
      axios({
        method: "post",
        url: this.GLOBAL.AJAX_URL + "/v1/line-tower/get-line-tower-map-data",
        headers: {
          Authorization: "Bearer " + Cookies.get("vue_admin_template_token")
        }
      }).then(msg => {
        markerArr = msg.data.data;
        // var markerArr = this.data;
        for (var i = 0; i < markerArr.length; i++) {
          //遍历
          console.log(markerArr[i]);
          var towers = markerArr[i].towers;
          for (var n = 0; n < towers.length; n++) {
            point[n] = new window.BMap.Point(
              towers[n].longitude,
              towers[n].latitude
            );
            var markerData = new window.BMap.Marker(point[n]);

            marker.push(markerData);
            // marker[n].setAnimation(BMAP_ANIMATION_BOUNCE);
            // marker[n].setLabel(label);
            var infoData = new window.BMap.InfoWindow(
              `<p style='font-size:12px;line-height:1.8em;'>杆塔号：
                ${towers[n].towerNum}</p>`
            );
            info.push(infoData); //悬浮提示信息
          }
        }

        for (var m = 0; m < marker.length; m++) {
          map.addOverlay(marker[m]);
        }
        var polyline = new window.BMap.Polyline(marker, {
          strokeColor: "blue",
          strokeWeight: 200,
          strokeOpacity: 0.5
        });
        map.addOverlay(polyline);
        for (let a = 0; a < marker.length; a++) {
          marker[a].addEventListener("click", function() {
            this.openInfoWindow(info[a]); //悬浮监听提示方法
          });
        }
      });
    }
  }
};
</script>
<style scoped>
#topBox {
  font-size: 24px;
  height: 100%;
}
.el-card >>> .el-card__body {
  width: 100%;
  height: 100%;
}

#l-map {
  height: 100%;
  width: 100%;
}
</style>