<template>
<div class="p-choice">
  <div class="p-choice__banner">
    <c-swiper :banner="bannerList" v-loading="!bannerList.length"></c-swiper>
  </div>
  <c-choice-title title="个性推荐"></c-choice-title>
  <div class="p-choice__singer" v-loading="!songLists.length">
    <div class="p-choice__singer__item" 
    v-for="item in songLists" :key="item.id">
      <c-goods-box :avatar="item.picUrl" 
      :title="item.name" 
      :supplement="item.playCount" 
      maskIconPos="right-bottom"></c-goods-box>
    </div>
  </div>
  <c-choice-title title="推荐电台"></c-choice-title>
  <div class="p-choice__radio-station" v-loading="!radioStations.length">
    <div class="p-choice__radio-station__item" 
    v-for="item in radioStations" :key="item.id">
      <c-goods-box :avatar="item.picUrl" 
      :supplement="item.playCount" 
      :title="item.name"></c-goods-box>
    </div>
  </div>
  <c-choice-title title="最潮视频"></c-choice-title>
  <div class="p-choice__mv" v-loading="!newMvs.length">
    <div class="p-choice__mv__item" 
    v-for="item in newMvs" :key="item.id">
      <c-goods-box :avatar="item.cover" 
      :supplement="item.playCount" 
      :title="item.name"
      :aspectRatio="1.8"
      maskIconPos="right-bottom"></c-goods-box>
    </div>
  </div>
  <c-choice-title title="新碟上架"></c-choice-title>
  <div class="p-choice__new-disc" v-loading="!newDiscs.length">
    <div class="p-choice__new-disc__item" 
    v-for="item in newDiscs" :key="item.id">
      <c-goods-box :avatar="item.blurPicUrl" 
      :supplement="item.publishTime" 
      :title="item.name"
      :author="item.author"
      maskIconPos="right-bottom"></c-goods-box>
    </div>
  </div>
  <!-- <c-choice-title title="音乐周边"></c-choice-title>
  <div class="p-choice__singer">
    音乐周边
  </div> -->

</div>
</template>

<script type="text/javascript">
import {
  getNewMv,
  getBanner,
  getNewDisc,
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
    let newDiscs = ref([]);
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
      radioStations.value = result.slice(0, 5).map((item) => {
        let playCount = item?.program?.adjustedPlayCount;
        let count = Math.floor(playCount / 10000);
        item.playCount = `<i class="iconfont iconicon--"></i>${count ? `${count}万` : playCount}`;
        return item;
      });
    });
    getNewMv().then(data => {
      newMvs.value = data.data.slice(0, 4).map((item) => {
        let count = Math.floor(item.playCount / 10000);
        item.playCount = `<i class="iconfont iconshangchuanshipin" style="margin-right: 2px">
        </i>${count ? `${count}万` : item.playCount}`;
        return item;
      });
    });
    getNewDisc().then(data => {
      let {weekData} = data;
      newDiscs.value = weekData.slice(0, 5).map((item) => {
        item.publishTime = new Date(item.publishTime).toLocaleDateString();
        item.author = item.artists.map(item => {
          return item.name;
        }).join("/");
        return item;
      });
    });
    return {
      bannerList,
      songLists,
      radioStations,
      newMvs,
      newDiscs
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
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &__singer,
  &__radio-station,
  &__new-disc {
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