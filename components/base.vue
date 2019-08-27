<template>
  <div :class="{'lc-container': true, 'is-loading': isLoading, 'is-mounted': isMounted}">
    <div class="lc-container-child">
      <navbar v-if="!isLoading"/>
      <portal-target name="toolbox">
      </portal-target>
      <div class="lc-content">
        <slot v-if="!isLoading"/>
      </div>
    </div>
    <div class="lc-loading">
      <img src="/logo.svg">
    </div>
    <portal-target name="footer">
    </portal-target>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';
import Navbar from '~/components/navbar.vue';

@Component({
  components: {
    Navbar,
  },
})
export default class extends Vue {
  isMounted = false;

  mounted() {
    this.isMounted = true;
  }

  get isLoading() {
    return this.$store.state.auth.isLoading || this.$store.state.app.isLoading;
  }

  get user() {
    return this.$store.state.auth.user;
  }
}
</script>

<style lang="scss" scoped>
.lc-container
{
  display: flex;
  flex-direction: column;
  top: 5px;
  left: 5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  min-height: calc(100vh - 10px);
  min-width: calc(100vw - 10px);
  max-width: calc(100vw - 10px);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  transform: translateX(0) translateY(0);
  transition: all 0.3s;
  opacity: 0;
  overflow: hidden;

  &.is-mounted {
    opacity: 1;
  }

  & > .lc-container-child {
    flex: 1;
    content: '';
    display: flex;
    flex-direction: column;

    & > .lc-content {
      position: relative;
      flex: 1;
    }
  }

  & > * {
    transition: opacity 0.6s;
  }

  & > .lc-container-child {
    opacity: 1;
  }

  & > .lc-loading {
    position: absolute;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    pointer-events: none;
    font-weight: 800;
    font-size: 3rem;
    color: rgba(0, 0, 0, 0.3);
    transition: opacity 0.1s;
    & > img {
      max-height: 7px;
      min-height: 7px;
    }
  }

  &.is-loading {
    position: fixed;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    max-height: 50px;
    max-width: 50px;
    min-height: 50px;
    min-width: 50px;
    height: 50px;
    width: 50px;
    animation: rotate-animation 4s ease-in-out infinite alternate;
    animation-direction: alternate;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.2));

    & > .lc-container-child {
      opacity: 0;
    }

    & > .lc-loading {
      opacity: 1;
    }
  }
}

@keyframes rotate-animation {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
    background-color: rgba(255, 255, 255, 0.5);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
    background-color: rgba(255, 255, 255, 1);
  }
}

</style>
