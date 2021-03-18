// 注册全局组件
import CAvatar from "@/components/avatar/avatar.vue";
import CSearch from "@/components/search/search.vue";
import CSiderBar from "@/components/sidebar/sidebar.vue";
import CPlayer from "@/components/player/player.vue";
import CProgress from "@/components/progress/progress.vue";
import COptionBox from "@/components/option-box/option-box.vue";
import CTabBar from "@/components/tabbar/tabbar.vue";

const infos = [
  {name: "c-avatar", component: CAvatar},
  {name: "c-search", component: CSearch},
  {name: "c-side-bar", component: CSiderBar},
  {name: "c-player", component: CPlayer},
  {name: "c-progress", component: CProgress},
  {name: "c-option-box", component: COptionBox},
  {name: "c-tab-bar", component: CTabBar}
]
export default function(app, options) {
  infos.forEach((item) => {
    app.component(item.name, item.component);
  });
};