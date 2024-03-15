"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const title = "hello";
    const instance = common_vendor.getCurrentInstance();
    console.log(instance);
    console.log(instance.appContext.config.globalProperties.$gyCommon);
    console.log(instance.appContext.config.globalProperties.$gyCommon.hasData);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title),
        b: common_vendor.t(_ctx.$gyCommon.hasData)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/projectUNIAPP/gy-uni-common/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
