<template>
<div class="c-login fixed-center" v-show="visible">
  <div class="c-login__qrcode" @click="onQrcodeLogin">
    <i class="iconfont iconzujian-icon-18"></i>
  </div>
  <div class="c-login__qrcode-tip">扫码登录更方便</div>
  <div class="c-login__wrapper">
    <c-tab-bar v-model:list="tabbar" bothSides="46px"></c-tab-bar>
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
            <c-radio v-model:value="form.isRemmenber" style="margin-right: 14px;">记住密码</c-radio>
            <c-radio v-model:value="form.isAuto">自动登录</c-radio>
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
    <div class="c-login__error-tip">
      <div v-show="form.tip"><i class="iconfont iconzhuyi"></i>{{form.tip}}</div>
    </div>
    <div class="c-login__submit flex-center" @click.self="onLogin">登录</div>
    <div class="c-login__register" 
    @click="() => {createLoginWindow(true);createRegisterWindow();}">
    没有账号，立即注册 <i class="iconfont iconyou"></i></div>
    <div class="c-login__other">
      <i class="iconfont iconqq"></i>
      <i class="iconfont iconweibo"></i>
      <i class="iconfont iconweixin-copy"></i>
    </div>
    <div class="c-login__agree flex-center">
      <c-radio v-model:value="form.isAgree">同意</c-radio>
      <span>{{"《xx音乐用户服务协议》"}}</span>
      <span>{{"《隐私政策》"}}</span>
    </div>
  </div>
  <div class="c-login__qrcode-page" v-show="qr.visible">
    <div class="c-login__qrcode-page__return">
      <span class="flex-center" @click="qr.visible=false"><i class="iconfont iconzuo"></i>返回账号登录</span>
    </div>
    <div class="c-login__qrcode-page__title flex-center">手机扫码登录</div>
    <div class="c-login__qrcode-page__tip flex-center">使用<a target="_blank" href="https://music.163.com/#/download">网易云音乐App</a>扫描二维码</div>
    <div class="c-login__qrcode-page__wrapper" :class="{active:!qr.timeout&&qr.authorized}">
      <div class="c-login__qrcode-page__guide-img flex-center">我其实是一张图片，用于引导你如何操作，但是条件有限，凑合着看吧</div>
      <div class="c-login__qrcode-page__qrcode absolute-center">
        <img :src="qr.base64" alt="">
        <div class="c-login__qrcode-page__mask flex-center" v-show="qr.timeout" @click.once="onQrcodeRefresh">
          <div class="c-login__qrcode-page__btn flex-center" v-if="!qr.refreshing">二维码已过期</div>
          <i class="iconfont iconloading" v-else></i>
        </div>
        <div class="c-login__qrcode-page__authorized flex-center" v-show="qr.authorized">
          授权中
        </div>
      </div>
    </div>
    <div class="c-login__qrcode-page__guide-text flex-center">
      网易云音乐App - 首页右上角更多 - 扫一扫登录{{user && user.nickname}}
    </div>
  </div>
  <div class="c-login__close flex-center" @click="createLoginWindow(true)">
    <i class="iconfont iconguanbi"></i>
  </div>
</div>
</template>

<script type="text/javascript">
import CTabBar from "@/components/tabbar/tabbar.vue";
import CInput from "@/components/input/input.vue";
import CRadio from "@/components/radio/radio.vue";
import CountdownBtn from "@/components/countdown-btn/countdown-btn.vue";
import {createLoginWindow, createRegisterWindow, toast} from "@/components/hook.js";
import {
  doLoginByCellPhone, 
  getQrLoginKey,
  getQRLoginBase64, 
  checkQrLoginStatus, 
  getLoginStatus
} from "@/request/index.js";
import {ref, nextTick, watch, computed, onUnmounted} from "vue";
import {useStore} from "vuex";
import {myLocal} from "@/utils/storage.js";
import defaultQrcode from "../../../assets/imgs/default_qrcode.png";
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
    // 从本地获取保存的账号
    let accountInfo = myLocal.get(myLocal.keys["LEHE_ACCOUNT_INFO"]) || {};
    let tabbar = ref([
      {name: "账号登录", active: true},
      {name: "手机号登录", active: false}
    ]);
    // 表单相关的数据
    let form = ref({
      acountNum: accountInfo.phone || "",
      accountPwd: accountInfo.password || "",
      phoneNum: "",
      phoneCode: "",
      isAgree: false,
      isRemmenber: accountInfo.isRemmenber || false,
      isAuto: false,
      state: "notready",
      tip: ""
    });
    // 扫码登录相关数据
    let qr = ref({
      visible: false, // 用于控制扫码登录显示的标记位
      key: "", // 用于生成登录二维码的key
      base64: defaultQrcode, // 获取到的登录码base64
      timeId: null, // 轮询检测的定时器id
      timeout: false, // 超时标记
      authorized: false, // 授权中状态标记
      refreshing: false // 正在刷新标记
    });
    let store = useStore();
    let user = computed(() => {
      return store.state.user;
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
    // 生成扫码登录的 key和二维码
    let onQrcodeRefresh = async function() {
      qr.value.refreshing = true;
      await getQrLoginKey().then(data => {
        qr.value.key = data.data.unikey;
      });
      await getQRLoginBase64({
        params: {key: qr.value.key,qrimg: true}
      }).then(data => {
        qr.value.base64 = data.data.qrimg;
        qr.value.timeout = false;
        qr.value.refreshing = false;
        qr.value.authorized = false;
      });
      qr.value.timeId = setInterval(() => {
        checkQrLoginStatus({
          params: {key: qr.value.key}
        }).then(data => {
          let {code} = data;
          switch(code) {
            case 800: {
              toast({message: "二维码已过期"});
              qr.value.timeout = true;
              clearInterval(qr.value.timeId);
            } break;
            case 801: break;
            case 802: {
              qr.value.authorized = true;
            } break;
            case 803: {
              store.commit("setCookie", {cookie: data.cookie})
              toast({message: "授权登录成功"});
              createLoginWindow(true);
              clearInterval(qr.value.timeId);
              getLoginStatus().then(data => {
                let {code, profile} = data.data;
                store.commit("setProfile", {profile});
                if(code !== 200) {
                  timeLocal.remove(timeLocal.keys["LEHET_COOKIE"]);
                  timeLocal.remove(timeLocal.keys["LEHET_TOKEN"]);
                  timeLocal.remove(timeLocal.keys["LEHET_PROFILE"]);
                }
              });
            } break;
            default: "";
          }
        });
      }, 1500);
    }
    // 切换到扫码的方式登录
    let onQrcodeLogin =  async function() {
      qr.value.visible = true;
      if(!qr.value.visible) {
        return;
      }
      onQrcodeRefresh();
    }
    // 登录
    let onLogin = function() {
      if(!form.value.isAgree) {
        toast({message: "请同意《xx音乐用户服务协议》《隐私政策》"});
        return;
      }
      let reg = /(^\S+)/;
      form.value.tip = "";
      if(tabbar.value[0].active) {
        let _isAccount = !reg.test(form.value.acountNum);
        let _isPwd = !reg.test(form.value.accountPwd);
        if(_isAccount && _isPwd) {
          form.value.tip = "请输入手机号和密码";
        } else if(_isAccount) {
          form.value.tip = "请输入手机号"
        } else if(_isPwd) {
          form.value.tip = "请输入密码"
        }
        if(form.value.tip) {
          return;
        }
        doLoginByCellPhone({
          data: {
            phone: form.value.acountNum,
            password: form.value.accountPwd
          }
        }).then((data) => {
          let {code, message} = data;
          if(code !== 200) {
            toast({message});
          } else {
            store.commit("setLoginInfo", data);
            createLoginWindow(true);
            toast({message: "登录成功"});
            form.value.isRemmenber ? 
            myLocal.set(myLocal.keys["LEHE_ACCOUNT_INFO"], {
              phone: form.value.acountNum,
              password: form.value.accountPwd,
              isRemmenber: true
            })
            : myLocal.remove(myLocal.keys["LEHE_ACCOUNT_INFO"]);
          }
        });
      } else {
        // 验证手机号码是否正确的正则
        let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/;
        let _isPhone = !phoneReg.test(form.value.phoneNum);
        let _isNull = !reg.test(form.value.phoneCode);
        console.log(_isPhone, _isNull, form.value)
        if(_isPhone) {
          form.value.tip = "手机号格式不正确";
        } else if(_isNull) {
          form.value.tip = "验证码不能为空";
        }
        if(form.value.tip) {
          return;
        }
        toast({message: "网易云暂不支持验证码方式登录"});
      }
    }
    // 组件销毁时的生命钩子
    onUnmounted(() => {
      clearInterval(qr.value.timeId);
    });

    return {
      tabbar,
      form,
      qr,
      user,
      onQrcodeLogin,
      onLogin,
      onQrcodeRefresh,
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
    color: $color-font-main;
    overflow: hidden;
    cursor: pointer;
    .iconfont {
      font-size: 36px;
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translate(-50%, 50%) rotate(45deg);
    }
    &:hover {
      + .c-login__qrcode-tip {
        display: block;
      }
    }
  }
  &__qrcode-tip {
    display: none;
    width: 100px;
    padding: 6px;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 60px;
    top: 30px;
    transform: translateY(-50%);
    font-size: $font-size-xs;
    color: $color-font-gray;
    &::before {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: #FFF;
      box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
      left: 0px;
      top: 50%;
      transform: translate(-50%, -50%) rotate(135deg);
    }
  }
  &__form {
    width: 100%;
    height: 130px;
    margin: 36px 0px 0px;
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
  &__error-tip {
    font-size: $font-size-xs;
    color: red;
    height: 40px;
    line-height: 40px;
    .iconfont {
      font-size: $font-size-xs;
      color: red;
      margin-right: 6px;
    }
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
  &__qrcode-page {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    left: 0px;
    top: 0px;
    padding: 16px;
    box-sizing: border-box;
    &__return {
      font-size: $font-size-s;
      display: flex;
      align-items: center;
      cursor: pointer;
      .iconfont {
        font-size: $font-size-xl;
      }
    }
    &__title {
      margin-top: 54px;
      font-size: $font-size-l;
      font-weight: bold;
    }
    &__tip {
      margin-top: 12px;
      font-size: $font-size-s;
      color: $color-font-main;
      a {
        color: $color-main;
      }
    }
    &__wrapper {
      height: 190px;
      position: relative;
      margin: 0px 10px;
      margin-top: 50px;
      &.active:hover {
        .c-login__qrcode-page__guide-img {
          right: 0px;
          transform: translate(0, -50%);
        }
        .c-login__qrcode-page__qrcode {
          left: 0px;
          transform: translate(0, -50%) scale(0.87);
        }
      }
    }
    &__qrcode {
      height: 190px;
      width: 190px;
      transition: all 0.5s ease;
      position: relative;
    }
    &__mask,
    &__authorized {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      background-color: rgba(255, 255, 255, 0.9);
    }
    &__authorized {
      background-color: #FFF;
      box-shadow: 0px 0px 1px 1px rgba(0, 0, 0,0.1);
      color: $color-font-main;
      font-size: $font-size-l;
    }
    &__mask {
      .iconfont {
        animation: ani_loading 1s linear infinite;
        font-size: $font-size-xl;
      }
    }
    &__btn {
      padding: 5px 5px;
      cursor: pointer;
      font-size: $font-size-xs;
      color: #FFF;
      border-radius: 6px;
      background-color: $color-main;
    }
    &__guide-img {
      position: absolute;
      right: 50%;
      top: 50%;
      transform: translate(50%, -50%);
      width: 120px;
      height: 165px;
      background-color: $color-main;
      transition: all 0.5s ease;
      font-size: $font-size-xs;
      color: $color-font-main;
      padding: 0px 10px;
      box-sizing: border-box;
    }
    &__guide-text {
      margin-top: 55px;
      font-size: $font-size-xs;
      color: $color-font-gray;
    }
  }
}
</style>