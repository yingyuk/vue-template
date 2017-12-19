// 初始状态
const state = {
  name: '',
  status: false,
  data: null,
  callback: null,
};

// 读取数据
const getters = {};

// 数据改变
const mutations = {
  setModalState(state, { name, status = false, data = null, callback = null }) {
    state.name = name;
    state.status = status;
    state.data = data;
    state.callback = callback;
  },
  closeModal(state) {
    state.status = false;
  },
};

// 逻辑响应
const actions = {
  toggleModal({ commit }, payload) {
    commit('setModalState', payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
