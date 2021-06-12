import {getSongUrl} from "@/request/index.js";
export default {
  namespaced: true,
  state: {
    currentPlaySong: {},
    currentPlayDetail: {}
  },
  getters: {

  },
  mutations: {
    setCurrentPlaySong(state, payload) {
      state.currentPlaySong = payload.currentPlaySong;
    },
    setCurrentPlayDetail(state, payload) {
      state.currentPlayDetail = payload.currentPlayDetail;
    }
  },
  actions: {
    setCurrentPlay({commit}, payload) {
      console.log(payload)
      let {currentPlayDetail={}} = payload;
      let {id} = currentPlayDetail; 
      getSongUrl(id).then(res => {
        commit({type: "setCurrentPlaySong",currentPlaySong: res.data[0]});
        commit({type: "setCurrentPlayDetail",currentPlayDetail});
      }).catch(error => {
        console.log(error);
      })
    }
  }
}