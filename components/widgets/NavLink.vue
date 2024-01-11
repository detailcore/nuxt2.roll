<template>
  <NuxtLink
    :to="`?${type}=${link}`"
    class="text-nowrap rounded-full px-4 py-3 text-center uppercase"
    :exact-active-class="activeClass"
  >
    {{ name }}
  </NuxtLink>
</template>

<script>
export default {
  name: 'NavLink',

  props: {
    link: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'menu',
    },
  },

  computed: {
    activeClass() {
      if (this.type === 'menu') {
        return 'text-[#062d4e] bg-[#FFFFFF]'
      }
      return 'text-[#FFFFFF] bg-[#312525]'
    },
  },
}
</script>
