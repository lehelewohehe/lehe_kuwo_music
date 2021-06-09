import {getSongUrl} from "@/request/index.js";
export default {
  namespaced: true,
  state: {
    currentPlaySong: {}
  },
  getters: {

  },
  mutations: {
    setCurrentPlaySong(state, payload) {
      state.currentPlaySong = payload.currentPlaySong;
    }
  },
  actions: {
    setCurrentPlaySong({commit}, payload) {
      console.log(payload)
      let {song, ids} = payload;
      song ? 
      commit({
          type: "setCurrentPlaySong",
          currentPlaySong: song
        }) : 
      getSongUrl(ids).then(res => {
        commit({
          type: "setCurrentPlaySong",
          currentPlaySong: res.data[0]
        });
      }).catch(error => {
        console.log(error);
      })
    }
  }
}