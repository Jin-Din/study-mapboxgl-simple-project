/*
* 提供一些行政区划代码格式化功能，主要是补齐位数,默认9位
* */
import {useDistrict} from "@/store/modules/district";

export const usePACFormat = (lnth: number = 9) => {
    const length = lnth;

    /*
 * 行政区划代码格式化，补齐
 * @params pac： 编码
 * @params length： 补齐长度，如果传入非空数字，则使用传入的数字，否则使用默认为位数
 * @return
 * */
    const formatPAC = (pac: string, lngth?: number | null) => {
        const toLngth = lngth ?? length;

        return trimEnd(pac).padEnd(toLngth, '0'); //先去掉所有的0，然后 用 0 补齐到指定位数
    }
    const getProvincePAC = (pac: string, fill: boolean = true) => {

        //取前两位
        return fill ? formatPAC(pac.substring(0, 2)) : pac.substring(0, 2);
    }
    const getCityPAC = (pac: string, fill: boolean = true) => {
        //取前四位
        return fill ? formatPAC(pac.substring(0, 4)) : pac.substring(0, 4);
    }
    const getCountyPAC = (pac: string, fill: boolean = true) => {
        //取前四位
        return fill ? formatPAC(pac.substring(0, 6)) : pac.substring(0, 6);
    }
    const getTownPAC = (pac: string, fill: boolean = true) => {
        //取前四位
        return fill ? formatPAC(pac.substring(0, 9)) : pac.substring(0, 9);
    }

    /*
    * 剔除多余的0
    * */
    const trimEnd = (pac: string) => {
        //去掉末尾的0
        return pac? pac.replace(/\.?0+$/, "") : "";
    }
    /**
     * 格式化成正确的编码长度,比如 61031->610310
     * @param pac
     */
    const collectPac = (pac: string) => {
        const lngth = pac.length;
        if (lngth === 1)
            return pac.padEnd(2, '0');
        if (lngth === 3)
            return pac.padEnd(4, '0');
        if (lngth === 5)
            return pac.padEnd(6, '0');
        if (lngth >= 7 && lngth <= 9)
            return pac.padEnd(9, '0');
        else
            return pac;
    }

    //todo:未完成
    /**
     * 根据行政区划代码长度判断级别  1-省级 2-市级 3-县级 4-乡级，-1表示无效
     * @param pac
     */
    const districtLevel = (pac: string): number => {
        const newPac = trimEnd(pac);
        const lngth = collectPac(newPac).length;
        if (lngth <= 2)
            return 1;
        else if (lngth <= 4)
            return 2;
        else if (lngth <= 6)
            return 3;
        else if (lngth <= 9)
            return 4;
        else
            return -1;

    }
    return {
        collectPac,
        districtLevel,
        trimEnd,
        formatPAC,
        getProvincePAC,
        getCityPAC,
        getCountyPAC,
        getTownPAC
    }
}


export const orderedCities = ["西安市", "宝鸡市", "咸阳市", "铜川市", "渭南市", "延安市", "榆林市", "汉中市", "安康市", "商洛市"];
/*
* 按行政区划排序
* @param data 排序数据
* @param prop 属性名
* @param order 排序数组，默认使用 西安市 宝鸡市 咸阳市 铜川市 渭南市 延安市 榆林市 汉中市 安康市 商洛市
* @param newArr 是否返回新数组，默认返回新数组
* */
export const sortedByCities = <T, K extends keyof T>(data: T[], prop: K, order?: string[], newArr: Boolean = true) => {

    const orderArr = order ?? ["西安市", "宝鸡市", "咸阳市", "铜川市", "渭南市", "延安市", "榆林市", "汉中市", "安康市", "商洛市"];

    return (newArr ? [...data] : data).sort((a, b) => {
        // @ts-ignore
        return orderArr.indexOf(a[prop]) - orderArr.indexOf(b[prop]);
    });
}