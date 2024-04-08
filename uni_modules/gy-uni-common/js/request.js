import {decryptRequest, encryptRequest} from './DES'
import {loginPath, enableAES, toastDuration} from "../config";
import {getLocalStorage} from './common'

const timeout = 300000;
let loadingIndex = 0;
const showFunLoading = () => {
  loadingIndex++;
  uni.showLoading({
    title: '加载中'
  });
}
const hideFunLoading = () => {
  loadingIndex--;
  if (loadingIndex === 0) {
    uni.hideLoading();
  }
}
const fail = (err) => {
  let status = err.status || err.code;
  status += '';
  let message = err.message || err.errorMessage || err.msg;
  if (status === '401') {
    // 获取当前页面路由对象
    let pages = getCurrentPages() // 获取栈实例
    let currentRoute = pages[pages.length - 1].route; // 获取当前页面路由
    if (loginPath !== '/' + currentRoute) {
      uni.redirectTo({
        url: loginPath,
      })
    }
  } else if (status === '403') {
    message = 'errorPage';
  }
  message && uni.showToast({
    title: message,
    icon: 'none',
    duration: toastDuration
  });
}
const requestFun = (options, type) => {
  return new Promise((resolve, reject) => {
    let obj = formatOptions(options, type);
    obj.success = (res) => {
      {
        let data = decryptRequest(res, enableAES);
        if(typeof data === 'string'){
          data = JSON.parse(data);
        }
        let status = data.status;
        if (data.code || data.code === 0) {
          status = data.code + '';
        }
        if (typeof status === 'string') {
          status = status.toUpperCase();
        }
        if (status === 'SUCCEED' || status === "WARRING" || status == undefined || data.success) {
          resolve(data);
        } else {
          fail(data);
          reject(data);
        }
      }
    }
    obj.fail = fail;
    obj.complete = () => {
      hideFunLoading();
    };
    //给接口加权限信息
    if (obj.url.indexOf('auth/login') === -1) {
      let token = getLocalStorage("zhxd_token", 0);
      obj.header['Authorization'] = token ? 'Bearer ' + token : '';
    }
    showFunLoading();
    encryptRequest(obj, enableAES).then(config => {
      if(type === 'file'){
        uni.uploadFile(config);
      }else{
        uni.request(config)
      }
    })
  })
}
const formatOptions = (options, type) => {
  if(type === 'file'){
    return options;
  }else{
    return {
      header: {},
      timeout: timeout,
      ...options,
    }
  }
}
export const get = (option) => {
  let obj = {
    method: 'GET',
    ...option,
  };
  return requestFun(obj)
}
export const post = (option) => {
  let obj = {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    ...option,
  };
  return requestFun(obj)
}
export const postFormdata = (option) => {
  let obj = {
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...option,
  };
  return requestFun(obj)
}

export const ajaxFile = (option) => {
  let opt = {
    url: option.url, //仅为示例，非真实的接口地址
    header: option.header || {},
    name: 'file',
    formData: option.data,
    file: option.file,
  };
  let file = option.file;
  if(Array.isArray(file)){
    uni.showToast({
      title: "一次请上传一个文件。",
      icon: "none",
    })
    return;
  }else{
    // #ifdef H5
    if(file instanceof File){
      opt.filePath = URL.createObjectURL(file);
    }else{
      opt.filePath = file;
    }
    // #endif
    // #ifdef APP || APP-PLUS
    opt.filePath = file;
    // #endif
  }
  return requestFun(opt , 'file')
}
