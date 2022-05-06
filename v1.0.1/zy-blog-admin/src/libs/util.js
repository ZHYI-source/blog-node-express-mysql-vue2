/**
 * Created by truncate on 2017/9/30.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
let Util = {
  logSwitch: true
};

/**
 * 验证两位小数
 * @param lng
 * @param lat
 * @returns {*[]}
 */
Util.validateMoney = (rule, value, callback) => {
  var reg = new RegExp(/^(([1-9][0-9]*)|0)(\.\d{1,2})?$/);
  let valueStr = '' + value;
  if (!valueStr) {
    callback(new Error('不能为空'));
  } else if (!reg.test(value)) {
    callback(new Error('请输入数字且只能有2位小数'));
  } else {
    callback();
  }
};
/**
 * 验证手机号
 * @param rule
 * @param value
 * @param callback
 * @returns {*[]}
 */
Util.validateMobile = (rule, value, callback) => {
  var reg = new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/);
  let valueStr = '' + value;
  if (!valueStr) {
    callback(new Error('不能为空'));
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};
/**
 * 验证账号信息
 * @param lng
 * @param lat
 * @returns {*[]}
 */
Util.validateAccount = (rule, value, callback) => {
  var reg = new RegExp(/^[a-zA-Z0-9_]{1,}$/);
  let valueStr = '' + value;
  if (valueStr === undefined || valueStr === 'undefined' || valueStr === null || valueStr.length === 0) {
    callback(new Error('不能为空'));
  } else if (!reg.test(value)) {
    callback(new Error('请输入字母、数字、下划线的组合'));
  } else {
    callback();
  }
};
/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */

var a = 6378245.0;
var ee = 0.00669342162296594323;

Util.wgs84togcj02 = (lng, lat) => {
  if (outOfChina(lng, lat)) {
    return [lng, lat];
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0);
    let dlng = transformlng(lng - 105.0, lat - 35.0);
    let radlat = lat / 180.0 * Math.PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    let sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * Math.PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * Math.PI);
    let mglat = lat + dlat;
    let mglng = lng + dlng;
    return [mglng, mglat];
  }
};

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function outOfChina(lng, lat) {
  return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
};
function transformlat(lng, lat) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
  return ret;
};

function transformlng(lng, lat) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0;
  return ret;
};

Util.getNum = (value) => {
  let reg = /[0-9]*/g;
  let numList = value.match(reg);
  if (numList !== null) {
    return numList[0];
  }
  return 0;
};
Util.getWindowHeight = () => {
  let windowHeight = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
};
Util.getWindowWidth = () => {
  let windowWidth = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowWidth = document.documentElement.clientWidth;
  } else {
    windowWidth = document.body.clientWidth;
  }
  return windowWidth;
};
/**
 * 修改页面标题
 * @param title
 */
Util.title = (title) => {
  let newTitle = '';
  if (title) {
    newTitle = title;
  } else {
    newTitle = '首页';
  }
  window.document.title = newTitle;
};
/**
 * 检查数组下标是否存在(不是检查值)
 * @param arr
 * @param need
 * @returns {boolean}
 */
Util.indexArray = (arr, need) => {
  let i = arr.length;
  while (i--) {
    if (i === need) {
      return true;
    }
  }
  return false;
};
/**
 * 检查数据值是否存在
 * @param arr
 * @param value
 * @returns {boolean}
 */
Util.inArray = (arr, value) => {
  let i = arr.length;
  while (i--) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
};
/**
 * 移除数组里某个值
 * @param arr
 * @param val
 */
Util.removeArrayValue = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
};
/**
 * 获得文件名
 * @param str
 * @returns {string}
 */
Util.baseName = (str) => {
  // \ 杠转 /
  let path = str.replace(/\\/g, '/');
  // 2.截取文件名
  return path.substring(path.lastIndexOf('/') + 1, path.length);
};
/**
 * 对象/数组克隆用的 数组可直接用 array.concat();来克隆,但是concat克隆出来会影响到数据
 * @param obj
 * @returns {*}
 */
Util.cloneObj = (obj) => {
  let str = obj.constructor === Array ? [] : {};
  let newObj = obj.constructor === Array ? [] : {};
  //判断是否是对象
  if (typeof obj !== 'object') {
    return newObj;
  } else if (window.JSON) {
    str = JSON.stringify(obj); //序列化对象
    newObj = JSON.parse(str); //还原
  } else {
    for (let i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
    }
  }
  return newObj;
};
/**
 * 取两个数组集合交集
 * @param a 第一数组
 * @param b 第二数组
 * @returns {Array} 返回新数组
 */
Util.arrayIntersection = (a, b) => {
  let ai = 0;
  let bi = 0;
  let result = [];
  while (ai < a.length && bi < b.length) {
    if (a[ai] < b[bi]) {
      ai++;
    } else if (a[ai] > b[bi]) {
      bi++;
    } else {
      result.push(a[ai]);
      ai++;
      bi++;
    }
  }
  return result;
};
/**
 * 两个数组取差集
 * @param arr1
 * @param arr2
 * @returns {Array}
 */
Util.arrayDifference = (arr1, arr2) => {
  let set1 = new Set(arr1);
  let set2 = new Set(arr2);
  let subset = [];
  for (let item of set1) {
    if (!set2.has(item)) {
      subset.push(item);
    }
  }
  return subset;
};
/**
 * 数组去重操作
 * @param arr
 * @returns {Array}
 */
Util.arrayUnique = (arr) => {
  let ret = [];
  for (let i = 0, j = arr.length; i < j; i++) {
    if (ret.indexOf(arr[i]) === -1) {
      ret.push(arr[i]);
    }
  }
  return ret;
};
//时间戳过滤 返回年月日
Util.filterTime = (time, status) => {
  time = parseInt(time);
  time = new Date(time);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  if (month < 10) {
    month = '0' + month;
  }
  ;
  if (date < 10) {
    date = '0' + date;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  ;
  if (minute < 10) {
    minute = '0' + minute;
  }
  ;
  if (second < 10) {
    second = '0' + second;
  }
  ;
  if (status === 'ymd') {
    return year + '年' + month + '月' + date + '日';
  } else if (status === 'hms') {
    return hour + '时' + minute + '分' + second + '秒';
  } else if (status === 'hms__') {
    return hour + ':' + minute + ':' + second;
  } else if (status === 'tms') {
    return time;
  } else if (status === 'ymd__') {
    return year + '-' + month + '-' + date;
  } else if (status === 'ymd-hms') {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  } else if (status === 'ymd-hm') {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
  } else if (status === 'dhms') {
    return month + '/' + date + ' ' + hour + ':' + minute;
  } else if (status === 'newhms') {
    return hour + ':' + minute + ':' + second;
  } else if (status === '__hm') {
    return hour + ':' + minute;
  } else if (status === 'ymd-hm') {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
  } else {
    return year + '年' + month + '月' + date + '日 ' + hour + '时' + minute + '分' + second + '秒';
  }
};
//秒转时
Util.calTime = (time) => {
  time = parseInt(time);
  let second = Math.floor(time % 60);
  let minute = Math.floor(time / 60 % 60);
  let hour = Math.floor(time / 3600);
  return hour + ':' + minute + ':' + second;
};
/**
 * 返回当前时间零晨时间戳 10位
 * @returns {number}
 */
Util.currentTimeStamp = () => {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return Date.parse(date) / 1000;
};
/**
 * 根据日期格式出 时分秒
 * @param date
 * @param format
 * @returns {string}
 */
Util.returnDateHMS = (date = '', format = ':') => {
  let d = {};
  if (date) {
    d = new Date(date); //实例一个时间对象；
  } else {
    d = new Date(); //实例一个时间对象；
  }
  return d.getHours() + format + d.getMinutes() + format + d.getSeconds();
};
/**
 * 一个标准日期用正则返回时分秒
 * @param date
 * @returns {*}
 */
Util.returnRegHMS = (date) => {
  if (!date) return '';
  let str = date.toString();
  let re = str.split(' ');
  let hms = '';
  for (let i = 0; i < re.length; i++) {
    if (re[i].match(':') !== null) {
      hms = re[i];
      break;
    }
  }
  return hms;
};
Util.filterTime2Long = (timestr) => {
  let time = timestr + '';
  time = time.replace(/-/g, '/');
  let date = new Date(time);
  return '' + date.getTime();
};
Util.getYearStartTime = () => {
  let day = new Date();
  return new Date(new Date(day.getFullYear() + '-01-01').getTime() - (new Date().getTimezoneOffset() * (-60) * 1000));
};
Util.getTodayStartTime = () => {
  let mil = 24 * 3600 * 1000;
  return new Date(Math.floor(new Date().getTime() / mil) * mil - (new Date().getTimezoneOffset() * (-60) * 1000));
};
Util.getBeforeDaysTime = ( days) => {
  let mil = 24 * 3600 * 1000;
  let mildays = 24 * 3600 * 1000 * days;
  return new Date(Math.floor((new Date().getTime() - mildays) / mil) * mil - (new Date().getTimezoneOffset() * (-60) * 1000));
};
Util.getTodayEndTime = () => {
  let day = new Date();
  return new Date(new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 23:59:59').getTime());
    //- (new Date().getTimezoneOffset() * (-60) * 1000));
};

// Util.getYearStartTime = () => {
//   let day = new Date();
//   day = day - 360 * 24 * 3600 * 1000;
//   let mil = 24 * 3600 * 1000;
//   return new Date(Math.floor(day / mil) * mil - (new Date().getTimezoneOffset() * (-60) * 1000));
// };
Util.getYearEndTime = () => {
  let day = new Date();
  return new Date(new Date(day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' 23:59:59').getTime());
  //- (new Date().getTimezoneOffset() * (-60) * 1000));
};
Util.getZeroTimeMils = (date) => {
  return date.getTime();
};
Util.setModalWidthHeight = (modalClassOrId, widthP, heightP) => {
  let width = 0.8;
  let height = 0.8;
  if (widthP && widthP > 0 && widthP <= 1) {
    width = widthP;
  }
  if (heightP && heightP > 0 && heightP <= 1) {
    height = heightP;
  }
  let bodys = document.querySelectorAll(modalClassOrId + ' >.ivu-modal-wrap>.ivu-modal>.ivu-modal-content>.ivu-modal-body');
  let modals = document.querySelectorAll(modalClassOrId + ' >.ivu-modal-wrap>.ivu-modal');
  if (bodys) {
    for (let i in bodys) {
      i = parseInt(i);
      if (!isNaN(i)) {
        bodys[i].style.width = Math.floor(window.Util.getWindowWidth() * width) + 'px';
        bodys[i].style.height = Math.floor(window.Util.getWindowHeight() * height) + 'px';
      }
    }
    for (let j in modals) {
      j = parseInt(j);
      if (!isNaN(j)) {
        modals[j].style.width = Math.floor(window.Util.getWindowWidth() * width) + 'px';
      }
    }
  }
};
Util.firstSetValue = (sets) => {
  if (sets && sets.size > 0) {
    for (let s of sets) {
      return s;
    }
  }
  return null;
};
Util.isBlank = (param) => {
  if (param === null || param === undefined || param === '' || param === 'undefined') {
    return true;
  }
  return false;
};
Util.getUTCTime = (date) => {
  let time = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return time;
};

Util.toDate = (dateString) => {
  let DATE_REGEXP = new RegExp('(\\d{4})-(\\d{2})-(\\d{2})([T\\s](\\d{2}):(\\d{2}):(\\d{2})(\\.(\\d{3}))?)?.*');
  if (DATE_REGEXP.test(dateString)) {
    let timestamp = dateString.replace(DATE_REGEXP, function ($all, $year, $month, $day, $part1, $hour, $minute, $second, $part2, $milliscond) {
      let date = new Date($year, $month, $day, $hour || '00', $minute || '00', $second || '00', $milliscond || '00');
      return date.getTime();
    });
    let date = new Date();
    date.setTime(timestamp);
    return date;
  }
  return null;
};

Util.fmtMoney = (num) => {
  let regexp = /(?:\.0*|(\.\d+?)0+)$/;
  if (num > 10000) {
    num = JSON.stringify(num).slice(0, JSON.stringify(num).length - 4) / 100;
    return num + '万';
  } else {
    num = (num).toFixed(2);
    num = num.replace(regexp, '$1');
    return num + '元';
  }
};

Util.fmtOil = (num) => {
  let regexp = /(?:\.0*|(\.\d+?)0+)$/;
  if (num > 1000) {
    let tmpNum = Math.floor(parseFloat(num) / 1000);
    tmpNum = tmpNum.toFixed(2);
    return tmpNum + '升';
  } else {
    if (num > 0) {
      num = (parseFloat(num)).toFixed(2);
      num = num.replace(regexp, '$1');
    }
    return num + '毫升';
  }
};
Util.fmtMile = (num) => {
  let regexp = /(?:\.0*|(\.\d+?)0+)$/;
  if (num > 1000) {
    let tmpNum = Math.floor(parseFloat(num) / 1000);
    tmpNum = tmpNum.toFixed(2);
    return tmpNum + '千米';
  } else {
    if (num > 0) {
      num = (parseFloat(num)).toFixed(2);
      num = num.replace(regexp, '$1');
    }
    return num + '米';
  }
};
Util.fmtHour = (num) => {
  let regexp = /(?:\.0*|(\.\d+?)0+)$/;
  if (num > 3600) {
    let tmpNum = Math.floor(parseFloat(num) / 3600);
    tmpNum = tmpNum.toFixed(2);
    return tmpNum + '小时';
  } else {
    if (num > 0) {
      num = (parseFloat(num)).toFixed(2);
      num = num.replace(regexp, '$1');
    }
    return num + '秒';
  }
};

Util.cutWord = (str, num) => {
  if (str === undefined || str === null || str === '') {
    return '';
  }
  if (str.replace(/[^\x00-\xff]/g, '01').length <= num) {
    return str;
  }
  return str.substr(0, num) + '..';
};

export default Util;
