<template>
  <view class="useRequest">

    <uni-section title="get" type="line">
      <button @click="getFun">test get</button>
    </uni-section>

    <uni-section title="postFormdata" type="line">
      <button @click="login">login</button>
    </uni-section>
    <uni-section title="token verify" type="line">
      <button @click="getUserMsg">getUserMsg</button>
    </uni-section>
    <uni-section title="上传文件" type="line">
      <gyChooseFile
        @chooseFileSucc="chooseFileFun"/>
      <br>
      <button @click="uploadChooseFile">上传文件</button>
    </uni-section>
    <uni-section title="uni chooseImage选择并上传" type="line">
      <button @click="uploadChooseImage">上传文件</button>
    </uni-section>
  </view>
</template>

<script>
import {get, post, postFormdata, ajaxFile} from '@/uni_modules/gy-uni-common/index.js'
// import {baseUrl} from '../../api/index'
const baseUrl = 'http://172.18.8.146/api';
export default {
  data(){
    return {
      chooseFile:[]
    }
  },
  mounted(){
  },
  methods: {
    getFun(){
      get({
        url: baseUrl + "/eledevice/switch/getWiringInfo?stationCode=CSYGKBZ&scheduleNum=undefined&typeCode=1&v=07122989906906496",
      }).then(data => {
        console.log(data);
      })
    },
    login(){
      postFormdata({
        url: baseUrl + '/auth/oauth/token?username=admin&password=123456abC&code=1&grant_type=password&scope=server&client_id=cloud&client_secret=cloud&randomStr=1710575816661',
      }).then(resp => {
        this.$gyCommon.setLocalStorage("zhxd_token", resp.access_token, 0);
        this.$gyCommon.setLocalStorage("zhxd_token_linshi", resp.access_token, 0);
        this.$gyCommon.setLocalStorage("userId", resp.userId);
        this.$gyCommon.setLocalStorage("userMsg", JSON.stringify(resp));
      })
    },
    getUserMsg(){
      get({
        url: baseUrl + '/rbac/sys/user/get',
        data: {
          userId: 'admin'
        }
      }).then(res => {
        console.log(res);
      })
    },
    chooseFileFun(file) {
      // 处理文件，例如上传
      this.chooseFile = file;

      // console.log(this.chooseFile[0]);
      // window.aa = this.chooseFile[0]


      // #ifdef APP
      let filePath = this.chooseFile[0];
      plus.io.resolveLocalFileSystemURL(
        filePath.path,
        function (entry) {
          entry?.file(function (file) {
            console.log(file);
            function setFileSm3(file) {
              return new Promise(resolveFile => {
                let size = file.size;
                let offset = 20 || 1024 * 50;
                let chunks = [file.slice(0, 20)];
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
                  promiseArr.push(new Promise(resolve => {
                    const fileReader = new plus.io.FileReader()
                    fileReader.readAsDataURL(b, 'utf-8')
                    fileReader.onloadend = function (evt) {
                      const result = {
                        base64: evt.target.result.split(',')[1],
                        size: file.size,
                      }
                      b.close();
                      resolve(result.base64)
                    }
                  }))
                })
                Promise.all(promiseArr).then(result => {
                  console.log(result);
                })
              })
            }

            setFileSm3(file);
          })
        },
        function (error) {
          console.log(error)
        },
      )
    //   #endif
    },
    uploadChooseFile(){
      if(this.chooseFile.length !== 0){
        let file = '';
        // #ifdef H5
        file = this.chooseFile[0];
        // #endif
        // #ifdef APP || APP-PLUS
        file = this.chooseFile[0].path;
        // #endif
        ajaxFile({
          url: baseUrl + '/rbac/sys/file/uploadOne',
          file: file,
        }).then(resp => {
          console.log(resp.result);
        })
      }else{
        uni.showToast({
          title: '请先选择文件！',
          icon: 'none',
        })
      }
    },
    uploadChooseImage(){
      uni.chooseImage({
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          ajaxFile({
            url: baseUrl + '/rbac/sys/file/uploadOne',
            file: tempFilePaths[0],
            data: {
              a: 1,
            },
          }).then(resp => {
            console.log(resp.result);
          })
        }
      });
    },
  },
}
</script>


<style lang="scss">
.useRequest{
  padding: 20px;
}
</style>
