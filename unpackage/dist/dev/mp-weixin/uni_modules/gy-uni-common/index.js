"use strict";
const uni_modules_gyUniCommon_js_common = require("./js/common.js");
const install = (Vue) => {
  let targetObj = {};
  console.log(3);
  targetObj = Vue.config.globalProperties;
  targetObj.$gyCommon = uni_modules_gyUniCommon_js_common.gyCommon;
  console.log(targetObj);
};
const gyUniCommon = {
  install
};
exports.gyUniCommon = gyUniCommon;
