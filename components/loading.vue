<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  start() {
    this.$store.dispatch('app/setLoading', true);
  }

  finish() {
    this.$store.dispatch('app/setLoading', false);
  }
}
</script>
