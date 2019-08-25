<template>
  <div class="merchant font-size-0" v-if="isLoading || newValue">
    <img class="merchant-icon on-appear-scale-left" :src="newValue" v-if="!isLoading && newValue"/>
    <div v-if="isLoading" class="merchant-loading on-appear-scale-left">
      <div class="merchant-loading"><div></div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { BehaviorSubject } from 'rxjs';

@Component({
  props: {
    value: String,
  },
})
export default class extends Vue {
  value: string;
  loadQueue: string[] = [];
  newValue: string = '';
  isLoading: boolean = false;

  mounted() {
    this.loadQueue.push(this.value);
    this.load();
  }

  @Watch('value') watchValue(value) {
    this.loadQueue.push(value);
    this.load();
  }

  load() {
    const value = this.loadQueue[0];
    this.isLoading = true;
    const image = new Image();
    const releaseQueue = () => {
      this.loadQueue.splice(this.loadQueue.indexOf(value), 1);
      if (this.loadQueue.length === 0) {
        this.isLoading = false;
      }
    };
    image.onload = async () => {
      this.newValue = image.width > 1 ? image.src : null;
      releaseQueue();
    };
    image.onerror = () => {
      this.newValue = null;
      releaseQueue();
    };
    image.src = '/brand-icons/' + value + '@2x.png';
  }
}
</script>

<style lang="scss">
  .merchant-icon {
    max-width: 2.5rem;
    max-height: 2.5rem;
    object-fit: contain;
  }

  .merchant {
    position: relative;
  }

  .merchant-loading {
    display: inline-block;
    // transform: translateZ(1px);
  }

  .merchant-loading > div {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: rgba($primary, 0.1);
    animation: merchant-loading 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  @keyframes merchant-loading {
    0%, 100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }

</style>