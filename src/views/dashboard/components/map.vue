<template>
  <el-card shadow="hover" style="height:100%;border-radius:10px;">
    <div id="topBox">
      <div id="l-map"></div>
    </div>
  </el-card>
</template>
<script>
export default {
  mounted() {
    this.test();
  },
  methods: {
    test() {
      var map = new BMap.Map("l-map");

      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 8);
      map.setMapStyleV2({
        styleId: "97caa9e690b4ac61829a72d16cc1657d"
      });
      // map.setMapStyleV2({
      //   styleId: "97caa9e690b4ac61829a72d16cc1657d"
      // });
      // var marker = new BMap.Marker(new BMap.Point(116.404, 39.915)); // 创建标注
      // map.addOverlay(marker); // 将标注添加到地图中

      var polyline = new BMap.Polyline(
        [
          new BMap.Point(116.399, 39.91),
          new BMap.Point(116.405, 39.92),
          new BMap.Point(116.425, 39.9)
        ],
        { strokeColor: "#e65d6e", strokeWeight: 6, strokeOpacity: 1 }
      );
      map.addOverlay(polyline); //增加折线

      // var circle = new BMap.Circle(point, 500);
      // map.addOverlay(circle); //增加圆
      // hideOver();
      map.enableScrollWheelZoom(); //滚轮缩放
      map.enableContinuousZoom(); //惯性拖拽
    }
    // showOver() {
    //marker.show();
    // polyline.show();
    //circle.show();
    // }
    // hideOver() {
    //   marker.hide();
    //   polyline.hide();
    //   circle.hide();
    // }
  }
};
</script>
<style scoped>

#topBox {
  font-size: 24px;
  height: 100%;
}
.el-card >>> .el-card__body{
  width: 100%;
  height: 100%;
}


#l-map {
  height: 100%;
  width: 100%;
}
</style>