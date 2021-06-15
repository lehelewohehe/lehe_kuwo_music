<template>
<div class="c-fullscreen-player">
  <div class="c-fullscreen-player__wrapper" :style="{'background-image': `url(${songDetail?.al?.picUrl})`}">
    <div class="c-fullscreen-player__mask"></div>
    <div class="c-fullscreen-player__container">
      <div class="c-fullscreen-player__tabs" @click="switchTabs">
        <div class="c-fullscreen-player__tabs__wrapper">
          <div class="c-fullscreen-player__tabs__item" :class="{active: item.flag}" v-for="(item, index) in showOptions" :key="item.name" :data-index="index">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {ref, computed} from "vue";
import {useStore} from "vuex";
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
    return {
      lyricDetail,
      songDetail,
      mvDetail,
      showOptions,
      switchTabs
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
    backdrop-filter: blur(50px);
  }
  &__container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__tabs {
    width: 174px;
    height: calc(100% - 60px;);
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
}
</style>