import { createStore } from "vuex";

export default createStore({
  state: {
    user: null, 
  },

  getters: {
    isAuthenticated: state => !!state.user,
    userRoles: state => state.user?.roles || [],
    userStatus: state => state.user?.status,
    hasRole: state => role => state.user?.roles?.includes(role),
    isDeleted: state => state.user?.status === 'deleted',
  },

  mutations: {
    setUser(state, user) {
      user.roles = Array.isArray(user.roles) ? user.roles : [user.roles];
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
  },

  actions: {
    async fetchUser({ commit }) {
      const mockUser = {
        username: "admin_user",
        roles: ["Admin"],
        status: "enabled",
      };

      commit("setUser", mockUser);
    },
  },
});
