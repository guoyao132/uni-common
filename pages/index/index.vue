<template>
  <view class="index">
    <uni-section title="基础" type="line">
      <uni-list :border="true">
        <uni-list-item
          v-for="(item, index) in list"
          :title="item.name"
          link
          :key="index"
          :to="item.page"
        ></uni-list-item>
      </uni-list>
    </uni-section>
    <uni-section title="页面" type="line">
      <uni-list :border="true">
        <uni-list-item
          title="login"
          link
          to="/uni_modules/gy-uni-common/pages/login/login"
        ></uni-list-item>
      </uni-list>
    </uni-section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: 'common',
          page: '/pages/useCommon/useCommon',
        },
        {
          name: 'request',
          page: '/pages/useRequest/useRequest',
        },
        {
          name: 'chooseFile',
          page: '/pages/chooseFile/chooseFile',
        },
      ]
    }
  },
  mounted(){
    let token = this.$gyCommon.getLocalStorage('zhxd_token', 0);
    if(!token){
      uni.navigateTo({
        url: '/uni_modules/gy-uni-common/pages/login/login',
      })
    }
  },
  methods: {
    bindClick(item){
      console.log(item);
      if(item.page){
        uni.navigateTo({
          url: item.page,
        })
      }
    },
  },
}
</script>

<style>
</style>
