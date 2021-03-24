import {timeLocal} from "@/utils/storage.js";
export default {
  state: {
    profile: timeLocal.get(timeLocal.keys["LEHET_PROFILE"]) || {},
    token: timeLocal.get(timeLocal.keys["LEHET_TOKEN"]) || "",
    cookie: timeLocal.get(timeLocal.keys["LEHET_COOKIE"]) || ""
  },
  mutations: {
    setLoginInfo(state, payload) {
      state.profile = payload.profile;
      state.token = payload.token;
      state.cookie = payload.cookie;
      timeLocal.set(timeLocal.keys["LEHET_COOKIE"], state.cookie);
      timeLocal.set(timeLocal.keys["LEHET_TOKEN"], state.token);
      timeLocal.set(timeLocal.keys["LEHET_PROFILE"], state.profile);
    }
  }
}