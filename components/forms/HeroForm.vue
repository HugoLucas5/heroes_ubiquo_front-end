<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <v-container class="white elevation-1 rounded px-7">
        <h2 class="pb-4 grey--text">
          Insert Hero's Info
        </h2>
        <v-form v-model="isFormValid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="hero.name"
                :rules="[rules.required]"
                label="Name"
                solo
                hint="Name"
                clearable
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="hero.race"
                label="Race"
                solo
                hint="Race"
                clearable
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="hero.eye_color"
                label="Eye Color"
                solo
                hint="Eye Color"
                clearable
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="hero.hair_color"
                label="Hari Color"
                solo
                hint="Hair Color"
                clearable
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="hero.skin_color"
                label="Skin Color"
                solo
                hint="Skin Color"
                clearable
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="hero.height"
                label="Height"
                :rules="[rules.number]"
                solo
                hint="Height"
                clearable
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="hero.weight"
                label="Weight"
                :rules="[rules.number]"
                solo
                hint="Weight"
                clearable
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="hero.publisher_id"
                :rules="[rules.required]"
                :items="publishers"
                placeholder="Publisher"
                hint="Alignment"
                clearable
                class="rounded-lg"
                item-text="publisher_name"
                item-value="publisher_id"
                solo
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="hero.alignment_id"
                :rules="[rules.required]"
                :items="alignments"
                placeholder="Alignment"
                hint="Alignment"
                clearable
                class="rounded-lg"
                item-text="name"
                item-value="alignment_id"
                solo
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="hero.gender_id"
                :rules="[rules.required]"
                :items="genders"
                placeholder="Gender"
                hint="Gender"
                clearable
                class="rounded-lg"
                item-text="name"
                item-value="gender_id"
                solo
              />
            </v-col>
          </v-row>
        </v-form>
        <v-container>
          <v-btn
            color="blue-grey lighten-5"
            rounded
            medium
            @click="$router.go(-1)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="black"
            class="white--text"
            rounded
            medium
            :disabled="!isFormValid"
            @click="save()"
          >
            Save
          </v-btn>
        </v-container>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    hero: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isFormValid: false,
    rules: {
      required: value => !!value || 'This field is required.',
      number: (value) => {
        const pattern = /^$|[0-9-.]+$/
        return pattern.test(value) || 'Must be a valid number'
      }
    }
  }),

  computed: {
    ...mapState({
      publishers: state => state.heroes.publishers,
      genders: state => state.heroes.genders,
      alignments: state => state.heroes.alignments
    })
  },

  methods: {
    save () {
      this.$emit('save', this.hero)
    }
  }
}
</script>
