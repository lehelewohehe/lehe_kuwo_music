<template>
<div class="c-radio">
  <div class="c-radio__box flex-center" @click="onSwitch">
    <i class="iconfont iconduigou" v-if="value"></i>
  </div>
  <div class="c-radio__text">
    <slot></slot>
  </div>
</div>
</template>

<script type="text/javascript">
import {toRefs} from "vue";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "update:value": payload => {
      console.log("update:value", payload);
      return true;
    }
  },
  setup(props, context) {
    let {emit} = context;
    let {value} = toRefs(props);
    let onSwitch = function() {
      emit("update:value", !value.value);
    }

    return {
      onSwitch
    }
  }
}
</script>
<style lang="scss" scoped>
.c-radio {
  display: flex;
  justify-content: flex-start;
  &__box {
    width: 14px;
    height: 14px;
    border: 1px solid #000;
    box-sizing: border-box;
    margin-right: 6px;
    cursor: pointer;
    .iconfont {
      color: $color-font-main;
      font-size: $font-size-s;
      font-weight: bold;
    }
  }
  &__text {
    color: $color-font-main;
    font-size: $font-size-xs;
  }
}
</style>