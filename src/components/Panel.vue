<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="control is-grouped">
            <div class="control">
              <button class="button is-primary" :class="{'is-loading': isLoading}" @click="scanAllFolder">
                <span class="icon">
                  <i class="fa fa-bolt"></i>
                </span>
                <span>Analyse</span>
              </button>
            </div>

            <div class="control">
              <button class="button is-danger" :class="{'is-disabled': !isLoading}" @click="stop">
                <span class="icon">
                  <i class="fa fa-ban"></i>
                </span>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ nbFiles }}</strong> files
          </p>
        </div>
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ nbFolders }}</strong> folders
          </p>
        </div>
      </div>
    </nav>

    <div class="columns has-padding">
      <template v-if="isLoading">
        <div class="column has-text-centered">
          <p class="subtitle">
            <span class="icon">
              <i class="fa fa-cog fa-spin"></i>
            </span>
            <span>{{ loadingMessage }}</span>
          </p>
        </div>
      </template>
      <!-- <template v-else>
        <div class="column">
        </div>

        <div class="column">
          <nav class="panel">
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fa fa-folder"></i>
              </span>
              Images
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fa fa-file"></i>
              </span>
              my-file.css
            </a>
            <a class="panel-block">
              <span class="panel-icon">
                <i class="fa fa-file"></i>
              </span>
              my-file2.css

              <span class="is-pulled-right">7 Go</span>
            </a>
            <div class="panel-block">
              <button class="button is-primary is-outlined is-fullwidth">
                Show more
              </button>
            </div>
          </nav>
        </div>
      </template> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import API from '../api';
import DB from '../db';

import * as types from '../store/mutation-types';


export default {
  data() {
    return {
      isLoading: true,
      loadingMessage: '',
    };
  },
  created() {
    NProgress.configure({
      minimum: 0,
      trickle: false,
    });

    this.loadingMessage = 'Waking up the dwarves...';
  },
  mounted() {
    DB.prepareDB().then(() => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState({
      nbFiles: state => state.counters.files,
      nbFolders: state => state.counters.folders,

      loadingProgress(state) {
        return (state.space.used > 0)
          ? state.counters.size / state.space.used
          : 0;
      },
    }),
  },
  watch: {
    loadingProgress(n) {
      if (this.isLoading) {
        NProgress.set(n);
      }
    },
  },
  methods: {
    start() {
      NProgress.start();
      this.isLoading = true;
    },
    stop() {
      NProgress.done();
      this.isLoading = false;
    },
    async scanAllFolder() {
      let cursor = '';

      this.loadingMessage = 'The dwarves collects the data...';
      this.start();
      do {
        const res = await API.listEntries(cursor);
        if (!this.isLoading) {
          return;
        }

        await DB.insertEntries(res.entries);

        cursor = res.has_more ? res.cursor : '';
        const counters = res.entries.reduce((obj, e) => {
          if (e['.tag'] === 'file') {
            obj.files += 1;
            obj.size += e.size;
          } else if (e['.tag'] === 'folder') {
            obj.folders += 1;
          }
          return obj;
        }, { files: 0, folders: 0, size: 0 });

        this.$store.commit(types.INC_FILE_COUNTER, counters.files);
        this.$store.commit(types.INC_FOLDER_COUNTER, counters.folders);
        this.$store.commit(types.INC_SIZE_COUNTER, counters.size);
      } while (cursor && this.isLoading);

      this.loadingMessage = 'Crunching the numbers...';
      await DB.computeAllSize();

      this.stop();
    },
  },
};
</script>

<style>
.has-padding {
  padding: 40px 20px;
}
</style>
