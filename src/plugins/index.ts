import { App } from "vue";

import "animate.css"; //动画库

import mapboxgl from "./mapboxgl";
import mapboxglDraw from "./mapboxgl-draw";
import antd from "./antd";
import vcharts from "./vcharts";

import icon from "./icon";

const plugins = [vcharts, antd, icon, mapboxgl, mapboxglDraw];

export default {
  install: (app: App) => {
    plugins.forEach((plugin) => {
      plugin.install(app);
    });
  },
};
