<template>
  <div class="flex h-7 w-24 flex-row items-center justify-between">
    <div
      class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-2xl text-black"
      :style="styleObject"
      @click="remove"
    >
      -
    </div>

    <div class="text-xl">{{ count }}</div>

    <div
      class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-2xl text-black"
      :style="styleObject"
      @click="add"
    >
      +
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCounter',

  props: {
    id: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
  },

  computed: {
    count() {
      return this.$store.state.user.cart.find((i) => i.id === this.id)?.cnt
    },
    styleObject() {
      return this.color === ''
        ? {}
        : {
            backgroundColor: this.color,
            color: '#fff',
          }
    },
  },

  methods: {
    add() {
      this.$store.commit('ADD_TO_CART', this.id)
    },
    remove() {
      this.$store.commit('REMOVE_FROM_CART', this.id)
    },
  },
}
</script>
