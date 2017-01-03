<template>
  <div>
    <a class="button is-inverted is-outlined is-info is-large" :href="getAuthenticationUrl()">
      <span class="icon is-medium">
        <i class="fa fa-dropbox"></i>
      </span>
      <span>Login with Dropbox</span>
    </a>
  </div>
</template>

<script>
import { parse as parseQueryString } from 'query-string';
import API from '../api';


export default {
  mounted() {
    const token = parseQueryString(this.$route.hash).access_token;
    API.setAccessToken(token);

    // Check if user is authenticated
    if (API.isAuthenticated()) {
      this.$router.replace('/dashboard');
    } else {
      this.$router.replace('/');
    }
  },
  methods: {
    getAuthenticationUrl() {
      return API.getAuthenticationUrl(`${process.env.URL}/auth`);
    },
  },
};
</script>
