<template>
<div class="p-app" :style="{'background-image': `url(${globalBg})`}">
  <div class="p-app__wrapper">
    <div class="p-app__top">
      <div class="p-app__left">
        <c-side-bar></c-side-bar>
      </div>
      <div class="p-app__right">
        <div class="p-app__toolbar">
          <c-search></c-search>
        </div>
        <div class="p-app__scroll">
          <div class="p-app__container" id="p-app__container"
          v-anchor="{right:'30px', bottom:'20px'}" v-scroll>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="p-app__bottom">
      <div class="p-app__player">
        <c-player></c-player>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import globalBgImg from "@/assets/imgs/global_bg_02.jpg";
import {getLoginStatus} from "@/request/index.js";
import {ref} from "vue";
import {useStore} from "vuex";
import {timeLocal} from "@/utils/storage.js";
export default {
  setup(props, context) {
    let globalBg = ref(globalBgImg);
    let store = useStore();
    getLoginStatus().then(data => {
      let {code, profile} = data.data;
      store.commit("setProfile", {profile});
      if(!profile) {
        timeLocal.remove(timeLocal.keys["LEHET_COOKIE"]);
        timeLocal.remove(timeLocal.keys["LEHET_TOKEN"]);
        timeLocal.remove(timeLocal.keys["LEHET_PROFILE"]);
      }
    });

    return {
      globalBg
    }
  }
}
</script>
<style lang="scss" scoped>
.p-app {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  color: $color-font-main;
  &__wrapper {
    width: 1010px;
    height: 630px;
    background: pink;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  }
  &__top {
    width: 100%;
    height: 510px;
    flex: 1 1 0;
    display: flex;
    justify-content: flex-start;
  }
  &__left {
    width: 200px;
    height: 100%;
    background-color: $color-bg-middle;
  }
  &__right {
    flex: 1 1 0;
    height: 100%;
    width: 100%;
    background-color: $color-bg-shallow;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  &__toolbar {
    height: 66px;
    display: flex;
    align-items: center;
    padding: 0px 30px;
    flex: 0 0 auto;
  }
  &__bottom {
    width: 100%;
    height: 60px;
    background-color: #101121;
  }
  &__player {
    height: 100%;
  }
  &__scroll {
    position: relative;
    flex: 1 1 auto;
    overflow: hidden;
  }
  &__container {
    padding: 0px 30px;
    overflow-y: scroll;
    height: 100%;
  }
}
</style>