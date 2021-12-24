import methods from '@/common/methosd';
import { root } from '@/config';

const ROOT = root === 1 ? 'https://api.ikurum.cn/v1' : 'http://127.0.0.1:9091/v1';
const TIMEOUT = window.AbortController ? 10000 : 0; //设置为0则无主动超时(ie无效)
const tagName = '_token';
const type = 1; //1 application/json  2 form   3 text-plain

function gt() {
  let a = window.sessionStorage[tagName];
  return a && a.length > 5 ? a : null;
};

function pu(p: any) {
  if (typeof (p) === typeof (''))
    return p;
  let s = [];
  for (var i in p) {
    s.push(`${i}=${window.encodeURIComponent(p[i])}`);
  }
  return s.join("&");
};

class Act {
  abc!: AbortController
  handel!: NodeJS.Timeout | null

  ok!: (d: any) => Act
  fail!: (d: any) => void
  err!: (d: any) => void
  f!: (d: any) => void


  constructor(url: string, data: any, method: string, contentType: number | null, json = true) {
    if (TIMEOUT) {
      this.abc = new AbortController();
      this.handel = setTimeout(() => this.abc && this.abc.abort(), TIMEOUT);
    }
    this.todo(url, data, method, contentType, json);
  }

  cls = () => {
    if (TIMEOUT && this.handel) {
      clearTimeout(this.handel);
      this.handel = null;
    };
  };

  gc = (p: any, m: string, c: number | null) => {
    let cf: RequestInit = {
      method: m,
      mode: 'cors',
      cache: 'no-cache',
    };

    let a = [0, 0, window.navigator.languages], b = gt();
    if (b) a[0] = b;
    if (this.abc) cf.signal = this.abc.signal;
    if (m === 'POST' && p) {
      //处理form-data的数据格式
      if (c === 2) {
        let t = new FormData();
        for (let key in p) {
          t.append(key, p[key]);
        }
        cf.body = t;
      } else {
        cf.body = JSON.stringify(p);
      }
      a[1] = c || type;
    }
    cf.headers = {
      'Accept-Language': a.join(';')
    };
    return cf;
  };

  todo = async (url: string, par: any, m: string, contentType: number | null, j: boolean) => {
    let d: any = null;
    try {
      if (m === 'GET' && par) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + pu(par);
      }
      let res = await fetch(ROOT + url, this.gc(par, m, contentType));
      this.cls();
      if (res.ok)
        if (j) {
          d = await res.json();
        } else {
          d = {
            code: 200,
            data: await res.blob(),
          }
        }
      else {
        d = {
          code: 0,
          msg: res.statusText
        };
      }
      setTimeout(() => {
        if ((d.code || d.code === 0) && d.code !== 110) {
          this.ok && this.ok(d);
          methods.closeSpin();
        } else {
          this.fail && this.fail(d);
          methods.closeSpin();
        }
      }, 0);
    } catch (e) {
      d = {
        code: 0,
        msg: e
      };
      this.err && this.err(d);
    } finally {
      this.cls();
      this.f && this.f(d);
    }
  };

  then = (e: (d: any) => Act) => {
    this.ok = e;
    return this;
  };
  catch = (e: (d: any) => void) => {
    this.err = e;
    return this;
  };
  error = (e: (d: any) => void) => {
    this.fail = e;
    return this;
  };
  finish = (e: (d: any) => void) => {
    this.f = e;
    return this;
  };
}


export const Ajax = {
  get: (url: string, data: any, contentType: number | null, json: boolean) => {
    return new Act(url, data, 'GET', contentType, json);
  },
  post: (url: string, data: any, contentType: number | null, json: boolean) => {
    return new Act(url, data, 'POST', contentType, json);
  }
}
