<template>
  <section class="section">
    <div class="container">
      <Account />

      <hr>

      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <button class="button is-primary" :class="{'is-loading': isLoading}" @click="scanAllFolder">
              <span class="icon">
                <i class="fa fa-bolt"></i>
              </span>
              <span>Analyse</span>
            </button>
          </div>
          <div class="level-item">
            <button class="button is-danger" :class="{'is-disabled': !isLoading}" @click="stop">
              <span class="icon">
                <i class="fa fa-ban"></i>
              </span>
              <span>Cancel</span>
            </button>
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
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Account from './Account';
import API from '../api';
import * as types from '../store/mutation-types';


export default {
  components: {
    Account,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.$store.dispatch(types.INIT);
    NProgress.configure({
      minimum: 0,
      trickle: false,
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

      this.start();
      do {
        const res = await API.listEntries(cursor);
        if (!this.isLoading) {
          return;
        }

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
      this.stop();
    },
  },
};
</script>
