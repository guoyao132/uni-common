<template>
	<view class="chooseFile">
    <uni-section title="基础" type="line">
      <gyChooseFile
        className="gyChooseFileButton"
        @chooseFileSucc="chooseFileSucc"/>
      <view class="remark">className 默认为gyChooseFileButton。修改以后不带任何样式</view>
    </uni-section>
    <uni-section title="多选" type="line">
      <gyChooseFile
        :paths="['/storage/emulated/0/Pictures']"
        text="选择文件(多选)"
        :isMultiple="true"
        @chooseFileSucc="chooseFileSucc"/>
    </uni-section>
    <uni-section title="文件大小限制1M" type="line">
      <gyChooseFile
        :size="1"
        @chooseFileSucc="chooseFileSucc"/>
    </uni-section>
    <uni-section title="文件类型值允许选择pdf" type="line">
      <gyChooseFile
        acceptStr="application/pdf"
        :acceptType="['pdf']"
        @chooseFileSucc="chooseFileSucc"/>
      <view class="remark">acceptStr控制选择文件时筛选、acceptType强制限制文件后缀</view>
      <view class="remark">:acceptType="['pdf']"</view>
      <view class="remark">acceptStr APP不生效、acceptType强制限制文件后缀</view>
    </uni-section>
    <uni-section title="文件类型值允许选择pdf、png" type="line">
      <gyChooseFile
        :size="5"
        :paths="['/storage/emulated/0/Pictures']"
        acceptStr="application/pdf,image/png"
        :acceptType="['pdf', 'png']"
        @chooseFileSucc="chooseFileSucc"/>
    </uni-section>
  </view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
      chooseFileSucc(file){
        console.log(file);
      },
		}
	}
</script>

<style scoped lang="scss">
.chooseFile{
  width: 90%;
  margin: 0 auto;
}
.remark{
  font-size: 13px;
  color: #5b5b5b;
  margin: 5px 0;
}
</style>
