<template>
  <div
    class="mx-3 flex flex-wrap md:mx-auto md:mb-2 md:max-w-[870px] md:text-xl 3xl:mb-10 3xl:mt-12 3xl:max-w-[1170px] 3xl:text-2xl"
  >
    <WidgetNavLink
      v-for="{ name, link } of getLinks"
      :key="link"
      :name="name"
      :link="link"
      type="submenu"
      class="text-nowrap rounded-full px-4 py-3 text-center uppercase md:px-8 md:py-4"
    />
  </div>
</template>

<script>
export default {
  name: 'NavBarSub',

  computed: {
    getLinks() {
      return this.$store.state.subLinks
    },
  },
}
</script>
