export const state = () => ({
  snackbar: false,
  text: '',
  messageType: ''
})

export const getters = {
  meal (state) {
    return state.meal
  }
}

export const mutations = {
  hide (state, text) {
    state.snackbar = false
    state.text = text
  },
  show (state, text) {
    state.snackbar = true
    state.text = text
    state.messageType = 'success'
  },
  error (state, text) {
    state.snackbar = true
    state.text = text
    state.messageType = 'error'
  }
}

export const actions = {
  hide ({ commit }, text) {
    commit('hide', text)
  },
  show ({ commit }, text) {
    commit('show', text)
  },
  error ({ commit }, text) {
    commit('error', text)
  }
}
