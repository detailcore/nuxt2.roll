<template>
  <div>
    <RegionHeader />

    <TitlePage />

    <NavBarSub class="mx-3" />

    <div class="m-5">
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
