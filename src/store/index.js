import { createStore } from 'vuex';
import user from "./modules/user.js";

// Create a new store instance.
const store = createStore({
  modules: {
    user
  }
});
export default store;

