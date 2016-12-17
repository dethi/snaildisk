<template>
  <div>
    <p>Hello {{ firstname }}!</p>
    <p>Usage: {{ usedSpace | humanizeSize }} / {{ allocatedSpace | humanizeSize}} ({{ spaceUsage }}%)</p>
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
  filters: {
    humanizeSize(bytes) {
      let size = bytes;

      if (Math.abs(size) < 1024) {
        return `${size} B`;
      }
      const units = ['kB', 'MB', 'GB', 'TB'];
      let u = -1;
      do {
        size /= 1024;
        u += 1;
      } while (Math.abs(size) >= 1024 && u < units.length - 1);
      return `${size.toFixed(1)} ${units[u]}`;
    },
  },
};
</script>
