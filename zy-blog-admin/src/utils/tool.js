class Tools {
}

/**
 *@author ZY
 *@date 2022/1/19
 *@param { Function } fn 需要防抖的事件
 *@param { Number } delay 延时时间
 *@Description:
*/

Tools.debounce=(fn, delay)=>{
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 *@author ZY
 *@date 2022/1/19
 *@param { Function } func 需要节流的事件
 *@param { Number } delay 延时时间
 *@Description:
 */

Tools.throttle=(func, delay)=>{
  let timer = null;
  let startTime = Date.now();
  return function(){
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    if(remaining <= 0){
      func.apply(context,args);
      startTime = Date.now();
    }else{
      timer = setTimeout(func, remaining);
    }
  }
}


/**
 * 验证身份证号码
 * @param { String } code 身份证号码
 */
Tools.identityIDCard=(code)=>{
  // 身份证号前两位代表区域
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  };
  const idCardReg = /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; // 身份证格式正则表达式
  let errorMessage = ''; // 错误提示信息
  let isPass = true; // 身份证验证是否通过（true通过、false未通过）

  // 如果身份证不满足格式正则表达式
  if (!code) {
    errorMessage = '请输入身份证号码';
    isPass = false;
  } else if (!code.match(idCardReg)) {
    errorMessage = '请输入正确的身份证号码';
    isPass = false;
  } else if (!city[code.substr(0, 2)]) {
    // 区域数组中不包含需验证的身份证前两位
    errorMessage = '请输入正确的身份证号码';
    isPass = false;
  } else if (code.length === 18) {
    // 18位身份证需要验证最后一位校验位
    code = code.split('');
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    for (let i = 0; i < 17; i++) {
      ai = parseInt(code[i]);
      wi = factor[i];
      sum += ai * wi; // 开始计算并相加
    }
    const last = parity[sum % 11]; // 求余
    if (last.toString() !== code[17]) {
      errorMessage = '请输入正确的身份证号码';
      isPass = false;
    }
  }
  return {
    errorMessage,
    isPass,
  }
}

/**
 * 金额转换，保留2位小数
 * @param val
 * @returns {*}
 */
Tools.fmtVal2Money = function (val) {
  if (val === null || val === undefined || val === '') {
    return '0.00'
  }
  let value = val;
  let str = val.toString().split('.')
  if (str.length == 1) {
    value = value.toString() + '.00'
    return value
  }
  if (str.length > 1) {
    if (str[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}

/**
 * 时间戳转换为时间yyyy-MM-dd hh:mm:ss
 * @param l 时间戳
 */
Tools.fmtLong2DateTime = function (l, fmtStr) {
  let crtTime = new Date(l)
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  if (fmtStr) {
    fmt = fmtStr
  }
  return fmtDateTime(fmt, crtTime)
}

/**
 * 时间戳转换为时间
 * @param fmt yyyy-MM-dd hh:mm:ss
 * @param date 时间对象
 * @returns {*}
 */
function fmtDateTime(fmt, date) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return fmt
}

export default Tools

