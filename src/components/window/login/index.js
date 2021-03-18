import CLogin from "@/components/window/login/login.vue";
import {createApp} from "vue";
export default function(app, options) {
  let _app = null;
  app.config.globalProperties.$login = function() {
    if(_app) {

    }
    console.log(1234);
    let container = document.createElement("div");
    document.body.appendChild(container);
    _app = createApp(CLogin);
    _app.mount(container);
  }
};