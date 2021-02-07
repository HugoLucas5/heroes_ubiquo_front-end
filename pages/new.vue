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
          mdi-account-plus
        </v-icon>
        New Hero
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <hero-form :hero="newHero" @save="save" />
    </v-container>
  </v-main>
</template>

<script>
import HeroForm from '@/components/forms/HeroForm'
export default {

  components: {
    HeroForm
  },

  async asyncData ({ store }) {
    await Promise.any([
      store.dispatch('heroes/fetchPublishers'),
      store.dispatch('heroes/fetchGenders'),
      store.dispatch('heroes/fetchAlignments')
    ])
  },

  data: () => ({
    newHero: {
      name: '',
      eye_color: '',
      hair_color: '',
      skin_color: '',
      height: null,
      weight: null,
      race: '',
      publisher_id: null,
      gender_id: null,
      alignment_id: null
    }
  }),

  methods: {
    async save (hero) {
      await this.$store.dispatch('hero/post', hero)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  head () {
    return { title: 'New Hero' }
  }
}
</script>
