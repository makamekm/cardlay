<template>
  <div></div>
</template>

<script>

export default {
  methods: {
    start() {
      this.$store.dispatch('app/setLoading', true);
    },
    finish() {
      this.$store.dispatch('app/setLoading', false);
    }
  }
}
</script>
