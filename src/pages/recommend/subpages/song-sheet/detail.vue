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
          #{{item}}
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
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌单" name="first">
        <el-table
        :data="songSheetData.songs"
        header-row-class-name="color-font-gray"
        style="width: 100%">
          <el-table-column
          :label="String(songSheetData?.songs?.length)"
          width="60">
            <template #default="scope">
              <div class="color-font-gray">{{scope.$index + 1}}</div>
            </template>
          </el-table-column>
          <el-table-column
          prop="name"
          label="歌名">
            <template #default="scope">
              <div class="text-ellipsis">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column
          label="歌手"
          width="100">
            <template #default="scope">
              <div class="text-ellipsis">{{scope.row.ar.map(item => item.name).join("/")}}</div>
            </template>
          </el-table-column>
          <el-table-column
          width="100"
          label="专辑">
            <template #default="scope">
              <div class="text-ellipsis">{{scope.row.al.name}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">评论</el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script type="text/javascript">
import { useRouter, useRoute } from 'vue-router';
import {getSongSheetDetail,getSongDetail} from "@/request/index.js";
import {ref} from "vue";
export default {
  setup(props, context) {
    let activeName = ref('first');
    let songSheetData = ref({});
    const router = useRouter();
    const route = useRoute();
    console.log(route);

    getSongSheetDetail(route.params.id).then(data => {
      songSheetData.value = data.playlist;
      let ids = data.playlist.trackIds.map(item => {
        return item.id
      }).join(",");
      getSongDetail(ids).then(res => {
        songSheetData.value.songs = res.songs;
      })
    });

    let handleClick = function(tab, event) {
      console.log(tab, event);
    }

    return {
      songSheetData,
      handleClick,
      activeName,
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
    background-color: $color-bg-shallow;
    padding: 20px 30px;
    margin-left: -30px;
    margin-right: -30px;
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
:deep() .el-tabs__nav-wrap::after {
  background-color: transparent;
}
:deep() .el-table {
  font-size: $font-size-xs;
  color: $color-font-main;
  .el-tabs__header {
    margin-bottom: 0px;
    color: $color-font-gray;
  }
  .has-gutter {
    th,tr {
      background-color: transparent;
    }
    background-color: $color-bg-middle !important;
  }
  td, th {
    padding: 10px 0px;
  }
}
</style>