let Util = {
  logSwitch: true
};
let a = 6378245.0;
let ee = 0.00669342162296594323;

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
Util.isTop = () => {
  return Util.getScrollTop() === 0;
};
Util.isBottom = () => {
  return Util.getScrollTop() + Util.getWindowHeight() === Util.getScrollHeight();
};
//滚动条在Y轴上的滚动距离
Util.getScrollTop = () => {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
};

//文档的总高度
Util.getScrollHeight = () => {
  let scrollHeight = 0;
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
};
//浏览器视口的高度
Util.getWindowHeight = () => {
  let windowHeight = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
};
Util.getRequestParamMap = () => {
  let map = new Map();
  let params = window.location.search;
  let str = params.substr(1);
  let strs = str.split('&');
  if (strs && strs.length > 0) {
    for (let i in strs) {
      let strss = strs[i].split('=');
      map.set(strss[0], strss[1]);
    }
  }
  return map;
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
Util.getYearStartTime = () => {
  let day = new Date();
  return new Date(new Date(day.getFullYear() + '-01-01').getTime() - (new Date().getTimezoneOffset() * (-60) * 1000));
};
Util.getTodayStartTime = () => {
  let mil = 24 * 3600 * 1000;
  return new Date(Math.floor(new Date().getTime() / mil) * mil - (new Date().getTimezoneOffset() * (-60) * 1000));
};
Util.filterTime2Long = (timestr) => {
  let time = timestr + '';
  time = time.replace(/-/g, '/');
  let date = new Date(time);
  return '' + date.getTime();
};
Util.filterTime2LongUTC = (timestr) => {
  let time = timestr + '';
  time = time.replace(/-/g, '/');
  let date = new Date(time);
  // let offset = date.getTimezoneOffset();
  // return date.getTime() + (offset * 60 * 1000) ;
  return date.getTime();
};
//时间戳过滤 返回年月日
Util.filterTime = (time, status) => {
  // if (new Date(parseInt(time)).getFullYear() < 1971) {
  //   time = time * 1000;
  // }
  time = new Date(parseInt(time));
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
  ;
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
  } else if (status === 'ymd__') {
    return year + '-' + month + '-' + date;
  } else if (status === 'hms') {
    return hour + '时' + minute + '分' + second + '秒';
  } else if (status === 'hms__') {
    return hour + ':' + minute + ':' + second;
  } else if (status === 'hm__') {
    return hour + ':' + minute;
  } else if (status === 'tms') {
    return time;
  } else if (status === 'ymd-hms') {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  } else if (status === 'ymd-hm') {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
  } else if (status === 'ymd-hm00') {
    return year + '-' + month + '-' + date + ' '  + '00:00';
  } else if (status === 'ymd-hm2359') {
    return year + '-' + month + '-' + date + ' '  + '23:59';
  } else if (status === 'dhms') {
    return month + '/' + date + ' ' + hour + ':' + minute;
  } else {
    return year + '年' + month + '月' + date + '日 ' + hour + '时' + minute + '分' + second + '秒';
  }
};
Util.friendlyDateTime = (time) => {
  if (new Date(parseInt(time)).getFullYear() < 1971) {
    time = time * 1000;
  }
  time = new Date(parseInt(time));
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  var today = new Date().getDate();
  var days = parseInt((new Date().getTime() - time.getTime()) / 86400000);
  var result, offset;
  offset = Math.abs(today - date);

  if (month < 10) {
    month = '0' + month;
  }
  ;
  if (date < 10) {
    date = '0' + date;
  }
  ;
  if (hour < 10) {
    hour = '0' + hour;
  }
  ;
  if (minute < 10) {
    minute = '0' + minute;
  }
  ;
  if (days < 3 && offset < 3) {
    if (offset === 0) {
      result = '今天 ' + hour + ':' + minute;
    } else if (offset === 1) {
      result = '昨天 ' + hour + ':' + minute;
    } else if (offset === 2) {
      result = '前天 ' + hour + ':' + minute;
    }
  } else {
    result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
  }
  return result;
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
/**
 * 给定时间戳 返回上一个月得时间戳
 * @param data
 * @returns {string}
 */
Util.getPrevMonthTmp = (time) => {
  if (new Date(parseInt(time)).getFullYear() < 1971) {
    time = time * 1000;
  }
  time = new Date(parseInt(time));
  let year = time.getFullYear();
  let month = time.getMonth();
  let date = time.getDate();
  return new Date(year + '-' + month + '-' + date).getTime();
};
/**
 * @description 过滤undefin数据
 * @returns 0
 */
Util.filterUndefined = (val) => {
  if (val === undefined) {
    return 0;
  } else {
    return val;
  }
};
/**
 * 加载图片(修复chrome加载问题)
 * @url 图片URL
 * @callback 回调函数
 * @returns 0
 */
Util.preImage = (url, callback) => {
  // eslint-disable-next-line no-undef
  var img = new Image(); //创建一个Image对象，实现图片的预下载
  img.src = url;

  if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
    callback.call(img);
    return; // 直接返回，不用再处理onload事件
  }

  img.onload = function () { //图片下载完毕时异步调用callback函数。
    callback.call(img); //将回调函数的this替换为Image对象
  };
};
Util.isBlank = (param) => {
  if (param === null || param === undefined || param === '' || param === 'undefined') {
    return true;
  }
  return false;
};
Util.getEventName = (id) => {
  if(id === 0x0001) {
    return '车辆启动了';
  } else if (id === 0x0002) {
    return '车辆熄火了';
  } else if (id === 0x0103) {
    return '终端被拆卸';
  } else if (id === 0x0104) {
    return '终端已接入';
  } else if (id === 0x0105) {
    return '电瓶电压低';
  } else if (id === 0x0106) {
    return '怠速时间过长';
  } else if (id === 0x0107) {
    return '超速';
  } else if (id === 0x0108) {
    return '疲劳驾驶';
  } else if (id === 0x0111) {
    return '急加速';
  } else if (id === 0x0112) {
    return '急减速';
  } else if (id === 0x0113) {
    return '急转弯';
  } else if (id === 0x9999) {
    return '产生了故障';
  } else if (id === 0x9994) {
    return '驶入禁入围栏';
  } else if (id === 0x9995) {
    return '驶出禁出围栏';
  }
};
export default Util;
