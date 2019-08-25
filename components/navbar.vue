<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item p-l-7 p-r-7 p-t-6 p-b-6" to="/" exact @click="isMenuOpen = false">
        <img src="/logo.svg" style="min-height: 38px; max-height: 38px;">
      </nuxt-link>
      <a
        role="button"
        :class="{'navbar-burger m-r-5': true, 'is-active': isMenuOpen}"
        data-target="navMenu"
        aria-label="menu"
        aria-expanded="false"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div :class="{'navbar-menu': true, 'is-active': isMenuOpen}" @click="isMenuOpen = false">
      <div class="navbar-end">
        <nuxt-link class="navbar-item p-l-6 p-r-6" to="/long" active-class="is-active" exact>
          Loading Example
        </nuxt-link>
        <nuxt-link class="navbar-item p-l-6 p-r-6" to="/404" active-class="is-active" exact>
          404
        </nuxt-link>
        <nuxt-link class="navbar-item has-icon p-l-6 p-r-6" to="/search" active-class="is-active" exact>
          <div class="has-text-centered">
            <i class="fas fa-search is-size-5"></i>
          </div>
        </nuxt-link>
        <nuxt-link class="navbar-item has-icon p-l-6 p-r-6" to="/cart" active-class="is-active" exact>
          <div class="has-text-centered">
            <i class="fas fa-shopping-cart is-size-5"></i>
          </div>
        </nuxt-link>
        <template v-if="user">
          <div class="navbar-item has-icon has-dropdown is-hoverable">
            <a class="navbar-item p-l-7 p-r-7">
              <div class="has-text-centered">
                <i :class="{'fas is-size-5': true, 'fa-key': !isLoading, 'fa-spinner fa-pulse': isLoading}"></i>
              </div>
            </a>
            <div class="navbar-dropdown is-right">
              <nuxt-link class="navbar-item" to="/profile">My Profile</nuxt-link>
              <hr class="navbar-divider">
              <nuxt-link class="navbar-item" to="/preferences">Preferences</nuxt-link>
              <nuxt-link class="navbar-item" to="/logout" no-prefetch>Logout</nuxt-link>
            </div>
          </div>
        </template>
        <template v-if="!user">
          <nuxt-link class="navbar-item has-icon p-l-7 p-r-7" to="/login" active-class="is-active" exact>
            <div class="has-text-centered">
              <i :class="{'fas is-size-5': true, 'fa-fingerprint': !isLoading, 'fa-spinner fa-pulse': isLoading}"></i>
            </div>
          </nuxt-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
  isMenuOpen = false;

  get isLoading() {
    return this.$store.state.auth.isLoading;
  }

  get user() {
    return this.$store.state.auth.user;
  }
}
</script>
