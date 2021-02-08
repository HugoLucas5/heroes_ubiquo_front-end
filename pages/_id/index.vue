<template>
  <v-main class="py-0">
    <v-toolbar
      color="grey lighten-5"
      class="px-4 pa-2"
      flat
      dark
    >
      <v-toolbar-title
        class="black--text"
      >
        <v-icon color="black">
          mdi-account
        </v-icon>
        {{ hero.name }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <nuxt-link :to="{name:'id-edit', params: { id: hero._id }}" style="text-decoration: none">
          <v-icon
            title="Edit"
            class="black--text"
          >
            mdi-pencil
          </v-icon>
        </nuxt-link>
      </v-btn>
      <v-btn icon>
        <v-icon title="Delete" class="black--text" @click="dialogDelete(hero)">
          mdi-delete
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-flex xs12>
        <v-card>
          <v-card-title
            primary-title
            class="grey lighten-3 grey--text"
          >
            Hero Details
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-col cols="12" md="6" sm="12">
                <v-list
                  two-line
                  dense
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>NAME</v-list-item-subtitle>
                      <v-list-item-title>{{ hero.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>ID</v-list-item-subtitle>
                      <v-list-item-title>{{ hero.hero_id }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>EYE COLOR</v-list-item-subtitle>
                      <v-list-item-title>{{ hero.eye_color }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>HAIR COLOR</v-list-item-subtitle>
                      <v-list-item-title>{{ hero.hair_color }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>SKIN COLOR</v-list-item-subtitle>
                      <v-list-item-title>{{ hero.skin_color }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <!-- second col -->
              <v-col cols="12" md="6" sm="12">
                <v-list
                  two-line
                  dense
                  class="order-list"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>RACE</v-list-item-subtitle>
                      <v-list-item-title>{{ hero.race }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>PUBLISHER</v-list-item-subtitle>
                      <v-list-item-title v-if="hero.publisher && hero.publisher.length > 0">
                        {{ hero.publisher[0].publisher_name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>ALIGNMENT</v-list-item-subtitle>
                      <v-list-item-title v-if="hero.alignment && hero.alignment.length > 0">
                        {{ hero.alignment[0].name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>GENDER</v-list-item-subtitle>
                      <v-list-item-title v-if="hero.gender && hero.gender.length > 0">
                        {{ hero.gender[0].name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-layout wrap>
                    <v-col cols="12" md="3" sm="6">
                      <v-list-item class="pl-0">
                        <v-list-item-content>
                          <v-list-item-subtitle>HEIGHT</v-list-item-subtitle>
                          <v-list-item-title>{{ hero.height }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="12" md="3" sm="6">
                      <v-list-item class="pl-0">
                        <v-list-item-content>
                          <v-list-item-subtitle>WEIGHT</v-list-item-subtitle>
                          <v-list-item-title>{{ hero.weight }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-layout>
                </v-list>
              </v-col>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
    <delete-dialog
      :dialog="dialog"
      @accept="deleteItem()"
      @cancel="cancelDelete()"
    >
      <h3 slot="title">
        Delete Hero
      </h3>
      <p slot="message">
        Do you want to delete this hero? It cannot be restored
      </p>
    </delete-dialog>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
export default {
  components: {
    DeleteDialog
  },
  async asyncData ({ store, params }) {
    await store.dispatch('hero/fetch', params.id)
  },
  data: () => ({
    dialog: false,
    idToDelete: null
  }),
  computed: {
    ...mapState({
      hero: state => state.hero.hero
    })
  },
  methods: {
    dialogDelete (item) {
      this.idToDelete = item._id
      this.dialog = true
    },
    cancelDelete () {
      this.idToDelete = null
      this.dialog = false
    },
    async deleteItem () {
      this.dialog = false
      await this.$store.dispatch('hero/delete', this.idToDelete)
    }
  },

  // eslint-disable-next-line vue/order-in-components
  head () {
    return {
      title: this.hero.name
    }
  }
}
</script>
