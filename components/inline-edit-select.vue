<template>
  <div :class="{'inline-edit-select': true, 'is-editing': isEditing}">
    <div class="inline-edit-select--value">
      <div class="columns is-vcentered">
        <div class="column" @dblclick="onStartEdit()">
          {{value}}
        </div>
        <div class="column is-narrow font-size-0">
          <div class="inline-edit-select--value-edit" @click="onStartEdit()">
            <i class="fas is-size-5 fa-chevron-down"/>
          </div>
        </div>
      </div>
    </div>
    <div class="inline-edit-select--input">
      <div class="inline-edit-select--input-control" ref="target">
        <div class="columns is-vcentered">
          <div class="column">
            <b>{{placeholder}}</b>
          </div>
          <div class="column is-narrow font-size-0">
            <i class="fas is-size-5 fa-chevron-down"/>
          </div>
        </div>
      </div>
      <div class="inline-edit-select--input-list" v-dom-portal ref="popup" v-show="isEditing">
        <div :class="{
            'inline-edit-select--input-list-item': true,
            'is-active': value === item || value === item.key || value === item.label
          }"
          tabindex="0"
          @blur="onStopEdit()"
          @focus="onContinueEdit()"
          @click="onSaveEdit(item)"
          @keydown.enter="onSaveEdit(item)"
          @keydown.up.prevent="onFocusNext(index - 1)"
          @keydown.down.prevent="onFocusNext(index + 1)"
          v-for="(item, index) in items"
          v-bind:key="item.key">
          {{item.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popper from 'popper.js';

export default {
  props: {
    value: {
      type: [String, Object, Number],
      default: null,
    },
    items: {
      type: Array,
      default: [],
    },
    placeholder: {
      type: String,
      default: 'Select Value',
    },
  },
  data: () => ({
    isEditing: false,
    isClosing: false,
  }),
  mounted() {
  	this.popper = new Popper(this.$refs.target, this.$refs.popup, {
      placement: 'bottom'
    });
  },
  methods: {
    onStartEdit() {
      this.isEditing = true;
      setImmediate(() => {
        this.$refs.popup.style.width = `${Math.ceil(this.$refs.target.getBoundingClientRect().width)}px`;
        this.$refs.popup.childNodes[0].focus();
        this.popper.update();
      });
    },
    onFocusNext(index) {
      if (index >= 0 && index < this.items.length) {
        this.$refs.popup.childNodes[index].focus();
      }
    },
    onContinueEdit() {
      this.isClosing = false;
      this.isEditing = true;
    },
    onStopEdit() {
      this.isClosing = true;
      setTimeout(() => {
        if (this.isClosing) {
          this.isEditing = false;
        }
      }, 100);
    },
    onSaveEdit(value) {
      this.isEditing = false;
      this.$emit('change', value);
    }
  }
}
</script>

<style lang="scss">
  @keyframes on-appear-inline-edit-select {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .inline-edit-select {
    display: flex;
    justify-items: stretch;
    width: 100%;

    & > .inline-edit-select--value {
      display: inline-block;
      transition: border 0.2s;
      border: 1px solid rgba(255, 255, 255, 0);
      border-radius: $radius;
      width: 100%;
      padding: 0.6rem 0.7rem;
      opacity: 0;
      animation: on-appear-inline-edit-select 0.2s ease-in-out forwards;

      .inline-edit-select--value-edit {
        cursor: pointer;
        transition: opacity 0.2s;
        pointer-events: none;
        opacity: 0;
      }

      &:hover, &:focus {
        border: $table-cell-border;
        .inline-edit-select--value-edit {
          opacity: 1;
          pointer-events: all;

          &:hover {
            opacity: 0.67;
          }
    
          &:active {
            opacity: 0.4;
          }
        }
      }
    }

    & > .inline-edit-select--input {
      display: none;
      background-color: #ffffff;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
      box-shadow: 0 2px 2px 0 rgba(7,22,79,0.09), 0 4px 4px 0 rgba(7,22,79,0.01), 0 8px 8px 0 rgba(7,22,79,0.12), 0 16px 16px 0 rgba(7,22,79,0.1), 0 32px 32px 0 rgba(7,22,79,0.12);
      opacity: 0;
      animation: on-appear-inline-edit-select 0.2s ease-in-out forwards;
      width: 100%;
      position: relative;

      .inline-edit-select--input-control {
        padding: 0.6rem 0.9rem;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        width: 100%;

        &::placeholder {
          opacity: 0.67;
          color: inherit;
        }
      }
    }

    &.is-editing {
      & > .inline-edit-select--value {
        display: none;
      }
    
      & > .inline-edit-select--input {
        display: inline-block;
      }
    }
  }

  .inline-edit-select--input-list {
    background-color: #ffffff;
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    overflow: auto;
    max-height: 10rem;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.11), 0 2px 2px 0 rgba(7,22,79,0.09), 0 4px 4px 0 rgba(7,22,79,0.01), 0 8px 8px 0 rgba(7,22,79,0.12), 0 16px 16px 0 rgba(7,22,79,0.1), 0 32px 32px 0 rgba(7,22,79,0.12);
    opacity: 0;
    animation: on-appear-inline-edit-select 0.2s ease-in-out forwards;

    & > .inline-edit-select--input-list-item {
      padding: 0.6rem 0.9rem;
      font-size: 0.8em;
      border-top: $table-cell-border;
      transition: opacity 0.2s, background-color 0.2s;
      cursor: pointer;
      user-select: none;
      background-color: rgba($primary, 0);
      outline: none;

      &:hover, &:focus {
        color: inherit;
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:active, &.is-active {
        color: #ffffff;
        background-color: $primary;
      }
    }
  }
</style>