import axios from "@/request/axios.js";
import store from "@/store/index.js";
import {createApp, toRefs} from "vue";
let {cookie} = toRefs(store.state.user);
// 下面用于测试cookie的响应式以及是否可以被监听
let app = createApp({});
let container = document.createElement("div");
let instance = app.mount(container);
instance.$watch(() => cookie.value, (newVal, oldVal) => {
  console.log(newVal, 123, oldVal);
});

// 通过手机号登录
export function doLoginByCellPhone(config={}) {
  return axios.post(`/login/cellphone`, config.data, config);
}

// 获取二维码登录需要的key
export function getQrLoginKey(config={}) {
  return axios.get("/login/qr/key", config);
}

// 二维码生成接口
export function getQRLoginBase64(config={}) {
  return axios.get("/login/qr/create", config);
}

// 检测扫码登录状态接口
export function checkQrLoginStatus(config={}) {
  return axios.get("/login/qr/check", config);
}

// 登录刷新
export function doLoginRefresh(config={}) {
  return axios.post(`/login/refresh`, {cookie: cookie.value});
}

// 获取当前登录状态
export function getLoginStatus(config={}) {
  return axios.post("/login/status", {cookie: cookie.value});
}

// 退出登录的接口
export function quitLogin(config={}) {
  return axios.get("/logout", config);
}

// 检查该手机号是否已经被注册
export function checkPhoneRegistered(phone) {
  return axios.get(`/cellphone/existence/check?phone=${phone}`);
}

// 发送验证码
export function getCodeByPhoneNumber(phone) {
  return axios.get(`/captcha/sent?phone=${phone}`);
}

// 注册
export function doPhoneRegister(config={}) {
  return axios.post("/register/cellphone", config.data, config);
}

// 获取账号信息
export function getAccountInfo(config={}) {
  return axios.get("/user/account");
}

// 获取pc端banner数据
export function getBanner(type=2) {
  return axios.get(`/banner?type=${type}`);
} 