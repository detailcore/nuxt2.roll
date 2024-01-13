<template>
  <div>
    <div class="mx-4 flex flex-wrap md:-mx-[18px] 3xl:-mx-[19px]">
      <ProductItem
        v-for="item of products"
        :id="item.id"
        :key="item.id"
        :image="item.image"
        :title="item.title"
        :weight="item.weight"
        :price="item.price"
        :desc="item.desc"
      />
    </div>

    <CartMain v-if="cartIsShow" />

    <NavBar v-if="menuIsShow" />

    <div class="hidden 3xl:block">
      <div class="bg-image bg-image__tl"></div>
      <div class="bg-image bg-image__tr"></div>
      <div class="bg-image bg-image__bl"></div>
    </div>

    <div
      v-if="cartIsShow || navIsShow"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1] bg-[#3c4b61]/60 backdrop-blur-md"
      @click="close"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',

  computed: {
    ...mapGetters({ menuIsShow: 'GET_NAVBAR' }),

    cartIsShow() {
      return this.$store.state.modals.cart
    },
    navIsShow() {
      return this.$store.state.modals.navbar
    },

    products() {
      return this.$store.state.products
    },
  },

  methods: {
    close() {
      this.$store.commit('SET_MODAL_CART', true)
      this.$store.commit('SET_MODAL_NAVBAR', true)
    },
  },
}
</script>

<style lang="scss">
.bg-image {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position:
    top left,
    top right,
    bottom left;
  background-image: url('~/assets/images/bg-tl.png'),
    url('~/assets/images/bg-tr.png'), url('~/assets/images/bg-bl.png');
  position: fixed;
  z-index: -1;

  &.bg-image__tl {
    top: 0;
    left: 0;
  }
  &.bg-image__tr {
    top: 0;
    right: 0;
  }
  &.bg-image__bl {
    bottom: 0;
    left: 0;
  }
}
</style>
