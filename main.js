import App from './App'
import gyUniCommon from "./uni_modules/gy-uni-common/index.js";

import { createApp } from 'vue'
const app = createApp(App)
app.use(gyUniCommon);
app.mount("#app");
