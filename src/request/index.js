import axios from "@/request/axios.js";
import store from "@/store/index.js";
import qs from "qs";
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

// 获取每日推荐歌单 无需登录
export function getRecommendSongList(limit=10) {
  return axios.get(`/personalized?limit=${limit}`);
}

// 获取每日推荐歌曲 需要登录
export function getRecommendSongs() {
  return axios.post("/recommend/songs", {cookie: cookie.value});
}

// 获取推荐电台
export function getRecommendRadioStation() {
  return axios.get("/personalized/djprogram");
}

// 获取最新mv
export function getNewMv(limit=5) {
  return axios.get(`/mv/first?limit=${limit}`);
}

// 新碟上架
export function getNewDisc(limit=30) {
  return axios.get(`/top/album?limit=${limit}`);
}

// 获取歌单详情
export function getSongSheetDetail(id) {
  return axios.get(`/playlist/detail?id=${id}`);
}

// 获取歌曲详情
export function getSongDetail(ids) {
  return axios.get(`/song/detail?ids=${ids}`);
}

// 获取歌单评论
export function getSongComments(params={}) {
  let str = qs.stringify(params);
  return axios.get(`/comment/playlist?${str}`);
}

// 发布或者删除评论
export function sendComments(data={}) {
  return axios.post("/comment", data);
}

// 评论点赞
export function toggleLikeComment(data={}) {
  return axios.post("/comment/like", data);
}

// 获取音乐url
export function getSongUrl(ids) {
  ids = typeof ids == "object" ? ids.join() : ids;
  return axios.get(`/song/url?id=${ids}`);
}

// 获取歌词
export function getSongLyric(id) {
  return axios.get(`/lyric?id=${id}`);
}

// 获取MV地址
export function getSongMV(id) {
  return axios.get(`/mv/url?id=${id}`);
}