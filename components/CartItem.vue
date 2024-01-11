<template>
  <div
    class="shadow-item mb-1.5 flex max-w-[528px] flex-row justify-between rounded-lg bg-[#FAFAFA] p-4"
  >
    <div class="mr-6">
      <img
        class="max-w-20"
        :src="require(`~/assets/images/products/${image}`)"
        :alt="title"
      />
    </div>

    <div class="flex flex-col">
      <div class="uppercase">{{ title }}</div>
      <div class="font-sans text-[13px] text-[#717171]">{{ desc }}</div>
      <div class="font-sans text-[13px] text-[#717171]">({{ weight }} г)</div>
    </div>

    <div class="flex flex-col justify-between">
      <div>Цена: {{ price }} ₽</div>
      <CartCounter :id="id" color="#312525" />
      <div>Сумма: {{ price * cnt }} ₽</div>
    </div>

    <div class="relative">
      <div>QWE</div>
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

  methods: {},
}
</script>
