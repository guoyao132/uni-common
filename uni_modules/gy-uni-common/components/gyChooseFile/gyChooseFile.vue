<template>
  <view>
    <view :class="className" @click="chooseFile">{{ text }}</view>
    <!-- #ifdef H5 -->
    <view ref="iptCon"></view>
    <!-- #endif -->
  </view>
</template>

<script>
import {toastDuration, multipleFileNum} from "../../config";
// #ifdef APP || APP-PLUS
const AfDocument = uni.requireNativePlugin("Aq-ChooseFile");
// #endif
export default {
  name: "gyChooseFile",
  props: {
    className: {
      type: String,
      default: 'gyChooseFileButton'
    },
    text: {
      type: String,
      default: '选择文件',
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    acceptStr: {
      type: String,
      default: '',
    },
    acceptType: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Number,
      default: null,
    },
    paths: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      iptDom: null,
    }
  },
  methods: {
    chooseFile() {
      // #ifdef H5
      this.iptDom.click();
      // #endif
      //   #ifdef APP || APP-PLUS
      this.selectLocalFile();
      //   #endif
    },
    checkFileFun(files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fileName = file.name;
        if (this.size || this.size === 0) {
          let size = this.size * 1024;
          if (size !== 0 && size < file.size) {
            uni.showToast({
              title: `${fileName}文件超过最大限制${this.size}M`,
              icon: 'none',
              duration: toastDuration
            });
            return;
          }
        }
        if (this.acceptType.length > 0) {
          let fileType = fileName.split('.');
          fileType = fileType[fileType.length - 1];
          fileType = fileType.toLowerCase()
          let acceptType = this.acceptType.join(',').toLowerCase();
          if (!acceptType.includes(fileType)) {
            uni.showToast({
              title: `仅允许选择${acceptType}类型文件`,
              icon: 'none',
              duration: toastDuration
            });
            return;
          }
        }
      }
      this.$emit('chooseFileSucc', files);
    },
    checkAppFileFun(files) {
      if(this.size){
        let size = this.size * 1024 * 1024;
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let fileName = file.name;
          let fileSiez = this.computedSizeToB(file.size);
          if (size !== 0 && size < fileSiez) {
            uni.showToast({
              title: `${fileName}文件超过最大限制${this.size}M,请重新选择。`,
              icon: 'none',
              duration: toastDuration
            });
            return;
          }
        }
      }
      this.$emit('chooseFileSucc', files);
    },
    computedSizeToB(sizeStr){
      let unit = sizeStr.slice(-2).toUpperCase();
      let powNumObj = {
        "KB": 1,
        "MB": 2,
        "GB": 3,
        "TB": 4,
      };
      let powNum = powNumObj[unit] || 0;
      let fileSize = parseFloat(sizeStr);
      fileSize = fileSize * Math.pow(1024, powNum);
      return fileSize;
    },
    selectLocalFile() {
      let types = [{
        name:'文档',
        value:["doc","wps","docx","xls","xlsx","pdf", "txt"]
      },{
        name:'视频',
        value:["mp4"]
      },{
        name:'音乐',
        value:['mp3','flac']
      },{
        name:'图片',
        value:['jpg','png','jpeg','gif']
      }];
      if(this.acceptType && this.acceptType.length > 0){
        types = [{
          name:'文件',
          value: this.acceptType
        }]
      }
      let opt = {
        size: this.isMultiple ? multipleFileNum : '1', //选择总数量
        types: types
      };
      if(this.paths){
        opt.paths = this.paths;
        opt.isDown = true;
      }
      AfDocument.openMode(opt,(res)=>{
			this.checkAppFileFun(res.res);
      })
    },
  },
  mounted() {
    // #ifdef H5
    if (!this.iptDom) {
      this.iptDom = document.createElement('input');
      this.iptDom.type = 'file';
      this.iptDom.multiple = this.isMultiple;
      this.iptDom.accept = this.acceptStr;
      this.iptDom.onchange = () => {
        this.checkFileFun(this.iptDom.files);
      }
    }
    // #endif
  },
}
</script>

<style>
.gyChooseFileButton {
  background: #6161f5;
  color: #FFFFFF;
  text-align: center;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
}
</style>
