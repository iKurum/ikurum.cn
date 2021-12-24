import { setServers } from './service';

const apis: any = [{
  // 网站信息
  name: 'index', url: '/index', method: 'get'
}, {
  // 头像
  name: 'photo', url: '/user/photo', method: 'get'
}, {
  // 个人信息
  name: 'userInfo', url: '/user/info', method: 'get'
}, {
  // 文章列表
  name: 'articleList', url: '/article/list', method: 'get'
}, {
  // 文章详情
  name: 'detail', url: '/article/detail', method: 'post'
}, {
  // ocr list
  name: 'ocrList', url: '/ocr/list', method: 'get'
}, {
  // ocr text
  name: 'ocrText', url: '/ocr/text', method: 'post'
}, {
  // one text
  name: 'one', url: '/one', method: 'get'
}];

const port: any = {};
/**
 * 添加API
 * @param {Array} apis 添加API 传一个Array里面包含Object {name,url,method}
 */
export function setApi() {
  let b: string[] = [];
  apis.forEach((item: any) => {
    b.push(item.name + '*_*' + item.method);
    port[item.name] = item.url;
  })

  setServers(b);
}

export function getApi() {
  if (!port) return;
  return Object.keys(port).reduce((copy: any, name) => {
    copy[name] = port[name];
    return copy
  }, {})
}