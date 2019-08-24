<template>
  <transition name="fade">
    <section class="hero on-appear-slide-down on-delay-0" v-if="show">
      <div class="hero-bodys p-t-9 p-b-10">
        <div class="container has-text-centered">
          <div style="font-size: 5rem;">
            <i class="far fa-compass has-text-grey-light on-appear-slide-down on-delay-1"></i>
          </div>
          <div class="title is-2 has-text-grey-dark on-appear-rotate on-delay-2">
            {{ error.statusCode }}
          </div>
          <div class="subtitle is-4 has-text-grey on-appear-rotate on-delay-3">
            {{ error.message }}
          </div>
          <button class="button is-medium on-appear-slide-up on-delay-4" to="/" @click="reload">
            Refresh
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  data: () => ({
    show: false,
  }),
  mounted: function() {
    if (process.client) {
      window.setTimeout(() => this.show = true, 300);
    } else {
      this.show = true;
    }
  },
  props: ['error'],
  methods: {
    reload() {
      this.$router.go();
    }
  }
}
</script>
