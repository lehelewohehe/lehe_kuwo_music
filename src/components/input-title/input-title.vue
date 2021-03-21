<template>
<div class="c-input-title">
  <div class="c-input-title__name">{{name}}</div>
  <div class="c-input-title__tip" :class="{active: isTip}">{{tip}}</div>
</div>
</template>

<script type="text/javascript">
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    tip: {
      type: String,
      default: ""
    },
    isTip: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {

  }
}
</script>
<style lang="scss" scoped>
.c-input-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__name {
    font-size: $font-size-s;
  }
  &__tip {
    font-size: $font-size-xs;
    color: rgba(255, 0, 0, 0);
    transition: color 0.5s ease;
    &.active {
      color: rgba(255, 0, 0, 1);
    }
  }
}
</style>