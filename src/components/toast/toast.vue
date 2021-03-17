<template>
<transition name="fade">
  <div class="c-toast" v-show="visivble">
    <div class="c-toast__wrapper">
      <div class="c-toast__icon flex-center">
        <i :class="`iconfont ${option.icon}`"></i>
      </div>
      <div class="c-toast__text flex-center">{{option.message}}</div>
    </div>
  </div>
</transition>
</template>

<script type="text/javascript">
import {ref, onMounted, toRefs} from "vue";
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, context) {
    let visivble = ref(false);
    let {option} = toRefs(props);
    // 在这里Promise的封装并没有多大意义，主要是想用一下
    let createPromise = function(fn, ms) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          fn();
          resolve();
        }, ms)
      });
    }

    onMounted(async () => {
      await createPromise(() => {
        visivble.value = true;
      }, 0);
      await createPromise(() => {
        visivble.value = false;
      }, option.value.delay - 600);
    });
    return {
      visivble
    }
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
.c-toast {
  width: 150px;
  height: 60px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2000;
  transform: translate(-50%, -50%);
  font-size: $font-size-xs;
  color: $color-font-white;
  padding: 6px 8px;
  box-sizing: border-box;
  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__icon {
    width: 40%;
    .iconfont {
      font-size: 30px;
    }
  }
  &__text {
    width: 60%;
    justify-content: flex-start;
  }
}
</style>