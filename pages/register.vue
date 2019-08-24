<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered on-appear-slide-down on-delay-0">Register!</h2>

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label on-appear-scale-left on-delay-1">Username</label>
              <div class="control on-appear-scale-right on-delay-2">
                <input
                  type="text"
                  class="input"
                  name="username"
                  v-model="username"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label on-appear-scale-left on-delay-3">Email</label>
              <div class="control on-appear-scale-right on-delay-4">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label on-appear-scale-left on-delay-5">Password</label>
              <div class="control on-appear-scale-right on-delay-6">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-primary is-fullwidth on-appear-rotate on-delay-7">Register</button>
            </div>
          </form>

          <div class="has-text-centered on-appear-slide-up on-delay-8" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Validator } from "vee-validate";
import 'buefy';

const AuthStore = namespace("auth");

@Component({
  async fetch({store, redirect}) {
    if (!!store.state.auth.user) {
      return redirect('/');
    }
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },
  computed: {
    redirect() {
      return this.$route.query.redirect;
    }
  },
})
export default class extends Vue {
  @AuthStore.State('user') user;
  @AuthStore.Action('register') doRegister;

  username!: string;
  email!: string;
  password!: string;
  error!: string;

  async register() {
    try {
      await this.doRegister({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      const redirect = this.$route.query.redirect as string;
      this.$router.push({
        path: redirect || `/`,
      });
    } catch (e) {
      this.error = e.response.data.message;
      this.$buefy.toast.open({
        duration: 5000,
        message: this.error,
        position: 'is-bottom',
        type: 'is-danger',
      });
    }
  }
}
</script>