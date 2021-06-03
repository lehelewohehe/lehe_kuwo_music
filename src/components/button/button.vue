<template>
<div class="c-button" :style="`background-color: ${bgColor}`">
  <div class="flex flex-main-between flex-item-center">
    <div class="c-button__icon mr5" v-if="!!icon">
      <i :class="`iconfont ${icon}`"></i>
    </div>
    <div class="c-button__text">{{text}}</div>
  </div>
</div>
</template>

<script type="text/javascript">
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
  }
}
</script>
<style lang="scss" scoped>
.c-button {
  display: inline-block;
  padding: 4px 10px;
  background-color: #FFF;
  border: 1px solid $color-bg-deep;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
</style>