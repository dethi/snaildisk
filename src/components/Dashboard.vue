<template>
  <div>
  <section class="section">
    <div class="container">
      <Account />

      <hr>

      <Panel />
    </div>
  </section>
</div>
</template>

<script>
import Account from './Account';
import Panel from './Panel';

import * as types from '../store/mutation-types';


export default {
  components: {
    Account,
    Panel,
  },
  created() {
    this.$store.dispatch(types.INIT);
  },
};
</script>
