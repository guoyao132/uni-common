<template>
  <view class="index">
    <uni-section :title="listObj.title" type="line" v-for="(listObj, index) in listArr":key="index">
      <uni-list :border="true">
        <uni-list-item
          v-for="(item, index1) in listObj.list"
          :title="item.name"
          link
          :key="index + '-' + index1"
          :to="item.page"
        ></uni-list-item>
      </uni-list>
    </uni-section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      listArr: [
        {
          title: '基础',
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
          ],
        },
        {
          title: '页面',
          list: [
            {
              name: 'login',
              page: '/uni_modules/gy-uni-common/pages/login/login',
            },
            {
              name: '个人中心',
              page: '/uni_modules/gy-uni-common/pages/personalCenter/personalCenter',
            },
          ],
        },
      ],
    }
  },
  mounted() {
    let token = this.$gyCommon.getLocalStorage('zhxd_token', 0);
    if (!token) {
      uni.navigateTo({
        url: '/uni_modules/gy-uni-common/pages/login/login',
      })
    }
  },
  methods: {
    bindClick(item) {
      console.log(item);
      if (item.page) {
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
