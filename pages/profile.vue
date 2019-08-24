<template>
  <section class="section">
    <div class="container">
      <h2 class="title on-appear-slide-down on-delay-0">My Profile</h2>
      <div class="content">
        <p class="on-appear-scale-left on-delay-1">
          <strong>Username:</strong>
          {{ loggedInUser.username }}
        </p>
        <p class="on-appear-scale-left on-delay-2">
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // middleware: ['auth'],
  computed: {
    loggedInUser: () => ({
      username: 'test',
      email: 'test@test.com',
    }),
  }
}
</script>