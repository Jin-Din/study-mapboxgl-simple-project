import MapboxDraw from '@mapbox/mapbox-gl-draw';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import StaticMode from '@mapbox/mapbox-gl-draw-static-mode';
// import { CircleMode, DragCircleMode, DirectMode, SimpleSelectMode } from 'mapbox-gl-draw-circle'; // 打包可能会遇到问题
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { App } from 'vue';

const draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false, // 不显示默认绘制工具条
  modes: {
    ...MapboxDraw.modes,
    // draw_circle: CircleMode,  // 打包可能会遇到问题
    // drag_circle: DragCircleMode,  // 打包可能会遇到问题
    // direct_select: DirectMode,  // 打包可能会遇到问题
    // simple_select: SimpleSelectMode,  // 打包可能会遇到问题
    draw_rectangle: DrawRectangle,
    static: StaticMode
  }
});

export default {
  install: (app: App) => {
    app.config.globalProperties.$draw = draw;
  }
};

// @ts-ignore: works on Vue 3, fails in Vue 2
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $draw: MapboxDraw;
  }
}
