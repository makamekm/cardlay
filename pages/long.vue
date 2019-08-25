<template>
  <section class="section">
    <div class="container">
      <h2 class="title on-appear-slide-down on-delay-0">Long loading example</h2>
      <div class="content">
        <p class="on-appear-scale-left on-delay-1">
          Thank you for waiting!
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  async fetch({redirect}) {
    await new Promise(r => setTimeout(r, 5000));
  },
})
export default class extends Vue {
}
</script>