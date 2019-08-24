<template>
  <div/>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  async fetch({store, redirect}) {
    await store.dispatch('auth/logout');
    return redirect('/');
  },
})
export default class extends Vue {
}
</script>