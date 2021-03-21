import CToast from "@/components/toast/toast.vue";
import CLogin from "@/components/window/login/login.vue";
import CRegister from "@/components/window/register/register.vue";
import {createApp, reactive, ref, toRefs} from "vue";

export let toast = (function() {
  let _app = null;
  let container = null;
  return function({icon, message, delay=2000}) {
    if(_app) {
      return;
    }
    container = document.createElement("div");
    document.body.appendChild(container);
    _app = createApp(CToast, {option: {message, icon, delay}});
    _app.mount(container);
    setTimeout(() => {
      document.body.removeChild(container);
      _app = null;
    }, delay);
  }
})();


export let createLoginWindow = (function() {
  let _app = null;
  let _obj = {visible: true};
  let container = null;
  return function(flag) {
    if(_app && flag) {
      _app.unmount(_app);
      document.body.removeChild(container);
      return;
    }
    container = document.createElement("div");
    document.body.appendChild(container);
    _app = createApp(CLogin, _obj);
    _app.mount(container);
  }
})();


export let createRegisterWindow = (function() {
  let _app = null;
  let _obj = {visible: true};
  let container = null;
  return function(flag) {
    if(_app && flag) {
      _app.unmount(_app);
      document.body.removeChild(container);
      return;
    }
    container = document.createElement("div");
    document.body.appendChild(container);
    _app = createApp(CRegister, _obj);
    _app.mount(container);
  }
})();

