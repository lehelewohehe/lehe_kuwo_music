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
      <div class="c-player__singer-info">
        <div class="c-player__singer-info__name">Promise</div>
        <div class="c-player__singer-info__right">
          <div class="c-player__singer-info__time">
            <div class="c-player__singer-info__now">{{signerPercent}}</div>
            <span style="margin: 0px 2px;">/</span>
            <div class="c-player__singer-info__all">3:40</div>
          </div>
          <div class="c-player__singer-info__quality" @click="onChangeQuality">
            <span>{{quality.list[quality.currentIndex].text.substr(0, 2)}}</span>
            <i class="iconfont iconshang"></i>
            <c-option-box class="c-player__singer-info__box" 
            v-show="quality.isQuality"
            @onSetCurrentOptions="(index) => {quality.currentIndex=index}"
            :options="quality" :itemStyle="{width: `200px`,height: `40px`}">
              <template #icon="{icon}">
                <div class="c-player__singer-info__icon flex-center">
                  <i :class="`iconfont ${icon}`"></i>
                </div>
              </template>
              <template #status="{status, index}">
                <div class="c-player__singer-info__status flex-center">
                  <i :class="`iconfont ${quality.currentIndex == index ? 'iconduigou' : ''}`"></i>
                </div>
              </template>
            </c-option-box>
          </div>
        </div>
      </div>
      <div class="c-player__progressbar">
        <c-progress v-model:percent="signerPercent"></c-progress>
      </div>
    </div>
  </div>
  <div class="c-player__relevant">
    <div class="c-player__speed flex-center">
      <span>1.0 X</span>
    </div>
    <div class="c-player__mode flex-center" @click="onChangeMode">
      <i :class="`iconfont ${mode.list[mode.currentIndex].icon}`"></i>
      <c-option-box @onSetCurrentOptions="(index) => {mode.currentIndex=index}" 
        v-show="mode.isMode" class="c-player__mode__box" :options="mode">
        <template #icon="{icon}">
          <div class="c-player__mode__icon flex-center">
            <i :class="`iconfont ${icon}`"></i>
          </div>
        </template>
        <template #status="{status}">
          <div class="c-player__mode__status flex-center" v-if="status">
            <i :class="`iconfont ${status}`"></i>
          </div>
        </template>
      </c-option-box>
    </div>
    <div class="c-player__voice-control flex-center">
      <i class="iconfont iconVoice"></i>
      <div class="c-player__voice-control__box">
        <c-progress class="c-player__voice-control__progress" 
        v-model:percent="voicePercent" vertical></c-progress>
      </div>
    </div>
    <div class="c-player__comment flex-center">
      <i class="iconfont iconpinglun"></i>
    </div>
    <div class="c-player__lyric flex-center">
      <i class="iconfont iconci"></i>
    </div>
    <div class="c-player__collect flex-center">
      <i class="iconfont"
      @click="onChangeCollect"
      :class="`${isCollect ? 'iconshoucang' : 'iconicon_collect'}`"></i>
    </div>
    <div class="c-player__download flex-center">
      <i class="iconfont iconxiazai"></i>
    </div>
    <div class="c-player__playlist flex-center">
      <i class="iconfont icongedan"></i>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import avatarImg from "@/assets/imgs/global_bg_01.jpg";
import {ref, getCurrentInstance} from "vue";
export default {
  setup(props, context) {
    let avatar = ref(avatarImg);
    let isCollect = ref(false);
    // 歌曲播放进度条百分比
    let signerPercent = ref(0);
    // 声音控制进度条百分比
    let voicePercent = ref(0);
    let {ctx} = getCurrentInstance();
    

    // 歌曲播放模式数据管理对象
    let mode = ref({
      list: [
        {icon: "icondanqubofang", text: "单曲播放", status: ""},
        {icon: "icondanquxunhuan", text: "单曲循环", status: ""},
        {icon: "iconzu4163", text: "顺序播放", status: ""},
        {icon: "iconxunhuanbofang", text: "循环播放", status: ""},
        {icon: "iconsuijibofang", text: "随机播放", status: ""}
      ],
      currentIndex: 0,
      isMode: false
    });

    // 歌曲质量切换数据管理对象
    let quality = ref({
      list: [
        {icon: "icondanqubofang", text: "无损音质", status: ""},
        {icon: "", text: "超品音质-320K", status: ""},
        {icon: "", text: "高品音质-128K", status: ""},
        {icon: "", text: "流畅音质-WMA", status: ""},
      ],
      currentIndex: 0,
      isQuality: false
    });

    // 用于本地切换歌曲是否被收藏状态
    let onChangeCollect = function() {
      isCollect.value = !isCollect.value;
      if(isCollect.value) {
        ctx.$toast({
          message: "成功加入歌曲至'我的收藏'!",
          icon: "iconzhuyi"
        })
      }
    }

    // 切换模式选项盒子
    let onChangeMode = function() {
      mode.value.isMode = !mode.value.isMode;
    }

    // 切换歌曲质量选项盒子
    let onChangeQuality = function() {
      quality.value.isQuality = !quality.value.isQuality;
    }

    return {
      avatar,
      signerPercent,
      voicePercent,
      isCollect,
      onChangeCollect,
      onChangeMode,
      mode,
      onChangeQuality,
      quality
    }
  }
}
</script>
<style lang="scss" scoped>
.c-player {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  height: 100%;
  color: $color-font-gray;
  user-select: none;
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
      cursor: pointer;
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
    padding: 18px 16px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: $font-size-xs;
  }
  &__singer-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__time,
    &__right,
    &__quality {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__time {
      margin-right: 18px;
    }
    &__quality {
      position: relative;
      user-select: none;
      margin-right: 4px;
      cursor: pointer;
      transition: color 0.5s ease;
      &:hover {
        color: white;
      }
      .iconfont {
        font-size: $font-size-l;
      }
    }
    &__icon,
    &__status {
      width: 30px;
      height: 40px;
      color: $color-font-black;
    }
    /deep/ .c-player__singer-info__box {
      position: absolute;
      left: 0px;
      top: -18px;
      transform: translate(-50%, -100%);
      background-color: #FFF;
    }
  }
  &__relevant {
    flex: 1 1 0;
    display: flex;
    justify-content: space-around;
    .iconfont {
      cursor: pointer;
      font-size: $font-size-l;
    }
  }
  &__speed,
  &__mode,
  &__voice-control,
  &__comment,
  &__lyric,
  &__download,
  &__playlist {
    transition: color 0.3s ease;
    &:hover {
      > .iconfont {
        color: #FFF;
      }
    } 
  }
  &__voice-control {
    position: relative;
    &__box {
      display: none;
      position: absolute;
      top: 0%;
      left: 50%;
      padding: 16px;
      height: 100px;
      background-color: #FFF;
      box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
      transform-origin: center;
      transform: translate(-50%, -100%);
    }
    /deep/ .c-player__voice-control__progress {
      width: 100px;
      position: absolute;
      bottom: 14px;
    }
    &:hover {
      .c-player__voice-control__box {
        display: block;
      }
    }
  }

  &__collect {
    .iconshoucang {
      color: red;
    }
  }
  &__speed {
    font-size: $font-size-xs;
    span {
      cursor: pointer;
    }
  }
  &__mode {
    position: relative;
    user-select:none;
    &__icon,
    &__status {
      width: 30px;
      height: 40px;
      color: $color-font-black;
    }
    /deep/ .c-player__mode__box {
      background-color: #FFF;
      position: absolute;
      left: 0px;
      top: 0px;
      transform: translate(-50%, -100%);
    }
  }
}
</style>