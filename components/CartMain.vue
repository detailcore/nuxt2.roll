<template>
  <div
    class="fixed right-0 top-0 z-10 h-screen w-full max-w-[612px] overflow-y-auto bg-[#EBE1D7] px-10"
  >
    <TitlePage class="mb-8 mt-10" title="Корзина" size="48px" />

    <div>
      <CartItem
        v-for="item of products"
        :id="item.id"
        :key="item.id"
        :cnt="item.cnt"
        :image="item.image"
        :title="item.title"
        :weight="item.weight"
        :price="item.price"
        :desc="item.desc"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartMain',

  props: {
    // id: {
    //   type: Number,
    //   required: true,
    // },
  },

  computed: {
    products() {
      return this.$store.state.user.cart
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
