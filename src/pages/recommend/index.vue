<template>
<div class="p-recommend">
  <c-tab-bar v-model:list="tabbar" bothSides="40px" :textStyle="{'font-size': '14px'}"></c-tab-bar>
  <div class="p-recommend__container">
    <router-view></router-view>
  </div>
</div>
</template>

<script type="text/javascript">
import {ref} from "vue";
import {useRouter, useRoute} from "vue-router";
export default {
  setup(props, context) {
    const route = useRoute();
    let tabbar = ref([
      {name: "精选", active: true, path: "/recommend/choice"},
      {name: "歌手", active: false, path: "/recommend/singer"},
      {name: "排行榜", active: false, path: "/recommend/ranking-list"},
      {name: "歌单分类", active: false, path: "/recommend/song-sheet"},
      {name: "主播电台", active: false, path: ""},
      {name: "音乐现场", active: false, path: ""},
      {name: "会员专区", active: false, path: ""},
    ]);

    return {
      tabbar
    }
  }
}
</script>
<style lang="scss" scoped>
.p-recommend {
  
}
</style>