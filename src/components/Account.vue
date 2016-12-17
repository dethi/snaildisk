<template>
  <div>
    <p>Hello {{ firstname }}!</p>
    <p>Usage: {{ usedSpace | size }} / {{ allocatedSpace | size}} ({{ spaceUsage }}%)</p>
  </div>
</template>

<script>
import Dropbox from 'dropbox';

const dbx = new Dropbox();

export default {
  props: {
    accessToken: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      firstname: '',

      usedSpace: 0,
      allocatedSpace: 0,
    };
  },
  created() {
    dbx.setAccessToken(this.accessToken);
  },
  async mounted() {
    let res = await dbx.usersGetCurrentAccount();
    this.firstname = res.name.given_name;

    res = await dbx.usersGetSpaceUsage();
    this.usedSpace = res.used;
    this.allocatedSpace = res.allocation.allocated;
  },
  computed: {
    spaceUsage() {
      return (this.allocatedSpace > 0)
        ? Math.round((this.usedSpace / this.allocatedSpace) * 100)
        : 0;
    },
  },
};
</script>
