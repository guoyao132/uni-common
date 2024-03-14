export default {
  hasData(arr, val) {
    for (let a = 0; a < arr.length; a++) {
      if (arr[a] === val) {
        return true
      }
    }
  },
  setLocalStorage(key, value) {
  },
  setSessionStorage(key, value) {
  },
  getLocalStorage(key) {
  },
  getSessionStorage(key) {
  },
  /*
  * author: g
  * time: 2020/9/7 15:34
  * @desc 删除数组某个值
  * @params
  */
  arrRemoveVal(arr, val) {
    let index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
  },
  /*
  * author: g
  * time: 2020/8/28 9:20
  * @desc 水印
  * @params
  */
  watermark({
              t1, t2, t3,
              id,
              defaultSettings = {
                watermark_color: '#0e8eb5', //水印字体颜色
                watermark_alpha: 0.1, //水印透明度
                watermark_fontsize: '17px', //水印字体大小
                watermark_font: '微软雅黑',
                watermark_width: 200, //水印宽度
                watermark_height: 80, //水印长度
                watermark_angle: 15, //水印倾斜度数
              },
              intervalWidth = 300,
              intervalheight = 100,
              isOne = false,
            }) {
    let maxWidth = document.documentElement.clientWidth;
    let maxHeight = document.documentElement.clientHeight;
    let rowNumber = (maxWidth - 40 - 200) / intervalWidth;    //横向个数
    let coumnNumber = (maxHeight - 40 - 150) / intervalheight;   //纵向个数
    if (document.getElementById('shuiyin')) {
      document.getElementById('shuiyin').remove();
    }
    let _temp = document.createElement('div');
    let addMarkFun = (x, y) => {
      let mark_div = document.createElement('div');
      mark_div.id = 'mark_div' + i + j;
      mark_div.className = 'mark_div';
      let span0 = document.createElement('div');
      span0.appendChild(document.createTextNode(t1));
      if (t2) {
        let span1 = document.createElement('div');
        span1.appendChild(document.createTextNode(t2));
        mark_div.appendChild(span1);
      }
      if (t3) {
        let span2 = document.createElement('div');
        span2.appendChild(document.createTextNode(t3));
        mark_div.appendChild(span2);
      }
      mark_div.appendChild(span0);
      //设置水印div倾斜显示
      mark_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mark_div.style.visibility = "";
      mark_div.style.left = x + 'px';
      mark_div.style.top = y + 'px';
      mark_div.style.overflow = "hidden";
      mark_div.style.zIndex = "9999";
      mark_div.style.pointerEvents = 'none'; //pointer-events:none  让水印不阻止交互事件
      mark_div.style.opacity = defaultSettings.watermark_alpha;
      mark_div.style.fontFamily = defaultSettings.watermark_font;
      mark_div.style.color = defaultSettings.watermark_color;
      mark_div.style.textAlign = "center";
      mark_div.style.display = "block";
      if (isOne) {
        mark_div.style.display = "flex";
        mark_div.style.justifyContent = "center";
        mark_div.style.alignItems = "center";
        mark_div.style.fontSize = '12em';
        mark_div.style.position = "fixed";
        mark_div.style.width = '100%';
        mark_div.style.height = '100%';
      } else {
        mark_div.style.fontSize = defaultSettings.watermark_fontsize;
        mark_div.style.position = "absolute";
        mark_div.style.width = defaultSettings.watermark_width + 'px';
        mark_div.style.height = defaultSettings.watermark_height + 'px';
      }
      _temp.appendChild(mark_div);
    }
    _temp.id = 'shuiyin'
    if (isOne) {
      addMarkFun(0, 0);
    } else {
      for (let i = 0; i < rowNumber; i++) {
        for (let j = 0; j < coumnNumber; j++) {
          let x = intervalWidth * i + 20;
          let y = intervalheight * j + 30;
          addMarkFun(x, y);
        }
      }
    }

    if (id) {
      document.getElementById(id).appendChild(_temp)
    } else {
      document.body.appendChild(_temp);
    }
  },
  /*
  * author: g
  * time: 2020/7/21 14:08
  * @desc 获取周一和周日日期
  * @return [mon, sun] Date格式
  */
  getMonSunDate(nowDate) {
    nowDate = new Date(nowDate);
    let day = nowDate.getDay();
    (day == 0) && (day = 7);
    let start = new Date(nowDate.setDate(nowDate.getDate() - (day - 1)));
    let end = new Date(new Date(start).setDate(start.getDate() + 6));
    return [start, end]
  },
  /*
  * author: g
  * time: 2020/7/21 14:09
  * @desc 获取一周的日期数组
  * @return 数组 数据格式为Date
  */
  getWeekArr(nowDate) {
    let [start, end] = this.getMonSunDate(nowDate);
    let arr = [new Date(start)];
    for (let i = 0; i < 6; i++) {
      start.setDate(start.getDate() + 1);
      arr.push(new Date(start));
    }
    return arr;
  },

  /*
  * author: g
  * time: 2020/7/16 10:52
  * @desc 根据键名比较获取对应的另一个键名的值
  * @params1 val 判断值
  * @params2 list 数组或对象
  * @params3 idCol 需要比较的键名
  * @params4 nameCol 需要获取的键名
  */
  getNameById(val, list, idCol, nameCol) {
    if (list) {
      for (let i in list) {
        if (list[i][idCol] == val)
          return list[i][nameCol];
      }
    }
    return null;
  },
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
  formatTime: function (time, type, customFormat) {
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
    dataStr = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
    if (customFormat) {
      customFormat = customFormat.replace(/yy/g, y.substring(2));
      customFormat = customFormat.replace(/y/g, y);
      customFormat = customFormat.replace(/m/g, m);
      customFormat = customFormat.replace(/d/g, d);
      customFormat = customFormat.replace(/h/g, h);
      customFormat = customFormat.replace(/M/g, M);
      customFormat = customFormat.replace(/s/g, s);
      return customFormat;
    } else {
      if (type === "hms") {
        dataStr = h + ":" + M + ":" + s;
      } else if (type === "ymd") {
        dataStr = y + "-" + m + "-" + d;
      } else if (type === "y") {
        dataStr = y;
      } else if (type === "ym") {
        dataStr = y + "-" + m;
      }
    }
    return dataStr;
  },
  /*
  * timeDifference
  * @gy
  * @2024/3/14 16:54
  * @description 获取时间差
  */
  timeDifference(date, date2, timeDiff, geshi) {
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
    let shijian =
      dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
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
  },
  //将时分秒变为数字
  formatHourToNum(v) {
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
  },
  cloneObj: function (obj) {
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

  },

  //小数乘法
  floatMul: function (num1, num2) {
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
  },
  //除法
  floatDiv: function (num1, num2) {
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
  },
  //小数加法
  floatAdd: function (num1, num2) {
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
  },
  //小数减法
  floatSub: function (num1, num2) {
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
  },

  floatCountArr(arr, type) {
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

  },
  //获取本月最大天数
  getEvryDay: function (date) {
    let curDate = date ? new Date(date) : new Date();
    let curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    let day = curDate.getDate();
    return day;
  },
  // 树转一维数组
  tree2array: function (tree, child) { // this.$common.tree2array(data, 'children');
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
  },
}
