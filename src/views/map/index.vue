<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>
<script setup lang="ts">
import { GeoJSONSource } from "@sxgis/mapbox-gl-cgcs2000";
import mapboxgl from "@sxgis/mapbox-gl-cgcs2000";

// import mapboxgl from "@sxgis/mapbox-gl-cgcs2000-mapextend"

// import mapboxgl from "@libs/mapboxgl"
mapboxgl.accessToken = "pk.eyJ1IjoibWlub2tpZSIsImEiOiJjazQwbTAybDcwMnc1M25wZmVucnVicXA2In0.9Pasd4KbdTXNmbkAcfFN1Q";

onMounted(() => {
  // 在这里执行初始化地图的操作
  const map = new mapboxgl.Map({
    container: "map",
    center: [108.0668, 34.679],
    zoom: 6,
    minZoom: 1,
    maxZoom: 20,
    style: {
      sources: {
        tianditu: {
          type: "raster",
          tiles: [
            "https://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
            "https://t1.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
            "https://t2.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
            "https://t3.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
            "https://t4.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
            "https://t5.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
            "https://t6.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
            "https://t7.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=4a882e1f6f2eb9fcca769efdbb305e93",
          ],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "tianditu-layer",
          //@ts-ignore
          name: "天地图影像",
          type: "raster",
          source: "tianditu",
          metadata: {
            isBaseMap: true,
          },
        },
      ],
      glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      version: 8,
    },
  });
  map.on("load", () => {
    const marker = new mapboxgl.Marker();
    marker.setLngLat([108.0668, 34.679]).addTo(map);
    marker.setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World</h1>"));
  });
});
</script>
<style scoped lang="scss"></style>
