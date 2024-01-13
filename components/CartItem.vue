<template>
  <div
    class="shadow-item mb-1.5 flex max-w-[528px] justify-between rounded-lg bg-[#FAFAFA] p-4 xs:p-1"
  >
    <div class="flex flex-col justify-center">
      <img
        class="max-w-20 xs:max-w-12"
        :src="require(`~/assets/images/products/${image}`)"
        :alt="title"
      />
    </div>

    <div class="mx-6 flex flex-col xs:mx-2">
      <div class="flex items-center justify-between uppercase">
        <span>{{ title }}</span>
        <ProductFavorite :id="id" />
      </div>
      <div class="font-sans text-[13px] text-[#717171] xs:text-xs">
        {{ desc }}
      </div>
      <div class="font-sans text-[13px] text-[#717171] xs:text-xs">
        ({{ weight }} г)
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div>Цена: {{ price }} ₽</div>
      <CartCounter :id="id" color="#312525" />
      <div>Сумма: {{ price * cnt }} ₽</div>
    </div>

    <div class="ml-5 flex items-center xs:hidden">
      <div
        class="-mr-4 flex h-16 w-10 cursor-pointer items-center justify-center rounded-l-full bg-[#312525]"
        @click="removeAll"
      >
        <IconTrashBasket />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',

  props: {
    id: {
      type: Number,
      required: true,
    },
    cnt: {
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
  },

  methods: {
    removeAll() {
      this.$store.commit('REMOVE_ALL_FROM_CART', this.id)
    },
  },
}
</script>
