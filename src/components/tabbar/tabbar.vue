<template>
<div class="c-tabbar">
  <div class="c-tabbar__wrapper" :style="`padding: 0px ${bothSides};`">
    <div class="c-tabbar__item flex-center"
    :class="{active: item.active}"
    v-for="(item, index) in list" 
    :key="item.name + index" 
    :style="`getTextStyle ${item.active && getActiveStyle}`"
    @click="onSetCurrentIndex">
      {{item.name}}
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {reduce} from "@/utils/utils.js";
import {toRefs, computed} from "vue";
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    textStyle: {
      type: Object,
      default: () => {
        return {
          "font-size": "16px",
          color: "#323232",
          height: '40px',
          padding: "0px 4px"
        }
      }
    },
    activeStyle: {
      type: Object,
      default: () => {
        return {
          "font-weight": "bold",
          color: "#000"
        }
      }
    },
    bothSides: {
      type: String,
      default: "0px"
    }
  },
  setup(props, context) {
    let {textStyle, activeStyle} = toRefs(props);
    let getTextStyle = computed(reduce(textStyle));
    let getActiveStyle = computed(reduce(activeStyle));
    let {emit} = context;
    let onSetCurrentIndex = function() {
      emit("onSetCurrentIndex", index);
    }
    return {
      getTextStyle,
      getActiveStyle
    }
  }
}
</script>
<style lang="scss" scoped>
.c-tabbar {
  width: 100%;
  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__item {
    position: relative;
    &.active {
      &::after {
        content: "";
        width: 20px;
        height: 6px;
        background-color: $color-main;
        position: absolute;
        left: 0px;
        bottom: 0px;
        transform: translateX(-50%);
      }
    }
  }
}
</style>