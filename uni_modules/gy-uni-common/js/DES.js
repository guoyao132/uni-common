import SM4 from './gm-crypt'
import smCrypto from 'sm-crypto'

const SM2 = smCrypto.sm2;
const SM3 = smCrypto.sm3;
const sm2Encrypt = function (t, e) {
  let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
  return "04" + SM2.doEncrypt(t, e, i)
}, sm2Decrypt = function (t, e) {
  let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
    s = t.toLowerCase().replace(/^04/, "");
  return SM2.doDecrypt(s, e.toLowerCase(), i)
}

let getAesKey = function (len) {
  len = len || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  const maxPos = $chars.length;
  let keyStr = '';
  for (let i = 0; i < len; i++) {
    keyStr += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return keyStr;
};
const aeskey = getAesKey().toString().substring(0, 16);
const aesiv = getAesKey().toString().substring(0, 16);

//sm4 配置config
const sm4Config = {
  // sm4 密钥
  key: aeskey,
  // key: 'Fd6xZfwz5JizJinM',

  // 加密模式cbc 或 ecb
  mode: 'cbc', // default

  // optional; when use cbc mode, it's �necessary
  iv: aesiv, // default is null

  // 类型，base64 或 text
  cipherType: 'base64' // default is base64
}
const sm4 = new SM4(sm4Config)

const publicKey = '041CB0B7F9910687E87836EB28F46875448B25E78B103C7E0E750F7D00626CB51CE25C4DAAC7745EDAF538001F79F8BD4C0ECC14F4E838A75893749B6066731B6B';
/** 用 SM2 的公钥加密 SM4 的key **/
const enKey = sm2Encrypt(aeskey, publicKey)
const enKeyi = sm2Encrypt(aesiv, publicKey)


export const encryptRequest = (config, enableAES) => {
  return new Promise(async resolve => {
    if (enableAES) {
      if (config.file) {
        let headers = config.header;
        function setFileSm3(file) {
          return new Promise(resolveFile => {
            // #ifdef H5
            let size = file.size;
            let offset = 1024 * 50;
            let chunks = [file.slice(0, offset)];
            let cur = offset;
            let promiseArr = [];
            while (cur < size) {
              let end = cur + offset;
              if (end >= size) {
                chunks.push(file.slice(cur, end));
              } else {
                const mid = cur + offset / 2;
                chunks.push(file.slice(cur, cur + 2));
                chunks.push(file.slice(mid, mid + 2));
                chunks.push(file.slice(end - 2, end));
              }
              cur += offset;
            }
            chunks.forEach(b => {
              promiseArr.push(b.arrayBuffer());
            })
            Promise.all(promiseArr).then(result => {
              let binary = '';
              for (let j = 0; j < result.length; j++) {
                let byteArray = new Uint8Array(result[j]);
                let len = byteArray.byteLength;
                let binary_linshi = '';
                for (let i = 0; i < len; i++) {
                  binary_linshi += String.fromCharCode(byteArray[i]);
                }
                binary += binary_linshi;
              }
              binary = window.btoa(binary)
              headers["sm3-key"] = SM3(binary);
              headers["sm4-key"] = enKey;//国网加密设置 header 头；
              headers["sm4-key-i"] = enKeyi;//国网加密设置 header 头；
              resolveFile(config)
            })
            //   #endif
            // #ifdef APP || APP-PLUS
            plus.io.resolveLocalFileSystemURL(
              file,
              function (entry) {
                entry?.file(function (file) {
                  let size = file.size;
                  let offset = 1024 * 50;
                  let chunks = [file.slice(0, offset)];
                  let cur = offset;
                  let promiseArr = [];
                  while (cur < size) {
                    let end = cur + offset;
                    if (end >= size) {
                      chunks.push(file.slice(cur, end));
                    } else {
                      const mid = cur + offset / 2;
                      chunks.push(file.slice(cur, cur + 2));
                      chunks.push(file.slice(mid, mid + 2));
                      chunks.push(file.slice(end - 2, end));
                    }
                    cur += offset;
                  }
                  chunks.forEach(b => {
                    promiseArr.push(new Promise(resolve2 => {
                      const fileReader = new plus.io.FileReader()
                      fileReader.readAsDataURL(b, 'utf-8')
                      fileReader.onloadend = function (evt) {
                        const result = {
                          base64: evt.target.result.split(',')[1],
                          size: file.size,
                        }
                        b.close();
                        resolve2(result.base64)
                      }
                    }))
                  })
                  Promise.all(promiseArr).then(result => {
                    let binary = result.join('');
                    headers["sm3-key"] = SM3(binary);
                    headers["sm4-key"] = enKey;//国网加密设置 header 头；
                    headers["sm4-key-i"] = enKeyi;//国网加密设置 header 头；
                    resolveFile(config)
                  })
                })
              },
              function (error) {
                console.error(error)
              },
            )
            //   #endif
          })
        }

        let file = config.file;
        setFileSm3(file).then(config => {
          resolve(config)
        })
      } else if (config.data && config.data.toString() == "[object FormData]") {
        let headers = config.header;
        let delEntity = new Array();
        let ent = config.data.entries();
        let hasFile = false;
        while (true) {
          let entry = ent.next();
          if (entry.done) {
            break;
          }
          if (entry.value[1].type == undefined) {
            let key = entry.value[0];
            let value = entry.value[1];
            delEntity.push({[key]: value});
          } else {
            // #ifdef H5
            if (entry.value[0] == 'file')
              hasFile = true;
            // #endif
          }
        }
        //增加文件md5的校验
        if (delEntity && delEntity[0]) {
          config.data.append("zhxd-data", sm4.encrypt(JSON.stringify(delEntity[0])));
          headers["sm4-key"] = enKey;//国网加密设置 header 头；
          headers["sm4-key-i"] = enKeyi;//国网加密设置 header 头；
          headers["sm3-key"] = SM3(sm4.encrypt(JSON.stringify(delEntity[0])));
        }
        resolve(config)
      } else {
        let url = config.url;
        let whIndex = url.indexOf("?");
        let urlPObj = null;
        let str3 = '';
        let strD3 = '';
        if (whIndex != -1) {
          let newUrl = url.substring(0, whIndex);
          config.url = newUrl;
          let p = url.substring(whIndex + 1);
          let pArr = p.split("&");
          urlPObj = {};
          pArr.forEach(v => {
            let vArr = v.split("=");
            if (vArr.length > 1) {
              urlPObj[vArr[0]] = vArr[1];
            }
          })
        }
        let params = config.params;//大兴post
        let datas = config.data;//可视化post
        let signdata = "";
        if (params || urlPObj || datas) {
          params || (params = {});
          datas || (datas = {});
          urlPObj || (urlPObj = {});
          let newP = {...params, ...urlPObj, ...datas};
          signdata = JSON.stringify(newP);
          let str = sm4.encrypt(signdata);//国网加密数据
          str3 = SM3(JSON.parse(JSON.stringify(str)));
          let obj = {
            "zhxd-data": str
          };
          config.data = JSON.stringify(newP) == '{}' ? {} : obj;
        }
        let headers = config.header;
        headers["sm4-key"] = enKey;//国网加密设置 header 头；
        headers["sm4-key-i"] = enKeyi;//国网加密设置 header 头；
        headers["sm3-key"] = str3
        resolve(config)
      }
    } else {
      resolve(config)
    }
  })
}
export const encrypt = (msg) => {
  return sm4.encrypt(msg);
}
export const decrypt = (msg) => {
  return sm4.decrypt(msg);
}
export const decryptRequest = (response, enableAES) => {
  let responseData = response.data;
  if(typeof responseData === 'string'){
    try {
      responseData = JSON.parse(responseData);
    }catch (err){}
  }
  if (enableAES && responseData['zhxd-data']) {
    let data = decrypt(responseData['zhxd-data']);
    return data ? JSON.parse(data) : data;
  } else {
    return responseData;
  }
}
export default {
  encryptRequest,
  decryptRequest,
  encrypt,
  decrypt
}


