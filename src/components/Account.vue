<template>
  <div>
      <p class="title is-3">
        <span>Welcome {{ firstname }}</span>
        <span class="icon is-medium">
          <i class="fa fa-hand-peace-o"></i>
        </span>
      </p>
      <p class="subtitle is-5">Here are some statistics for you:</p>

      <hr>

      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Used Space</p>
            <p class="title">{{ usedSpace | size }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Allocated Space</p>
            <p class="title">{{ allocatedSpace | size }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Usage</p>
            <p class="title">{{ spaceUsage }} %</p>
          </div>
        </div>
      </nav>

    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';


export default {
  computed: {
    ...mapState({
      firstname: state => state.account.firstname,
      usedSpace: state => state.space.used,
      allocatedSpace: state => state.space.allocated,
    }),
    ...mapGetters(['spaceUsage']),
  },
};
</script>
