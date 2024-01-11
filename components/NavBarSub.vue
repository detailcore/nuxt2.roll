<template>
  <div class="flex flex-row flex-wrap">
    <WidgetNavLink
      v-for="{ name, link } of getLinks"
      :key="link"
      :name="name"
      :link="link"
      type="submenu"
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
