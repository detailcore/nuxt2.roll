<template>
  <div
    :class="[
      selectedClass,
      'shadow-item 3xl:basis-1/5 relative m-4 min-w-[270px] shrink grow flex-col rounded-lg p-7 sm:basis-1/3 md:w-[270px] md:shrink-0 md:grow-0 md:basis-1/4',
    ]"
  >
    <div class="flex w-full justify-center">
      <img
        class="w-[130px]"
        :src="require(`~/assets/images/products/${image}`)"
        alt="name product"
      />
    </div>

    <div class="mb-5 mt-6 flex justify-between">
      <div class="text-[19px] uppercase">{{ title }}</div>
      <div class="text-gray flex items-center text-sm">{{ weight }} г</div>
    </div>

    <div class="text-gray text-[15px]">
      {{ desc }}
    </div>

    <div class="mt-11 flex items-center justify-between">
      <div class="text-[19px]">{{ price }} ₽</div>
      <button
        v-if="!isInCart"
        class="shadow-btn h-9 w-[120px] rounded-lg bg-[#312525] text-[15px] text-white"
        @click="setCart"
      >
        В корзину
      </button>
      <CartCounter v-else :id="id" />
    </div>

    <ProductFavorite :id="id" class="absolute right-8 top-8" />
  </div>
</template>

<script>
export default {
  name: 'ProductItem',

  props: {
    id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },

  computed: {
    isFavorite() {
      return this.$store.state.user.favorites.includes(this.id)
    },
    isInCart() {
      if (this.$store.state.user.cart.some((i) => i.id === this.id)) return true
      return false
    },
    selectedClass() {
      return this.isInCart ? 'product-selected' : 'product-item'
    },
  },

  methods: {
    setCart() {
      this.$store.commit('ADD_TO_CART', this.id)
    },
    setFavorite() {
      this.$store.commit('SET_FAVORITES', this.id)
    },
  },
}
</script>

<style lang="scss" scoped>
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
.shadow-item {
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
}
.shadow-selected {
  box-shadow: 15px 12px 37px 0px rgba(203, 182, 137, 0.7);
}
.shadow-btn {
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.35);
}
</style>
