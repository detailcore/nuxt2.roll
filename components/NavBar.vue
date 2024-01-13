<template>
  <div>
    <nav
      class="fixed right-0 top-0 z-10 flex min-h-screen w-40 flex-col bg-[#062D4E] p-6 text-right text-white"
    >
      <WidgetNavLink
        v-for="{ name, link } of getLinks"
        :key="link"
        :name="name"
        :link="link"
        type="menu"
        class="my-3 text-nowrap rounded-full px-4 py-3 text-center uppercase"
      />
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',

  computed: {
    getLinks() {
      return this.$store.state.links
    },
  },

  watch: {
    $route(to, from) {
      this.$store.commit('SET_MODAL_NAVBAR', true)
    },
  },
}
</script>
