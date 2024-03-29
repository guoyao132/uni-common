# gy-uni-common
## install
1. 首先在插件市场进行安装
2. 在控制台中进入 [项目]/uni_modeules/gy-uni-common 目录。
3. 运行npm install

## init
```javascript
import gyUniCommon from "./uni_modules/gy-uni-common/index.js";
app.use(gyUniCommon);
```

## require 请求
1.  设置config 可以设置enableAES 是否开启接口加密
2. 在需要使用的地方引用  
```javascript
import {get, post, postFormdata, ajaxFile} from '@/uni_modules/gy-uni-common/index.js'
```

## $gyCommon
```javascript

// #ifdef VUE2
const gyCommon = this.$gyCommon
// #endif
// #ifdef VUE3
import {getCurrentInstance} from 'vue'
const instance = getCurrentInstance();
const gyCommon = instance.appContext.config.globalProperties.$gyCommon
// #endif
// or
import gyCommon from './uni_modules/gy-uni-common/js/common.js'
// or
import {setLocalStorage} from './uni_modules/gy-uni-common/js/common.js'

const {
  setLocalStorage,      //设置localStorage,     params:  key, value, encryption(是否加密，默认开启)
  setSessionStorage,    //设置sessionStorage,   params:  key, value, encryption(是否加密，默认开启)(只有H5可以设置，sessionStorage。其他方式调用，均设置为localStorage)
  getLocalStorage,      //获取localStorage      params:  key, encryption(是否加密，默认开启，请与设置保持一致)
  getSessionStorage,    //获取sessionStorage    params:  key, encryption(是否加密，默认开启，请与设置保持一致)
  arrRemoveVal,         //数组移除删除某个指定值  params:  arr, val
  getMonSunDate,        //获取周一和周日日期      params: nowDate
  getWeekArr,           //获取一周的日期数组      params: nowDate
  formatTime,           //格式化日期             params: time, type(不填写默认返回{y-m-d h:M:s},可选ymd/hms或yy、y、m、d、h、M、s组成的自定义格式 y 为完整年份 yy 为年份后两位)
  timeDifference,       //获取时间差             params: date, date2, timeDiff(时间差值), geshi(返回时间中间格式) 
  formatHourToNum,      //将时分秒变为数字        params: dateStr(y-m-d h:M:S)
  cloneObj,             //深度clone obj         params: obj
  floatMul,             //小数乘法               params: num1, num2
  floatDiv,             //小数除法               params: num1, num2
  floatAdd,             //小数加法               params: num1, num2
  floatSub,             //小数减法               params: num1, num2
  floatCountArr,        //多个小数进行计算        params: arr(需要计算的小数数组), type(计算类型 可选floatMul、floatDiv、floatAdd、floatSub 默认 floatAdd)
  getEvryDay,           //获取本月最大天数        params：date
  tree2array,           //将树数据转变为数组       params: tree, child(子节点属性名称)
  checkUpdate,          //检查APP更新
} = gyCommon;
```

## components
### gyChooseFile 文件选择
1. 该组件支持h5、app(android)。
2. 支持APP时，需要安装 [Aq-ChooseFile](https://ext.dcloud.net.cn/plugin?id=5263) 插件。
3. 项目添加Aq-ChooseFile插件后，在manifest.json中配置App原生插件配置。选择插件。完成添加。
```
  <gyChooseFile
    className="gyChooseFileButton"
    @chooseFileSucc="chooseFileSucc"/>
```
| props |                                      描述 |      类型 |
|-------|----------------------------------------|--------|
|className| class名，默认为gyChooseFileButton。切不带任何基础样式。 |  string |
| text|                                    文本名称 |  string |
|isMultiple|                                    是否多选 | boolean |
|acceptStr |               input accept 文件选取类型 仅支持H5 |  string |
|acceptType|                      文件后缀强制限制 支持APP以及H5 |   array |
|size|                             文件大小限制，单位 M |  number |
|paths|                          自定义选择目录，仅支持APP |   array |
