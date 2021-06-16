<template>
<div class="c-fullscreen-player">
  <div class="c-fullscreen-player__wrapper" :style="{'background-image': `url(${songDetail?.al?.picUrl})`}">
    <div class="c-fullscreen-player__mask"></div>
    <div class="c-fullscreen-player__container">
      <div class="c-fullscreen-player__scroll">
        <div v-if="showOptions[0].flag" class="c-fullscreen-player__lyric" v-scroll ref="lyricRef">
          <div class="c-fullscreen-player__lyric__wrapper">
            <div class="c-fullscreen-player__lyric__item"
            :class="{active: index == currentRow}"
            ref="lyricItem"
            :key="item.time"
            v-for="(item, index) in lyricArr">{{item.text}}</div>
          </div>
        </div>
        <div v-else  class="c-fullscreen-player__mv">mv</div>
      </div>
    </div>
    <div class="c-fullscreen-player__tabs" @click="switchTabs">
      <div class="c-fullscreen-player__tabs__wrapper">
        <div class="c-fullscreen-player__tabs__item" :class="{active: item.flag}" v-for="(item, index) in showOptions" :key="item.name" :data-index="index">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {ref, computed, onUnmounted, nextTick} from "vue";
import {useStore} from "vuex";
import {parseLyric} from "@/utils/utils.js";
export default {
  setup(props, context) {
    let showOptions = ref([
      {name: "歌词写真", flag: true},
      {name: "MV", flag: false}
    ]);
    let store = useStore();
    let lyricDetail = computed(() => store.state.player.currentPlayLyric);
    let mvDetail = computed(() => store.state.player.currentPlayMv);
    let songDetail = computed(() => store.state.player.currentPlayDetail);
    let lyricArr = ref(parseLyric(lyricDetail.value.lyric));
    let lyricRef = ref(null);
    let lyricItem = ref(null);
    // 用来记录当前正在第几句歌词
    let currentRow = ref(0);
    // 获取全局唯一的audio元素
    let audio = document.getElementById("audio");
    // 计算当前是第几行
    let calcCurrentRow = function() {
      let {currentTime} = audio;
      for(let i = 0; i < lyricArr.value.length; i++) {
        if(currentTime < lyricArr.value[0].time) {
          currentRow.value = 0;
          break;
        } 
        if(i == (lyricArr.value.length - 1)) {
          currentRow.value = i;
          break;
        }
        if(currentTime >= lyricArr.value[i].time && currentTime <= lyricArr.value[i+1].time){
          currentRow.value = i;
          break;
        }
      }
      nextTick(() => {
        lyricRef.value.scrollTop = currentRow.value * lyricItem.value.clientHeight;
      });
    };
    calcCurrentRow();

    let switchTabs = function(e) {
      let index = e?.target?.dataset?.index;
      if(index == undefined) return;
      for(let item of showOptions.value) {
        if(item.flag) {
          item.flag = false;
          break;
        }
      }
      showOptions.value[index].flag = true;
    }
    console.log(lyricArr.value);
    // 歌曲播放进度变化事件回调
    let onTimeupdate = function(e) {
      let {currentTime, duration} = audio;
      // console.log(lyricItem.value.innerText);
      console.log(currentRow.value, currentTime);
      let cur = lyricArr.value[currentRow.value]?.time;
      let next = lyricArr.value[currentRow.value+1]?.time;
      let nnext = lyricArr.value[currentRow.value+2]?.time;
      let flag = cur && next && nnext;
      if(flag && currentTime >= next && currentTime <= nnext) {
        currentRow.value += 1;
        lyricRef.value.scrollTop = currentRow.value * lyricItem.value.clientHeight;
      } else if(flag && currentTime >= cur && currentTime < next) {
        return;
      } else if(currentTime == duration) {
        currentRow.value = lyricArr.value.length - 1;
      } else {
        calcCurrentRow();
      }
    }
    audio.addEventListener("timeupdate", onTimeupdate);

    // 组件销毁时回收资源
    onUnmounted(() => {
      audio.removeEventListener("timeupdate", onTimeupdate);
    });
    
    return {
      lyricDetail,
      songDetail,
      mvDetail,
      showOptions,
      switchTabs,
      lyricArr,
      lyricRef,
      lyricItem,
      currentRow
    }
  }
}
</script>
<style lang="scss" scoped>
.c-fullscreen-player {
  width: 100%;
  height: 100%;
  background-color: #FFF;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 2000;
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    animation-name: bg-emerge-gradually;
    animation-duration: 1s;
  }
  &__mask {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: linear-gradient(167.96deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.03) 100%);
    box-shadow: inset -5px -5px 10px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
  }
  &__container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__tabs {
    width: 174px;
    height: calc(100% - 60px);
    position: absolute;
    left: 0px;
    top: 0px;
    overflow: hidden;
    &:hover {
      .c-fullscreen-player__tabs__wrapper {
        left: 0px;
        transition-delay: 0s;
      }
    }
    &__wrapper {
      width: 100%;
      padding: 10px 0px;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: -100%;
      top: 50%;
      margin-top: -30px;
      transition: left 0.3s ease 3s;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      transform: translateY(-50%);
      color: #FFF;
      font-size: 14px;
    }
    &__item {
      height: 40px;
      padding-left: 30px;
      line-height: 40px;
      cursor: pointer;
      &.active,
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  &__scroll {
    height: calc(100% - 60px);
    position: relative;
  }
  &__lyric {
    height:100%;
    overflow-y: scroll;
    color: #FFF;
    font-size: 16px;
    box-sizing: border-box;
    padding: 20% 0px;
    &__item {
      &.active {
        color: rgb(255, 210, 0);
      }
      line-height: 40px;
      height: 40px;
      text-align: center;
    }
  }
}
</style>