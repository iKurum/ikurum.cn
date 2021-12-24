import { Ajax } from './fetch';
import { getApi } from './apis'; // 导入封装好的apis对象
import methods from '@/common/methosd';
let name: any = [];

interface oparams {
  spin?: number | null;
  contentType?: number | null;
  notClearSpace?: number | null;
  json?: boolean;
}

let port: any = {
  execAxios(params = {}, api: string, requestMethod: string, spin: number | null, contentType: number | null, json: boolean = true) {
    if (!spin) methods.openSpin();

    return requestMethod.toLowerCase() === 'get' ? Ajax.get(api, params, contentType, json).catch(() => {
      methods.msg('error', `网络开小差了 ${api}`);
      methods.closeSpin();
    }).error((fail: any) => {
      execFail(fail);
    }) : Ajax.post(api, params, contentType, json).catch(() => {
      methods.msg('error', `网络开小差了 ${api}`);
      methods.closeSpin();
    }).error((fail: any) => {
      execFail(fail);
    })
  },

  fetch: async (api: string, params: any, otherParams: any) => {
    let res: any = await port[api](params || {}, otherParams)
    return execFail(res);
  }
}

//所有接口的状态判断都在这里处理
function execFail(fail: any) {
  if (fail?.code === 0) {
    methods.msg('warning', fail.msg ? fail.msg : '出错了～');
    methods.closeSpin();
  } else {
    methods.closeSpin();
    return fail
  }
}

/**
 * 根据名称创建方法
 */
function init() {
  name.forEach((item: string) => {
    const setting = item.split('*_*');
    port[setting[0]] = (params: any = {}, other?: oparams) => {
      let p: any = {};
      if (Object.prototype.toString.call(params) === '[object Array]') {
        p = params;
      } else {
        for (let key in params) {
          if (params[key] || params[key] === 0) {
            let check = ['[object Array]', '[object Object]'];
            if (check.indexOf(Object.prototype.toString.call(params[key])) > -1) {
              p[key] = params[key];
            } else {
              if (other?.notClearSpace) {
                p[key] = params[key];
              } else {
                p[key] = (params[key] + '').replace(/\s+/g, "");
              }
            }
          }
        }
      }
      return port.execAxios(p, getApi()[setting[0]], setting[1], other?.spin, other?.contentType, other?.json)
    }
  })
}

init();

/**
 * 设置service
 * @param {Array} p  传递一数组 数组内格式:接口名称*_*类型 
 */
export function setServers(p: any) {
  name = [...name, ...p];
  init();
}

export default port;