<template>
<div class="c-register position-center" v-show="visible">
  <div class="c-register__close flex-center" @click="createRegisterWindow(true)">
    <i class="iconfont iconguanbi"></i>
  </div>
  <div class="c-register__wrapper">
    <div class="c-register__title">新用户注册</div>
    <div class="c-register__phone">
      <c-input-title name="手机号" tip="你们好，小宝贝" isTip style="margin-bottom: 12px;"></c-input-title>
      <c-input></c-input>
    </div>
    <div class="c-register__set">
      <c-input-title name="设置密码" tip="你们好，小宝贝" isTip style="margin-bottom: 12px;"></c-input-title>
      <c-input></c-input>
    </div>
    <div class="c-register__confirm">
      <c-input-title name="确认密码" tip="你们好，小宝贝" isTip style="margin-bottom: 12px;"></c-input-title>
      <c-input></c-input>
    </div>
    <div class="c-register__code">
      <c-input-title name="验证码" tip="你们好，小宝贝" isTip style="margin-bottom: 12px;"></c-input-title>
      <c-input></c-input>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import CInput from "@/components/input/input.vue";
import CInputTitle from "@/components/input-title/input-title.vue";
import {createRegisterWindow} from "@/components/hook.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CInputTitle,
    CInput
  },
  setup(props, context) {
    return {
      createRegisterWindow
    }
  }
}
</script>
<style lang="scss" scoped>
.c-register {
  width: 360px;
  height: 580px;
  background-color: $color-font-white;
  padding: 20px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  &__close {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    color: $color-font-gray;
    .iconfont {
      font-size: $font-size-xl;
    }
  }
  &__wrapper {

  }
  &__phone,
  &__set,
  &__confirm,
  &__code {
    margin-bottom: 24px;
  }
  &__title {
    margin-bottom: 36px;
  }
}
</style>