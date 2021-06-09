import { createStore } from 'vuex';
import user from "./modules/user.js";
import player from "./modules/player.js";

// Create a new store instance.
const store = createStore({
  modules: {
    user,
    player
  }
});
export default store;

