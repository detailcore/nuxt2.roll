<template>
  <header
    class="relative flex h-[60px] w-full items-center justify-between px-5 py-3"
  >
    <div class="group relative cursor-pointer" @click="showNav">
      <IconMenuBurger v-if="!isNavShow" />
      <WidgetCloseButton v-else />
    </div>

    <NuxtLink to="/">
      <IconLogoMobile />
    </NuxtLink>

    <div class="flex items-center">
      <IconHandSet />

      <div
        v-if="getCartCount > 0"
        class="relative ml-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white"
        @click="showCart"
      >
        <IconCartFull />
        <div
          class="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F34942] text-[10px] text-white"
        >
          {{ getCartCount }}
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'RegionHeader',

  computed: {
    isNavShow() {
      return this.$store.state.modals.navbar
    },

    getCartCount() {
      return this.$store.state.user.cart?.length
    },
  },

  methods: {
    showCart() {
      this.$store.commit('SET_MODAL_CART')
    },
    showNav() {
      this.$store.commit('SET_MODAL_NAVBAR')
    },
  },
}
</script>
