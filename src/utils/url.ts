//图片路径转换，代替require
import { createVNode, render } from "vue";

/**
 * 动态引入public目录下的图片。可用于 <img :src='图片地址'/> 这种方式
 * @param path 图片地址，如果是production环境，会在地址前加入import.meta.env.BASE_URL
 * @returns {*|string} 返回地址
 */
export const getImageUrl = (path: string, prefix?: string): any | string => {
  if (path == null) return path;

  //判断是否是base64，
  if (isBase64Image(path)) return path;

  if (import.meta.env.PROD) {
    //正式环境，地址加入前缀
    //判断是否是json且以'/' 开头，则去掉 '/'  --- 记得下次验证一下
    // path = `${import.meta.env.BASE_URL}${path.endsWith(".json") && path.startsWith("/") ? path.slice(path.indexOf("/") + 1) : path}`;
  }
  path = !!prefix ? `${prefix}${path}` : path;
  //判断是否以http https 开头
  if (isStartWithHttpOrHttps(path)) return new URL(path, import.meta.url).href;
  //
  let baseUrl = import.meta.env.BASE_URL;
  path = `${baseUrl.endsWith("/") ? baseUrl : baseUrl + "/"}${path.startsWith("/") ? path.slice(path.indexOf("/") + 1) : path}`;
  return new URL(path, import.meta.url).href;
};

//判断字符串是否是图片base64
export const isBase64Image = (str: string) => {
  return /^data:image\/\w+;base64,/.test(str);
};
export const isStartWithHttpOrHttps = (url: string) => {
  return ["http://", "https://"].some((item) => url.startsWith(item));
};

export const getUrl = (path: string, prefix?: string): string => {
  if (import.meta.env.PROD) {
    //正式环境，地址加入前缀
    //判断是否是json且以'/' 开头，则去掉 '/'  --- 记得下次验证一下
    // path = `${import.meta.env.BASE_URL}${path.endsWith(".json") && path.startsWith("/") ? path.slice(path.indexOf("/") + 1) : path}`;
  }
  path = !!prefix ? `${prefix}${path}` : path;
  //判断是否以http https 开头
  if (isStartWithHttpOrHttps(path)) return new URL(path, import.meta.url).href;
  //
  let baseUrl = import.meta.env.BASE_URL;
  path = `${baseUrl.endsWith("/") ? baseUrl : baseUrl + "/"}${path.startsWith("/") ? path.slice(path.indexOf("/") + 1) : path}`;
  return new URL(path, import.meta.url).href;
};

//创建guid
export const generateUUIDUsingMathRandom = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const generateUUIDV4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateTimestampPKUID = () => {
  return new Date().getTime(); //Timestamp
};

export const assetUrlPath = (imgName: string) => {
  return imgName ? import.meta.env.VITE_APP_BASE_API + "/prod-api/dsp/oss/download?id=" + imgName : getImageUrl("images/img.png");
  // let url = import.meta.env.VITE_APP_BASE_API + '/prod-api/dsp/oss/download?id=' + imgName;
  // return url;
};

export const getWindowLocationOrigin = () => {
  return window.location.origin;
};

/**
 * 解密base64 成json对象
 * @param str
 * @returns {any}
 */
export function decodeBase64<T>(str: string): T {
  let deRes = decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(deRes) as T;
}

export function urlParamsToObject(url) {
  const paramsObject = {};
  if (url.split("?").length < 2) return paramsObject;

  const paramsArray = url.split("?")[1].split("&");

  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    paramsObject[key] = value;
  });

  return paramsObject;
}
