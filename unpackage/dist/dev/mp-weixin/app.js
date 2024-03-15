"use strict";
const common_vendor = require("./common/vendor.js");
const uni_modules_gyUniCommon_index = require("./uni_modules/gy-uni-common/index.js");
require("./uni_modules/gy-uni-common/js/common.js");
if (!Math) {
  "./pages/index/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projectUNIAPP/gy-uni-common/App.vue"]]);
const app = common_vendor.createApp(App);
app.use(uni_modules_gyUniCommon_index.gyUniCommon);
app.mount("#app");
