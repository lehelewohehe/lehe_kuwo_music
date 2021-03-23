<template>
<div class="c-tabbar">
  <div class="c-tabbar__wrapper" :style="`padding: 0px ${bothSides};`">
    <div class="c-tabbar__item flex-center"
    :class="{active: item.active}"
    v-for="(item, index) in list" 
    :key="item.name + index" 
    :style="`${getTextStyle} ${item.active && getActiveStyle}`"
    @click="onSetCurrentIndex(index)">
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
  emits: {
    "update:list": payload => {
      console.log(payload, "update:list");
      return true;
    }
  },
  setup(props, context) {
    let {textStyle, activeStyle, list} = toRefs(props);
    let getTextStyle = computed(reduce(textStyle));
    let getActiveStyle = computed(reduce(activeStyle));
    let {emit} = context;

    let setCurrentIndex = function(list, index) {
      list.some((item) => {
        if(item.active) {
          item.active = false;
          return true;
        }
      });
      list[index].active = true;
    }
    let onSetCurrentIndex = function(index) {
      let _list = JSON.parse(JSON.stringify(list.value));
      setCurrentIndex(_list, index)
      emit("update:list", _list);
    }

    return {
      getTextStyle,
      getActiveStyle,
      onSetCurrentIndex
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
    box-sizing: border-box;
  }
  &__item {
    position: relative;
    cursor: pointer;
    &.active {
      &::after {
        content: "";
        width: 24px;
        height: 4px;
        background-color: $color-main;
        position: absolute;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
      }
    }
  }
}
</style>