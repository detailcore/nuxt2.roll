<template>
  <div class="cursor-pointer" @click="setFavorite">
    <IconHeartSelect v-if="isFavorite" />
    <IconHeartEmpty v-else />
  </div>
</template>

<script>
export default {
  name: 'ProductFavorite',

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isFavorite() {
      return this.$store.state.user.favorites.includes(this.id)
    },

    selectedClass() {
      return this.isInCart ? 'product-selected' : 'product-item'
    },
  },

  methods: {
    setFavorite() {
      this.$store.commit('SET_FAVORITES', this.id)
    },
  },
}
</script>

<style lang="scss">
.product-item {
  color: #141414;
  background-color: #fafafa;
  .text-gray {
    color: #808080;
  }
}
.product-selected {
  color: #fff;
  background-color: #312525;
}
</style>
