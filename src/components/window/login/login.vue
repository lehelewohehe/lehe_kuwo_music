<template>
<div class="c-login postion-center">
  <div class="c-login__close flex-center">
    <i class="iconfont iconguanbi"></i>
  </div>
  <div class="c-login__qrcode">
    <i class="iconfont iconzujian-icon-18"></i>
  </div>
  <div class="c-login__wrapper">
    <c-tab-bar></c-tab-bar>
  </div>
</div>
</template>

<script type="text/javascript">
// import CTabBar from "@/components/tabbar/tabbar.vue";
export default {
  // components: {
  //   CTabBar
  // },
  data() {
    return {

    }
  },
  created(){

  },
  mounted() {

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
}
</style>