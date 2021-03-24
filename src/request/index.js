import axios from "@/request/axios.js";
import {timeLocal} from "@/utils/storage.js";
let cookie = timeLocal.get(timeLocal.keys["LEHET_COOKIE"]);

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
  return axios.post(`/login/refresh`, {cookie});
}

// 获取账号信息
export function getAccountInfo(config={}) {
  return axios.get("/user/account");
}