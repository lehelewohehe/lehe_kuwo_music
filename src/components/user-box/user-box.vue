<template>
<div class="c-user-box box-shadow" :style="$attrs.style" @click.stop>
  <div class="c-user-box__wrapper">
    <div class="c-user-box__hd">
      <c-avatar :src="profile.avatarUrl" size="40px"></c-avatar>
      <div class="c-user-box__nickname">{{profile.nickname}}</div>
    </div>
    <div class="c-user-box__list">
      <div class="c-user-box__item" v-for="(item, index) in list" 
      @click="$attrs.onClick(item.icon)">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {mapState} from "vuex";
export default {
  inheritAttrs: false,
  computed: {
    ...mapState({
      profile: state => state.user.profile
    })
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup(props, context) {
  }
}
</script>
<style lang="scss" scoped>
.c-user-box {
  width: 246px;
  height: 290px;
  background-color: #FFF;
  color: $color-font-main;
  &__wrapper {
    width: 100%;
    height: 100%;
  }
  &__hd {
    height: 70px;
    margin: 0px 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $color-bg-deep;
    box-sizing: border-box;
    cursor: default;
  }
  &__nickname {
    margin-left: 6px;
  }
  &__list {
    padding: 4px 0px;
  }
  &__item {
    height: 42px;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $color-font-deepgray;
    .iconfont {
      margin-right: 10px;
      font-size: $font-size-l;
    }
    &:hover {
      background-color: $color-bg-middle;
    }
  }
}
</style>