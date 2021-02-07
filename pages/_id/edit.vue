<template>
  <v-main class="py-0">
    <v-toolbar
      color="grey lighten-4"
      class="pa-2"
      flat
      dark
    >
      <v-toolbar-title
        class="black--text pb-2"
      >
        <v-icon color="black">
          mdi-account-edit
        </v-icon>
        Edit Hero {{ oldHero.name }}
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <hero-form :hero="oldHero" @save="update" />
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import HeroForm from '@/components/forms/HeroForm'
export default {

  components: {
    HeroForm
  },
  async asyncData ({ store, params }) {
    await store.dispatch('hero/fetch', params.id)
  },
  computed: {
    ...mapState(['hero']),
    oldHero: {
      get () {
        return Object.assign({}, { ...this.hero.hero })
      }
    }
  },
  methods: {
    async update (hero) {
      await this.$store.dispatch('hero/put', hero)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  head () {
    return { title: 'Edit Hero' }
  }
}
</script>
