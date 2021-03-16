<template>
<div class="c-option-box">
  <div class="c-option-box__wrapper">
    <div class="c-option-box__item" 
    v-for="(item, index) in options.list" :key="item.text"
    :style="`${getItemStyle}`"
    :class="{active: options.currentMode == index}"
    @click="onSetCurrentOptions(index)">
      <slot name="icon" :icon="item.icon"></slot>
      <div class="c-option-box__text flex-center">{{item.text}}</div>
      <slot name="status" :status="item.status"></slot>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {computed, toRefs} from "vue";
import {throttle, reduce} from "@/utils/utils.js";
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    itemStyle: {
      type: Object,
      default: () => {
        return {
          width: "120px",
          height: "40px"
        };
      }
    }
  },
  emits: {
    "onSetCurrentOptions": paload => {
      return true;
    }
  },
  setup(props, context) {
    let {itemStyle} = toRefs(props);
    let {emit} = context;
    let getItemStyle = computed(reduce(itemStyle));

    let onSetCurrentOptions = function(index) {
      emit("onSetCurrentOptions", index);
    }
    return {
      getItemStyle,
      onSetCurrentOptions
    }
  }
}
</script>
<style lang="scss" scoped>
.c-option-box {
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  padding: 6px 0px;
  &__item {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &.active,
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  &__text {
    flex: 1 1 0;
    font-size: $font-size-s;
    color: $color-font-black;
  }
}
</style>