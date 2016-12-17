<template>
  <p><a :href="getAuthenticationUrl()">Login to Dropbox</a></p>
</template>

<script>
import Dropbox from 'dropbox';
import { parse as parseQueryString } from 'query-string';


const dbx = new Dropbox({ clientId: 'tq8yauz5y98cz9z' });

export default {
  mounted() {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this.$router.replace('/dashboard');
    }
    if (!accessToken && this.$route.path === '/auth') {
      this.$router.replace('/');
    }
  },
  methods: {
    getAuthenticationUrl() {
      return dbx.getAuthenticationUrl('http://localhost:8080/auth');
    },
    getAccessToken() {
      let accessToken = window.sessionStorage.getItem('dropboxAccessToken');
      if (!accessToken) {
        // Try to load access token from the URL
        accessToken = parseQueryString(this.$route.hash).access_token;
        if (accessToken) {
          window.sessionStorage.setItem('dropboxAccessToken', accessToken);
        }
      }
      return accessToken || '';
    },
  },
};
</script>
