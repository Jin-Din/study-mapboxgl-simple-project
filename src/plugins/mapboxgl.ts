import mapboxgl from "@sxgis/mapbox-gl-cgcs2000";
import { Map } from "@sxgis/mapbox-gl-cgcs2000";
import { App } from "vue";
import type { AnySourceData, Layer, MapboxGeoJSONFeature, Style } from "@sxgis/mapbox-gl-cgcs2000";
import "@sxgis/mapbox-gl-cgcs2000/dist/mapbox-gl.css";
// import "@assets/styles/mapbox.css";

export default {
  install: (app: App) => {
    // 註冊全局的 MapboxGL 類別
    app.config.globalProperties.mapboxgl = mapboxgl;
  },
};

// declare module "@sxgis/mapbox-gl-cgcs2000" {
//     interface Map{
//
//         /**
//          * [自定义扩展] 扩展 setLayerVisible方法，设置图层的可见性
//          * @param layerId
//          * @param visible
//          */
//         setLayerVisible(layerId: string, visible: boolean):void;
//         /**
//          *   加载雪碧图
//          *   Jin 2023.1.6
//          *   */
//         addSpriteImages(spritePath: string):Promise<void>;
//
//         /**
//          * [自定义扩展] 扩展 addSource方法，加入判断，简化addsource之前的 this.getSource(id) 是否存在的判断
//          * @param id
//          * @param source
//          * @param bOverwrite 是否覆盖，如果是，将移除已存在的，再添加。反之，同名的source不做处理
//          * @returns
//          */
//         addSourceEx(id: string, source: AnySourceData, bOverwrite: boolean | undefined):void;
//
//         /**
//          * [自定义扩展方法] 根据属性查询GeoJSONSource中的数据
//          * @param sourceId
//          * @param attribute
//          * @param value
//          */
//         querySourceFeaturesByAttr(sourceId: string, attribute: string, value: any):MapboxGeoJSONFeature[];
//         /**
//          * [自定义]切换底图
//          * @param data string类型代表矢量瓦片url 地址
//          * @param _removeLast  是否移除上一次的底图 ，默认为true,目前不起作用
//          */
//         changeBaseMapStyle(data: Style | string | undefined, _removeLast?: boolean | undefined):Promise<void>;
//     }
// }
// /**
//  * [自定义扩展] 扩展 setLayerVisible方法，设置图层的可见性
//  * @param layerId
//  * @param visible
//  */
// Map.prototype.setLayerVisible = function (layerId: string, visible: boolean) {
//     this.getLayer(layerId) && this.setLayoutProperty(layerId, 'visibility', visible? 'visible' : 'none')
// }
//
// /**
//  *   加载雪碧图
//  *   Jin 2023.1.6
//  *   */
// Map.prototype.addSpriteImages = async function (spritePath: string) {
//     // console.log(spritePath);
//     let [, spriteJson] = await fetchJson(`${spritePath}.json`); //(await axios.get(`${spritePath}.json`)).data;
//     let img = new Image();
//     img.onload = () => {
//         // console.log("雪碧图")
//         Object.keys(spriteJson).forEach((key: string) => {
//             let spriteItem = spriteJson[key];
//             let { x, y, width, height } = spriteItem;
//             let canvas = createCanvas(width, height);
//             let context = canvas.getContext("2d");
//             context!.drawImage(img, x, y, width, height, 0, 0, width, height);
//             // 单位雪碧图项，转base64字符串
//             let base64Url = canvas.toDataURL("image/png");
//             this.loadImage(base64Url, (error, simg: any) => {
//                 if (error) return;
//                 if (!this.hasImage(key)) {
//                     // console.log(key);
//
//                     this.addImage(key, simg);
//                 }
//             });
//         });
//     };
//     img.crossOrigin = "anonymous";
//     img.src = `${spritePath}.png`;
// };
// /**
//  * [自定义扩展] 扩展 addSource方法，加入判断，简化addsource之前的 this.getSource(id) 是否存在的判断
//  * @param id
//  * @param source
//  * @param bOverwrite 是否覆盖，如果是，将移除已存在的，再添加。反之，同名的source不做处理
//  * @returns
//  */
//
// Map.prototype.addSourceEx = function (id: string, source: AnySourceData, bOverwrite: boolean |undefined = false) {
//     if (this.getSource(id) && bOverwrite) {
//         this.removeSource(id);
//     }
//     if (!this.getSource(id)) this.addSource(id, source);
//
//     return this;
// };
