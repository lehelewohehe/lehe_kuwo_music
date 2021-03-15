<template>
<div class="c-player">
  <div class="c-player__control">
    <div class="c-player__pre">
      <i class="iconfont iconshangyiqu"></i>
    </div>
    <div class="c-player__switch">
      <i class="iconfont iconbofang"></i>
    </div>
    <div class="c-player__next">
      <i class="iconfont iconxiayiqu"></i>
    </div>
  </div>
  <div class="c-player__info">
    <div class="c-player__cover" :style="{'background-image': `url(${avatar})`}">
    </div>
    <div class="c-player__progress">
      <c-progress v-model:percent="percent" vertical></c-progress>
      <!-- <div class="c-player__singer-info"></div>
      <div class="c-player__progressbar"></div> -->
    </div>
  </div>
  <div class="c-player__relevant">
    <div class="c-player__speed">
      1.0 X
    </div>
    <div class="c-player__mode">
      <i class="iconfont iconxunhuanbofang"></i>
    </div>
    <div class="c-player__voice-control">
      <i class="iconfont iconVoice"></i>
    </div>
    <div class="c-player__comment">
      <i class="iconfont iconpinglun"></i>
    </div>
    <div class="c-player__lyric">
      <i class="iconfont iconci"></i>
    </div>
    <div class="c-player__collect">
      <i class="iconfont iconshoucang"></i>
    </div>
    <div class="c-player__download">
      <i class="iconfont iconxiazai"></i>
    </div>
    <div class="c-player__playlist">
      <i class="iconfont icongedan"></i>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import avatar from "@/assets/imgs/global_bg_01.jpg";
export default {
  data() {
    return {
      avatar,
      percent: 0
    }
  },
  created(){

  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.c-player {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  height: 100%;
  color: $color-font-white;
  &__control {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-main;
    padding: 0px 30px;
    box-sizing: border-box;
    .iconfont {
      font-size: 30px;
    }
  }
  &__switch {
    .iconfont {
      font-size: 40px;
    }
  }
  &__info {
    display: flex;
    justify-content: flex-start;
    width: 446px;
  }
  &__cover {
    width: 60px;
    height: 100%;
    background-size: cover;
    cursor: pointer;
  }
  &__progress {
    flex: 1 1 0;
  }
  &__relevant {
    flex: 1 1 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconfont {
      cursor: pointer;
      font-size: $font-size-l;
    }
  }
  &__speed {
    font-size: $font-size-s;
  }
}
</style>