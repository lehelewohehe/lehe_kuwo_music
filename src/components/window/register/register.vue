<template>
<div class="c-register position-center" v-show="visible">
  <div class="c-register__close flex-center" @click="createRegisterWindow(true)">
    <i class="iconfont iconguanbi"></i>
  </div>
  <div class="c-register__wrapper">
    <div class="c-register__title">新用户注册</div>
    <div class="c-register__phone">
      <c-input-title name="手机号" 
      tip="手机号码不符合规范，请重新输入" 
      :isTip="form.phone.isError" 
      style="margin-bottom: 12px;"></c-input-title>
      <c-input v-model:value="form.phone.value" 
      placeholder="请输入手机号码" 
      :isError="form.phone.isError"
      @blur="onCheckPhone"></c-input>
    </div>
    <div class="c-register__set">
      <c-input-title name="设置密码" 
      tip="请重新输入，需组合字母，数字或符号" 
      :isTip="form.password.isError" 
      style="margin-bottom: 12px;"></c-input-title>
      <c-input :type="form.password.type"
      v-model:value="form.password.value" 
      placeholder="6~16位，需组合字母，数字或符号" 
      :isError="form.password.isError"
      @blur="onCheckPassword">
        <template #button>
          <div class="c-register__set__button flex-center"
          v-if="form.password.value">
            <i class="iconfont"
            @click="form.password.isSee=!form.password.isSee"
            :class="form.password.isSee?'iconkeshi':'iconbukeshi'"></i>
          </div>
        </template>
      </c-input>
    </div>
    <div class="c-register__confirm">
      <c-input-title name="确认密码" 
      tip="两次输入密码不一致" 
      :isTip="form.passwordAgain.isError" 
      style="margin-bottom: 12px;"></c-input-title>
      <c-input :type="form.passwordAgain.type"
      v-model:value="form.passwordAgain.value" 
      placeholder="请再次输入密码" 
      :isError="form.passwordAgain.isError"
      @blur="onCheckPasswordAgain">
        <template #button>
          <div class="c-register__confirm__button flex-center" 
          v-if="form.passwordAgain.value">
            <i class="iconfont"
            @click="form.passwordAgain.isSee=!form.passwordAgain.isSee"
            :class="form.passwordAgain.isSee?'iconkeshi':'iconbukeshi'"></i>
          </div>
        </template>
      </c-input>
    </div>
    <div class="c-register__code">
      <c-input-title name="验证码" 
      tip="你们好，小宝贝" 
      :isTip="form.code.isError" 
      style="margin-bottom: 12px;"></c-input-title>
      <c-input v-model:value="form.code.value" 
      placeholder="请输入接收到的验证码" 
      :isError="form.code.isError">
        <template #button>
          <countdown-btn v-model:state="form.code.state"></countdown-btn>
        </template>
      </c-input>
    </div>
    <div class="c-register__confirm-register flex-center">确认注册</div>
    <div class="c-register__login" 
    @click="() => {createLoginWindow();createRegisterWindow(true);}">已有账号，立即登录></div>
  </div>
</div>
</template>

<script type="text/javascript">
import {ref, watch} from "vue";
import CInput from "@/components/input/input.vue";
import CInputTitle from "@/components/input-title/input-title.vue";
import CountdownBtn from "@/components/countdown-btn/countdown-btn.vue";
import {createRegisterWindow, createLoginWindow} from "@/components/hook.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CInputTitle,
    CInput,
    CountdownBtn
  },
  setup(props, context) {
    // 表单相关的数据
    let form = ref({
      phone: {
        value: "",
        isError: false
      },
      password: {
        value: "",
        isError: false,
        isSee: false,
        type: "password"
      },
      passwordAgain: {
        value: "",
        isError: false,
        isSee: false,
        type: "password"
      },
      code: {
        value: "",
        isError: false,
        state: "notready"
      }
    });

    // 注册监听器，下面两个监听器是用于切换密码可不可视
    watch(() => form.value.password.isSee, (next, pre) => {
      form.value.password.type = next ? "text" : "password";
    });
    watch(() => form.value.passwordAgain.isSee, (next, pre) => {
      form.value.passwordAgain.type = next ? "text" : "password";
    });
    // 监听电话号码，实时改变倒计时组件的状态
    watch(() => form.value.phone.value, (next, pre) => {
      let reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
      if(reg.test(next)) {
        form.value.code.state = "ready";
      } else {
        form.value.code.state = "notready";
      }
    });

    let onCheckPhone = function() {
      // 验证手机号码是否正确的正则
      let reg = /0?(13|14|15|17|18|19)[0-9]{9}/;
      form.value.phone.isError = !reg.test(form.value.phone.value);
    }
    let onCheckPassword = function() {
      // 检测密码格式是否正确的正则
      let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
      form.value.password.isError = !reg.test(form.value.password.value);
    }
    // 检测两次密码是否一致
    let onCheckPasswordAgain = function() {
      form.value.passwordAgain.isError = form.value.password.value !== form.value.passwordAgain.value;
    }

    return {
      form,
      createRegisterWindow,
      createLoginWindow,
      onCheckPhone,
      onCheckPassword,
      onCheckPasswordAgain
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
  &__set,
  &__confirm {
    &__button {
      width: 40px;
      cursor: pointer;
    }
    .iconfont {
      font-size: $font-size-l;
      color: $color-font-gray;
    }
  }
  &__title {
    margin-bottom: 36px;
  }
  &__confirm-register {
    width: 100%;
    height: 40px;
    color: $color-font-main;
    font-size: $font-size-m;
    background-color: $color-main;
    cursor: pointer;
    margin-bottom: 24px;
  }
  &__login {
    color: $color-font-gray;
    font-size: $font-size-s;
    text-align: center;
    margin-top: 14px;
    cursor: pointer;
  }
}
</style>