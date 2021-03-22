<template>
<div class="c-countdown-btn flex-center" :class="{active: status.active}" @click="onGetCode">
  {{status.text}}
</div>
</template>

<script type="text/javascript">
import {ref, props, toRefs, watch, onUnmounted} from "vue";
export default {
  props: {
    state: {
      type: String,
      default: ""
    }
  },
  emits: {
    "update:state": paload => {
      console.log(paload, "update:state");
      return true;
    }
  },
  setup(props, context) {
    let {state} = toRefs(props);
    let status = ref({text: "", active: false});
    let timeId = null;
    let countdown = 60;
    let {emit} = context;

    // 根据传入的状态变更与之相关的视图相关数据
    let setStatusByState = function(next, pre) {
      // 当定时器倒计时正在进行时，直接返回
      if(timeId && next != "pending") {
        return;
      }
      switch(next) {
        case "pending": {
          status.value.active = false;
          // 开启倒计时后马上改回之前的状态
          emit("update:state", pre);
        } break;
        case "ready": {
          status.value.active = true;
          status.value.text = "获取验证码";
        } break;
        case "notready": {
          status.value.active = false;
          status.value.text = "获取验证码";
        } break;
        default: ;
      }
    }
    // 监听state
    watch(state, setStatusByState, {immediate: true});
    
    // 获取验证码
    let onGetCode = function() {
      if(status.value.active) {
        timeId = setInterval(() => {
          countdown--;
          status.value.text = `重新获取(${countdown})`;
          if(countdown <= 0) {
            clearInterval(timeId);
            timeId = null;
            setStatusByState(state.value);
          }
        }, 1000);
        emit("update:state", "pending");
      }
    }

    // 当组件卸载的时候，清除定时器
    onUnmounted(() => {
      timeId && clearInterval(timeId);
    });

    return {
      status,
      onGetCode
    }
  }
}
</script>
<style lang="scss" scoped>
.c-countdown-btn {
  width: 120px;
  background-color: $color-bg-deep;
  color: $color-font-gray;
  font-size: $font-size-s;
  &.active {
    background-color: $color-main;
    color: $color-font-black;
    cursor: pointer;
  }
}
</style>