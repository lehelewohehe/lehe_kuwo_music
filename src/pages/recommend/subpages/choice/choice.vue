<template>
<div class="p-choice">
  <div class="p-choice__banner">
    <c-swiper :banner="bannerList"></c-swiper>
  </div>
  <c-choice-title title="个性推荐"></c-choice-title>
  <div class="p-choice__singer">
    <div class="p-choice__singer__item" 
    v-for="item in songLists" :key="item.id">
      <c-goods-box :avatar="item.picUrl" 
      :title="item.name" 
      :supplement="item.playCount" 
      maskIconPos="right-bottom"></c-goods-box>
    </div>
  </div>
  <c-choice-title title="推荐电台"></c-choice-title>
  <div class="p-choice__radio-station">
    <div class="p-choice__radio-station__item" 
    v-for="item in radioStations.slice(0,5)" :key="item.id">
      <c-goods-box :avatar="item.picUrl" 
      :supplement="item.playCount" 
      :title="item.name"></c-goods-box>
    </div>
  </div>
  <c-choice-title title="最潮视频"></c-choice-title>
  <div class="p-choice__mv">
    <div class="p-choice__mv__item" 
    v-for="item in newMvs.slice(0,4)" :key="item.key">
      <c-goods-box :avatar="item.cover" 
      :supplement="item.playCount" 
      :title="item.name"
      :aspectRatio="1.8"
      maskIconPos="right-bottom"></c-goods-box>
    </div>
  </div>
  <c-choice-title title="新碟上架"></c-choice-title>
  <div class="p-choice__new-disc">
    新碟上架
  </div>
  <c-choice-title title="音乐周边"></c-choice-title>
  <div class="p-choice__singer">
    音乐周边
  </div>

</div>
</template>

<script type="text/javascript">
import {
  getNewMv,
  getBanner,
  getRecommendSongList,
  getRecommendSongs,
  getRecommendRadioStation
} from "@/request/index.js";
import {ref} from "vue";
import {mapGetters, useStore} from "vuex";
import CChoiceTitle from "@/pages/recommend/subpages/choice/components/choice-title.vue";
export default {
  components: {
    CChoiceTitle
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  setup(props, context) {
    let bannerList = ref([]);
    let songLists = ref([]);
    let radioStations = ref([]);
    let newMvs = ref([]);
    let store = useStore();
    getBanner().then(data => {
      let {banners=[]} = data;
      bannerList.value = banners;
    });
    getRecommendSongList().then(data => {
      let {result} = data;
      console.log(result)
      songLists.value = result.map((item) => {
        let count = Math.floor(item.playCount / 10000);
        item.playCount = `<i class="iconfont iconicon--"></i>${count ? `${count}万` : item.playCount}`;
        return item;
      });
    });
    getRecommendRadioStation().then(data => {
      let {result} = data;
      radioStations.value = result.map((item) => {
        let playCount = item?.program?.adjustedPlayCount;
        let count = Math.floor(playCount / 10000);
        item.playCount = `<i class="iconfont iconicon--"></i>${count ? `${count}万` : playCount}`;
        return item;
      });
    });
    getNewMv().then(data => {
      newMvs.value = data.data.map((item) => {
        let count = Math.floor(item.playCount / 10000);
        item.playCount = `<i class="iconfont iconshangchuanshipin" style="margin-right: 2px">
        </i>${count ? `${count}万` : item.playCount}`;
        return item;
      });
      console.log(data, 8);
    });
    return {
      bannerList,
      songLists,
      radioStations,
      newMvs
    };
  }
}
</script>
<style lang="scss" scoped>
.p-choice {
  &__banner {
    margin-bottom: 24px;
  }
  &__banner,
  &__singer,
  &__radio-station,
  &__new-disc,
  &__mv {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &__singer,
  &__radio-station {
    &__item {
      flex: 18.4% 0 0;
      margin-bottom: 20px;
    }
  }
  &__mv {
    &__item {
      flex: 23.5% 0 0;
      margin-bottom: 20px;
    }
  }
}
</style>