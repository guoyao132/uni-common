<template>
	<view class="full-screen">
    <view class="login">
      <view class="login-top">
        <view class="login-title">
          登录
          <image class="login-welcome" src="../../static/login/login-welcome.png"></image>
        </view>
        <view class="login-text">
          欢迎您，来到绩效考核系统
        </view>
      </view>
      <view class="login-main">
        <view class="login-list-ipt">
          <view class="login-item-ipt">
            <input v-model="username" class="login-ipt" focus placeholder="请输入账号" />
          </view>
          <view class="login-item-ipt">
            <view class="login-ipt-pwd-con">
              <input v-model="password" class="login-ipt" placeholder="请输入密码" :password="showPassword" />
              <view
                class="login-ipt-pwd-icon"
                :class="[!showPassword ? 'uni-eye-active' : '']"
                @click="changePassword">
                <image src="../../static/login/login-showPwd.png" v-show="!showPassword"></image>
                <image src="../../static/login/login-hidePwd.png" v-show="showPassword"></image>
              </view>
            </view>
          </view>
          <view class="login-item-ipt login-item-ipt-code-con">
            <input v-model="code" class="login-ipt" focus placeholder="请输入验证码" />
            <image @click="getCode" class="login-item-ipt-code" :src="imgSrc"></image>
          </view>
          <view class="login-list-login" @click="loginFun">
            登录
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
  import {post, gyCommon} from '../../index'
  import {toastDuration} from "../../config";
  import {baseUrl} from '../../../../api/index'
	export default {
		data() {
			return {
        showPassword: true,
        imgSrc: '',
        randomStr: '',
        username: 'admin',
        password: 'zhxd@2023',
        code: '',
			}
		},
		methods: {
      changePassword() {
        this.showPassword = !this.showPassword;
      },
      getCode() {
        this.randomStr = new Date().getTime()
        this.imgSrc = baseUrl + '/code/' + this.randomStr
      },
      loginFun(){
        if(!this.username){
          uni.showToast({
            title: "请输入账号！",
            icon: 'error',
            duration: toastDuration
          })
          return;
        }
        if(!this.password){
          uni.showToast({
            title: "请输入密码！",
            icon: 'error',
            duration: toastDuration
          })
          return;
        }
        if(!this.code){
          uni.showToast({
            title: "请输入验证码！",
            icon: 'error',
            duration: toastDuration
          })
          return;
        }
        post({
          url: baseUrl + '/auth/login',
          data: {
            loginName: this.username,
            password: this.password,
            code: this.code,
            randomStr: this.randomStr,
          }
        }).then(resp => {
          let data = resp.data;
          gyCommon.setLocalStorage("zhxd_token", data.token, 0);
          gyCommon.setLocalStorage("zhxd_token_linshi", data.token, 0);
          gyCommon.setLocalStorage("userId", data.objId);
          gyCommon.setLocalStorage("userMsg", JSON.stringify(data));
          uni.switchTab({
            url: '/pages/index/index',
          })
        }).catch(() => {
          this.getCode()
        })
      },
		},
    mounted(){
      this.getCode();
    },
	}
</script>

<style lang="scss" scoped>
.full-screen{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(45deg, #c6dbff, transparent);
  z-index: 999;
}
.login{
  width: 100%;
  height: 100%;
  background: url("../../static/login/login-bg.png") no-repeat top center / 100% auto;
}
.login-top{
  padding: 215rpx 0 0 60rpx;
  .login-welcome{
    width: 174rpx;
    height: 51rpx;
    margin-left: 25rpx;
    position: relative;
    top: 6rpx;
  }

  .login-title{
    color: #303233;
    font-size: 58rpx;

  }

  .login-text{
    color: #303233;
    font-size: 29rpx;
    margin-top: 55rpx;
  }
}
.login-main{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 500rpx;
  background: #fff;
  border-top-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
  z-index: 1;
  animation: changeTop .8s linear;
  animation-iteration-count: 1;
}
@keyframes changeTop {
  0%{
    top: 550rpx;
  }
  100%{
    top: 500rpx;
  }
}
.login-list-ipt{
  width: 638rpx;
  margin: 0 auto;
  padding-top: 72rpx;
}
.login-item-ipt{
  margin-bottom: 38rpx;
}
.login-ipt{
  width: 100%;
  height: 108rpx;
  line-height: 108rpx;
  box-sizing: border-box;
  background: #EFF2F4;
  border-radius: 18rpx;
  font-size: 30rpx;
  padding: 0 35rpx;

}
.login-ipt-pwd-con{
  position: relative;
}
.login-ipt-pwd-icon{
  position: absolute;
  right: 36rpx;
  top: 42rpx;
  width: 34rpx;
  height: 24rpx;

  uni-image{
    width: 100%;
    height: 100%;
  }
}
.login-list-login{
  width: 100%;
  height: 108rpx;
  line-height: 108rpx;
  text-align: center;
  background: #4181FF;
  border-radius: 18rpx;
  color: #fff;
  font-size: 37rpx;
  margin-top: 73rpx;
}
.login-item-ipt-code-con{
  height: 100%;
  display: flex;

  .login-item-ipt-code{
    height: 108rpx;
    padding: 10rpx;
    box-sizing: border-box;
  }
}
</style>
