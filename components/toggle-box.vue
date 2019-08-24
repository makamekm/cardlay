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

<script>
export default {
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
  watch: {
    value(value) {
      this.inputValue = value;
      this.setStyle();
    },
  },
  data() {
    return {
      inputValue: this.value,
      rerender: 0,
      left: 0,
      right: 0,
    };
  },
  mounted() {
    setImmediate(() => this.setStyle());
  },
  computed: {
    getFalseWidth() {
      return this.$refs.false ? this.$refs.false.offsetWidth : 0;
    },
    getTrueWidth() {
      return this.$refs.true ? this.$refs.true.offsetWidth : 0;
    },
    getIndicatorLeftPosition() {
      return this.inputValue === false
        ? '0.3rem'
        : this.inputValue === null ? '50%' : `calc(${Math.ceil(this.getFalseWidth)}px)`;
    },
    getIndicatorRightPosition() {
      return this.inputValue === false
        ? `calc(0.6rem + ${Math.ceil(this.getTrueWidth)}px)`
        : this.inputValue === null ? '50%' : '0.3rem';
    }
  },
  methods: {
    onToggle(value) {
      if (this.inputValue === value) {
        this.inputValue = null;
      } else {
        this.inputValue = value;
      }
      this.$emit('change', this.inputValue);
      this.setStyle();
    },
    setStyle() {
      this.left = this.getIndicatorLeftPosition;
      this.right = this.getIndicatorRightPosition;
    }
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
      font-weight: 800;
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