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
        console.info(data);
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
      })
    },
    chooseFileFun(file) {
      // 处理文件，例如上传
      this.chooseFile = file;
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
          console.info(resp.result);
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
          }).then(resp => {
            console.info(resp.result);
          })
        }
      });
    },
  },
}
</script>


<style lang="scss">
.useRequest{
  padding: 20rpx;
}
</style>
