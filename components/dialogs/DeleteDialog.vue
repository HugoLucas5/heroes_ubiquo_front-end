<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <v-card>
      <v-card-title class="headline">
        <slot name="title" />
      </v-card-title>
      <v-card-text>
        <slot name="message" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue-gray"
          text
          @click="cancel()"
        >
          Cancel
        </v-btn>
        <v-btn
          color="accent"
          text
          @click="accept()"
        >
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    accept () {
      this.$emit('accept')
    },

    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
