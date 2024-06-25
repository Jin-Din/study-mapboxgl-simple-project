import {createVNode, render} from "vue";

/*
* 创建虚拟的component，内部使用createVNode 方法.
* 为了方便使用createVNode方法，简单封装一下
* */
export const createVComponent = (template: any, ...attr: any) => {
    let ele = document.createElement("div");
    let vnode = createVNode(template, ...attr);
    render(vnode, ele);
    return ele;
}