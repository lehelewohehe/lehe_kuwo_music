<template>
<div class="c-login position-center" v-show="visible">
  <div class="c-login__close flex-center" @click="createLoginWindow(true)">
    <i class="iconfont iconguanbi"></i>
  </div>
  <div class="c-login__qrcode">
    <i class="iconfont iconzujian-icon-18"></i>
  </div>
  <div class="c-login__wrapper">
    <c-tab-bar :list="tabbar" bothSides="46px" 
    @onSetCurrentIndex="(callback) => {callback(tabbar)}"></c-tab-bar>
    <div class="c-login__form">
      <div class="c-login__account" v-show="tabbar[0].active">
        <div class="c-login__account__username">
          <c-input icon="iconicon-user" v-model:value="form.acountNum"></c-input>
        </div>
        <div class="c-login__account__password">
          <c-input icon="iconsuo" type="password" v-model:value="form.accountPwd"></c-input>
        </div>
        <div class="c-login__account__tool">
          <div class="c-login__account__radio">
            <c-radio v-model:value="tabbar.isRemmenber" style="margin-right: 14px;">记住密码</c-radio>
            <c-radio v-model:value="tabbar.isAuto">自动登录</c-radio>
          </div>
          <span class="c-login__account__forget">忘记密码</span>
        </div>
      </div>
      <div class="c-login__phone" v-show="tabbar[1].active">
        <div class="c-login__phone__phonenumber">
          <c-input icon="iconshouji" v-model:value="form.phoneNum"></c-input>
        </div>
        <div class="c-login__phone__code">
          <c-input icon="iconsuo" type="password" 
          v-model:value="form.phoneCode">
            <template #button>
              <countdown-btn v-model:state="form.state"></countdown-btn>
            </template>
          </c-input>
        </div>
      </div>
    </div>
    <div class="c-login__submit flex-center">登录</div>
    <div class="c-login__register" 
    @click="() => {createLoginWindow(true);createRegisterWindow();}">
    没有账号，立即注册 <i class="iconfont iconyou"></i></div>
    <div class="c-login__other">
      <i class="iconfont iconqq"></i>
      <i class="iconfont iconweibo"></i>
      <i class="iconfont iconweixin-copy"></i>
    </div>
    <div class="c-login__agree flex-center">
      <c-radio v-model:value="tabbar.isAgree">同意</c-radio>
      <span>{{"《xx音乐用户服务协议》"}}</span>
      <span>{{"《隐私政策》"}}</span>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import CTabBar from "@/components/tabbar/tabbar.vue";
import CInput from "@/components/input/input.vue";
import CRadio from "@/components/radio/radio.vue";
import CountdownBtn from "@/components/countdown-btn/countdown-btn.vue";
import {createLoginWindow, createRegisterWindow} from "@/components/hook.js";
import {ref, nextTick, watch} from "vue";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CTabBar,
    CInput,
    CRadio,
    CountdownBtn
  },
  setup(props, context) {
    let tabbar = ref([
      {name: "账号登录", active: true},
      {name: "手机号登录", active: false}
    ]);
    // 表单相关的数据
    let form = ref({
      acountNum: "",
      accountPwd: "",
      phoneNum: "",
      phoneCode: "",
      isAgree: false,
      isRemmenber: false,
      isAuto: false,
      state: "notready"
    });

    // 监听电话号码，实时改变倒计时组件的状态
    watch(() => form.value.phoneNum, (next, pre) => {
      let reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
      if(reg.test(next)) {
        form.value.state = "ready";
      } else {
        form.value.state = "notready";
      }
    });
    
    return {
      tabbar,
      form,
      createLoginWindow,
      createRegisterWindow
    }
  }
}
</script>
<style lang="scss" scoped>
.c-login {
  width: 360px;
  height: 530px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #FFF;
  padding: 70px 36px 20px;
  box-sizing: border-box;
  overflow: hidden;
  &__wrapper {
    width: 100%;
    height: 100%;
  }
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
  &__qrcode {
    width: 84px;
    height: 84px;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: translate(-50%, -50%) rotate(-45deg);
    padding: 12px;
    box-sizing: border-box;
    color: $color-font-black;
    overflow: hidden;
    cursor: pointer;
    .iconfont {
      font-size: 36px;
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translate(-50%, 50%) rotate(45deg);
    }
  }
  &__form {
    width: 100%;
    height: 130px;
    margin: 36px 0px 40px;
  }
  &__phone {
    &__code {
      margin-top: 14px;
    }
  }
  &__account {
    &__password,
    &__tool {
      margin-top: 14px;
    }
    &__tool {
      color: $color-font-gray;
      font-size: $font-size-xs;
      display: flex;
      justify-content: space-between;
    }
    &__radio {
      display: flex;
      justify-content: flex-start;
    }
    &__forget {
      cursor: pointer;
    }
  }
  &__submit {
    width: 100%;
    height: 40px;
    color: $color-font-main;
    font-size: $font-size-m;
    background-color: $color-main;
    cursor: pointer;
  }
  &__register {
    color: $color-font-gray;
    font-size: $font-size-s;
    text-align: center;
    margin-top: 14px;
    cursor: pointer;
  }
  &__other {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    padding: 0px 50px;
    .iconfont {
      cursor: pointer;
      font-size: 40px;
    }
    .iconqq {
      color: #26b9fe;
    }
    .iconweixin-copy {
      color: #26d557;
    }
    .iconweibo {
      color: #fd5844;
    }
  }
  &__agree {
    margin-top: 18px;
    font-size: $font-size-xs;
    color: #5a8fcd;
    span {
      cursor: pointer;
    }
  }
}
</style>