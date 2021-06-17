import {getSongUrl, getSongLyric, getSongMV} from "@/request/index.js";
export default {
  namespaced: true,
  state: {
    currentPlaySong: {},
    currentPlayDetail: {},
    currentPlayMv: {},
    currentPlayLyric: {}
  },
  getters: {

  },
  mutations: {
    setCurrentPlaySong(state, payload) {
      state.currentPlaySong = payload.currentPlaySong;
    },
    setCurrentPlayDetail(state, payload) {
      state.currentPlayDetail = payload.currentPlayDetail;
    },
    setCurrentPlayMV(state, payload) {
      state.currentPlayMv = payload.currentPlayMv;
    },
    setCurrentPlayLyric(state, payload) {
      state.currentPlayLyric = payload.currentPlayLyric;
    },
  },
  actions: {
    setCurrentPlay({commit}, payload) {
      console.log(payload)
      let {currentPlayDetail={}} = payload;
      let {id,mv} = currentPlayDetail; 
      getSongUrl(id).then(res => {
        commit({type: "setCurrentPlaySong",currentPlaySong: res.data[0]});
        commit({type: "setCurrentPlayDetail",currentPlayDetail});
      }).catch(error => {
        console.log(error);
      })
      !!mv ? getSongMV(mv).then(res => {
        commit({type: "setCurrentPlayMV", currentPlayMv: res.data});
      }) : commit({type: "setCurrentPlayMV", currentPlayMv: {}});
      getSongLyric(id).then(res => {
        commit({type: "setCurrentPlayLyric", currentPlayLyric: res.lrc});
      })
    }
  }
}