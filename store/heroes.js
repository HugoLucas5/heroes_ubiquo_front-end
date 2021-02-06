export const state = () => ({
  items: [],
  pagination: {
  },
  loading: false,
  publishers: [],
  genders: [],
  alignments: []
})

export const mutations = {
  setPagination (state, payload) {
    state.pagination = payload
  },

  setItems (state, items) {
    state.items = items
  },

  setLoading (state, value) {
    state.loading = value
  },

  setPublishers (state, publishers) {
    state.publishers = publishers
  },

  setGenders (state, genders) {
    state.genders = genders
  },

  setAlignments (state, alignments) {
    state.alignments = alignments
  }
}

export const actions = {
  async fetch ({ commit, dispatch }, params) {
    try {
      commit('setLoading', true)
      const { data } = await this.$axios.get('/', {
        params,
        progress: false
      })
      const { docs, totalPages, page, totalDocs } = data
      commit('setItems', docs)
      commit('setPagination', {
        page,
        totalPages,
        totalItems: totalDocs
      })
    } catch (error) {
      dispatch('snackbar/error', error.response.data.errors, { root: true })
    } finally {
      commit('setLoading', false)
    }
  },

  async fetchPublishers ({ commit, dispatch }, params) {
    try {
      commit('setLoading', true)
      const { data } = await this.$axios.get('/publishers', {
        progress: false
      })
      commit('setPublishers', data)
    } catch (error) {
      dispatch('snackbar/error', error.response.data.errors, { root: true })
    } finally {
      commit('setLoading', false)
    }
  },

  async fetchGenders ({ commit, dispatch }, params) {
    try {
      commit('setLoading', true)
      const { data } = await this.$axios.get('/genders', {
        progress: false
      })
      commit('setGenders', data)
    } catch (error) {
      dispatch('snackbar/error', error.response.data.errors, { root: true })
    } finally {
      commit('setLoading', false)
    }
  },

  async fetchAlignments ({ commit, dispatch }, params) {
    try {
      commit('setLoading', true)
      const { data } = await this.$axios.get('/alignments', {
        progress: false
      })
      commit('setAlignments', data)
    } catch (error) {
      dispatch('snackbar/error', error.response.data.errors, { root: true })
    } finally {
      commit('setLoading', false)
    }
  }
}
