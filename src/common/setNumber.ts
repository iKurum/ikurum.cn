import { accAdd, accSub, accMul, accDiv } from './number';

/**
** 设置 number 四则运算
** 加 add
** 减 sub
** 乘 mul
** 除 div
**/
export function setNumberPrototype() {
  // eslint-disable-next-line no-extend-native
  Number.prototype.add = function (arg) {
    return accAdd(arg, Number(this));
  }
  // eslint-disable-next-line no-extend-native
  Number.prototype.sub = function (arg) {
    return accSub(arg, Number(this));
  }
  // eslint-disable-next-line no-extend-native
  Number.prototype.mul = function (arg) {
    return accMul(arg, Number(this));
  }
  // eslint-disable-next-line no-extend-native
  Number.prototype.div = function (arg) {
    return accDiv(Number(this), arg);
  }
  // eslint-disable-next-line no-extend-native
  Number.prototype.floor = function () {
    return Math.floor(Number(this).mul(100)).div(100);
  }
  // eslint-disable-next-line no-extend-native
  Number.prototype.ceil = function () {
    return Math.ceil(Number(this).mul(100)).div(100);
  }
}