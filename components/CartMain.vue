<template>
  <div
    class="fixed right-0 top-0 z-10 h-screen w-full min-w-80 max-w-[612px] overflow-y-auto bg-[#EBE1D7] px-10 xs:px-1"
  >
    <TitlePage class="mb-8 mt-10" title="Корзина" size="48px" />

    <div class="flex flex-col items-center">
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

    <div class="my-10 text-xl">
      Общая сумма: <span class="text-[22px]">{{ sum }}</span> ₽
    </div>

    <div class="mb-10 text-[#121212]">
      * Сумма заказа для доставки курьером должна составлять не менее 500 ₽
    </div>

    <div class="mb-11 flex justify-around">
      <button
        class="shadow-item rounded-lg bg-white px-6 py-4 xs:px-2 xs:py-1"
        @click="close"
      >
        Вернуться к покупкам
      </button>
      <button
        class="shadow-item rounded-lg bg-[#312525] text-white sm:px-6 sm:py-4 xs:px-2 xs:py-1"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartMain',

  computed: {
    ...mapGetters({ sum: 'GET_SUM_CART' }),

    products() {
      return this.$store.state.user.cart
    },
  },

  methods: {
    close() {
      this.$store.commit('SET_MODAL_CART', true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
