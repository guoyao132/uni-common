# gy-uni-common
## init
```javascript
import gyUniCommon from "./uni_modules/gy-uni-common/index.js";

app.use(gyUniCommon);
```

## $gyCommon
```javascript

// #ifdef VUE2
const common = this.$gyCommon
// #endif
// #ifdef VUE3
import {getCurrentInstance} from 'vue'
const instance = getCurrentInstance();
const common = instance.appContext.config.globalProperties.$gyCommon
// #endif
```
