import history from '@/components/history';
import { openMsg, destroyedMsg } from '@/components/message';
import { open, close } from '@/components/modal';
import { oSpin, cSpin } from '@/components/spin';
import moment from "moment";

let methods: any = {
  /**
   * 打开遮罩层
   */
  openSpin: () => { oSpin() },

  /**
   * 关闭遮罩层
   */
  closeSpin: () => { cSpin() },

  /**
   * 页面跳转
   */
  goPage: (url: string) => history.push(url),

  /**
   * 消息提示
   */
  msg: (type: string, content: string | null) => {
    destroyedMsg();
    openMsg(type, content);
  },

  /**
   * 计算文件大小
   * @param s 文件大小
   * @returns 单位
   */
  getSize: (s: number) => {
    if (s < 1024) return s + 'B';
    if (s < 1024 * 1024) return (s / 1024).toFixed(2) + 'KB';
    if (s < 1024 * 1024 * 1024) return (s / 1024 / 1024).toFixed(2) + 'MB';
  },

  /**
   * @param item session key
   * @param data session value
   */
  setSession: (item: string, data: any) => {
    sessionStorage.setItem(item, JSON.stringify(data))
  },

  /**
   * @param item session key
   */
  getSession: (item: string) => {
    let str: any = sessionStorage.getItem(item);
    return !!str ? JSON.parse(str) : null
  },

  /**
   * @param item session key
   */
  removeSession: (item: string) => {
    sessionStorage.removeItem(item);
    return !methods.getSession(item)
  },

  /**
   * 复制
   * @param text 
   */
  copy: (text: string | undefined | null) => {
    let transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = text || '';
    transfer.focus();
    transfer.select();

    let b: boolean = document.execCommand('copy');

    if (document.execCommand('copy')) {
      b = document.execCommand('copy');
      transfer.blur();

      if (b) {
        document.body.removeChild(transfer);
      } else {
        alert('发生未知错误，复制失败');
      }
    } else {
      alert('您的浏览器不支持此复制方式');
    }
  },

  openPage: (url: string) => {
    let tempWindow = window.open('_blank');
    if (tempWindow?.location) {
      tempWindow.location.href = url;
    }
  },

  /**
   * 得到一个两数之间的随机整数，包括两个数在内
   * @param min 
   * @param max 
   * @returns 
   */
  getRandomIntInclusive: (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
  },

  getImgUrl: (num: number) => {
    return `https://drive.ikurum.cn/comics${num > 200 ? '_' : ''}/-- (${num}).jpg`
  },

  getRandomColor: () => {
    function getcolor(color: string): string {
      color += '0123456789abcdef'[Math.floor(Math.random() * 16)];
      return color.length === 6 ? color : getcolor(color);
    }

    return '#' + getcolor('');
  },

  openModal: (obj: any, template: HTMLElement | null, ok: Function | null, cancel: Function | null) => {
    obj = {
      footer: true,
      ...obj,
      template: template,
      onOk: ok,
      onCancel: cancel,
    };
    open(obj);
  },

  closeModal: () => {
    close();
  },

  clickNoBobble: (e: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  },

  /**
   ** 格式化时间
   ** format格式:
   ** yyyy-MM-dd:年月日
   ** MM-dd:月日
   ** yyyy-MM:年月
   ** yyyy-MM-dd HH:mm:ss:年月日时分秒
   ** yyyy-MM-dd HH:mm:年月日时分
   ** HH:mm:时分
   ** @param {Int} value 格式化的值 unix时间戳
   ** @param {Moment} format 时间格式
   **/
  formatDateTime: (value: number, format: string | null) => {
    if (!format) format = "yyyy-MM-dd HH:mm:ss";
    //如果为HH:mm的时间进行一个字符串截取操作
    return format === "HH:mm"
      ? f(value, format).split("T")[1].substring(0, 5)
      : f(value, format);

    function f(value: number, format: string) {
      return moment(Number(value)).format(
        format === "yyyy-MM-dd"
          ? "YYYY-MM-DD"
          : format === "MM-dd"
            ? "MM-DD"
            : format === "yyyy-MM"
              ? "YYYY-MM"
              : format === "yyyy-MM-dd HH:mm:ss"
                ? "YYYY-MM-DD HH:mm:ss"
                : format === "yyyy-MM-dd HH:mm"
                  ? "YYYY-MM-DD HH:mm"
                  : format === "HH:mm"
                    ? ""
                    : "HH:mm"
      );
    }
  },
};

export default methods;