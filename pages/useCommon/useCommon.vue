<template>
  <view class="useCommon">
    <view class="text-area">
      look console
    </view>
  </view>
</template>
<script>
export default {
  mounted(){
    console.info(this.$gyCommon);
  },
}
</script>

<style lang="scss">
.useCommon{
  padding: 20px;
}
</style>
