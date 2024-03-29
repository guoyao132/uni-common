<template>
  <view>
    <uni-list :border="true">
      <uni-list-item title="版本更新" clickable @click="updateVersion"></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
import {checkUpdate} from "../../js/common";

export default {
  data() {
    return {}
  },
  methods: {
    updateVersion() {
      this.$gyCommon.checkUpdate();
    },
  },
  mounted() {
  },
}
</script>

<style>

</style>
