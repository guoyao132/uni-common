import App from './App'
import gyUniCommon from "./gy-uni-common";

import { createApp } from 'vue'
const app = createApp(App)
app.use(gyUniCommon);
app.mount("#app");
