<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img src="../assets/home-icon.png">

        <div>
          <h1 class="title is-1">SnailDisk</h1>
          <h2 class="subtitle is-3">DaisyDisk like for Dropbox</h2>
        </div>

        <div class="section">
          <Login />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Login from './Login';


export default {
  components: {
    Login,
  },
};
</script>
