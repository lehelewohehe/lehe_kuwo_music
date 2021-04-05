import "@babel/polyfill";
import "@/assets/css/init.css";
import "@/assets/css/base.css";
import "@/assets/css/iconfont.css";
import root from "@/app.vue"
import {createApp} from "vue";
import * as Vue from "vue";
import router from "@/router/index.js";
import store from "@/store/index.js";
import globalComponents from "@/components/index.js";
import {jumpAnchor, customScrollBar} from "@/directive/index.js";

// 5. 创建并挂载根实例
const app = createApp(root);
// 确保 _use_ 路由实例使
// 整个应用支持路由。
app.use(router);
app.use(store);
app.use(globalComponents);
app.use(jumpAnchor);
app.use(customScrollBar);

app.mount('#app');
// 现在，应用已经启动了！