<template>
  <div :class="{'inline-edit-input': true, 'is-editing': isEditing}">
    <div class="inline-edit-input--value">
      <div class="columns is-vcentered">
        <div class="column" @dblclick="onStartEdit()">
          {{value}}
        </div>
        <div class="column is-narrow font-size-0">
          <div class="inline-edit-input--value-edit">
            <i class="i is-size-6 edit" @click="onStartEdit()"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="inline-edit-input--input">
      <div class="columns is-vcentered is-gapless">
        <div class="column">
          <input
            ref="input"
            @blur="onStopEdit()"
            @keydown.esc="onStopEdit()"
            @keydown.enter="onSaveEdit()"
            class="inline-edit-input--input-control"
            placeholder="Merchant"
            type="text"
            v-model="inputValue"
          >
        </div>
        <div class="column is-narrow">
          <div class="inline-edit-input--input-save"
            @mousedown="onSaveMouseDown()"
            @click="onSaveEdit()"
            @mouseleave="onSaveMouseLeave()"
          >
            Save
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['value'],
  data: () => ({
    isTryingToSave: false,
    isEditing: false,
    inputValue: '',
  }),
  methods: {
    onStartEdit() {
      this.inputValue = this.value;
      this.isEditing = true;
      this.isTryingToSave = false;
      setImmediate(() => {
        this.$refs.input.focus();
        this.$refs.input.select();
      });
    },
    onStopEdit() {
      if (!this.isTryingToSave) {
        this.isEditing = false;
      }
    },
    onSaveEdit() {
      this.isEditing = false;
      this.$emit('change', this.inputValue);
    },
    onSaveMouseDown() {
      this.isTryingToSave = true;
    },
    onSaveMouseLeave() {
      if (this.isTryingToSave) {
        this.isTryingToSave = false;
        this.isEditing = false;
      }
    }
  }
}
</script>

<style lang="scss">
  @keyframes on-appear-inline-edit-input {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .inline-edit-input {
    display: flex;
    justify-items: stretch;
    width: 100%;

    & > .inline-edit-input--value {
      display: inline-block;
      transition: border 0.2s;
      border: 1px solid rgba(255, 255, 255, 0);
      border-radius: $radius;
      width: 100%;
      padding: 0.6rem 0.7rem;
      animation: on-appear-inline-edit-input 0.2s ease-in-out forwards;

      .inline-edit-input--value-edit {
        cursor: pointer;
        transition: opacity 0.2s;
        pointer-events: none;
        opacity: 0;
      }

      &:hover, &:focus {
        border: $table-cell-border;
        .inline-edit-input--value-edit {
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

    & > .inline-edit-input--input {
      display: none;
      overflow: hidden;
      color: #ffffff;
      border-radius: $radius;
      background-color: $primary;
      box-shadow: 0 2px 2px 0 rgba(7,22,79,0.09), 0 4px 4px 0 rgba(7,22,79,0.01), 0 8px 8px 0 rgba(7,22,79,0.12), 0 16px 16px 0 rgba(7,22,79,0.1), 0 32px 32px 0 rgba(7,22,79,0.12);
      animation: on-appear-inline-edit-input 0.2s ease-in-out forwards;
      width: 100%;

      .inline-edit-input--input-control {
        padding: 0.6rem 0.7rem;
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

      .inline-edit-input--input-save {
        padding: 0.6rem 0.7rem;
        transition: opacity 0.2s, background-color 0.2s;
        opacity: 0.67;
        cursor: pointer;
        user-select: none;
        text-transform: uppercase;
        font-size: 0.7em;
        background-color: rgba(255, 255, 255, 0);
        height: 100%;

        &:hover {
          opacity: 0.8;
          background-color: rgba(255, 255, 255, 0.1);
        }

        &:active {
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    &.is-editing {
      & > .inline-edit-input--value {
        display: none;
      }
    
      & > .inline-edit-input--input {
        display: inline-block;
      }
    }
  }
</style>