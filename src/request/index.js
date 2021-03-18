import axios from "@/request/axios.js";

// 通过手机号登录
export function doLoginByCellPhone(config) {
  return axios.post(`/login/cellphone` ,config.data , config);
}

// 通过扫描二维码登录
export function doLoginByQrcode(config) {
  return axios.post(`/login/cellphone` ,config.data , config);
}