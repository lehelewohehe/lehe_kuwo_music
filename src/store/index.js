import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: {},
      token: "12312312313123123",
      cookie: ""
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log(payload, 90);
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setCookie(state, payload) {
      state.cookie = payload;
    }
  }
});
export default store;

