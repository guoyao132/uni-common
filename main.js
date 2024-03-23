import Vue from 'vue'
import App from './App'
import gyUniCommon from "./uni_modules/gy-uni-common/index.js";

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(gyUniCommon)
const app = new Vue({
  render: h => h(App),
})
app.$mount()
