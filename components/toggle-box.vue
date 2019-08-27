<template>
  <div class="toggle-box">
    <div
      :class="{'toggle-box--indicator': true, 'is-active-true': inputValue === true, 'is-active-false': inputValue === false}"
      :style="{
        left: left,
        right: right,
      }"
    >
    </div>
    <div :class="{'toggle-box--value--false': true, 'is-active': inputValue === false}" @click="onToggle(false)" ref="true">
      {{placeholderFalse}}
    </div>
    <div :class="{'toggle-box--value--true': true, 'is-active': inputValue === true}" @click="onToggle(true)" ref="false">
      {{placeholderTrue}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject, Watch } from 'vue-property-decorator';
import Popper from 'popper.js';

@Component({
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    placeholderTrue: {
      type: String,
      default: 'Approve',
    },
    placeholderFalse: {
      type: String,
      default: 'Decline',
    },
  },
})
export default class extends Vue {
  inputValue = null;
  rerender = 0;
  left: number | string = 0;
  right: number | string = 0;
  value: boolean;
  placeholderTrue: string;
  placeholderFalse: string;
  $refs: {
    true: HTMLInputElement;
    false: HTMLInputElement;
  };

  mounted() {
    setImmediate(() => this.setStyle());
    this.inputValue = this.value;
  }

  @Watch('value') watchValue(value) {
    this.inputValue = value;
    this.setStyle();
  }

  get getFalseWidth() {
    return this.$refs.false ? this.$refs.false.offsetWidth : 0;
  }

  get getTrueWidth() {
    return this.$refs.true ? this.$refs.true.offsetWidth : 0;
  }

  get getIndicatorLeftPosition() {
    return this.inputValue === false
      ? '0.3rem'
      : this.inputValue === null ? '50%' : `calc(${Math.ceil(this.getFalseWidth)}px)`;
  }

  get getIndicatorRightPosition() {
    return this.inputValue === false
      ? `calc(0.6rem + ${Math.ceil(this.getTrueWidth)}px)`
      : this.inputValue === null ? '50%' : '0.3rem';
  }

  onToggle(value) {
    if (this.inputValue === value) {
      this.inputValue = null;
    } else {
      this.inputValue = value;
    }
    this.$emit('change', this.inputValue);
    this.setStyle();
  }

  setStyle() {
    this.left = this.getIndicatorLeftPosition;
    this.right = this.getIndicatorRightPosition;
  }
}
</script>

<style lang="scss">
  .toggle-box {
    width: auto;
    background-color: rgba(0, 0, 0, 0.03);
    display: inline-flex;
    flex-direction: row; 
    padding: 0.3rem;
    border-radius: 100rem;
    position: relative;

    & > .toggle-box--value--false, & > .toggle-box--value--true {
      font-size: 0.7em;
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      border-radius: 100rem;
      z-index: 1;
      cursor: pointer;
      user-select: none;
      transition: color 0.3s;

      &.is-active {
        color: #ffffff;
      }
    }
    
    & > .toggle-box--indicator {
      content: '';
      position: absolute;
      top: 0.3rem;
      bottom: 0.3rem;
      background-color: rgba(255, 255, 255, 0);
      border-radius: 100rem;
      transition: background-color 0.3s, left 0.3s, right 0.3s, transform 0.3s, opacity 0.6s;
      pointer-events: none;
      z-index: 0;
      transform: scale(0);
      opacity: 0;

      &.is-active-true {
        background-color: #00DBB4;
        transform: scale(1);
        opacity: 1;
      }
    
      &.is-active-false {
        background-color: #D5345D;
        transform: scale(1);
        opacity: 1;
      }
    }
  }
</style>