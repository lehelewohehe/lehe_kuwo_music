import CToast from "@/components/toast/toast.vue";
import {render, createVNode, createApp} from "vue";
export default function(app, options) {
  let _app = null;
  app.config.globalProperties.$toast = function({icon, message, delay=2000}) {
    if(_app) {
      return;
    }
    let container = document.createElement("div");
    document.body.appendChild(container);
    _app = createApp(CToast, {option: {message, icon, delay}});
    _app.mount(container);
    setTimeout(() => {
      document.body.removeChild(container);
      _app = null;
    }, delay);
  }
}