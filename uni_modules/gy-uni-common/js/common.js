import {encrypt, decrypt} from './DES'

let ENCRYPTION = 1;
export const setLocalStorage = (key, value, encryption = ENCRYPTION) => {
  if (encryption) {
    uni.setStorageSync(key, encrypt(value))
  } else {
    uni.setStorageSync(key, value)
  }
}
export const setSessionStorage = (key, value, encryption = ENCRYPTION) => {
  // #ifndef H5
    key = 'sessionStorage' + key
    this.setLocalStorage(key, value);
  // #endif
  // #ifdef H5
  if(encryption){
    sessionStorage.setItem(key, encrypt(value))
  }else{
    sessionStorage.setItem(key, value);
  }
  // #endif

}
  export const getLocalStorage = (key, encryption = ENCRYPTION) => {
  let item = uni.getStorageSync(key);
  if (item) {
    try {
      if (encryption) {
        item = decrypt(item);
      }
    } catch (ignore) {
    }
    return item;
  }
  return null;
}
export const getSessionStorage = (key, encryption = ENCRYPTION) => {
  // #ifndef H5
  key = 'sessionStorage' + key
  return this.getLocalStorage(key);
  // #endif
  // #ifdef H5
  let item = sessionStorage.getItem(key);
  if(item){
    try {
      if(encryption) {
        item = decrypt(item);
      }
    }catch (ignore){}
    return item;
  }
  return null;
  // #endif
}
/*
* author: g
* time: 2020/9/7 15:34
* @desc 删除数组某个值
* @params
*/
export const arrRemoveVal = (arr, val) => {
  let index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
/*
* author: g
* time: 2020/7/21 14:08
* @desc 获取周一和周日日期
* @return [mon, sun] Date格式
*/
export const getMonSunDate = (nowDate) => {
  nowDate = new Date(nowDate);
  let day = nowDate.getDay();
  (day == 0) && (day = 7);
  let start = new Date(nowDate.setDate(nowDate.getDate() - (day - 1)));
  let end = new Date(new Date(start).setDate(start.getDate() + 6));
  return [start, end]
}
/*
* author: g
* time: 2020/7/21 14:09
* @desc 获取一周的日期数组
* @return 数组 数据格式为Date
*/
export const getWeekArr = (nowDate) => {
  let [start] = this.getMonSunDate(nowDate);
  let arr = [new Date(start)];
  for (let i = 0; i < 6; i++) {
    start.setDate(start.getDate() + 1);
    arr.push(new Date(start));
  }
  return arr;
}
//格式化日期
/**
 * time 一个日期或者时间戳(number)
 * type 需要转换时间的格式
 *      hms 返回 h:m:s
 *      ymd 返回 y-m-d
 *      其他或者不传为：y-m-d h:m:s
 * customFormat 自定义返回时间格式
 *      例 y-m-d h:M:s、 yy/m/d、h:M:s、m/d h:M:s
 *      y:年，yy:年后两位，m:月，d:日，h:时，M:分，s: 秒
 *
 * */
export const formatTime = (time, type) => {
  let date = new Date(time);
  if (date == "Invalid Date") {
    console.error("日期格式错误");
    return
  }
  let dataStr = "";
  let y = date.getFullYear().toString(),
    m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
    d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (type === "hms") {
    dataStr = `${h}:${M}:${s}`;
  } else if (type === "ymd") {
    dataStr = `${y}-${m}-${d}`
  } else if(type){
    type = type.replace(/yy/g, y.substring(2));
    type = type.replace(/y/g, y);
    type = type.replace(/m/g, m);
    type = type.replace(/d/g, d);
    type = type.replace(/h/g, h);
    type = type.replace(/M/g, M);
    type = type.replace(/s/g, s);
    return type;
  }else{
    dataStr = `${y}-${m}-${d} ${h}:${M}:${s}`;
  }
  return dataStr;
}
/*
* timeDifference
* @gy
* @2024/3/14 16:54
* @description 获取时间差
*/
export const timeDifference = (date, date2, timeDiff, geshi) => {
  let kaishi = date; //开始时间
  let jieshu = null;
  if (date2) {
    jieshu = date2;
  } else {
    jieshu = new Date();
  } //结束时间
  if (!timeDiff) {
    timeDiff = 0;
  }
  let dateDiff = jieshu.getTime() - kaishi.getTime() - timeDiff; //时间差的毫秒数
  //计算出相差天数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
  //计算出小时数
  let leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  seconds >= 0 && seconds < 10 && (seconds = "0" + seconds);
  minutes >= 0 && minutes < 10 && (minutes = "0" + minutes);
  hours < 10 && (hours = "0" + hours);
  let shijian = dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
  if (geshi) {
    shijian =
      dayDiff + geshi + hours + geshi + minutes + geshi + seconds;
  }
  if (parseFloat(dayDiff)) {
    shijian =
      dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    if (geshi) {
      shijian =
        dayDiff + geshi + hours + geshi + minutes + geshi + seconds;
    }
  } else {
    if (parseFloat(hours)) {
      shijian = hours + "小时" + minutes + "分钟" + seconds + "秒";
      if (geshi) {
        shijian =
          hours + geshi + minutes + geshi + seconds;
      }
    } else {
      shijian = minutes + "分钟" + seconds + "秒";
      if (geshi) {
        shijian =
          minutes + geshi + seconds;
      }
    }
  }

  return shijian;
}
//将时分秒变为数字
export const formatHourToNum = (v) => {
  if (!v) {
    v = '';
  }
  let arr1 = v.split(" ");
  let time = arr1.length > 1 ? arr1[1] : arr1[0];
  let arr2 = time.split(":");
  let arr22 = 0;
  if (arr2[2]) {
    arr22 = arr2[2];
  }
  let x = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60) + (parseFloat(arr22) / 3600);
  return x;
}
export const cloneObj = (obj) => {
  let copy;
  switch (typeof obj) {
    case "undefined":
      break;
    case "number":
      copy = obj - 0;
      break;
    case "string":
      copy = obj + "";
      break;
    case "boolean":
      copy = obj;
      break;
    case "object":  //object分为两种情况 对象（Object）和数组（Array）
      if (obj === null) {
        copy = null;
      } else {
        if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
          copy = [];
          for (let i = 0; i < obj.length; i++) {
            copy.push(this.cloneObj(obj[i]));
          }
        } else {
          copy = {};
          for (let j in obj) {
            copy[j] = this.cloneObj(obj[j]);
          }
        }
      }
      break;
    default:
      copy = obj;
      break;
  }
  return copy;

}
//小数乘法
export const floatMul = (num1, num2) => {
  let m = 0, s1 = num1.toString(), s2 = num2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除法
export const floatDiv = (num1, num2) => {
  if (num2 == 0) {
    return 0;
  }
  let t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = num1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    t2 = num2.toString().split(".")[1].length
  } catch (e) {
  }
  r1 = Number(num1.toString().replace(".", ""));
  r2 = Number(num2.toString().replace(".", ""));
  return this.floatMul((r1 / r2), Math.pow(10, t2 - t1));
}
//小数加法
export const floatAdd = (num1, num2) => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return Math.round(num1 * m + num2 * m) / m;
}
//小数减法
export const floatSub = (num1, num2) => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  let n = (r1 >= r2) ? r1 : r2;
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
}

export const floatCountArr = (arr, type) => {
  if (!Array.isArray(arr)) {
    return
  }
  let funNameObj = {
    floatMul: 'floatMul',
    floatDiv: 'floatDiv',
    floatAdd: 'floatAdd',
    floatSub: 'floatSub',
  };
  let funName = funNameObj[type] || 'floatAdd';
  let result = arr[0];
  arr.forEach((v, i) => {
    if (i === 0) {
      result = v;
    } else {
      result = this[funName](result, v)
    }
  })
  return result;

}
//获取本月最大天数
export const getEvryDay = (date) => {
  let curDate = date ? new Date(date) : new Date();
  let curMonth = curDate.getMonth();
  curDate.setMonth(curMonth + 1);
  curDate.setDate(0);
  let day = curDate.getDate();
  return day;
}
// 树转一维数组
export const tree2array = (tree, child) => { // this.$common.tree2array(data, 'children');
  let lists = [];
  let toArr = function (children, child) {
    for (let i = 0; i < children.length; i++) {
      let c = children[i][child];
      lists.push(children[i]);
      if (c && c.length > 0) {
        toArr(c, child);
      }
    }
  }
  toArr(tree, child);
  return lists;
}

export const checkUpdate = () => {
  //   #ifdef APP || APP-PLUS
  let currentVersion = plus.runtime.version;
  uni.showModal({
    title: '更新提示',
    content: `当前最新版本为：1.0.2。当前版本为${currentVersion}.`,
    confirmText: '更新',
    success: function (res) {
      if (res.confirm) {
        uni.showLoading({
          title: '更新中...',
        });
        uni.downloadFile({
          url: 'http://172.18.8.146:10000/file/group1/M00/00/93/rBIIkmYGHziANBD5AsbKCOtNhfg669.apk', //仅为示例，并非真实的资源
          success: (res) => {
            uni.hideLoading();
            if (res.statusCode === 200) {
              plus.runtime.install(res.tempFilePath, {
                force: true
              }, function (e) {
                // 重启
                plus.runtime.restart();
              }, function (e) {
                console.info('用户取消安装', e);
              })
            }
          }
        });
      } else if (res.cancel) {
        console.info('用户点击取消');
      }
    }
  });
  //   #endif
  //   #ifndef APP || APP-PLUS
  console.error('支持是APP使用')
  //   #endif
}

export default {
  setLocalStorage,
  setSessionStorage,
  getLocalStorage,
  getSessionStorage,
  arrRemoveVal,
  getMonSunDate,
  getWeekArr,
  formatTime,
  timeDifference,
  formatHourToNum,
  cloneObj,
  floatMul,
  floatDiv,
  floatAdd,
  floatSub,
  floatCountArr,
  getEvryDay,
  tree2array,
  checkUpdate,
};
