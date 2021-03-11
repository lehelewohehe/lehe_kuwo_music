// 注册全局组件
import CAvatar from "@/components/avatar.vue";

const infos = [
  {name: "c-avatar", component: CAvatar}
]
export default function(app, options) {
  infos.forEach((item) => {
    app.component(item.name, item.component);
  });
};