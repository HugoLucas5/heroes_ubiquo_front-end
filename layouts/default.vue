<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <nuxt-link to="/" style="text-decoration: none" class="black--text">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
    </v-app-bar>
    <v-main>
      <nuxt />
      <v-snackbar
        v-model="snackbar"
        :timeout="6000"
        :color="`${snackbarType}`"
      >
        {{ snackbarText }}
        <template #action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ creator +' '+ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      snackbar: false,
      clipped: false,
      fixed: false,
      right: true,
      title: 'Heros Front End',
      creator: 'Hugo Lucas'
    }
  },
  computed: {
    ...mapState({
      snackbarState: state => state.snackbar.snackbar,
      snackbarText: state => state.snackbar.text,
      snackbarType: state => state.snackbar.messageType
    })
  },
  watch: {
    snackbar (val) {
      if (!val) { this.$store.dispatch('snackbar/hide') }
    },
    snackbarState (val) {
      if (val) { this.snackbar = true }
    }
  }
}
</script>
