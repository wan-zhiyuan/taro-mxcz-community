/**
 * Created by today on 6/20/2017.
 */

/**
 * 是否是数组
 * @param param
 * @returns {boolean}
 */
export function isArray(param) {
  return Object.prototype.toString.call(param) === '[object Array]';
}
/**
 * 是否为数字
 * @param param
 * @returns {boolean}
 */
export function isNumber(param) {
  return Object.prototype.toString.call(param) === '[object Number]';
}
/**
 * 可执行涵数
 * @param param
 * @returns {boolean}
 */
export function isFunction(param) {
  return Object.prototype.toString.call(param) === '[object Function]';
}
/**
 * 是否为字符串
 * @param param
 * @returns {boolean}
 */
export function isString(param) {
  return Object.prototype.toString.call(param) === '[object String]';
}
/**
 * 是否为JS对象
 * @param param
 * @returns {boolean}
 */
export function isObject(param) {
  return Object.prototype.toString.call(param) === '[object Object]';
}
/**
 * 是否末定义
 * @param param
 * @returns {boolean}
 */
export function isUndefined(param) {
  if (Object.prototype.toString.call(param) === '[object Undefined]') return true;
  if (param && param === 'undefined') return true;
  return false;
}
/**
 * 是不是NULL，区别isUndefined
 * @param param
 * @returns {boolean}
 */
export function isNull(param) {
  return Object.prototype.toString.call(param) === '[object Null]';
}
/**
 * 只有true/false才是boolean
 * @param param
 * @returns {boolean}
 */
export function isBoolean(param) {
  return Object.prototype.toString.call(param) === '[object Boolean]';
}
/**
 *  对象真实类型
 * @param param
 * @returns {string}
 */
function getTypeOf(param) {
  return Object.prototype.toString.call(param);
}

export function isSameType(...args) {
  const len = args.length;
  const type = getTypeOf(args[0]);
  for (let i = 1; i < len; i++) {
    if (type !== getTypeOf(args[i])) return false;
  }
  return true;
}

/**
 * 是否为手机号
 * @param code
 * @returns {boolean}
 */
export function isMobile(code) {
  return /1[123456789]\d{9}/.test(code);
}

/**
 * 是否为验证码
 * @param code
 * @returns {boolean}
 */
export function isICode(code) {
  return /\d{4}/.test(code);
}

/**
 * 是否为IP
 * 192.168.1.1
 * @param code
 * @returns {boolean}
 */
export function isHostIp(code) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(code);
}

/**
 * 是否为IP
 * 192.168.1.1
 * @param code
 * @returns {boolean}
 */
export function isHostPort(code) {
  return /^\d{1,5}$/.test(code);
}

/**
 * 2017-11-17 00:00:00
 * @param dt
 * @returns {boolean}
 */
export function isDateString(dt) {
  return /^\d{1,4}[-/\\]\d{1,2}[-/\\]\d{1,2}[\sTN]\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2})?$/.test(dt);
}

export function isDateTime(num) {
  return /^1\d+/.test(num);
}


/**
 * 是不是为空
 * undefinded，null,NaN,'',{},[],都定义为空0不能定义为空
 * @param param
 * @returns {boolean}
 */
export function isEmpty(param) {
  const p = Object.prototype.toString.call(param);
  if (p === '[object Undefined]') return true;
  if (p === '[object Null]') return true;
  if (p === '[object Number]' && isNaN(param)) return true;
  if (p === '[object String]' && param.length === 0) return true;
  if (p === '[object Array]' && param.length === 0) return true;
  if (p === '[object Object]' && Object.keys(param).length === 0) return true;
  return false;
}
