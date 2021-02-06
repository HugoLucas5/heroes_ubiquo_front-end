/* eslint-disable vue/valid-v-slot */
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <v-container class="my-6">
        <v-card color="transparent" flat>
          <v-row>
            <v-col cols="12" md="3" sm="12">
              <v-text-field
                v-model="filters.searchrace"
                clearable
                placeholder="Race"
                solo
                class="rounded-lg"
                append-icon="mdi-magnify"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-select
                v-model="filters.publisher"
                :items="publishers"
                placeholder="Publisher"
                clearable
                class="rounded-lg"
                item-text="publisher_name"
                item-value="publisher_id"
                solo
              />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-select
                v-model="filters.gender"
                :items="genders"
                placeholder="Gender"
                clearable
                class="rounded-lg"
                item-text="name"
                item-value="gender_id"
                solo
              />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-select
                v-model="filters.alignment"
                :items="alignments"
                placeholder="Alignment"
                clearable
                class="rounded-lg"
                item-text="name"
                item-value="alignment_id"
                solo
              />
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="heroes"
            :loading="loading"
            loading-text="Loading... Please wait"
            hide-default-footer
            class="elevation-1"
          >
            <template #top>
              <v-toolbar flat color="blue-grey lighten-5" class="grey lighten-3 grey--text">
                <v-toolbar-title>
                  {{ pagination.totalItems }} Total Heroes
                </v-toolbar-title>
              </v-toolbar>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot-->
            <template #item.publisher="{ item }">
              <p v-if="item.publisher.length > 0">
                {{ item.publisher[0].publisher_name }}
              </p>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot-->
            <template #item.gender="{ item }">
              <p v-if="item.gender.length > 0">
                {{ item.gender[0].name }}
              </p>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot-->
            <template #item.alignment="{ item }">
              <p v-if="item.alignment.length > 0">
                {{ item.alignment[0].name }}
              </p>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot-->
            <template #item.action="{ item }">
              <nuxt-link
                :to="{name:'id', params: { id: item._id }}"
                class="text-decoration-none"
              >
                <v-icon
                  small
                  class="mr-2"
                  title="View"
                >
                  mdi-eye
                </v-icon>
              </nuxt-link>
              <nuxt-link
                :to="{name:'id-edit', params: { id: item._id }}"
                class="text-decoration-none"
              >
                <v-icon
                  small
                  class="mr-2"
                  title="Edit"
                >
                  mdi-pencil
                </v-icon>
              </nuxt-link>
              <v-icon
                small
                title="Delete"
                @click="dialogDelete(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
        <v-row justify="center" class="py-4">
          <v-pagination
            v-model="page"
            :total-visible="5"
            :length="pagination.totalPages"
            circle
            color="black"
          />
        </v-row>
      </v-container>
      <v-btn
        bottom
        color="complement"
        dark
        fab
        fixed
        right
        medium
      >
        <nuxt-link :to="{name: 'new'}" style="text-decoration: none">
          <v-icon color="white">
            mdi-plus
          </v-icon>
        </nuxt-link>
      </v-btn>
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
    </v-col>
  </v-row>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState } from 'vuex'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
export default {
  components: {
    DeleteDialog
  },
  async asyncData ({ store }) {
    await Promise.any([
      store.dispatch('heroes/fetch'),
      store.dispatch('heroes/fetchPublishers'),
      store.dispatch('heroes/fetchGenders'),
      store.dispatch('heroes/fetchAlignments')
    ])
  },
  data: () => ({
    filters: {
      searchrace: '',
      publisher: null,
      gender: null,
      alignment: null
    },
    page: 1,
    dialog: false,
    idToDelete: null,
    headers: [
      { text: 'Hero ID', value: 'hero_id' },
      { text: 'Name', value: 'name' },
      { text: 'Eye Color', value: 'eye_color' },
      { text: 'Hair Color', value: 'hair_color' },
      { text: 'Skin Color', value: 'skin_color' },
      { text: 'Height', value: 'height' },
      { text: 'Weight', value: 'weight' },
      { text: 'Race', value: 'race' },
      { text: 'Publisher', value: 'publisher' },
      { text: 'Gender', value: 'gender' },
      { text: 'Alignment', value: 'alignment' },
      { text: 'Actions', value: 'action', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      pagination: state => state.heroes.pagination,
      heroes: state => state.heroes.items,
      loading: state => state.heroes.loading,
      publishers: state => state.heroes.publishers,
      genders: state => state.heroes.genders,
      alignments: state => state.heroes.alignments
    }),
    head () {
      return { title: 'Heroes' }
    }
  },
  watch: {
    page: {
      handler: 'fetchInfo',
      deep: true
    },
    filters: {
      deep: true,
      handler: 'fetchInfo'
    }
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
    },
    fetchInfo: debounce(function () {
      this.$store.dispatch('heroes/fetch', {
        page: this.page,
        race: this.filters.searchrace === '' ? null : this.filters.searchrace,
        gender: this.filters.gender ? this.filters.gender : null,
        publisher: this.filters.publisher ? this.filters.publisher : null,
        alignment: this.filters.alignment ? this.filters.alignment : null
      })
    })
  }
}
</script>

<style lang="scss">
  .v-pagination__item {
    &--active {
    color: white;
    }
  }
</style>
