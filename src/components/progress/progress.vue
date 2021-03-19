<template>
<div class="c-progress" :style="`transform: rotate(-${vertical ? 90 : 0}deg);`">
  <div class="c-progress__wrapper" 
  @mousemove="onShowTooltip" 
  @mouseleave="() => {showTooltip = false}">
    <div class="c-progress__outer" 
    :style="`${getProgressStyle};`"
    @click="onSetCurrentProgress"
    ref="outer"></div>
    <div class="c-progress__inner" 
    :style="`${getProgressStyle};width:${percent}%`" 
    @click="onSetCurrentProgress"
    ref="inner">
      <div class="c-progress__circle"
      draggable="true"
      @dragstart.prevent.stop
      @dragenter.prevent.stop
      @dragover.prevent.stop
      :style="getCircleStyle" 
      @click.stop
      @mouseup="onDrapEnd"
      @mousedown="onDrapInit"
      ></div>
    </div>
    <div class="c-progress__tooltip"
    v-show="showTooltip"
    :style="`transform: translate(-50%, -100%) rotate(${vertical ? 90 : 0}deg);${getTooltip};left:${tooltipLeft}px`" 
    v-html="text || defaultText">
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {toRefs, ref, computed, getCurrentInstance, watch, nextTick} from "vue";
import {throttle, reduce} from "@/utils/utils.js";
export default {
  props: {
    progressStyle: {
      type: Object,
      default: () => {
        return {
          "background-color": "#ffd200",
          "height": "4px",
          "border-radius": "2px",
          // "transition": "all 0.2s ease"
        };
      }
    },
    circleStyle: {
      type: Object,
      default: () => {
        return {
          "background-color": "#ffd200",
          "height": "10px",
          "width": "10px",
          "border-radius": "50%"
        };
      }
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 60
    },
    text: {
      type: String,
      default: ""
    },
    vertical: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: {
    "update:percent": paload => {
      console.log(paload, "update:percent");
      return true;
    }
  },
  data() {
    return {

    }
  },
  setup(props, context) {
    let {circleStyle, progressStyle, percent, vertical, tooltip, max} = toRefs(props);
    let {emit} = context;
    // tooltip的左方向相对位置偏移量
    let tooltipLeft = ref(0);
    let showTooltip = ref(false);
    let defaultText = ref("");
    let startX = 0;
    let startY = 0;
    let offsetWidth = 0;
    // 定义ref值
    let inner = ref(null);
    let outer = ref(null);

    // 计算属性
    let getCircleStyle = computed(reduce(circleStyle));
    let getProgressStyle = computed(reduce(progressStyle));
    let getTooltip = computed(reduce(tooltip));
    // 监听percent，同步其他数据变化
    watch(percent, () => {
      nextTick(() => {
        tooltipLeft.value = inner.value.offsetWidth;
      });
      defaultText.value = Math.ceil(percent.value * max.value / 100);
    }, {immediate: true});

    // console.log(getProgressStyle.value, getCircleStyle.value);
    // 直接跳转到指定进度位置
    let onSetCurrentProgress = function(e) {
      let {offsetX} = e;
      // console.log(e, outer.value.offsetWidth, offsetX);
      // console.log(Number((offsetX / outer.value.offsetWidth * 100).toFixed(2)));
      emit("update:percent", Number((offsetX / outer.value.offsetWidth * 100).toFixed(2)));
    }
    
    // 进度条滑动 节流包装
    let onDrapMove = throttle(function({pageX, pageY}) {
      // console.log(e, "move");
      let diff = vertical.value ? startY - pageY : pageX - startX ;
      console.log(pageX, startX);
      let _percent = Number(((offsetWidth + diff) / outer.value.offsetWidth * 100).toFixed(2));
      _percent = _percent < 0 ? 0 : _percent;
      _percent = _percent > 100 ? 100 : _percent;
      emit("update:percent", _percent);
    }, 10);

    // 进度条滑动结束
    let onDrapEnd = function(e) {
      console.log(e, "end");
      document.removeEventListener("mousemove", onDrapMove);
      document.removeEventListener("mouseup", onDrapEnd);
    }

    // 进度条滑动初始化
    let onDrapInit = function({pageX, pageY}) {
      offsetWidth = inner.value.offsetWidth;
      startX = pageX;
      startY = pageY;
      document.addEventListener("mousemove", onDrapMove);
      document.addEventListener("mouseup", onDrapEnd);
    }
    // 设置tooltip出现并且设置出现的位置 节流包装
    let onShowTooltip = throttle(function(e) {
      let _offsetWidth = outer.value.offsetWidth;
      showTooltip.value = true;
      // 判断触发事件的目标元素是否是c-progress__circle
      // 是则改变tooltip位置的计算方式
      if(e.target.className == "c-progress__circle") {
        tooltipLeft.value = e.target.offsetLeft + e.target.offsetWidth;
      } else {
        tooltipLeft.value = e.offsetX;
      }
      tooltipLeft.value = tooltipLeft.value < 0 ? 0 : tooltipLeft.value;
      tooltipLeft.value = tooltipLeft.value < _offsetWidth ? tooltipLeft.value : _offsetWidth;
      defaultText.value = Math.floor(tooltipLeft.value / _offsetWidth * max.value);
    }, 10);

    return {
      getCircleStyle,
      getProgressStyle,
      getTooltip,
      onSetCurrentProgress,
      onDrapInit,
      tooltipLeft,
      onShowTooltip,
      showTooltip,
      defaultText,
      inner,
      outer
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.c-progress {
  width: 100%;
  transform-origin: center left;
  &__wrapper {
    width: 100%;
    position: relative;
  }
  &__outer {
    width: 100%;
    cursor: pointer;
    background-color: $color-font-white !important;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  }
  &__inner {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 80%;
    cursor: pointer;
  }
  &__circle {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 0px;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  }
  &__tooltip {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 30px;
    font-size: $font-size-xs;
    background-color: $color-font-white;
    position: absolute;
    top: -10px;
    left: 0px;
    transform: translate(-50%, -100%);
    transform-origin: center;
  }
}
</style>