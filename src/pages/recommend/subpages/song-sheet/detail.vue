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
        <c-button class="mr10" text="添加到" icon="icontianjia"></c-button>
        <c-button class="mr10" text="下载" icon="iconxiazai"></c-button>
        <c-button class="mr10" text="收藏" icon="iconicon_collect"></c-button>
        <c-button class="mr10" text="分享" icon="iconfenxiang"></c-button>
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
              <div @click="setCurrentPlaySong(scope.row)" class="text-ellipsis active-hover">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column width="200">
            <template #default="scope">
              <div class="flex flex-main-between flex-item-center p-detail__table__operator" style="width: 60px">
                <i class="iconfont icontianjia"></i>
                <i class="iconfont iconxiazai"></i>
                <i class="iconfont icongengduo"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column
          label="歌手"
          width="100">
            <template #default="scope">
              <div class="text-ellipsis active-hover">{{scope.row.ar.map(item => item.name).join("/")}}</div>
            </template>
          </el-table-column>
          <el-table-column
          width="100"
          label="专辑">
            <template #default="scope">
              <div class="text-ellipsis active-hover">{{scope.row.al.name}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">
        <el-tag
        v-if="!!replyParams.author"
        closable
        type="info"
        @close="closeTag">
        回复“{{replyParams.author}}”
        </el-tag>
        <el-input
          type="textarea"
          resize="none"
          :rows="5"
          placeholder="请输入内容"
          v-model="replyParams.content">
        </el-input>
        <div class="flex flex-main-end mt20 mb10">
          <c-button text="发表评论" bgColor="#ffd200" @click="sendComment"></c-button>
        </div>
        <el-card class="box-card" shadow="never" v-for="(item, index) in commentOptions">
          <template #header>
            <div class="card-header">
              <span>{{item.name}}</span>
            </div>
          </template>
          <div class="p-detail__comments">
            <div class="p-detail__comments__item flex" v-for="(item, index) in (index==0?hotComments:comments)" :key="item.commentId">
              <div class="p-detail__comments__left mr10">
                <el-avatar :size="40" :src="item?.user?.avatarUrl"></el-avatar>
              </div>
              <div class="p-detail__comments__right flex flex-column flex-fill">
                <div class="p-detail__comments__top flex flex-main-between flex-item-center">
                  <div class="p-detail__comments__info">
                    <div>{{item?.user?.nickname}}</div>
                    <div class="mt5" style="color: #a2a2a2;">
                      {{$dayjs(item.time).format('YYYY-MM-DD H:mm:ss')}}
                    </div>
                  </div>
                  <div class="p-detail__comments__operator flex flex-main-between flex-item-center">
                    <div class="flex flex-item-center">
                      <i class="iconfont icondianzan pointer mr5" 
                      :style="{color: item.liked?'rgb(255, 210, 0)':''}"
                      @click="toggleLike(item.commentId, item.liked, item)"></i>
                      <span>{{item.likedCount}}</span>
                    </div>
                    <span class="mlr20" style="display: inline-block;height: 20px;border: 1px solid #cacaca;box-sizing: border-box;"></span>
                    <span class="pointer" style="color: #a2a2a2;" @click="replyComment(item.commentId, item?.user?.nickname)">回复</span>
                  </div>
                </div>
                <div class="p-detail__comments__context mt10">{{item.content}}</div>
              </div>
            </div>
            <div class="p-detail__comments__more flex-center">
              <el-button round v-if="index==0">查看更多</el-button>
              <el-pagination
              v-else
              background
              layout="prev, pager, next"
              :page-size="pageParams.pageSize"
              v-model:current-page="pageParams.currentPage"
              :total="pageParams.total">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script type="text/javascript">
import { useRouter, useRoute } from 'vue-router';
import {toast} from "@/components/hook.js";
import {debounce} from "@/utils/utils.js";
import {
  getSongSheetDetail,
  getSongDetail, 
  getSongComments, 
  sendComments, 
  toggleLikeComment
} from "@/request/index.js";
import {ref, watch, reactive, nextTick} from "vue";
import {useStore} from "vuex";
export default {
  setup(props, context) {
    let activeName = ref('first');
    let textarea = ref("");
    let songSheetData = ref({});
    let comments = ref([]);
    let hotComments = ref([]);
    let commentOptions = ref([
        {name: "热评"},
        {name: "最新评论"}
      ])
    let pageParams = ref({
      total: 0,
      currentPage: 1,
      pageSize: 20
    });
    let replyParams = ref({
      commentId: null,
      content: "",
      author: ""
    });
    // 路由相关
    const router = useRouter();
    const route = useRoute();
    const songSheetId = route.params.id;

    // vuex相关
    const store = useStore();
    // 设置当前播放的歌曲
    let setCurrentPlaySong = function(currentPlayDetail) {
      console.log(store)
      return store.dispatch({
        type: "player/setCurrentPlay",
        currentPlayDetail
      });
    }

    // 获取歌单详情
    getSongSheetDetail(songSheetId).then(data => {
      songSheetData.value = data.playlist;
      let ids = data.playlist.trackIds.map(item => {
        return item.id
      }).join(",");
      getSongDetail(ids).then(res => {
        songSheetData.value.songs = res.songs;
      })
    });

    // 切换tab的变化回调
    let handleClick = function(tab, event) {
      // console.log(tab, event);
    }
    // 回复评论
    let replyComment = (function(id) {
      let anchor;
      return (id, nickname) =>{
        replyParams.value.commentId = id;
        replyParams.value.author = nickname;
        anchor = anchor ? anchor : document.getElementById("v-anchor");
        anchor.onclick();
      };
    })();
    // 发送评论
    let sendComment = function() {
      let {commentId, content} = replyParams.value;
      let t = commentId ? 2 : 1;
      sendComments({t, type: 2, id: songSheetId, content, commentId}).then(res => {
        toast({
          message: "评论成功!",
          icon: "iconzhuyi"
        });
        setTimeout(() =>{
          moreComments();
        }, 2000);
      });
    }
    // 移除当前回复的人
    let closeTag = function() {
      replyParams.value.author='';
      replyParams.value.commentId=null;
      console.log(replyParams);
    }
    // 切换是否点赞
    let toggleLike = debounce(function(cid, status, currentComment) {
      console.log(cid, status, currentComment);
      toggleLikeComment({cid, t: !status, type: 2, id: songSheetId}).then(res => {
        console.log(res);
        currentComment.liked = !status;
        currentComment.likedCount += status ? -1 : 1;
      });
    }, 1000);
    // 获取评论的方法封装
    let moreComments = (function() {
      let limit = 20,
          flag = true;
      return function() {
        if(flag) {
          flag = false;
          getSongComments({limit, offset: limit * (pageParams.value.currentPage - 1), id: songSheetId}).then(res => {
            pageParams.value.total = res.total;
            hotComments.value = res.hotComments ? res.hotComments : hotComments.value;
            comments.value = res.comments;
          }).finally(() => {
            flag = true;
          });
        }
      }
    })();
    // 监听分页页码的变化
    watch(()=>pageParams.value.currentPage, (val, preVal) => {
      moreComments();
    });
    moreComments();

    return {
      songSheetData,
      handleClick,
      activeName,
      textarea,
      comments,
      hotComments,
      moreComments,
      replyComment,
      sendComment,
      pageParams,
      replyParams,
      closeTag,
      commentOptions,
      toggleLike,
      setCurrentPlaySong
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
  &__table {
    &__operator {
      display: none;
      .iconfont {
        cursor: pointer;
      }
    }
    .el-table__row:hover {
      .p-detail__table__operator {
        display: flex;
      }
    }
  }
  &__comments {
    font-size: $font-size-s;
    &__item {
      padding-top: 14px;
    }
    &__right {
      border-bottom: 1px solid #EBEEF5;
      padding-bottom: 14px;
      overflow: hidden;
    }
    &__context {
      white-space:normal; 
      word-break:break-all;
    }
    &__more {
      padding: 14px;
    }
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
:deep() .el-card {
  border: none;
}
:deep() .el-card__header {
  padding: 10px 0px;
  font-size: $font-size-xl;
}
:deep() .el-card__body {
  padding: 0px;
}
:deep() .el-button.is-round {
  padding: 6px 12px;
  min-height: inherit;
}
</style>