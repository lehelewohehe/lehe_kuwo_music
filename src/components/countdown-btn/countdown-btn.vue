<template>
<div class="c-countdown-btn flex-center" :class="{active: ready && status.state}" @click="onGetCode">
  {{status.text}}
</div>
</template>

<script type="text/javascript">
import {ref, props, toRefs, onUnmounted} from "vue";
export default {
  inheritAttrs: false,
  props: {
    ready: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    // 用于控制按钮的各种状态
    // text 是按钮显示的文字
    // active 按钮是否已经被激活，在这里我们的场景中指的是电话号码是否合法
    // state 决定的是当前是处于倒计时还是非倒计时状态
    let status = ref({text: "获取验证码", state: true});
    let {ready} = toRefs(props);
    let timeId = null;
    let countdown = 60;
    let {attrs} = context;
    
    // 获取验证码
    let onGetCode = function() {
      if(ready.value) {
        status.value.state = false;
        attrs.onClick && attrs.onClick();
        timeId = setInterval(() => {
          countdown--;
          status.value.text = `重新获取(${countdown})`;
          if(countdown <= 0) {
            clearInterval(timeId);
            timeId = null;
            countdown = 60;
            status.value.state = true;
            status.value.text = "获取验证码";
          }
        }, 1000);
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