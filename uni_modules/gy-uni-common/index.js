import jsAPI from './js/index'
import * as components from './components/index'

const install = Vue => {
  if (!install.installed) {
    const _components = Object.keys(components).map(
      (key) => components[key]);
    _components.forEach((component) => {
      if (
        (component.hasOwnProperty('name') ||
          component.hasOwnProperty('__name'))) {
        Vue.component(component.name || component.__name, component);
      }
    });
    let targetObj = {}
    // #ifdef VUE2
    targetObj = Vue.prototype;
    // #endif
    // #ifdef VUE3
    targetObj = Vue.config.globalProperties;
    // #endif
    let keys = Object.keys(jsAPI);
    keys.forEach(key => {
      let k = `$${key}`;
      targetObj[k] = jsAPI[key];
    })
  }
}

export * from './js/request'
export * from './components/index'
export const gyCommon = jsAPI.gyCommon;
export const DES = jsAPI.DES;

export default {
  install
}
