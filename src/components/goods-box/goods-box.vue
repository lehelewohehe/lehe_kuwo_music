<template>
<div class="c-goods-box">
  <div class="c-goods-box__wrapper" @click="goPage" :style="{padding: `${1/aspectRatio*50}% 0px`}">
    <div class="c-goods-box__img" :style="`background-image: url(${avatar})`"></div>
    <div class="c-goods-box__supplement" v-html="supplement"></div>
    <div class="c-goods-box__mask" :class="`${maskIconPos}`">
      <i class="iconfont" :class="`${maskIcon}`"></i>
    </div>
  </div>
  <div class="c-goods-box__desc">
    <div class="c-goods-box__title" v-if="title">{{title}}</div>
    <div class="c-goods-box__author" v-if="author">{{author}}</div>
  </div>
</div>
</template>

<script type="text/javascript">
export default {
  props: {
    avatar: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    maskIcon: {
      type: String,
      default: "iconbofang1"
    },
    maskIconPos: {
      type: String,
      default: "center"
    },
    supplement: {
      type: String,
      default: ""
    },
    aspectRatio: {
      type: Number,
      default: 1
    }
  },
  setup(props, context) {
    let {attrs} = context;

    let goPage = function() {
      attrs.onclick && attrs.onclick();
    }

    return {
      goPage
    }
  }
}
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-bottom {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.c-goods-box {
  width: 100%;
  &__wrapper {
    width: 100%;
    padding: 50% 0px;
    position: relative;
    cursor: pointer;
    &:hover  .c-goods-box__mask {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  &__img, 
  &__mask {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  &__img {
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }
  &__supplement {
    position: absolute;
    left: 3%;
    bottom: 3%;
    font-size: 10px;
    color: #FFF;
    display: flex;
    align-items: center;
  }
  &__mask {
    display: flex;
    opacity: 0;
    padding: 4%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.5s ease;
    .iconfont {
      font-size: 36px;
      color: #FFF;
    }
  }
  &__title {
    color: $color-font-main;
    font-size: $font-size-xs;
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    word-break:break-all;
  }
  &__author {
    color: $color-font-gray;
    font-size: 10px;
  }
}
</style>