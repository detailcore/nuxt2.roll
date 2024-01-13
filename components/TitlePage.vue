<template>
  <h1
    class="my-5 flex flex-row items-center justify-center text-2xl md:text-5xl 3xl:text-6xl"
    :style="getStyle"
  >
    {{ title === '' ? getTitle?.name : title }}
  </h1>
</template>

<script>
export default {
  name: 'TitlePage',

  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
  },

  computed: {
    getTitle() {
      return (
        this.$store.state.links.find((i) => i.link === this.getRoute) || {
          name: 'Меню',
        }
      )
    },
    getRoute() {
      return this.$route.query.menu
    },
    getStyle() {
      return { fontSize: this.size }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  color: #191919;
}
h1::after,
h1::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #191919;
}
h1::after {
  margin-left: 15px;
}
h1::before {
  margin-right: 15px;
}
</style>
