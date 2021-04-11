<template>
<div class="p-detail" v-loading="!songSheetData.name">
  <div class="p-detail__hd">
    <div class="p-detail__cover">
      <c-avatar :src="songSheetData.coverImgUrl" fillet="3%"></c-avatar>
    </div>
    <div class="p-detail__desc ml20 flex-fill flex flex-column flex-main-start">
      <div class="p-detail__title">
        <div class=" text-ellipsis" style="position: absolute;width: 100%;">{{songSheetData.name}}</div>
      </div>
      <div class="p-detail__author mt10">
        <div class="p-detail__avatar flex flex-main-start flex-item-center">
          <c-avatar class="mr10" :src="songSheetData?.creator?.avatarUrl" size="30px"></c-avatar>
          <div class="p-detail__nickname">{{songSheetData?.creator?.nickname}}</div>
        </div>
      </div>
      <div class="p-detail__tag mt10">
        <span v-for="item in songSheetData.tags" :key="item" class="mr5">
          {{item}}
        </span>
      </div>
      <div class="p-detail__operation mt10">
        <c-button class="mr10" text="播放全部" icon="iconbofang1" bgColor="#ffd200"></c-button>
        <c-button class="mr10" text="添加到" icon="iconicon_collect"></c-button>
        <c-button class="mr10" text="下载" icon="iconxiazai"></c-button>
        <c-button class="mr10" text="收藏" icon="iconicon_collect"></c-button>
        <c-button class="mr10" text="分享" icon="iconicon_collect"></c-button>
      </div>
      <div class="p-detail__text textOVerTwo-ellipsis mt10">{{songSheetData.description}}</div>
    </div> 
  </div>
  <div class="p-detail__table">
    
  </div>
</div>
</template>

<script type="text/javascript">
import { useRouter, useRoute } from 'vue-router';
import {getSongSheetDetail} from "@/request/index.js";
import {ref} from "vue";
export default {
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    let songSheetData = ref({});
    console.log(route);

    getSongSheetDetail(route.params.id).then(data => {
      console.log(data);
      songSheetData.value = data.playlist;
    });

    return {
      songSheetData
    }
  }
}
</script>
<style lang="scss" scoped>
.p-detail {
  &__hd {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-xs;
  }
  &__title {
    font-size: 30px;
    font-weight: bold;
    position: relative;
    width: 100%;
    height: 36px;
  }
  &__cover {
    width: 180px;
    height: 180px;
  }
}
</style>