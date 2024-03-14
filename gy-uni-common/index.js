import gyCommon from './js/common'
const install = Vue => {

  let targetObj = {}
  // #ifdef VUE2
  console.log(2)
  targetObj = Vue.prototype;
  // #endif
  // #ifdef VUE3
  console.log(3)
  targetObj = Vue.config.globalProperties;
  // #endif
  targetObj.$gyCommon = gyCommon;
  console.log(targetObj);
}

export default {
  install
}
