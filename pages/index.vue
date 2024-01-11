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

    products() {
      return this.$store.state.products
    },
  },
}
</script>
