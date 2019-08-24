<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item p-l-7 p-r-7 p-t-6 p-b-6" to="/" exact>
        <img src="/logo.svg" style="min-height: 38px; max-height: 38px;">
      </nuxt-link>
    </div>
    <div class="navbar-menu">
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <nuxt-link class="navbar-item p-l-6 p-r-6" to="/aboutus" active-class="is-active" exact>
          About Us
        </nuxt-link>
        <nuxt-link class="navbar-item p-l-6 p-r-6" to="/blog" active-class="is-active" exact>
          Blog
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

<script>
import Navbar from '~/components/navbar.vue';

export default {
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
}
</script>
