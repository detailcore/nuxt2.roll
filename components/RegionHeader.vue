<template>
  <header class="w-full">
    <div
      class="flex h-[60px] items-center justify-between md:mx-auto md:h-[66px] md:max-w-[870px] 3xl:h-[82px] 3xl:max-w-[1170px]"
    >
      <div
        class="ml-5 flex w-1/2 items-center justify-between md:ml-0 md:justify-start 3xl:hidden"
      >
        <div class="group relative cursor-pointer" @click="showNav">
          <IconMenuBurger v-if="!isNavShow" />
          <WidgetCloseButton v-else />
        </div>

        <NuxtLink class="ml-5" to="/">
          <IconLogoMobile />
        </NuxtLink>
      </div>

      <div class="relative hidden 3xl:flex 3xl:h-full">
        <div
          class="absolute -top-4 left-0 h-[162px] w-[162px] rounded-full bg-white shadow-sm"
        >
          <div class="logo"></div>
        </div>

        <div class="menu-h ml-52 flex items-center text-white">
          <WidgetNavLink
            v-for="{ name, link } of getLinks"
            :key="link"
            :name="name"
            :link="link"
            type="menu"
            class="rounded-full px-2 py-1"
          />
        </div>
      </div>

      <div class="flex w-1/2 items-center justify-end md:justify-between">
        <div class="flex items-center md:-ml-16 3xl:ml-0">
          <a href="tel:+74951234567">
            <IconHandSet tel />
          </a>
          <div class="ml-1 hidden text-white md:block">+7 985 456 78 90</div>
        </div>

        <div class="flex items-center">
          <div
            class="relative ml-6 mr-5 flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full bg-white 3xl:mr-0"
            @click="showCart"
          >
            <IconCartFull />
            <div
              v-if="getCartCount > 0"
              class="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F34942] text-[10px] text-white"
            >
              {{ getCartCount }}
            </div>
          </div>

          <button
            class="ml-6 hidden h-[42px] rounded-full bg-[#ffffff] px-7 md:block"
          >
            Войти
          </button>
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
    getLinks() {
      return this.$store.state.links
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

<style lang="scss">
.logo {
  width: 100%;
  height: 100%;
  background-position-x: center;
  background-position-y: 16px;
  background-repeat: no-repeat;
  background-image: url('~/assets/images/logo.png');
}
.menu-h {
  a {
    margin-right: 16px;
    position: relative;
    &::after {
      content: '';
      width: 3px;
      height: 3px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      right: -8px;
      background-color: #fff;
    }
    &:last-of-type::after {
      content: none;
    }
  }
}
</style>
