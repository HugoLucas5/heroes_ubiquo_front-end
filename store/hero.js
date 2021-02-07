export const state = () => ({
  hero: null,
  loading: false
})

export const mutations = {
  setHero (state, hero) {
    state.hero = hero
  },

  setLoading (state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async fetch ({ commit, dispatch }, id) {
    try {
      commit('setLoading', true)
      const { data } = await this.$axios.get(`/${id}`)
      commit('setHero', data)
    } catch (errors) {
      dispatch('snackbar/error', errors.response.data.errors, { root: true })
    } finally {
      commit('setLoading', false)
    }
  },

  async post ({ dispatch }, params) {
    try {
      const { data } = await this.$axios.post('/', params)
      const message = 'Hero successfully created'
      dispatch('snackbar/show', message, { root: true })
      this.$router.push({
        name: 'id', params: { id: data._id }
      })
    } catch (errors) {
      dispatch('snackbar/error', errors.response.data.errors, { root: true })
    }
  },

  async put ({ dispatch }, params) {
    try {
      const { data } = await this.$axios.put(`/${params._id}`, params)
      this.$router.push({
        name: 'id', params: { id: data._id }
      })
      const message = 'Hero Updated'
      dispatch('snackbar/show', message, { root: true })
    } catch (errors) {
      dispatch('snackbar/error', errors.response.data.errors, { root: true })
    }
  },

  async delete ({ commit, dispatch }, id) {
    let message
    try {
      commit('setLoading', true)
      await this.$axios.delete(`/${id}`)
      message = 'Hero Deleted'
      dispatch('snackbar/show', message, { root: true })
      dispatch('heroes/fetch', null, { root: true })
      this.$router.push({
        path: '/'
      })
    } catch (error) {
      const msg = 'Something went wrong'
      dispatch('snackbar/error', msg, { root: true })
    } finally {
      commit('setLoading', false)
    }
  }
}
