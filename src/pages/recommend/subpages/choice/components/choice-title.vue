<template>
<div class="c-choice-title">
  <div class="c-choice-title__title">{{title}}</div>
  <div class="c-choice-title__more">
    <slot>
      <span @click="$attrs.onclick">更多<i class="iconfont iconyou"></i></span>
    </slot>
  </div>
</div>
</template>

<script type="text/javascript">
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
  }
}
</script>
<style lang="scss" scoped>
.c-choice-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  &__title {
    font-size: $font-size-m;
  }
  &__more {
    font-size: $font-size-xs;
    color: $color-font-gray;
    cursor: pointer;
    .iconfont {
      color: $color-font-gray;
    }
  }
}
</style>