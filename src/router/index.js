// import * as VueRouter from "vue-router";
import {createRouter, createWebHashHistory} from "vue-router";
// console.log(VueRouter, 11111);
// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: "/", 
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    name: "recommend",
    component: () => import("@/pages/recommend/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/recommend/subpages/choice/choice.vue")
      },
      {
        path: "choice",
        name: "recommend_choice",
        component: () => import("@/pages/recommend/subpages/choice/choice.vue")
      },
      {
        path: "singer",
        name: "recommend_singer",
        component: () => import("@/pages/recommend/subpages/singer/singer.vue")
      },
      {
        path: "ranking-list",
        name: "recommend_ranking-list",
        component: () => import("@/pages/recommend/subpages/ranking-list/ranking-list.vue")
      },
      {
        path: "song-sheet",
        name: "recommend_song-sheet",
        component: () => import("@/pages/recommend/subpages/song-sheet/song-sheet.vue")
      },
    ]
  },
  {
    path: "/song-sheet/:id",
    name: "song-sheet_detail",
    component: () => import("@/pages/recommend/subpages/song-sheet/detail.vue")
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;

