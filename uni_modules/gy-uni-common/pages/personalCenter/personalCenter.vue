<template>
  <view>
    <view class="person-info">
      <image class="avatar" :src="userMsg.photo || avatarUrl" @click="previewImage"></image>
      <view class="name-box">
        <view>{{ userMsg.name }}</view>
        <view class="uni-pt-4">{{ userMsg.postName }}</view>
      </view>
    </view>
    <uni-list :border="true">
      <uni-list-item title="个人信息" clickable showArrow link to="./personalInfo"></uni-list-item>
      <uni-list-item title="版本更新" clickable showArrow @click="updateVersion"></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
import {checkUpdate} from "../../js/common";

export default {
  data() {
    return {
      userMsg: {},
      avatarUrl: '../../static/login/avatar.png',
    }
  },
  methods: {
    updateVersion() {
      this.$gyCommon.checkUpdate();
    },
    previewImage() {
      uni.previewImage({
        urls: [this.userMsg.photo || this.avatarUrl],
      })
    },
  },
  mounted() {
    this.userMsg = JSON.parse(this.$gyCommon.getLocalStorage('userMsg'));
  },
}
</script>

<style lang="scss" scoped>
@import '@/uni_modules/uni-scss/index.scss';
.person-info {
  display: flex;
  padding: 60rpx 80rpx 60rpx;
  .avatar {
    width: 170rpx;
    height: 170rpx;
    border-radius: 50%;
  }
  .name-box {
    padding: 40rpx 0 0 60rpx;
    font-weight: bold;
  }
}
</style>
