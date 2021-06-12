// 注册全局组件
import CAvatar from "@/components/avatar/avatar.vue";
import CSearch from "@/components/search/search.vue";
import CSiderBar from "@/components/sidebar/sidebar.vue";
import CPlayer from "@/components/player/player.vue";
import CProgress from "@/components/progress/progress.vue";
import COptionBox from "@/components/option-box/option-box.vue";
import CTabBar from "@/components/tabbar/tabbar.vue";
import CInput from "@/components/input/input.vue";
import CRadio from "@/components/radio/radio.vue";
import CInputTitle from "@/components/input-title/input-title.vue";
import CUserBox from "@/components/user-box/user-box.vue";
import CSwiper from "@/components/swiper/swiper.vue";
import CGoodsBox from "@/components/goods-box/goods-box.vue";
import CButton from "@/components/button/button.vue";
import CFullscreenPlayer from "../components/fullscreen-player/fullscreen-player.vue";

const infos = [
  {name: "c-avatar", component: CAvatar},
  {name: "c-search", component: CSearch},
  {name: "c-side-bar", component: CSiderBar},
  {name: "c-player", component: CPlayer},
  {name: "c-progress", component: CProgress},
  {name: "c-option-box", component: COptionBox},
  {name: "c-tab-bar", component: CTabBar},
  {name: "c-input", component: CInput},
  {name: "c-radio", component: CRadio},
  {name: "c-input-title", component: CInputTitle},
  {name: "c-user-box", component: CUserBox},
  {name: "c-swiper", component: CSwiper},
  {name: "c-goods-box", component: CGoodsBox},
  {name: "c-button", component: CButton},
  {name: "c-fullscreen-player", component: CFullscreenPlayer},
]
export default function(app, options) {
  infos.forEach((item) => {
    app.component(item.name, item.component);
  });
};