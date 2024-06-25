import to from "await-to-js";
import {getWindowLocationOrigin} from "@/utils/url";


export * from "./url"




export namespace Utils {

    /*
  *
  * 1.本程序内通用的方法。主要实现url模板的替换。 将全局的url模板和json自身的模板融合后对json中的模板配置进行替换
  *
  * 2.模板值替换顺序：自身的templateValues配置 -> 传入的templateValues配置 ->最终的json配置
  * */
   export const loadJson = async (url: string, options?: {
       templateValues?: Record<string, any>,
   }) => {

       const defaultTemplateValues = {
           localhost:getAppHostUrl(),
           appHost:getAppHostUrl(),
       }
        //获取全局的url模板配置
        const {templateValues = {}} = options || {};

        const [error, result] = await to(axios.get(url));

        return new Promise((resolve, reject) => {
            if (result) {
                //先获取json配置中自身的templateValues，并与全局的templateValues合并
                // @ts-ignore
                const {templateValues: resultTemplateValues = {}} = result;
                //合并全局的templateValues
                const mergedTemplateValues = {...defaultTemplateValues,...templateValues, ...resultTemplateValues};

                if ( mergedTemplateValues) {
                    // 模板值替换
                    const stringConfig = JSON.stringify(result.data);
                    const parsedConfig = JSON.parse(templateParser(stringConfig, mergedTemplateValues));
                    // console.log(parsedConfig)
                    resolve(parsedConfig);
                } else resolve(result.data);
            } else reject(error);
        })
    }

    const templateParser = (template: string, values: Record<string, any>) => {
        return Object.keys(values).reduce((prev, curr) => {
            return prev.replace(new RegExp(`{${curr}}`, 'g'), values[curr]);
        }, template);
    }

    //获取当应用程序所在的的域名地址
    const getAppHostUrl = () => {
        let localOrigin = window.location.origin;
        return (localOrigin.endsWith("/") ? localOrigin.slice(0, -1) : localOrigin) + (import.meta.env.VITE_APP_CONTEXT_PATH ?? "/");
    }
}