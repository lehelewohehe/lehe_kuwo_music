<template>
<div class="p-choice">
  <div class="p-choice__banner">
    <c-swiper :banner="bannerList"></c-swiper>
  </div>
</div>
</template>

<script type="text/javascript">
import {getBanner} from "@/request/index.js";
import {ref} from "vue";
export default {
  setup(props, context) {
    let bannerList = ref([]);

    getBanner().then(data => {
      let {banners=[]} = data;
      bannerList.value = banners;
    });
    return {
      bannerList
    };
  }
}
</script>
<style lang="scss" scoped>
</style>