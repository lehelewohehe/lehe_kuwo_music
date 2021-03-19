<template>
<div class="c-input">
  <div class="c-input__wrapper" :style="`background-color: ${bgColor};`">
    <slot name="icon">
      <div class="c-input__icon flex-center">
        <i :class="`iconfont ${icon}`"></i>
      </div>
    </slot>
    <div class="c-input__input">
      <input :type="type" @input="onInput" :style="`background-color: ${bgColor};${getInputStyle};`">
    </div>
    <slot name="button"></slot>
  </div>
</div>
</template>

<script type="text/javascript">
import {reduce} from "@/utils/utils.js";
import {computed, toRefs} from "vue";
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    inputStyle: {
      type: Object,
      default: {}
    },
    bgColor: {
      type: String,
      default: "#f4f4f4"
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  emits: {
    "update:value": paload => {
      console.log(paload, "update:value");
      return true;
    }
  },
  setup(props, context) {
    let {inputStyle} = toRefs(props);
    let {emit} = context;

    // 假如传入了该prop，则传进来的样式与默认的合并，传进来的覆盖默认的
    let getInputStyle = computed(reduce(Object.assign({
        width: "100%",
        height: "40px",
        "font-size": "14px",
        color: "#323232"
      }, inputStyle.value)));

    let onInput = function(e) {
      emit("update:value", e.target.value);
    }

    return {
      onInput,
      getInputStyle
    }
  }
}
</script>
<style lang="scss" scoped>
.c-input {
  width: 100%;
  background-color: $color-bg-shallow;
  border-radius: 2px;
  overflow: hidden;
  &__wrapper {
    display: flex;
    justify-content: flex-start;
  }
  &__input {
    flex: 1 1 0;
  }
  &__icon {
    width: 40px;
    .iconfont {
      font-size: $font-size-l;
    }
  }
}
</style>